import {LitElement, html} from 'lit';
export class MyPlugin extends LitElement {
  static properties = {
    message: {},
  };

  static styles = css`
    .highlight {
      font-weight: 700;
      color: #E8960A;
  }
`;

  constructor() {
    super();
    this.message = 'Hello World';
  }

  render() {
    return html`
      <div id="pluginDiv">
        <p><input type="text" value="${this.message}" /></p>
        <p>This is my message ${this.message}.</p>
      </div>
	`;
  }
}
customElements.define('hello-user', MyPlugin);