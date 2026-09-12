"use client"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"
import SplitText from "gsap/src/SplitText"

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText)
const Testimonials = () => {
  const containerRef = useRef(null);

  useGSAP(()=> {
    gsap.from(".fade-up", {
      y: 30,
      opacity: 0,
      duration: 2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%"
      }

      
    })

    SplitText.create(".quote", {
            type: "lines",
            mask: "lines",
            onSplit: (self) => {
                return gsap.from(self.lines, {
                    yPercent: 100,
                    duration: 2.1,
                    stagger: 0.15,
                    ease: "power4.out",
                    scrollTrigger: {
                      trigger: containerRef.current,
                      start: "top 80%"
                    }
                })
            },
        })
  }, {scope: containerRef})

  return (
    <section ref={containerRef} className='px-16 py-10'>
        <div className='fade-up bg-brand-maroon rounded-3xl px-8 py-16 md:py-20 flex flex-col items-center'>
            <blockquote className='quote text-center text-white text-4xl font-bold font-heading max-w-4xl'>
                &quot;Crispy on the outside, gooey on the inside, and packed with chocolatey goodness in every bite. 
                One taste, and you&apos;ll be hooked it&#39;s like a warm hug in cookie form!&quot;
            </blockquote>
            <p className='text-brand-pink font-bold font-body mt-8 text-xl'>-Valerie NY</p>
        </div>
    </section>
  )
}

export default Testimonials