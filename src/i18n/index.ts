import { createIntl, createIntlCache } from 'react-intl';

// 导入语言文件
import enUS from './locales/en-US.json';
import zhCN from './locales/zh-CN.json';

// 支持的语言
export const locales = ['en-US', 'zh-CN'];
export const defaultLocale = 'zh-CN';

// 语言消息
export const messages: Record<string, Record<string, string>> = {
  'en-US': enUS,
  'zh-CN': zhCN,
};

// 创建缓存以提高性能
const cache = createIntlCache();

// 创建intl实例
export function getIntl(locale: string = defaultLocale) {
  return createIntl(
    {
      locale,
      messages: messages[locale] || messages[defaultLocale],
    },
    cache
  );
}

// 获取浏览器首选语言
export function getBrowserLocale(defaultValue = defaultLocale) {
  if (typeof window === 'undefined') return defaultValue;
  
  const browserLocale = navigator.language;
  
  // 检查是否支持该语言
  if (locales.includes(browserLocale)) {
    return browserLocale;
  }
  
  // 检查语言的基本部分是否匹配
  const baseLocale = browserLocale.split('-')[0];
  const matchingLocale = locales.find(locale => locale.startsWith(baseLocale));
  
  return matchingLocale || defaultValue;
}
