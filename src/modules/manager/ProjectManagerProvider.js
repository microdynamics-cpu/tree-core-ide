
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

class ProjectManagerProvider {
    constructor(workspaceRoot) {
        this.workspaceRoot = workspaceRoot;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No dependency in empty workspace');
            return Promise.resolve([]);
        }

        if (element) {
            const dataJsonPath = path.join(this.workspaceRoot, '/demo/data.json');
            return Promise.resolve(this.getDepsInPackageJson(dataJsonPath, element.vid));
        }

        else {
            const dataJsonPath = path.join(this.workspaceRoot, '/demo/data.json');
            if (this.pathExists(dataJsonPath)) {
                return Promise.resolve(this.getDepsInPackageJson(dataJsonPath));
            }
            else {
                vscode.window.showInformationMessage('Workspace has no data.json');
                return Promise.resolve([]);
            }
        }
    }

    /**
     * Given the path to package.json, read all its dependencies and devDependencies.
     */
    getDepsInPackageJson(dataJsonPath, str = '') {
        if (this.pathExists(dataJsonPath)) {
            const dataJson = JSON.parse(fs.readFileSync(dataJsonPath, 'utf-8'));
            const structJson = JSON.parse(fs.readFileSync(path.join(this.workspaceRoot, '/demo/struct.json'), 'utf-8'));

            const getModule = (vid, obj, filePath) => {
                if (obj.children && Object.keys(obj.children).length > 0) {
                    return new Dependency(vid, obj.instName, filePath, vscode.TreeItemCollapsibleState.Collapsed);
                }
                else {
                    return new Dependency(vid, obj.instName, filePath, vscode.TreeItemCollapsibleState.None, {
                        command: 'extension.openPackageOnNpm',
                        title: '',
                        arguments: [filePath]
                    });
                }
            };

            const moduleName = [];
            if (str === '') {
                for (let id in dataJson) {
                    if (dataJson[id].parent) continue;
                    moduleName.push(getModule(id, dataJson[id], structJson[dataJson[id].moduleName]));
                }
            }
            else {
                let obj;
                let isFirst = true
                // get the parent's node pos
                for (let val in structJson[str]) {
                    if (isFirst) {
                        isFirst = false;
                        obj = dataJson[structJson[str][val]];
                    }
                    else {
                        if(obj) {
                            obj = obj.children[structJson[str][val]];
                        }
                    }
                }

                for(let chd in obj.children) {
                    moduleName.push(getModule(chd, obj.children[chd], structJson[obj.children[chd].moduleName]));
                }

            }

            return moduleName;
        }
        else {
            return [];
        }
    }

    pathExists(p) {
        try {
            fs.accessSync(p);
        }
        catch (err) {
            return false;
        }
        return true;
    }
}

class Dependency extends vscode.TreeItem {
    constructor(vid, label, filePath, collapsibleState, command) {
        super(label, collapsibleState);
        this.vid = vid;
        this.label = label;
        this.filePath = filePath;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.iconPath = {
            light: path.join(__filename, '..', '..', '..', '..', 'resources', 'light', 'dependency.svg'),
            dark: path.join(__filename, '..', '..', '..', '..', 'resources', 'dark', 'dependency.svg')
        };

        this.contextValue = 'dependency';
        this.tooltip = `${this.label}`;
        this.description = `${this.filePath}`;
    }
}

module.exports = { ProjectManagerProvider };