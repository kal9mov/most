import { Request, Response } from 'express';
import { PrismaClient, SubmissionStatus } from '@prisma/client';
import { getSubmissions, reviewSubmission } from '../services/questSubmissionService';
import { addUserPoints } from '../services/userService';
import { sendTelegramNotification } from '../services/notificationService';

const prisma = new PrismaClient();

/**
 * Получает список отправок квестов для проверки волонтером.
 * По умолчанию получает только со статусом SUBMITTED.
 */
export const getSubmissionsForReview = async (req: Request, res: Response) => {
    // Можно добавить фильтр по статусу из query, но по умолчанию SUBMITTED
    const status = req.query.status === 'APPROVED' ? SubmissionStatus.APPROVED 
                 : req.query.status === 'REJECTED' ? SubmissionStatus.REJECTED
                 : SubmissionStatus.SUBMITTED; // По умолчанию

    try {
        const submissions = await getSubmissions({ status });
        res.status(200).json(submissions);
    } catch (error) {
        console.error('Error fetching submissions for review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Обрабатывает проверку (одобрение/отклонение) отправки квеста волонтером.
 */
export const reviewQuestSubmissionHandler = async (req: Request, res: Response) => {
    if (!req.user) {
        // Этого не должно быть, т.к. volunteerAuthMiddleware сработает раньше
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const reviewerId = req.user.userId;
    const { submissionId } = req.params;
    const { decision, reviewNotes } = req.body; // 'APPROVED' или 'REJECTED'

    if (!submissionId || !decision || (decision !== 'APPROVED' && decision !== 'REJECTED')) {
        return res.status(400).json({ message: 'Missing or invalid fields: submissionId, decision ("APPROVED" or "REJECTED")' });
    }

    const newStatus = decision === 'APPROVED' ? SubmissionStatus.APPROVED : SubmissionStatus.REJECTED;

    try {
        const updatedSubmission = await reviewSubmission({
            submissionId,
            reviewerId,
            newStatus,
            reviewNotes
        });

        if (!updatedSubmission) {
            return res.status(404).json({ message: 'Submission not found or already reviewed' });
        }

        let notificationMessage = `Ваша отправка для квеста "${updatedSubmission.quest.title}" была проверена.
Статус: ${newStatus === SubmissionStatus.APPROVED ? 'Одобрено' : 'Отклонено'}.`;
        if (reviewNotes) {
            notificationMessage += `\nКомментарий волонтера: ${reviewNotes}`;
        }

        // Только при ОДОБРЕНИИ обрабатываем выполнение и очки
        if (newStatus === SubmissionStatus.APPROVED) {
            // Проверяем, выполнял ли пользователь этот квест РАНЕЕ
            const existingCompletion = await prisma.userCompletedQuest.findUnique({
                where: {
                    userId_questId: {
                        userId: updatedSubmission.userId,
                        questId: updatedSubmission.questId,
                    },
                },
            });

            if (!existingCompletion) {
                // Если ВЫПОЛНЕН ВПЕРВЫЕ
                console.log(`Quest ${updatedSubmission.questId} completed by user ${updatedSubmission.userId} for the first time.`);
                
                // 1. Создаем запись о выполнении
                try {
                     await prisma.userCompletedQuest.create({
                         data: {
                             userId: updatedSubmission.userId,
                             questId: updatedSubmission.questId,
                         },
                     });
                } catch (completionError) {
                     console.error(`Failed to create UserCompletedQuest record for user ${updatedSubmission.userId}, quest ${updatedSubmission.questId}:`, completionError);
                     // Продолжаем, но логируем ошибку
                }
                
                // 2. Начисляем очки (если они есть)
                if (updatedSubmission.quest.rewardPoints && updatedSubmission.quest.rewardPoints > 0) {
                    try {
                        await addUserPoints(updatedSubmission.userId, updatedSubmission.quest.rewardPoints);
                        notificationMessage += `\nНачислено ${updatedSubmission.quest.rewardPoints} очков!`;
                        console.log(`Added ${updatedSubmission.quest.rewardPoints} points to user ${updatedSubmission.userId}`);
                    } catch (pointError) {
                        console.error(`Failed to add points for submission ${submissionId}:`, pointError);
                    }
                }
            } else {
                 // Если квест УЖЕ БЫЛ ВЫПОЛНЕН ранее
                 console.log(`Quest ${updatedSubmission.questId} was already completed by user ${updatedSubmission.userId}.`);
                 notificationMessage += `\n(Квест уже был выполнен ранее, очки не начисляются повторно).`;
            }
        }

        // Отправляем уведомление пользователю (в любом случае одобрения/отклонения)
        try {
            await sendTelegramNotification(updatedSubmission.user, notificationMessage);
        } catch (notifyError) {
             console.error(`Failed to send notification for submission ${submissionId}:`, notifyError);
        }

        res.status(200).json(updatedSubmission); // Возвращаем обновленную запись

    } catch (error) {
        console.error(`Error reviewing submission ${submissionId}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// TODO: Добавить контроллеры для управления Help Requests 