import { useState, useRef } from "react";
import type { MessageType, ChatFormDataType, ChatResponseType } from "@/@types";
import axios from "axios";
import { ChatForm, ChatMessages } from "@/components";
import pop from "@/assets/sounds/pop.mp3";
import notification from "@/assets/sounds/notification.mp3";

const popSound = new Audio(pop);
const notificationSound = new Audio(notification);
popSound.volume = 0.2;
notificationSound.volume = 0.2;

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Chatbot = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatId = useRef(crypto.randomUUID());

  const handleFormSubmit = async ({ prompt }: ChatFormDataType) => {
    try {
      if (!chatId.current) {
        throw new Error("Chat ID not found");
      }
      setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
      popSound
        .play()
        .catch((err) => console.error("Error playing pop sound", err));
      setIsLoading(true);
      const { data } = await axios.post<ChatResponseType>(`${baseUrl}/chats`, {
        prompt,
        chatId: chatId.current,
      });
      if (!data || !data.message) {
        throw new Error("No response data from server");
      }
      setMessages((prev) => [
        ...prev,
        { content: data.message, role: "assistant" },
      ]);
      notificationSound
        .play()
        .catch((err) =>
          console.error("Error playing notification sound:", err)
        );
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error sending message to server:", err.message);
        throw err;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-full flex flex-col">
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </div>
      <ChatForm handleFormSubmit={handleFormSubmit} isLoading={isLoading} />
    </main>
  );
};

export default Chatbot;
