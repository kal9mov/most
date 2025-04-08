"use client"; // Может понадобиться для получения данных пользователя
import React from 'react';
import VolunteerPanelNav from '@/components/layout/VolunteerPanelNav'; // Путь через алиас

// Placeholder для компонента StatCard - Добавим темный цвет для заголовка
const StatCard = ({ title, value }: { title: string; value: string | number }) => (
  <div className="bg-white p-4 rounded-lg shadow text-center">
    <div className="text-sm text-gray-500 mb-1">{title}</div>
    <div className="text-3xl font-bold text-teal-600">{value}</div>
  </div>
);

export default function PanelDashboardPage() {
  // TODO: Получить имя пользователя
  const userName = "Мария"; 

  return (
    // Добавляем базовый темный цвет
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6 text-gray-900">
      <VolunteerPanelNav />
      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-center md:text-left mb-2">Панель Волонтера</h1>
        <p className="text-center md:text-left text-lg text-gray-600 mb-8">Здравствуйте, {userName}!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard title="Новые запросы помощи" value={2} />
          <StatCard title="Мои активные запросы" value={3} />
          <StatCard title="Квесты на проверку" value={1} />
        </div>
      </div>
    </div>
  );
} 