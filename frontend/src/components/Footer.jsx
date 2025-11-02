import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#2b2b2b] text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_17a22ec5-8e56-4b05-8432-58bb6f63aed4/artifacts/xojo9jlu_wolfterm%20logo.png" 
                alt="WolfTerm" 
                className="h-12 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold">WOLFTERM</span>
                <span className="text-sm font-light">SOLUTIONS</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Европейские котлы с гарантией 5 лет. Бойлеры от 100 до 3000 литров. Радиаторы отопления и котельная автоматика.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">{t('catalog')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/catalog/gas-boilers" className="text-gray-400 hover:text-red-500 transition-colors">
                  Газовые котлы
                </Link>
              </li>
              <li>
                <Link to="/catalog/boilers" className="text-gray-400 hover:text-red-500 transition-colors">
                  Бойлеры косвенного нагрева
                </Link>
              </li>
              <li>
                <Link to="/catalog/radiators" className="text-gray-400 hover:text-red-500 transition-colors">
                  Радиаторы отопления
                </Link>
              </li>
              <li>
                <Link to="/catalog/pipes" className="text-gray-400 hover:text-red-500 transition-colors">
                  Трубы Pe-Xa
                </Link>
              </li>
              <li>
                <Link to="/catalog/accessories" className="text-gray-400 hover:text-red-500 transition-colors">
                  Аксессуары и автоматика
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Информация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-red-500 transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-gray-400 hover:text-red-500 transition-colors">
                  Гарантия и сервис
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-400 hover:text-red-500 transition-colors">
                  Отзывы покупателей
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-gray-400 hover:text-red-500 transition-colors">
                  Видеообзоры
                </Link>
              </li>
              <li>
                <Link to="/become-dealer" className="text-gray-400 hover:text-red-500 transition-colors">
                  Стать дилером
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-red-600 flex-shrink-0" />
                <div>
                  <a href="tel:88007006201" className="text-gray-400 hover:text-red-500 transition-colors block">
                    8 800 700 62 01
                  </a>
                  <span className="text-xs text-gray-500">Бесплатный звонок по России</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-red-600 flex-shrink-0" />
                <a href="mailto:info@wolfterm.com" className="text-gray-400 hover:text-red-500 transition-colors">
                  info@wolfterm.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-red-600 flex-shrink-0" />
                <span className="text-gray-400">
                  Turkey, Istanbul
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2024 WolfTerm Solutions. Все права защищены.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-red-500 transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="hover:text-red-500 transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;