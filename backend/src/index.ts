// Точка входа для backend приложения

import express, { Request, Response } from 'express';

const app = express();
const port = process.env.BACKEND_PORT || 3001; // Используем переменную окружения или порт 3001 по умолчанию

app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running!');
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
}); 