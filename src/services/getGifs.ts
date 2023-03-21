import { ResponseError } from '@/entities';
import {
  type AdaptedResponse,
  type Gif,
  type KeyValueParam,
  type VariousGif,
} from '@/interfaces';
import { errorHandler, setURLParams } from './utils';

interface Params {
  queryTerm: string;
  pageNumber?: number;
  limit?: number;
}

const getGifs = async ({
  queryTerm,
  pageNumber = 0,
  limit = 20,
}: Params): Promise<AdaptedResponse<VariousGif> | AdaptedResponse<never>> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const GIFS_URL = new URL(`${import.meta.env.VITE_BASE_URL}/gifs/search`);

  const queryParams: KeyValueParam[] = [
    { paramKey: 'api_key', paramValue: import.meta.env.VITE_API_KEY },
    { paramKey: 'q', paramValue: queryTerm },
    { paramKey: 'offset', paramValue: limit * pageNumber },
    { paramKey: 'limit', paramValue: limit },
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

export default getGifs;
