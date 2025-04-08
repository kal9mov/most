"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // Хук для получения [id] из URL
import VolunteerPanelNav from '@/components/layout/VolunteerPanelNav'; // Путь через алиас

export default function PanelRequestDetailPage() {
  const params = useParams();
  const requestId = params.id; // Получаем ID из URL

  // TODO: Получить данные запроса с бэкенда по requestId
  const requestDetails = {
    id: requestId,
    user: '12345',
    category: 'Документы', 
    status: 'В работе',
    dateCreated: '14.04.2024',
    dateReceived: '15.04.2024',
    text: 'Мне требуется помощь с оформлением документов для получения льгот. Не могли бы вы подсказать, какие справки мне нужны?',
    contact: '[Номер телефона]',
    history: [
      { status: 'В работе', date: '15.04.2024', comment: 'Принято в работу'},
      { status: 'Ожидает ответа', date: '14.04.2024', comment: 'Направлен запрос'},
    ]
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6 text-gray-900">
      <VolunteerPanelNav />
      <div className="flex-grow bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Детали Запроса #{requestDetails.id}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><span className="font-semibold">Пользователь:</span> {requestDetails.user}</div>
          <div><span className="font-semibold">Категория:</span> <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-sm">{requestDetails.category}</span></div>
          <div><span className="font-semibold">Текущий Статус:</span> {requestDetails.status}</div>
          <div><span className="font-semibold">Дата поступления:</span> {requestDetails.dateReceived}</div>
          <div><span className="font-semibold">Дата создания:</span> {requestDetails.dateCreated}</div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Текст запроса:</h3>
          <p className="text-gray-700 bg-gray-50 p-3 rounded">{requestDetails.text}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-1">Контактная информация:</h3>
          <p className="text-gray-700">{requestDetails.contact}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-1">История Статусов:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {requestDetails.history.map((item, index) => (
              <li key={index}>Статус изменен на "{item.status}" - {item.date}. {item.comment && `Комментарий: ${item.comment}`}</li>
            ))}
          </ul>
        </div>

        {/* Действия */}
        <div className="flex flex-wrap gap-2 border-t pt-4">
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">Изменить статус</button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Добавить комментарий</button>
          <button className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200">Закрыть</button>
          <Link href="/panel/requests" className="text-gray-600 hover:underline ml-auto self-center">
            Назад к списку
          </Link>
        </div>
      </div>
    </div>
  );
} 