'use client'
import React from 'react'
import { useEffect } from 'react'

import Navbar from '../components/Navbar'
import NotSupportedPage from '../components/NotSupportedPage'
import ChatBox from '../components/ChatBox'
import ChatBoxDetailPanel from '../components/ChatBoxDetailPanel'

import { useScreenSupport } from '../contexts/useScreenSupported'


const ChatHome = () => { 
  const isSupported = useScreenSupport()

  const StayOnChatHomePage = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/user/isloggedin`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const res = await response.json()
      if(!res.ok){
        window.location.pathname = '/'
      }
    } catch (error) {
      console.warn(error)
    }
  }


  useEffect(() => {
    StayOnChatHomePage()
  }, [])

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