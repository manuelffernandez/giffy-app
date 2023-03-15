import { ResponseError } from '@/entities';
import {
  type AdaptedResponse,
  type KeyValueParam,
  type TrendingTerms,
} from '@/interfaces';
import { errorHandler, setURLParams } from '@/services/utils';

export const getTrendingTerms = async (): Promise<
  AdaptedResponse<TrendingTerms> | AdaptedResponse<never>
> => {
  const TRENDING_URL = new URL(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `${import.meta.env.VITE_BASE_URL}/trending/searches`
  );

  const queryParams: KeyValueParam[] = [
    { paramKey: 'api_key', paramValue: import.meta.env.VITE_API_KEY },
  ];

  setURLParams(TRENDING_URL, queryParams);

  return await fetch(TRENDING_URL)
    .then(async res => {
      if (!res.ok) {
        throw new ResponseError('Bad fetch response', res);
      } else {
        return await res.json();
      }
    })
    .then(resBody => {
      const trendingTerms = resBody as string[];

      return { isOk: true as true, trendingTerms };
    })
    .catch(errorHandler);
};
