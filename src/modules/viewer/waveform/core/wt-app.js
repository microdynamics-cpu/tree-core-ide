import { LitElement, html, css } from 'lit';
import { } from './wt-sidebar';
import { } from "./wt-canvas-nav";
import { } from "./wt-canvas";
import { } from "./wt-search";
import { OPERATE_CONFIG } from "../Config";
import { DataObject } from "../DataObject";
import { DATA_CMD_TYPE, DATA_FORMAT } from "../Enum";

export class Waveform extends LitElement {
    constructor() {
        super();
        this._signalLookup = new Map;
        this.auto_renew = 0;
        this.defined = false;
        this.error = false;
        this.throttle = false;
        this.sidebarWidth = 0;
        this._signals = [];

        this.addEventListener('evt-add-signals', () => {
            console.log('wt-app trigger evt-add-signals!!!');
            this.addSignalClicked();
        }, false);

        this.addEventListener('evt-upload-file', () => {
            console.log('wt-canvas trigger evt-load!!!');
            this.renderRoot.querySelector('#upload-file').click();
        }, false);
    }

    static get properties() {
        return {
            defined: {
                type: Boolean
            },
            error: {
                type: Boolean
            },
            sidebarWidth: {
                type: Number
            }
        }
    }

    static get styles() {
        return css`
            :host {
                height: 100%;
                overflow: hidden;
                --sidebar-width: 150px;
                display: flex;
            }
            :host > aside {
                position: relative;
                left:0;
                /*width: var(--sidebar-width);*/
            }
            :host > main {
                position: relative;
                top: 0px;
                left: 0px;
                /*width: calc(100% - var(--sidebar-width));*/
            }
            :host > aside,
            :host > main {
                overflow: none;
            }
            .resize-handle--x {
                -webkit-flex: 0 0 auto;
                -ms-flex: 0 0 auto;
                flex: 0 0 auto;
                position: relative;
                box-sizing: border-box;
                width: 3px;
                height: 100%;
                background: var(--sidebar-border);
                cursor: ew-resize;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            aside {    
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                /*min-width: 100px; /*var(--sidebar-min-width);
                max-width: 700px;*/
                
                height: 100%;
                background: var(--sidebar);
                border-right: 0px solid var(--sidebar-border);
                box-shadow: var(--shadow) 0 10px 10px;
                margin: 0;
                padding: 0;
            }

            wt-canvas {
                display: flex;
                flex-flow: column nowrap;
                width: 100%; 
                height: 100%;
            }

            wt-canvas-nav {
                display: flex;
                width: 100%;
                justify-content: center;
                background: var(--navBar-background);
            }
        `
    }

    render() {
        return html`
            <input type="file" id="upload-file" hidden="hidden">
            <aside id="aside-0">
                <wt-sidebar id="wt-sidebar-0" 
                    .signals="${this._signals}"
                    .defined="${this.defined}"
                    .error="${this.error}"
                    @delete="${this.deleteSelectedSignals}"
                    @redraw="${t => this.handleSidebarRedraw(t.detail)}"
                    @setActiveSignal="${t => this.canvas().setActiveSignal(t.detail)}"
                    @waveformChanged=${this.waveformChanged}>
                </wt-sidebar>
            </aside>
            <div id="resize-handle" class="resize-handle--x"></div>
            <main id="main-0">
                <wt-canvas-nav @extra-cursor=${t=>{this.canvas().drawExtraCursor(t.detail)}}></wt-canvas-nav>
                <wt-canvas id="wt-canvas-0"
                .signalDict=${this._signalLookup}
                @setCursor=${t=>{this.sidebar().updateCursor(t.detail)}}
                ></wt-canvas>
            </main>
            <wt-search id="wt-search-0" @add=${t => this.addSignals(t.detail)}>
            </wt-search>
        `
    }

    getData(e) {
        console.log('wt-app getData!!!');
        let file = e.target.files[0];

        if (!file) {
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            let contents = e.target.result;
            DataObject.getInst().update(contents);
            this.handleData();
        }.bind(this); // important

        reader.onerror = function (e) {
            console.log(e);
            throw e;
        }

        reader.readAsText(file);
    }

    handleData() {
        this.defined = true;
        this.search().load();
    }

    clearData() {
        this.defined = false;
        this.deleteAll();
        console.log('clear data');
    }

    // for the search module
    addSignalClicked() {
        console.log('add signal clicked');
        if ('1' == this.search().style.opacity) {
            this.search().add();
        } else {
            this.search().show();
        }
    }

    // very important!!!
    // should prepare data here
    firstUpdated() {
        console.log('wt-app: firstUpdated');

        this.sidebarWidth = OPERATE_CONFIG.sidebar.width;
        this.resize();
        this.throttle = true;
        window.addEventListener("resize", () => {
            this.resize();
        }, false);

        this.shadowRoot.getElementById("resize-handle").addEventListener("mousedown", t => this.sidebarResizeStart(t, this), false);
        this.renderRoot.querySelector('#upload-file').addEventListener('change', this.getData.bind(this), false);
    }

    resize(t = false) {
        const e = this.shadowRoot.getElementById("aside-0");
        const i = this.shadowRoot.getElementById("main-0");
        e.style.width = this.sidebarWidth + "px";
        i.style.width = window.innerWidth - this.sidebarWidth + "px";

        console.log('[wt-app] resize: ', t);

        if (t) {
            console.log('wt-app: resize, this.throttle: ', this.throttle);
            if (!this.throttle) return;
            this.throttle = false;
            this.canvas().resize();
            setTimeout(() => this.throttle = true, 150);
        } else {
            // this.canvas().resize(); // some bug?
        }
    }

    sidebarResize(t) {
        this.sidebarWidth = Math.max(t.offsetX, 180);
        this.resize(true);
    }

    sidebarResizeStart(t, e) {
        e.addEventListener("mousemove", this.sidebarResize, false);
        e.addEventListener("mouseup", this.sidebarResizeEnd, false);
    }

    sidebarResizeEnd(t) {
        this.canvas().resize();
        this.removeEventListener("mousemove", this.sidebarResize, false);
        this.removeEventListener("mouseup", this.sidebarResizeEnd, false);
    }

    showSettings() {
        this.settings().show();
    }

    fileChanged() {
        this.canvas().fileChanged = true;
        this.canvas().requestUpdate();
    }

    deleteSelectedSignals() {
        const t = this.sidebar().getSelected();
        this.deleteById(t);
    }

    redraw() {
        this.canvas().resize();
    }

    // important to trigger the redraw event
    handleSidebarRedraw(t) {
        if (this.canvas()) {
            this.canvas().draw();
            this.sidebar().requestUpdate();

            if (t && t.resize) {
                this.sidebar().updateComplete.then(() => {
                    this.sidebar().resize();
                });
            }
        }
    }


    deleteAll() {
        console.log('deleteAll');
        let t = [];
        for (let [e, i] of this._signalLookup) {
            t.push(e);
        }

        this.deleteById(t);
        this.sidebar().requestUpdate().then(() => {
            this.sidebar().resize();
        });
        this.search().updateSignalCount();
    }

    deleteById(t) {
        console.log('deleteById');

        function e(t, i) {
            for (var r = 0; r < t.length; ++r) {
                let n = t[r];
                if (n.id === i) {
                    t.splice(r, 1);
                    return true;
                }
                if (n.children.length > 0 && e(n.children, i)) {
                    if(0 === n.children.length){
                        delete n.children;
                        t.splice(r, 1);
                    }
                    return true;
                }
            }
        }

        this.search().restore(t);

        for (let i of t) {
            e(this._signals, i);
            let t = this._signalLookup.get(i);
            if(t.type != wl.group){
                this._signalLookup.delete(i);
                // Ql.unwatch(t.id, t.vid);
            }
        }

        this.canvas().delete(...t);
        this.canvas().clearActive();
        this.sidebar().requestUpdate().then(() => {
            this.sidebar().resize();
        });
        
        this.search().updateSignalCount();
    }

    addSignals(t) {
        console.log('[wt-app]addSignals: ', t);

        // push all the signal obj id
        let e = [];

        // find the data in children node[group]?
        function i(t, r) {
            if (r.type !== DATA_CMD_TYPE.group) {
                t.set(r.id, r);
                Ql.watch(r.id, r.vid);
                e.push(r.id);
                if ("radix" in r.display) {
                    const t = r.display.radix;
                    const e = Object.values(DATA_FORMAT).indexOf(t);
                    if (-1 != e) {
                        Ql.set_radix(r.vid, e);
                    }
                }
            } else {
                r.children.forEach(e => i(t, e));
            }
        }

        for (let r of t) {
            this._signals.push(r);
            
            // _signalLoopup<id, signal obj>
            if (r.type !== DATA_CMD_TYPE.group) {
                this._signalLookup.set(r.id, this._signals[this._signals.length - 1]);
                // Ql.watch(r.id, r.vid);
                e.push(r.id);

                // set default radix
                if ("radix" in r.display) {
                    const t = r.display.radix;
                    const e = Object.values(DATA_FORMAT).indexOf(t);
                    
                    // set the data radix
                    if(-1 != e){
                        // Ql.set_radix(r.vid, e);
                    }
                }
            } else {
                i(this._signalLookup, this._signals[this._signals.length - 1]);
            }
        }

        this.search().updateSignalCount();
        this.requestUpdate();
        return e;
    }

    addDivider() {
        console.log('addDivider');
    }

    // when wt-sidebar-item resize
    // when move, update selected signals
    waveformChanged(t) {
        console.log('waveformchanged');
        let e = parseInt(t.composedPath()[1].id.replace("wi-", ""));
        if (this._signalLookup.has(e)) {
            let i = this._signalLookup.get(e);
            let r = t.detail;

            if(i.display.radix != t.detail.radix) {
                // this.canvas().updateCursor();
            }

            i.display = r;
        }

        this.requestUpdate("_signals")
    }


    // get the DOM instance
    sidebar() {
        return this.shadowRoot.getElementById("wt-sidebar-0");
    }

    search() {
        console.log('search[wt-app]');
        return this.shadowRoot.getElementById("wt-search-0");
    }

    canvas() {
        return this.shadowRoot.getElementById("wt-canvas-0");
    }
}

window.customElements.define('wt-app', Waveform);