import { setCookie, LANG } from '@/components/providers/CookieProvider';
import { getI18n } from 'react-i18next';

/**
 * Get translated string by key (for use outside React components)
 * Use useMultiLanguage hook inside React components instead
 */
export const translate = (key: string): string => {
  const i18n = getI18n();
  return i18n.t(key);
};

/**
 * Change language
 */
export const changeLanguage = async (lang: string): Promise<void> => {
  const i18n = getI18n();
  if (i18n) {
    await i18n.changeLanguage(lang);
    setCookie(LANG, lang);
  }
};
