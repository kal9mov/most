import TelegramBot from 'node-telegram-bot-api';
import { User } from '@prisma/client';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

let bot: TelegramBot | null = null;

if (BOT_TOKEN) {
    // Инициализируем бота (без polling, т.к. нам нужна только отправка)
    bot = new TelegramBot(BOT_TOKEN);
} else {
    console.warn('TELEGRAM_BOT_TOKEN not found in .env. Telegram notifications will be disabled.');
}

/**
 * Отправляет уведомление пользователю в Telegram.
 * @param user Объект пользователя (нужен telegramId).
 * @param message Текст сообщения.
 */
export const sendTelegramNotification = async (user: User, message: string): Promise<void> => {
    if (!bot) {
        console.warn('Telegram bot not initialized. Skipping notification.');
        return;
    }
    if (!user.telegramId) {
        console.warn(`User ${user.id} does not have a telegramId. Skipping notification.`);
        return;
    }

    try {
        // Telegram ID может быть BigInt, API ожидает number или string
        const chatId = Number(user.telegramId); 
        await bot.sendMessage(chatId, message);
        console.log(`Notification sent to user ${user.id} (TG: ${chatId})`);
    } catch (error: any) {
        console.error(`Failed to send notification to user ${user.id} (TG: ${user.telegramId}):`, error.message || error);
    }
}; 