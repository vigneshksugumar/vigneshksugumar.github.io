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
    
}

customElements.define('webapi-request', OnPremWebApiRequest);
