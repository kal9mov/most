// import Image from 'next/image'; // Оставим, если будем использовать для картинки
// import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-gray-100">
      {/* Основной контент */}
      <main className="container mx-auto mt-8 flex-grow p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="md:flex md:items-center">
            {/* Текстовая часть */} 
            <div className="md:w-1/2 md:pr-8 text-center md:text-left mb-6 md:mb-0">
              <h1 className="text-4xl font-bold mb-4">Мост</h1>
              <p className="text-lg text-gray-700 mb-4">
                Единая платформа поддержки для участников СВО, их семей и жителей приграничных регионов.
              </p>
               <p className="text-lg text-gray-700 mb-6">
                Мы объединяем опытных специалистов и управленцев, готовых помочь в решении ваших нужд.
              </p>
            </div>
            {/* Изображение */}
            <div className="md:w-1/2 h-64 bg-gray-300 rounded-md flex items-center justify-center">
               {/* <Image src="/placeholder-image.png" alt="Абстрактные волны" width={500} height={256} className="rounded-md object-cover" /> */}
               <span className="text-gray-500">[Изображение]</span> 
            </div>
          </div>

          {/* Нижний текстовый блок */} 
          <div className="mt-8 pt-8 border-t border-gray-200">
             <p className="text-base text-gray-600">
              Платформа &quot;Мост&quot; – это современное цифровое решение, созданное для поддержки участников СВО, их семей и переселенцев из приграничных регионов.
              Наша платформа объединяет тех, кто нуждается в помощи, с опытными волонтёрами из сообщества &quot;Лидеры России – Москва&quot;.
              Через удобный интерфейс вы можете получить помощь в трёх ключевых направлениях: &quot;Информбюро&quot;, &quot;Дежурный по Москве&quot; и &quot;В СВОей сфере&quot;.
              Достаточно авторизоваться через Telegram, создать запрос, и наши волонтёры оперативно откликнутся на вашу просьбу.
              Платформа доступна как через веб-версию, так и через мобильное приложение, обеспечивая безопасность ваших данных и комфортное взаимодействие.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
