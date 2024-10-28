import {LitElement, css, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {JSONPath} from 'https://cdn.jsdelivr.net/npm/jsonpath-plus@10.1.0/dist/index-browser-esm.min.js';

export class OnPremWebApiRequest extends LitElement {
    
  static properties = {    
    message : {type: String},
    webApiUrl: {type: String},
    headers: {type: String},
    isIntegratedAuth: {type: Boolean},
    jsonPath: {type: String},
    outputType: {type: String},   
    contactDetails: {type: Object}   
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
          defaultValue : 'https://jsonplaceholder.typicode.com/todos'
        },
        headers: {
            type: 'string',
            title: 'Request header',
            description: 'Provide headers as json object',
            defaultValue: '{ "Accept" : "application/json" }'
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
        },
        outcome: {
          title: 'Outcome',
          type: 'boolean',
        	description: 'Web Api Outcome'                
        },
        contactDetails: {
          title: 'Contact information',
          type: 'object',
          description: 'Contact details',
          isValueField: true,
          properties: {
            name:{
              type: 'string',
              description: 'Full name',
              title: 'Name',
            },
            phone: {
              type: 'string',
              description: 'Phone number',
              title: 'Phone number',
            },
          },
        }, 
      },
      events: ["ntx-value-change"],
    };
  } 

  constructor() {    
    super()    
    this.message = 'Loading...';
    this.webApi = '';    
  }

  render() {        
    return html`        
        <div>${this.message}</div>
    `
  }

  _webRequestOnLoad() {
    const args = {
         bubbles: true,
         cancelable: false,
         composed: true,         
         detail:5,
     };     
     const event = new CustomEvent('ntx-value-change', args);
     this.dispatchEvent(event);          
   }

  async connectedCallback() {    
    super.connectedCallback();      
    if(window.location.pathname == "/")  {
      this.message = html`Please configure control`      
      return;      
    }
    
    if(!this.headers){
      this.headers = '{ "Accept" : "application/json" }'
    }
    if(this.webApiUrl){
      if(this.isValidJSON(this.headers)){
        await this.loadWebApi();         
      }
      else{        
        this.message = html`Invalid Headers`
      }       
    }
    else{
      this.message = html`Invalid WebApi Url`      
    } 
  }

  async loadWebApi() {    
    var headers = { 'accept' : 'application/json'}    
    var fetchAttributes = {"headers" : headers};
    if(this.isIntegratedAuth){
      fetchAttributes = {"headers" : headers, "credentials" : "include"}
    }

    var response;
    try{
      response = await fetch(`${this.webApiUrl}`, fetchAttributes);      
    }
    catch(e){
      response = {}
      response.status = "500"
      response.statusText = e + ", Try checking authentication";      
    }
    
    if(response != undefined && response.status == 200){   
      try{
        var jsonBody = await response.json(); 
        jsonBody = this.filterJson(jsonBody);
        console.log(jsonBody);       
        this.plugToForm(jsonBody);
      } 
      catch(e)  {
        this.message = html`Invalid JSON response`
      }
    }
    else{
      this.message = html`WebApi request failed: ${response.status} - ${response.statusText}`
    }
    
  }

  plugToForm(jsonBody){
    this.outcome = jsonBody;    
    this.contactDetails.name = "Chumma";     
    this.contactDetails.phone = "2242123";     
    this.message = html`${this.constructTemplate(jsonBody)}`
    this._webRequestOnLoad();
  }

  constructTemplate(items){
    
    var itemTemplates = [];
     for (var i of items) {
       itemTemplates.push(html`<li>${i}</li>`);
     }

     itemTemplates = html`${items}`;

     return html`
       <p><b>Results:</b> </p>
       <p>${itemTemplates}</p>
       <p><b>Input:</b> </p>
       <p>${this.webApiUrl}</p>
       <p>${this.jsonPath}</p>
       <p>${this.outputType}</p>
       <p>${this.outcome}</p>
       <p>${this.contactDetails.name}</p>
     `;
  }

  filterJson(jsonData){            
    if(!this.jsonPath){
      this.jsonPath = "$."
    }        
    if(jsonData){ 
        var result = JSONPath({path: this.jsonPath, json: jsonData});        
        if (result.length == 1 && this.jsonPath.endsWith(".")) {
            result = result[0]
          }        
        return result;
    }
  }

  isValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
    
}

customElements.define('webapi-request', OnPremWebApiRequest);
