import { Request, Response } from 'express';
import { getQuests } from '../services/questService';
import { addUserPoints } from '../services/userService'; // Импорт функции добавления очков
import { createQuestSubmission } from '../services/questSubmissionService'; // Импорт сервиса отправок
import { PrismaClient } from '@prisma/client'; // Импорт Prisma Client для поиска квеста

const prisma = new PrismaClient();

export const fetchQuests = async (req: Request, res: Response) => {
  // Получаем параметры фильтрации из query string
  const category = req.query.category as string | undefined;
  // const activeOnly = req.query.active !== 'false'; // Пример, если нужен параметр active

  try {
    const quests = await getQuests({
      category,
      // onlyActive: activeOnly 
    });
    res.status(200).json(quests);
  } catch (error) {
    console.error('Error fetching quests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Обработчик завершения квеста (заглушка).
 */
/*
export const completeQuestHandler = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { userId } = req.user;
    const { questId } = req.params; // Получаем ID квеста из URL

    try {
        // 1. Найти квест по ID, чтобы узнать награду
        const quest = await prisma.quest.findUnique({
            where: { id: questId }
        });

        if (!quest) {
            return res.status(404).json({ message: 'Quest not found' });
        }

        // 2. Проверить, активен ли квест и есть ли награда
        if (!quest.isActive || !quest.rewardPoints || quest.rewardPoints <= 0) {
            // Если квест неактивен или без награды, просто возвращаем успех без начисления очков
            return res.status(200).json({ message: 'Quest completed (no points awarded)' });
        }

        // TODO: Добавить проверку, не выполнял ли пользователь этот квест ранее (нужна модель UserProgress)

        // 3. Начислить очки пользователю
        await addUserPoints(userId, quest.rewardPoints);

        res.status(200).json({ message: `Quest completed! ${quest.rewardPoints} points added.` });

    } catch (error) {
        console.error(`Error completing quest ${questId}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
*/

/**
 * Обработчик отправки файла для квеста.
 */
export const submitQuestFileHandler = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // Проверяем, был ли загружен файл
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { userId } = req.user;
    const { questId } = req.params; // ID квеста из URL
    const submittedFileUrl = req.file.path; // Путь к сохраненному файлу (от multer)

    try {
        // Проверить, существует ли квест (опционально, но хорошо бы)
        const quest = await prisma.quest.findUnique({ where: { id: questId }});
        if (!quest) {
            return res.status(404).json({ message: 'Quest not found' });
        }
        // TODO: Проверить, можно ли отправлять файл для этого квеста (например, isActive)
        
        // Создаем запись в QuestSubmission
        const submission = await createQuestSubmission({
            userId,
            questId,
            submittedFileUrl,
        });

        res.status(201).json({ 
            message: 'File submitted successfully! Waiting for review.', 
            submissionId: submission.id 
        });

    } catch (error) {
        console.error(`Error submitting file for quest ${questId}:`, error);
        // TODO: Удалить загруженный файл, если произошла ошибка при записи в БД?
        res.status(500).json({ message: 'Internal server error' });
    }
}; 