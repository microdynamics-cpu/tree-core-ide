import { LitElement, html, css } from 'lit';
import { convertRGBColorStrToArray } from "../Utils";
import { OPERATE_CONFIG } from "../Config";

export class ColorPicker extends LitElement {
    constructor() {
        super();
        this.color = "#FFFFFF";
        this.fill = .5;
        this.palette = OPERATE_CONFIG.theme.palette;
        this.onmouseout = () => { this.hidePreview() };

        window.addEventListener("click", () => { this.hide() }, {
            passive: true
        });

        this.addEventListener("click", t => { t.stopPropagation() }, {
            passive: true
        });

        this.addEventListener("mousedown", t => { t.stopPropagation() }, {
            passive: true
        });

        this.addEventListener("pointerdown", t => { t.stopPropagation() }, {
            passive: true
        });

        this.addEventListener("touchstart", t => { t.stopPropagation() }, {
            passive: true
        });
    }

    static get properties() {
        return {
            color: {
                type: String
            },
            fill: {
                type: Number
            },
            palette: {
                type: Array
            },
            fillColor: {
                type: String
            }
        }
    }

    static get styles() {
        return [css`
            #picker-dialog
            {
                --picker-swatch-size: 15px;
                --picker-swatch-cols: 12;

                z-index: 300;
                position: absolute;
                top: 0px;
                left: 0px;
                display:none;
                max-width: calc(var(--picker-swatch-size)*var(--picker-swatch-cols));
                flex-flow: row wrap;
                background: var(--picker-background);
                border: 1px solid var(--picker-border);
                padding: 6px;
                box-shadow: var(--background) 0px 2px 2px;
            }

            #picker-icon {
                display: block;
                min-width: 8px;
                width: 100%;
                height: 100%;
                border: 1px solid transparent;
                background: black;
                border-radius: 2px;
                box-sizing: border-box;
            }

            #picker-icon:hover {
                cursor: pointer;
            }

            .swatch {
                display: inline-block;
                width: var(--picker-swatch-size);
                height: var(--picker-swatch-size);
            }

            #preview {
                position: absolute;
                display: none;
                background: black;
                width: calc(var(--picker-swatch-size) + 2);
                height: calc(var(--picker-swatch-size) + 2);
                box-shadow: black 0px 0px 1px;
            }

            #preview:hover {
                cursor: pointer;
            }

            .slider {
                -webkit-appearance: none;  /* Override default CSS styles */
                appearance: none;
                background: var(--background);
                width: 100%;
                height: 12px;
                outline: none;
                margin-bottom: 12px;
            }

            .slider::-webkit-slider-thumb {
                -webkit-appearance: none; /* Override default look */
                appearance: none;
                width: 12px; /* Set a specific slider handle width */
                height: 12px; /* Slider handle height */
                background: var(--button); /* Green background */
                cursor: pointer; /* Cursor on hover */
            }

            .slider::-webkit-slider-thumb:hover {
                background: var(--accent-hover);
            }
    `]
    }

    render() {
        return html`
            <div id="picker-icon" @click="${this.togglePicker}" style="border-color: ${this.color}; background-color: ${this.fillColor}"></div>
            <div id="picker-dialog">
                <input  id="fill"  class="slider" type="range" 
                    min="0" max="100"
                    value="${Math.floor(100 * this.fill).toString()}" 
                    @change=${this.handleFillChange} />
                ${this.palette.map(t => html`
                    <div class='swatch' 
                        @mouseover="${this.showPreview}" style="background: ${t}">&nbsp;
                    </div>
                `)}
                <div id='preview' @click="${this.selectColor}" @dblclick="${this.finalizeColor}"></div>
            </div>
        `
    }

    get fillColor() {
        let t = convertRGBColorStrToArray(this.color, 'rgb');
        console.log('fillColor: ', t);
        let e = (0 == this.fill) ? 0 : 1;
        return `rgb(${t[0] * this.fill},${t[1] * this.fill},${t[2] * this.fill},${e})`
    }

    togglePicker() {
        let t = this.shadowRoot.getElementById("picker-dialog")
        let e = this.shadowRoot.getElementById("picker-icon");
        t.style.display = ("flex" === t.style.display) ? "none" : "flex";

        let i = e.getBoundingClientRect();
        t.style.top = i.bottom + "px";
        t.style.left = i.left + "px";
    }

    hide() {
        this.shadowRoot.getElementById("picker-dialog").style.display = "none";
    }

    // change the fill color brightness
    handleFillChange(t) {
        let e = this.shadowRoot.getElementById("fill");
        this.fill = parseInt(e.value) / 100;
        this.dispatchEvent(new CustomEvent("change", {
            detail: {
                color: this.color,
                fill: this.fill
            }
        }));
    }

    selectColor(t) {
        let e = t.currentTarget;
        this.color = e.style.backgroundColor;
        this.dispatchEvent(new CustomEvent("change", {
            detail: {
                color: this.color,
                fill: this.fill
            }
        }));
    }

    finalizeColor(t) {
        let e = t.currentTarget;
        this.color = e.style.backgroundColor;
        this.togglePicker();
        this.dispatchEvent(new CustomEvent("change", {
            detail: {
                color: this.color,
                fill: this.fill
            }
        }));
    }

    showPreview(t) {
        let e = this.shadowRoot.getElementById("preview");
        let i = this.shadowRoot.getElementById("picker-dialog");
        let r = t.currentTarget;
        let n = r.getBoundingClientRect();

        e.style.display = "inline-block";
        e.style.left = n.x - i.getBoundingClientRect().x - 1 + "px";
        e.style.top = n.y - i.getBoundingClientRect().y - 1 + "px";
        e.style.width = n.width + 2 + "px";
        e.style.height = n.height + 2 + "px";
        e.style.backgroundColor = r.style.backgroundColor;
    }

    hidePreview() {
        this.shadowRoot.getElementById("preview").style.display = "none";
    }
}

window.customElements.define('color-picker', ColorPicker);