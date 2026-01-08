const chatHistory = new Map<string, string>();

export const chatData = {
  getLastResponseId(chatId: string) {
    return chatHistory.get(chatId);
  },

  setLastResponseId(chatId: string, responseId: string) {
    chatHistory.set(chatId, responseId);
  },
};
