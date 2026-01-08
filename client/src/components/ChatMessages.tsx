import { useRef, useEffect } from "react";
import type { MessageType } from "@/@types";
import ReactMarkdown from "react-markdown";
import { TypingIndicator } from "@/components";

type PropsType = {
  messages: MessageType[];
  isLoading: boolean;
};

const ChatMessages = ({ messages, isLoading }: PropsType) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-3">
      {messages.map((message, idx) => {
        return (
          <article
            key={idx}
            ref={idx === messages.length - 1 ? lastMessageRef : null}
            className={`max-w-md px-3 py-1 rounded-xl text-sm md:text-base ${
              message.role === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-100 text-black self-start"
            }`}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </article>
        );
      })}
      {isLoading && (
        <div className="self-start">
          <TypingIndicator visible={isLoading} />
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
