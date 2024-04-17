class Component extends HTMLElement {
  state = {
    profile: null,
    characters: null
  };

  get root(): HTMLElement {
    return this.shadowRoot.firstElementChild as HTMLElement;
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(document.createElement('div'));

    this.root.onclick = (event) => {
      const target = event.target as HTMLElement;
      let actionType = target.getAttribute('data-action');

      if (!actionType) {
        actionType = target.parentElement?.getAttribute('data-action');
      }
      
      this.dispatch(actionType, null);
    };
  }

  // Custom element added to page
  connectedCallback() {}

  // Custom element removed from page
  disconnectedCallback() {}

  // Custom element moved to new page
  adoptedCallback() {}

  // Attribute has changed
  attributeChangedCallback(name, oldValue, newValue) {}

  dispatch(name: string, payload: any) {
    switch (name) {
      case 'init': {
        this.state = payload || {};
        break;
      }
      case 'character/create': {
        console.log('create new character');
        break;
      }
      default: {
        break;
      }
    }

    this.render();
  }

  render() {
    const { profile, characters } = this.state;
    let content = ``;

    content += `<h2>Profile page</h2>`;

    if (profile) {
      content += `<h1>${profile.name}</h1>`;
    }

    content += `<div>${characters.length} characters</div>`;

    content += `<button data-action="character/create" id="create-character">create new character</button>`;

    this.root.innerHTML = content;
  }
}

export default Component;