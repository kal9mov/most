"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/panel', label: 'Сводка' },
  { href: '/panel/requests', label: 'Запросы Помощи' },
  { href: '/panel/quests-review', label: 'Проверка Квестов' },
  { href: '/panel/profile', label: 'Профиль' },
];

const VolunteerPanelNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-[#333]">Панель волонтера</h2>
      <nav>
        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="mb-2">
                <Link 
                  href={item.href} 
                  className={`block px-4 py-2 rounded transition-colors ${ 
                    isActive 
                      ? 'bg-[#63C1C0] text-white' 
                      : 'text-gray-700 hover:bg-gray-100' 
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default VolunteerPanelNav; 