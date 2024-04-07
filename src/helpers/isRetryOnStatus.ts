import { HttpStatusCode } from "axios";

/**
 * @description a helper fuction that check if the given status is a [401 , 500] satuts to help with error handling - whither to retry the request after error
 * @param {number} status
 * @returns {boolean}
 */
export const isRetryOnStatus = (status: number): boolean => {
  const retryOnStatus: number[] = [
    HttpStatusCode.Unauthorized,
    HttpStatusCode.InternalServerError,
  ];
  if (retryOnStatus.includes(status)) return false;
  return true;
};
