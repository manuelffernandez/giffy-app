import { ResponseError } from '@/entities';
import { type AdaptedResponse, type Gif } from '@/interfaces';

interface KeyValueParam {
  paramKey: string;
  paramValue: string;
}

const errorHandler = (err: ResponseError): AdaptedResponse<never> => {
  return { isOk: false, errorMsg: err.message };
};

const setURLParams = (URL: URL, KeyValueParams: KeyValueParam[]): URL => {
  KeyValueParams.forEach(KeyValueParam => {
    URL.searchParams.set(KeyValueParam.paramKey, KeyValueParam.paramValue);
  });
  return URL;
};

export const getGifs = async (
  keyword: string
): Promise<AdaptedResponse<any> | AdaptedResponse<never>> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const GIFS_URL = new URL(`${import.meta.env.VITE_BASE_URL}/search`);

  const queryParams: KeyValueParam[] = [
    { paramKey: 'api_key', paramValue: import.meta.env.VITE_API_KEY },
    { paramKey: 'q', paramValue: keyword },
    { paramKey: 'limit', paramValue: '2' },
    { paramKey: 'offset', paramValue: '0' },
    { paramKey: 'rating', paramValue: 'g' },
    { paramKey: 'lang', paramValue: 'en' },
  ];

  setURLParams(GIFS_URL, queryParams);

  return await fetch(GIFS_URL)
    .then(async res => {
      if (!res.ok) {
        throw new ResponseError('Bad fetch response', res);
      } else {
        return await res.json();
      }
    })
    .then(resBody => {
      const gifs: Gif[] = resBody.data.map(
        (gifObject: any): Gif => ({
          title: gifObject.title as string,
          url: gifObject.images.fixed_height.url as string,
          id: gifObject.id,
        })
      );

      // ts-assertion
      return { gifs, isOk: true as true };
    })
    .catch(errorHandler);
};
