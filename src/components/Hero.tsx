import React from 'react'
import Image from "next/image";


const Hero = () => {
  return (
    <header className="my-6 relative w-full h-75 sm:h-100 md:h-125">
        
       
        <Image src="/opt1.png" alt="Scrumptious cookies" fill sizes="100vw" className="object-cover rounded-2xl" />
         <div className="absolute inset-0 bg-black/10 rounded-2xl" />
        <h1 
            className="absolute inset-0 flex items-center 
                justify-center text-center text-white font-heading 
                font-bold text-3xl sm:text-5xl md:text-6xl lg:text-9xl px-8
                [text-shadow:6px_6px_0_var(--color-brand-maroon)]">
            Scrumptious cookies, locally made with love!
        </h1>
    </header>
  )
}

export default Hero