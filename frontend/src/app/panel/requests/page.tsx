import React from 'react';
import Link from 'next/link';
import VolunteerPanelNav from '@/components/layout/VolunteerPanelNav';

export default function PanelRequestsListPage() {
  // TODO: Получить список запросов с бэкенда
  const requests = [
    { id: '12345', category: 'Документы', user: 'Иван', date: '15.04.2024', status: 'В работе'}, 
    { id: '67890', category: 'Логистика', user: 'Анна', date: '14.04.2024', status: 'Новый'},
  ];

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6 text-gray-900">
      <VolunteerPanelNav />
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-6">Запросы Помощи</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          {/* TODO: Добавить фильтры и сортировку */}
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-700">
                <th className="p-2 font-semibold">ID Запроса</th>
                <th className="p-2 font-semibold">Категория</th>
                <th className="p-2 font-semibold">Пользователь</th>
                <th className="p-2 font-semibold">Дата</th>
                <th className="p-2 font-semibold">Статус</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <Link href={`/panel/requests/${req.id}`} className="text-blue-600 hover:underline">
                      #{req.id}
                    </Link>
                  </td>
                  <td className="p-2">{req.category}</td>
                  <td className="p-2">{req.user}</td>
                  <td className="p-2">{req.date}</td>
                  <td className="p-2">{req.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 