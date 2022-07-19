import React from "react";
import useApi from '../lib/useApi';
import NodeItem from './NodeItem';
import ErrorMessage from './ErrorMessage';
import { ApiOptions, SortingOptions } from '../types';

const NodeItemList = () => {
  const options: ApiOptions = {
    bundle: 'product',
    fields: [
      'id',
      'drupal_internal__nid',
      'title',
      'field_body',
      'field_price'
    ],
    sort: SortingOptions.CreatedDesc,
    limit: 10,
  };

  const { data, error, loading } = useApi(options);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  return (
    <>
      {data ? (
        data.map((item) => <NodeItem key={item.id} attributes={item.attributes} />)
      ) : (<p>No products found.</p>)}
    </>
  );
};

export default NodeItemList;
