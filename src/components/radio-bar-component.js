const template = document.createElement("template");
template.innerHTML = `
<style>
  .container {
    position: relative;
    border-top: 1px solid #CCCCCC;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    transition: background-color 250ms;
    height: 66px;
    box-sizing: border-box;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid rgba(0, 0, 0, 0);
  }
  
  .bold {
      font-weight: bold;
      margin: 0 5px;
  }
  
  .highlighted{
      border-top: 1px solid #0174C9;
      border-bottom: 1px solid #0174C9;
      background-color: rgba(1, 116, 201, .07);
  }
  
  .outline{
    display: flex;
    margin-left: 1em;
    margin-right: 0.5em;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
  
  .radio {
    background: black;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 250ms;
  }
  
  .checked {
    opacity: 1;
  }
  </style>
  
  <div id="container" class="container">
    <div class="outline">
      <div class="radio"></div>
    </div>
    <div class="bold">
      <div id="amount-text">0</div>
    </div>
    <div>will cover you for about</div> 
    <div class="bold"><div id="duration-text">0</div></div> months of expenses</div>
  </div>

`;
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

class RadioBarComponent extends HTMLElement {
  constructor() {
    super();
    this.initShadow();
    this.initProps();
    this.initAmounts();
  }

  initProps(){
    this.radio = this.shadowRoot.querySelector(".radio");
    this.container = this.shadowRoot.getElementById("container");
    this.checked = this.getAttribute("checked") == null ? false : true;
  }

  select(bool) {
    if (this.checked == bool) return;
    this.checked = bool;
    if(this.checked){
      this.radio.classList.add("checked");
      this.container.classList.add("highlighted")
    } else {
      this.radio.classList.remove("checked");
      this.container.classList.remove("highlighted")
    }
  }

  initAmounts() {
    const amount = this.getAttribute("amount");
    const amountText = this.shadowRoot.getElementById("amount-text");
    amountText.innerHTML = formatter.format(amount);
    const duration = this.getAttribute("duration");
    const durationText = this.shadowRoot.getElementById("duration-text");
    durationText.innerHTML = duration;
  }

  initShadow() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  toggle() {
    this.checked = !this.checked;
  }
}

window.customElements.define("radio-bar-component", RadioBarComponent);
