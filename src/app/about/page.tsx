"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutPage() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="bg-brand-pink px-16 py-10">
        <Nav />
      </div>

      <section className="bg-brand-pink px-8 pt-16 pb-8">
        <h1 className="reveal font-heading font-bold text-brand-maroon text-5xl md:text-7xl text-center leading-tight [text-shadow:4px_4px_0_var(--color-brand-pink),6px_6px_0_var(--color-brand-maroon)]">
          The Baker
        </h1>
      </section>

      {/* One unified card */}
      <section className="bg-brand-pink px-8 py-12">
        <div className="reveal max-w-2xl mx-auto relative bg-brand-maroon text-brand-cream rounded-3xl p-8 md:p-12 [box-shadow:8px_8px_0_var(--color-brand-pink)] overflow-hidden">
          <span className="absolute -top-4 left-6 font-heading font-bold text-brand-pink/30 text-[8rem] leading-none select-none">
            &ldquo;
          </span>

          <p className="relative font-heading text-2xl md:text-3xl leading-snug mb-6">
            Every good bake starts with a mess on the counter.
          </p>

          <p className="relative font-body text-brand-cream/80 leading-relaxed mb-4">
            Flour everywhere, half an idea, no clear plan for how it ends.
            That's about how most of what's on this site gets made too. I
            write the way I bake: slowly, a little messily, mixing whatever's
            on hand until something holds together.
          </p>
          <p className="relative font-body text-brand-cream/80 leading-relaxed">
            Some of it rises. Some of it doesn't. I publish it anyway,
            because a kitchen only gets useful once you stop being precious
            about the failed batches.
          </p>
        </div>
      </section>

      {/* Fun facts row */}
      

      <section className="bg-brand-pink px-8 pb-20">
        <p className="reveal text-center font-heading text-2xl text-brand-maroon max-w-xl mx-auto">
          This is where I set the finished ones out to cool. Pull up a chair.
        </p>
      </section>

      <Footer />
    </div>
  );
}