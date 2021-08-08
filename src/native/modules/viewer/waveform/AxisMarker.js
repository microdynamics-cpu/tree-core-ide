export class AxisMarker extends PIXI.Container {
    constructor(t, e, i = '') {
        super();
        this.text = new PIXI.Text(i, {
            fontSize: e.textSize,
            fill: e.textColor,
        });

        
        // this.text.y = -e.textSize / 2;
        this.text.y = e.textSize / 2;
        this.text.anchor.x = .5;
        this.text.anchor.y = .5;
        this.text.scale.set(.5, .5);
        this.addChild(this.text);

        //t: PIXI.RenderTexture
        const r = new PIXI.Sprite(t);
        r.y = -3;
        this.addChild(r);
    }

    setLabel(str) {
        this.text.text = str;
    }

    static timeToString(timePos, timeScalePos = 0) {
        const timeUnit = ["fs", "ps", "ns", "us", "ms", "s"];
        const signValue = timePos < 0 ? "-" : "";

        if (0 === (timePos = Math.abs(timePos))) return "0";

        let timeExpValue = Math.floor(Math.log(timePos) / Math.log(1e3));

        if(timeExpValue + timeScalePos > 5) {
            return signValue + timePos + " " + timeUnit[5];
        } else {
            return signValue 
            + parseFloat((timePos / Math.pow(1e3, timeExpValue)).toFixed(3)) 
            + " " + timeUnit[timeExpValue + timeScalePos];
        }
    }
}