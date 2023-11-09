'use client';

import { Notifications } from '@/app/assets/icons/Notifications';
import { NotificationsActive } from '@/app/assets/icons/NotificationsActive';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import { CurrentUserContext } from '@/app/providers/CurrentUserProvider';
import { UnreadMessagesContext } from '@/app/providers/UnreadMessagesProvider';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default function Header() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { unreadMessages } = useContext(UnreadMessagesContext);
  const { remove } = useLocalStorage();
  const router = useRouter();
  function signUserOut() {
    remove('user_data');
    setCurrentUser(undefined);
    router.push('/');
  }

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

        <div className="lg:flex items-center">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
              <img
                src={currentUser?.image}
                alt={currentUser?.name}
                className="w-12 h-12"
              />
            </div>
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
