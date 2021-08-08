import { getRGBColorValue, convertRGBColorStrToArray } from "./Utils.js";
import { DATA_TYPE, DATA_STATE, DATA_FORMAT } from "./Enum.js";


export class WaveItems extends PIXI.Container {
    // index: [0, data.length - 1]
    // data: DataObject(contain all the data)
    constructor(name) {
        super();
        this.name = name;
        this.gfx = new PIXI.Graphics;
        this.addChild(this.gfx);
    }


    static getLabelString(t, e, i) {
        let r = "",
            n = !1;
        const o = Array(e).fill(0).concat(t).slice(t.length);

        for (let t = 0; t < e; t++) {
            switch (o[t]) {
                case Sl.RisingEdge:
                case Sl.One:
                    r += "1";
                    break;
                case Sl.FallingEdge:
                case Sl.Zero:
                    r += "0";
                    break;
                case Sl.Invalid:
                    r += "x";
                    break;
                case Sl.HighZ:
                    r += "z"
            }
            0 == t && (n = "1" == r)
        }

        switch (i) {
            case El.Hex: {
                let t = "";
                const e = r.length % 4;
                e > 0 && (r = r.padStart(r.length + (4 - e), "0"));
                const i = Math.ceil(r.length / 4);
                for (let e = 0; e < i; e += 1) {
                    const i = parseInt(r.slice(4 * e, Math.min(4 * (e + 1), r.length)), 2);
                    t += isNaN(i) ? "X" : i.toString(16).toUpperCase()
                }
                return t;
            }
            case El.Oct: {
                let t = "";
                const e = r.length % 3;
                e > 0 && (r = r.padStart(r.length + (3 - e), "0"));
                const i = Math.ceil(r.length / 3);
                for (let e = 0; e < i; e += 1) {
                    const i = parseInt(r.slice(3 * e, Math.min(3 * (e + 1), r.length)), 2);
                    t += isNaN(i) ? "X" : i.toString(8).toUpperCase()
                }
                return t
            }
            case El.SignedDec: {
                let t = parseInt(r, 2);
                return n && (t -= 1 << o.length), t.toString(10)
            }
            case El.UnsignedDec:
                return parseInt(r, 2).toString(10);
            case El.ASCII:
                return r.match(/[10]{8}/g) ? r.match(/([10]{8}|\s+)/g).map((function (t) {
                    let e = parseInt(t, 2);
                    return e > 31 && e < 127 ? String.fromCharCode(e) : ""
                })).join("") : "";
            case El.UTF8:
                return r.match(/[10]{8}/g) ? r.match(/([10]{8}|\s+)/g).map((function (t) {
                    return String.fromCharCode(parseInt(t, 2))
                })).join("") : "";
            case El.Bin:
            default:
                return r
        }
    }

    static getValueFromArray(t, e, i = El.Bin) {
        switch (console.log("getValueFromArray", i), i) {
            case El.Bin:
                return parseInt(Al.getLabelString(t, e, i), 2);
            case El.Oct:
                return parseInt(Al.getLabelString(t, e, i), 8);
            case El.Hex:
                return parseInt(Al.getLabelString(t, e, i), 16);
            case El.ASCII:
            case El.UTF8:
                return parseInt(Al.getLabelString(t, e, El.Bin), 2);
            case El.Float:
                return parseFloat(Al.getLabelString(t, e, El.Float));
            default:
                return parseInt(Al.getLabelString(t, e, i))
        }
    }


    removeLabels() { }

    updateLabels(viewport, waveAmount, displayConfig) {
        const lastTextObjPos = this.children.length - 1;
        const textObjDeltaAmount = Math.min(waveAmount, Math.ceil(viewport.width / 8)) - lastTextObjPos;

        if (0 != textObjDeltaAmount) {
            if (textObjDeltaAmount < 0) {
                this.removeChildren(this.children.length + textObjDeltaAmount);
            }
            else {
                for (let i = 0; i < textObjDeltaAmount; i++) {
                    let textObj = new PIXI.Text("", {
                        fontFamily: "monospace",
                        fontSize: 26,
                        fontWeight: "bold",
                        fill: 0xFFFFFF
                    });

                    textObj.scale.set(.45, .45);
                    textObj.anchor.x = .5;
                    textObj.anchor.y = .5;
                    textObj.x = 0;
                    textObj.y = displayConfig.height / 2;
                    this.addChild(textObj);
                }
            }
        }
    }

    draw(viewport, index, data) {
        // y is the pos of the every wave item
        this.y = data.getSignalDrawYAxis();
        if(index < data.getSignalDrawYIdx() || this.y > viewport.height) {
            return;
        }

        data.addSignalDrawNumber();
        // console.log('this.y: %d', this.y);
        // console.log('viewport.y: ', viewport.height);

        //console.log('[WI]this.y: %d', this.y);
        switch (data.getSignalDisplayConfig(index).renderer) {
            case DATA_TYPE.Wire: {
                this.drawWire(viewport, index, data);
                break;
            }
            case DATA_TYPE.Bus: {
                this.drawBus(viewport, index, data);
                break;
            }
        }
    }

    getLabel(t) {
        let e = this.getValue(t);
        switch (this.config.display.radix) {
            case El.Bin:
                return e.toString(2);
            case El.Oct:
                return e.toString(8);
            case El.Hex:
                return e.toString(16)
        }
    }

    getValue(t) {
        let e = Ql.get_trace_data(this.config.vid, t),
            i = new DataView(e.buffer);
        const r = this.config.display.radix == El.SignedDec,
            n = this.config.display.littleEndian;
        if (this.config.display.radix == El.Float) {
            if (8 == i.byteLength) return i.getFloat32(4, n);
            if (16 == i.byteLength) return i.getFloat64(8, n)
        }
        switch (i.byteLength / 2) {
            case 1:
                return r ? i.getInt8(0) : i.getUint8(0);
            case 2:
                return r ? i.getInt16(0, n) : i.getUint16(0, n);
            case 3:
                return i = new DataView(new Uint8Array([0, e[0], e[1], e[2]])), r ? i.getInt32(0, n) : i.getUint32(0, n);
            default:
                return r ? i.getInt32(0, n) : i.getUint32(0, n)
        }
    }

    drawBus(viewport, index, data) {
        this.gfx.clear();

        const displayConfig = data.getSignalDisplayConfig(index);
        //console.log('displayConfig: %o', displayConfig);

        this.gfx.height = displayConfig.height - 4;
        this.gfx.y = 0;

        const busValuePos = displayConfig.height - 2;
        const busCenterValuePos = (busValuePos - 2) / 2 + 2;

        const fillAlpha = displayConfig.fill;;
        const isFillAlphaZero = (0 == displayConfig.fill);
        const busColor = getRGBColorValue(displayConfig.color);
        const fillColor = getRGBColorValue(displayConfig.fillColor);

        this.gfx.moveTo(0, busValuePos);
        this.gfx.lineStyle(displayConfig.strokeWidth, busColor, 1);

        let d = [];
        let curWaveTime;
        let nxtWaveTime;
        let drawState = DATA_STATE.HIGH;

        if (!isFillAlphaZero) {
            this.gfx.beginFill(fillColor, fillAlpha);
        }

        let waveAmount = data.getWaveAmount(index);

        this.updateLabels(viewport, waveAmount, displayConfig);

        let g = 1;
        for (let i = 0; i < waveAmount; i += 1) {
            let isLastWave = (i == waveAmount - 1);

            curWaveTime = data.getWaveTime(index, i);
            if (isLastWave) {
                nxtWaveTime = viewport.length
            } else {
                nxtWaveTime = data.getWaveTime(index, i + 1);
            }

            const viewportLeftPos = viewport.x;
            const viewportRightPos = viewport.x + viewport.width * (1 / viewport.xscale);

            // limit the range maybe break not continue?
            if (curWaveTime < viewportLeftPos && nxtWaveTime < viewportLeftPos || curWaveTime > viewportRightPos) {
                continue;
            }
            if (curWaveTime < viewportLeftPos) {
                curWaveTime = viewport.x;
            }
            if (nxtWaveTime > viewportRightPos) {
                nxtWaveTime = viewportRightPos;
            }

            let v = null;
            // v is the text value object
            if (g < this.children.length) {
                v = this.children[g];
                g++;
            }

            curWaveTime *= viewport.xscale;
            nxtWaveTime *= viewport.xscale;

            // limit the number of the wave
            // if signal gap is too narrrow, then isSignalGapTooNarrow = 1
            const isSignalGapTooNarrow = (nxtWaveTime - curWaveTime <= 1);
            switch (drawState) {
                case DATA_STATE.HIGH: {
                    if (isSignalGapTooNarrow) {
                        d.push(curWaveTime);
                        drawState = DATA_STATE.LOW;
                    }
                    break;
                }
                case DATA_STATE.LOW: {
                    if (!isSignalGapTooNarrow) {
                        d.push(curWaveTime);
                        drawState = DATA_STATE.HIGH;
                    }
                    break;
                }
            }

            if (drawState == DATA_STATE.LOW) {
                if (v) {
                    v.visible = false;
                }
                continue;
            }

            let isDataValid = data.getWaveValue(index, i);
            if (!isFillAlphaZero) {
                //console.log('isDataValid: %s', isDataValid);
                if (isDataValid === 'x' || isDataValid === 'z') {
                    this.gfx.endFill();
                    this.gfx.beginFill(7798818, fillAlpha);
                    this.gfx.lineStyle(displayConfig.strokeWidth, 16711782, 1);
                }

                this.gfx.moveTo(curWaveTime, busCenterValuePos);
                this.gfx.lineTo(curWaveTime, busCenterValuePos);
                this.gfx.lineTo(curWaveTime + 2, 2);
                this.gfx.lineTo(nxtWaveTime - 2, 2);
                this.gfx.lineTo(nxtWaveTime, busCenterValuePos);
                this.gfx.lineTo(nxtWaveTime - 2, busValuePos);
                this.gfx.lineTo(curWaveTime + 2, busValuePos);
                this.gfx.lineTo(curWaveTime, busCenterValuePos);

                if (isDataValid === 'x' || isDataValid === 'z') {
                    this.gfx.endFill();
                    this.gfx.beginFill(fillColor, fillAlpha);
                    this.gfx.lineStyle(displayConfig.strokeWidth, busColor, 1);
                }
            }

            // busCenterValuePos: the center pos of y
            if (!isFillAlphaZero && v) {
                const timeGap = nxtWaveTime - curWaveTime;

                // (v.x, v.y): position of the text
                v.x = curWaveTime + timeGap / 2;
                v.y = Math.floor(displayConfig.height / 2);

                // if the text'd width is larger than signal width, the signal will be invisible
                // console.log('v.width: %d', v.width);
                // console.log('timeGap: %d', timeGap);

                // 8 is the scale value setted
                v.visible = !(v.width + 8 > timeGap);
                if (v.visible) {
                    v.text = data.getWaveValue(index, i);
                }
            }
        }

        if (!isFillAlphaZero) {
            this.gfx.endFill();
        }

        for (let i = g; i < this.children.length; i++) try {
            this.children[i].visible = false;
        } catch (i) { }


        if (d.length % 2 == 1) {
            d.push(viewport.length * viewport.xscale);
            this.gfx.lineStyle(0, 0, 0);
        }

        // draw the multiply signal in one rectangle when in small scale mode
        for (let t = 0; t < d.length; t += 2) {
            this.gfx.moveTo(d[t], busValuePos);
            this.gfx.beginFill(busColor, 1);
            this.gfx.lineTo(d[t], busValuePos);
            this.gfx.lineTo(d[t], 1);
            this.gfx.lineTo(d[t + 1], 1);
            this.gfx.lineTo(d[t + 1], busValuePos);
            this.gfx.endFill()
        }
    }


    drawWire(viewport, index, data) {
        this.gfx.clear();

        const displayConfig = data.getSignalDisplayConfig(index);
        // zValuePos: the 'z''s y value
        const wireValuePos = Math.floor(displayConfig.height) - 3;
        const zValuePos = Math.floor((wireValuePos - 3) / 2) + 4;

        const wireColor = getRGBColorValue(displayConfig.color);
        const fillColor = getRGBColorValue(displayConfig.fillColor);
        const fillAlpha = displayConfig.fill;
        const isFillAlphaZero = (0 == displayConfig.fill);

        this.gfx.lineStyle(displayConfig.strokeWidth, wireColor, 1);
        this.gfx.moveTo(0, wireValuePos);

        let curWaveTime;
        let nxtWaveTIme;
        let d = [];
        let drawState = DATA_STATE.HIGH;
        // waveAmount: the number of  object of the wave array
        const waveAmount = data.getWaveAmount(index);

        for (let i = 0; i < waveAmount; i += 1) {
            let isLastWave = (i == waveAmount - 1);

            // curWaveTime: the time of the wave array in i index
            curWaveTime = data.getWaveTime(index, i);
            if (isLastWave) {
                nxtWaveTIme = viewport.length;
            } else {
                nxtWaveTIme = data.getWaveTime(index, i + 1);
            }

            // signal: viewport.x and viewport.width
            const viewportLeftPos = viewport.x;
            const viewportRightPos = viewport.x + viewport.width * (1 / viewport.xscale);

            // judge if the signal out of the range(left and right), these signal will not be drawed.
            if (curWaveTime < viewportLeftPos && nxtWaveTIme < viewportLeftPos) {
                continue;
            }
            if (curWaveTime > viewportRightPos) {
                break;
            }

            curWaveTime *= viewport.xscale;
            nxtWaveTIme *= viewport.xscale;
            curWaveTime = Math.floor(curWaveTime) + .5;
            nxtWaveTIme = Math.floor(nxtWaveTIme) + .5;

            // if signal gap is too narrow, isSignalGapNotTooNarrow = 0, isSignalGapTooNarrow = 1, otherwise isSignalGapNotTooNarrow = 1, isSignalGapTooNarrow = 0
            // use this method to the simplify the signal to draw
            const isSignalGapNotTooNarrow = !(nxtWaveTIme - curWaveTime < 3 || isFillAlphaZero);
            const isSignalGapTooNarrow = (nxtWaveTIme - curWaveTime < 2);

            switch (drawState) {
                case DATA_STATE.HIGH: {
                    if (isSignalGapTooNarrow) {
                        d.push(curWaveTime);
                        drawState = DATA_STATE.LOW;
                    }
                    break;
                }
                case DATA_STATE.LOW: {
                    if (!isSignalGapTooNarrow) {
                        d.push(curWaveTime);
                        drawState = DATA_STATE.HIGH;
                    }
                    break;
                }
            }

            // 1: '1'
            // 0: '0'
            // 3: 'z'
            // 2: 'x'
            if (drawState !== DATA_STATE.LOW) {
                switch (data.getWaveValue(index, i)) {
                    case '1': {
                        this.gfx.moveTo(curWaveTime, wireValuePos);
                        if (isSignalGapNotTooNarrow) {
                            this.gfx.beginFill(fillColor, fillAlpha);
                            this.gfx.lineTo(curWaveTime, wireValuePos);
                            this.gfx.lineTo(curWaveTime, 3);
                            this.gfx.lineTo(nxtWaveTIme, 3);
                            this.gfx.lineTo(nxtWaveTIme, wireValuePos);
                            this.gfx.endFill();
                        }
                        break;
                    }
                    case '0': {
                        this.gfx.moveTo(curWaveTime, wireValuePos);
                        this.gfx.lineTo(curWaveTime, wireValuePos);
                        this.gfx.lineTo(nxtWaveTIme, wireValuePos);
                        if (isLastWave) {
                            this.gfx.lineTo(nxtWaveTIme, wireValuePos);
                        }
                        break;
                    }
                    case 'z': {
                        if (isSignalGapNotTooNarrow) {
                            this.gfx.endFill();
                            this.gfx.lineStyle(displayConfig.strokeWidth, 16776960, 1);
                            this.gfx.moveTo(curWaveTime, zValuePos);
                            this.gfx.lineTo(curWaveTime, zValuePos);
                            this.gfx.lineTo(nxtWaveTIme, zValuePos);
                            this.gfx.moveTo(nxtWaveTIme, zValuePos);
                            this.gfx.lineStyle(displayConfig.strokeWidth, wireColor, 1);
                        }
                        break;
                    }
                    case 'x': {
                        this.gfx.moveTo(curWaveTime, wireValuePos);
                        this.gfx.lineStyle(displayConfig.strokeWidth, 16711782, 1);
                        if (isSignalGapNotTooNarrow) {
                            this.gfx.beginFill(7798818, fillAlpha);
                            this.gfx.lineTo(curWaveTime, wireValuePos);
                            this.gfx.lineTo(curWaveTime, 3);
                            this.gfx.lineTo(nxtWaveTIme, 3);
                            this.gfx.lineTo(nxtWaveTIme, wireValuePos);
                            this.gfx.endFill();
                        }
                        this.gfx.lineStyle(displayConfig.strokeWidth, wireColor, 1);
                        break;
                    }
                }
            }
        }

        // if data's length is odd
        if (d.length % 2 == 1) {
            d.push(viewport.length * viewport.xscale);
            this.gfx.lineStyle(0, 0, 0);
        }

        // d[] : every two point in the d represent the (x1, x2) to simplify the like below:
        //     ----
        //    |    |
        //x1---    ---x2
        for (let t = 0; t < d.length; t += 2) {
            this.gfx.moveTo(d[t], wireValuePos);
            this.gfx.beginFill(wireColor, 1);
            this.gfx.lineTo(d[t], wireValuePos);
            this.gfx.lineTo(d[t], 2);
            this.gfx.lineTo(d[t + 1], 2);
            this.gfx.lineTo(d[t + 1], wireValuePos);
            this.gfx.endFill();
        };

        return this;
    }
}