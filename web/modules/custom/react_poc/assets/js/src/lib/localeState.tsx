import React, {
  createContext,
  FC,
  useContext,
  useState
} from 'react';
import { Locales, Translation } from '../types';
import translations from '../translations';

type Context = {
  locale: Locales;
  setLocale: React.Dispatch<React.SetStateAction<Locales>>,
  t: (key: string) => string
};

type Props = {
  children: any;
};

const defaultValue: Context = {
  locale: Locales.EN,
  setLocale: () => {},
  t: () => ''
};

const LocalStateContext = createContext<Context>(defaultValue);
const LocalStateProvider = LocalStateContext.Provider;

const LocaleStateProvider: FC<Props> = ({ children }) => {
  const [locale, setLocale] = useState<Locales>(Locales.NL);

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

// Custom hook for accessing the locale state
const useTranslation = () => (useContext(LocalStateContext));

export { LocaleStateProvider, useTranslation };
