"use client";

import React, { useState } from 'react';
import Modal from '../../components/ui/Modal'; // Обновленный относительный путь
import HelpCard from '../../components/HelpCard'; // Обновленный относительный путь

// TODO: Заменить заглушки на реальные SVG иконки
const icons = {
  info: <span className="text-3xl">ℹ️</span>, // Пример заглушки
  moscow: <span className="text-3xl">📍</span>, // Пример заглушки
  duty: <span className="text-3xl">🕒</span>, // Пример заглушки
  career: <span className="text-3xl">💼</span>, // Пример заглушки
};

// Переименовываем компонент для ясности (не обязательно, но полезно)
export default function HelpPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContentId, setModalContentId] = useState<string | null>(null);

  const openModal = (contentId: string) => {
    setModalContentId(contentId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContentId(null);
  };

  const helpCardsData = [
    { id: 'info', title: 'Информбюро', description: 'Поддержка в решении административных и бытовых вопросов' },
    { id: 'moscow', title: 'Покажите мне Москву', description: 'Организация экскурсий по столице для бойцов' },
    { id: 'duty', title: 'Дежурный по Москве', description: 'Помощь с логистикой, транспортом, визитами к врачу' },
    { id: 'career', title: 'В СВОей сфере', description: 'Консультации по учебе, трудоустройству и самореализации' },
  ];

  const renderModalContent = () => {
    switch (modalContentId) {
      case 'info':
        return (
          <div>
            {/* Иконка и Заголовок */}
            <div className="flex items-center mb-4">
              {/* TODO: Использовать реальную SVG иконку */}
              <div className="w-10 h-10 bg-[#63C1C0] rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-2xl font-bold">i</span>
              </div>
              <h2 className="text-xl font-semibold text-[#333]">Информбюро:<br/>Помощь с вопросами</h2>
            </div>

            {/* Описание */}
            <p className="text-sm text-[#666] mb-6">
              Здесь вы можете задать вопрос по административным, 
              бытовым или юридическим вопросам в Москве. Наши 
              волонтеры помогут найти нужную информацию и 
              окажут поддержку.
            </p>

            {/* Форма */}
            <form>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium text-[#333] mb-1">Контакты:</label>
                <input 
                  type="text" 
                  id="contact" 
                  name="contact" 
                  placeholder="Ваш Telegram или телефон" 
                  className="w-full p-2 border border-gray-300 rounded-lg bg-[#F8F8F8] focus:outline-none focus:ring-1 focus:ring-[#63C1C0] focus:border-[#63C1C0]"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="question" className="block text-sm font-medium text-[#333] mb-1">Опишите ваш вопрос или ситуацию:</label>
                <textarea 
                  id="question" 
                  name="question" 
                  rows={4} 
                  className="w-full p-2 border border-gray-300 rounded-lg bg-[#F8F8F8] focus:outline-none focus:ring-1 focus:ring-[#63C1C0] focus:border-[#63C1C0]"
                />
              </div>
              
              {/* Кнопка отправки */}
              <button 
                type="submit" 
                className="w-full bg-[#63C1C0] text-white py-3 rounded-lg hover:bg-[#51A8A6] transition-colors font-semibold"
              >
                Отправить вопрос
              </button>
            </form>
          </div>
        );
      case 'moscow':
        return <div>Содержимое для Покажите мне Москву</div>;
      case 'duty':
         return <div>Содержимое для Дежурный по Москве</div>;
      case 'career':
         return <div>Содержимое для В СВОей сфере</div>;
       case 'custom_request':
         return <div>Форма для кастомного запроса</div>;
      default:
        return <div>Загрузка...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] p-8 flex flex-col items-center font-sans">
       {/* Возможно, здесь будет общая навигация сайта, которая рендерится в layout.tsx */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#333] mb-2">Мы можем помочь Вам</h1>
        <p className="text-lg text-[#666]">Найдите то, что нужно</p>
      </header>

      <main className="w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {helpCardsData.map((card) => (
             <HelpCard
               key={card.id}
               icon={icons[card.id as keyof typeof icons]}
               title={card.title}
               description={card.description}
               onClick={() => openModal(card.id)}
             />
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-[#333] mb-4">Нет нужной помощи?</p>
          <button
            className="bg-white text-[#333] px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
            onClick={() => openModal('custom_request')}
          >
            Оставить свой запрос
          </button>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {renderModalContent()}
         <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors block ml-auto" // Добавил block ml-auto для выравнивания вправо
        >
          Закрыть
        </button>
      </Modal>
    </div>
  );
} 