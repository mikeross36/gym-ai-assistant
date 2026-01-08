"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageSchema = void 0;
const zod_1 = require("zod");
exports.sendMessageSchema = zod_1.z.object({
    prompt: zod_1.z
        .string()
        .trim()
        .min(1, "Prompt cannot be empty")
        .max(1000, "Prompt is to long. Max 1000 chars"),
    chatId: zod_1.z.string().trim(),
});
