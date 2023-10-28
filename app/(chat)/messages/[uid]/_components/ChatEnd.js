export default function ChatEnd({ message, sender }) {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble">{message}</div>
      <span>{sender}</span>
    </div>
  );
}
