import React, {
  createContext,
  FC,
  useContext,
  useState
} from 'react';
import translations from '../translations';
import getDrupalLanguage from './getDrupalLanguage';
import { Locales, Translation } from '../types';

type Context = {
  locale: Locales;
  setLocale: React.Dispatch<React.SetStateAction<Locales>>,
  t: (key: string) => string
};

type Props = {
  children: any;
};

const LocalStateContext = createContext<Context>({} as Context);
const LocalStateProvider = LocalStateContext.Provider;

const LocaleStateProvider: FC<Props> = ({ children }) => {
  const [locale, setLocale] = useState<Locales>(getDrupalLanguage());

  // Returns a string based on the given translation key and the set locale.
  // Example format: translations['personalize']['EN']
  const t = (key: string) => translations[key][Locales[locale] as keyof Translation];

  return (
    <LocalStateProvider value={{
      locale,
      setLocale,
      t
    }}
    >
      {children}
    </LocalStateProvider>
  );
};

// Custom hook for accessing the locale state.
const useTranslation = () => (useContext(LocalStateContext));

export { LocaleStateProvider, useTranslation };
