export enum SortingOptions {
  CreatedAsc = 'created',
  CreatedDesc = '-created',
  NodeTitleAsc = 'title',
  NodeTitleDesc = '-title'
}

export type Maybe<T> = T | null;

export type ProductNodeAttributes = {
  drupal_internal__nid: number;
  title: string;
  field_price: number;
  field_body: {
    value: string;
  }
};

export type ProductNode = {
  id: string;
  attributes: ProductNodeAttributes;
};

export type ApiOptions = {
  bundle: string;
  fields: string[];
  limit?: number;
  sort?: SortingOptions;
};

export type ApiResponseData = {
  data: ProductNode[];
};
