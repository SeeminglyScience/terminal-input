import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand(
        "terminalInput.sendCustomInput",
        (name: string) => {
            if (name === undefined) {
                return;
            }

            const activeTerminal = vscode.window.activeTerminal;
            if (activeTerminal === undefined) {
                return;
            }

            var config = vscode.workspace.getConfiguration("terminalInput").get("customInputs");
            if (config === undefined) {
                return;
            }

            var input = (config as any)[name] as string;
            if (input === undefined) {
                return;
            }

            activeTerminal.sendText(input, /* addNewLine: */ false);
        });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
