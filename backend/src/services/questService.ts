import { PrismaClient, Quest } from '@prisma/client';

const prisma = new PrismaClient();

interface GetQuestsOptions {
  category?: string; // Для фильтрации
  onlyActive?: boolean; // Получать только активные
}

/**
 * Получает список квестов из БД.
 * @param options Опции фильтрации.
 * @returns Массив объектов Quest.
 */
export const getQuests = async (options: GetQuestsOptions = {}): Promise<Quest[]> => {
  const whereClause: any = {};

  if (options.category) {
    whereClause.category = options.category;
  }

  if (options.onlyActive !== false) { // По умолчанию только активные
    whereClause.isActive = true;
  }

  return prisma.quest.findMany({
    where: whereClause,
    orderBy: {
      // Можно добавить сортировку, например, по категории или названию
      category: 'asc',
      title: 'asc'
    }
  });
};

/**
 * Вычисляет максимальное количество очков, которое можно получить 
 * за выполнение всех активных квестов.
 * @returns Максимальное количество очков или 0.
 */
export const getMaxPossiblePoints = async (): Promise<number> => {
    const result = await prisma.quest.aggregate({
        _sum: {
            rewardPoints: true,
        },
        where: {
            isActive: true,
            rewardPoints: { not: null } // Учитываем только квесты с наградой
        }
    });
    return result._sum.rewardPoints || 0;
};
 