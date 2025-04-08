import { Request, Response } from 'express';
import { createHelpRequest } from '../services/helpRequestService';

export const submitHelpRequest = async (req: Request, res: Response) => {
  // Проверяем, что пользователь аутентифицирован (middleware добавил req.user)
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
  }

  const { userId } = req.user;
  const { topic, contact, question } = req.body;

  // Простая валидация входных данных
  if (!topic || !contact || !question) {
    return res.status(400).json({ message: 'Missing required fields: topic, contact, question' });
  }

  try {
    const newRequest = await createHelpRequest({
      topic,
      contact,
      question,
      userId, // Передаем ID аутентифицированного пользователя
    });
    res.status(201).json(newRequest); // Отправляем созданный запрос обратно
  } catch (error) {
    console.error('Error submitting help request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 