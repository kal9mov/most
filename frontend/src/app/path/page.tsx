import React from 'react';
import Link from 'next/link';

// Placeholder для карточки этапа
const PathStepCard = ({ number, title, description, statusIcon, links }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-md mb-4 relative">
    {/* TODO: Добавить линии связи между карточками */}
    <div className="flex items-start">
      {/* Иконка статуса - заглушка */}
      <div className={`w-12 h-12 rounded-full mr-4 flex items-center justify-center ${statusIcon.bgColor}`}>
         {statusIcon.icon} 
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{number}. {title}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex space-x-4 text-sm">
          {links.map((link: any) => (
            <Link key={link.href} href={link.href} className="text-teal-600 hover:underline">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function PathPage() {
  // TODO: Получить реальные этапы и их статусы
  const steps = [
    { 
      number: 1, title: 'Оформление Документов', description: 'Получите базовые документы и подайте необходимые заявки',
      statusIcon: { icon: '🔒', bgColor: 'bg-gray-200' }, 
      links: [{ label: 'Квесты этапа', href: '/quests?filter=docs' }, { label: 'Полезная информация', href: '#' }, { label: 'Запросить помощь', href: '/help?topic=docs' }] 
    },
    { 
      number: 2, title: 'Здоровье и Восстановление', description: 'Позаботьтесь о своем здоровье и психологическом состоянии',
      statusIcon: { icon: '🔄', bgColor: 'bg-teal-100' }, // Пример
      links: [{ label: 'Квесты этапа', href: '/quests?filter=health' }, { label: 'Полезная информация', href: '#' }, { label: 'Запросить помощь', href: '/help?topic=health' }] 
    },
    { 
      number: 3, title: 'Карьера и Развитие', description: 'Определитесь с обучением и трудовой деятельностью',
      statusIcon: { icon: '✔️', bgColor: 'bg-green-100' }, // Пример
      links: [{ label: 'Квесты этапа', href: '/quests?filter=career' }, { label: 'Полезная информация', href: '#' }, { label: 'Запросить помощь', href: '/help?topic=career' }] 
    },
    { 
      number: 4, title: 'Социализация', description: 'Восстановите связь с близкими и наладьте социальное взаимодействие',
      statusIcon: { icon: '👥', bgColor: 'bg-orange-100' }, // Пример
      links: [{ label: 'Квесты этапа', href: '/quests?filter=social' }, { label: 'Полезная информация', href: '#' }, { label: 'Запросить помощь', href: '/help?topic=social' }] 
    },
  ];

  return (
    <div className="container mx-auto p-4 bg-[#FFFBF5]">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#333] mb-2">Карта Вашего Пути</h1>
        <p className="text-lg text-[#666]">Следуйте этапам адаптации, которые помогут вам вернуться к мирной жизни</p>
      </header>

      <div className="max-w-2xl mx-auto">
        {steps.map(step => (
          <PathStepCard 
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            statusIcon={step.statusIcon}
            links={step.links}
          />
        ))}
      </div>
    </div>
  );
} 