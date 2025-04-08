import { PrismaClient, User, Role, Quest, SubmissionStatus, QuestSubmission, UserCompletedQuest } from '@prisma/client';

const prisma = new PrismaClient();

// Интерфейс для данных пользователя из Telegram (для удобства)
// Определим его здесь, так как он нужен для findOrCreateUser
export interface TelegramUserData {
  id: number; // Telegram ID
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

/**
 * Находит пользователя по Telegram ID или создает нового, если не найден.
 * Обновляет данные пользователя при нахождении.
 * @param telegramData Данные пользователя из Telegram.
 * @returns Найденный или созданный пользователь (включая роль).
 */
export const findOrCreateUser = async (telegramData: TelegramUserData): Promise<User> => {
  const telegramIdBigInt = BigInt(telegramData.id);

  let user = await prisma.user.findUnique({
    where: { telegramId: telegramIdBigInt },
  });

  if (user) {
    // Пользователь найден, обновляем данные, если они изменились
    const dataToUpdate: Partial<Omit<User, 'id' | 'telegramId' | 'role' | 'createdAt' | 'updatedAt' | 'totalPoints'>> = {};
    if (user.firstName !== telegramData.first_name) dataToUpdate.firstName = telegramData.first_name;
    if (user.lastName !== telegramData.last_name) dataToUpdate.lastName = telegramData.last_name;
    if (user.username !== telegramData.username) dataToUpdate.username = telegramData.username;
    if (user.photoUrl !== telegramData.photo_url) dataToUpdate.photoUrl = telegramData.photo_url;

    // Обновляем только если есть что обновлять
    if (Object.keys(dataToUpdate).length > 0) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: dataToUpdate,
        });
    }
  } else {
    // Пользователь не найден, создаем нового
    user = await prisma.user.create({
      data: {
        telegramId: telegramIdBigInt,
        firstName: telegramData.first_name,
        lastName: telegramData.last_name,
        username: telegramData.username,
        photoUrl: telegramData.photo_url,
        role: Role.USER, // Новые пользователи всегда USER по умолчанию
        // totalPoints по умолчанию 0
      },
    });
  }

  return user;
};

/**
 * Находит пользователя по его внутреннему ID.
 * @param userId Внутренний ID пользователя.
 * @returns Найденный пользователь или null.
 */
export const findUserById = async (userId: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id: userId },
  });
};

/**
 * Добавляет очки пользователю.
 * @param userId ID пользователя.
 * @param pointsToAdd Количество добавляемых очков.
 * @returns Обновленный пользователь.
 */
export const addUserPoints = async (userId: string, pointsToAdd: number): Promise<User> => {
    if (pointsToAdd <= 0) {
        // Не добавляем 0 или отрицательные очки
        return prisma.user.findUniqueOrThrow({ where: { id: userId } });
    }
    return prisma.user.update({
        where: { id: userId },
        data: {
            totalPoints: {
                increment: pointsToAdd,
            },
        },
    });
};

// Тип для статуса квеста пользователя
export type UserQuestStatus = 'NOT_STARTED' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';

// Тип для результата: информация о квесте + статус для пользователя
export type QuestWithUserStatus = Quest & { userStatus: UserQuestStatus };

/**
 * Получает все активные квесты и определяет статус каждого квеста 
 * для указанного пользователя.
 * @param userId ID пользователя.
 * @returns Массив квестов с добавленным полем userStatus.
 */
export const getQuestsWithUserStatus = async (userId: string): Promise<QuestWithUserStatus[]> => {
    // 1. Получаем все активные квесты
    const activeQuests = await prisma.quest.findMany({
        where: { isActive: true },
        orderBy: { category: 'asc', title: 'asc' }
    });

    // 2. Получаем все отправки пользователя
    const userSubmissions = await prisma.questSubmission.findMany({
        where: { userId: userId },
        // Сортируем, чтобы последняя отправка по квесту была первой
        orderBy: { submittedAt: 'desc' }
    });

    // 3. Получаем все выполненные квесты пользователя
    const userCompletions = await prisma.userCompletedQuest.findMany({
        where: { userId: userId },
        select: { questId: true } // Нам нужны только ID выполненных квестов
    });
    const completedQuestIds = new Set(userCompletions.map(c => c.questId));

    // Группируем отправки по questId для быстрого доступа к последнему статусу
    const lastSubmissionStatusMap = new Map<string, SubmissionStatus>();
    userSubmissions.forEach(sub => {
        if (!lastSubmissionStatusMap.has(sub.questId)) {
            lastSubmissionStatusMap.set(sub.questId, sub.status);
        }
    });

    // 4. Определяем статус для каждого квеста
    const questsWithStatus: QuestWithUserStatus[] = activeQuests.map(quest => {
        let userStatus: UserQuestStatus = 'NOT_STARTED';

        if (completedQuestIds.has(quest.id)) {
            // Если квест выполнен - статус APPROVED
            userStatus = 'APPROVED';
        } else {
            // Если не выполнен, смотрим последнюю отправку
            const lastStatus = lastSubmissionStatusMap.get(quest.id);
            if (lastStatus === SubmissionStatus.SUBMITTED) {
                userStatus = 'SUBMITTED';
            } else if (lastStatus === SubmissionStatus.REJECTED) {
                userStatus = 'REJECTED';
            }
            // Если статуса нет (или был APPROVED, но в completed нет - странно, но оставим NOT_STARTED)
        }

        return {
            ...quest,
            userStatus: userStatus,
        };
    });

    return questsWithStatus;
}; 