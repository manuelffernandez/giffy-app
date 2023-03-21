import { type ResponseError } from '@/entities';
import { type KeyValueParam, type AdaptedResponse } from '@/interfaces';

export const errorHandler = (err: ResponseError): AdaptedResponse<never> => {
  return { isOk: false, errorMsg: err.message };
};

export const setURLParams = (
  URL: URL,
  KeyValueParams: KeyValueParam[]
): URL => {
  KeyValueParams.forEach(KeyValueParam => {
    if (typeof KeyValueParam.paramValue === 'number') {
      URL.searchParams.set(
        KeyValueParam.paramKey,
        KeyValueParam.paramValue.toString()
      );
    }
    URL.searchParams.set(
      KeyValueParam.paramKey,
      KeyValueParam.paramValue as string
    );
  });
  return URL;
};
