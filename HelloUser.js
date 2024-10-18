import { html,LitElement, Task} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class HelloUser extends LitElement {
  
  static properties = {
    who: {type: String},
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Hello User',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        who: {
          type: 'string',
          title: 'Who',
          description: 'Who to say hello to today'
        }
      }
    };
  }
  
  constructor() {
    super();
    this.who = 'User';
  }

  private _productTask = new Task(this, {
    task: async ([who]) => {
      const response = await fetch(`${who}`, {method: 'GET', headers: { 'Accept': "application/json;odata=verbose" }});
      if (!response.ok) { throw new Error(response.status); }
      return response.json() as Product;
    },
    args: () => [this.who]
  });

  render() {
    return this._productTask.render({
      pending: () => html`<p>Loading groups 1.2...</p>`,
      complete: (product) => html`          
          <p>${product}</p>
        `,
      error: (e) => html`<p>Error: ${e}</p>`
    });
  }
}

// registering the web component
const elementName = 'hello-user';
customElements.define(elementName, HelloUser);
