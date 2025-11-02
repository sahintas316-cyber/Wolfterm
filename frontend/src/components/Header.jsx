import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchQuery.length < 2) return;
    try {
      const results = await api.searchProducts(searchQuery);
      setSearchResults(results);
      console.log('Search results:', results);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const languages = [
    { code: 'ru', name: 'РУС', flag: '🇷🇺' },
    { code: 'en', name: 'ENG', flag: '🇬🇧' },
    { code: 'it', name: 'ITA', flag: '🇮🇹' },
    { code: 'tr', name: 'TUR', flag: '🇹🇷' }
  ];

  return (
    <header className="bg-[#2b2b2b] text-white sticky top-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div className="bg-[#1a1a1a] border-b border-gray-700">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex gap-6">
              <Link to="/become-dealer" className="text-red-500 hover:text-red-400 transition-colors">
                {t('dealer')}
              </Link>
              <Link to="/about" className="hover:text-gray-300 transition-colors flex items-center gap-1">
                {t('about')} <ChevronDown className="w-3 h-3" />
              </Link>
              <Link to="/catalog" className="hover:text-gray-300 transition-colors flex items-center gap-1">
                {t('catalog')} <ChevronDown className="w-3 h-3" />
              </Link>
              <Link to="/support" className="hover:text-gray-300 transition-colors flex items-center gap-1">
                {t('support')} <ChevronDown className="w-3 h-3" />
              </Link>
              <Link to="/videos" className="hover:text-gray-300 transition-colors">
                {t('videos')}
              </Link>
              <Link to="/warranty" className="hover:text-gray-300 transition-colors">
                {t('warranty')}
              </Link>
              <Link to="/equipment" className="hover:text-gray-300 transition-colors flex items-center gap-1">
                {t('equipment')} <ChevronDown className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-2 py-1 rounded transition-all ${
                      language === lang.code
                        ? 'bg-red-600 text-white'
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
              <Link to="/login" className="hover:text-gray-300 transition-colors">
                {t('auth')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_17a22ec5-8e56-4b05-8432-58bb6f63aed4/artifacts/xojo9jlu_wolfterm%20logo.png" 
              alt="WolfTerm" 
              className="h-14 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-wider">WOLFTERM</span>
              <span className="text-sm font-light tracking-widest">SOLUTIONS</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-white text-black border-0 h-12"
              />
              <Button 
                onClick={handleSearch}
                className="bg-red-600 hover:bg-red-700 h-12 px-8"
              >
                {t('find')}
              </Button>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-red-600" />
            <a href="tel:88007006201" className="text-xl font-semibold hover:text-red-500 transition-colors">
              {t('phone')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#1a1a1a] border-t border-gray-700 py-4">
          <div className="container mx-auto px-4 flex flex-col gap-3">
            <Link to="/" className="hover:text-red-500 transition-colors">{t('home')}</Link>
            <Link to="/about" className="hover:text-red-500 transition-colors">{t('about')}</Link>
            <Link to="/catalog" className="hover:text-red-500 transition-colors">{t('catalog')}</Link>
            <Link to="/support" className="hover:text-red-500 transition-colors">{t('support')}</Link>
            <Link to="/videos" className="hover:text-red-500 transition-colors">{t('videos')}</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;