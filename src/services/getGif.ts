import { ResponseError } from '@/entities';
import {
  type AdaptedResponse,
  type Gif,
  type KeyValueParam,
  type OneGif,
} from '@/interfaces';
import { errorHandler, setURLParams } from './utils';

const getGif = async (
  gifId: string
): Promise<AdaptedResponse<OneGif> | AdaptedResponse<never>> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const GIF_URL = new URL(`${import.meta.env.VITE_BASE_URL}/gifs`);

  const queryParams: KeyValueParam[] = [
    { paramKey: 'api_key', paramValue: import.meta.env.VITE_API_KEY },
    // get by ID comma separated API queryparam
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

export default getGif;
