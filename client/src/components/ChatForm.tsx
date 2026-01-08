import { ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import type { ChatFormDataType } from "@/@types";

type PropsType = {
  handleFormSubmit: (data: ChatFormDataType) => Promise<void>;
  isLoading: boolean;
};

const ChatForm = ({ handleFormSubmit, isLoading }: PropsType) => {
  const { register, handleSubmit, setValue, formState } =
    useForm<ChatFormDataType>({
      defaultValues: { prompt: "" },
    });

  const onSubmit = handleSubmit((data) => {
    handleFormSubmit(data);
    setValue("prompt", "");
  });

  const handleEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={onSubmit}
        onKeyDown={handleEnter}
        className="flex flex-col gap-2 items-end border-2 p-4 rounded-xl"
      >
        <div className="w-full">
          <textarea
            {...register("prompt", {
              required: true,
              validate: (data) => data?.trim().length > 0,
            })}
            className="textarea w-full border-none focus:outline-0"
            placeholder="Ask anything.."
            disabled={isLoading}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={!formState.isValid || isLoading}
          className="btn btn-success w-20 rounded-full"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <ArrowUpRight size={28} color="white" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
