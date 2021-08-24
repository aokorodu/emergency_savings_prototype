const template = document.createElement("template");
template.innerHTML = `
<style>
  .container {
    position: relative;
    height: 66px;
    border-top: 1px solid #CCCCCC;
    border-bottom: 1px solid #CCCCCC;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    transition: background-color 250ms;
    box-sizing: border-box;
  }

  .bold {
    font-weight: bold;
    margin: 0 5px;
  }

  .highlighted {
    border-top: 1px solid #0174C9;
    border-bottom: 1px solid #0174C9;
    background-color: rgba(1, 116, 201, 0.07);
  }

  .outline {
    display: flex;
    flex-direction: column;
    margin-left: 1em;
    margin-right: 0.5em;
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

  input[type="text"] {
    height: 40px;
    border-radius: 4px;
    margin: 0 5px;
    font-size: 1rem;
    text-align: center;
    font-weight: bold;
  }

  #amount-input {
    width: 100px;
  }

  #duration-input {
    width: 60px;
  }
</style>
<div id="container" class="container">
  <div class="outline">
    <div class="radio"></div>
  </div>
  <div id="amount-text-holder">
    <input type="text" id="amount-input" class="bold" />
  </div>
  <div>will cover you for about</div>
  <div id="duration-text-holder">
    <input type="text" id="duration-input" class="month-input bold" />
  </div>
  <div class="bold">months</div>
  <div>of expenses</div>
</div>

`;
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const savingsPerMonth = 5400;

class CustomBarComponent extends HTMLElement {
  constructor() {
    super();
    this.initShadow();
    this.initProps();
    this.initInputs();
  }

  initProps() {
    this.radio = this.shadowRoot.querySelector(".radio");
    this.container = this.shadowRoot.getElementById("container");
    this.checked = this.getAttribute("checked") == null ? false : true;
  }

  select(bool) {
    if (this.checked == bool) return;
    this.checked = bool;
    if(this.checked){
      this.radio.classList.add("checked");
      this.container.classList.add("highlighted");
      if(this.shadowRoot.activeElement != this.durationInput) this.amountInput.focus();
    } else {
      this.radio.classList.remove("checked");
      this.container.classList.remove("highlighted")
    }
  }

  initInputs() {
    this.amountInput = this.shadowRoot.getElementById("amount-input");
    this.durationInput = this.shadowRoot.getElementById("duration-input");

    this.amountInput.addEventListener("input", () => {
      const res = this.getAmount();
      if(res > 0) this.select(true)
      const months = res/savingsPerMonth;
      this.amountInput.value = formatter.format(res);
      this.durationInput.value = months.toFixed(1);
      this.dispatchNewCustomValueEvent(res);
    });
    
    this.durationInput.addEventListener("input", () => {
      let str = this.durationInput.value;
      let res = str.replace(/,/g, "");
      if(res > 0) this.select(true)
      const amount = res * savingsPerMonth;
      this.amountInput.value = formatter.format(amount);
      this.dispatchNewCustomValueEvent(amount);
    });
  }

  getAmount(){
    let str = this.amountInput.value;
    let res = str.replace(/,/g, "");
    res = Number(res.replace(/\$/g, ""));

    return res;
  }

  dispatchNewCustomValueEvent(val){
    this.dispatchEvent(
      new CustomEvent("customvalue", {
        bubbles: true,
        composed: true,
        detail: { value: Number(val) },
      })
    );
  }

  initShadow() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  focusDollarField(){

  }
}

window.customElements.define("custom-bar-component", CustomBarComponent);
