const vscode = require("vscode");
const home = require("./native/modules/home/home");
const ProjectManager = require("./native/modules/manager/ProjectManagerProvider");

// 插件被激活时触发
// Triggered when the extension is activated
function activate(context) {
    console.log("TreeCore IDE extension is active!");
    console.log(vscode);

    home.showHomePage(context);

    // console.log(vscode.workspace.workspaceFolders)
    // const projectManagerProvider = new ProjectManager.ProjectManagerProvider(vscode.workspace.rootPath);
    // vscode.window.registerTreeDataProvider('treecore.activityBar.rtlproject', projectManagerProvider);
    // vscode.commands.registerCommand('treecore.activityBar.rtlproject.refreshEntry', () => projectManagerProvider.refresh());

    // // Need to handle the bug when in multi-workspace condition
    // vscode.commands.registerCommand('extension.openPackageOnNpm', filePath => vscode.commands.executeCommand('vscode.open', vscode.Uri.joinPath(vscode.workspace.workspaceFolders[0].uri, `${filePath}`)));
    // vscode.commands.registerCommand('treecore.activityBar.rtlproject.addEntry', () => vscode.window.showInformationMessage(`Successfully called add entry.`));
    // vscode.commands.registerCommand('treecore.activityBar.rtlproject.editEntry', (node) => vscode.window.showInformationMessage(`Successfully called edit entry on ${node.label}.`));
    // vscode.commands.registerCommand('treecore.activityBar.rtlproject.deleteEntry', (node) => vscode.window.showInformationMessage(`Successfully called delete entry on ${node.label}.`));
}

// 插件被释放时触发
// Triggered when the extension is deactivated
function deactivate() {
    console.log("TreeCore IDE extension is deactive!");
}

module.exports = {
    activate,
    deactivate
}
