import { LitElement, html, css } from 'lit';

import { DataObject } from "../DataObject";
import { OPERATE_CONFIG } from "../Config";
import { DATA_CMD_TYPE, DATA_FORMAT, DATA_TYPE } from "../Enum";

const iu = css`
a {
    color: var(--link-foreground);
}

a:active,
a:hover {
    color: var(--link-active);
    cursor: pointer;
}

.row {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.row-space-between {
    justify-content: space-between;
}

.row-end {
    justify-content: flex-end;
}

.col {
    display: flex;
    flex-direction: column;
}

.btn {
    font-family: var(--font-family);
    background: var(--button);
    color: var(--button-text);
    display: inline-flex;
    align-items: center;
    text-align: center;
    white-space: nowrap;
    height: 32px;
    overflow: hidden;
    box-sizing: border-box;
    transition: all 0.1s ease-in-out;
    line-height: 1;
    font-size: 12px;
    padding: 0 10px;
    border: 1px solid transparent;
    border-radius: var(--input-radius);
    justify-content: center;

    /*background: var(--button);
    color: var(--button-text);
    border: none;
    margin: .25em;
    padding: 0.3em 1em;
    transition: all .1s;
    font-size: 0.9em;
    outline: none;
    border: 1px solid transparent;*/
}

.btn-small {
    height: 24px !important;
    padding: 0 5px !important;
}

.btn:focus {
    border: 1px solid var(--button-hover);
}

.btn:hover:enabled {
    color: var(--foreground);
    background: var(--button-hover);
    cursor: pointer;
}

.btn:active {
    background-color: var(--button-hover);
}

.btn.selected {
    color: var(--foreground);
    background: var(--accent);
}

.btn:disabled {
    background: var(--button-disabled);
    color: var(--button-disabled-text);
    cursor: inherit;
    opacity: 0.7;
}

.btn-wide {
    width: calc(100% - 10px);
}

.btn.btn-primary:not(:disabled) {
    background: var(--accent);
    color: var(--title-color);
    outline: 1px solid transparent;
}

.btn.btn-primary:hover:not(:disabled) {
    background: var(--accent-hover);
}

::placeholder {
    color: var(--input-placeholder);
}

select,
input[type="text"] {
    background: var(--input-background);
    color: var(--input-foreground);
    border: 1px solid var(--input-border);
    border-radius: var(--input-radius);
    margin: 0 0.25em;
    height: 32px;
    padding: 0.25em;
    font-size: 12px;
    box-sizing: border-box;
    outline: none;
}

select:focus,
input[type="text"]:focus {
    background: var(--input-active-background);
    color: var(--input-active-foreground);
    border-color: var(--input-active-border);
}

select.error,
input[type="text"].error {
    background: var(--input-error-background);
    color: var(--input-error-foreground);
    border-color: var(--input-error-border);
}

select option {
    color: var(--input-foreground);
    background: var(--input-background);
}

label {
    display: block;
    margin-top: calc(var(--margin));
    margin-left: 0.25em;
    margin-bottom: 2px;
    margin-bottom: 0;
    font-size: 0.78em;
    color: var(--label);
    font-family: var(--font-monospace-family);
    font-size: var(--font-monospace-size);
    font-weight: var(--font-monospace-font);
    text-transform: uppercase;
}

.darkglass {
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--border)
}
    
/* BUTTON GROUP */
.btn-group { 
    display: flex;
    flex-direction: row;
}

.btn-group button:first-child {
    margin-left: 12px;
    border-radius: 12px 0 0 12px;
}

.btn-group button:last-child {
    margin-right: 12px;
    border-radius: 0 12px 12px 0;
}

/* SCROLL BARS */
::-webkit-scrollbar {
    width: 1em;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-background);
    outline: 0px solid var(--border);
    cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-hover);
    outline: 0px solid var(--border);
    cursor: pointer;
}

::-webkit-scrollbar-thumb:active {
    background-color: var(--scrollbar-active);
    outline: 0px solid var(--border);
    cursor: pointer;
}
`;

const tu = {
    module: html`<svg class="icon icon-module"><use xlink:href="#icon_browser_module"/></svg>`,
    wire: html`<svg class="icon icon-wire"><use xlink:href="#icon_signal_wire"/></svg>`,
    integer: html`<svg class="icon icon-wire"><use xlink:href="#icon_signal_integer"/></svg>`,
    logic: html`<svg class="icon icon-wire"><use xlink:href="#icon_signal_wire"/></svg>`,
    bit: html`<svg class="icon icon-wire"><use xlink:href="#icon_signal_wire"/></svg>`,
    event: html`<svg class="icon icon-event"><use xlink:href="#icon_event"/></svg>`,
    parameter: html`<svg class="icon icon-parameter"><use xlink:href="#icon_parameter"/></svg>`,
    real: html`<svg class="icon icon-real"><use xlink:href="#icon_signal_real"/></svg>`,
    reg: html`<svg class="icon icon-reg"><use xlink:href="#icon_signal_reg"/></svg>`,
    bus: html`<svg class="icon icon-bus"><use xlink:href="#icon_signal_bus"/></svg>`,
    "bus-wire": html`<svg class="icon icon-bus"><use xlink:href="#icon_signal_bus"/></svg>`,
    "bus-integer": html`<svg class="icon icon-bus"><use xlink:href="#icon_signal_integer"/></svg>`,
    "bus-real": html`<svg class="icon icon-real"><use xlink:href="#icon_signal_real"/></svg>`,
    "bus-parameter": html`<svg class="icon icon-parameter"><use xlink:href="#icon_parameter"/></svg>`,
    "bus-logic": html`<svg class="icon icon-bus"><use xlink:href="#icon_signal_bus"/></svg>`,
    "bus-bit": html`<svg class="icon icon-bus"><use xlink:href="#icon_signal_bus"/></svg>`,
    "bus-reg": html`<svg class="icon icon-bus"><use xlink:href="#icon_signal_bus_reg"/></svg>`,
    "clk-reg": html`<svg class="icon icon-clk"><use xlink:href="#icon_signal_clk"/></svg>`,
    "clk-wire": html`<svg class="icon icon-clk"><use xlink:href="#icon_signal_clk"/></svg>`,
    "clk-integer": html`<svg class="icon icon-clk"><use xlink:href="#icon_signal_integer"/></svg>`,
    "clk-logic": html`<svg class="icon icon-clk"><use xlink:href="#icon_signal_clk"/></svg>`,
    "clk-bit": html`<svg class="icon icon-clk"><use xlink:href="#icon_signal_clk"/></svg>`,
    "clk-real": html`<svg class="icon icon-real"><use xlink:href="#icon_signal_clk"/></svg>`,
    "clk-event": html`<svg class="icon icon-event"><use xlink:href="#icon_event"/></svg>`,
    "clk-parameter": html`<svg class="icon icon-parameter"><use xlink:href="#icon_parameter"/></svg>`,
    "machine-pc": html`<svg class="icon icon-wire"><use xlink:href="#icon_signal_wire"/></svg>`
};

const nu = html`<svg style="display: none"><defs/><symbol id="icon_signal_bus" viewBox="0 0 26 26"><polyline points="1 5 4.6 5 8.7 21 18.9 21 23 5 25 5" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/><polyline points="0 21 5 21 9 5 19 5 23 21 25 21" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/></symbol><symbol id="icon_signal_bus_reg" viewBox="0 0 26 26"><polyline points="26 21 31 21 35 5 45 5 49 21 51 21" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/><polyline points="3 5 5 5 9 21 19 21 23 5 25 5" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/><circle cx="2" cy="5" r="2" fill="#f7931e"/><polyline points="0 21 5 21 9 5 19 5 23 21 25 21" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/></symbol><symbol id="icon_signal_clk" viewBox="0 0 26 26"><polyline points="25 5 21 5 21 21 17 21 17 5 13 5 13 21 9 21 9 5 5 5 5 21 1 21" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/></symbol><symbol id="icon_signal_reg" viewBox="0 0 26 26"><polyline points="25 21 21 21 21 5 14 5 14 21 6 21 6 5 3 5" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/><circle cx="2" cy="5" r="2" fill="#f7931e"/><polyline points="26 21 31 21 35 5 45 5 49 21 51 21" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/></symbol><symbol id="icon_signal_wire" viewBox="0 0 26 26"><polyline points="25 21 21 21 21 5 13 5 13 21 5 21 5 5 1 5" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/></symbol>`;
const ou = html`<svg style="display:none"><defs/><symbol id="icon_browser_dff" viewBox="0 0 18 18"><line x1="4" y1="12" x2="1" y2="12" fill="none" stroke="#ff4081" stroke-miterlimit="10" stroke-width="2"/><line x1="17" y1="12" x2="14" y2="12" fill="none" stroke="#ff4081" stroke-miterlimit="10" stroke-width="2"/><line x1="17" y1="5" x2="14" y2="5" fill="none" stroke="#ff4081" stroke-miterlimit="10" stroke-width="2"/><line x1="4" y1="5" x2="1" y2="5" fill="none" stroke="#ff4081" stroke-miterlimit="10" stroke-width="2"/><rect x="3" y="1" width="12" height="16" fill="#0d47a1" stroke="#82b1ff" stroke-linecap="square" stroke-miterlimit="10"/><polygon points="3 8.5 6.5 12 3 15.5 3 8.5" fill="#1a237e" stroke="#82b1ff" stroke-miterlimit="10"/></symbol><symbol id="icon_browser_genvar" viewBox="0 0 22 22"><rect x="2.5" y="3.5" width="17" height="15" rx="0.5" opacity="0.3"/><path d="M19,4V18H3V4H19m0-1H3A.9.9,0,0,0,2,4V18a.9.9,0,0,0,1,1H19a.9.9,0,0,0,1-1V4a.9.9,0,0,0-1-1Z"/><path d="M10.4,7.6v.9a5.8,5.8,0,0,0-2-.5,2.5,2.5,0,0,0-1.8.8,2.9,2.9,0,0,0-.7,2,2.8,2.8,0,0,0,.8,2,2.4,2.4,0,0,0,2,.8h.7V11.7H8.1v-.8h2.3v3.2a5.1,5.1,0,0,1-2,.4,3.8,3.8,0,0,1-2.6-1,3.4,3.4,0,0,1-1-2.6,3.3,3.3,0,0,1,1-2.6,3.4,3.4,0,0,1,2.6-1Z"/><path d="M13.8,14.3,11.1,7.4h1.1l2.2,5.5,2.2-5.5h.9l-2.7,6.9Z"/></symbol><symbol id="icon_browser_group" viewBox="0 0 28 20"><polyline points="2 11 8.3 11 10 2 22.3 2 24 11 26 11" fill="#01579b" stroke="#00b0ff" stroke-linecap="square" stroke-linejoin="bevel"/><polyline points="2 13.5 4.3 13.5 6 4.5 19.3 4.5 21 13.5 26 13.5" fill="#006064" stroke="#00e5ff" stroke-linecap="square" stroke-linejoin="bevel"/><polyline points="2 16 6.6 16 8.5 7 16 7 17.9 16 26 16" fill="#004d40" stroke="#1de9b6" stroke-linecap="square" stroke-linejoin="bevel"/></symbol><symbol id="icon_browser_module" viewBox="0 0 22 22"><line x1="19" y1="5" x2="21" y2="5" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="1.5"/><line x1="19" y1="17" x2="21" y2="17" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="1.5"/><line x1="3" y1="5" x2="1" y2="5" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="1.5"/><line x1="3" y1="17" x2="1" y2="17" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="1.5"/><line x1="3" y1="11" x2="1" y2="11" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="1.5"/><line x1="21" y1="11" x2="19" y2="11" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="1.5"/><rect x="3.5" y="3.5" width="15" height="15" rx="0.5" fill="currentColor" opacity="0.3"/><path stroke="currentColor" d="M18,4V18H4V4H18m0-1H4A.9.9,0,0,0,3,4V18a.9.9,0,0,0,1,1H18a.9.9,0,0,0,1-1V4a.9.9,0,0,0-1-1Z"/><path fill="currentColor"  d="M7.2,16V6.6H8.9L11,12.4h0l2-5.8h1.8V16H13.6V7.9h0L11.5,14H10.3L8.2,8.1h0V16Z"/></symbol><symbol id="icon_browser_signal" viewBox="0 0 28 11"><polyline points="2 10 6 10 8 1 18 1 20 10 26 10" fill="#004d40" stroke="#1de9b6" stroke-linecap="square" stroke-linejoin="bevel"/></symbol></svg>`;

export class WtSearch extends LitElement {
    constructor() {
        super();
        this.navIndex = -1;
        this.offsetX = 0;
        this.moduleScope = "";
        this.signalCount = 0;
        this.filterTypes = [];
        this.allTypes = [];
        this.keys = { ctrl: false, shift: false };
        this._vcd = null;
        this.signalDict = []
    }

    static get properties() {
        return {
            offsetX: { type: Number },
            signalCount: { type: Number }
        }
    }

    static get styles() {
        return [iu, css`
    :host {
        position: absolute;
        bottom: 44px;
        left: 5px;
        height: calc(100vh - var(--axis-height) - 48px);
        /*min-height: 250px;*/
        max-height: 450px;
        margin-left: auto;
        background: var(--search-background);
        pointer-events: none;
        box-shadow: black 0px 0 px 5px;
        border: 1px solid
        var (--search-border);
        border-radius: 0;
        opacity: 0;
        transition: all 0.1s;
        display: flex;
        flex-flow: column nowrap;
        max-width: 70vw;
        z-index: 20;
        box-sizing: border-box;
    }

    .panel {
        padding: 4px 0;
        background: var(--search-panel-background);
        border-radius: 0px;
        margin: 0px;
        font-family: var(--monospace);
        overflow-x: hidden;
        overflow-y: auto;
        /*height: 100%;*/
        color: var(--search-panel-text);
    }

    #modules {
        border-top: 1px solid
        var(--search-panel-border);
        border-bottom: 1px solid
        var(--search-panel-border);
        min-width: 100px;
        height: 100%;
    }

    #signals {
        border-top: 1px solid
        var(--search-panel-border);
        border-bottom: 1 px solid
        var(--search-panel-border);
        border-left: 1px solid
        var(--search-panel-border);
        min-width: 250px;
        height: 100%;
    }

    #row-top {
        flex-basis: 48px;
        flex-grow: 0;
        flex-shrink: 0;
    }

    #row-middle {
        flex: 1;
        height: calc(100% - 48px - 28px);
        position: relative;
    }

    #row-filter {
        flex-basis: 28px;
        flex-grow: 0;
        flex-shrink: 0;
    }

    #row-filter div {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        font-size: .65rem;
        padding: 4px;
        /*box-sizing: border-box;*/
        height: auto;
        border: 0px solid
        var(--input-border);
        background: var(--input-background);
        opacity: 0.5;
        pointer-events: all;
        margin: 2px;
    }

    #row-filter div:first-child {
        margin-right: 0px;
    }

    #row-filter div:hover {
        background: var(--input-hover);
        cursor: pointer;
    }

    #row-filter div.selected {
        opacity: 1;
        background: var(--input-active-background);
        color: var(--input-active-foreground);
    }

    #row-filter div:not(.selected).icon {
        color: white;
    }

    #row-filter div[disabled=true] {
        display: none;
    }

    #row-bottom {
        flex: 1;
        position: absolute;
        bottom: 0px;
        display: none;
        padding: 4px;
        background: var(--search-background);
        border-top: 1px solid
        var(--search-panel-border);
        width: 100%;

        box-sizing: border-box;
    }

    #actions {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 4px 0;
    }

    #search {
        margin: 4px;
        width: 100%;
        font-family: var(--font-monospace-family);
        font-size: var(--font-monospace-size);
        font-weight: var(--font-monospace-weight);
        /*margin: 4px;*/
        /*background: var(--search-panel-background);*/
        /*color: var(--foreground);*/
        /*padding: 5px;*/
        /*border: 1px solid #222;*/
        /*border-radius: 5px;*/
        /*font-size: 1em;*/
        font-family: 'Consolas', monospace;
    }

    .panel:focus {
            color: #fff;
            outline: 1px solid
            var (--accent);
        }

        .label {
            margin-left: 2px;
            font-size: 0.65rem;
            color: var(--search-label);
            text-transform: uppercase;
            border: 1px solid transparent;
        }

        .icon {
            padding-right: 8px;
        }

        .icon {
            width: 16px;
            height: 16px;
            pointer-events: none;
        }

        .signal-size {
            background: var(--signalSize-background);
            border: 1px solid
            var(--signalSize-border);
            color: var(--signalSize-color);
            padding: 1px 3px;
            border-radius: 5px;
            align-self: flex-end;
            text-align: center;
            margin-right: 8px;
        }

        .signal-name {
            flex: 1;
        }

    li {
        outline: none;
    }

    #signals[disabled] {
        opacity: 0.5;
        pointer-events: none;
    }

    #signals li {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        padding: 2px 3px;
    }

    #signals li.icon {
        flex-basis: 20px;
    }

    #modules li.disabled,
    #modules li.filtered,
    #signals li.disabled,
    #signals li.filtered {
        display: none;
    }

    #modules li.selected > .module-label {
        background: var(--search-selected-background);
    }

    #signals li.selected {
        background: var(--search-selected-background);
    }

    .module-label:hover,
    #signals li:hover {
        background: var(--accent);
        cursor: pointer;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding-inline-start: 0;
        /*padding-inline-start: 2em;*/
        /* font-size: 0.95em; */
    }

    .module-label {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            padding: 1px 4px;
    }

    .module-label span {
        padding: 0;
        margin: 0;
    }

    li span.scope {
        margin-right: 4px;
        border-radius: 4px;
    }

    .scope-0 {
        color: hsl(150, 100%, 50%);
    }
    .scope-1 {
        color: hsl(170, 100%, 50%);
    }
    .scope-2 {
        color: hsl(190, 100%, 50%);
    }
    .scope-3 {
        color: hsl(210, 100%, 50%);
    }
    .scope-4 {
        color: hsl(240, 100%, 50%);
    }
    .scope-5 {
        color: hsl(270, 100%, 50%);
    }
    .scope-6 {
        color: hsl(300, 100%, 50%);
    }
    .scope-7 {
        color: hsl(330, 100%, 50%);
    }

    .icon.signal-reg {
        color: var(--color-green);
    }
    .icon.signal-clk {
        color: var(--color-amber);
    }
    .icon.signal-wire {
        color: var(--color-green);
    }
    .icon.signal-bus {
        color: var(--color-blue);
    }
    .icon-logic {
        color: var(--color-green);
    }
    .icon-reg {
        color: var(--color-green);
    }
    .icon-wire {
        color: var(--color-green);
    }
    .icon-event {
        color: var(--color-green);
    }
    .icon-parameter {
        color: var(--color-green);
    }
    .icon-bus {
        color: var(--color-green);
    }
    .icon-clk {
        color: var(--color-green);
    }
    .icon-real {
        color: var(--color-green);
    }`]
    }

    firstUpdated() {
        this.addEventListener("click", t => t.stopPropagation());
        window.addEventListener("click", t => {
            if ("all" == this.style.pointerEvents && "1" == window.getComputedStyle(this, null).getPropertyValue("opacity")) {
                this.hide();
            }
        });

        this.onkeydown = t => {
            switch (t.keyCode) {
                // enter
                case 13: {
                    let t = false;
                    if (this.keys.ctrl) {
                        this.shadowRoot.querySelectorAll("#signals li.selected:not(.filtered):not(.disabled)").forEach(
                            t => t.classList.add("selected"));
                    }

                    this.add(t);
                    this.requestUpdate();
                    break;
                }
                // shift
                case 16: {
                    this.keys.shift = true;
                    break;
                }
                // ctrl
                case 17: {
                    this.keys.ctrl = true;
                    break;
                }
                //escape
                case 27: {
                    if (0 == this.getSelectedSignals().length && "" === this.searchBox().value) {
                        this.hide();
                    } else {
                        this.searchBox().value = "";
                        this.clear("selected");
                        this.filter();
                        this.searchBox().focus();
                    }

                    this.requestUpdate();
                    break;
                }
                case 33: {
                    t.preventDefault();
                    this.navigate("up", 10);
                    break;
                }
                case 34: {
                    t.preventDefault();
                    this.navigate("down", 10);
                    break;
                }
                case 38: {
                    t.preventDefault();
                    this.navigate("up");
                    break;
                }
                case 40: {
                    t.preventDefault();
                    this.navigate("down");
                    break;
                }
                // ctrl+a
                case 65: {
                    if (this.keys.ctrl && this.shadowRoot.activeElement !== this.searchBox()) {
                        this.selectSignal(t, true);
                    }
                }
            }
        }

        this.onkeyup = t => {
            switch (t.keyCode) {
                case 16: {
                    this.keys.shift = false;
                    break;
                }
                case 17: {
                    this.keys.ctrl = false;
                    break;
                }
            }
        }
    }

    signalTemplate(t) {
        if ("module" === t.type) return;
        const e = t.type;

        let i = "";
        if (t.signalName.includes("clk")) {
            i = "clk-";
        }

        if (t.size > 1) {
            i = "bus-";
        }

        // scope: xxx.xxxx.xxxx  name
        // for settting the color to the scope in the ui
        let r = t.name.split(".").slice(1, -1).map((t, e) => html`
                <span class = "scope scope-${e + 1}"> ${t} </span>`
        );

        // dbclick is very important to interact with the user!!!
        return html`<li id = "sig-${t.id}" tabindex = "-1" @keydown = "${() => false}"
                    data-name = "${t.name}"
                    data-module = "${t.module}"
                    data-type = "${t.type}"
                    @click = "${this.selectSignal}"
                    @dblclick = "${this.quickAdd}">
                    ${tu[i + e]} 
                    <div class = 'signal-name'> 
                        ${r}
                        ${t.name.split(".").slice(-1)}
                    </div>
                    ${t.size > 1 ? html`<div class='signal-size'>${t.size - 1}:0</div>` : html``} </li>
                    `
    }

    // dfs of the module, e is the search depth for calc the padding size
    moduleTemplate(t, e) {
        // i: [] find all the children module of the root
        let i = DataObject.getInst().module.filter(v => v.parent === t.name);

        return html` 
        <li id = "m-${t.id}"
            @click = "${e => {
                e.stopPropagation();
                // set the scope
                this.moduleScope = t.scope + ".";
                this.filter();
            }}"
            data-scope = ${t.scope + "."} >
        <div class = "module-label"
            style = "padding-left: ${16 * e + 4}px; padding-right: 4px;" >
        <svg class = "icon module scope-${e}"> <use xlink: href = "#icon_browser_module"/> </svg> 
        <span> ${t.name} </span> 
        </div> 
        <ul class = "module-children">${i.map(t => this.moduleTemplate(t, e + 1))} </ul> 
        </li>`;
    }

    typeFilterTemplate(t) {
        return html` 
            <div id = "type-filter-${t}"class = "${-1 != this.filterTypes.indexOf(t) ? "selected" : ""}" ?
                disabled = "${-1 == this.allTypes.indexOf(t)}"
                @click = "${this.toggleFilter}" > ${tu[t]}
                ${t} 
            < /div>`
    }

    render() {
        // t :[] is the root modules of the data
        let t = DataObject.getInst().module.filter(v => v.parent === 'root');
        return html`
            ${nu}
            ${ou} 
            <div id = "row-top" class = "row">
                <input id = 'search'
                    type = "text"
                    autocomplete = "off"
                    spellcheck = "false"
                    placeholder = "Search..."
                    @input = ${this.filter}/> 
            </div>
            <div id = "row-middle" class = "row">
                <div class = "col">
                    <span class = "label" > Modules </span> 
                    <ul id = "modules" class = "panel">
                        ${t.map(t => this.moduleTemplate(t, 0))} 
                    </ul> 
                </div>
                <div class = "col" >
                    <span class = "label"> Signals ${this.getSignalCount()} </span>
                    <ul id = "signals" class = "panel">${DataObject.getInst().signal.map(t => this.signalTemplate(t))}</ul>
                </div> 
            </div>
            <div id = "row-filter" class = "row">
                <div id = "type-filter-wire" class = "${-1 != this.filterTypes.indexOf("wire") ? "selected" : ""}" ?
                    disabled = "${-1 == this.allTypes.indexOf("wire")}"
                    @click = "${this.toggleFilter}"> ${tu.wire}
                    Wire 
                </div>
                <div id = "type-filter-reg" class = "${-1 != this.filterTypes.indexOf("reg") ? "selected" : ""}" ?
                    disabled = "${-1 == this.allTypes.indexOf("reg")}"
                    @click = "${this.toggleFilter}" > ${tu.reg}
                    Reg
                </div> 
                <div id = "type-filter-logic" class = "${-1 != this.filterTypes.indexOf("logic") ? "selected" : ""}" ?
                    disabled = "${-1 == this.allTypes.indexOf("logic")}"
                    @click = "${this.toggleFilter}" > ${tu.logic}
                    Logic 
                </div> 
                <div id = "type-filter-bit" class = "${-1 != this.filterTypes.indexOf("bit") ? "selected " : ""}" ?
                    disabled = "${-1 == this.allTypes.indexOf("bit")}"
                    @click = "${this.toggleFilter}" > ${tu.bit}
                    Bit
                </div>
                <div id = "type-filter-integer" class = "${-1 != this.filterTypes.indexOf("integer") ? "selected " : ""}" ?
                    disabled = "${-1 == this.allTypes.indexOf("integer")}"
                    @click = "${this.toggleFilter}" > ${tu.integer}
                    Integer
                </div> 
                <div id = "type-filter-real" class = "${-1 != this.filterTypes.indexOf("real") ? "selected " : ""}" ?
                    disabled = "${-1 == this.allTypes.indexOf("real")}"
                    @click = "${this.toggleFilter}" > ${tu.real}
                    Real
                </div>
                <div id = "type-filter-parameter" class = "${-1 != this.filterTypes.indexOf("parameter ") ? "selected " : ""}" ?
                    disabled = "${-1 == this.allTypes.indexOf("parameter")}"
                    @click = "${this.toggleFilter}" > ${tu.parameter}
                    Parameter
                </div>
                <div id = "type-filter-event" class = "${-1 != this.filterTypes.indexOf("event ") ? "selected " : ""}" ?
                    disabled = "${-1 == this.allTypes.indexOf("event")}"
                    @click = "${this.toggleFilter}" > ${tu.event}
                    Event
                </div>
                </div>
            `
    }

    toggleFilter(t) {
        console.log('toggleFilter');

        const e = t.composedPath()[0];
        const i = e.id.replace("type-filter-", "");
        const r = this.filterTypes.indexOf(i);

        if (r != -1) {
            // remove the type from the filter
            this.filterTypes.splice(r, 1);
        } else {
            // add the type to the filter
            this.filterTypes.push(i);
        }

        if (e.classList.contains("selected")) {
            e.classList.remove("selected");
        } else {
            e.classList.add("selected");
        }

        this.filter();
    }

    // can delete this func, this just for purchasing license
    getSignalCount() {
        const t = this.shadowRoot.getElementById("signals");
        if (t) {
            if (0 == this.signalCount) {
                t.setAttribute("disabled", "");
                this.setFooter(true);
                this.clear("selected");
                this.filter();
                this.searchBox().focus();
            } else {
                this.setFooter(false);
                t.removeAttribute("disabled");
            }
        }

        // test code
        return this.signalCount < 1024 ? `([${this.signalCount}] signals remaining)` : ""
    }

    getSelectedSignals() {
        if (this.shadowRoot) {
            return Array.prototype.slice.call(this.shadowRoot.querySelectorAll("#signals li.selected"));
        } else {
            return [];
        }
    }

    load() {
        // this.signalDict = t;
        this.allTypes = [];
        for (let v of DataObject.getInst().getAllSignalsType()) {
            if (-1 == this.allTypes.indexOf(v) && "module" != v) {
                this.allTypes.push(v);
                this.filterTypes.push(v);
            }
        }

        console.log('this.allTypes: ', this.allTypes);
        console.log('this.filterTypes: ', this.filterTypes);

        this.requestUpdate();
    }

    quickAdd(t) {
        this.add();
    }


    selectSignal(t, e = false) {
        // cancel the selection of the signal obj
        if (!this.keys.ctrl) {
            this.shadowRoot.querySelectorAll("#signals li").forEach(t => {
                t.classList.remove("selected");
            });
        }

        // important, t.currTarget is the something like selected by user's click
        const i = t.currentTarget;
        i.classList.add("selected");
        let r = this.findNavIndexById(i.id);

        // for select multiply signal obj
        const n = this.shadowRoot.querySelectorAll("#signals li:not(.filtered):not(.disabled)");
        if (n) {
            // get the range of the signal obj
            if (this.keys.shift) {
                const t = Math.min(this.navIndex, r);
                const e = Math.max(this.navIndex, r);
                for (let i = t; i <= e; i++) {
                    n[i].classList.add("selected");
                }
            }

            // for select all signal obj
            if (e) {
                n.forEach(t => t.classList.add("selected"));
            }

            this.navIndex = r;
        }

        this.requestUpdate();
    }

    findNavIndexById(t) {
        const e = this.shadowRoot.querySelectorAll("#signals li:not(.filtered):not(.disabled)");
        for (let i = 0; i < e.length; i++) {
            if (e[i].id === t) {
                return i;
            }
        }

        return -1;
    }

    // very important!!!
    add(t = false) {
        let e = [];
        // group data structure
        let i = {
            id: -1,
            vid: "",
            name: "group",
            scope: "",
            size: 0,
            type: DATA_CMD_TYPE.group,
            children: [],
            display: JSON.parse(JSON.stringify(OPERATE_CONFIG.display.defaultTraceStyle))
        }

        // add signal object
        this.shadowRoot.querySelectorAll("#signals li.selected").forEach(r => {
            // let n = this.signalDict[parseInt(r.id.replace("sig-", ""))];
            let modNum = DataObject.getInst().module.length;
            let n = DataObject.getInst().signal[parseInt(r.id.replace("sig-", ""))-modNum-1];

            let o = {
                id: n.id,
                type: DATA_CMD_TYPE[n.type],
                size: n.size,
                signalName: n.signalName,
                name: n.name,
                children: [],
                display: JSON.parse(JSON.stringify(OPERATE_CONFIG.display.defaultTraceStyle))
            };

            if (o.type == DATA_CMD_TYPE.real) {
                o.display.radix = DATA_FORMAT.Float;
            }
            
            // set the init display 
            o.display.y = 0;
            // important!!! prepare the data
            o.display.renderer = (o.size > 1) ? DATA_TYPE.Bus : DATA_TYPE.Wire;

            if (t) {
                i.children.push(o);
            } else {
                e.push(o);
            }

            // to hide the selected signals
            r.classList.remove("selected", "filtered");
            r.classList.add("disabled");
            this.navigate("");
        });

        // t is true just for the group, and just add the group(i object) one time
        if (t) {
            i.name = this.getPrefix(i.children);
            if (1 == i.name.length) {
                i.name = "group"
            }

            e.push(i);
        }

        // transmit the obj meta data to the wt-app
        this.dispatchEvent(new CustomEvent("add", { detail: e }));
    }

    getPrefix(t) {
        const e = t.map(t => t.name);
        for (var i = e[0], r = i.length, n = 1; n < e.length && r > 0; n++) {
            for (var o = e[n], s = 0, a = Math.min(o.length, r); ++s < a && o.charAt(s) == i.charAt(s););
            r = s;
        }

        let h = i.substring(0, r);

        if (h.endsWith("_t")) {
            h = h.substr(0, h.length - 2);
        }

        if (h.endsWith("_")) {
            h = h.substr(0, h.length - 1);
        }

        return h;
    }


    navigate(t, e = 1) {
        const i = this.shadowRoot.querySelectorAll("#signals li:not(.filtered):not(.disabled)");

        if ("up" == t) {
            this.navIndex = this.navIndex - e;
        } else if ("down" == t) {
            this.navIndex = this.navIndex + e;
        } else {
            this.navIndex;
        }

        if (this.navIndex < 0) {
            this.navIndex = -1;
            this.searchBox().focus();
        }

        if (this.navIndex > i.length - 1) {
            this.navIndex = i.length - 1;
        }

        if (!this.keys.shift) {
            this.clear("selected");
        }

        let r = i[this.navIndex];
        if (r) {
            r.focus();
            r.classList.add("selected");
        }
    }

    clear(...t) {
        this.shadowRoot.querySelectorAll("#signals li").forEach(e => {
            e.classList.remove(...t);
        });
    }

    disable(t, e = false) {
        this.shadowRoot.querySelectorAll("#signals li").forEach(i => {
            (t.includes(+i.id.replace("sig-", "")) || e) && i.classList.add("disabled");
        });
    }

    restore(t, e = false) {
        this.shadowRoot.querySelectorAll("#signals li.disabled").forEach(i => {
            (t.includes(+i.id.replace("sig-", "")) || e) && i.classList.remove("disabled")
        });
    }

    // filter the data of the all signals
    filter() {
        console.log('filter...');

        this.clear("selected", "filtered");
        this.navIndex = -1;

        const t = this.moduleScope + this.searchBox().value.toLowerCase();
        let e = this.shadowRoot.querySelectorAll("#signals li");

        // perpare the data which meet the fiter type need
        // out of the filter type , they will be displayed none
        Array.from(e).filter(t => -1 == this.filterTypes.indexOf(t.getAttribute("data-type"))).forEach(t => { t.classList.add("filtered") });
        if ("" == t) {
            return;
        }

        // handle the scope and searchbox 
        this.shadowRoot.querySelectorAll(`#signals li:not([data-name *="${t}"])`).forEach(t => { t.classList.add("filtered") });

        // when click the module name
        if ("" != this.moduleScope) {
            let t = this.shadowRoot.querySelectorAll("#modules li");
            t.forEach(t => { t.classList.remove("selected") });
            t = this.shadowRoot.querySelectorAll(`#modules li[data-scope="${this.moduleScope}"]`);

            if (t.length > 0) {
                t[0].classList.add("selected");
            }
        }
    }

    toggle() {
        "1" === this.style.opacity ? this.hide() : this.show();
    }

    show() {
        this.style.opacity = "1";
        this.style.pointerEvents = "all";
        this.searchBox().value = "";
        this.filter();
        setTimeout(() => { this.searchBox().focus() }, 105);
        this.updateSignalCount();
    }

    updateSignalCount() {
        console.log('updateSignalCount');
        this.signalCount = DataObject.getInst().getSignalAmount();
    }

    hide() {
        this.style.opacity = "0";
        this.style.pointerEvents = "none";
    }

    searchBox() {
        return this.shadowRoot.getElementById("search");
    }

    setFooter(t) {
        const e = this.shadowRoot.getElementById("row-bottom");
        if (e) {
            e.style.display = t ? "block" : "none";
        }
    };
}

window.customElements.define('wt-search', WtSearch);