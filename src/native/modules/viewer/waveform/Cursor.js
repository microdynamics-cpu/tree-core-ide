export class Cursor extends PIXI.Container {
    constructor(width, color) {
        super();
        this.gfx = new PIXI.Graphics;
        this.addChild(this.gfx);
        this.offsetPs = 0;
        this._width = width;
        this._color = color;
    }

    // t: viewport
    draw(t) {
        // const e = ht(getComputedStyle(document.documentElement).getPropertyValue("--cursor").trim(), "float32"),
        //     i = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--cursor-width").trim());
        // const i = 1;
        // const e = [];

        this.gfx.clear();
        const r = Math.floor(this.offsetPs * t.xscale) - 1;
        // this.gfx.lineStyle(i, gi(e.slice(0, 3)), e[3], 0, false);
        console.log('Cursor draw this.width: ', this._width);
        console.log('Cursor draw this.color: ', this._color);
        this.gfx.lineStyle(this._width, this._color, 1, 0, false);

        this.gfx.moveTo(r, .5);
        this.gfx.lineTo(r, this.parent.height);
        this.gfx.lineTo(r, .5);
    }

    move(t) {
        this.offsetPs = t;
    }
}