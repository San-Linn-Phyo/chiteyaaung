// TODO:: Make users update at realtime.

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserProvider";

export const UsersContext = createContext(undefined);

export default function UsersProvider({ children }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If there is no user already signed in, do nothing.
    // If there is signed in user, but users are already fetched, then do nothing.
    if (!currentUser || users.length > 0) return;

    fetch("http://localhost:3003/api/User/user", { cache: "no-cache" })
      .then((resp) => resp.json())
      .then((data) =>
        setUsers(data.filter((user) => user._id !== currentUser._id))
      )
      .catch((error) =>
        console.error(
          "🚀 ~ file: UsersProvider.js:21 ~ useEffect ~ error:",
          error
        )
      )
      .finally(() => setIsLoading(false));
  }, [currentUser]);

  return (
    <UsersContext.Provider value={{ users, isLoading }}>
      {children}
    </UsersContext.Provider>
  );
}
