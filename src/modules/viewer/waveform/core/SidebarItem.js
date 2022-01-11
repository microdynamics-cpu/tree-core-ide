import { LitElement, html } from 'lit';
import { DATA_CMD_TYPE } from "../Enum";

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

export class SidebarItem extends LitElement {
    constructor() {
        super();
        this.editAlias = false;

        // very important!!!
        this._signal = {
            id: 0,
            vid: "",
            name: "defalut",
            scope: "",
            size: 8,
            type: DATA_CMD_TYPE.wire,
            children: [],
            display: {}
        };

        this.value = "";
        this.onkeydown = t => {
            switch (t.keyCode) {
                case 27:
                case 13: {
                    if(this.editAlias) {
                        this.editAlias = false;
                        this.requestUpdate();
                    }
                }
            }
        }
    }

    static get properties() {
        return {
            signal: {
                type: Object
            },
            value: {
                type: String
            }
        }
    }

    render() {
        return html`
            ${this._signal.type == DATA_CMD_TYPE.group ? html`
                <div class="wg-header" @dblclick=${this.handleEditAlias}>
                    ${this.editAlias ? html`<input id="input-alias" type="text" value="${this._signal.display.alias}" onClick="this.setSelectionRange(0, this.value.length)" @input=${this.setAlias} autofocus/>` : html`${this._signal.display.alias ? this._signal.display.alias : this._signal.name}`}
                </div>
                <div class='wg-body'>
                    ${this._signal.children.map(t => html`
                        <sidebar-item 
                            .signal=${t} 
                            id="wi-${t.id}" 
                            class='item wi-container'
                            style="height: ${t.display.height}px" 
                            @resizeSignals=${this.resize}>
                        </sidebar-item>
                    `)}
                </div>
            `: this._signal.type == DATA_CMD_TYPE.divider ? html`
                <div class="wg-header">&nbsp;</div>
            `: html`
                <div class='wi-item'>
                        ${this._signal.size > 1 ? html`<div class="wi-size"><div class='signal-size'>${this._signal.size - 1}:0</div></div>` : html``}
                    <div class='wi-label'>
                        <span class='wi-name' @dblclick=${this.rename}><span class="wi-scope">${this._signal.name.split('.').slice(0, -1).join('.')}.</span>${this._signal.signalName}</span>
                    </div>
                    <div class='wi-radix' style="color:${this._signal.display.color}"><div>${this.value}</div></div>
                </div>
            `}
            `
    }

    handleEditAlias(t) {
        this.editAlias = true;
        if(!this._signal.display.alias) {
            this._signal.display.alias = this._signal.name;
        }
        
        this.requestUpdate();
    }

    firstUpdated() {
        this.resize();
    }

    updated() {
        this.resizeSignal();
    }

    resizeSignal() {
        if (this.children.length > 0) {
            const t = this.children[0].getBoundingClientRect();
            this._signal.display.y = t.y;
            this._signal.display.height = t.height;
        }
    }

    resize() {
        this.dispatchEvent(new CustomEvent("resizeSignals", {
            bubbles: true,
            composed: true
        }));
    }

    rename() { 
        console.log('rename');
    }

    createRenderRoot() {
        return this;
    }

    // get the data from the wt-sidebar
    set signal(t) {
        let e = t;
        this._signal = t;
        let i = "";
        const r = DATA_CMD_TYPE[this._signal.type];

        if(this._signal.signalName.includes("clk")) {
            i = "clk-";
        }

        if(this._signal.size > 1) {
            i = "bus-";
        }

        this.icon = tu[i+r];
        this.requestUpdate("signal", e);
    }

    setAlias(t) {
        const e = t.composedPath()[0];
        this._signal.display.alias = e.value;
    }
}

window.customElements.define('sidebar-item', SidebarItem);