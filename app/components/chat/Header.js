'use client';

import { Notifications } from '@/app/assets/icons/Notifications';
import { NotificationsActive } from '@/app/assets/icons/NotificationsActive';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import { CurrentUserContext } from '@/app/providers/CurrentUserProvider';
import { SocketContext } from '@/app/providers/SocketProvider';
import { UnreadMessagesContext } from '@/app/providers/UnreadMessagesProvider';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function Header() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { unreadMessages } = useContext(UnreadMessagesContext);
  const { remove } = useLocalStorage();
  const [isUserActive, setIsUserActive] = useState(false);
  const { isConnected, socket } = useContext(SocketContext);
  const router = useRouter();
  function signUserOut() {
    remove('user_data');
    setCurrentUser(undefined);
    router.push('/');
  }

  useEffect(() => {
    if (!isConnected) return;

    function onUserStatus({ activeUserID, status }) {
      if (activeUserID === currentUser._id) setIsUserActive(status);
      console.log('onUserStatus: ', status);
    }

    socket.emit('user-connect');
    socket.on('userStatus', onUserStatus);

    return () => {
      socket.off('userStatus', onUserStatus);
    };
  }, [isConnected]);

  return (
    <div className="flex items-center justify-between py-4 px-4 lg:px-8 shadow-md">
      <h1 className="text-xl lg:text-2xl">Chityaaung</h1>

      <div className="flex items-center lg:gap-8">
        <button className="btn btn-ghost">
          {unreadMessages && unreadMessages.length > 0 ? (
            <NotificationsActive className="text-primary text-3xl" />
          ) : (
            <Notifications className="text-neutral text-3xl" />
          )}
        </button>

        <div className="lg:flex items-center relative">
          <div className="avatar placeholder">
            <div
              className={`bg-neutral-focus text-neutral-content rounded-full w-12 ring-primary ring-offset-base-100 ring-offset-2 ${
                isUserActive && 'ring'
              }`}
            >
              <img
                src={currentUser?.image}
                alt={currentUser?.name}
                className="w-12 h-12"
              />
            </div>

            <span
              className={`absolute top-0 right-0 w-2 h-2 bg-success rounded-full -translate-y-full ${
                !isUserActive && 'hidden'
              }`}
            />
          </div>

          <span className="hidden lg:inline ms-4">{currentUser?.name}</span>
        </div>

        <button
          className="btn btn-error hidden lg:inline-block"
          onClick={signUserOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
