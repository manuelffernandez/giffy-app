import { ResponseError } from '@/entities';
import {
  type AdaptedResponse,
  type Gif,
  type OneGif,
  type VariousGif,
} from '@/interfaces';

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
): Promise<AdaptedResponse<VariousGif> | AdaptedResponse<never>> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const GIFS_URL = new URL(`${import.meta.env.VITE_BASE_URL}/search`);

  const queryParams: KeyValueParam[] = [
    { paramKey: 'api_key', paramValue: import.meta.env.VITE_API_KEY },
    { paramKey: 'q', paramValue: keyword },
    { paramKey: 'limit', paramValue: '25' },
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
      const gifs: Gif[] = resBody.data.map((gifObject: any): Gif => {
        const { title, images, id } = gifObject;

        return {
          title,
          url: images.fixed_width.url,
          id,
        };
      });

      // ts-assertion tooks 'true' as a boolean
      return { isOk: true as true, gifs };
    })
    .catch(errorHandler);
};

export const getGif = async (
  gifId: string
): Promise<AdaptedResponse<OneGif> | AdaptedResponse<never>> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const GIF_URL = new URL(`${import.meta.env.VITE_BASE_URL}`);

  const queryParams: KeyValueParam[] = [
    { paramKey: 'api_key', paramValue: import.meta.env.VITE_API_KEY },
    { paramKey: 'ids', paramValue: gifId },
  ];

  setURLParams(GIF_URL, queryParams);

  return await fetch(GIF_URL)
    .then(async res => {
      if (!res.ok) {
        throw new ResponseError('Bad fetch response', res);
      } else {
        return await res.json();
      }
    })
    .then(resBody => {
      const { title, images, id } = resBody.data[0];

      const gif: Gif = {
        title,
        url: images.original.url,
        id,
      };

      // ts-assertion tooks 'true' as a boolean
      return { isOk: true as true, gif };
    })
    .catch(errorHandler);
};
