import { Route } from "modules/router/model";
import { suspense, mount } from './view';

const route: Route = {
  assets: [{ name: "character body parts" }],
  suspense,
  onerror: (message: string) => {
    console.warn(message);
    return null;
  },
  onload: () => {
    mount();
  },
};

export default route;