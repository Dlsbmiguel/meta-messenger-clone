"use client";

import { Message } from "@/typings";
import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import useSWR from "swr";
import fetcher from "@/lib/fetchMessages";
import { useSession } from "next-auth/react";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session || !input) return;

    const messageToSend = input;

    setInput("");

    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());

      return [data.message, ...messages!];
    };

    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 flex w-full px-10 py-5 space-x-2 bg-white border-t border-gray-100"
    >
      <input
        type="text"
        value={input}
        disabled={!session}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a message here..."
        className="flex-1 px-5 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="blueBtn disabled:opacity-50 disabled:cursor-not-allowed "
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
