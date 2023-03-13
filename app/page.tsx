import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import { Message } from "@/typings";
import { getServerSession } from "next-auth";
import Providers from "./providers";

export default async function HomePage() {
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  ).then((res) => res.json());
  const messages: Message[] = data.messages;
  const session = await getServerSession();

  return (
    <Providers session={session}>
      <main className="">
        <MessageList initialMessages={messages} />
        <ChatInput />
      </main>
    </Providers>
  );
}
