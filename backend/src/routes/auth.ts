import { Router } from 'express';
import { telegramCallback } from '../controllers/authController'; // Импортируем контроллер

const router = Router();

// Маршрут для обработки данных от Telegram Login Widget
router.post('/telegram/callback', telegramCallback);

export default router; 