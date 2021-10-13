export class Viewport {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 1;
        this.height = 1;
        this.xscale = 1;
        this.yscale = 1;
        this.length = 1;
        this.timescale = 0;
    }

    set(obj) {
        this.x = obj.x;
        this.y = obj.y;
        this.xscale = obj.xscale;
        this.width = obj.width;
        this.height = obj.height;
        this.length = obj.length;
        this.timescale = obj.timescale;
    }

    get() {
        return {
            x: this.x,
            y: this.y,
            xscale: this.xscale,
            yscale: this.yscale,
            width: this.width,
            height: this.height,
            length: this.length,
            timescale: this.timescale,
        }
    }

    goto(t) {
        let e = this.toPs(0) - this.toPs(this.width);
        let i = t;

        // t < 0: some time only mean that 'go to the end' trigger
        // when this time, the signal end time will center at the screen
        if(t < 0) {
            i = this.length - t + 1;
        }
        this.x = i + e / 2;
    }

    fit() {
        this.x = 0;
        let t = this.width / this.length;
        this.xscale = t;
    }

    // t > 0: pan right t < 0: pan left
    pan(t) {
        this.x -= t / 2 * (1 / this.xscale);
    }

    // t: wheel delta amount
    // i: cursor x pos
    // modify the this.xcasle and this.x
    // very important!!
    zoom(t, e = true, i) {
        // console.log('t, e, i: ', t, e, i);
        
        // call this func, the e == 0
        const r = e ? i : this.width;
        
        // n is the distance between [0, width] in scale mode
        let n = this.toPs(r) - this.toPs(0);

        // update the xscale
        this.xscale *= Math.exp(-t / 500);


        // limit range[10^-10, 99]
        if(this.xscale > 99){
            this.xscale = 99;
        }
        
        if(this.xscale < 0) {
            this.xscale = 1e-10;
        }

        let o = this.toPs(r) - this.toPs(0);
        // because e === 0, so x -= (o - n) / 2
        this.x -= e ? o - n : (o - n) / 2;
    }

    toPs(t) {
        return (t - this.x) * (1 / this.xscale)
    }

    fromPs(t) {
        return (t + this.x) * this.xscale;
    }

    screenToPs(t) {
        return Math.round(t * (1 / this.xscale) + this.x);
    }

    update() { }

    resize(t, e) {
        this.width = t;
        this.height = e;
    }
}