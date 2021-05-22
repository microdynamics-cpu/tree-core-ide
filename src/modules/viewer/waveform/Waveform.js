import { DataObject } from "./DataObject.js";
import { Viewport } from "./Viewport.js";
import { Grid } from "./Grid.js";
import { Cursor } from "./Cursor.js";
import { WaveItems } from "./WaveItems.js";
import { convertRGBColorStrToArray } from "./Utils.js";

const OPERATE_CONFIG = {
    keyboard: {
        reload: "ctrl+r,f5",
        createGroup: "ctrl+g",
        addSignal: "shift+a,insert",
        deleteSignal: "delete",
        prevEdge: "left",
        nextEdge: "right",
        prevSignal: "up",
        nextSignal: "down",
        moveSignalUp: "ctrl+up",
        moveSignalDown: "ctrl+down",
        selectAll: "ctrl+a",
        zoomStart: "home",
        zoomEnd: "end",
        zoomIn: "pageUp",
        zoomOut: "pageDown",
        zoomFit: "f",
        zoomTarget: "mouse",
        zoomAmount: 1,
    },
    mouse: {
        smoothScrolling: true,
        reverseScrolling: false,
        zoomTarget: "mouse",
        zoomAmount: 1,
    },
};

class Waveform extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `<input type="file" id="file-input" />
        <button type="button" id="zoom_fit">zoom fit</button>
        <button type="button" id="zoom_in">zoom in</button>
        <button type="button" id="zoom_out">zoom out</button>
        <button type="button" id="auto">auto</button>
        <button type="button" id="pre_rising_edge">pre rising edge</button>
        <button type="button" id="pre_falling_edge">pre falling edge</button>
        <button type="button" id="aft_rising_edge">aft rising edge</button>
        <button type="button" id="aft_falling_edge">aft rising edge</button>
        `;

        this.ready = false;
        this.activeSignal = null;
        this.signalDictTable = new Map;
        this.VCDData = new DataObject;
        this.viewport = new Viewport;

        this.firstUpdated();
        this.resize(); // if not, the viewport will not have right value!

        window.addEventListener('resize', t => {
            this.resize();
        });

        this.onpointerdown = t => {
            this.setCursor(t.offsetX);
            // console.log('onpointerdown');
        }

        this.onpointermove = t => {
            if(t.buttons) {
                this.setCursor(t.offsetX);
            }
        }

        this.addEventListener("wheel", t => {
            if(t.shiftKey) {
                // console.log('shiftKey+wheel');
                if(OPERATE_CONFIG.mouse.reverseScrolling) {
                    this.viewport.pan(t.deltaY + t.deltaX);
                } else {
                    this.viewport.pan(-(t.deltaY + t.deltaX));  
                }
            }  else if(t.ctrlKey) {
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
            passive: !0
        });

        document.getElementById('file-input').addEventListener('change', this.getData.bind(this), false);
    }

    getData(e) {
        let file = e.target.files[0];

        if (!file) {
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            let contents = e.target.result;
            this.VCDData.update(contents);
            console.log(this.VCDData);
            this.setSignalDict();
        }.bind(this); // important

        reader.onerror = function (e) {
            console.log(e);
            throw e;
        }

        reader.readAsText(file);
    }

    // every signal has one PIXI.Graphics object
    setSignalDict() {
        let amount = this.VCDData.getSignalAmount();
        // let amount = 6;
        for (let i = 0; i < amount; i += 1) {
            let name = this.VCDData.getSignalName(i);
            // console.log('[setSignalDict]name: %s', name);
            if (this.signalDictTable.has(name))
                this.signalDictTable.set(name, i);
            else {
                this.signalDictTable.set(name, i);
                let item = new WaveItems(name);
                this.waveforms.addChild(item); // very important
                // item.draw(this.viewport, i, this.VCDData);
            }
        }
        this.draw();
    }

    delete(...t) {
        for (let e of t) try {
            let t = this.waveforms.getChildIndex(this.waveforms.getChildByName(e.toString()));
            this.waveforms.removeChildAt(t);
            this.signalDictTable.delete(e);
        } catch (t) { }

        this.draw();
    }

    initDrawComponents() {
        this.app = new PIXI.Application({
            resizeTo: this,
            antialias: true,
            autoDensity: true,
            transparent: true,
            resolution: window.devicePixelRatio || 1,
        });

        // this.prepend(this.app.view);
        this.append(this.app.view);
        this.grid = new Grid;
        this.cursor = new Cursor;
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

    firstUpdated() {
        this.initDrawComponents();
        this.ready = true;
    }

    draw() {
        if (!this.graph) return;

        if (this.VCDData) {
            this.viewport.length = this.VCDData.getEndTime();
            this.viewport.timescale = this.VCDData.getTimeScale();
        }

        this.graph.x = Math.ceil(-this.viewport.x * this.viewport.xscale);
        this.cursor.x = this.graph.x;

        
        
        this.VCDData.resetSignalDrawNumber();
        let wf_idx = 0;
        for (let wf of this.waveforms.children) {
            wf.draw(this.viewport, wf_idx, this.VCDData);
            wf_idx += 1;
        }

        this.grid.draw(this.viewport, this.activeSignal);
        this.cursor.draw(this.viewport);
        this.app.renderer.render(this.app.stage);


        const e = this.children[1];
        // console.log('[waveform] draw() e: %o', e);
        if (e) {
            e.viewport = this.viewport.get();
        }
    }

    updated() {
        this.draw();
    }

    updateViewport(t) {
        switch (t.detail.cmd) {
            case "zoom_in":
                this.viewport.zoom(ql.keyboard.zoomAmount, !1, this.cursor.x);
                break;
            case "zoom_out":
                this.viewport.zoom(-ql.keyboard.zoomAmount, !1, this.cursor.x);
                break;
            case "zoom_fit":
                this.viewport.fit();
                break;
            case "goto":
                this.viewport.goto(t.detail.value)
        }
        this.draw()
    }

    // for hightlight!
    setActiveSignal(t) {
        if (this.signalDictTable.has(t)) {
            this.activeSignal = this.signalDictTable.get(t);
        } else {
            this.activeSignal = null;
        }

        this.draw();
    }

    clearActive() {
        this.activeSignal = null;
        this.draw();
    }

    nextEdge() {
        if (null == this.activeSignal) return;

        let t = Ql.get_trace_index(this.activeSignal.vid, this.cursor.offsetPs)[1];

        if (t < 0) return;

        if (t += 1, t >= Ql.get_trace_length(this.activeSignal.vid)) return;

        const e = Ql.get_trace_time(this.activeSignal.vid, t);

        this.moveCursor(e);
        const i = this.viewport.screenToPs(0),
            r = this.viewport.screenToPs(this.viewport.width),
            n = (r - i) / 2;

        // if the move position is out of the right range, need to redraw!!
        // maybe only draw the signals that in the viewport!!!
        e >= r && (this.viewport.x = e - n), this.draw()
    }

    prevEdge() {
        if (null == this.activeSignal) return;
        let t = Ql.get_trace_index(this.activeSignal.vid, this.cursor.offsetPs)[1];
        if (t <= 0) return;
        t -= 1;
        let e = Ql.get_trace_time(this.activeSignal.vid, t);
        this.moveCursor(e);
        const i = this.viewport.screenToPs(0),
            r = (this.viewport.screenToPs(this.viewport.width) - i) / 2;
        e <= i && (this.viewport.x = e - r), this.draw()
    }

    moveCursor(t) {
        this.cursor.move(t);
        // let e = {};

        // for (let i of this.waveforms.children) {
        //     let r = i;
        //     const n = Ql.get_trace_index(r.config.vid, t)[0];
        //     let o = Ql.get_trace_label(r.config.vid, n);
        //     e[r.name] = o;
        // }

        // this.dispatchEvent(new CustomEvent("setCursor", {
        //     detail: e,
        //     bubbles: !0,
        //     composed: !0
        // }));

        this.draw();
    }

    setCursor(t) {
        let e = this.cursor.offsetPs;

        if(t) {
            e = this.viewport.screenToPs(t);
            this.moveCursor(e);
            // console.log('this.cursor.offset: %d', e);
        }

        // let i = 1 / 0;
        // let r = 0;
        // for (let t of this.waveforms.children) {
        //     let n = t;
        //     const o = Ql.get_trace_index(n.config.vid, e), s = o[1];
        //     if (o) {
        //         const t = Ql.get_trace_time(n.config.vid, s),
        //             o = Math.abs(e - t);
        //         o < i && (r = t, i = o)
        //     }
        // }

        // if (i < 1 / 0) {
        //     this.moveCursor(r);
        // }
    }

    updateCursor() {
        this.setCursor();
    }

    resize() {
        if (!this.ready) return;

        const t = this.getBoundingClientRect();
        const e = t.width;
        const i = t.height;
        console.log('this.getBoundingClientRect()[resize]: (%d, %d)', e, i);

        this.app.view.style.width = "100%";
        this.app.view.style.height = "100%";
        this.app.renderer.resize(e, i);
        this.app.resize();

        this.mask.clear();
        this.mask.lineStyle(10);
        this.mask.beginFill(16711935, 1);
        this.mask.drawRect(0, this.grid.style.axisHeight + .5, e, i - this.grid.style.axisHeight + .5);
        // console.log('i - this.grid.style.axisHeight + .5: %d', i - this.grid.style.axisHeight + .5);
        this.mask.endFill();

        // resize the viewport model to the origin bound pos
        this.viewport.resize(e, i);
        this.grid.reloadStyle(this.app.renderer);
        this.cursor.draw(this.viewport);
        this.cursor.height = i;
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

customElements.define('treecore-waveform', Waveform);