import React, { useState } from 'react'
import Button from './Button'

const ChangeProfilePicOrBanner = ({setProfilePicOrBanner}) => {
  // States
  const [isImageSelected, setIsImageSelected] = useState()

  const ChangeProfilePic = (e) => {
    if(e.target.files[0]){
      setIsImageSelected(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <div className='absolute bg-background flex flex-col items-center py-2 px-3 border-border border w-[60vw] h-[80vh] xl:w-[54vw] rounded-xl gap-2'>
      <span className='text-white text-2xl font-semibold select-none'>Change Profile Pic or Banner</span>

      <div className='border-b-2 border-border h-12 w-full flex items-center justify-around'>
        <button className='text-secondary-text font-semibold hover:text-white transition-all'>CHANGE PROFILE PIC</button>
        <button className='text-secondary-text font-semibold hover:text-white transition-all'>CHANGE BANNER</button>
      </div>

      <div className='bg-light-secondary h-full w-full rounded-xl flex items-center justify-center'>
        <label htmlFor="profilepic" className={`bg-white px-4 py-2 font-semibold rounded-xl cursor-pointer hover:bg-primary-btn-hover transition-all ${isImageSelected?'hidden':'block'}`}>SELECT IMAGE</label>
        <input type='file' id='profilepic' className='text-white hidden' accept='image/*' onChange={ChangeProfilePic}/>

        {isImageSelected && <img src={isImageSelected} alt="" className='aspect-video object-cover'/>}
      </div>

      <div className='w-full h-fit flex gap-4'>
        <Button variant={'primary-loader-full'} children={'Upload'}/>
        <Button variant={'secondary-full'} children={'Cancel'} textColor={'text-white'} onClick={()=>{setProfilePicOrBanner(false)}}/>
      </div>
    </div>
  )
}

export default ChangeProfilePicOrBanner