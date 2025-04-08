import { Router } from 'express';
import { fetchPathSteps } from '../controllers/pathStepController';

const router = Router();

// GET /api/path-steps
router.get('/', fetchPathSteps);

export default router; 