import { LitElement, html, css } from 'lit';
import { } from './ColorPicker'
import { DATA_FORMAT, DATA_TYPE, DATA_CMD_TYPE } from '../Enum';
import { convertRGBColorArrayStrToString } from '../Utils';

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

const ru = html`
<svg style="display: none">
    <defs/>
        <symbol id="icon_renderer_digital" viewBox="0 0 32 18"><polyline points="3 4 7 4 11 14 21 14 25 4 29 4" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/><polyline points="3 14 7 14 11 4 21 4 25 14 29 14" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="bevel" stroke-width="2.5"/></symbol>
        <symbol id="icon_renderer_linear" viewBox="0 0 32 18"><path d="M4,9c1.5-3,3-6,6-6s4.5,3,6,6,3,6,6,6,4.5-3,6-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2.5"/></symbol>
        <symbol id="icon_renderer_step" viewBox="0 0 32 18"><polyline points="2 10 5 10 5 7 8 7 8 3 13 3 13 7 16 7 16 10 19 10 19 14 24 14 24 10 27 10 27 7 30 7" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"/></symbol>
</svg>
`;

export class ItemProperty extends LitElement {
    constructor() {
        super();
        this.hasBuses = false;
        this.hasEndianSwapping = false;
        this.commonColor = "gray";
        this.commonFill = .3;
        this.commonEndian = null;
        this.commonRenderer = null;
        this.commonRadix = null;
        this.commonType = null;
    }

    static get properties() {
        return {
            signals: { type: Array }
        }
    }

    static get styles() {
        return [iu, css`
        :root {}
        .container {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            height: calc(var(--axis-height));
            width: calc(100% + 3px);
            background: var(--axis-background);
            border-bottom: 0px solid var(--axis-line);
            padding: 8px 8px;
            box-sizing: border-box;
        }

        .item {
            height: 100%;
            margin-right: 1px;
        }

        .icon {
            width: 100%;
            height: 100%;
            max-width: 26px;
        }

        select {
            font-size: .65rem;
            padding: 0;
            margin: 0;
            height: 100%;
        }

        #picker0 {
            width: 24px;
        }

        #prop-color {
            display: inline-flex;
            max-width: calc(var(--axis-height));
            width: 100%;
            height: 100%;
        }

        #prop-endian {
            /* Temporary */
            display: none;
        }

        select[disabled] {
            opacity: 0.25;
        }

        .hgroup {
            display: flex;
            height: 100%;
        }

        .hgroup div {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: .65rem;
            padding: 4px;
            box-sizing: border-box;
            height: 100%;
            border: 1px solid var(--input-border);
            background: var(--input-background);
            opacity: 0.5;
            pointer-events: all;
        }

        .vgroup div[disabled],
        .hgroup div[disabled] {
            opacity: 0.25;
            pointer-events: none;
        }

        .vgroup div:not([disabled]):hover,
        .hgroup div:not([disabled]):hover {
            background: var(--input-hover);
            cursor: pointer;
        }

        .vgroup div:not([disabled])[selected],
        .hgroup div:not([disabled])[selected] {
            opacity: 1;
            border-color: var(--input-active-border);
            color: var(--input-active-foreground);
        }

        .hgroup > :first-child {
            border-radius: 3px 0 0 3px;
        }

        .hgroup > :first-child:not([selected]) {
            border-right: 0;
        }

        .hgroup > :nth-last-child(2):not([selected]) {
            border-right: 0;
        }

        .hgroup >: last-child {
            border-radius: 0 3px 3px 0;
        }

        .vgroup {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .vgroup div {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: .65rem;
            padding: 4px;
            box-sizing: border-box;
            height: 50%;
            border: 1px solid var(--input-border);
            background: var(--input-background);
            opacity: 0.7;
            pointer-events: all;
        }

        .vgroup > :first-child {
            border-radius: 0px 3px 0 0;
            border-bottom: 0px;
        }

        .vgroup > :last-child {
            border-radius: 0 0 3px 0;
        }
    `]
    }

    render() {
        this.updateCommonAttributes();
        return html`
                ${ru} 
                <div class = "container" >
                    <div id = "prop-color" class = "item" >
                        <color-picker id = "picker0"
                            @change = "${this.setColor}"
                            .color = "${this.commonColor}"
                            .fill = "${this.commonFill}" >
                        </color-picker>
                    </div>
                </div>
    `}

    firstUpdated() { }
    handleColor(t) { }
    
    // dispatch event center
    dispatchUpdate(t = false) {
        this.dispatchEvent(new CustomEvent("redraw", {
            bubbles: true,
            composed: true,
            detail: { resize: t }
        }))

        this.updateCommonAttributes();
        this.requestUpdate();
    }

    setMode(t) {
        // find all the signals that meet the need
        this.signals.forEach(e => { e.size > 1 && (e.display.renderer = t) });
        this.dispatchUpdate();
    }

    setEndian(t) {
        this.signals.forEach(e => { e.size > 1 && (e.display.littleEndian = t) });
        this.dispatchUpdate()
    }

    incSize() {
        this.signals.forEach(t => { t.display.height += 10 });
        this.dispatchUpdate(true);
    }

    decSize() {
        this.signals.forEach(t => { 
            t.display.height = Math.max(t.display.height - 10, 14) 
        });
        this.dispatchUpdate(true);
    }

    setColor() {
        const t = this.shadowRoot.getElementById("picker0");
        this.signals.forEach(e => { 
            e.display.color = convertRGBColorArrayStrToString(t.color); // important, because different format
            e.display.fill = t.fill 
        });

        this.dispatchUpdate();
    }

    setRadix() {
        const t = this.shadowRoot.getElementById("radix-select");
        const e = t.value;
        this.signals.forEach(i => { 
            i.display.radix = e;
            // change the all data format
            // Ql.set_radix(i.vid, t.selectedIndex) 
        });
        this.dispatchUpdate()
    }

    updateCommonAttributes() {
        this.hasBuses = false;
        this.commonColor = "gray";
        this.commonFill = .3;
        this.commonEndian = null;
        this.commonRenderer = null;
        this.hasEndianSwapping = false;
        this.commonRadix = null;
        this.commonType = null;

        if (this.signals && this.signals.length > 0) {
            this.commonFill = this.signals[0].display.fill;
            this.commonEndian = this.signals[0].display.littleEndian;
            this.commonRadix = this.signals[0].display.radix;

            if (this.signals[0].size > 8 && this.signals[0].size % 8 == 0) {
                this.hasEndianSwapping = true;
            }

            this.commonRenderer = this.signals[0].display.renderer;
            this.commonType = this.signals[0].type;
            this.signals.forEach(t => { t.size > 1 && (this.hasBuses = !0) });
        }
    }
}

window.customElements.define('item-property', ItemProperty);