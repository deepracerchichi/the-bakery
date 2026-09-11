"use client"
import React from 'react'
import Image from "next/image";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(()=>{
    // const split = SplitText.create("[data-hero-headline]", {type: "chars"});
    //LINE MASK REVEAL
        SplitText.create("[data-hero-headline]", {
            type: "lines",
            mask: "lines",
            onSplit: (self) => {
                return gsap.from(self.lines, {
                    yPercent: 100,
                    duration: 2.0,
                    stagger: 0.15,
                    ease: "power4.out",
                })
            },
        })
  }, {scope: containerRef})

  return (
    <header ref={containerRef} className="my-6 relative w-full h-75 sm:h-100 md:h-125">
        
       
        <Image src="/opt1.png" alt="Scrumptious cookies" fill sizes="100vw" className="object-cover rounded-2xl" />
         <div className="absolute inset-0 flex items-center justify-center px-8">
          <h1
            data-hero-headline
            className="text-center text-white font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-9xl [text-shadow:6px_6px_0_var(--color-brand-maroon)]"
          >
            Scrumptious cookies, locally made with love!
          </h1>
        </div>
    </header>
  )
}

export default Hero