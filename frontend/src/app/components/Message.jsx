import React from 'react'



const Message = ({message, date, userId, myId}) => {
  return (
    <div className={`h-fit flex flex-wrap w-[25vw] px-4 py-3 rounded-3xl border border-border bg-background text-white font-semibold ${myId == userId?'ml-auto':''}`}>
        <span>{message}</span>
        <span className='text-secondary-text text-sm ml-auto select-none'>{date}</span>
    </div>
  )
}

export default Message