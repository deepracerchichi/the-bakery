"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MenuIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";

const Nav = () => {
  const containerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(
    () => {
      if (!menuRef.current) return;

      if (isOpen) {
        gsap.set(menuRef.current, { display: "flex" });
        gsap.fromTo(
          menuRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" }
        );
        gsap.from(".menu-link", {
          y: -10,
          opacity: 0,
          stagger: 0.06,
          duration: 0.3,
          delay: 0.15,
          ease: "power2.out",
        });
      } else {
        gsap.to(menuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(menuRef.current, { display: "none" });
          },
        });
      }
    },
    { scope: containerRef, dependencies: [isOpen] }
  );

  return (
    <nav ref={containerRef} className="relative bg-brand-maroon z-20 max-w-full py-5 px-10 rounded-2xl">
      <div className="flex justify-between items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-brand-pink"
        >
          {isOpen ? <X size={30} /> : <MenuIcon size={30} />}
        </button>
        <h2 className="text-center text-brand-cream font-bold font-heading text-2xl">
          The Bakery
        </h2>
        <div className="w-7.5" />
      </div>

      <div
  ref={menuRef}
  className="absolute top-full left-10 w-48 bg-brand-maroon rounded-b-xl overflow-hidden flex-col gap-1 p-3 [box-shadow:4px_4px_0_var(--color-brand-pink)]"
  style={{ display: "none" }}
>
        <Link href="/" className="menu-link text-brand-cream font-heading py-1">
          Home
        </Link>
        <Link href="/about" className="menu-link text-brand-cream font-heading py-1">
          The Baker
        </Link>
        <Link href="/posts" className="menu-link text-brand-cream font-heading py-1">
          All Posts
        </Link>
      </div>
    </nav>
  );
};

export default Nav;