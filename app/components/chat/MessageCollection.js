'use client'

import ChatEnd from '@/app/components/chat/ChatEnd'
import ChatStart from '@/app/components/chat/ChatStart'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CurrentUserContext } from '@/app/providers/CurrentUserProvider'
import { SocketContext } from '@/app/providers/SocketProvider'
import { Spinner } from '@/app/assets/icons/Spinner'

export default function MessageCollection({ uid }) {
  const [messages, setMessages] = useState([])
  const { currentUser } = useContext(CurrentUserContext)
  const { socket, isConnected } = useContext(SocketContext)
  const [partner, setPartner] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPartner() {
      try {
        const { data } = await axios.get(
          `http://localhost:3003/api/User/${uid}`
        )
        setPartner(data)
      } catch (error) {
        console.log(
          `file: MessagesHistory.js:46 ~ fetchPartner ~ error:`,
          error
        )
      }
    }

    fetchPartner()
  }, [])

  useEffect(() => {
    if (!isConnected) return

    function onLoadedMessage(messages) {
      setMessages(() => messages)
      setIsLoading(false)
    }

    function onReceivingMessage(message) {
      console.log(
        `file: MessageCollection.js:45 ~ onReceivingMessage ~ message:`,
        message
      )
      setMessages((prev) => [...prev, message])
    }

    socket.emit('startsChattingWith', uid)
    socket.emit('loadmessage', { to: uid })

    socket.on('loadmessage', onLoadedMessage)
    socket.on('receiveAMessage', onReceivingMessage)

    return () => {
      socket.off('loadmessage', onLoadedMessage)
      socket.off('receiveAMessage', onReceivingMessage)
    }
  }, [isConnected])
  return (
    <div className="grow p-4 overflow-auto container mx-auto">
      {isLoading && (
        <div className="grid items-center justify-center h-full">
          <Spinner className="animate-spin w-8 h-8" />
        </div>
      )}

      {messages.map(({ from, message, _id }) => {
        if (from._id === currentUser._id) {
          return <ChatEnd message={message} sender={from} key={_id} />
        }

        return <ChatStart message={message} sender={from} key={_id} />
      })}
    </div>
  )
}
