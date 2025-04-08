import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-[#333]">
          МОСТ
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-gray-600 hover:text-[#FF7A59] transition-colors font-medium">Главная</Link>
          <Link href="/help" className="text-gray-600 hover:text-[#FF7A59] transition-colors font-medium">Помощь</Link>
        </div>

        <div>
          <button className="bg-[#4682B4] text-white px-5 py-2 rounded-full hover:bg-[#3A6D9A] transition-colors text-sm font-medium">
            Войти
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header; 