"use client"
import React, { useRef } from 'react'
import Image from "next/image";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger, useGSAP);



const CardGrid = () => {
    const containerRef = useRef(null);

   useGSAP(() => {
    gsap.from(".fade-up", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power1.inOut",
        scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        },
    });
    }, { scope: containerRef });
  return (
    <section ref={containerRef} className="py-20 px-16">
        <h2 className='fade-up font-heading font-bold text-brand-maroon text-5xl text-center'>
            Currently Serving
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="fade-up flex flex-col">
            <div className="relative w-full h-40 sm:h-100 md:h-125">
                <Image src="/opt1.png" alt="Scrumptious cookies" fill sizes="(max-width: 768px) 100vw, 33vw"  className="object-cover rounded-2xl" />
                <button 
                    className="font-body absolute bottom-4 left-1/2 
                        transform -translate-x-1/2 bg-white
                        text-brand-maroon font-bold py-2 px-4 rounded-full 
                        hover:bg-brand-pink transition-colors
                        [box-shadow:4px_6px_0_var(--color-brand-maroon)]"
                        >
                            Have a Taste!
                        </button>
            </div>
            <h3 
                className="font-heading font-bold text-brand-maroon text-2xl text-center mt-4"
                >
                    Fudgy
                    </h3>
            </div>
        </div>
    </section>
  )
}

export default CardGrid;