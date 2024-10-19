import {LitElement, css, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {Task, initialState} from 'https://cdn.jsdelivr.net/npm/@lit/task@1.0.1/+esm';

export class OnPremWebApiRequest extends LitElement {
  
  static properties = {
    webApi: {type: String},
  };
  
  constructor() {
    super();
    this.webApi = 'https://api.sampleapis.com/coffee/hot';
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
  
  private _getApiDataTask = new Task(this, {
    task: async ([webApiUrl], {signal}) => {      
      const resp = await fetch(`${webApiUrl}`);
      const respJson = resp.json();
      return respJson;
    },
    args: () => [this.webApi],
  });

  render() {
    return html`
      <label>
        Enter a url:
        <input .value=${this.webApi} @change=${this._onChange} />
      </label>
        <br /><br />
      <header>
        <b>${this.webApi}</b>       
      </header>
      <div>
        ${this._getApiDataTask.render({
          initial: () =>
            html`<span class="initial">
              Loading...
            </span>`,
          pending: () =>
            html`<p>Loading data for ${this.webApi}</p>`,
          complete: (items) => html`            
            <ul>
              ${items.map(
                (item, index) =>
                html`<li>${index}: ${item.title}</li>`
              )}
            </ul>
          `,
          error: (e) => html`<span class="error">
            Error: ${(e as Error).message}
              </span>`,
        })}
      </div>
    `;
  }  

  private _onChange(e: Event) {
    this.webApi = (e.target as HTMLInputElement).value;
  }

  static styles = css`
    :host {
      display: block;
      min-width: 300px;
      border-radius: 5px;
      border: solid 1px #aaa;
      padding: 20px;
    }
    header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    #logo {
      height: 38px;
      width: auto;
    }
    .initial {
      font-style: italic;
    }
    .error {
      color: red;
    }
  `;
}

const elementName = 'onprem-webapi-request';
customElements.define(elementName, OnPremWebApiRequest);
