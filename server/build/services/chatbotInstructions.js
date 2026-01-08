"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatbotInstructions = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chatbotInstructions = () => {
    const chatbotTxt = fs_1.default.readFileSync(path_1.default.join(__dirname, "../prompts/chatbot.txt"), "utf-8");
    const gymInfo = fs_1.default.readFileSync(path_1.default.join(__dirname, "../prompts/GoldsGym.md"), "utf-8");
    const instructions = chatbotTxt.replace("{{gymInfo}}", gymInfo);
    if (!instructions) {
        console.error("Missing or invalid instructions");
    }
    return instructions;
};
exports.chatbotInstructions = chatbotInstructions;
