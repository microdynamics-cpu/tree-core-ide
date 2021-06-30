// import {section2svgPath} from "./elk/elk-d3-utils.js";
import { RenderItems } from "./RenderItems.js";

export function renderLinks(edges, app) {
    let junctionPoints = [];
    let linkPoints = [];

    console.log('edges: %o', edges);
    let tmp2 = new RenderItems();
    app.stage.addChild(tmp2);

    for (let i of edges) {
        if (!i.sections) {
            return;
        }
        // if (i.bendpoints || i.sections.length > 1) {
        //     throw new Error("NotImplemented");
        // }

        let tmp = new RenderItems();
        app.stage.addChild(tmp);

        let linkPoints = [];
        linkPoints.push([i.sections[0].startPoint.x, i.sections[0].startPoint.y]);

        if(i.sections[0].bendPoints) {
            for(let bp of i.sections[0].bendPoints) {
                linkPoints.push([bp.x, bp.y]);
            }
        }
        

        linkPoints.push([i.sections[0].endPoint.x, i.sections[0].endPoint.y]);
        tmp.drawLink(linkPoints);


        if (i.junctionPoints) {
            for(let jp of i.junctionPoints) {
                junctionPoints.push(jp);
                tmp2.drawJuctPoint(jp.x, jp.y, 3);
            }
        }

    }

    console.log('juction point: %o', junctionPoints);
    // var link = root.selectAll(".link")
    //     .data(edges)
    //     .enter()
    //     .append("path")
    //     .attr("class", "link")
    //     .attr("d", function (d) {
    //         if (!d.sections) {
    //             d._svgPath = "";
    //             return "";
    //         }
    //         if (d.bendpoints || d.sections.length > 1) {
    //             throw new Error("NotImplemented");
    //         }
    //         if (d.junctionPoints)
    //             d.junctionPoints.forEach(function (jp) {
    //                 junctionPoints.push(jp);
    //             });
    //   d._svgPath = section2svgPath(d.sections[0]);
    //         return d._svgPath;
    //     });

    return;
    var linkWrap = root.selectAll(".link-wrap")
        .data(edges)
        .enter()
        .append("path")
        .attr("class", function (d) {
            var cssClass;
            if (d.hwMeta.parent) {
                cssClass = d.hwMeta.parent.hwMeta.cssClass;
            } else {
                cssClass = d.hwMeta.cssClass
            }
            if (typeof cssClass !== 'undefined') {
                return "link-wrap " + cssClass;
            } else {
                return "link-wrap";
            }
        })
        .attr("style", function (d) {
            if (d.hwMeta.parent) {
                return d.hwMeta.parent.hwMeta.cssStyle;
            } else {
                return d.hwMeta.cssStyle
            }
        })
        .attr("d", function (d) {
            return d._svgPath;
        });

    var junctionPoint = root.selectAll(".junction-point")
        .data(junctionPoints)
        .enter()
        .append("circle")
        .attr("r", "3")
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("class", "junction-point");
}