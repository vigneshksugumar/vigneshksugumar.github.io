import { html,LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { Task, TaskStatus } from 'https://cdn.jsdelivr.net/npm/@lit/task@1.0.1/+esm';
// define the component
export class OnPremWebApiRequest extends LitElement {
  
  static properties = {
    webApi: {type: String},
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'OnPrem WebApi Request',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        webApi: {
          type: 'string',
          title: 'webApi',
          description: 'Api Url'
        }
      }
    };
  } 
  
  constructor() {
    super();
    this.webApi = '';
  }

  render() {
    return html`
        <p>Hello ${this.webApi}, Welcome again 1.1!<p/>        
        `;
  }
}

// registering the web component
const elementName = 'onprem-webapi-request';
customElements.define(elementName, OnPremWebApiRequest);
