const fs     = require("fs");
const path   = require("path");
const vscode = require("vscode");

const extnMsgHandlers = {
    addExtnProjectDir: async function(global, msg) {
        const path = msg.param.path;
        console.log(path);

        // 根据模板生成对应的目录和文件
        // Generate corresponding directories and files according to the
        // template
        fs.mkdirSync(path, {
            recursive: false
        });
        fs.mkdirSync(path + "/src");
        const fd = fs.openSync(path + "/.gitignore", "w+");
        fs.writeFileSync(fd, "/build\n");
        const pathTree = path + "/tree";
        fs.mkdirSync(pathTree);
        fs.mkdirSync(pathTree + "/build");
        fs.mkdirSync(pathTree + "/lib");
        fs.mkdirSync(pathTree + "/sim");
        fs.mkdirSync(pathTree + "/test");
        fs.openSync(pathTree + "/project.json", "w+");

        // 将生成的工程目录添加到工作空间中
        // Add the generated project catalog to the workspace
        let addFlag = false;
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders) {
            addFlag = vscode.workspace.updateWorkspaceFolders(
                vscode.workspace.workspaceFolders.length,
                null, {
                    uri: vscode.Uri.file(path)
                });
        }
        else {
            await vscode.commands.executeCommand("vscode.openFolder",
                                                 vscode.Uri.file(path));
            addFlag = true;
        }
        vscode.commands.executeCommand("workbench.view.explorer");

        sendExtnMsgToView(global.panel, msg, addFlag);
    },
    getExtnConfig: function(global, msg) {
        const param = msg.param;
        const data = vscode.workspace.getConfiguration().get(param.key);
        sendExtnMsgToView(global.panel, msg, data);
    },
    getExtnFileDirPath: async function(global, msg) {
        const param = msg.param;
        let data = {
            flag: true,
            path: ""
        }
        if (param.type === "name" && param.path === "") {
            data.flag = true;
        }
        else {
            let uri = null;
            if (param.type === "name") {
                uri = vscode.Uri.file(param.path);
            }
            else if (param.type === "dir") {
                const uris = await vscode.window.showOpenDialog({
                    canSelectFiles: false,
                    canSelectFolders: true,
                    canSelectMany: false
                });
                if (uris != undefined && uris.length > 0) {
                    uri = uris[0];
                    data.path = uri.path;
                }
            }
            const dirs = await vscode.workspace.fs.readDirectory(uri);
            const dirsStr = JSON.stringify(dirs);
            const name = param.name;
            if (dirsStr.indexOf(name) != -1) {
                data.flag = false;
            }
        }
        sendExtnMsgToView(global.panel, msg, data);
    },
    openExtnProjectDir: async function(global, msg) {
        const uris = await vscode.window.showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false
        });
        let path = "";
        if (uris != undefined && uris.length > 0) {
            const uri = uris[0];
            path = uri.path;
        }
        console.log(path);

        // 判断当前选择的路径是否为木心工程目录
        // Judge whether the currently selected path is the project directory
        // of TreeCore
        let openFlag = false;
        if (fs.existsSync(path + "/tree")) {
            openFlag = true;
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders) {
                vscode.workspace.updateWorkspaceFolders(
                    vscode.workspace.workspaceFolders.length,
                    null, {
                        uri: vscode.Uri.file(path)
                    });
            }
            else {
                await vscode.commands.executeCommand("vscode.openFolder",
                                                     vscode.Uri.file(path));
            }
            vscode.commands.executeCommand("workbench.view.explorer");
            extn.showExtnInfoMsg("打开成功！");
        }
        else {
            openFlag = false;
            if (path !== "") {
                extn.showExtnWarnMsg("打开失败，当前选择的路径不是木心工程目录！");
            }
        }

        sendExtnMsgToView(global.panel, msg, openFlag);
    },
    setExtnConfig: function(global, msg) {
        const param = msg.param;
        vscode.workspace.getConfiguration().update(param.key, param.val, true);
        if (param.show) {
            extn.showExtnInfoMsg("更新成功！");
        }
    },
};

function sendExtnMsgToView(panel, msg, data) {
    console.log("msgCallback: ");
    console.log(data);
    if (typeof(data) === "object") {
        let code = data.code;
        if (code && code >= 400 && code < 600) {
            extn.showExtnWarnMsg(
                "An unknown error occurred in" + msg.cmd + "!");
        }
    }
    panel.webview.postMessage({
        cmd: "extnCallback",
        cid:  msg.cid,
        data: data
    });
};

const extn = {
    // 获取某个扩展文件的绝对路径
    // Get the absolute path of an extension file
    getExtnFileAbsolutePath: function(context, relativePath) {
        return path.join(context.extensionPath, relativePath);
    },
    // 获取某个扩展文件的绝对路径（VS Code URL）
    // Get the absolute path of an extension file (VS Code URL)
    getExtnFileAbsolutePathUrl: function(context, relativePath) {
        return vscode.Uri.file(
            this.getExtnFileAbsolutePath(context, relativePath));
    },
    // 获取当前工程的名字
    // Get the name of the current project
    getExtnProjectName: function(projectPath) {
        return path.basename(projectPath);
    },
    // 获取当前工程根目录
    // Get the root directory of the current project
    getExtnProjectPath: function(document) {
        if (!document) {
            document = vscode.window.activeTextEditor ?
                vscode.window.activeTextEditor.document : null;
        }
        if (!document) {
            this.showExtnErrorMsg("The current active editor is not a file or " +
                                  "no files are open!");
            return "";
        }

        let projectPath = null;
        let workspaceFolders = vscode.workspace.workspaceFolders.map(
            (item) => item.uri.path);
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
            workspaceFolders = files.filter((name) => !/^\./g.test(name)).map(
                name => path.resolve(rootPath, name));
        }
        const currentFile = (document.uri ? document.uri : document).fsPath;
        workspaceFolders.forEach((folder) => {
            if (currentFile.indexOf(folder) === 0) {
                projectPath = folder;
            }
        })
        if (!projectPath) {
            this.showExtnErrorMsg("");
            return "";
        }

        return projectPath;
    },
    // 获取某个HTML文件的内容
    // Get the content of an HTML file
    getExtnContentFromView: function(context, relativePath) {
        const resourcePath = this.getExtnFileAbsolutePath(context,
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
    // Handle message contents from webview
    handleExtnMsgFromView: function(global, msg) {
        if (extnMsgHandlers[msg.cmd]) {
            extnMsgHandlers[msg.cmd](global, msg);
        }
        else {
            this.showExtnWarnMsg(
                `Callback method named ${msg.cmd} was not found!`);
        }
    },
    // 显示错误弹窗消息
    // Show error pop-up message
    showExtnErrorMsg: function(msg) {
        vscode.window.showErrorMessage(msg)
    },
    // 显示提示弹窗信息
    // Show error pop-up message
    showExtnInfoMsg: function(msg) {
        vscode.window.showInformationMessage(msg);
    },
    // 显示警告弹窗信息
    // Show warning pop-up message
    showExtnWarnMsg: function(msg) {
        vscode.window.showWarningMessage(msg);
    }
}

module.exports = extn;
