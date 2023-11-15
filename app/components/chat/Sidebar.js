// TODO:: Protect the route.

'use client'

import { SocketContext } from '@/app/providers/SocketProvider'
import { UsersContext } from '@/app/providers/UsersProvider'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

export default function Sidebar({ uid }) {
  const { users } = useContext(UsersContext)
  const [userStatus, setUserStatus] = useState({ id: null, active: false })
  const { isConnected, socket } = useContext(SocketContext)

  useEffect(() => {
    if (!isConnected) return

    function onUserStatus({ activeUserID, status, activeUserName }) {
      setUserStatus({ id: activeUserID, active: status })
      console.log('onUserStatus: ', activeUserID, status, activeUserName)
    }

    socket.on('userStatus', onUserStatus)

    return () => {
      socket.off('userStatus', onUserStatus)
    }
  }, [isConnected])

  console.log('USERS: ', users)

  return (
    <div className="bg-accent rounded-lg max-h-full min-h-full overflow-auto relative">
      <span className="block text-lg shadow-sm sticky top-0 bg-inherit p-4 z-50 bg-opacity-100">
        People
      </span>

      <div className="grid gap-2 p-4">
        {users.map((user) => {
          return (
            <div
              key={user._id}
              className={`flex items-center gap-4 p-4 rounded-2xl relative ${
                user._id === uid
                  ? 'bg-primary bg-opacity-50'
                  : 'hover:bg-primary hover:bg-opacity-50'
              }`}
            >
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-16 ring-primary ring-offset-base-100 ring-offset-2 ring">
                  <img src={user.image} alt={user.name} />
                </div>

                <span
                  className={`absolute top-0 right-0 w-2 h-2 bg-success rounded-full -translate-y-full ${
                    user.isActive ||
                    (user._id === userStatus.id && userStatus.active)
                      ? ''
                      : 'hidden'
                  }`}
                />
              </div>

              <span>{user.name}</span>

              <Link
                href={`/messages/${user._id}`}
                className="absolute top-0 left-0 bottom-0 right-0"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
