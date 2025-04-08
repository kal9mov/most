import { Router } from 'express';
import { fetchQuests, submitQuestFileHandler } from '../controllers/questController';
import upload from '../lib/multerConfig'; // Импортируем настроенный multer

const router = Router();

// GET /api/quests
// GET /api/quests?category=Документы
router.get('/', fetchQuests);

// POST /api/quests/:questId/submit - Отправка файла для квеста
// Применяем middleware multer для обработки одного файла с именем 'questFile'
router.post(
    '/:questId/submit', 
    upload.single('questFile'), // Ожидаем файл в поле 'questFile'
    submitQuestFileHandler
);

export default router; 