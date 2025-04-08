"use client";
import React from 'react';
import VolunteerPanelNav from '@/components/layout/VolunteerPanelNav';

export default function PanelProfilePage() {
  // TODO: Получить данные профиля волонтера
  const profile = {
    name: 'Мария',
    email: 'maria@example.com',
    telegram: '@maria_volunteer',
    role: 'Волонтер'
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6 text-gray-900">
      <VolunteerPanelNav />
      <div className="flex-grow bg-white p-6 rounded-lg shadow max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Мой Профиль</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Имя:</label>
            <p className="text-lg text-gray-800">{profile.name}</p>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-500">Email:</label>
            <p className="text-lg text-gray-800">{profile.email}</p>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-500">Telegram:</label>
            <p className="text-lg text-gray-800">{profile.telegram}</p>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-500">Роль:</label>
            <p className="text-lg text-gray-800">{profile.role}</p>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
           <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
             Редактировать
           </button>
        </div>

      </div>
    </div>
  );
} 