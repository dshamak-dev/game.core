import { App } from "app";
import { delayMS } from "utils/promise.utils";

export function suspense(progress: number): string {
  return `<div>Loading ${progress * 100}%</div>`;
}

export async function mount() {
  App.render(`<div>Assets loaded</div>`);

  await delayMS(2000);

  return App.render(`<div>Create Character</div>`);
}