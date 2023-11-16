'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from './CurrentUserProvider';
import { SocketContext } from './SocketProvider';

export const UnreadMessagesContext = createContext(undefined);

export default function UnreadMessagesProvider({ children }) {
  const [unreadMessages, setUnreadMessages] = useState([]);
  const { isConnected, socket } = useContext(SocketContext);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!isConnected || !currentUser) return;
    function handleLoadedUnreadMessages(messages) {
      setUnreadMessages(messages);
    }

    function handleNewUnreadMessage(message) {
      setUnreadMessages((prev) => [...prev, message]);
    }

    socket.emit('loadAllUnreadMessages', currentUser._id);
    socket.on('allUnreadMessages', handleLoadedUnreadMessages);
    socket.on('newUnreadMessage', handleNewUnreadMessage);
    return () => {
      socket.off('unreadmessages', handleLoadedUnreadMessages);
      socket.off('newUnreadMessage', handleNewUnreadMessage);
    };
  }, [isConnected]);

  return (
    <UnreadMessagesContext.Provider value={{ unreadMessages }}>
      {children}
    </UnreadMessagesContext.Provider>
  );
}
