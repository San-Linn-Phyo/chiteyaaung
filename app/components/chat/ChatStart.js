export default function ChatStart({ message, sender }) {
  console.log("Sender ", sender);
  return (
    <div className="chat chat-start">
      <div className="chat-bubble">{message}</div>
      {/* <img src={sender.image} alt={sender.name} width={20} height={20} /> */}
      <span className="text-sm">{sender.name}</span>
    </div>
  );
}
