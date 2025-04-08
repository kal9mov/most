"use client"; // Клиентский компонент, если будем добавлять виджет Telegram

import React from 'react';
import TelegramLoginButton, { TelegramUser } from 'react-telegram-login'; // Импортируем компонент и тип пользователя

export default function LoginPage() {

  const handleTelegramResponse = (user: TelegramUser) => {
    console.log(user); // Выводим данные пользователя в консоль для проверки
    // TODO: Отправить данные (user) на бэкенд для аутентификации
    // Например, fetch('/api/auth/telegram', { method: 'POST', body: JSON.stringify(user) })
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#FFFBF5] p-4">
      {/* 64px - примерная высота хедера, чтобы центрировать контент по вертикали */} 
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-[#333] mb-3">Вход на платформу</h1>
        <p className="text-md text-[#666] mb-8">Войдите, чтобы получить доступ<br/>к своему Пути и Квестам.</p>

        <div className="bg-white p-8 rounded-xl shadow-lg flex justify-center"> {/* Добавляем flex justify-center для центровки виджета */}
          {/* Используем Telegram Login Widget */}
          <TelegramLoginButton 
            dataOnauth={handleTelegramResponse} 
            botName="MM0st_bot" 
            // Можно настроить внешний вид кнопки через data-size, data-radius, data-request-access
            // Например: requestAccess="write"
            // language="ru" // Можно указать язык
          /> 
        </div>
      </div>
    </div>
  );
} 