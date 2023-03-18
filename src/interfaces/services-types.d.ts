import { type AdaptedTypes } from '@/interfaces';

export type AdaptedResponse<T extends AdaptedTypes> =
  | ({ isOk: true } & T)
  | { isOk: false; errorMsg: string };
