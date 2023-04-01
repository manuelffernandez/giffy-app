export interface Gif {
  title: string;
  url: string;
  id: string;
  size: {
    width: number;
    height: number;
  };
}

export interface KeyValueParam {
  paramKey: string;
  paramValue: string | number;
}

export interface OneGif {
  gif: Gif;
}

export interface VariousGif {
  pagination: {
    totalCount: number;
    count: number;
    offset: number;
  };
  gifs: Gif[];
}

export interface TrendingTerms {
  trendingTerms: string[];
}

export type AdaptedTypes = VariousGif | OneGif | TrendingTerms;
