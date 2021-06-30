// import { addMarkers } from "./markers";
import { NodeRendererContainer } from "./nodeRendererContainer.js";
import { OperatorNodeRenderer } from "./node_renderers/operatorNode.js";
import { MuxNodeRenderer } from "./node_renderers/muxNode.js";
import { SliceNodeRenderer } from "./node_renderers/sliceNode.js";
import { GenericNodeRenderer } from "./node_renderers/generic.js";
import { renderLinks } from "./linkRenderer.js";
// import { Tooltip } from "./tooltip.js";
import { hyperEdgesToEdges, getNet, initNodeParents, expandPorts } from "./dataPrepare.js";
import { ELKObject } from "./elk/ELKObject.js";

function getNameOfEdge(e) {
    var name = "<tspan>unnamed</tspan>";
    if (e.hwMeta) {
        if (typeof e.hwMeta.name === "undefined") {
            var p = e.hwMeta.parent;
            var pIsHyperedge = typeof p.sources !== "undefined"
            if (pIsHyperedge && p.hwMeta) {
                name = p.hwMeta.name;
            }
        } else {
            name = e.hwMeta.name;
        }
    }
    return name;
}

function toggleHideChildren(node) {
    var children;
    var nextFocusTarget;
    if (node.children) {
        // children are visible, will collapse
        children = node.children;
        nextFocusTarget = node.hwMeta.parent;
    } else {
        // children are hidden, will expand
        children = node._children;
        nextFocusTarget = node;
    }

    var tmpChildren = node.children;
    node.children = node._children;
    node._children = tmpChildren;
    var tmpEdges = node.edges;
    node.edges = node._edges;
    node._edges = tmpEdges;
    node.hwMeta.renderer.prepare(node);
    return [children, nextFocusTarget];
}

/**
 * HwScheme builds scheme diagrams after bindData(data) is called
 *
 * @param svg: root svg element where scheme will be rendered
 * @attention zoom is not applied it is only used for focusing on objects
 * @note do specify size of svg to have optimal result
 */
export class HWSchematic {
    constructor() {
        // flag for performance debug
        this.app;
        this._PERF = false;
        // default sizes of elements
        this.PORT_PIN_SIZE = [7, 13];
        this.PORT_HEIGHT = this.PORT_PIN_SIZE[1]; // HEIGHT: 13

        this.CHAR_WIDTH = 5.55;
        this.CHAR_HEIGHT = 13;

        this.NODE_MIDDLE_PORT_SPACING = 20;
        this.MAX_NODE_BODY_TEXT_SIZE = [400, 400];

        // top, right, bottom, left
        this.BODY_TEXT_PADDING = [15, 10, 0, 10];
        this._nodes = null;
        this._edges = null;

        // graph layouter to resovbe posiions of elements
        this.layouter = new ELKObject();
        this.layouter
            .options({
                edgeRouting: "ORTHOGONAL",
            })

        // shared tooltip object
        // this.tooltip = new Tooltip(document.getElementsByTagName('body')[0]);

        // renderer instances responsible for rendering of component nodes
        this.nodeRenderers = new NodeRendererContainer();
        // addMarkers(this.defs, this.PORT_PIN_SIZE);
        var rs = this.nodeRenderers;

        // four type of graph
        rs.registerRenderer(new OperatorNodeRenderer(this));
        rs.registerRenderer(new MuxNodeRenderer(this));
        rs.registerRenderer(new SliceNodeRenderer(this));
        rs.registerRenderer(new GenericNodeRenderer(this));
    }

    widthOfText(text) {
        if (text) {
            return text.length * this.CHAR_WIDTH;
        } else {
            return 0;
        }
    }

    updateGlobalSize(width, height) {
        // update the layouter's size
        console.log('updateGlobal: %d, %d', width, height);
        this.layouter.size([width, height]);
    }

    /**
     * Set bind graph data to graph rendering engine
     *
     * @return promise for this job
     */
    bindData(graph, app) {
        this.app = app;

        var postCompaction = "layered.compaction.postCompaction.strategy";
        if (!graph.properties[postCompaction]) {
            graph.properties[postCompaction] = "EDGE_LENGTH";
            console.log('binData modify data!');
        }

        //expand the hyper edges recursively
        // hyper edge: object, one object have more [source, target] point, i.e. mulitply edges
        hyperEdgesToEdges(graph, graph.hwMeta.maxId);

        console.log('binData: %o', graph);
        
        // add parent attr to the hwMeta domain recursively
        initNodeParents(graph, null);
        console.log('binData: %o', graph);
        
        // expand ports recursively
        expandPorts(graph);
        console.log('binData: %o', graph);
        

        if (this._PERF) {
            var t0 = new Date().getTime();
        }

        // nodes are ordered, childeren at the end
        // add the render attr to the hwMeta domain json
        this.nodeRenderers.prepare(graph);
        console.log('binData: %o', graph);

        
        if (this._PERF) {
            var t1 = new Date().getTime();
            console.log("> nodeRenderers.prepare() : " + (t1 - t0) + " ms");
        }

        this.layouter.kgraph(graph);
        console.log('binData: %o', graph);
        return this._draw();
    }

    /*
     * Resolve layout and draw a component graph from layout data
     */
    _draw() {
        // this.updateGlobalSize();

        var layouter = this.layouter;
        this._nodes = layouter.getNodes().slice(1); // skip root node
        this._edges = layouter.getEdges();

        console.log('this._nodes: %o', this._nodes);
        console.log('this._edges: %o', this._edges);

        if (this._PERF) {
            var t0 = new Date().getTime();
        }
        var _this = this;


        // important!!!
        return layouter.start()
            .then(
                function (g) {
                    if (_this._PERF) {
                        var t1 = new Date().getTime();
                        console.log("> layouter.start() : " + (t1 - t0) + " ms");
                        t0 = t1;
                    }
                    console.log('layouter.start().then: %o', g);
                    _this._applyLayout(g);
                    if (_this._PERF) {
                        var t1 = new Date().getTime();
                        console.log("> HWSchematic._applyLayout() : " + (t1 - t0) + " ms");
                    }
                },
                function (e) {
                    // Error while running d3-elkjs layourter
                    throw e;
                }
            );
    }
    /**
     * Draw a component graph from layout data
     */
    _applyLayout() {
        // this.root = svg.append("g");

        // var node = root.selectAll(".node")
        //     .data(this._nodes)
        //     .enter()
        //     .append("g");

        // root: svg.append('g): i.e. <g></g>
        this.nodeRenderers.render(this._nodes, this.app);

        // var _this = this;
        // node.on("click", function (ev, d) {
        //     var [children, nextFocusTarget] = toggleHideChildren(d);
        //     if (!children || children.length == 0) {
        //         return; // does not have anything to expand
        //     }
        //     _this.layouter.markLayoutDirty();
        //     _this.removeGraph();
        //     _this._draw().then(
        //         function () {
        //             _this.layouter.zoomToFit(nextFocusTarget);
        //         },
        //         function (e) {
        //             // Error while applying of layout
        //             throw e;
        //         }
        //     );
        // });

        this._applyLayoutLinks();
    }

    _applyLayoutLinks() {
        // var _this = this;
        var edges = this._edges;

        renderLinks(edges, this.app);
        // build netToLink
        // var netToLink = {};
        // edges.forEach(function (e) {
        //     netToLink[getNet(e).id] = {
        //         "core": [],
        //         "wrap": []
        //     };
        // });
        // linkWrap._groups.forEach(function (lg) {
        //     lg.forEach(function (l) {
        //         var e = d3.select(l).data()[0];
        //         netToLink[getNet(e).id]["wrap"].push(l);
        //     });
        // });
        // link._groups.forEach(function (lg) {
        //     lg.forEach(function (l) {
        //         var e = d3.select(l).data()[0];
        //         netToLink[getNet(e).id]["core"].push(l);
        //     });
        // });

        // set highlingt and tooltip on mouser over over the net
        // linkWrap.on("mouseover", function (ev, d) {
        //     var netWrap = netToLink[getNet(d).id]["wrap"];
        //     d3.selectAll(netWrap)
        //         .classed("link-wrap-activated", true);

        //     _this.tooltip.show(ev, getNameOfEdge(d));
        // });

        // linkWrap.on("mouseout", function (ev, d) {
        //     var netWrap = netToLink[getNet(d).id]["wrap"];
        //     d3.selectAll(netWrap)
        //         .classed("link-wrap-activated", false);

        //     _this.tooltip.hide();
        // });

        // set link highlight on net click
        // function onLinkClick(ev, d) {
        //     var net = getNet(d);
        //     var doSelect = net.selected = !net.selected;
        //     // propagate click on all nets with same source

        //     var netCore = netToLink[net.id]["core"];
        //     d3.selectAll(netCore)
        //         .classed("link-selected", doSelect);
        //     ev.stopPropagation();
        // }

        // Select net on click
        // link.on("click", onLinkClick);
        // linkWrap.on("click", onLinkClick);
    }

    terminate() {
        if (this.layouter) {
            this.layouter.terminate();
        }
    }
}
