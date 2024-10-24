import { LitElement, css, html } from 'lit'

export class HelloWorld extends LitElement {
  
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
        <p>This is a template.</p>
        <p>This is my message ${this.message}.</p>
      </div>
	`;
  }
}
customElements.define('hello-world', HelloWorld);
