import {LitElement, css, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {JSONPath} from 'https://cdn.jsdelivr.net/npm/jsonpath-plus@10.1.0/dist/index-browser-esm.min.js';

export class OnPremWebApiRequest extends LitElement {
    
  static properties = {  
    pluginLoaded : {type: Boolean},  
    message : {type: String},
    webApiUrl: {type: String},
    headers: {type: String},
    isIntegratedAuth: {type: Boolean},
    jsonPath: {type: String},
    displayAs: {type: String},
    outcome: {type: String}    
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
      pluginAuthor : 'Vignesh Sugumar',
      standardProperties: {
        fieldLabel:true,
        description:true,
        visibility: true        
      },
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
            description: 'Provide JSON Path to filter out data',
            defaultValue: '$.[2].title.'
        },
        displayAs: {
            type: 'string',
            title: 'Display As',
            enum: ['Label', 'Dropdown'],
            description: 'Provide display type of the control',
            defaultValue: 'Label'
        },
        outcome: {
          type: 'string',
          title: 'Outcome',          
        	description: 'This value will be overridden',
          isValueField: true
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

  render() {        
    return html`        
        <div>${this.message}</div>
    `
  }

  _fallBackOnLoad() {    
    const args = {
         bubbles: true,
         cancelable: false,
         composed: true,         
         detail:this.outcome,
     };     
     const event = new CustomEvent('ntx-value-change', args);
     this.dispatchEvent(event);          
   }

  _webRequestOnLoad() {    
    const args = {
         bubbles: true,
         cancelable: false,
         composed: true,         
         detail:this.outcome,
     };     
     const event = new CustomEvent('ntx-value-change', args);
     this.dispatchEvent(event);          
   }

   _dropDownOnChange(e) {            
    const args = {
         bubbles: true,
         cancelable: false,
         composed: true,         
         detail:e,
     };     
     const event = new CustomEvent('ntx-value-change', args);
     this.dispatchEvent(event);          
   }

  async connectedCallback() {  
    console.log(this.outcome)              
    if(this.pluginLoaded){
      return;
    }    
    this.pluginLoaded = true;
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
        var jsonData = await response.json(); 
        jsonData = this.filterJson(jsonData);        
      } 
      catch(e)  {
        this.message = html`Invalid JSON response`
      }      
      this.plugToForm(jsonData);
    }
    else{
      this._fallBackOnLoad()      
      this.message = html`WebApi request failed: ${response.status} - ${response.statusText == '' ? 'Error!' : response.statusText}`
    }
    
  }

  plugToForm(jsonData){      
    if(this.displayAs == "Label"){
      this.constructLabelTemplate(jsonData)
    }     
    else if(this.displayAs == "Dropdown"){
      this.constructDropdownTemplate(jsonData)
    }         
    this._webRequestOnLoad();
  }

  constructLabelTemplate(jsonData){            
      var outputTemplate = "";
      var htmlTemplate = html``;
      
      if(typeof jsonData === 'string' || jsonData instanceof String){
        outputTemplate = jsonData;
      }    
      if(this.isInt(jsonData)){
        outputTemplate = jsonData.toString();
      }
      if(typeof jsonData == 'boolean'){
        outputTemplate = (jsonData == true ? "true" : "false");
      }
      htmlTemplate = html`${outputTemplate}`;
      
      this.outcome = outputTemplate;      
      this.message = html`${htmlTemplate}`            
  }

  constructDropdownTemplate(items){
    if(Array.isArray(items)){
      var itemTemplates = [];
      for (var i of items) {
        itemTemplates.push(html`<option>${i}</option>`);
      }
      this.message = html`<select @change=${e => this._dropDownOnChange(e.target.value)}>${itemTemplates}</select>`       
    }
    else{
      this.message = html`<p>WebApi response not in array. Check WebApi Configuration</p>`
    }
  }

  isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
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
