import { Viewport } from "./Viewport.js";
import { RenderItems } from "./RenderItems.js";
import { HWSchematic } from "./HWSchematic.js";

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

class SchViewer extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `<input type="file" id="file-input" />
        <button type="button" id="fit_screen">fit screen</button>
        <button type="button" id="zoom_in">zoom in</button>
        <button type="button" id="zoom_out">zoom out</button>`;

        this.ready = false;
        this.hwSchematic = new HWSchematic;
        this.viewport = new Viewport;

        this.firstUpdated();
        this.resize(); // if not, the viewport will not have right value!

        window.addEventListener('resize', t => {
            this.resize();
        });

        this.onpointerdown = t => {
            // console.log('onpointerdown');
        }

        this.onpointermove = t => {
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
                // this.VCDData.setSignalDrawYIdx(t.deltaY);
                // console.log('t.deltaY: %d', t.deltaY);
                // console.log('getSignalDrawYIdx: %d', this.VCDData.getSignalDrawYIdx());
            }

            // this.draw();
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
            let graph = JSON.parse(contents);
            console.log(graph);
            this.hwSchematic.bindData(graph, this.app);
        }.bind(this); // important

        reader.onerror = function (e) {
            console.log(e);
            throw e;
        }

        reader.readAsText(file);
    }


    initDrawComponents() {
        this.app = new PIXI.Application({
            resizeTo: this,
            antialias: true,
            autoDensity: true,
            transparent: true,
            resolution: window.devicePixelRatio || 1,
        });

        this.append(this.app.view);

        // this.diagram = new PIXI.Container;
        // this.graph = new PIXI.Container;
        // this.graph.addChild(this.diagram);
        // this.app.stage.addChild(this.graph);

        // let tmp = new RenderItems();
        // this.diagram.addChild(tmp);
        // tmp.draw();

        // console.log('initDrawComponents');
        this.resize();
    }

    firstUpdated() {
        this.initDrawComponents();
        this.ready = true;
    }

    // draw() {
    //     if (!this.graph) return;

    //     if (this.VCDData) {
    //         this.viewport.length = this.VCDData.getEndTime();
    //         this.viewport.timescale = this.VCDData.getTimeScale();
    //     }

    //     this.graph.x = Math.ceil(-this.viewport.x * this.viewport.xscale);
    //     this.cursor.x = this.graph.x;



    //     this.VCDData.resetSignalDrawNumber();
    //     let wf_idx = 0;
    //     for (let wf of this.waveforms.children) {
    //         wf.draw(this.viewport, wf_idx, this.VCDData);
    //         wf_idx += 1;
    //     }

    //     this.grid.draw(this.viewport, this.activeSignal);
    //     this.cursor.draw(this.viewport);
    //     this.app.renderer.render(this.app.stage);


    //     const e = this.children[1];
    //     // console.log('[waveform] draw() e: %o', e);
    //     if (e) {
    //         e.viewport = this.viewport.get();
    //     }
    // }


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

        // resize the viewport model to the origin bound pos
        this.viewport.resize(e, i);
        
        this.hwSchematic.updateGlobalSize(e, i);
        // this.graph.y = .5 - t.y;


        // for (let wf of this.waveforms.children) {
        //     wf.removeLabels();
        // }

        // draw all the object: graphics, grid and cursor
        // this.draw();
    }
}

customElements.define('treecore-schviewer', SchViewer);