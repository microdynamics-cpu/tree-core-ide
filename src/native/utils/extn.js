const fs     = require("fs");
const path   = require("path");
const vscode = require("vscode");

const extensionMessageHandlers = {
    getExtensionConfig: function(global, message) {
        const result = vscode.workspace.getConfiguration().get(
            message.key);
        handleMessageCallback(global.panel, message, result);
    },
    setExtensionConfig: function(global, message) {
        vscode.workspace.getConfiguration().update(message.key, message.val,
                                                   true);
        vscode.window.showInformationMessage(
            "Update configuration successfully!");
    }
};

function handleMessageCallback(panel, message, result) {
    console.log("messageCallback: " + result);
    if (typeof(result) == "object" &&
        result.code && result.code >= 400 && result.code < 600) {
        vscode.window.showErrorMessage("An unknown error occurred in" +
                                        message.cmd + "!");
    }
    panel.webview.postMessage({
        cmd: "extensionCallback",
        cid:  message.cid,
        data: result
    });
};

module.exports = {
    // 获取某个扩展文件的绝对路径
    // Get the absolute path of an extension file
    getExtensionFileAbsolutePath: function(context, relativePath) {
        return path.join(context.extensionPath, relativePath);
    },
    // 获取某个扩展文件的绝对路径（VS Code URL）
    // Get the absolute path of an extension file (VS Code URL)
    getExtensionFileAbsolutePathUrl: function(context, relativePath) {
        return vscode.Uri.file(
            this.getExtensionFileAbsolutePath(context, relativePath));
    },
    // 获取当前工程的名字
    // Get the name of the current project
    getProjectName: function(projectPath) {
        return path.basename(projectPath);
    },
    // 获取当前工程根目录
    // Get the root directory of the current project
    getProjectPath: function(document) {
        if (!document) {
            document = vscode.window.activeTextEditor ?
                vscode.window.activeTextEditor.document : null;
        }
        if (!document) {
            this.showError("The current active editor is not a file or " +
                           "no files are open!");
            return "";
        }

        let projectPath = null;
        let workspaceFolders = vscode.workspace.workspaceFolders.map(
            item => item.uri.path);
        // 由于编辑器可能存在多个根工作区，所以暂时没有特别好的判断方法，目前只能采取非常简单
        // 粗暴的方法，即如果发现只有一个根文件夹，则将其所有子文件夹添加到相应的变量中
        // Because there may be multiple root workspaces in the editor,
        // there is no particularly good judgment method for the time being.
        // At present, we can only take a very simple and crude method,
        // that is, if only one root folder is found, all its subfolders will
        // be added to the corresponding variables
        if (workspaceFolders.length == 1 &&
            workspaceFolders[0] === vscode.workspace.rootPath) {
            const rootPath = workspaceFolders[0];
            var files = fs.readdirSync(rootPath);
            workspaceFolders = files.filter(name => !/^\./g.test(name)).map(
                name => path.resolve(rootPath, name));
        }
        const currentFile = (document.uri ? document.uri : document).fsPath;
        workspaceFolders.forEach(folder => {
            if (currentFile.indexOf(folder) === 0) {
                projectPath = folder;
            }
        })
        if (!projectPath) {
            this.showError("");
            return "";
        }

        return projectPath;
    },
    // 获取某个HTML文件的内容
    // Get the content of an HTML file
    getWebViewContent: function(context, relativePath) {
        const resourcePath = this.getExtensionFileAbsolutePath(context,
                                                               relativePath);
        const dirPath = path.dirname(resourcePath);
        let html = fs.readFileSync(resourcePath, "utf-8");
        // 由于VSCode不支持直接加载本地资源，所以需要将其中的部分内容替换成专有路径格式
        // Because vscode does not support loading local resources directly,
        // some of its contents need to be replaced with proprietary path format
        html = html.replace(
            /(<link.+?href="|<script.+?src="|<img.+?src="|<v-img.+?src=")(.+?)"/g,
            (m, $1, $2) => {
                if ($2.indexOf("http") != -1 || $1.indexOf(":src") != -1) {
                    return m;
                }
                else {
                    let resPath = path.resolve(dirPath, $2);
                    return $1 + vscode.Uri.file(resPath).with({
                        scheme: "vscode-resource"
                    }).toString() + '"';
                }
        });
        return html;
    },
    // 处理来自页面的消息内容
    // Handle message contents from Webview
    handleMessageFromWebview: function(global, message) {
        if (extensionMessageHandlers[message.cmd]) {
            extensionMessageHandlers[message.cmd](global, message);
        }
        else {
            vscode.window.showErrorMessage(
                `Callback method named ${message.cmd} was not found!`);
        }
    }
};
