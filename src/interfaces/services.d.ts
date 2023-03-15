import { type Gif } from '@/interfaces';

export interface OneGif {
  gif: Gif;
}

export interface VariousGif {
  gifs: Gif[];
}

type APIData = VariousGif | OneGif;

export type AdaptedResponse<T extends APIData> =
  | ({ isOk: true } & T)
  | { isOk: false; errorMsg: string };
