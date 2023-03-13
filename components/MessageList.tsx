"use client";
import fetcher from "@/lib/fetchMessages";
import { clientPusher } from "@/pusher";
import { Message } from "@/typings";
import { useEffect } from "react";
import useSWR from "swr";
import MessageComponent from "./MessageComponent";

type Props = {
  initialMessages: Message[];
};

const MessageList = ({ initialMessages }: Props) => {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data: Message) => {
      // if you sent the message, no need to update cache
      if (messages?.find((message) => message.id === data.id)) return;
      if (!messages) mutate(fetcher("/api/getMessages"));
      else {
        await mutate(fetcher("/api/getMessages"), {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    });
  }, [messages, mutate]);

  return (
    <div className="max-w-2xl px-5 pt-8 pb-32 mx-auto space-y-5 xl:max-w-4xl">
      {(messages || initialMessages).map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
