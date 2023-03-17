export interface Gif {
  title: string;
  url: string;
  id: string;
  measures: {
    width: number;
    height: number;
  };
}

export interface KeyValueParam {
  paramKey: string;
  paramValue: string;
}

export interface OneGif {
  gif: Gif;
}

export interface VariousGif {
  gifs: Gif[];
}

export interface TrendingTerms {
  trendingTerms: string[];
}

export type AdaptedTypes = VariousGif | OneGif | TrendingTerms;
