import React, { Suspense } from 'react';
import QuestsFilterArea from './QuestsFilterArea';

export default function QuestsPage() {

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

      {/* Оборачиваем клиентский компонент с фильтрами в Suspense */}
      <Suspense fallback={<div className="text-center p-4">Загрузка фильтров и квестов...</div>}>
        <QuestsFilterArea />
      </Suspense>

    </div>
  );
} 