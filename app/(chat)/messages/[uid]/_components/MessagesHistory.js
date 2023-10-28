import ChatEnd from "@/app/(chat)/messages/[uid]/_components/ChatEnd";
import ChatStart from "@/app/(chat)/messages/[uid]/_components/ChatStart";

export default function MessagesHistory({ messages, from }) {
  return (
    <>
      {messages.map((message) => {
        if (message.from._id === from) {
          return (
            <ChatEnd
              message={message.message}
              sender={message.from.name}
              key={message._id}
            />
          );
        }

        return (
          <ChatStart
            message={message.message}
            sender={message.from.name}
            key={message._id}
          />
        );
      })}
    </>
  );
}
