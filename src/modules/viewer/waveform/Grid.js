import { AxisMarker } from "./AxisMarker.js";
import { getRGBColorValue } from "./Utils";

export class Grid extends PIXI.Container {
    constructor() {
        super();

        this.style = {
            // balck? this is default settings
            // when resize(), will set the right settings
            axisBackgroundColor: 0,
            axisColor: 16777215,
            axisHeight: 38,
            gridColor: 3290429,
            gridDashLength: 2,
            gridSpaceLength: 4,
            hiddenOpacity: .45,
            highlightColor: 0,
            textColor: 16777215,
            textSize: 20,
            tickColor: 16777215,
        };

        this.bounds = new PIXI.Rectangle(0, 0, 1e3, 1e3);
        this.name = "grid";
        this.gfx = new PIXI.Graphics;
        this.gfx.name = "xaxis";
        this.drawXaxis(); // important!!!
        this.addChild(this.gfx);
    }

    // fist: 'xaxis', second==>...: AxisMarker class
    draw(viewport, activeSignal) {
        this.drawXaxis();

        if (activeSignal) {
            this.drawSignalHighlight(activeSignal);
        }

        // scale value very important
        let gridPos = Math.round(Math.log10(1 / viewport.xscale * 100) + 1e-9);
        gridPos = Math.pow(10, gridPos); // gridPos is the int of the 10xxxx!!

        const scaleValue = gridPos * viewport.xscale;
        let scaleOffsetValue = -viewport.x * viewport.xscale % scaleValue;
        let tickPos = Math.round((viewport.x * viewport.xscale + scaleOffsetValue) / viewport.xscale);

        // very important
        // first create all the tick-scale object in the resize(),
        // when drawing, put them in the right pos, 
        // so slice(1): [1:...] are AxisMarker Obj
        for (let i of this.children.slice(1)) {
            i.length = this.bounds.height;
            i.setLabel(AxisMarker.timeToString(tickPos, viewport.timescale));

            i.x = Math.floor(scaleOffsetValue) + .5;
            i.y = this.style.axisHeight;
            i.alpha = (tickPos < 0 || tickPos > viewport.length) ? this.style.hiddenOpacity : 1;
            scaleOffsetValue += scaleValue;
            tickPos += gridPos;
        }
    }

    // t: signal object
    drawSignalHighlight(t) {
        const e = t.display.y;
        this.gfx.lineStyle(0, this.style.highlightColor);
        this.gfx.beginFill(this.style.highlightColor, .2);
        this.gfx.drawRect(0, e, this.bounds.width, t.display.height);
        this.gfx.endFill()
    }

    // draw the xaxis range?
    drawXaxis() {
        this.gfx.clear();
        this.gfx.beginFill(this.style.axisBackgroundColor, 1);
        this.gfx.drawRect(0, -1.5, this.bounds.width, this.style.axisHeight + 1.5);
        this.gfx.endFill();

        this.gfx.lineStyle(1, this.style.axisColor, 1);
        this.gfx.drawPolygon([0, this.style.axisHeight + .5, this.bounds.width, this.style.axisHeight + .5]);

        // this.gfx.moveTo(100, 0);
        // this.gfx.lineTo(100, 100);
    }


    resize(renderer) {
        this.marker = this.createMaker(renderer);

        let e = Math.floor(renderer.width / 32) + 1;

        console.log('[Grid]: this.children.length: ', this.children.length);
        // remove all tick object if have
        if (this.children.length > 1) {
            this.removeChildren(1, this.children.length - 1);
        }

        // very important e: the number of the marker
        for (let i = 0; i < e; i += 1) {
            //console.log('[grid] i: %d', i);

            let axisMarker = new AxisMarker(this.marker, this.style);
            this.addChild(axisMarker);
        }

        this.bounds = new PIXI.Rectangle(0, 0, renderer.width, renderer.height);
        //console.log('render.width: %d, render.height: %d', renderer.width, renderer.height);
        this.drawXaxis();
    }

    reloadStyle(renderer) {
        function e(element) {
            let val = getComputedStyle(document.documentElement).getPropertyValue(element).trim();
            let res = getRGBColorValue(val, '#');
            if (res !== -1) {
                return res;
            } else {
                return 16777215; // white
            }
            // return gi(ht(getComputedStyle(document.documentElement).getPropertyValue(element).trim(), "float32").slice(0, 3));
        }

        function i(element) {
            // console.log('[Grid] reloadStyle i: ', getComputedStyle(document.documentElement).getPropertyValue(renderer));
            return parseInt(getComputedStyle(document.documentElement).getPropertyValue(element).trim());
        }

        this.style = {
            axisBackgroundColor: e("--axis-background"),
            axisColor: e("--axis-line"),
            axisHeight: i("--axis-height"),
            gridColor: e("--grid-line"),
            gridDashLength: i("--grid-dash"),
            gridSpaceLength: i("--grid-space"),
            highlightColor: e("--signal-highlight"),
            hiddenOpacity: .45,
            textColor: e("--axis-foreground"),
            textSize: 20,
            tickColor: e("--grid-tick")
        };

        this.resize(renderer);
    }

    // create the first grid line
    // from generateTexture, infer to the renderer: PIXI.Renderer
    createMaker(renderer) {
        let e = new PIXI.Graphics;
        e.lineStyle(1, this.style.tickColor, 1);
        e.moveTo(0, -3);
        e.lineTo(0, 3);
        e.lineStyle(1, this.style.gridColor, 1);

        for (let i = 0; i < renderer.height + this.style.gridSpaceLength + this.style.gridDashLength;
            i += this.style.gridSpaceLength + this.style.gridDashLength) {
            e.moveTo(0, i);
            e.lineTo(0, i + this.style.gridDashLength);
        }

        return renderer.generateTexture(e, PIXI.SCALE_MODES.NEAREST, renderer.resolution);
    }
}