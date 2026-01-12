/**
 * i18n 配置
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';

const resources = {
  'zh-CN': {
    translation: zhCN,
  },
  'en': {
    translation: enUS,
  },
};

// 检测用户语言：中文环境用中文，其他用英文
function detectUserLanguage(): string {
  // 先检查本地存储
  const stored = localStorage.getItem('i18nextLng');
  if (stored === 'zh-CN' || stored === 'en') {
    return stored;
  }

  // 检测浏览器语言
  const browserLang = navigator.language || navigator.languages?.[0];
  // 中文环境（zh-CN、zh-TW、zh-HK 等）使用中文
  if (browserLang && browserLang.startsWith('zh')) {
    return 'zh-CN';
  }
  // 其他所有环境使用英文
  return 'en';
}

// 初始化语言
const userLanguage = detectUserLanguage();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // 默认英文
    lng: userLanguage, // 使用检测到的语言

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
