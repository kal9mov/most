import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/jwt';
import { Role } from '@prisma/client';

// Расширяем интерфейс Request, чтобы добавить свойство user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: Role;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Если нет заголовка или он не начинается с Bearer, 
    // просто идем дальше без аутентификации (для публичных роутов).
    // Защищенные роуты должны будут проверить наличие req.user сами.
    return next(); 
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    // Если токен пустой после Bearer
    return next();
  }

  const payload = verifyToken(token);

  if (!payload) {
    // Если токен невалиден или просрочен
    // Можно вернуть 401, но для гибкости просто не добавляем user
    return next();
  }

  // Токен валиден, добавляем данные пользователя в request
  req.user = {
    userId: payload.userId,
    role: payload.role,
  };

  next(); // Передаем управление следующему middleware или обработчику
}; 