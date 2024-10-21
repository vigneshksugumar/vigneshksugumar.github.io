import { html,LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
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
          description: 'Who to say hello to today',
          isValueField: true
        }
      },
      events: ["ntx-value-change"],
    };
  } 
  
  constructor() {
    super();
    this.who = 'User';
  }

  onChange(e) {
    const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        // value coming from input change event. 
        detail: e,
    };
    const event = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(e);
    console.log(e);
}

  render() {
    return html`
        <p>Hello ${this.who}, Welcome again 1.22!<p/>  
        <input id="simpleInput" type="text" value="${this.who}" @change=${() => this.onChange()} />        
        `;
  }
}

// registering the web component
const elementName = 'hello-user';
customElements.define(elementName, HelloUser);
