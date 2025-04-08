import React from 'react';

interface HelpCardProps {
  icon: React.ReactNode; // Ожидаем SVG иконку или другой React элемент
  title: string;
  description: string;
  onClick: () => void;
}

const HelpCard: React.FC<HelpCardProps> = ({ icon, title, description, onClick }) => {
  return (
    <div 
      className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200 text-center flex flex-col items-center"
      onClick={onClick}
    >
      {/* Место для иконки */}
      <div className="w-16 h-16 mb-4 flex items-center justify-center">
        {icon} 
      </div>
      <h3 className="text-xl font-semibold text-[#333] mb-2">{title}</h3>
      <p className="text-sm text-[#666]">{description}</p>
    </div>
  );
};

export default HelpCard; 