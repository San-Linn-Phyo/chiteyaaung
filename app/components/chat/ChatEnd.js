export default function ChatEnd({ message, sender }) {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble">{message}</div>
      {/* <img src={sender.image} alt={sender.name} width={20} height={20} /> */}
      <span className="text-sm">{sender.name}</span>
    </div>
  );
}
