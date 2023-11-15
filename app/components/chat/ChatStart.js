export default function ChatStart({ message, sender }) {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-8 rounded-full">
          <img
            src={sender.image}
            alt={sender.name}
            className="w-8 h-8 rounded-full object-cover object-top"
          />
        </div>
      </div>
      <div className="chat-bubble">{message}</div>
    </div>
  )
}
