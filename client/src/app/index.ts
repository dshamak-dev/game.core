import { Router } from "modules/router";
import { route } from 'pages/profile/main';
import './style.css';
import { Store } from "modules/store";

export class App {
  static instance: App;
  static router: Router;
  static store: Store;
  
  element: HTMLElement;

  constructor() {
    App.instance = this;
    App.router = new Router();
    App.store = new Store();

    this.element = document.createElement("div");
    document.body.append(this.element);

    App.start();
  }

  static start() {
    Router.navigate(route);
  }

  static render(content: HTMLElement | string) {
    App.instance.element.innerHTML = '';

    if (!content) {
      return;
    }

    if (content instanceof HTMLElement) {
      App.instance.element.append(content);
    } else{
      App.instance.element.innerHTML = content;
    }
  }
}
