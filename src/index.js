const template = require("./html-template.pug");
const style = require("./style.sass");

class ShowcaseCarousel extends HTMLElement {
  constructor() {
    super();
    console.log(this.children);
  }
  // Specify observed attributes so that
  // attributeChangedCallback will work
  static get observedAttributes() {}

  static get is() {
    return "showcase-carousel";
  }

  connectedCallback() {
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `<style>${style}</style>`;
    shadow.innerHTML += template;

    const reel = document.createElement("div");
    reel.setAttribute("id", "reel");
    reel.append(...this.children);
    shadow.append(reel);
  }

  disconnectedCallback() {
    console.log("Custom square element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom square element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("Custom square element attributes changed.");
    updateStyle(this);
  }
}

customElements.define(ShowcaseCarousel.is, ShowcaseCarousel);
