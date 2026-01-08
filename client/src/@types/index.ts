export type MessageType = {
  content: string;
  role: "user" | "assistant";
};

export type ChatResponseType = {
  message: string;
};

export type ChatFormDataType = {
  prompt: string;
};
