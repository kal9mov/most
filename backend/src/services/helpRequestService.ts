import { PrismaClient, HelpRequest } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateHelpRequestData {
  topic: string;    // 'info', 'duty', 'career'
  contact: string;
  question: string;
  userId: string;   // ID пользователя, создающего запрос
}

/**
 * Создает новый запрос помощи в базе данных.
 * @param data Данные для создания запроса.
 * @returns Созданный объект HelpRequest.
 */
export const createHelpRequest = async (data: CreateHelpRequestData): Promise<HelpRequest> => {
  // Проверяем, что topic соответствует ожидаемым значениям (опционально, но полезно)
  const validTopics = ['info', 'duty', 'career'];
  if (!validTopics.includes(data.topic)) {
      console.warn(`Received help request with invalid topic: ${data.topic}`);
      // Можно выбросить ошибку или использовать дефолтный топик
      // throw new Error('Invalid help request topic'); 
  }
  
  return prisma.helpRequest.create({
    data: {
      topic: data.topic,
      contact: data.contact,
      question: data.question,
      userId: data.userId,
      // status по умолчанию PENDING (из схемы Prisma)
    },
  });
}; 