import {LitElement, css, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class OnPremWebApiRequest extends LitElement {
  
  static properties = {
    initialText: {type: String},
    webApiUrl: {type: String},
    headers: {type: String},
    jsonPath: {type: String},
    outputType: {type: String},
    outputValue: { type: String }    
  }  
  
  static getMetaConfig() {
    return {
      groupName : "In DEV - Do Not Use",
      controlName: 'OnPrem WebApi',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        webApiUrl: {
          type: 'string',
          title: 'WebApi Url',
          description: 'Provide Web api Url'
        },
        headers: {
            type: 'string',
            title: 'Request header',
            description: 'Provide headers as json object'
        },
        jsonPath: {
            type: 'string',
            title: 'JSON Path',
            description: 'Provide JSON Path to filter out data'
        },
        outputType: {
            type: 'string',
            title: 'Output Type',
            description: 'Provide output type to be used in rules or variables'
        },
        outputValue: {
            type: 'string',
            title: 'Output Value',
            description: 'Provide output value to be used in rules or variables'
        }
      }
    };
  } 

  constructor() {
    super()    
    this.message = '';
    this.webApi = 'https://api.sampleapis.com/coffee/hot';    
  }

  constructTemplate(items){
      return html`
        <p>User Name: <b>${items.fullName}</b></p>        
      `;
  }
  
  async loadWebApi() {
    var headers = { 'accept' : 'application/json'}
    const response = await fetch(`${this.webApi}`, {"headers" : headers, "credentials" : "include"});
    const responseBody = await response.json();
    this.message = html`${this.constructTemplate(responseBody)}`
  }

  async connectedCallback() {
    super.connectedCallback();
    this.initialText = 'Loading...';
    if(this.webApi){
        await this.loadWebApi();
    }    
  }
        
  render() {
    return html`        
        <div>${this.initialText}</div>
    `
  }  
}

customElements.define('onprem-webapi-request', OnPremWebApiRequest);
