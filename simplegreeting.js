var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let SimpleGreeting = class SimpleGreeting extends LitElement {
    constructor() {
        super(...arguments);
        this.name = 'Somebody2';
    }
    render() {
        return html `<p>Hello, ${this.name}!</p>`;
    }
};
SimpleGreeting.styles = css `p { color: blue }`;
__decorate([
    property()
], SimpleGreeting.prototype, "name", void 0);
SimpleGreeting = __decorate([
    customElement('simple-greeting')
], SimpleGreeting);
export { SimpleGreeting };
//# sourceMappingURL=simplegreeting.js.map