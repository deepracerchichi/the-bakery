
import { MenuIcon } from 'lucide-react'
import React from 'react'

const Nav = () => {
  return (
    <nav className="bg-brand-maroon max-w-full py-5 px-10 rounded-2xl">
        <div className= "flex justify-between items-center">
            <MenuIcon className="text-brand-pink" size={30} />
            <h2 className="text-center text-brand-cream font-bold font-heading text-2xl">
                Nene&apos;s Interlude
            </h2>

            <div className="w-7.5"/>
        </div>
    </nav>
  )
}

export default Nav