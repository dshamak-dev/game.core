import { App } from "app";
import { delayMS } from "utils/promise.utils";
import Component from "./component";
import { Store } from "modules/store";

export function suspense(progress: number, data = null): string {
  const hint = data?.details || data?.name || null;
  const parts = ["Loading", hint, `${progress * 100}%`].filter((it) => !!it);

  return `<div>${parts.join(" ")}</div>`;
}
const elementName = "profile-main";

export async function mount() {
  const state = {
    profile: Store.get("profile"),
    characters: Store.get("characters") || [],
  };

  App.render(`<div>Assets loaded</div>`);

  await delayMS(1000);

  if (!customElements.get(elementName)) {
    customElements.define(elementName, Component);
  }

  const element = document.createElement(elementName) as Component;
  element.dispatch("init", state);

  return App.render(element);
}
