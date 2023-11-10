'use client';
import Greeting from '@/app/assets/icons/Greeting';
import MessagesHistory from '@/app/components/chat/MessagesHistory';
import { CurrentUserContext } from '@/app/providers/CurrentUserProvider';
import { SocketContext } from '@/app/providers/SocketProvider';
import { useContext, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Chat({ user }) {
  const messageInputRef = useRef(null);
  const { isConnected, socket } = useContext(SocketContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [loadMessages, setLoadMessages] = useState([]);

  function sentAMessage(message) {
    const msg = {
      message: message,
      from: currentUser._id,
      to: user._id,
    };
    // socket.emit("messageFromClient", msg);
    // my way
    // TODO:: May be delete this later
    // listen this using "receiveAMessage"
    socket.emit('sendAMessage', msg);
  }

  function clearMessageInput() {
    messageInputRef.current.value = '';
  }

  function onMessageFormSubmit(event) {
    event.preventDefault();
    const message = messageInputRef.current.value;
    sentAMessage(message);
    clearMessageInput();
  }

  useEffect(() => {
    if (!isConnected) return;

    function onLoadedMessage(messages) {
      setLoadMessages(() => messages);
      console.log('LOaded: ', messages);
    }

    // function onMessage(message) {
    //   console.log("onMessage: ", message);
    //   setLoadMessages((prev) => [...prev, message]);

    // if (
    //   message.from._id === user._id ||
    //   message.from._id === currentUser._id
    // ) {
    // }
    // }

    socket.emit('loadmessage', { to: user._id });
    socket.on('loadmessage', onLoadedMessage);
    // socket.on("message", onMessage);

    // my way
    // TODO:: May be delete later

    function onReceivingMessage(message) {
      setLoadMessages((prev) => {
        console.log('Example message: ', prev[0]);
        console.log('Message: ', message);
        return [...prev, message];
      });
    }

    function onReceivingNewUnreadMessage({ sender, message }) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src={sender.image}
                  alt={sender.name}
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {sender.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }

    socket.emit('startsChattingWith', user._id);
    socket.on('receiveAMessage', onReceivingMessage);
    socket.on('newUnreadMessage', onReceivingNewUnreadMessage);

    return () => {
      socket.off('loadmessage', onLoadedMessage);
      // socket.off("message", onMessage);
      // my way
      // TODO:: May be delete later
      socket.off('receiveAMessage', onReceivingMessage);
      socket.off('newUnreadMessage', onReceivingNewUnreadMessage);
    };
  }, [isConnected]);

  return (
    <div className="w-4/5 mx-auto bg-accent rounded-lg h-full max-h-full overflow-auto">
      <div className="p-4 shadow sticky top-0">
        <div className="flex items-center">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
              <img src={user?.image} alt={user?.name} />
            </div>
          </div>
          <span className="ms-4">{user?.name}</span>
        </div>
      </div>

      <div
        className="relative overflow-auto px-4 h-full pt-4"
        style={{ maxHeight: 'calc(100% - 176px)' }}
      >
        {!loadMessages.length ? (
          <div className="grid items-center justify-center h-full">
            <Greeting />
          </div>
        ) : (
          <div className="max-h-full">
            {currentUser && (
              <MessagesHistory messages={loadMessages} from={currentUser._id} />
            )}
          </div>
        )}
      </div>

      <div className="py-6 px-4">
        <form onSubmit={onMessageFormSubmit}>
          <input
            ref={messageInputRef}
            type="text"
            placeholder="Type a message"
            className="input input-bordered input-primary w-full"
          />
        </form>
      </div>

      <Toaster position="bottom-left" reverseOrder={false} />
    </div>
  );
}
