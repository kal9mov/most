import { PrismaClient, QuestSubmission, SubmissionStatus, User, Quest } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateSubmissionData {
  userId: string;
  questId: string;
  submittedFileUrl: string;
}

/**
 * Создает запись об отправке квеста.
 */
export const createQuestSubmission = async (
    data: CreateSubmissionData
): Promise<QuestSubmission> => {
    // TODO: Проверить, не отправлял ли пользователь уже этот квест (если нужно ограничение)
    return prisma.questSubmission.create({
        data: {
            userId: data.userId,
            questId: data.questId,
            submittedFileUrl: data.submittedFileUrl,
            status: SubmissionStatus.SUBMITTED, // Статус по умолчанию
        },
    });
};

interface GetSubmissionsOptions {
    status?: SubmissionStatus;
    userId?: string; // Фильтр по пользователю
}

/**
 * Получает список отправок квестов.
 */
export const getSubmissions = async (
    options: GetSubmissionsOptions = {}
): Promise<(QuestSubmission & { user: Pick<User, 'id' | 'firstName' | 'lastName' | 'username'>, quest: Pick<Quest, 'id' | 'title'> })[]> => {
    return prisma.questSubmission.findMany({
        where: {
            status: options.status,
            userId: options.userId,
        },
        include: {
            // Включаем базовую информацию о пользователе и квесте
            user: {
                select: { id: true, firstName: true, lastName: true, username: true }
            },
            quest: {
                select: { id: true, title: true }
            }
        },
        orderBy: {
            submittedAt: 'asc', // Сначала самые старые
        }
    });
};

interface ReviewSubmissionData {
    submissionId: string;
    reviewerId: string; // ID волонтера
    newStatus: SubmissionStatus.APPROVED | SubmissionStatus.REJECTED;
    reviewNotes?: string;
}

/**
 * Обновляет статус отправки квеста (проверка волонтером).
 */
export const reviewSubmission = async (
    data: ReviewSubmissionData
): Promise<QuestSubmission | null> => {
    // Убедимся, что мы не пытаемся проверить уже проверенное
    const submission = await prisma.questSubmission.findUnique({
        where: { id: data.submissionId }
    });

    if (!submission || submission.status !== SubmissionStatus.SUBMITTED) {
        // Не найдено или уже проверено
        console.warn(`Submission ${data.submissionId} not found or already reviewed.`);
        return null; 
    }

    return prisma.questSubmission.update({
        where: { id: data.submissionId },
        data: {
            status: data.newStatus,
            reviewNotes: data.reviewNotes,
            reviewedAt: new Date(),
            reviewerId: data.reviewerId,
        },
        // Возвращаем обновленную запись с данными квеста и пользователя для дальнейшей обработки
        include: {
            user: true,
            quest: true,
        }
    });
};

// TODO: Добавить функции для получения отправок (getSubmissions) 
// и обновления статуса (reviewSubmission) для панели волонтера. 