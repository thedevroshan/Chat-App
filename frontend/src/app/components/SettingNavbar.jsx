import React from 'react'
import Link from 'next/link'

const SettingNavbar = ({currentSetting}) => {
    const userSettings = [
        {
            name: 'Account',
            path: 'account',
            active: currentSetting == 'account'?true:false
        },
        {
            name: 'Profile',
            path: 'profile',
            active: currentSetting == 'profile'?true:false
        }
    ]

  return (
    <div className='xl:w-[24vw] w-[40vw] h-full border-r px-2 border-border'>
        <section className='w-full h-fit flex flex-col px-2 font-semibold bg-foreground text-secondary-text py-2 select-none gap-1'>
            <span className='mb-2'>USER SETTINGS</span>
            {userSettings.map((setting)=>(
                <Link key={setting.name} href={setting.path} className={`py-1 px-2 rounded-md ${setting.active?'bg-white text-black':'bg-transparent text-secondary-text hover:bg-primary-nav-hover hover:text-white'}`}>{setting.name}</Link>
            ))}
        </section>
    </div>
  )
}

export default SettingNavbar