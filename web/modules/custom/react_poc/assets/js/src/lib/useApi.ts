import { useEffect, useState } from 'react';
import { ProductNode } from '../types';

const useApi = (url: string) => {
  const [data, setData] = useState<ProductNode[]>([] as ProductNode[]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const headers = new Headers({
    Accept: 'application/vnd.api+json',
  });

  useEffect(() => {
    setLoading(true);
    fetch(url, {headers})
      .then((response) => response.json())
      .then((responseData) => setData(responseData))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [url])

  // const url = `${API_ROOT}node/article?fields[node--article]=id,drupal_internal__nid,title,body&sort=-created&page[limit]=10`;

  return { data, error, loading };
};

export default useApi;
