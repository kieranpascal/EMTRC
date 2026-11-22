import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  getDictionary,
  resolveLocale,
  SUPPORTED_LANGUAGES,
  type LanguageOption,
  type LocaleCode,
  type UiDictionary,
} from '../content/i18n';

interface LanguageContextValue {
  locale: LocaleCode;
  setLocale: (next: LocaleCode) => void;
  t: UiDictionary;
  languages: readonly LanguageOption[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = 'emtrc-lang';

function getInitialLocale(): LocaleCode {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) return resolveLocale(saved);
  } catch {
    // Ignore storage restriction
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(getInitialLocale);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale === 'en' ? 'en-GB' : locale;
    }
  }, [locale]);

  const setLocale = (next: LocaleCode) => {
    const resolved = resolveLocale(next);
    setLocaleState(resolved);
    try {
      window.localStorage.setItem(STORAGE_KEY, resolved);
    } catch {
      // Ignore storage restriction
    }
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: getDictionary(locale),
      languages: SUPPORTED_LANGUAGES,
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
