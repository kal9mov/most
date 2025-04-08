"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PanelQuestReviewDetailPage() {
  const params = useParams();
  const questId = params.id;

  // TODO: Получить данные квеста на проверку с бэкенда по questId
  const questDetails = {
    id: questId,
    name: 'Оформить временную регистрацию',
    userName: 'Иван',
    task: 'Получите временную регистрацию по месту пребывания',
    userComment: 'Регистрация получена в паспортном столе',
    attachedFile: 'document.pdf',
  };

  return (
    <div className="container mx-auto p-4">
      {/* TODO: Добавить навигацию панели волонтера */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-1">Проверка Квеста:</h1>
        <h2 className="text-xl text-gray-700 mb-6">{questDetails.name}</h2>

        <div className="mb-4">
          <span className="font-semibold">Пользователь:</span> {questDetails.userName}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Задание:</span> {questDetails.task}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Комментарий пользователя:</span>
          <p className="text-gray-700 bg-gray-50 p-3 rounded mt-1">{questDetails.userComment}</p>
        </div>
        <div className="mb-6">
          <span className="font-semibold">Прикрепленные файлы:</span>
          {/* TODO: Ссылка на скачивание файла */}
          <div className="mt-1">
            <Link href="#" className="text-blue-600 hover:underline">
              <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path></svg>
              {questDetails.attachedFile}
            </Link>
          </div>
        </div>

        {/* Действия */}
        <div className="border-t pt-4">
          <button className="w-full bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 mb-3">Подтвердить выполнение</button>
          <button className="w-full border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 mb-3">Отклонить</button>
          <div className="mb-2">
            <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700">Укажите причину отклонения (обязательно):</label>
            <textarea id="rejectionReason" rows={3} className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"></textarea>
          </div>
           <Link href="/panel/quests-review" className="text-gray-600 hover:underline block text-right mt-2">
            Назад к списку
          </Link>
        </div>

      </div>
    </div>
  );
} 