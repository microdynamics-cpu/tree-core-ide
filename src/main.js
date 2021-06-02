const vscode = require("vscode");
const ProjectManager = require("./modules/manager/ProjectManagerProvider");
// import vscode from "vscode";
// import showHomePage from "./modules/home/home"

// Triggered when the extension is activated
function activate(context) {
    console.log("TreeCore IDE extension is active!");
    console.log(vscode);

    require("./modules/home/home")(context);

    const projectManagerProvider = new ProjectManager.ProjectManagerProvider(vscode.workspace.rootPath);
    vscode.window.registerTreeDataProvider('treecore.activityBar.rtlproject', projectManagerProvider);
    vscode.commands.registerCommand('treecore.activityBar.rtlproject.refreshEntry', () => projectManagerProvider.refresh());
    vscode.commands.registerCommand('extension.openPackageOnNpm', moduleName => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.npmjs.com/package/${moduleName}`)));
    vscode.commands.registerCommand('treecore.activityBar.rtlproject.addEntry', () => vscode.window.showInformationMessage(`Successfully called add entry.`));
    vscode.commands.registerCommand('treecore.activityBar.rtlproject.editEntry', (node) => vscode.window.showInformationMessage(`Successfully called edit entry on ${node.label}.`));
    vscode.commands.registerCommand('treecore.activityBar.rtlproject.deleteEntry', (node) => vscode.window.showInformationMessage(`Successfully called delete entry on ${node.label}.`));
}

// Triggered when the extension is deactivated
function deactivate() {
    console.log("TreeCore IDE extension is deactive!");
}

module.exports = {
    activate,
    deactivate
}

// // 插件被激活时触发
// // Triggered when the extension is activated
// export function activate(context) {
//     console.log("TreeCore IDE extension is active!");
//     console.log(vscode);

//     showHomePage(context);
// }

// // 插件被释放时触发
// // Triggered when the extension is deactivated
// export function deactivate() {
//     console.log("TreeCore IDE extension is deactive!");
// }
