'use client';

import { LocationArrow } from '@/app/assets/icons/LocationArrow';
import { CurrentUserContext } from '@/app/providers/CurrentUserProvider';
import { SocketContext } from '@/app/providers/SocketProvider';
import { useContext, useRef } from 'react';

export default function SendMessage({ uid }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { socket, isConnected } = useContext(SocketContext);
  const messageInputRef = useRef(null);

  function clearMessageInput() {
    messageInputRef.current.value = '';
  }

  function sentAMessage(message) {
    if (!currentUser) return console.log('currentUser is null');
    if (!isConnected) return console.log('Socket is not connected');

    const msg = {
      message: message,
      from: currentUser._id,
      to: uid,
    };
    socket.emit('sendAMessage', msg);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const message = messageInputRef.current.value;
    sentAMessage(message);
    clearMessageInput();
  }

  return (
    <form
      className="py-6 px-4 flex items-end gap-4 container mx-auto"
      onSubmit={handleFormSubmit}
    >
      <textarea
        ref={messageInputRef}
        placeholder="Ae"
        className="textarea textarea-bordered h-12 py-2 resize-none w-full"
      ></textarea>

      <button className="btn btn-accent">
        <LocationArrow className="w-5 h-5" />
      </button>
    </form>
  );
}
