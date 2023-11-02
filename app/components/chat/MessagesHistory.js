import ChatEnd from "@/app/components/chat/ChatEnd";
import ChatStart from "@/app/components/chat/ChatStart";

export default function MessagesHistory({ messages, from }) {
  console.log("MessagesHistory", messages);
  return (
    <>
      {messages.map((message) => {
        if (message.from._id === from) {
          return (
            <ChatEnd
              message={message.message}
              sender={message.from}
              key={message._id}
            />
          );
        }

        return (
          <ChatStart
            message={message.message}
            sender={message.from}
            key={message._id}
          />
        );
      })}
    </>
  );
}
