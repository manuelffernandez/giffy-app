import { ResponseError } from '@/entities';
import {
  type KeyValueParam,
  type AdaptedResponse,
  type Gif,
  type OneGif,
  type VariousGif,
} from '@/interfaces';
import { errorHandler, setURLParams } from '@/services/utils';

export const getGifs = async (
  keyword: string
): Promise<AdaptedResponse<VariousGif> | AdaptedResponse<never>> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const GIFS_URL = new URL(`${import.meta.env.VITE_BASE_URL}/gifs/search`);

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

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { fixed_width } = images;

        return {
          title,
          url: fixed_width.url,
          id,
          size: {
            width: parseInt(fixed_width.width),
            height: parseInt(fixed_width.height),
          },
        };
      });

      // ts-assertion tooks 'true' as a boolean
      return {
        isOk: true as true,
        gifs,
        pagination: { ...resBody.pagination },
      };
    })
    .catch(errorHandler);
};

export const getGif = async (
  gifId: string
): Promise<AdaptedResponse<OneGif> | AdaptedResponse<never>> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const GIF_URL = new URL(`${import.meta.env.VITE_BASE_URL}/gifs`);

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
      const { original } = images;

      const gif: Gif = {
        title,
        url: original.url,
        id,
        size: {
          width: original.width,
          height: original.height,
        },
      };

      // ts-assertion tooks 'true' as a boolean
      return { isOk: true as true, gif };
    })
    .catch(errorHandler);
};
