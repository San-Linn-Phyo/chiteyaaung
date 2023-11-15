'use client';

import { AngleLeft } from '@/app/assets/icons/AngleLeft';
import { Bars } from '@/app/assets/icons/Bars';
import { Info } from '@/app/assets/icons/Info';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import { CurrentUserContext } from '@/app/providers/CurrentUserProvider';
import { SocketContext } from '@/app/providers/SocketProvider';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Header({ uid }) {
  const [partner, setPartner] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { isConnected, socket } = useContext(SocketContext);
  const { currentUser } = useContext(CurrentUserContext);
  const { remove } = useLocalStorage();
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

  if (uid) {
    return (
      <div className="shadow-md relative z-[1000]">
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

          <div className="relative ms-auto">
            <button
              disabled={isLoading}
              className="btn btn-ghost"
              onClick={() => setIsModalOpened(!isModalOpened)}
            >
              <Info />
            </button>

            <ul
              className={`menu bg-base-200 w-56 rounded-box absolute top-full right-0 ${
                !isModalOpened && 'hidden'
              }`}
            >
              <li>
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-60 h-60 object-cover object-top"
                />
                <p>
                  Age: <span>{partner.age}</span>
                </p>
                <p>
                  Gender: <span>{partner.gender}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-md relative z-[1000]">
      <div className="flex items-center justify-between gap-4 px-4 py-2 container mx-auto">
        <span className="font-bold tracking-wider">Chiteyaaung</span>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="rounded-full flex-shrink-0 flex items-center gap-2">
              <img
                src={currentUser.image}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover object-top"
              />

              <span className="text-sm font-bold hidden sm:inline">
                {currentUser.name}
              </span>
            </div>
          ) : (
            <div className="rounded-full flex-shrink-0 flex items-center gap-2 animate-pulse">
              <div className="w-8 h-8 bg-gray-300 rounded-full shrink-0"></div>
              <div className="w-10 h-2 bg-gray-300 shrink-0"></div>
            </div>
          )}

          <div className="relative">
            <button
              className="btn btn-ghost"
              onClick={() => setIsModalOpened(!isModalOpened)}
            >
              <Bars />
            </button>

            <ul
              className={`menu bg-base-200 w-56 rounded-box absolute top-full right-0 ${
                !isModalOpened && 'hidden'
              }`}
            >
              <li>
                <button
                  className="btn btn-error content-center"
                  onClick={() => {
                    remove('user_data');
                    router.push('/signin');
                  }}
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
