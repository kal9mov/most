// frontend/src/types/react-telegram-login.d.ts

declare module 'react-telegram-login' {
  import React from 'react';

  // Определяем базовый тип для данных пользователя Telegram
  export interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
  }

  // Определяем пропсы для компонента TelegramLoginButton
  export interface TelegramLoginButtonProps {
    botName: string;
    dataOnauth: (user: TelegramUser) => void;
    buttonSize?: 'large' | 'medium' | 'small';
    cornerRadius?: number;
    requestAccess?: string; // Например, 'write'
    usePic?: boolean;
    lang?: string; // Например, 'ru'
    widgetVersion?: number;
    className?: string;
    children?: React.ReactNode; // Позволяем добавлять дочерние элементы, если нужно
  }

  // Объявляем компонент
  const TelegramLoginButton: React.FC<TelegramLoginButtonProps>;

  export default TelegramLoginButton;
} 