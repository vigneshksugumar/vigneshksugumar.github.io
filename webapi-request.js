import {LitElement, css, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {JSONPath} from 'https://cdn.jsdelivr.net/npm/jsonpath-plus@10.1.0/dist/index-browser-esm.min.js';

export class OnPremWebApiRequest extends LitElement {
    
  static properties = {
    slid: {type: Boolean},
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
      controlName: 'Star Rating 2',
      fallbackDisableSubmit: false,
      groupName: 'Rating',
      version: '1.2',
      properties: { 
        outcome: {
          title: 'Rating',
          type: 'integer',
        	description: 'Insert a Variable, to save the Rating',
          isValueField: true
        },        
      },
      events: ["ntx-value-change"],
    };
  }

  static getMetaConfig() {
    return {
      controlName: 'Star Rating 2',
      fallbackDisableSubmit: false,
      groupName: 'Rating',
      version: '1.2',
      properties: {
        outcome: {
          title: 'Rating',
          type: 'integer',
        	description: 'Insert a Variable, to save the Rating',
          isValueField: true
        }, 
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
      },
      events: ["ntx-value-change"],
    };
  }
  
  constructor() {    
    super()    
    this.message = 'Loading...';
    this.webApi = '';    
  }
  
_handleClick(e) {
   const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        // value coming from input change event. 
        detail:e,
    };
    const event = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(event);
    console.log(e);
  }
 
  render() {
    return html`
     <div class="rate">
    
    <input type="radio" id="star5" name="rate" value="5" @click=${() => this._handleClick(5)} />
    <label for="star5" title="text">5 stars</label>
    <input type="radio" id="star4" name="rate" value="4" @click=${() => this._handleClick(4)}/>
    <label for="star4" title="text">4 stars</label>
    <input type="radio" id="star3" name="rate" value="3" @click=${() => this._handleClick(3)}/>
    <label for="star3" title="text">3 stars</label>
    <input type="radio" id="star2" name="rate" value="2" @click=${() => this._handleClick(2)}/>
    <label for="star2" title="text">2 stars</label>
    <input type="radio" id="star1" name="rate" value="1" @click=${() => this._handleClick(1)}/>
    <label for="star1" title="text">1 star</label>
  </div>
    `;
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
        this.message = html`${this.constructTemplate(jsonBody)}`
      } 
      catch(e)  {
        this.message = html`Invalid JSON response`
      }
    }
    else{
      this.message = html`WebApi request failed: ${response.status} - ${response.statusText}`
    }
    
  }

  constructTemplate(items){
    var itemTemplates = [];
     for (var i of items) {
       itemTemplates.push(html`<li>${i}</li>`);
     }

     return html`
       <p>Total Items: <b>${items.length}</b></p>
       <ul>${itemTemplates}</ul>
       <p>${this.webApiUrl}</p>
       <p>${this.jsonPath}</p>
       <p>${this.outputType}</p>
       <p>${this.outcome}</p>
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
