'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { FaGlobe } from 'react-icons/fa';

// 语言名称映射
const localeNames: Record<string, string> = {
  'en-US': 'English',
  'zh-CN': '中文',
};

export default function LanguageSwitcher() {
  const { locale, setLocale, availableLocales } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <FaGlobe className="h-4 w-4" />
        <span>{localeNames[locale]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {availableLocales.map((localeOption) => (
              <button
                key={localeOption}
                className={`block w-full px-4 py-2 text-left text-sm ${
                  locale === localeOption
                    ? 'bg-gray-100 text-primary dark:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                onClick={() => changeLanguage(localeOption)}
                role="menuitem"
              >
                {localeNames[localeOption]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
