const template = document.createElement("template");
template.innerHTML = `
<!-- slider holder-->
<style>
  .progress-holder {
    position: relative;
    width: 100%;
  }
  .progress {
    position: absolute;
    top: 1px;
    left: 2px;
    width: 100%;
    height: 12px;
    background-color: #0098DB;
    background-image: linear-gradient(#61B0A0, #61B0A0);
    background-repeat: no-repeat;
    background-size: 50% 100%;
    border-radius: 4px;
  }

  #line {
    position: absolute;
    width: 100%;
    height: 13px; 
    border-right: 3px solid white;
  }

</style>
<div class="progress-holder">
  <div id="progress" class="progress"></div>
  <div id="line"></div>
</div>
`;

class ProgressComponent extends HTMLElement {
  constructor() {
    super();

    this.cash = this.getAttribute("cash");
    this.total = this.getAttribute("total");
    this.initShadow();
    this.initProgress();
  }

  initShadow() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  initProgress() {
    this.progress = this.shadowRoot.getElementById("progress");
    this.line = this.shadowRoot.getElementById('line');
  }


  setProgress(percentage){
    this.progress.style.backgroundSize = `${percentage}% 100%`;
    this.line.style.width = `${percentage}%`;
  }
}

window.customElements.define("progress-component", ProgressComponent);
