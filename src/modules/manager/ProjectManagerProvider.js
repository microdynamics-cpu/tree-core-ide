
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
            const dataJsonPath = path.join(this.workspaceRoot, 'data.json');
            return Promise.resolve(this.getDepsInPackageJson(dataJsonPath, element.id));
        }

        else {
            const dataJsonPath = path.join(this.workspaceRoot, 'data.json');
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

            const getModule = (obj, id) => {
                if (obj.children && obj.children.length > 0) {
                    return new Dependency(id, obj.moduleName, vscode.TreeItemCollapsibleState.Collapsed);
                }
                else {
                    return new Dependency(id, obj.moduleName, vscode.TreeItemCollapsibleState.None, {
                        command: 'extension.openPackageOnNpm',
                        title: '',
                        arguments: [obj.moduleName]
                    });
                }
            };
            
            const moduleName = [];
            if(str === '') {
                for (let id in dataJson) {
                    if(dataJson[id].parent) continue;
                    moduleName.push(getModule(dataJson[id], id));
                    
                }
            }
            else {
                for (let val in dataJson[str].children) {

                    let id = dataJson[str].children[val];
                    console.log(id);
                    moduleName.push(getModule(dataJson[id], id));
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
    constructor(vid, label, collapsibleState, command) {
        super(label, collapsibleState);
        this.vid = vid;
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.iconPath = {
            light: path.join(__filename, '..', '..', '..', '..', 'resources', 'light', 'dependency.svg'),
            dark: path.join(__filename, '..', '..', '..', '..', 'resources', 'dark', 'dependency.svg')
        };

        this.contextValue = 'dependency';
        this.tooltip = `${this.label}`;
        this.description = this.label;
    }
}

module.exports = { ProjectManagerProvider };