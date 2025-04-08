import React from 'react';
import Link from 'next/link';

export default function PanelQuestsReviewListPage() {
  // TODO: Получить список квестов на проверку с бэкенда
  const quests = [
    { id: 'q1', name: 'Оформить временную регистрацию', user: '#67890', date: '12.04.2024'}, 
    { id: 'q2', name: 'Сопроводить в госпиталь', user: '#34567', date: '10.04.2024'},
    { id: 'q3', name: 'Запросить льготы', user: '#12345', date: '08.04.2024'},
  ];

  return (
    <div className="container mx-auto p-4">
       {/* TODO: Добавить навигацию панели волонтера */}
      <h1 className="text-2xl font-bold mb-6">Квесты на проверку</h1>

      <div className="bg-white p-6 rounded-lg shadow">
         <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Название квеста</th>
              <th className="p-2">Пользователь</th>
              <th className="p-2">Дата отправки</th>
              <th className="p-2">Действие</th>
            </tr>
          </thead>
          <tbody>
            {quests.map(quest => (
              <tr key={quest.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{quest.name}</td>
                <td className="p-2">{quest.user}</td>
                <td className="p-2">{quest.date}</td>
                <td className="p-2">
                  <Link href={`/panel/quests-review/${quest.id}`} className="text-blue-600 hover:underline">
                    Проверить
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 