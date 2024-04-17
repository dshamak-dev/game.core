import { App } from "app";
import { Route } from "./model";
import { loadSync } from "utils/promise.utils";
import { ErrorType } from "modules/api/model";
import { AssetPayalod } from "modules/asset/model";
import { Store } from "modules/store";

export class Router {
  static instance: Router;

  constructor() {
    Router.instance = this;
  }

  static async navigate(route: Route) {
    const assets = route?.assets || [];
    const length = assets.length || 0;

    const handleChange = (payload: AssetPayalod<any>, index) => {
      const progress = (index + 1) / length;

      Store.set(payload.name, payload.data);

      App.render(route.suspense(progress, payload));
    };

    const handleError = (error, index) => {
      route.onerror(error?.message || error, ErrorType.Unknown);
    };

    const pipeline: (() => Promise<any>)[] = assets.map(
      (asset) => () =>
        asset.loader().then((data) => ({ name: asset.name, data }))
    );

    App.render(route.suspense(0));

    loadSync(pipeline, handleChange, handleError)
      .then((data) => {
        route.onload(data);
      })
      .catch((error) => {
        route.onerror(error?.message || error, ErrorType.Unknown);
      });
  }
}
