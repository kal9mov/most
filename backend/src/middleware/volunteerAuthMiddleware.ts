import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';

/**
 * Middleware для проверки, является ли пользователь волонтером.
 * Работает после authMiddleware.
 */
export const volunteerAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Проверяем, добавил ли authMiddleware пользователя и является ли он волонтером
    if (!req.user || req.user.role !== Role.VOLUNTEER) {
        return res.status(403).json({ message: 'Forbidden: Volunteer access required' });
    }
    // Если пользователь - волонтер, передаем управление дальше
    next();
}; 