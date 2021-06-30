export class TextItems extends PIXI.Container {
    constructor(name = ''){
        super();
        this.name = name;
        this.style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 12,
            fill: ['#ffffff'],
            stroke: '#ffffff',
        });

        this.txt = new PIXI.Text('', this.style);
        this.addChild(this.txt);
    }

    drawText(x, y, str) {
        this.txt.x = x;
        this.txt.y = y;
        this.txt.text = str;
    }
}