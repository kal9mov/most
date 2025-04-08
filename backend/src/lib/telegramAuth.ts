import crypto from 'crypto';

/**
 * Проверяет подлинность данных, полученных от Telegram Login Widget.
 * @param botToken Секретный токен вашего Telegram-бота.
 * @param data Объект с данными пользователя от Telegram (включая hash).
 * @returns true, если данные подлинные, иначе false.
 */
export const checkTelegramAuth = (botToken: string, data: Record<string, any>): boolean => {
  if (!data.hash || !botToken) {
    return false;
  }

  const hash = data.hash;
  // Удаляем поле hash из объекта данных перед созданием строки для проверки
  const dataToCheck = { ...data };
  delete dataToCheck.hash;

  // Формируем строку данных для проверки: ключи сортируются по алфавиту,
  // пары ключ=значение соединяются через \n
  const dataCheckString = Object.keys(dataToCheck)
    .sort()
    .map(key => `${key}=${dataToCheck[key]}`)
    .join('\n');

  try {
    // Создаем секретный ключ из токена бота
    const secretKey = crypto.createHash('sha256')
      .update(botToken)
      .digest();

    // Вычисляем HMAC-SHA256 хэш для строки данных
    const hmac = crypto.createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    // Сравниваем вычисленный хэш с полученным
    return hmac === hash;
  } catch (error) {
    console.error('Error checking Telegram auth hash:', error);
    return false;
  }
}; 