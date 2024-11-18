import React from 'react'

const Search = () => {
  return (
    <div className='sm:hidden w-full h-fit py-2 flex items-center justify-center'>
        <input type='text' className='bg-background border border-border rounded-lg px-2 py-1 outline-none placeholder:text-secondary-text w-[97vw]' placeholder='Search....'/>
    </div>
  )
}

export default Search