const vscode = require("vscode");
const utilExtn = require("../../utils/extn");

module.exports = function (context) {
    context.subscriptions.push(
        vscode.commands.registerCommand("treecore.cmd.showHomePage", function() {
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
                "resources/images/logos/treecore_logo_main.svg");
            panel.webview.html = utilExtn.getWebViewContent(
                context,
                "src/server/static/index.html");
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
        vscode.commands.registerCommand("waveviewer.start", () => {
            const panel = vscode.window.createWebviewPanel(
                "Wave Viewer",
                "Wave Viewer",
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                }
            );

            panel.webview.html = utilExtn.getWebViewContent(context,
                "src/native/viewer/waveform/WaveViewer.html");
        }
    ));

    context.subscriptions.push(
        vscode.commands.registerCommand("schviewer.start", () => {
            const panel = vscode.window.createWebviewPanel(
                "Sch Viewer",
                "Sch Viewer",
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                }
            );

            panel.webview.html = utilExtn.getWebViewContent(context,
                "src/native/viewer/schematic/SchViewer.html");
        }
    ));
}
