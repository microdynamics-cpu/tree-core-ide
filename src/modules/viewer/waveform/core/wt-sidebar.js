import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { } from './ItemProperty';
import { } from "./SidebarItem";
import { DATA_CMD_TYPE } from "../Enum";

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

const nu = html`
<svg style="display: none">
    <defs/>
    <symbol id="icon_signal_bus" viewBox="0 0 26 26"><polyline points="1 5 4.6 5 8.7 21 18.9 21 23 5 25 5" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/><polyline points="0 21 5 21 9 5 19 5 23 21 25 21" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/></symbol>
    <symbol id="icon_signal_bus_reg" viewBox="0 0 26 26"><polyline points="26 21 31 21 35 5 45 5 49 21 51 21" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/><polyline points="3 5 5 5 9 21 19 21 23 5 25 5" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/><circle cx="2" cy="5" r="2" fill="#f7931e"/><polyline points="0 21 5 21 9 5 19 5 23 21 25 21" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/></symbol>
    <symbol id="icon_signal_clk" viewBox="0 0 26 26"><polyline points="25 5 21 5 21 21 17 21 17 5 13 5 13 21 9 21 9 5 5 5 5 21 1 21" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/></symbol>
    <symbol id="icon_signal_reg" viewBox="0 0 26 26"><polyline points="25 21 21 21 21 5 14 5 14 21 6 21 6 5 3 5" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/><circle cx="2" cy="5" r="2" fill="#f7931e"/><polyline points="26 21 31 21 35 5 45 5 49 21 51 21" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/></symbol>
    <symbol id="icon_signal_wire" viewBox="0 0 26 26"><polyline points="25 21 21 21 21 5 13 5 13 21 5 21 5 5 1 5" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/></symbol>
`;

const au = html`
<svg display="none">
    <defs />
    <symbol id="fa-monitor" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-monitor"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></symbol>
    <symbol id="fa-info" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></symbol>
    <symbol id="fa-key" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-key"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></symbol>
    <symbol id="fa-command" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-command"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></symbol>
    <symbol id="fa-mouse-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mouse-pointer"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="M13 13l6 6"></path></symbol>
    <symbol id="fa-more-horizontal" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></symbol>
    <symbol id="fa-activity" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></symbol>
    <symbol id="fa-alert-triangle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></symbol>
    <symbol id="fa-code" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-code"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></symbol>
    <symbol id="fa-menu" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></symbol>
    <symbol id="fa-plus-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></symbol>
    <symbol id="fa-trash-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></symbol>
    <symbol id="fa-minus" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></symbol>
</svg>
`;

export class WtSidebar extends LitElement {
    constructor() {
        super();
        this._signals = [];
        this.selectedSignals = [];
        this.defined = false;
        this.error = false;
        this.draggedIndex = null;
        this.hoverIndex = null;
        this.ctrl = false;
    }

    static get properties() {
        return {
            signals: { type: Array },
            selectedSignals: { type: Array },
            defined: { type: Boolean },
            error: { type: Boolean },
            hoverIndex: { type: Number },
            draggedIndex: { type: Number }
        }
    }

    static get styles() {
        return [iu, css`
        :host {
            z-index: 10;
            --sidebar-item-max-height: 40px;
            height: 100%;
            width: 100%;
        }

        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        #treeroot {
            display: block;
            height: 100%;
            position: relative;
            overflow-y: scroll;
            line-height: 8px;
        }

        .wi-root {
            overflow: hidden;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        /* Waveform Group */
        .wg-container {
            display: block;
            background: var(--sidebar-group-background);
            border-top: 1px solid
            var(--sidebar-group-border);
            border-bottom: 1px solid
            var(--sidebar-group-border);
            padding-bottom: 5px;
            margin: 10px 0;
        }

        .wg-header {
            display: block;
            font-size: 0.7rem;
            font-weight: bold;
            padding: 10px;
        }

        .wg-body {
            width: 100%;
        }

        /* Divider */
        .wd-container {
            display: block;
            background: var(--sidebar-item-border);
        }

        /* Waveform Items */
        .wi-container {
            overflow: hidden;
            border-top: 1px solid
            var(--sidebar-item-border);
        }

        .wi-container::-webkit-scrollbar {
            display: none;
        }

        /*.wi-container li:not(.wg-container) {    
            border-top: 1px solid var(--sidebar-item-border);
        }*/

        .wi-container.selected.wi-item {
            background: var(--sidebar-item-selected);
        }

        .wi-item:hover {
            background: var(--sidebar-item-hover);
        }

        .wi-container li {
            outline: none;
        }

        .wi-item {
            display: flex;
            flex-direction: row;
            flex-basis: 0;
            flex-grow: 1;
            background: var(--sidebar-item-background);
            /*box-shadow: var(--background) 1px 1px 3px;*/
            /*font-size: var(--monospace-font-size);*/
            font-weight: var(--monospace-font-weight);
            font-family: var(--monospace-font-family);
            font-size: 0.75rem;

            user-select: none; 
            -webkit-user-select: none;
            transition: all .1s;
            outline: none;
        }

        .wi-label {
            padding-left: 10px;
            flex-grow: 8;
            text-align: right;
            font-family: Monaco, Consolas, "Source Code Pro", Verdana, Monospace, sans-serif;
            display: flex;
            flex-direction: column;
            align-content: flex-end;
            justify-content: center;
            flex-wrap: wrap;
            overflow: hidden;
            height: 100% ;
            max-height: var(--sidebar-item-max-height);
            box-shadow: var(--shadow) 1px 0 3px;
        }

        .wi-name {
            display: inlin-block;
            text-overflow: ellipsis;
            overflow: hidden;
            direction: rtl;
            text-align: right;
            width: 100%;
            padding: 2px;
        }

        .wi-radix {
            color: #0F6;
            background: var(--sidebar-item-radix-background);
            display: inline;
            text-align: right;
            margin-left: 4px;
            display: flex;
            flex-direction: column;
            flex-basis: 65px;
            flex-grow: 0;
            flex-shrink: 0;
        }

        .wi-radix div {
            font-family: Monaco, Consolas, "Source Code Pro", Verdana, Monospace, sans-serif;
            /*font-size: 0.9rem;*/
            height: 100%;
            max-height: var(--sidebar-item-max-height);
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 4px;
        }

        .wi-icon svg {
            min-width: 20px;
            width: 20px;
            height: 100%;
            max-height: var(--sidebar-item-max-height);
            padding-left: 5px;
            cursor: grab !important;
        }

        sidebar-item {
            display: inline-flex;
            width: 100%;
            vertical-align:top;
        }

        sidebar-item.prop-open .wi-item .wi-icon {
            opacity: 1;
        }

        .sortable-chosen sidebar-item .wi-item {
            background: var(--accent);
        }

        input[type= "text"] {
            background: transparent;
            color: var(--foreground);
        }

        .wi-size {
            display: flex;
            flex-flow: column nowrap;
            align-content: center;
            justify-content: center;
            flex-grow: 0;
            max-height: var(--sidebar-item-max-height);
            flex-shrink: 0;
        }

        .wi-scope {
            opacity: 0.6;
        }

        .signal-size {
            display: flex;
            flex-flow: column nowrap;
            align-content: center;
            justify-content: center;
            font-family: Monaco, Consolas, "Source Code Pro", Verdana, Monospace, sans-serif;
            /*font-size: 0.9rem;*/
            background: var(--signalSize-background);
            border: 1px solid
            var(--signalSize-border);
            color: var(--signalSize-color);
            text-align: center;
            padding: 0px 2px;
            border-radius: 5px;
            margin: 2px 8px;
            height: 1rem;
            line-height: 0;
        }

        nav {
            display: block;
            height: calc(100% - var(--axis-height) - 48px);
        }

        svg {
            pointer-events: none;
            width: 18px;
            height: 16px;
        }

        #header {
            width: 100% ;
            height: var(--axis-height);
            background: 1px solid
            var(--background);
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;
        }

        #header button {
            height: calc(var(--axis-height) - 8px)
        }

        footer button {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }

        footer {
            z-index: 100;
            background: var(--sidebar);
            display: flex;
            width: 100%;
            height: 48px;
            align-items: center;
            justify-content: center;
        }

        .item {
            position: relative;
            transition: none;
            z-index: 101;
        }

        .item.nudgeDown:not(.dragged) {
            transform: translate3d(0, 24px, 0);
        }

        .item.nudgeUp:not(.dragged) {
            transform: translate3d(0, -24px, 0);
        }

        .item.dragged {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
            transition: none;
        }

        /* Only have transition under .dragging, because we don't want nudged
         * items to transition into place once dragging is complete */
        .dragging > .item:not(.dragged) {
            transition: transform 0.2s ease-out;
        }
    `]
    }

    render() {
        return html`
            ${nu}
            ${au} 
            <svg style = "display:none;" >
            <symbol id = "wave-square" viewBox = "0 0 640 512" >
                <path fill = "currentColor" d = "M476 480H324a36 36 0 0 1-36-36V96h-96v156a36 36 0 0 1-36 36H16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h112V68a36 36 0 0 1 36-36h152a36 36 0 0 1 36 36v348h96V260a36 36 0 0 1 36-36h140a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H512v156a36 36 0 0 1-36 36z"> 
                </path> 
            </symbol> 
            <symbol id = "wave-step" viewBox = "0 0 15.847 6.301" >
                <path data-name = "Path 5" d = "M3.788,8.5H5.769V6.714h1.7V5.208H9.416V6.993h1.7V8.779h1.981v1.73h2.641V8.779h1.792V7.216h2.107"
                    transform = "translate(-3.788 -4.708)"
                    fill = "none"
                    stroke = "currentColor"
                    stroke - width = "1" />
            </symbol> 
            <symbol id = "wave-linear" viewBox = "0 0 15.495 5.98" >
                <path data-name = "Path 2"d = "M4.068,8.617c2.955-2.955,4.347-3.315,6.9-.867.1.1.447.456.813.867,3.005,3.365,4.181,3.3,7.055,0"
                    transform = "translate(-3.714 -5.636)"
                    fill = "none"
                    stroke = "currentColor"
                    stroke-width = "1.5" />
            </symbol> 
            </svg>
            <item-property id = "item-property-0" .signals = ${this.selectedSignals}>
            </item-property>
            <nav id = "nav0">
                <div id = "treeroot" class = "wi-container" >
                    <div id="placeholder" style="height: 32px"></div>
                    ${repeat(this._signals, t => t.id, (t, e) => this.renderItem(t, e))}
                </div> 
            </nav>
    `}

    resize() {
        const t = this.shadowRoot.querySelectorAll("sidebar-item");
        for (let e = 0; e < t.length; e++) {
            let i = t[e];
            if (i) {
                i.resizeSignal();
            }
        }

        return this.dispatchEvent(new CustomEvent("waveformChanged"));
    }

    resizeList() { }

    updateCursor(t) {
        const e = this.shadowRoot.querySelectorAll("sidebar-item");
        for (let i = 0; i < e.length; i++) {
            let r = e[i];
            r.value = t[r._signal.id];
        }
    };

    get dragging() {
        // console.log('dragging');
        return null !== this.draggedIndex;
    }

    // get data from the wt-app enterance !!!
    set signals(t) {
        console.log('[wt-sidebar] set signals: ', t);
        let e = this._signals;
        this._signals = t;
        this.requestUpdate("signals", e);
    }

    insert() {
        let t = this._signals[this.draggedIndex];

        if (t) {
            this._signals.splice(this.draggedIndex, 1);
            this._signals.splice(this.hoverIndex, 0, t);
            this.draggedIndex = null;
            this.hoverIndex = null;
        }
    }


    firstUpdated() {
        // trigger the scroll event
        this.shadowRoot.getElementById("treeroot").onscroll = () => {
            this.resize();
        }

        window.addEventListener("keydown", t => {
            switch (t.keyCode) {
                // ctrl
                case 17: {
                    this.ctrl = true;
                    break;
                }
            }
        });

        window.addEventListener("keyup", t => {
            switch (t.keyCode) {
                case 17: {
                    this.ctrl = false;
                    break;
                }

                case 27: {
                    this.clearSelection();
                }
            }
        })

        // maybe not be used?
        this.addEventListener("update-select", t => {
            this.updateSelected(t.detail);
        })
    }

    // maybe not be used?
    updateSelected(t) {
        let e = [];
        t.forEach(t => {
            try {
                const i = parseInt(t.children[0].id.replace("wi-", ""));
                e.push(i);
            } catch (t) { 

            }
        });

        this.selectedSignals = this.findSignals(this._signals, e);
    }

    findSignals(t, e) {
        let i = [];
        for (let r of t) {
            if (e.includes(r.id)) {
                i.push(r);
            }

            i.push(...this.findSignals(r.children, e));
        }

        return i;
    }

    // capture this 'add' event in the wt-app @add="${this.addSignalClicked}
    // addSignal() {
    //     console.log('add signal');
    //     this.dispatchEvent(new Event("add"));
    // }

    // deleteSignal() {
    //     this.dispatchEvent(new Event("delete"));
    // }

    getSelected() {
        let t = this.shadowRoot.querySelectorAll("sidebar-item");
        // e: [] 
        let e = [], i = [];

        t.forEach(t => {
            if (t.classList.contains("selected")) {
                i.push(t);
                e.push(parseInt(t.id.replace("wi-", "")));
            }

        });

        i.forEach(t => t.classList.remove("selected"));

        return e;
    }

    selectAll() {
        let t = this.shadowRoot.querySelectorAll("sidebar-item");
        let e = null;

        t.forEach(t => {
            t.classList.add("selected");
            const i = t._signal;
            this.selectedSignals.push(i);
            e = i.id;
        })

        if (e) {
            this.setActiveSignal(e);
        }

        this.shadowRoot.getElementById("item-property-0").requestUpdate("signals");
    }

    // just for the key
    selectAdjacent(t = true) {
        const e = this.shadowRoot.querySelectorAll("sidebar-item.selected");
        const i = e.item(t ? e.length - 1 : 0);
        if (i) {
            const e = t ? i.nextElementSibling : i.previousElementSibling;
            if (e) {
                this.clearSelection();
                e.classList.add("selected");
                this.selectedSignals.push(e._signal);
                this.setActiveSignal(e._signal.id);
            }
        }
    }

    moveSelectedSignals(t = false) {
        const e = this.shadowRoot.querySelectorAll("sidebar-item.selected");
        for (let i = 0; i < e.length; i++) {
            const r = e.item(i)._signal;
            const n = this._signals.findIndex(t => t.id == r.id);
            if (n + t >= 0) {
                this.draggedIndex = n;
                this.hoverIndex = n + t;
                this.insert();
            }
        }

        this.dispatchEvent(new CustomEvent("waveformChanged"));
        setTimeout(() => { this.resize() }, 50);
    }

    clearSelection() {
        const t = this.shadowRoot.getElementById("treeroot");
        const e = Array.from(t.children);
        this.selectedSignals.splice(0, this.selectedSignals.length);

        for (let t of e) {
            t.classList.remove("selected");
        }

        this.setActiveSignal(-1);
    }

    setActiveSignal(t) {
        this.dispatchEvent(new CustomEvent("setActiveSignal", {
            bubbles: true,
            composed: true,
            detail: t
        }));

        this.shadowRoot.getElementById("item-property-0").requestUpdate("signals");
    }

    startItemDrag(t) {
        let e = t.currentTarget;
        const i = this.shadowRoot.getElementById("treeroot");
        const r = Array.from(i.children);

        if (t.pageX > 24) {
            if (e.classList.contains("wg-container")) {
                return;
            }
            if(false == this.ctrl) {
                this.clearSelection();
            }

            if (e.classList.contains("selected")) {
                e.classList.remove("selected");
                const t = e._signal, i = this.selectedSignals.findIndex(e => e.id == t.id);
                this.selectedSignals.splice(i, 1);
            } else {
                e.classList.add("selected");
                const t = e._signal;
                this.selectedSignals.push(t);
                this.setActiveSignal(t.id);
            }

            this.shadowRoot.getElementById("item-property-0").requestUpdate("signals");
        }

        let n = "mousemove", o = "mouseup", s = t => t.pageY;
        document.documentElement.style.cursor = "grabbing";
        this.draggedIndex = r.indexOf(e);

        const a = parseInt(getComputedStyle(this).getPropertyValue("--axis-height"));
        const h = this.shadowRoot.querySelectorAll("sidebar-item");
        let l = this.getBoundingClientRect().top + window.scrollY + a;
        let u = s(t);
        e.style.zIndex = "200";
        let c = [];

        h.forEach(t => { 
            c.push(t.getBoundingClientRect().top + t.getBoundingClientRect().height / 2 - a);
        });

        const d = t => {
            let i = s(t) - l, r = s(t) - u;
            e.style.transform = `translateY(${r}px)`;
            this.hoverIndex = c.length;

            for (let t = 0; t < c.length - 1; t += 1) {
                if (i > c[t] && i < c[t+1]) {
                    this.hoverIndex = t;
                    break;
                }

                this.dispatchEvent(new CustomEvent("waveformChanged"));
            }
        };

        d(t);
        document.addEventListener("mouseup", (function t() {
            document.removeEventListener("mousemove", d);
            document.removeEventListener("mouseup", t);
            document.documentElement.style.cursor = null;

            const i = document.getElementById("app").shadowRoot.getElementById("wt-sidebar-0");
            const r = () => {
                i.insert();
                e.style.zIndex = "100";
                e.style.transform = "";
                e.style.transition = "";
                e.removeEventListener("transitionend", r);
                setTimeout(() => { i.resize() }, 101);
            };

            e.addEventListener("transitionend", r);
            const n = e._signal;
            const o = (i.hoverIndex - i.draggedIndex) * n.display.height;

            e.style.transition = "transform 0.1s ease-out";
            e.style.transform = `translate3d(0, ${o}px, 0)`;
        }));

        document.addEventListener("mousemove", d);
    }

    updateItem(t) {
        if ("transform" === t.propertyName) {
            t.composedPath()[0].resizeSignal();
            this.dispatchEvent(new CustomEvent("waveformChanged"));
        }
    }

    renderItem(t, e) {
        const i = {
            nudgeDown: this.dragging && e < this.draggedIndex && e >= this.hoverIndex,
            nudgeUp: this.dragging && e > this.draggedIndex && e <= this.hoverIndex,
            dragged: this.draggedIndex === e,
            "wd-container": t.type == DATA_CMD_TYPE.divider,
            "wg-container": t.type == DATA_CMD_TYPE.group,
            "wi-container": t.type !== DATA_CMD_TYPE.group && t.type !== DATA_CMD_TYPE.divider
        };

        const r = t.type !== DATA_CMD_TYPE.group ? `height: ${t.display.height}px` : "";
        const n = t.type == DATA_CMD_TYPE.group ? "wg-" + t.id : "wi-" + t.id;

        return html`
                <sidebar-item
                    .signal = "${t}"
                    id = "${n}"
                    class = "item ${classMap(i)}"
                    style = "${r}"
                    @mousedown = '${this.startItemDrag}'
                    @transitionend = '${this.updateItem}'
                    @resizeSignals = ${this.resize}>
                </sidebar-item>`
    }
}

window.customElements.define('wt-sidebar', WtSidebar);