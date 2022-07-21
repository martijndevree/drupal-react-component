export enum SortingOptions {
  CreatedAsc = 'created',
  CreatedDesc = '-created',
  NodeTitleAsc = 'title',
  NodeTitleDesc = '-title'
}

export type Maybe<T> = T | null;

export type ProductNode = {
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
};

export type MediaItem = {
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
};

export type File = {
  id: string;
  attributes: {
    uri: {
      url: string;
    }
  }
};

export type ApiOptions = {
  bundle: string;
  fields: string[];
  mediaField: string;
  limit?: number;
  sort?: SortingOptions;
};

export type ApiResponseData = {
  data: ProductNode[];
  included: MediaItem[] | File[];
};

export type NormalizedDataObject = {
  apiId: string;
  drupalId: number;
  name: string;
  description?: string;
  price: number;
  image?: {
    altText: string;
    url: string;
  }
};

export type ThemeProps = {
  fonts: {
    primary: string;
  }
  colors: {
    purple: string;
    yellow: string;
    white: string;
  }
};
