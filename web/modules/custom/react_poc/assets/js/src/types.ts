export enum SortingOptions {
  CreatedAsc = 'created',
  CreatedDesc = '-created',
  NodeTitleAsc = 'title',
  NodeTitleDesc = '-title'
}

export type Maybe<T> = T | null;

export type TranslationKeys =
  'personalize'
  | 'inclVat'
  | 'exclVat';

export type Languages =
  'EN'
  | 'NL'
  | 'DE'
  | 'FR';

export type LanguageRecord = Record<Languages, string>;

export type TranslationRecord = Record<TranslationKeys, LanguageRecord>;

export interface ProductNode {
  id: string;
  attributes: {
    drupal_internal__nid: number;
    title: string;
    field_price: number;
    field_body: {
      value: string;
    }
  }
  relationships: {
    field_product_image: {
      data: {
        id: string;
      }
    }
  }
}

export interface MediaItem {
  id: string;
  relationships: {
    field_media_image: {
      data: {
        id: string;
        meta: {
          alt: string;
        }
      }
    }
  }
}

export interface File {
  id: string;
  attributes: {
    uri: {
      url: string;
    }
  }
}

export interface ApiOptions {
  bundle: string;
  fields: string[];
  mediaField: string;
  limit?: number;
  sort?: SortingOptions;
}

export interface ApiResponseData {
  data: ProductNode[];
  included: MediaItem[] | File[];
}

export interface NormalizedDataObject {
  apiId: string;
  drupalId: number;
  name: string;
  description?: string;
  price: number;
  image?: {
    altText: string;
    url: string;
  }
}

export interface ThemeProps {
  fonts: {
    primary: string;
  }
  colors: {
    purple: string;
    yellow: string;
    white: string;
  }
}
