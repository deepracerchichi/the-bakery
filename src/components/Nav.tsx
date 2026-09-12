"use client"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MenuIcon } from 'lucide-react'
import { useRef } from 'react';
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

const Nav = () => {
  const containerRef = useRef(null);

  useGSAP(()=> {
    
    gsap.from(".fade-down", {
      y: -30,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
    })

  }, {scope: containerRef})

  return (
    <nav ref={containerRef} className=" bg-brand-maroon max-w-full py-5 px-10 rounded-2xl">
        <div className= "fade-down flex justify-between items-center">
            <MenuIcon className=" text-brand-pink" size={30} />
            <h2 className="text-center text-brand-cream font-bold font-heading text-2xl">
                The Bakery
            </h2>

            <div className="w-7.5"/>
        </div>
    </nav>
  )
}

export default Nav;