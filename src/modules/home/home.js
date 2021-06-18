const vscode = require("vscode");
const utilExtn = require("../../utils/util_extn");

// import vscode from "vscode";
// import * as utilExtn from "../../utils/util_extn";

module.exports = function (context) {
    context.subscriptions.push(
        vscode.commands.registerCommand("treecore.cmd.showHomePage", function () {
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
            panel.iconPath = utilExtn.getExtensionFileAbsolutePathUrl(
                context,
                "resources/logos/treecore_logo_main.svg");
            panel.webview.html = utilExtn.getWebViewContent(
                context,
                "src/views/home.html");
            panel.webview.onDidReceiveMessage(message => {
                utilExtn.handleMessageFromWebview(global, message);
            }, undefined, context.subscriptions);
        }
    ));

    const key = "treecore.config.showHomePageAtStartup";
    if (vscode.workspace.getConfiguration().get(key)) {
        vscode.commands.executeCommand("treecore.cmd.showHomePage");
    }

    context.subscriptions.push(
        vscode.commands.registerCommand('waveviewer.start', () => {
            const panel = vscode.window.createWebviewPanel(
                'Wave Viewer',
                "Wave Viewer",
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                }
            );

            panel.webview.html = utilExtn.getWebViewContent(context,
                'src/modules/viewer/waveform/WaveViewer.html');
        }
    ));

    context.subscriptions.push(
        vscode.commands.registerCommand('schviewer.start', () => {
            const panel = vscode.window.createWebviewPanel(
                'Sch Viewer',
                "Sch Viewer",
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                }
            );

            panel.webview.html = utilExtn.getWebViewContent(context,
                'src/modules/viewer/schematic/SchViewer.html');
        }
    ));

}

// export default function showHomePage(context) {
//     context.subscriptions.push(
//         vscode.commands.registerCommand("treecore.cmd.showHomePage", function() {
//             const panel = vscode.window.createWebviewPanel(
//                 "treecoreHome",
//                 "TreeCore IDE Home",
//                 vscode.ViewColumn.One,
//                 {
//                     enableScripts: true
//                 }
//             );
//             let global = { panel };
//             panel.iconPath = utilExtn.getExtensionFileAbsolutePathUrl(
//                 context,
//                 "resources/logos/treecore_logo_main.svg");
//             panel.webview.html = utilExtn.getWebViewContent(
//                 context,
//                 "src/views/libraries.html");
//             panel.webview.onDidReceiveMessage(message => {
//                 utilExtn.handleMessageFromWebview(global, message);
//             }, undefined, context.subscriptions);
//         }
//     ));

//     const key = "treecore.config.showHomePageAtStartup";
//     if (vscode.workspace.getConfiguration().get(key)) {
//         vscode.commands.executeCommand("treecore.cmd.showHomePage");
//     }
// }
