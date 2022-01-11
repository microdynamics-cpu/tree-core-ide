import { LitElement, html, css } from 'lit';
import { } from "./CanvasNav";
import { DataObject } from "../DataObject";
import { Viewport } from "../Viewport";
import { Grid } from "../Grid";
import { Cursor } from "../Cursor";
import { WaveItems } from "../WaveItems";
import { OPERATE_CONFIG } from "../Config"

export class CanvasMain extends LitElement {
    constructor() {
        super();
        this.ready = false;
        this.fileChanged = false;
        this.activeSignal = null;
        this._signalDict = new Map;
        this.viewport = new Viewport;
        this.extraCursor = [];
        this.cursorIdx = -1;

        window.addEventListener("resize", t => {
            this.resize();
        });

        window.matchMedia("(prefers-color-scheme: dark)").addListener(t => t.matches && this.resize());
        window.matchMedia("(prefers-color-scheme: light)").addListener(t => t.matches && this.resize());

        this.onpointerdown = t => {
            console.log('press down t: ', t);
            if(t.button == 0){
                this.setCursor(t.offsetX);
            } else if(t.button == 2) {
                if(this.cursorIdx == this.extraCursor.length - 1) {
                    this.cursorIdx = -1;
                } else {
                    ++this.cursorIdx;
                }
            }
        }

        this.onpointermove = t => {
            if (t.buttons) {
                this.setCursor(t.offsetX);
            }
        }

        this.addEventListener("wheel", t => {
            if (t.shiftKey) {
                // console.log('shiftKey+wheel');
                if (OPERATE_CONFIG.mouse.reverseScrolling) {
                    this.viewport.pan(t.deltaY + t.deltaX);
                } else {
                    this.viewport.pan(-(t.deltaY + t.deltaX));
                }
            } else if (t.ctrlKey) {
                // console.log('ctrlKey+wheel');
                this.viewport.zoom(t.deltaY * OPERATE_CONFIG.keyboard.zoomAmount,
                    OPERATE_CONFIG.mouse.zoomTarget === 'mouse', t.offsetX);
            }
            else {
                this.VCDData.setSignalDrawYIdx(t.deltaY);
                // console.log('t.deltaY: %d', t.deltaY);
                // console.log('getSignalDrawYIdx: %d', this.VCDData.getSignalDrawYIdx());
            }

            this.draw();
        }, {
            passive: true
        });
    }

    static get properties() {
        return {
            config: {
                type: Object
            },
            fileChanged: {
                type: Boolean
            },
            signals: {
                type: Object
            },
            signalDict: {
                type: Object
            }
        }
    }

    // render() {
    //     return html`
    //     <canvas-nav></canvas-nav>
    //     `;
    // }

    // t: map<id, signal obj>
    set signalDict(t) {
        console.log('[canvas-main] set signalDict: t', t);
        for (let [e, i] of t.entries()) {
            if (this._signalDict.has(e)) {
                this._signalDict.set(e, i);
            } else {
                this._signalDict.set(e, i);
                let item = new WaveItems(this._signalDict.get(e));
                this.waveforms.addChild(item);
                console.log('[canvas-main] set signalDict: ', item);
                item.draw(this.viewport);
            }
        }

        this.draw();
    }

    delete(...t) {
        for (let e of t) try {
            let t = this.waveforms.getChildIndex(this.waveforms.getChildByName(e.toString()));
            this.waveforms.removeChildAt(t);
            this._signalDict.delete(e);
        } catch (t) { }

        this.draw();
    }

    drawExtraCursor(t) {
        console.log('!!!! draw: ', t);
        const colorList = [0xFF00FF, 0x00FFFF, 0xFFFF00]
        let cursor = new Cursor(2, colorList[(this.cursorIdx+1)%3]);
        this.extraCursor.push(cursor);
        this.app.stage.addChild(cursor);
        cursor.y = this.grid.style.axisHeight;
        cursor.height = this.app.screen.height;
    }

    initDrawComponents() {
        this.app = new PIXI.Application({
            resizeTo: this,
            antialias: true,
            autoDensity: true,
            transparent: true,
            autoStart: false,
            resolution: window.devicePixelRatio || 1,
        });

        //very important!!! for improving cpu performance
        this.app.ticker.stop();
        PIXI.Ticker.shared.stop();
        PIXI.Ticker.system.stop();

        // add the canvas to the DOM
        this.prepend(this.app.view);
        this.grid = new Grid;
        this.cursor = new Cursor(1, 0xFFFFFF);
        this.waveforms = new PIXI.Container;
        this.graph = new PIXI.Container;
        this.graph.addChild(this.waveforms);
        this.mask = new PIXI.Graphics;
        this.app.stage.addChild(this.mask);
        this.app.stage.addChild(this.grid);
        this.app.stage.addChild(this.graph);
        this.app.stage.addChild(this.cursor);
        this.graph.mask = this.mask;
        this.cursor.y = this.grid.style.axisHeight;
        this.cursor.height = this.app.screen.height;
        console.log('initDrawComponents');
        this.resize();
    }

    // some: if false will draw the signal on the panel
    draw(some = false) {
        if (!this.graph) return;

        if (DataObject.getInst()) {
            this.viewport.length = DataObject.getInst().getEndTime();
            this.viewport.timescale = DataObject.getInst().getTimeScale();
        }

        this.graph.x = Math.ceil(-this.viewport.x * this.viewport.xscale);
        

        // DataObject.getInst().resetSignalDrawNumber();

        for (let wf of this.waveforms.children) {
            wf.draw(this.viewport, !some);
        }

        this.grid.draw(this.viewport, this.activeSignal);

        if(this.cursorIdx == -1) {
            this.cursor.draw(this.viewport);
            this.cursor.x = this.graph.x;
        } else {
            this.extraCursor[this.cursorIdx].draw(this.viewport);
            this.extraCursor[this.cursorIdx].x = this.graph.x;
        }
        
        this.app.renderer.render(this.app.stage);


        const e = this.children[1];
        if (e) {
            e.viewport = this.viewport.get();
        }
    }

    updateViewport(t) {
        switch (t.detail.cmd) {
            case "zoom_in":
                this.viewport.zoom(OPERATE_CONFIG.keyboard.zoomAmount, false, this.cursor.x);
                break;
            case "zoom_out":
                this.viewport.zoom(-OPERATE_CONFIG.keyboard.zoomAmount, false, this.cursor.x);
                break;
            case "zoom_fit":
                this.viewport.fit();
                break;
            case "goto":
                this.viewport.goto(t.detail.value);
        }

        this.draw();
    }

    setActiveSignal(t) {
        if (this._signalDict.has(t)) {
            this.activeSignal = this._signalDict.get(t);
        } else {
            this.activeSignal = null;
        }

        this.draw();
    }

    clearActive() {
        this.activeSignal = null;
        this.draw();
    }

    moveCursor(t) {
        if(this.cursorIdx == -1) {
            this.cursor.move(t);
        } else {
            this.extraCursor[this.cursorIdx].move(t);
        }
        

        let e = {};

        for (let i of this.waveforms.children) {
            let r = i;
            const o = DataObject.getInst().searchWaveValue(r.config.id, t);
            e[r.name] = o;
        }

        this.dispatchEvent(new CustomEvent("setCursor", {
            detail: e,
            bubbles: true,
            composed: true
        }));

        this.draw();
    }

    setCursor(t) {
        let e;
        if(this.cursorIdx == -1) {
            e = this.cursor.offsetPs;
        } else {
            e = this.extraCursor[this.cursorIdx].offsetPs;
        }

        if (t) {
            e = this.viewport.screenToPs(t);
            this.moveCursor(e);
            // console.log('this.cursor.offset: %d', e);
        }
    }

    updateCursor() {
        this.setCursor();
    }

    firstUpdated() {
        console.log('canvas-main: firstUpdated');
        this.initDrawComponents();
        this.ready = true;
        this.resize();
    }

    updated() {
        this.draw();
    }

    resize() {
        if (!this.ready) {
            return;
        }

        const t = this.getBoundingClientRect();
        const e = t.width;
        const i = t.height;
        console.log('this.getBoundingClientRect()[resize]: (%d, %d)', e, i);

        this.app.view.style.width = "100%";
        this.app.view.style.height = "100%";
        this.app.renderer.resize(e, i);
        this.app.resize();

        this.mask.clear();
        this.mask.lineStyle(0);
        this.mask.beginFill(16711935, 1);
        this.mask.drawRect(0, this.grid.style.axisHeight + .5, e, i - this.grid.style.axisHeight + .5);
        this.mask.endFill();

        // resize the viewport model to the origin bound pos
        this.viewport.resize(e, i);
        this.grid.reloadStyle(this.app.renderer);

        if(this.cursorIdx == -1) {
            this.cursor.draw(this.viewport);
            this.cursor.height = i;
        } else {
            this.extraCursor[this.cursorIdx].draw(this.viewport);
            this.extraCursor[this.cursorIdx].height = i;
        }

        this.graph.y = .5 - t.y;

        for (let wf of this.waveforms.children) {
            wf.removeLabels();
        }

        // draw all the object: graphics, grid and cursor
        this.draw();
    }

    createRenderRoot() {
        return this;
    }
}

window.customElements.define('canvas-main', CanvasMain);