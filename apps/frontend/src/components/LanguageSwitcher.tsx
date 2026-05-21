'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import { changeLanguage } from '@/lib/i18n/translate';
import { LanguageList } from '@/lib/i18n/language-list';
import { getSavedLanguage } from '@/lib/i18n';

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState(getSavedLanguage());
  const currentLangInfo = LanguageList[currentLanguage] || LanguageList['en'];

  const handleLanguageChange = async (locale: string) => {
    await changeLanguage(locale);
    setCurrentLanguage(locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-sidebar-accent transition-colors justify-start h-auto"
          aria-label="Change language"
        >
          <Globe className="size-4 text-sidebar-foreground" />
          <span className="text-sm text-sidebar-foreground">
            {currentLangInfo.nativeName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        {Object.entries(LanguageList).map(([locale, { nativeName }]) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLanguageChange(locale)}
            className={locale === currentLanguage ? 'bg-accent' : ''}
          >
            {nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
