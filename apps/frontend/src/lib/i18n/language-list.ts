import { LangEn } from '@/lib/i18n/locals/en';

export const LanguageList: Record<
  string,
  { name: string; nativeName: string }
> = {
  en: {
    name: 'English',
    nativeName: 'English',
  },
};

export const LanguageResources: Record<
  string,
  { translation: Record<string, string> }
> = {
  en: { translation: LangEn },
};
