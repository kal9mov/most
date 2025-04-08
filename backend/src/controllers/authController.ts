import { Request, Response } from 'express';
import { checkTelegramAuth } from '../lib/telegramAuth';
import { findOrCreateUser, TelegramUserData } from '../services/userService';
import { generateToken } from '../lib/jwt';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error("FATAL ERROR: TELEGRAM_BOT_TOKEN is not defined in .env file");
  process.exit(1);
}

// Обработчик колбэка от Telegram Login Widget
export const telegramCallback = async (req: Request, res: Response) => {
  const telegramData = req.body as TelegramUserData; // Получаем данные из тела запроса

  // 1. Проверяем наличие данных
  if (!telegramData || typeof telegramData !== 'object' || !telegramData.hash) {
    return res.status(400).json({ message: 'Invalid Telegram data received' });
  }

  // 2. Проверяем подлинность данных
  if (!checkTelegramAuth(BOT_TOKEN, telegramData)) {
    return res.status(403).json({ message: 'Invalid Telegram hash' });
  }

  // 3. Проверяем свежесть данных (например, не старше 1 часа = 3600 секунд)
  const currentTime = Math.floor(Date.now() / 1000);
  const dataAge = currentTime - telegramData.auth_date;
  if (dataAge > 3600) { 
    console.warn(`Stale Telegram data received (age: ${dataAge}s)`);
    // Можно вернуть ошибку или просто предупредить и продолжить
    // return res.status(400).json({ message: 'Telegram data is outdated' });
  }

  try {
    // 4. Находим или создаем пользователя в БД
    const user = await findOrCreateUser(telegramData);

    // 5. Генерируем JWT токен, включая ID и РОЛЬ пользователя
    const token = generateToken(user.id, user.role);

    // 6. Отправляем токен на фронтенд
    res.status(200).json({ token });

  } catch (error) {
    console.error('Error processing Telegram callback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 