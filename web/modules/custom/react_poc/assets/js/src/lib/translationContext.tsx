import React, {
  createContext,
  FC,
  useContext
} from 'react';
import translations from '../translations';
import getDrupalLanguage from './getDrupalLanguage';
import { Languages, TranslationKeys } from '../types';

type Context = {
  currentLanguage: Languages;
  t: (key: TranslationKeys) => string;
};

type Props = {
  children: any;
};

const LocalStateContext = createContext<Context>({} as Context);
const LocalStateProvider = LocalStateContext.Provider;

const TranslationStateProvider: FC<Props> = ({ children }) => {
  const currentLanguage = getDrupalLanguage();

  // Returns a string based on the given translation key and the current language.
  // Example format: translations['personalize']['EN']
  const t = (key: TranslationKeys) => translations[key][currentLanguage];

  return (
    <LocalStateProvider value={{ currentLanguage, t }}>
      {children}
    </LocalStateProvider>
  );
};

// Custom hook for accessing the translation state.
const useTranslation = () => (useContext(LocalStateContext));

export { TranslationStateProvider, useTranslation };
