import React, { Children } from 'react'

const Button = ({variant, children, onClick, disableOn, onDisableChildren}) => {
  return (
    <>
    {/* Primary Button */}
    {
        variant == 'primary'?<button onClick={onClick}  className={`bg-white h-10 px-6 py-2 outline-none text-black font-semibold rounded-lg hover:bg-primary-btn-hover transition-all active:scale-95`}>{children}</button>:''
    }
    {
        variant == 'primary-full'?<button onClick={onClick} className={`bg-white w-full h-10 outline-none text-black font-semibold rounded-lg hover:bg-primary-btn-hover transition-all active:scale-95`}>{children}</button>:''
    }
    {
        variant == 'primary-thin'?<button onClick={onClick} className={`bg-white h-8 px-6 outline-none text-black text-sm font-semibold rounded-md hover:bg-primary-btn-hover transition-all active:scale-95`}>{children}</button>:''
    }
    {
        variant == 'primary-thin-full'?<button onClick={onClick} className={`bg-white w-full h-8 outline-none text-black text-sm font-semibold rounded-md hover:bg-primary-btn-hover transition-all active:scale-95`}>{children}</button>:''
    }

    {/* Secondary Button */}
    {
        variant == 'secondary'?<button onClick={onClick} className={`bg-transparent h-10 px-6 outline-none py-1 text-white font-semibold rounded-lg border-2 hover:bg-white hover:text-black transition-all active:scale-95`}>{children}</button>:''
    }
    {
        variant == 'secondary-full'?<button onClick={onClick} className={`bg-transparent w-full h-10 outline-none px-6 py-1 font-semibold rounded-lg border-2 hover:bg-white hover:text-black transition-all active:scale-95`}>{children}</button>:''
    }
    {
        variant == 'secondary-thin'?<button onClick={onClick} className={`bg-transparent px-6 h-8  outline-none font-semibold rounded-lg border-2 hover:bg-white hover:text-black text-sm transition-all active:scale-95`}>{children}</button>:''
    }
    {
        variant == 'secondary-thin-full'?<button onClick={onClick} className={`bg-transparent w-full h-8 outline-none font-semibold rounded-lg border-2 hover:bg-white hover:text-black text-sm transition-all active:scale-95`}>{children}</button>:''
    }
    {
        variant == 'submit'?<button type='submit' onClick={onClick} className={`bg-white w-full h-10 outline-none text-black font-semibold rounded-lg hover:bg-primary-btn-hover transition-all active:scale-95`}>{children}</button>:''
    }
    {
        variant == 'primary-loader-full'?<button onClick={onClick} disabled={disableOn} className={`w-full h-10 outline-none text-black font-semibold rounded-lg transition-all active:scale-95 ${disableOn?'bg-primary-btn-disable':'bg-white'} ${disableOn?'hover:bg-primary-btn-disable':'hover:bg-primary-btn-hover'}`}>
            {
                disableOn?onDisableChildren:children
            }
        </button>:''
    }
    </>
  )
}

export default Button