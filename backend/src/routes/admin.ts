import { Router } from 'express';
import { 
    getSubmissionsForReview, 
    reviewQuestSubmissionHandler 
} from '../controllers/adminController';
import { volunteerAuthMiddleware } from '../middleware/volunteerAuthMiddleware';

const router = Router();

// Применяем middleware проверки волонтера ко всем маршрутам в этом файле
router.use(volunteerAuthMiddleware);

// GET /api/admin/submissions - Получить отправки квестов на проверку (фильтр по status=SUBMITTED/APPROVED/REJECTED)
router.get('/submissions', getSubmissionsForReview);

// POST /api/admin/submissions/:submissionId/review - Одобрить/отклонить отправку
router.post('/submissions/:submissionId/review', reviewQuestSubmissionHandler);

// TODO: Добавить маршруты для управления Help Requests

export default router; 