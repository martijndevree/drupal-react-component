import { ApiResponseData } from '../types';

/**
 * Returns true when responseData contains nodes.
 * Returns false in every other instance.
 * @param responseData
 */
const isValidResponseData = (responseData: ApiResponseData): boolean => (
  responseData?.data?.length > 0
);

export default isValidResponseData;
