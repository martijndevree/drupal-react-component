import React, {
  createContext,
  FC,
  useContext
} from 'react';
import translations from '../translations';
import getDrupalLanguage from './getDrupalLanguage';
import { Locales, Translation } from '../types';

type Context = {
  locale: Locales;
  t: (key: string) => string
};

type Props = {
  children: any;
};

const LocalStateContext = createContext<Context>({} as Context);
const LocalStateProvider = LocalStateContext.Provider;

const LocaleStateProvider: FC<Props> = ({ children }) => {
  const locale = getDrupalLanguage();

  // Returns a string based on the given translation key and the set locale.
  // Example format: translations['personalize']['EN']
  const t = (key: string) => translations[key][Locales[locale] as keyof Translation];

  return (
    <LocalStateProvider value={{ locale, t }}>
      {children}
    </LocalStateProvider>
  );
};

// Custom hook for accessing the locale state.
const useTranslation = () => (useContext(LocalStateContext));

export { LocaleStateProvider, useTranslation };
