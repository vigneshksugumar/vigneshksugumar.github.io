import { html,LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

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
    this.who = 'User1';
  }

  render() {
    return html`
        <p>Hello ${this.who}, Welcome again 1.33!</p>
        <input id="simpleInput" type="text" value="${this.who}" />        
        `;
  }
}


customElements.define('hello-user', HelloUser);
