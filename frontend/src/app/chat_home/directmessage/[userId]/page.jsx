'use client'
import React from 'react'

import Navbar from '@/app/components/Navbar'
import NotSupportedPage from '@/app/components/NotSupportedPage'
import ChatBox from '@/app/components/ChatBox'
import ChatBoxDetailPanel from '@/app/components/ChatBoxDetailPanel'

import { useScreenSupport } from '@/app/contexts/useScreenSupported'

// API


const ChatHome = () => { 
  const isSupported = useScreenSupport()

  return (
    <>
    {isSupported && 
    <>
      <Navbar/>
      <ChatBox/>
      <ChatBoxDetailPanel/>
    </>
    }
    {!isSupported && <NotSupportedPage/>}
    </>
  )
}

export default ChatHome