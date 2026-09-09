import React from 'react'
import Image from "next/image";

const CardGrid = () => {
  return (
    <section className="py-20 px-16">
        <h2 className='font-heading font-bold text-brand-maroon text-5xl text-center'>
            Currently Serving
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col">
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

export default CardGrid