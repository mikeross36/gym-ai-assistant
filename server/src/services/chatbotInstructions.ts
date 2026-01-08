import fs from "fs";
import path from "path";

export const chatbotInstructions = () => {
  const chatbotTxt = fs.readFileSync(
    path.join(__dirname, "../prompts/chatbot.txt"),
    "utf-8"
  );
  const gymInfo = fs.readFileSync(
    path.join(__dirname, "../prompts/GoldsGym.md"),
    "utf-8"
  );
  const instructions = chatbotTxt.replace("{{gymInfo}}", gymInfo);
  if (!instructions) {
    console.error("Missing or invalid instructions");
  }
  return instructions;
};
