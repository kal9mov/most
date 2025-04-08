// Точка входа для backend приложения

import dotenv from 'dotenv';
dotenv.config(); // Загружаем переменные окружения из .env

import express, { Request, Response } from 'express';
import cors from 'cors'; // Импортируем cors
import { authMiddleware } from './middleware/authMiddleware'; // Импортируем authMiddleware
import authRoutes from './routes/auth'; // Импортируем маршруты аутентификации
import helpRequestRoutes from './routes/helpRequest'; // Импортируем маршруты помощи
import questRoutes from './routes/quest'; // Импортируем маршруты квестов
import pathStepRoutes from './routes/pathStep'; // Импортируем маршруты этапов пути
import userRoutes from './routes/user'; // Импортируем маршруты пользователя
import adminRoutes from './routes/admin'; // Импортируем админские маршруты
// import questRoutes from './routes/quest';
// import pathStepRoutes from './routes/pathStep';

const app = express();
const port = process.env.BACKEND_PORT || 3001; // Используем переменную окружения или порт 3001 по умолчанию

// Настройка CORS
const allowedOrigins = [
    'http://localhost:3000', // Адрес фронтенда при локальной разработке
    process.env.FRONTEND_URL // Адрес фронтенда в production или через ngrok (из .env)
];

app.use(cors({
    origin: function (origin, callback) {
        // Разрешаем запросы без origin (например, Postman) или из списка разрешенных
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Если нужны куки или заголовки авторизации
}));

app.use(express.json()); // Включаем парсинг JSON тела запросов

// Подключаем middleware для аутентификации
app.use(authMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running!');
});

// Подключаем маршруты аутентификации с префиксом /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/help-requests', helpRequestRoutes); // Подключаем маршруты помощи
app.use('/api/quests', questRoutes); // Подключаем маршруты квестов
app.use('/api/path-steps', pathStepRoutes); // Подключаем маршруты этапов пути
app.use('/api/users', userRoutes); // Подключаем маршруты пользователя
app.use('/api/admin', adminRoutes); // Защищен через middleware в самом роутере

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
}); 