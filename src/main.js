const vscode = require("vscode");

// import vscode from "vscode";
// import showHomePage from "./modules/home/home"

// 插件被激活时触发
// Triggered when the extension is activated
function activate(context) {
    console.log("TreeCore IDE extension is active!");
    console.log(vscode);

    require("./modules/home/home")(context);
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
