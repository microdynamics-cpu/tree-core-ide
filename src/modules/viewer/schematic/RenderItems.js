

export class RenderItems extends PIXI.Container {
    constructor(name = '') {
        super();
        this.name = name;
        this.gfx = new PIXI.Graphics;
        this.addChild(this.gfx);
    }

    draw(x, y, w, h, viewport, index, data) {
        this.gfx.clear();
        this.gfx.lineStyle(1, 0x00BFFF, 1);
        this.gfx.beginFill(0x00BFFF, 0.4);
        // this.drawAND(200, 200);
        // this.drawNAND(200, 250);
        // this.drawNOT(200, 300);
        // this.drawFF(200, 350);

        this.drawModule(x, y, w, h, viewport, index, data);
        // this.drawMux();
        this.gfx.endFill();
    }

    drawModule(x, y, w, h, viewport, index, data,) {
        this.gfx.lineStyle(1, 0x00BFFF, 1);
        this.gfx.beginFill(0x00BFFF, 0.4);
        this.gfx.drawRect(x, y, w, h);
    }

    drawMux() {
        this.gfx.moveTo(100, 100);
        this.gfx.lineTo(100, 200);
        this.gfx.lineTo(120, 180);
        this.gfx.lineTo(120, 120);
        this.gfx.lineTo(100, 100);
    }

    drawADD(x, y) {
        this.gfx.clear();
        this.gfx.lineStyle(1, 0x00BFFF, 1);
        this.gfx.beginFill(0x00BFFF, 0.4);
        this.gfx.drawCircle(x + 12, y + 10, 10);
        this.gfx.endFill();
    }

    drawText(x, y) {
        basicText.x = 50;
        basicText.y = 100;
    }

    drawInPorts(x, y, rev = 0) {
        this.gfx.lineStyle(1, 0x00BFFF, 1);
        this.gfx.beginFill(0x00BFFF, 1);

        console.log('rev: ', rev);
        if (rev) {
            this.gfx.moveTo(x + 5, y + 2);
            this.gfx.lineTo(x + 5, y + 10 + 2);
            this.gfx.lineTo(x, y + 5 + 2);
            this.gfx.lineTo(x + 5, y + 2);
        } else {
            this.gfx.moveTo(x, y + 2);
            this.gfx.lineTo(x, y + 10 + 2);
            this.gfx.lineTo(x + 5, y + 5 + 2);
            this.gfx.lineTo(x, y + 2);
        }
    }

    drawOutPorts(x, y, rev = 0) {
        this.gfx.lineStyle(1, 0x00BFFF, 1);
        this.gfx.beginFill(0x00BFFF, 1);

        if (rev) {
            this.drawInPorts(x, y, !rev);
        } else {
            this.drawInPorts(x, y, rev);
        }
    }

    drawAND(x, y) {
        let w = 16;
        let h = 22;
        this.gfx.clear();
        this.gfx.lineStyle(1, 0x00BFFF, 1);
        this.gfx.beginFill(0x00BFFF, 0.4);
        this.gfx.moveTo(x + w, y);
        this.gfx.lineTo(x, y);
        this.gfx.lineTo(x, y + h);
        this.gfx.lineTo(x + w, y + h);
        this.gfx.endFill();
        this.gfx.beginFill(0x00BFFF, 0.4);
        this.gfx.arc(x + w, y + h / 2, h / 2, -Math.PI / 2, Math.PI / 2);
        this.gfx.endFill();
    }

    drawLink(node) {
        this.gfx.clear();
        this.gfx.lineStyle(1, 0x00BFFF, 1);
        let isFirst = true;
        for (let n of node) {
            if (isFirst) {
                isFirst = false;
                this.gfx.moveTo(n[0], n[1]);
            } else {
                this.gfx.lineTo(n[0], n[1]);
            }
        }
    }

    drawJuctPoint(x, y, r) {
        this.gfx.clear();
        this.gfx.lineStyle(1, 0x00BFFF, 1);
        this.gfx.beginFill(0x00BFFF, 1);
        this.gfx.drawCircle(x, y, r);
        this.gfx.endFill();
    }

    drawNAND(x, y) {
        this.gfx.moveTo(x, y - 20);
        this.gfx.lineTo(x - 30, y - 20);
        this.gfx.lineTo(x - 30, y + 20);
        this.gfx.lineTo(x, y + 20);
        this.gfx.endFill();
        this.gfx.beginFill(0x00BFFF, 0.4);
        this.gfx.arc(x, y, 20, -Math.PI / 2, Math.PI / 2);
        this.gfx.drawCircle(x + 20 + 4, y, 4);
        this.gfx.endFill();
    }

    drawOR(x, y) {

    }

    drawNOR(x, y) {

    }

    drawXOR(x, y) {

    }

    drawNXOR(x, y) {

    }


    drawNOT(x, y) {
        this.gfx.moveTo(x, y);
        this.gfx.lineTo(x, y + 40);
        this.gfx.lineTo(x + 45, y + 20);
        this.gfx.lineTo(x, y);
        this.gfx.drawCircle(x + 45 + 4, y + 20, 4);
        this.gfx.endFill();
    }

    drawFF(x, y) {

    }
}