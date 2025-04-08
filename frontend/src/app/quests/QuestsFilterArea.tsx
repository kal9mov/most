"use client";

import React, { useState } from 'react'; 
import { useSearchParams } from 'next/navigation';

// Можно вынести в отдельный файл components/ui, если будет переиспользоваться
const FilterButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm transition-colors ${active ? 'bg-teal-100 text-teal-700 ring-1 ring-inset ring-teal-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
    {label}
  </button>
);

export default function QuestsFilterArea() {
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
    // TODO: Возможно, нужно будет обновить URL через router.push, если хотим, чтобы URL тоже сбрасывался
  };

  // TODO: Здесь будет логика фильтрации реальных квестов
  // const filteredQuests = ...

  return (
    <>
      {/* Фильтры */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Фильтры:</h3>
          {(selectedStatus !== 'Все' || selectedCategory !== null) && (
            <button 
              onClick={resetFilters}
              className="text-xs text-red-600 hover:text-red-800 font-medium"
            >
              Сбросить все фильтры
            </button>
          )}
        </div>
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
        <p className="text-gray-700 col-span-full">Карточки квестов будут здесь... (Выбран статус: {selectedStatus}, Категория: {selectedCategory || 'не выбрана'})</p>
        {/* TODO: Рендерить отфильтрованные карточки квестов */}
      </div>
    </>
  );
} 