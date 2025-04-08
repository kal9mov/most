import { Router } from 'express';
import { getMe, getPathProgressHandler, getQuestStatusesForUser } from '../controllers/userController';

const router = Router();

// GET /api/users/me - Получить данные текущего пользователя
router.get('/me', getMe);

// GET /api/users/me/path-progress - Получить прогресс пути
router.get('/me/path-progress', getPathProgressHandler);

// GET /api/users/me/quest-statuses - Получить статусы всех квестов для пользователя
router.get('/me/quest-statuses', getQuestStatusesForUser);

export default router; 