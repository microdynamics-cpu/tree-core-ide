import { GenericNodeRenderer } from "./generic.js";
import { SHAPES } from "./operatorNode_components.js";
import { RenderItems } from "../RenderItems.js";
import { TextItems } from "../TextItems.js";
/*
 * Render a operator node using predefined shape
 * */
export class OperatorNodeRenderer extends GenericNodeRenderer {
    constructor(schematic) {
        super(schematic);
        this.SHAPES = SHAPES;
        this.DEFULT_NODE_SIZE = [25, 25];
        this._defsAdded = false;
    }

    prepare(node) {
        node.width = this.DEFULT_NODE_SIZE[0];
        node.height = this.DEFULT_NODE_SIZE[1];
    }

    selector(node) {
        return node.hwMeta.cls == "Operator" && typeof this.SHAPES[node.hwMeta.name] !== "undefined";
    }

    render(nodes, app) {
        for (let i of nodes) {
            console.log('operator: %o, name: %s', i, i.hwMeta.name);
            let tmp = new RenderItems;
            app.stage.addChild(tmp);
            
            let txt = new TextItems;
            app.stage.addChild(txt);
            switch (i.hwMeta.name) {
                case 'AND': {
                    tmp.drawAND(i.x, i.y);
                    txt.drawText(i.x + 6.5, i.y + 4.5, '&');
                    break;
                }
                case 'ADD': {
                    tmp.drawADD(i.x, i.y);
                    txt.drawText(i.x + 7, i.y + 3, '+');
                }
            }
        }
    }
}