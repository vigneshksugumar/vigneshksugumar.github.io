import {LitElement, css, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class OnPremWebApiRequest extends LitElement {
  
  static properties = {
    webApi: {type: String},
    message: { type: String }    
  }  
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      groupName : "In DEV - Do Not Use",
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

  constructTemplateOld(items){
     const itemTemplates = [];
      for (const i of items) {
        itemTemplates.push(html`<li>${i.mnemonic}</li>`);
      }

      return html`
        <p>Total Groups: <b>${items.length}</b></p>
        <ul>${itemTemplates}</ul>
      `;
  }

  constructTemplate(items){
      return html`
        <p>User Name: <b>${items.fullName}</b></p>        
      `;
  }
  
  async load() {
    var headers = { 'accept' : 'application/json'}
    const response = await fetch(`${this.webApi}`, {"headers" : headers, "credentials" : "include"});
    const responseBody = await response.json();
    this.message = html`${this.constructTemplate(responseBody)}`
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
    return html`<div>${this.message}</div>`
  }  
}

const elementName = 'onprem-webapi-request';
customElements.define(elementName, OnPremWebApiRequest);
