"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

// // Placeholder для карточки квеста
// const QuestCard = ({ title, description, status, onAction, actionLabel }: any) => (
//   <div className="bg-white p-4 rounded-lg shadow flex flex-col">
//     {/* Иконка-заглушка */}
//     <div className="w-12 h-12 bg-yellow-100 rounded-full mb-3 self-start"></div> 
//     <h3 className="font-semibold mb-1">{title}</h3>
//     <p className="text-sm text-gray-600 mb-3 flex-grow">{description}</p>
//     {status && <span className={`text-xs px-2 py-0.5 rounded-full self-start mb-3 ${status === 'Активен' ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'}`}>{status}</span>}
//     <button onClick={onAction} className="mt-auto w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-sm">
//       {actionLabel}
//     </button>
//   </div>
// );

// Восстанавливаем компонент FilterButton
const FilterButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm transition-colors ${active ? 'bg-teal-100 text-teal-700 ring-1 ring-inset ring-teal-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
    {label}
  </button>
);

export default function QuestsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');

  const statusFilters = ['Все', 'Активные', 'На проверке', 'Выполненные'];
  const categoryFilters = ['Документы', 'Здоровье', 'Карьера'];

  const [selectedStatus, setSelectedStatus] = useState<string>('Все');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
      if (initialCategory && categoryFilters.includes(initialCategory)) {
          return initialCategory;
      }
      return null;
  });

  const resetFilters = () => {
    setSelectedStatus('Все');
    setSelectedCategory(null);
  };

  return (
    <div className="container mx-auto p-4 bg-[#FFFBF5] text-gray-900">
      {/* Прогресс бар - заглушка */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="text-sm mb-1 text-gray-700">Прогресс Пути</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '57%' }}></div>
        </div>
        <div className="text-right text-sm mt-1 text-gray-700">57%</div>
      </div>

      {/* Описание */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">Что такое Квесты?</h2>
        <p className="text-gray-700">Здесь собраны задания, которые помогут вам освоиться к вернуться к мирной жизни шаг за шагом. Выполняйте их в своем темпе, при необходимости запрашивая помощь.</p>
      </div>

      {/* Фильтры */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2"> {/* Оборачиваем заголовок и кнопку сброса */}
          <h3 className="text-lg font-semibold text-gray-900">Фильтры:</h3>
          {/* Кнопка Сбросить все фильтры */} 
          {(selectedStatus !== 'Все' || selectedCategory !== null) && (
            <button 
              onClick={resetFilters}
              className="text-xs text-red-600 hover:text-red-800 font-medium"
            >
              Сбросить все фильтры
            </button>
          )}
        </div>
        {/* Фильтры по статусу */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-sm font-medium mr-2 self-center">Статус:</span>
          {statusFilters.map(status => (
            <FilterButton 
              key={status}
              label={status}
              active={selectedStatus === status} 
              onClick={() => setSelectedStatus(status)} 
            />
          ))}
        </div>
        {/* Фильтры по категории */}
        <div className="flex flex-wrap gap-2">
           <span className="text-sm font-medium mr-2 self-center">Тип:</span>
          {categoryFilters.map(category => (
            <FilterButton 
              key={category}
              label={category}
              active={selectedCategory === category} 
              onClick={() => setSelectedCategory(prev => prev === category ? null : category)} 
            />
          ))}
        </div>
      </div>

      {/* Сетка квестов */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* TODO: Отображать filteredQuests */}
        <p className="text-gray-700 col-span-full">Карточки квестов будут здесь... (Выбран статус: {selectedStatus}, Категория: {selectedCategory || 'не выбрана'})</p>
      </div>

    </div>
  );
} 