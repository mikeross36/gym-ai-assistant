"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatData = void 0;
const chatHistory = new Map();
exports.chatData = {
    getLastResponseId(chatId) {
        return chatHistory.get(chatId);
    },
    setLastResponseId(chatId, responseId) {
        chatHistory.set(chatId, responseId);
    },
};
