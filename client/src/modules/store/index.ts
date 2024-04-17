export class Store {
  static instance: Store;
  state: Object = {};

  constructor() {
    Store.instance = this;

    this.state = {};
  }

  static set(key: string, payload: any) {
    this.instance[key] = payload;
  }

  static get(key) {
    return this.instance[key];
  }
}