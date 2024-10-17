import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class HelloUser extends LitElement {
  
  static properties = {
    who: {type: String},
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Hello User',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        who: {
          type: 'string',
          title: 'Who',
          description: 'Who to say hello to today'
        }
      }
    };
  }
  
  constructor() {
    super();
    this.who = 'User';
  }

  render() {
    return html`<p>Hello ${this.who}, Welcome!<p/>`;
  }
}

// registering the web component
const elementName = 'hello-user';
customElements.define(elementName, HelloUser);
