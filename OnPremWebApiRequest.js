import {LitElement, css, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class OnPremWebApiRequest extends LitElement {
  
  static properties = {
    webApi: {type: String},
    message: { type: String }    
  }  
  
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
  
  async load() {
    const response = await fetch(`${this.webApi}`);
    const responseBody = await response.json();
    this.message = `Hello, ${responseBody.length}!`
  }

  async connectedCallback() {
    super.connectedCallback();
    this.message = 'Loading...';
    await this.load();
  }
        
  constructor() {
    super()
    this.message = '';
    this.webApi = '';    
  }

  render() {
    return html`<p>Total Groups are ${this.message}</p>`
  }  
}

const elementName = 'onprem-webapi-request';
customElements.define(elementName, OnPremWebApiRequest);
