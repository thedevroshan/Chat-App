import React from 'react'

const Button = ({variant, children, onClick}) => {
  return (
    <>
    {/* Primary Button */}
    {
        variant == 'primary'?<button onClick={onClick} className="bg-white h-10 px-6 py-2 text-black font-semibold rounded-lg hover:bg-primary-btn-hover transition-all active:scale-95">{children}</button>:''
    }
    {
        variant == 'primary-full'?<button onClick={onClick} className="bg-white w-full h-10 text-black font-semibold rounded-lg hover:bg-primary-btn-hover transition-all active:scale-95">{children}</button>:''
    }
    {
        variant == 'primary-thin'?<button onClick={onClick} className="bg-white h-8 px-6 text-black text-sm font-semibold rounded-md hover:bg-primary-btn-hover transition-all active:scale-95">{children}</button>:''
    }
    {
        variant == 'primary-thin-full'?<button onClick={onClick} className="bg-white w-full h-8 text-black text-sm font-semibold rounded-md hover:bg-primary-btn-hover transition-all active:scale-95">{children}</button>:''
    }

    {/* Secondary Button */}
    {
        variant == 'secondary'?<button onClick={onClick} className="bg-transparent h-10 px-6 py-1 font-semibold rounded-lg border-2 hover:bg-white hover:text-black transition-all active:scale-95">{children}</button>:''
    }
    {
        variant == 'secondary-full'?<button onClick={onClick} className="bg-transparent w-full h-10  px-6 py-1 font-semibold rounded-lg border-2 hover:bg-white hover:text-black transition-all active:scale-95">{children}</button>:''
    }
    {
        variant == 'secondary-thin'?<button onClick={onClick} className="bg-transparent px-6 h-8 font-semibold rounded-lg border-2 hover:bg-white hover:text-black text-sm transition-all active:scale-95">{children}</button>:''
    }
    {
        variant == 'secondary-thin-full'?<button onClick={onClick} className="bg-transparent w-full h-8 font-semibold rounded-lg border-2 hover:bg-white hover:text-black text-sm transition-all active:scale-95">{children}</button>:''
    }
    </>
  )
}

export default Button