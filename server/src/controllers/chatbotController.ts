import { Request, Response } from "express";
import { sendMessageSchema } from "../schemas/chatbotSchema";
import OpenAI from "openai";
import logger from "../utils/logger";
import { chatData } from "../data/chatbotData";
import { chatbotInstructions } from "../services/chatbotInstructions";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const llm = process.env.LLM as string;
const instructions = chatbotInstructions();

export const sendAnswer = async (req: Request, res: Response) => {
  if (!client || !llm) {
    logger.error("OpenAI client or LLM are missing in env file");
    throw new Error("OpenAI client or LLM are missing in env file");
  }
  if (!instructions) {
    logger.error("Invalid chatbot instructions");
  }
  try {
    const parsed = sendMessageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }
    const { prompt, chatId } = parsed.data;
    if (!prompt || !chatId) {
      return res.status(400).json({ message: "Missing parsed data" });
    }
    const response = await client.responses.create({
      model: llm,
      instructions,
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 100,
      previous_response_id: chatData.getLastResponseId(chatId),
    });
    if (!response || !response?.id || !response?.output_text) {
      logger.error("Invalid response from OpenAI");
      throw new Error("Invalid response from OpenAI");
    }
    chatData.setLastResponseId(chatId, response.id);
    return res
      .status(200)
      .json({ id: response.id, message: response.output_text });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Failed to generate response from OpenAI: ${err}`);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
