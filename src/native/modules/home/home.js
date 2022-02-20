const vscode = require("vscode");
const extn = require("../../utils/extn");

module.exports = {
    showHomePage: function(context) {
        context.subscriptions.push(
            vscode.commands.registerCommand("treecore.module.home.showHomePage", () => {
                const panel = vscode.window.createWebviewPanel(
                    "treecoreHome",
                    "TreeCore IDE Home",
                    vscode.ViewColumn.One,
                    {
                        enableScripts: true,
                        retainContextWhenHidden: true,
                    }
                );
                let global = { panel };
                panel.iconPath = extn.getExtnFileAbsolutePathUrl(
                    context,
                    "resources/images/logos/treecore_logo_main.svg");
                panel.webview.html = extn.getExtnContentFromView(
                    context,
                    "dist/index.html");
                panel.webview.onDidReceiveMessage(
                    (msg) => {
                        extn.handleExtnMsgFromView(global, msg);
                    },
                    undefined,
                    context.subscriptions);
            }
        ));
        const key = "treecore.config.showHomePageAtStartup";
        if (vscode.workspace.getConfiguration().get(key)) {
            vscode.commands.executeCommand("treecore.module.home.showHomePage");
        }
    }
};

// module.exports = function(context) {
//     context.subscriptions.push(
//         vscode.commands.registerCommand("treecore.cmd.showHomePage", () => {
//             const panel = vscode.window.createWebviewPanel(
//                 "treecoreHome",
//                 "TreeCore IDE Home",
//                 vscode.ViewColumn.One,
//                 {
//                     enableScripts: true,
//                     retainContextWhenHidden: true,
//                 }
//             );
//             let global = { panel };
//             panel.iconPath = extn.getExtnFileAbsolutePathUrl(
//                 context,
//                 "resources/images/logos/treecore_logo_main.svg");
//             panel.webview.html = extn.getExtnContentFromView(
//                 context,
//                 "src/server/static/index.html");
//             panel.webview.onDidReceiveMessage((message) => {
//                 extn.handleExtnMsgFromView(global, message);
//             }, undefined, context.subscriptions);
//         }
//     ));

//     const key = "treecore.config.showHomePageAtStartup";
//     if (vscode.workspace.getConfiguration().get(key)) {
//         vscode.commands.executeCommand("treecore.cmd.showHomePage");
//     }

    // context.subscriptions.push(
    //     vscode.commands.registerCommand("waveviewer.start", () => {
    //         const panel = vscode.window.createWebviewPanel(
    //             "Wave Viewer",
    //             "Wave Viewer",
    //             vscode.ViewColumn.One,
    //             {
    //                 enableScripts: true,
    //                 retainContextWhenHidden: true,
    //             }
    //         );

    //         panel.webview.html = extn.getExtnContentFromView(context,
    //             "src/native/viewer/waveform/WaveViewer.html");
    //     }
    // ));

    // context.subscriptions.push(
    //     vscode.commands.registerCommand("schviewer.start", () => {
    //         const panel = vscode.window.createWebviewPanel(
    //             "Sch Viewer",
    //             "Sch Viewer",
    //             vscode.ViewColumn.One,
    //             {
    //                 enableScripts: true,
    //                 retainContextWhenHidden: true,
    //             }
    //         );

    //         panel.webview.html = extn.getExtnContentFromView(context,
    //             "src/native/viewer/schematic/SchViewer.html");
    //     }
    // ));
// }
