import { Slider } from "./slider";

export class App {
  constructor() {
    this.expenseButtons = document.querySelectorAll("radio-bar-component");
    this.customExpenseButton = document.querySelector("custom-bar-component");
    this.continueButton = document.getElementById('continue-button')
    this.slider = null;
  }

  init() {
    this.initSlider();
    this.initRadioBarButtons();
    this.initCustomExpenseButton();
    this.initContinueButton();
  }

  initContinueButton(){
    this.continueButton.addEventListener('click', ()=>{
      const max = this.slider.max;
      const cash = this.slider.cashAmount;
      
      const url = `summary.html?cash=${cash}&total=${max}`;
      window.location.href = url;
    })
    //window.location.href = "http://www.w3schools.com";
  }

  initSlider() {
    this.slider = new Slider();
    this.slider.init();
  }

  initRadioBarButtons() {
    for (const button of this.expenseButtons) {
      button.addEventListener("click", (e) => {
        if (button != this.customExpenseButton)
          this.update(button.getAttribute("amount"));
        this.activateSelectedButton(e.target);
      });
    }
  }

  initCustomExpenseButton() {
    this.customExpenseButton.addEventListener("customvalue", (e)=>{
      this.update((e.detail.value))
    })
    this.customExpenseButton.addEventListener("click", () => {
      this.activateSelectedButton(this.customExpenseButton);
      this.update(this.customExpenseButton.getAmount());
    });
  }

  activateSelectedButton(target) {
    for (const button of this.expenseButtons) {
      if (button == target) {
        button.select(true);
      } else {
        button.select(false);
      }
    }

    target != this.customExpenseButton
      ? this.customExpenseButton.select(false)
      : this.customExpenseButton.select(true);
  }

  update(amount) {
    amount <= 0 ? this.continueButton.classList.add('disabledButton') : this.continueButton.classList.remove('disabledButton');
    this.slider.update(amount)
  }
}
