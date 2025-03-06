'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { messages, defaultLocale, locales, getBrowserLocale } from './index';

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  availableLocales: string[];
};

// 创建上下文
const LanguageContext = createContext<LanguageContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  availableLocales: locales,
});

// 使用上下文的Hook
export const useLanguage = () => useContext(LanguageContext);

// 语言提供者组件
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // 初始化语言为浏览器首选语言或默认语言
  const [locale, setLocale] = useState(defaultLocale);

  // 在客户端挂载后设置语言
  useEffect(() => {
    // 尝试从localStorage获取保存的语言
    const savedLocale = localStorage.getItem('locale');
    
    if (savedLocale && locales.includes(savedLocale)) {
      setLocale(savedLocale);
    } else {
      // 否则使用浏览器首选语言
      const browserLocale = getBrowserLocale();
      setLocale(browserLocale);
    }
  }, []);

  // 当语言更改时保存到localStorage
  useEffect(() => {
    localStorage.setItem('locale', locale);
    // 更新HTML的lang属性
    document.documentElement.lang = locale;
  }, [locale]);

  // 提供语言上下文和IntlProvider
  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        availableLocales: locales,
      }}
    >
      <IntlProvider
        locale={locale}
        messages={messages[locale]}
        defaultLocale={defaultLocale}
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}
