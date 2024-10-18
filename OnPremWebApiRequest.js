import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { Task, TaskStatus } from 'https://cdn.jsdelivr.net/npm/@lit/task@1.0.1/+esm';
// define the component
export class OnPremWebApiRequest extends LitElement {
  
  static properties = {
    webApiUrl: {type: String},
    userId: {type: String},
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'OnPrem Web Api Request',
      fallbackDisableSubmit: false,
      version: '1.0',
      properties: {
        webApiUrl: {
          type: 'string',
          title: 'Web Api',
          description: 'Provide Web Api Url'
        },
        userId: {
          type: 'string',
          title: 'User Id',
          description: 'Provide User Id'
        }
      }
    };
  }
  
  constructor() {
    super();
    this.webApi = '';
    this.userId = '';
  }

  private _apiTask = new Task(
    this,
    ([webApi, userId]) =>
      fetch(`${webApi}?userid=${userId}`).then((response) =>
        response.json()
      ),
    () => [this.webApi, this.userId]
  );

  render() {
    return html`
      <div>Groups Info</div>
      ${this._apiTask.render({
        pending: () => html`Loading group list...`,
        complete: (group) => html`${group}`,
      })}
      <!-- ... -->
    `;
  }
}

// registering the web component
const elementName = 'onpremwebapi-request';
customElements.define(elementName, OnPremWebApiRequest);
