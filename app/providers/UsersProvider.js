// TODO:: Make users update at realtime.

'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from './CurrentUserProvider'
import axios from 'axios'
import { SocketContext } from './SocketProvider'

export const UsersContext = createContext(undefined)

export default function UsersProvider({ children }) {
  const { currentUser } = useContext(CurrentUserContext)
  const [users, setUsers] = useState(new Map([]))
  const [isLoading, setIsLoading] = useState(true)
  const { isConnected, socket } = useContext(SocketContext)

  useEffect(() => {
    // If there is no user already signed in, do nothing.
    // If there is signed in user, but users are already fetched, then do nothing.
    if (!currentUser || users.length > 0) return

    async function fetchUsers() {
      try {
        const url = 'http://localhost:3003/api/User/users?id=' + currentUser._id
        const { data } = await axios.get(url)
        setUsers(() => {
          const usersMap = new Map([])
          data.forEach((user) => {
            usersMap.set(user._id, user)
          })
          return usersMap
        })
      } catch (error) {
        console.log(`file: UsersProvider.js:27 ~ fetchUsers ~ error:`, error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [currentUser])

  useEffect(() => {
    if (!isConnected) return

    function onReceivingNewActiveUser(user) {
      if (users.get(user._id)) {
        setUsers((prevUsers) => {
          const activeUser = prevUsers.get(user._id)
          return new Map([
            ...prevUsers,
            [activeUser._id, { ...activeUser, isActive: true }],
          ])
        })
      } else {
        // new user logged in
        setUsers((prevUsers) => new Map([...prevUsers, [user._id, user]]))
      }
    }

    function onReceivingNewInActiveUser(user) {
      setUsers((prevUsers) => {
        const inActiveUser = prevUsers.get(user._id)
        return new Map([
          ...prevUsers,
          [inActiveUser._id, { ...inActiveUser, isActive: false }],
        ])
      })
    }

    socket.on('receiveNewActiveUser', onReceivingNewActiveUser)
    socket.on('receiveNewInActiveUser', onReceivingNewInActiveUser)

    return () => {
      socket.off('receiveNewActiveUser', onReceivingNewActiveUser)
      socket.off('receiveNewInActiveUser', onReceivingNewInActiveUser)
    }
  }, [isConnected])

  return (
    <UsersContext.Provider value={{ users, isLoading }}>
      {children}
    </UsersContext.Provider>
  )
}
