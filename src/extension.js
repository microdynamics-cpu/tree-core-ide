const vscode = require("vscode");

// 插件被激活时触发
// Triggered when the extension is activated
function activate(context) {
    console.log("TreeCore IDE extension is active!");
    console.log(vscode);

    require("./home/home")(context);
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
