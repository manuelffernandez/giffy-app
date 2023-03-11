type APIData = any;

export type AdaptedResponse<T extends APIData> =
  | { isOk: true; gifs: T }
  | { isOk: false; errorMsg: string };

// export interface AdaptedResponse<T extends APIData> {
//   isOk: boolean;
//   gifs: APIData;
// }
