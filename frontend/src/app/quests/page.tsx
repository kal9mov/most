import React from 'react';

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

// // Placeholder для фильтра
// const FilterButton = ({ label, active }: any) => (
//   <button className={`px-3 py-1 rounded-full text-sm transition-colors ${active ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
//     {label}
//   </button>
// );

export default function QuestsPage() {
  // // TODO: Получить реальные квесты и реализовать фильтрацию
  // const quests = [
  //   { id: 1, title: 'Оформить временную регистрацию', description: 'Краткое описание квеста', status: 'Активен', actionLabel: 'Подробнее' },
  //   { id: 2, title: 'Записаться к врачу', description: 'Краткое описание квеста', status: 'На проверке', actionLabel: 'Нужна помощь' },
  //   { id: 3, title: 'Подготовить резюме', description: 'Краткое описание квеста', status: 'Выполнен', actionLabel: 'Я выполнил' },
  //   { id: 4, title: 'Восстановить паспорт', description: 'Краткое описание квеста', status: 'Активен', actionLabel: 'Подробнее' },
  // ];

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
        <h3 className="text-lg font-semibold mb-2 text-gray-900">Фильтры:</h3>
        <div className="flex flex-wrap gap-2">
          <span className="text-gray-700">Фильтр 1</span> <span className="text-gray-700">Фильтр 2</span>
        </div>
      </div>

      {/* Сетка квестов */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <p className="text-gray-700">Карточки квестов будут здесь...</p>
      </div>

    </div>
  );
} 