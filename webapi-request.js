import {LitElement, css, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {JSONPath} from 'https://cdn.jsdelivr.net/npm/jsonpath-plus@10.1.0/dist/index-browser-esm.min.js';

export class OnPremWebApiRequest extends LitElement {
  
  static properties = {
    initialText: {type: String},
    message : {type: String},
    webApiUrl: {type: String},
    headers: {type: String},
    isIntegratedAuth: {type: Boolean},
    jsonPath: {type: String},
    outputType: {type: String},
    outputValue: { type: String }    
  }  
  
  static getMetaConfig() {
    return {
      groupName : "In DEV - Do Not Use",
      controlName: 'WebApi Request',
      description : 'Make Web Api request including OnPrem',
      iconUrl : 'data-lookup',
      searchTerms : ['web', 'webapi', 'pnc'],
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        webApiUrl: {
          type: 'string',
          title: 'WebApi Url',
          description: 'Provide Web api Url',
          required : true,
          defaultValue : 'https://api.sampleapis.com/coffee/hot'
        },
        headers: {
            type: 'string',
            title: 'Request header',
            description: 'Provide headers as json object',
            defaultValue: "{ Accept:application/json }"
        },
        isIntegratedAuth: {
          type: 'boolean',
          title: 'Is Integrated Authentication',
          description: 'Check yes for Windows Integrated Auth',
          defaultValue: false
        },
        jsonPath: {
            type: 'string',
            title: 'JSON Path',
            description: 'Provide JSON Path to filter out data'
        },
        outputType: {
            type: 'string',
            title: 'Output Type',
            enum: ['string', 'boolean', 'number', 'choice', 'object'],
            description: 'Provide output type to be used in rules or variables',
            defaultValue: 'string'
        }
      }
    };
  } 

  constructor() {    
    super()    
    console.log(`constructor - ${this.webApiUrl}`)
    this.message = 'Loading...';
    this.webApi = '';    
  }

  render() {
    console.log(`render - ${this.webApiUrl}`)
    return html`        
        <div>${this.message}</div>
    `
  }

  async connectedCallback() {
    console.log(`before connectedCallback - ${this.webApiUrl}`)
    super.connectedCallback();    
    console.log(`after connectedCallback - ${this.webApiUrl}`)
    if(this.webApiUrl){
        await this.loadWebApi();
    }    
  }

  async loadWebApi() {
    console.log(`loadWebApi - ${this.webApiUrl}`)
    var headers = { 'accept' : 'application/json'}    
    var fetchAttributes = {"headers" : headers};
    if(this.isIntegratedAuth){
      fetchAttributes = {"headers" : headers, "credentials" : "include"}
    }

    const response = await fetch(`${this.webApiUrl}`, fetchAttributes);
    const jsonBody = await response.json();
    jsonBody = this.filterJson(jsonBody);
    this.message = html`${this.constructTemplate(jsonBody)}`
  }

  constructTemplate(items){
    console.log(`constructTemplate - ${this.webApiUrl}`)
    const itemTemplates = [];
     for (const i of items) {
       itemTemplates.push(html`<li>${i.title}</li>`);
     }

     return html`
       <p>Total Items: <b>${items.length}</b></p>
       <ul>${itemTemplates}</ul>
     `;
  }

  filterJson(jsonData){
    console.log(`filterJson - ${this.webApiUrl}`)
    if(jsonData){        
        var result = JSONPath({path: this.jsonPath, json: jsonData});        
        if (result.length == 1 && $scope.jsonPath.endsWith(".")) {
            result = result[0]
          }
        console.log(result);
        return result;
    }
  }
    
}

customElements.define('webapi-request', OnPremWebApiRequest);
