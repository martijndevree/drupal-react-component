import { ApiResponseData } from '../types';

const isValidResponseData = (responseData: ApiResponseData): boolean => {
  if (responseData === null) return false;
  if (responseData.data === undefined
    || responseData.data === null
    || responseData.data.length === 0
    || responseData.included === undefined
    || responseData.included === null
    || responseData.included.length === 0) return false;
  return true;
};

export default isValidResponseData;
