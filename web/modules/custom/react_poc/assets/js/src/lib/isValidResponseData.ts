import { ApiResponseData } from '../types';

const isValidResponseData = (data: ApiResponseData): boolean => {
  if (data === null) {
    return false;
  }
  if (data.data === undefined ||
    data.data === null ||
    data.data.length === 0) {
    return false;
  }
  return true;
};

export default isValidResponseData;
