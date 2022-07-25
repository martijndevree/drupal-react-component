import { Languages } from '../types';

const getDrupalLanguage = (): Languages => {
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

  // Default case is redundant since the final return catches any curveballs.
  // eslint-disable-next-line default-case
  switch (currentLanguage) {
    case 'nl':
    case 'nl-be':
      return 'NL';
    case 'fr':
    case 'fr-be':
      return 'FR';
    case 'de':
    case 'de-at':
      return 'DE';
  }

  return 'EN';
};

export default getDrupalLanguage;
