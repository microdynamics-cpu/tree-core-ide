
import { getIOMarker } from "../markers.js";
import { RenderItems } from "../RenderItems.js";
import { TextItems } from "../TextItems.js";

function portLevel(port) {
    if (!port.parent) return 0;
    else {
        return portLevel(port.parent) + 1;
    }

}

/*
 * Basic renderer which renders node as a box with ports, optionally with the body text
 */
export class GenericNodeRenderer {
    /**
     * @param schematic instance of HwSchematic
     **/
    constructor(schematic) {
        this.schematic = schematic;
    }
    /**
     * check if this selector should be used for this node
     **/
    selector(node) {
        // always return true, because this is a default renderer which just renders a box with ports
        return true;
    }

    getNodeLabelWidth(d) {
        var schematic = this.schematic;
        var widthOfText = schematic.widthOfText.bind(schematic);
        return widthOfText(d.hwMeta.name);
    }

    /**
     * Init bodyText and resolve size of node from body text and ports
     *
     * @param d component node
     *
     */
    initNodeSizes(d) {
        var schematic = this.schematic;
        if (d.properties["org.eclipse.elk.noLayout"])
            return;
        var widthOfText = schematic.widthOfText.bind(schematic);

        var labelW = this.getNodeLabelWidth(d);
        var max = Math.max
        var bodyTextSize = this.initBodyTextLines(d);
        const MBT = schematic.MAX_NODE_BODY_TEXT_SIZE;
        bodyTextSize[0] = Math.min(bodyTextSize[0], MBT[0]);
        bodyTextSize[1] = Math.min(bodyTextSize[1], MBT[1]);

        // {PortSide: (portCnt, portWidth)}
        var portDim = {
            "WEST": [0, 0],
            "EAST": [0, 0],
            "SOUTH": [0, 0],
            "NORTH": [0, 0]
        };
        var PORT_PIN_SIZE_x = schematic.PORT_PIN_SIZE[0],
            PORT_PIN_SIZE_y = schematic.PORT_PIN_SIZE[1];
        var CHAR_WIDTH = schematic.CHAR_WIDTH;
        if (d.ports != null)
            d.ports.forEach(function (p) {
                var t = p.properties.side;
                var indent = 0;
                if (portLevel(p) > 0)
                    indent = (portLevel(p) + 1) * CHAR_WIDTH;
                var portW = widthOfText(p.hwMeta.name) + indent;
                var pDim = portDim[t];
                if (pDim === undefined)
                    throw new Error(t);
                pDim[0]++;
                pDim[1] = max(pDim[1], portW);

                // dimension of connection pin
                p.width = PORT_PIN_SIZE_x;
                p.height = PORT_PIN_SIZE_y;
            })

        var west = portDim["WEST"],
            east = portDim["EAST"],
            south = portDim["SOUTH"],
            north = portDim["NORTH"];

        var portColums = 0;
        if (west[0] && west[1] > 0)
            portColums += 1;
        if (east[0] && east[1] > 0)
            portColums += 1;

        var middleSpacing = 0;
        if (portColums == 2)
            middleSpacing = schematic.NODE_MIDDLE_PORT_SPACING
        var portW = max(west[1], east[1]);

        d.portLabelWidth = portW;
        d.width = max(portW * portColums + middleSpacing, labelW,
            max(south[0], north[0]) * schematic.PORT_HEIGHT)
            + bodyTextSize[0] + CHAR_WIDTH;
        d.height = max(max(west[0], east[0]) * schematic.PORT_HEIGHT,
            bodyTextSize[1],
            max(south[1], north[1]) * CHAR_WIDTH);
    }

    /**
     * Split bodyText of one to lines and resolve dimensions of body text
     *
     * @param d component node
     */
    initBodyTextLines(d) {
        var schematic = this.schematic;
        var max = Math.max;
        var bt = d.hwMeta.bodyText
        if (bt) {
            if (typeof bt === "string") {
                bt = d.hwMeta.bodyText = bt.split("\n");
            }
            var bodyTextW = 0;
            bt.forEach(function (line) {
                bodyTextW = max(bodyTextW, line.length);
            })
            bodyTextW *= schematic.CHAR_WIDTH;
            var bodyTextH = bt.length * schematic.CHAR_HEIGHT;
        } else {
            var bodyTextW = 0;
            var bodyTextH = 0;
        }
        var pad = schematic.BODY_TEXT_PADDING;
        if (bodyTextW > 0)
            bodyTextW += pad[1] + pad[3];
        if (bodyTextH > 0)
            bodyTextH += pad[0] + pad[2];
        return [bodyTextW, bodyTextH];
    }

    /**
     * @param bodyTexts list of strings
     */
    renderTextLines(bodyTexts) {
        var schematic = this.schematic;
        const padTop = schematic.BODY_TEXT_PADDING[0];
        const padLeft = schematic.BODY_TEXT_PADDING[3];
        const MBT = schematic.MAX_NODE_BODY_TEXT_SIZE;
        const CHAR_WIDTH = schematic.CHAR_WIDTH;
        const CHAR_HEIGHT = schematic.CHAR_HEIGHT;

        bodyTexts.each(function () {
            var bodyText = d3.select(this)
            var d = bodyText.data()[0];
            var bodyTextLines = d.hwMeta.bodyText;
            var _MBT = [MBT[0] / CHAR_WIDTH, MBT[1] / CHAR_HEIGHT];

            if (bodyTextLines && (!d.children
                || d.children.length == 0)) {
                bodyTextLines.forEach(function (line, dy) {
                    if (line.length > _MBT[0])
                        line = line.slice(0, _MBT[0] - 3) + "...";
                    if (dy > _MBT[1])
                        return;
                    bodyText
                        .append("tspan")
                        .attr("x", d.portLabelWidth + padLeft)
                        .attr("y", padTop)
                        .attr("dy", dy + "em")
                        .text(line);
                });
            }
        });
    }

    /**
     * Prepare node before ELK processing
     * */
    prepare(node) {
        this.initNodeSizes(node)
    }

    /**
     * Render svg of node
     *
     * @param root root svg element where nodes should be rendered
     * @param nodeG svg g for each node with data binded
     * */
    render(nodes, app) {
        for (let i of nodes) {
            console.log('obj: %o', i);
            // console.log('module items: (x, y, w, h): %d, %d, %d, %d', i.x, i.y, i.width, i.height);

            let tmp = new RenderItems();
            app.stage.addChild(tmp);
            tmp.draw(i.x, i.y, i.width, i.height);

            let txt = new TextItems;
            app.stage.addChild(txt);
            if (i.hwMeta.name) {
                txt.drawText(i.x, i.y - 15, i.hwMeta.name);
            } else {
                if(i.hwMeta.bodyText[0].length > 5) continue;
                txt.drawText(i.x + 11, i.y + 5, i.hwMeta.bodyText[0]);
            }
        }

        this.renderPorts(nodes, app);
    }

    renderPorts(nodes, app) {
        var schematic = this.schematic;
        var PORT_HEIGHT = schematic.PORT_HEIGHT;
        var CHAR_WIDTH = schematic.CHAR_WIDTH;


        let tmp = new RenderItems();
        app.stage.addChild(tmp);
        console.log('nodes: %o', nodes);

        for (let i of nodes) {
            console.log('node.ports: %o', i.ports);
            let ignorePortLabel = typeof i.children !== 'undefined';
            for (let p of i.ports) {
                p.ignoreLabel = ignorePortLabel;
                console.log('p.direction: %s, p.properties.side: %s', p.direction, p.properties.side);
                if (p.direction === 'INPUT') {
                    tmp.drawInPorts(p.x + i.x, p.y + i.y, p.properties.side == 'EAST');
                } else {
                    tmp.drawOutPorts(p.x + i.x, p.y + i.y, p.properties.side == 'EAST');
                }

                let labelText = '';
                let xPos = 7;
                if (p.ignoreLabel) {
                    labelText = '';
                }
                else if (p.parent) {
                    var indent = '-'.repeat(portLevel(p));
                    var side = p.properties.side;
                    if (side == "WEST") {
                        labelText = indent + p.hwMeta.name;
                        if (indent === '') xPos = 14;
                        else xPos = 7;
                    } else if (side == "EAST") {
                        labelText = p.hwMeta.name + indent;
                        if (typeof this.getBBox == "undefined") {
                            // JSDOM under nodejs
                            // console.log('p.textContent: %o', p.textContent);
                            xPos = -labelText.length * CHAR_WIDTH - CHAR_WIDTH / 2;
                        } else {
                            xPos = -this.getBBox().width - CHAR_WIDTH / 2;
                        }

                    } else if (side === 'NORTH' || side === 'SOUTH') {
                        xPos = 0;
                    } else {
                        throw new Error(side);
                    }
                } else {
                    labelText = p.hwMeta.name;
                    if (labelText) {
                        if (p.properties.side === 'EAST') xPos = -labelText.length * 6;
                    }
                }

                let txt = new TextItems();
                app.stage.addChild(txt);
                console.log('txt: %s', labelText);
                console.log('xPos: %d', xPos);
                txt.drawText(p.x + i.x + xPos, p.y + i.y, labelText);
            }
        }

        console.log('nodes: ', nodes);
        return;
    }
}