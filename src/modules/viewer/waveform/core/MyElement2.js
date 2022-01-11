import {LitElement, html, css} from 'lit';

const tmpCss = css`
:host {
  display: block;
  border: solid 4px gray;
  padding: 16px;
  max-width: 800px;
}
`;

export class MyElement2 extends LitElement {
  static get styles() {
    return css`
    ${tmpCss}
    `;
  }

  static get properties() {
    return {
      name: {type: String},
      count: {type: Number},
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.count = 0;
  }

  render() {
    return html`
      <h1>Maksyuki, ${this.name}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
  }

  _onClick() {
    this.count++;
  }
}

window.customElements.define('my-element2', MyElement2);
