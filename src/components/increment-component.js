const template = document.createElement("template");
template.innerHTML = `
<style>
  .incr-button {
    width: 25px;
    height: 100%;
    margin-top: 15px;
    text-align: center;
    height: 25px;
    border-radius: 50%;
    line-height: 25px;
    border: 1px solid black;
    box-shadow: 0 0 0 0 black;
    transition: box-shadow 333ms, background-color 333ms;
  }

  .incr-button:hover {
    box-shadow: 0 0 0 2px black;
  }
</style>
<div id="sign-holder" class="incr-button"></div>
`;

class IncrementButton extends HTMLElement {
  constructor() {
    super();
    this.initShadow();
    this.sign = this.getAttribute('sign');
    this.signHolder = this.shadowRoot.getElementById('sign-holder');
    this.signHolder.innerHTML = this.sign;
  }

  initShadow() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("increment-button", IncrementButton);
