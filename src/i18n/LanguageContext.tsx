import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type {
  LanguageCode,
  LanguageContextType,
  TranslationKey,
} from './types';
import { availableLanguages, translations } from './translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedValue(obj: any, path: string): string {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return '';
    }
  }
  return typeof current === 'string' ? current : '';
}

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage?: LanguageCode;
}> = ({ children, initialLanguage = 'en' }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(initialLanguage);

  const languageInfo = useMemo(() => {
    return (
      availableLanguages.find(l => l.code === currentLanguage) ??
      availableLanguages[0]
    );
  }, [currentLanguage]);

  const t = useCallback(
    (key: TranslationKey): string => {
      const activeDict = translations[currentLanguage];
      const val = getNestedValue(activeDict, key);
      if (val) return val;

      // Fallback to English
      const fallback = getNestedValue(translations.en, key);
      return fallback || key;
    },
    [currentLanguage],
  );

  const value: LanguageContextType = useMemo(
    () => ({
      currentLanguage,
      languageInfo,
      availableLanguages,
      setLanguage: setCurrentLanguage,
      t,
    }),
    [currentLanguage, languageInfo, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Convenient alias
export const useTranslation = useLanguage;
