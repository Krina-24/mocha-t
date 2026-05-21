import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getCookie, LANG } from '@/components/providers/CookieProvider';
import { LanguageResources } from '@/lib/i18n/language-list';

export const getSavedLanguage = (): string => {
  return getCookie(LANG) ?? 'en';
};

if (!i18n.isInitialized) {
  const isBrowser = typeof window !== 'undefined';
  const savedLanguage = getSavedLanguage();

  if (isBrowser) {
    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        lng: savedLanguage,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
        resources: LanguageResources,
        react: {
          useSuspense: false,
        },
      });
  } else {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      resources: LanguageResources,
      react: {
        useSuspense: false,
      },
    });
  }
}

export default i18n;
