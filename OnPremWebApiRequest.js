import { html,LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { Task, TaskStatus } from '@lit/task';
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

  async function fetchMoviesJSON() {
    const response = await fetch(`${this.webApi}`);
    const movies = await response.json();
    return movies;
  }    

  render() {
    fetchMoviesJSON().then(user => {      
      return html`
      <p>Data</p>
      <p>${user.length}</p>      
    `;
    });    
  }
  
}

// registering the web component
const elementName = 'onprem-webapi-request';
customElements.define(elementName, OnPremWebApiRequest);
