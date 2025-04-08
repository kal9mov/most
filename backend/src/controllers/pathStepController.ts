import { Request, Response } from 'express';
import { getPathSteps } from '../services/pathStepService';

export const fetchPathSteps = async (req: Request, res: Response) => {
  try {
    const steps = await getPathSteps();
    res.status(200).json(steps);
  } catch (error) {
    console.error('Error fetching path steps:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 