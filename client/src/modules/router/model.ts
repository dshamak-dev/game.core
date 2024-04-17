import { Asset, AssetPayalod } from "modules/asset/model";
import { ErrorType } from "../api/model";

export interface Route {
  assets?:  Asset[]
  suspense: (progress: number, data?: any) => string;
  onload: (assets?: AssetPayalod<any>[]) => void;
  onerror: (message: string, reason: ErrorType) =>  void;
}