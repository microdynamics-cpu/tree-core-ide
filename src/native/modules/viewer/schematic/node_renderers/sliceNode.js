import { GenericNodeRenderer } from "./generic.js";
import { RenderItems } from "../RenderItems.js";

export class SliceNodeRenderer extends GenericNodeRenderer {
  selector(node) {
    return node.hwMeta.name === "SLICE" || node.hwMeta.name === "CONCAT";
  }

  getNodeLabelWidth(node) {
    return 0;
  }

  render(nodes, app) {
    for (let i of nodes) {
      let tmp = new RenderItems();
      app.stage.addChild(tmp);

      switch (i.hwMeta.name) {
        case 'SLICE': {
          tmp.draw(i.x, i.y, i.width, i.height);

          break;
        }
        case 'CONCAT': {
          tmp.draw(i.x, i.y, i.width, i.height);
          break;
        }
      }
    }

    this.renderPorts(nodes, app);
  }
}