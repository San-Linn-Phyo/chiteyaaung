'use client';

import { UsersContext } from '@/app/providers/UsersProvider';
import Link from 'next/link';
import { useContext } from 'react';

export default function RegisteredUsers() {
  const { users, isLoading } = useContext(UsersContext);

  if (isLoading) {
    const fakeUsers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    return (
      <div className="grid pb-4 container mx-auto">
        {fakeUsers.map((_, index) => {
          return (
            <div className="flex items-center gap-4 px-4 py-2" key={index}>
              <div className="w-14 h-14 bg-gray-300 rounded-full relative overflow-hidden animate-pulse shrink-0" />

              <div className="flex-1 grid gap-2">
                <div className="h-4 bg-gray-300 w-1/2 animate-pulse"></div>

                <div className="h-4 bg-gray-300 w-full animate-pulse"></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid pb-4 container mx-auto">
      {[...users].map(([id, user]) => {
        return (
          <div
            className="relative flex items-center gap-4 py-2 px-4 hover:bg-base-200 duration-200"
            key={id}
          >
            <div className="w-14 h-14 bg-gray-300 rounded-full flex-shrink-0 relative">
              <img
                src={user.image}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover object-top"
              />
              {user.isActive && (
                <span className="z-[8] absolute top-0 right-0 translate-x-1/2 w-2 h-2 bg-red-700 rounded-full" />
              )}
            </div>

            <div className="grid gap-1">
              <span className="text-sm font-bold">{user.name}</span>
            </div>

            <Link
              href={`/messages/${user._id}`}
              className="absolute left-0 right-0 top-0 bottom-0 z-10"
            />
          </div>
        );
      })}

      {users.length === 0 && (
        <span className="text-lg text-center">
          There are no registered users.
        </span>
      )}
    </div>
  );
}
