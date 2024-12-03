'use client'
import React from 'react'

import Navbar from '../components/Navbar'
import NotSupportedPage from '../components/NotSupportedPage'
import ChatBox from '../components/ChatBox'
import ChatBoxDetailPanel from '../components/ChatBoxDetailPanel'

import { useScreenSupport } from '../contexts/useScreenSupported'


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