import {LitElement, css, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class OnPremWebApiRequest extends LitElement {
  
  static properties = {
    webApi: {type: String},
    message: { type: String },
    class: { type: String }
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
    const response = await fetch('https://api.sampleapis.com/coffee/hot');
    const responseBody = await response.json();
    this.message = `Hello, ${responseBody[1].title}!`
  }

  async connectedCallback() {
    super.connectedCallback();
    this.message = 'Loading...';
    await this.load();
  }
        
  constructor() {
    super()
    this.message = '';
    this.class = 'color-red';    
  }

  render() {
    return html`<p class="${this.class}">${this.message}</p>`
  }  
}

const elementName = 'onprem-webapi-request';
customElements.define(elementName, OnPremWebApiRequest);
