import { useEffect, useState } from 'react';
import isValidResponseData from './isValidResponseData';
import { API_ROOT } from '../config';
import { ApiOptions, ApiResponseData, Maybe, ProductNode } from '../types';

const useApi = (options: ApiOptions) => {
  const [data, setData] = useState<Maybe<ProductNode[]>>(null);
  const [error, setError] = useState<Maybe<Error>>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const optionsDependency: string = JSON.stringify(options);

  const headers: HeadersInit = new Headers({
    Accept: 'application/vnd.api+json',
  });

  const fields: string = options.fields.join();
  const sort: string = options.sort ? `&sort=${options.sort}` : '';
  const limit: string = options.limit ? `&page[limit]=${options.limit}` : '';

  useEffect(() => {
    setLoading(true);
    const url = `${API_ROOT}/node/${options.bundle}?fields[node--${options.bundle}]=${fields}${sort}${limit}`;

    fetch(url, { headers })
      .then((response) => response.json())
      .then((responseData: ApiResponseData) => {
        if (isValidResponseData(responseData)) {
          setData(responseData.data);
        }
      })
      .catch((responseError: Error) => setError(responseError))
      .finally(() => setLoading(false));
  }, [optionsDependency])

  return { data, error, loading };
};

export default useApi;
