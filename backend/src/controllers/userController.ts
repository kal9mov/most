import { Request, Response } from 'express';
import { findUserById } from '../services/userService';
import { getMaxPossiblePoints } from '../services/questService'; // Импортируем функцию для макс. очков

/**
 * Получает данные текущего аутентифицированного пользователя.
 */
export const getMe = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
  }
  const { userId } = req.user;
  try {
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found for this token' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Рассчитывает и возвращает прогресс пути пользователя в процентах.
 */
export const getPathProgressHandler = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { userId } = req.user;

    try {
        // Получаем пользователя (чтобы знать его очки)
        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Получаем максимально возможные очки
        const maxPoints = await getMaxPossiblePoints();

        // Рассчитываем прогресс
        let progressPercent = 0;
        if (maxPoints > 0) {
            progressPercent = Math.round((user.totalPoints / maxPoints) * 100);
            // Ограничиваем 100%, если очков больше максимума (на всякий случай)
            progressPercent = Math.min(progressPercent, 100);
        }

        res.status(200).json({ 
            currentPoints: user.totalPoints, 
            maxPoints: maxPoints,
            progressPercent 
        });

    } catch (error) {
        console.error('Error calculating path progress:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}; 