import type { LanguageCode, LanguageInfo, TranslationSchema } from '../types';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { hi } from './hi';

export const availableLanguages: LanguageInfo[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

export const translations: Record<LanguageCode, TranslationSchema> = {
  en,
  es,
  fr,
  de,
  hi,
};
