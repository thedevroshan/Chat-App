'use client'
import React from 'react'

import Navbar from '@/app/components/Navbar'
import NotSupportedPage from '@/app/components/NotSupportedPage'
import ChatBox from '@/app/components/ChatBox'
import ChatBoxDetailPanel from '@/app/components/ChatBoxDetailPanel'

import { useScreenSupport } from '@/app/contexts/useScreenSupported'


const ChatHome = ({params}) => { 
  const router = React.use(params)
  const isSupported = useScreenSupport()

  return (
    <>
    {isSupported && 
    <>
      <ChatBox userId={router.userId}/>
      <ChatBoxDetailPanel/>
    </>
    }
    {!isSupported && <NotSupportedPage/>}
    </>
  )
}

export default ChatHome