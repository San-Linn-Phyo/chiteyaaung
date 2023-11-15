'use client';

import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CurrentUserContext = createContext(undefined);

export default function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(undefined);
  const { get } = useLocalStorage();

  useEffect(() => {
    const user = get('user_data');
    if (!user) return;
    setCurrentUser(JSON.parse(user));
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
