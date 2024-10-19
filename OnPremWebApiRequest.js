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

  private _apiTask = new Task(
    this,
    ([webApi]) =>
      fetch(`${webApi}`).then((response) =>
        response.json()
      ),
    () => [this.webApi]
  );

  render() {
    return html`
      <div>User Info</div>
      ${this._apiTask.render({
        pending: () => html`Loading user info...`,
        complete: (user) => html`${user.length}`,
      })}
      <!-- ... -->
    `;
  }
  
}

// registering the web component
const elementName = 'onprem-webapi-request';
customElements.define(elementName, OnPremWebApiRequest);
