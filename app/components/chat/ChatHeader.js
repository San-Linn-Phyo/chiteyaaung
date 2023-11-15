import { AngleLeft } from '@/app/assets/icons/AngleLeft';
import { Bars } from '@/app/assets/icons/Bars';
import { Info } from '@/app/assets/icons/Info';
import { CurrentUserContext } from '@/app/providers/CurrentUserProvider';
import { SocketContext } from '@/app/providers/SocketProvider';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cookieCutter from 'cookie-cutter';
import ChatHeader from './ChatHeader';

export default function ChatHeader() {
  const [partner, setPartner] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { isConnected, socket } = useContext(SocketContext);
  const { currentUser } = useContext(CurrentUserContext);
  const router = useRouter();

  useEffect(() => {
    if (!uid) return;

    async function fetchUser() {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/User/${uid}`
        );

        setPartner(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(`file: Header.js:32 ~ fetchUser ~ error:`, error);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (!isConnected || !partner) return;

    function onRecevingNewInActiveUser(inActiveUser) {
      if (inActiveUser._id === partner._id) {
        setPartner(inActiveUser);
      }
    }

    socket.on('receiveNewInActiveUser', onRecevingNewInActiveUser);

    return () => {
      socket.off('receiveNewInActiveUser', onRecevingNewInActiveUser);
    };
  }, [isConnected, partner]);

  return (
    <div className="shadow-md">
      <div className="flex items-center px-4 py-2 container mx-auto">
        <Link href="/messages" className="btn btn-ghost">
          <AngleLeft />
        </Link>

        <div className="flex items-center gap-4 ms-4">
          {isLoading ? (
            <div className="w-12 h-12 bg-gray-300 rounded-full relative overflow-hidden animate-pulse shrink-0" />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 relative">
              <img
                src={partner.image}
                alt={partner.name}
                className="w-12 h-12 rounded-full object-cover object-top"
              />
              {partner.isActive && (
                <span className="z-[8] absolute top-0 right-0 translate-x-1/2 w-2 h-2 bg-red-700 rounded-full" />
              )}
            </div>
          )}

          <div className="grid gap-1">
            {isLoading ? (
              <>
                <div className="h-4 bg-gray-300 w-28 animate-pulse" />
                <div className="h-4 bg-gray-300 w-20 animate-pulse" />
              </>
            ) : (
              <>
                <span className="text-sm font-bold">{partner.name}</span>
                {partner.isActive && (
                  <span className="text-sm">Active Now</span>
                )}
              </>
            )}
          </div>
        </div>

        <button
          className="btn btn-ghost ms-auto"
          disabled={isLoading}
          onClick={() => setIsModalOpened(true)}
        >
          <Info />
        </button>
      </div>

      {isModalOpened &&
        createPortal(<Modal />, document.getElementById('user-profile-modal'))}
    </div>
  );
}
