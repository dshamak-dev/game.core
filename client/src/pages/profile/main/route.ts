import { Route } from "modules/router/model";
import { suspense, mount } from "./view";
import { getProfile } from "pages/profile/main/actions";
import { delayMS } from "utils/promise.utils";

const route: Route = {
  assets: [
    { name: 'avatars', details: "avatar sprites", loader: () => delayMS(1000) },
    { name: 'profile', details: "profile", loader: getProfile },
    { name: "history", loader: () => delayMS(1000) },
    { name: "characters", loader: () => delayMS(1000, []) },
  ],
  suspense,
  onerror: (message: string) => {
    console.warn(message);
    return null;
  },
  onload: (data: any) => {
    mount();
  },
};

export default route;
