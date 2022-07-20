import React, { FC } from 'react';
import useApi from '../lib/useApi';
import NodeItem from './NodeItem';
import ErrorMessage from './ErrorMessage';
import { ApiOptions, SortingOptions } from '../types';

const NodeItemList: FC = () => {
  const options: ApiOptions = {
    bundle: 'product',
    fields: [
      'id',
      'drupal_internal__nid',
      'title',
      'field_body',
      'field_price',
      'field_product_image'
    ],
    mediaField: 'field_product_image',
    sort: SortingOptions.CreatedDesc,
    limit: 10
  };

  const { data, error, loading } = useApi(options);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  return (
    <div>
      {data ? (
        data.map((item) => <NodeItem key={item.apiId} item={item} />)
      ) : (<p>No products found.</p>)}
    </div>
  );
};

export default NodeItemList;
