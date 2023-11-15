'use client';

import { CurrentUserContext } from '@/app/providers/CurrentUserProvider';
import { useContext } from 'react';

export default function UserAvatar() {
  const { currentUser } = useContext(CurrentUserContext);

  if (!currentUser) {
    return (
      <div className="rounded-full flex-shrink-0 flex items-center gap-2 animate-pulse">
        <div className="w-8 h-8 bg-gray-300 rounded-full shrink-0"></div>
        <div className="w-10 h-2 bg-gray-300 shrink-0"></div>
      </div>
    );
  }

  return (
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
  );
}
