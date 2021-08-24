export class Slider {
  constructor() {

    // slider-container - use to enable/disable slider 
    this.sliderEnabled = false;
    this.sliderContainer = document.querySelector('.slider-container');

    // custom slider
    this.customSlider = document.querySelector("custom-slider");

    // inputs
    this.cashInput = document.getElementById("cash-amount");
    this.investInput = document.getElementById("invest-amount");

    // increment buttons
    this.incrButtons = document.querySelectorAll("increment-button");

    // slider max amount
    this.sliderMaxText = document.getElementById("slider-amount-max");

    // error text
    this.errorText = document.getElementById("error-text");

    // amounts for cash and invest
    this.cashAmount = 2700;
    this.investAmount = 0;

    // selected values
    this.suggestedMin = 2700;
    this.max = 0;

    // formatter
    this.formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
  }

  init() {
    this.initCustomSlider();
    this.initIncrementButtons();
    this.initCashInput();
    this.initInvestInput();
  }

  initCustomSlider() {
    this.customSlider.addEventListener("value", (e) => {
      this.cashAmount = e.detail.value;
      this.max = e.detail.max;
      this.updateInputs(this.cashAmount);
      this.showErrorState(this.cashAmount < this.suggestedMin);
    });
  }

  initIncrementButtons() {
    for (const button of this.incrButtons) {
      button.addEventListener("click", (e) => {
        const incr = button.sign == "+" ? 1000 : -1000;
        let newAmount = this.cashAmount + incr;
        if(newAmount < 0) newAmount = 0;
        this.updateInputs(newAmount);
        this.showErrorStateIfNecessary(newAmount);
        this.customSlider.updateProgress(newAmount);
      });
    }
  }

  initCashInput() {
    this.cashInput.addEventListener("input", () => {
      let str = this.cashInput.value;
      let res = str.replace(/,/g, "");
      res = Number(res.replace(/\$/g, ""));
      if (res > this.max) res = this.max;
      if (res == "") res = 0;
      this.customSlider.updateProgress(res);
      this.updateInputs(res);
      this.showErrorStateIfNecessary(Math.round(res / 1000) * 1000);
    });
  }

  initInvestInput() {
    this.investInput.addEventListener("input", () => {
      let str = this.investInput.value;
      let res = str.replace(/,/g, "");
      res = Number(res.replace(/\$/g, ""));
      if (res > this.max) res = this.max;
      if (res == "") res = 0;
      const cash = this.max - res;
      this.customSlider.updateProgress(cash);
      this.updateInputs(cash);
      this.showErrorStateIfNecessary(Math.round(cash / 1000) * 1000);
    });
  }

  updateInputs(val) {
    if (val > this.max) val = this.max;
    if (val < 0) val = 0;
    this.cashAmount = val;
    this.investAmount = this.max - this.cashAmount;
    this.cashInput.value = this.formatter.format(this.cashAmount); //`$${this.cashAmount}`;
    this.investInput.value = this.formatter.format(this.investAmount);
  }

  updateSliderMaxText() {
    this.sliderMaxText.innerText = this.formatter.format(this.max);
  }

  updateMax(val) {
    this.max = Number(val);
    if (this.cashAmount > this.max) this.updateInputs(this.max);
  }

  showErrorStateIfNecessary(val) {
    if (val < this.suggestedMin) {
      this.showErrorState(true);
    } else {
      this.showErrorState(false);
    }
  }

  showErrorState(bool) {
    if (bool) {
      this.errorText.classList.remove("hidden");
      this.cashInput.classList.add("input-text-error");
    } else {
      this.errorText.classList.add("hidden");
      this.cashInput.classList.remove("input-text-error");
    }
  }

  update(val) {
    if(!this.sliderEnabled) this.enableSlider();
    this.customSlider.updateMax(val, this.cashAmount);
    
    this.updateSliderMaxText();
    this.showErrorStateIfNecessary(this.customSlider.value);
    this.updateInputs(this.customSlider.value);
  }

  enableSlider(){
      this.sliderContainer.classList.remove('disabled');
      this.sliderEnabled = true;
  }

  // getter
  get cash_amount(){
    return this.cashAmount;
  }

  get invest_amount(){
    return this.investAmount;
  }
}
