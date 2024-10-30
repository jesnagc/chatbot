"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatPanel = void 0;
var vscode = require("vscode");
var ChatPanel = /** @class */ (function () {
    function ChatPanel(panel) {
        var _this = this;
        this._disposables = [];
        this._panel = panel;
        this._panel.webview.html = this._getWebviewContent();
        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(function (message) {
            switch (message.command) {
                case 'sendMessage':
                    _this._handleChatMessage(message.text);
                    break;
            }
        }, null, this._disposables);
    }
    ChatPanel.createOrShow = function () {
        var column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        if (ChatPanel.currentPanel) {
            ChatPanel.currentPanel._panel.reveal(column);
            return;
        }
        var panel = vscode.window.createWebviewPanel('chatPanel', 'Chat Panel', column || vscode.ViewColumn.One, {
            enableScripts: true
        });
        ChatPanel.currentPanel = new ChatPanel(panel);
    };
    ChatPanel.prototype._getWebviewContent = function () {
        return "\n            <!DOCTYPE html>\n            <html>\n            <head>\n                <style>\n                    body {\n                        padding: 0;\n                        margin: 0;\n                    }\n                    #chat-container {\n                        display: flex;\n                        flex-direction: column;\n                        height: 100vh;\n                        padding: 10px;\n                    }\n                    #messages {\n                        flex: 1;\n                        overflow-y: auto;\n                        margin-bottom: 10px;\n                        padding: 10px;\n                        border: 1px solid var(--vscode-input-border);\n                        border-radius: 4px;\n                    }\n                    #input-container {\n                        display: flex;\n                        gap: 8px;\n                    }\n                    #message-input {\n                        flex: 1;\n                        padding: 8px;\n                        border: 1px solid var(--vscode-input-border);\n                        background: var(--vscode-input-background);\n                        color: var(--vscode-input-foreground);\n                        border-radius: 4px;\n                    }\n                    button {\n                        padding: 8px 16px;\n                        background: var(--vscode-button-background);\n                        color: var(--vscode-button-foreground);\n                        border: none;\n                        border-radius: 4px;\n                        cursor: pointer;\n                    }\n                    button:hover {\n                        background: var(--vscode-button-hoverBackground);\n                    }\n                    .message {\n                        margin: 8px 0;\n                        padding: 8px;\n                        border-radius: 4px;\n                        background: var(--vscode-editor-background);\n                    }\n                </style>\n            </head>\n            <body>\n                <div id=\"chat-container\">\n                    <div id=\"messages\"></div>\n                    <div id=\"input-container\">\n                        <input type=\"text\" id=\"message-input\" placeholder=\"Type your message...\">\n                        <button onclick=\"sendMessage()\">Send</button>\n                    </div>\n                </div>\n\n                <script>\n                    const vscode = acquireVsCodeApi();\n                    const messageInput = document.getElementById('message-input');\n                    const messagesDiv = document.getElementById('messages');\n\n                    function sendMessage() {\n                        const text = messageInput.value.trim();\n                        if (text) {\n                            vscode.postMessage({\n                                command: 'sendMessage',\n                                text: text\n                            });\n                            \n                            addMessage('You: ' + text);\n                            messageInput.value = '';\n                        }\n                    }\n\n                    function addMessage(message) {\n                        const messageElement = document.createElement('div');\n                        messageElement.className = 'message';\n                        messageElement.textContent = message;\n                        messagesDiv.appendChild(messageElement);\n                        messagesDiv.scrollTop = messagesDiv.scrollHeight;\n                    }\n\n                    messageInput.addEventListener('keypress', (e) => {\n                        if (e.key === 'Enter') {\n                            sendMessage();\n                        }\n                    });\n                </script>\n            </body>\n            </html>\n        ";
    };
    ChatPanel.prototype._handleChatMessage = function (text) {
        // Echo back the message for now
        this._panel.webview.postMessage({
            command: 'response',
            text: "Bot: You said \"".concat(text, "\"")
        });
    };
    return ChatPanel;
}());
exports.ChatPanel = ChatPanel;
