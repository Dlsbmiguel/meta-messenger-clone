import { Message } from "@/typings";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import TimeAgo from "react-timeago";

type Props = {
  message: Message;
};

const MessageComponent = ({ message }: Props) => {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setDate(new Date(message.created_at));
  }, [message.created_at]);

  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          src={message.profilePic}
          alt="Profile Picture"
          height={10}
          width={50}
          className="mx-2 rounded-full"
        />
      </div>

      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {message.username}
        </p>

        <div className="flex items-end">
          <div
            className={`px-3 py-2 text-white  rounded-lg w-fit ${
              isUser ? "bg-blue-400 ml-auto order-2" : "bg-red-400"
            }`}
          >
            <p>{message.message}</p>
          </div>

          <p
            className={`text-[0.65rem] italic px-2 text-gray-300 ${
              isUser && "text-right"
            }`}
          >
            {date && <TimeAgo date={date.toLocaleString()} />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
