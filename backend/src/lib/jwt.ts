import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'; // Время жизни токена (по умолчанию 7 дней)

if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined in .env file");
  process.exit(1); // Выход, если секрет не задан
}

interface JwtPayload {
  userId: string;
  role: Role;
  // Можно добавить другие поля, например, роли
}

/**
 * Генерирует JWT токен для пользователя.
 * @param userId ID пользователя.
 * @param role Роль пользователя.
 * @returns Сгенерированный JWT токен.
 */
export const generateToken = (userId: string, role: Role): string => {
  const payload: JwtPayload = { userId, role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Проверяет и декодирует JWT токен.
 * @param token JWT токен для проверки.
 * @returns Расшифрованные данные (payload) или null, если токен невалиден.
 */
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (decoded && typeof decoded.userId === 'string' && typeof decoded.role === 'string') {
        return decoded;
    }
    console.error('Invalid token payload structure');
    return null;
  } catch (error) {
    console.error('Invalid or expired token:', error);
    return null;
  }
}; 