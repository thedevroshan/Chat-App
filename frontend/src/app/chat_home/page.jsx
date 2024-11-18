'use client'
import React from 'react'
import { useEffect } from 'react'

import Navbar from '../components/Navbar'
import HorizontalNavbar from '../components/HorizontalNavbar'
import UserProfile from '../components/UserProfile'
import Search from '../components/Search'
import ActiveUser from '../components/ActiveUser'
import OptionHeader from '../components/OptionHeader'

const page = () => { 
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
  
    return () => {

    }
  }, [])

  return (
    <div className='text-white'>
      <Navbar/>
      <HorizontalNavbar/>
      <UserProfile username={'thedevroshan'} profile_pic={'/user-icon.png'}/>
      <Search />
      <ActiveUser/>
      <OptionHeader/>
    </div>
  )
}

export default page