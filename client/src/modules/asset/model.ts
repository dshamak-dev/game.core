export interface Asset {
  name: string;
  details?: string;
  loader: () => Promise<any>
}

export interface AssetPayalod<T> {
  name: string;
  data: T;
}