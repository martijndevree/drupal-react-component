import { Locales } from '../types';

const getDrupalLanguage = (): Locales => {
  /**
   * Getting the drupalSettings object is a bit tedious, since it is defined globally,
   * but React naturally doesn't know about it. Therefore, it needs to be marked as a global
   * variable, excluded from eslint and ignored by Typescript. See:
   * https://www.mediacurrent.com/blog/recipe-embedded-react-component-drupal
   * https://stackoverflow.com/questions/48011267/drupalsettings-is-not-defined-no-undef
   */
  /* global drupalSettings */
  /* eslint no-undef: ["error", { "typeof": true }] */
  // @ts-ignore
  const currentLanguage: string = drupalSettings.path.currentLanguage as string;
  let locale: Locales = Locales.EN;

  // Default case is redundant since 'locale' will always contain a value.
  // eslint-disable-next-line default-case
  switch (currentLanguage) {
    case 'nl':
    case 'nl-be':
      locale = Locales.NL;
      break;
    case 'fr':
    case 'fr-be':
      locale = Locales.FR;
      break;
    case 'de':
    case 'de-at':
      locale = Locales.DE;
      break;
  }

  return locale;
};

export default getDrupalLanguage;
