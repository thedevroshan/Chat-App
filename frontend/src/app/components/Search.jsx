import React from 'react'

const Search = () => {
  return (
    <div className='absolute flex flex-col w-[40vw] items-center justify-center h-fit mx-[30vw] -mt-96'>
        <input type="text" className='bg-background outline-none border border-border py-2 px-3 rounded-xl text-white placeholder:text-secondary-text w-full text-xl' placeholder='Search'/>
    </div>
  )
}

export default Search