"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAnswer = void 0;
const chatbotSchema_1 = require("../schemas/chatbotSchema");
const openai_1 = __importDefault(require("openai"));
const logger_1 = __importDefault(require("../utils/logger"));
const chatbotData_1 = require("../data/chatbotData");
const chatbotInstructions_1 = require("../services/chatbotInstructions");
const client = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
const llm = process.env.LLM;
const instructions = (0, chatbotInstructions_1.chatbotInstructions)();
const sendAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!client || !llm) {
        logger_1.default.error("OpenAI client or LLM are missing in env file");
        throw new Error("OpenAI client or LLM are missing in env file");
    }
    if (!instructions) {
        logger_1.default.error("Invalid chatbot instructions");
    }
    try {
        const parsed = chatbotSchema_1.sendMessageSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(parsed.error);
        }
        const { prompt, chatId } = parsed.data;
        if (!prompt || !chatId) {
            return res.status(400).json({ message: "Missing parsed data" });
        }
        const response = yield client.responses.create({
            model: llm,
            instructions,
            input: prompt,
            temperature: 0.2,
            max_output_tokens: 100,
            previous_response_id: chatbotData_1.chatData.getLastResponseId(chatId),
        });
        if (!response || !(response === null || response === void 0 ? void 0 : response.id) || !(response === null || response === void 0 ? void 0 : response.output_text)) {
            logger_1.default.error("Invalid response from OpenAI");
            throw new Error("Invalid response from OpenAI");
        }
        chatbotData_1.chatData.setLastResponseId(chatId, response.id);
        return res
            .status(200)
            .json({ id: response.id, message: response.output_text });
    }
    catch (err) {
        if (err instanceof Error) {
            logger_1.default.error(`Failed to generate response from OpenAI: ${err}`);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.sendAnswer = sendAnswer;
