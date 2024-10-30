"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
var vscode = require("vscode");
var ChatPanel_1 = require("./ChatPanel");
function activate(context) {
    console.log('Chat extension is now active!');
    var disposable = vscode.commands.registerCommand('chatbot.openChat', function () {
        ChatPanel_1.ChatPanel.createOrShow();
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
