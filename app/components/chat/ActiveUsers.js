'use client';

import { CurrentUserContext } from '@/app/providers/CurrentUserProvider';
import { SocketContext } from '@/app/providers/SocketProvider';
import axios from 'axios';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

export default function ActiveUsers() {
  const [users, setUsers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);
  const { socket, isConnected } = useContext(SocketContext);

  useEffect(() => {
    if (!currentUser) return;

    const fetchActiveUsers = async function () {
      try {
        const url =
          'http://localhost:3003/api/User/active?id=' + currentUser._id;

        const response = await axios.get(url);
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(
          `file: ActiveUsers.js:28 ~ fetchActiveUsers ~ error:`,
          error
        );
      }
    };

    fetchActiveUsers();
  }, [currentUser]);

  useEffect(() => {
    if (!isConnected || !currentUser) return;

    function onReceivingNewActiveUser(activeUser) {
      setUsers((prevUsers) => [...prevUsers, activeUser]);
    }

    function onReceivingNewInActiveUser(inActiveUser) {
      setUsers((prevUsers) => {
        return prevUsers.filter((user) => user._id !== inActiveUser._id);
      });
    }

    socket.on('receiveNewActiveUser', onReceivingNewActiveUser);

    socket.on('receiveNewInActiveUser', onReceivingNewInActiveUser);

    return () => {
      socket.off('receiveNewActiveUser', onReceivingNewActiveUser);
      socket.off('receiveNewInActiveUser', onReceivingNewInActiveUser);
    };
  }, [isConnected, currentUser]);

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-auto py-4 container mx-auto">
        {users.map((_, index) => {
          return (
            <div
              className={`w-14 h-14 bg-gray-300 rounded-full relative overflow-hidden animate-pulse shrink-0 ${
                (index === 0 && 'ms-4') ||
                (index === users.length - 1 && 'me-4')
              }`}
              key={index}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-auto py-4 container mx-auto">
      {users.map((user, index) => {
        return (
          <div className="relative" key={user._id}>
            <img
              src={user.image}
              alt={user.name}
              className={`w-14 h-14 rounded-full object-cover object-top ${
                (index === 0 && 'ms-4') ||
                (index === users.length - 1 && 'me-4')
              }`}
            />
            <span className="z-[8] absolute top-0 right-0 translate-x-1/2 w-2 h-2 bg-red-700 rounded-full" />
            <Link
              href={`/messages/${user._id}`}
              className="absolute left-0 right-0 top-0 bottom-0 z-10"
            />
          </div>
        );
      })}
    </div>
  );
}
