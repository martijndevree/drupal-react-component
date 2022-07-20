import { useEffect, useState } from 'react';
import isValidResponseData from './isValidResponseData';
import { API_ROOT } from '../config';
import {
  ApiOptions,
  ApiResponseData,
  Maybe,
  NormalizedDataObject
} from '../types';
import normalizeData from './normalizeData';

const useApi = (options: ApiOptions) => {
  const [data, setData] = useState<Maybe<NormalizedDataObject[]>>(null);
  const [error, setError] = useState<Maybe<Error>>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const optionsDependency: string = JSON.stringify(options);

  const headers: Headers = new Headers({
    Accept: 'application/vnd.api+json'
  });

  const fields: string = options.fields.join();
  const sort: string = options.sort ? `&sort=${options.sort}` : '';
  const limit: string = options.limit ? `&page[limit]=${options.limit}` : '';

  useEffect(() => {
    setLoading(true);
    const url = `${API_ROOT}/node/${options.bundle}?include=${options.mediaField}.field_media_image&fields[file--file]=uri,url&fields[node--${options.bundle}]=${fields}${sort}${limit}`;

    fetch(url, { headers })
      .then((response) => response.json())
      .then((responseData: ApiResponseData) => {
        if (isValidResponseData(responseData)) {
          setData(normalizeData(responseData));
        } else {
          throw new SyntaxError('Invalid data');
        }
      })
      .catch((responseError: Error) => setError(responseError))
      .finally(() => setLoading(false));
  }, [optionsDependency]);

  return { data, error, loading };
};

export default useApi;
