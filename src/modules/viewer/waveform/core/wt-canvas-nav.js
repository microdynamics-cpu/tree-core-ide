import { LitElement, html, css } from 'lit';
import { Cursor } from '../Cursor';

const su = html`
<svg display="none">
    <defs />
    <symbol id="file" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z" />
    </symbol>
    <symbol id="reload" viewBox="0 0 24 24">
        <path fill="currentColor"
        d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z" />
    </symbol>
    <symbol id="save" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
    </symbol>
    <symbol id="undo" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
    </symbol>
    <symbol id="redo" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
    </symbol>
    <symbol id="add-signal" viewBox="0 0 24 24">
        <path fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
    </symbol>
    <symbol id="delete-signal" viewBox="0 0 24 24">
        <path fill="currentColor"
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </symbol>
    <symbol id="live-update-wave" viewBox="0 0 24 24">
        <path fill="currentColor"
        d="M21,10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-0.1c-2.73,2.71-2.73,7.08,0,9.79s7.15,2.71,9.88,0 C18.32,15.65,19,14.08,19,12.1h2c0,1.98-0.88,4.55-2.64,6.29c-3.51,3.48-9.21,3.48-12.72,0c-3.5-3.47-3.53-9.11-0.02-12.58 s9.14-3.47,12.65,0L21,3V10.12z M12.5,8v4.25l3.5,2.08l-0.72,1.21L11,13V8H12.5z" />
    </symbol>
    <symbol id="live-hover-tips" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </symbol>
    <symbol id="cursor-markers" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z" />
    </symbol>
    <symbol id="settings" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
    </symbol>
    <symbol id="pre-rising-edge" viewBox="0 0 24 24">
        <line x1="2" y1="21" x2="12" y2="21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <line x1="12" y1="21" x2="12" y2="3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <line x1="12" y1="3" x2="22" y2="3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <polygon points="12,9 9,13 15,13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <rect x="3" y="3" width="4" height="4" fill="white" />
    </symbol>
    <symbol id="pre-falling-edge" viewBox="0 0 24 24">
        <line x1="22" y1="21" x2="12" y2="21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <line x1="12" y1="21" x2="12" y2="3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <line x1="12" y1="3" x2="2" y2="3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <polygon points="12,15 9,11 15,11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <rect x="21" y="3" width="4" height="4" fill="white"/>
    </symbol>
    <symbol id="aft-rising-edge" viewBox="0 0 24 24">
        <line x1="2" y1="21" x2="12" y2="21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <line x1="12" y1="21" x2="12" y2="3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <line x1="12" y1="3" x2="22" y2="3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <polygon points="12,9 9,13 15,13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </symbol>
    <symbol id="aft-falling-edge" viewBox="0 0 24 24">
        <line x1="22" y1="21" x2="12" y2="21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <line x1="12" y1="21" x2="12" y2="3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <line x1="12" y1="3" x2="2" y2="3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <polygon points="12,15 9,11 15,11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </symbol>
    <symbol id="zoom-in" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        <path fill="currentColor" d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
    </symbol>
    <symbol id="zoom-out" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" />
    </symbol>
    <symbol id="zoom-fit" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M15,3l2.3,2.3l-2.89,2.87l1.42,1.42L18.7,6.7L21,9V3H15z M3,9l2.3-2.3l2.87,2.89l1.42-1.42L6.7,5.3L9,3H3V9z M9,21 l-2.3-2.3l2.89-2.87l-1.42-1.42L5.3,17.3L3,15v6H9z M21,15l-2.3,2.3l-2.87-2.89l-1.42,1.42l2.89,2.87L15,21h6V15z" />
    </symbol>
    <symbol id="help" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </symbol>
</svg>`


export class WtCanvasNav extends LitElement {
    constructor() {
        super();
        this.fileChanged = false;
        this._viewport = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            length: 1,
            xscale: 1,
            yscale: 1,
            timescale: 0
        };

        this.addEventListener("click", t => {
            t.stopPropagation()
        });

        this.addEventListener("mousedown", t => {
            t.stopPropagation()
        });

        this.addEventListener("pointerdown", t => {
            t.stopPropagation()
        });

        this.addEventListener("touchstart", t => {
            t.stopPropagation()
        });
    }

    static get properties() {
        return {
            viewport: {
                type: Object
            },
            fileChanged: {
                type: Boolean
            }
        }
    }

    static get styles() {
        return [css`
        :host
        {
            --navBar-height: 24px;
            z-index: 1;
            font-size: 0.65rem;
        }

        #container {
            height: var(--navBar-height);
            width: 70%;
            padding: 4px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            margin-bottom: 0px;
            background: var(--navBar-background);
            border-radius: calc(var(--navBar-height));
            /* box-shadow: var(--shadow) 0 0 8px; */
        }

        #search {
            margin: 0 6px;
            width: 120px;
            height: 100%;
            background: var(--input-background);
            color: var(--input-foreground);
            border: 1px solid var(--input-border);
            border-radius: var(--input-radius);
            outline: none;
            font-family: 'Monaco', 'Consolas', monospace;
        }

        #search:focus {
            background: var(--input-active-background);
            color: var(--input-active-foreground);
            border-color: var(--input-active-border);
        }

        #nav-bar {
            flex-grow: 1;
            background: var(--input-background);
            height: 100%;
            margin: 0 6px;
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.15);
        }

        #nav-slider {
            pointer-events: none;
            position: relative;
            top: calc(-100%);

            width: 30px;
            height: calc(100% - 2px);
            background: var(--navBar-preview-background);
            border: 1px solid var(--navBar-slider-border);
            opacity: 0.5;
            margin:0;
            outline:0;
            padding:0;
            cursor: pointer;
        }

        #nav-slider:hover {
            border: 1px solid var(--button-hover);
        }

        #nav-slider:active {
            border: 1px solid var(--button-active);
        }

        #nav-primary-marker {
            pointer-events: none;
            position: relative;
            top: 0px;
            left: 0%;
            font-size: 0.7rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            border-left: 2px solid var(--accent);
            padding-left: 2px;
            height: calc(100%);
            font-family: var(--font-monospace-family);
        }

        #system-group, #edit-group,
        #setting-group, #zoom-group,
        #nav-group, #reload-group {
            flex-flow: row nowrap;
            height: 100%;
            border-radius: 16px;
            padding: 1px;
            box-shadow: var(--shadow) 0 0 3px;
            background: var(--navBar-group-background);
        }

        button {
            display: inline-block;
            padding:0;
            margin:0;
            border: 0;
            outline: 0;
            height: 100%;
            width: 24px;
            line-height: 0;
            background: var(--navBar-button);
            border: none;
            opacity: 0.8;
            color: var(--navBar-button-text);
        }

        button:hover {
            cursor: pointer;
            opacity: 1;
            color: var(--button-hover);
        }

        .highlight {
            background-color: var(--accent) !important;
        }

        .highlight button {
            opacity: 0.6;
        }

        .highlight button:hover {
            color: var(--title-color) !important;
            opacity: 1;
        }

        button:hover:active,
        button:active {
            color: var(--button-active);
            opacity: 1;
        }

        #settings {
            margin-right: 6px;
        }

        svg {
            width: 18px;
            height: 18px;
        }
    `]
    }

    render() {
        return html`
            ${su}
            <div id="container" class="darkglass">
                <div id="system-group" class='${this.fileChanged ? "highlight" : ""}' >
                    <button id="reload" title="reload wave file" @click=${this.uploadFile}><svg><use xlink:href="#reload"/></svg></button>
                    <button id="upload-file" title="open wave file" @click=${this.uploadFile}><svg><use xlink:href="#file"/></svg></button>
                    <button id="save" title="save wave file" @click=${this.uploadFile}><svg><use xlink:href="#save"/></svg></button>
                    <button id="undo" title="undo" @click=${this.uploadFile}><svg><use xlink:href="#undo"/></svg></button>
                    <button id="redo" title="redo" @click=${this.uploadFile}><svg><use xlink:href="#redo"/></svg></button>
                    <button id="add-signals" title="add signals" @click=${this.addSignals}><svg><use xlink:href="#add-signal"/></svg></button>
                    <button id="delete-signals" title="delete signals" @click=${this.addSignals}><svg><use xlink:href="#delete-signal"/></svg></button>
                </div>
                <div id="nav-group" class="btn-group">
                <button id="pre-rising-edge" title="pre rising edge" @click=${this.zoom_in}><svg><use xlink:href="#pre-rising-edge"/></svg></button>
                <button id="pre-falling-edge" title="pre falling edge" @click=${this.zoom_in}><svg><use xlink:href="#pre-falling-edge"/></svg></button>
                <button id="aft-rising-edge" title="aft rising edge" @click=${this.zoom_in}><svg><use xlink:href="#aft-rising-edge"/></svg></button>
                <button id="aft-falling-edge" title="aft falling edge" @click=${this.zoom_in}><svg><use xlink:href="#aft-falling-edge"/></svg></button>
                </div>
                <div id="zoom-group" class="btn-group">
                    <button id="zoom-in" @click=${this.zoom_in}><svg><use xlink:href="#zoom-in"/></svg></button>
                    <button id="zoom-out" @click=${this.zoom_out}><svg><use xlink:href="#zoom-out"/></svg></button>
                    <button id="zoom-fit" @click=${this.zoom_fit}><svg><use xlink:href="#zoom-fit"/></svg></button>
                </div>
                
                <input id = "search" type = "text" autocomplete = "off" spellcheck = "false" placeholder = "Search..."/> 
                
                <button id="settings" @click=${this.settings}><svg><use xlink:href="#settings"/></svg></button>
                <div id="setting-group" class='${this.fileChanged ? "highlight" : ""}' >
                    <button id="live-update" title="live update" @click=${this.addSignals}><svg><use xlink:href="#live-update-wave"/></svg></button>
                    <button id="live-hover-tips" title="hover tips" @click=${this.addSignals}><svg><use xlink:href="#live-hover-tips"/></svg></button>
                    <button id="cursor-markers" title="cursor markers" @click=${this.createCursorMarker}><svg><use xlink:href="#cursor-markers"/></svg></button>
                    <button id="settings" @click=${this.settings}><svg><use xlink:href="#settings"/></svg></button>
                    <button id="help" @click=${this.settings}><svg><use xlink:href="#help"/></svg></button>
                </div>
            </div>
            `
    }

    firstUpdated() {
        window.onresize = () => {
            this.updatePreview();
        }
    }

    uploadFile() {
        console.log('upload-file');
        this.dispatchEvent(new CustomEvent("evt-upload-file", {
            detail: {},
            bubbles: true,
            composed: true
        }));
    }

    addSignals() {
        console.log('add-signals');
        this.dispatchEvent(new CustomEvent("evt-add-signals", {
            detail: {},
            bubbles: true,
            composed: true
        }));
    }

    reload() {
        this.dispatchEvent(new CustomEvent("file-reload", {
            detail: {},
            bubbles: true,
            composed: true
        }));
    }

    settings() {
        this.dispatchEvent(new CustomEvent("settings", {
            detail: {},
            bubbles: true,
            composed: true
        }));
    }

    zoom_out() {
        this.dispatchEvent(new CustomEvent("change", {
            detail: {
                cmd: "zoom_out"
            }
        }));
    }

    zoom_fit() {
        this.dispatchEvent(new CustomEvent("change", {
            detail: {
                cmd: "zoom_fit"
            }
        }));
    }

    zoom_in() {
        this.dispatchEvent(new CustomEvent("change", {
            detail: {
                cmd: "zoom_in"
            }
        }));
    }

    createCursorMarker() {
        console.log('create marker!');
        this.dispatchEvent(new CustomEvent("extra-cursor", {
            detail: {
                cmd: "create_cursor_marker"
            }
        }));
    }

    updatePreview() {
        return;
        const t = this.shadowRoot.getElementById("nav-bar");
        if (!t) return;

        t.getClientRects()[0];
        const e = this._viewport.x / this._viewport.length;
        let i = Math.max(this._viewport.x, 0);
        const r = Math.min(Math.round(this.getClientRects()[0].width * (1 / this._viewport.xscale) + this._viewport.x), this._viewport.length);

        i = Math.min(i, r);
        const n = Math.min((r - i) / this._viewport.length, 1);
        const o = this.navSlider();
        o.style.width = 99.9 * n + "%";
        o.style.marginLeft = Math.max(Math.min(99.9 * e, 100), 0) + "%";
    }

    navSlider() {
        return this.shadowRoot.getElementById("nav-slider");
    }

    setPrimaryMarker(t) {
        this.shadowRoot.getElementById("nav-primary-marker").style.left = t + "%";
    }

    pointerMove(t) {
        if (t.target == this.shadowRoot.getElementById("nav-bar") && (t.stopPropagation(), t.preventDefault(), 1 & t.buttons)) {
            const e = Math.max(Math.min(t.offsetX / this.shadowRoot.getElementById("nav-bar").getClientRects()[0].width, 1), 0);
            this.dispatchEvent(new CustomEvent("change", {
                detail: {
                    cmd: "goto",
                    value: e * this._viewport.length
                }
            }))
        }
    }

    set viewport(t) {
        const e = t;
        this._viewport = t;
        this.updatePreview();
        this.requestUpdate("viewport", e);
    }
}

window.customElements.define('wt-canvas-nav', WtCanvasNav);