export default function ChatStart({ message, sender }) {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble">{message}</div>
      <span>{sender}</span>
    </div>
  );
}
