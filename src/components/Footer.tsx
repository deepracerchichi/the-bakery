import { ArrowUp } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-brand-pink text-brand-maroon px-16 py-16 relative">
      {/* Back to top button */}
      <button className="absolute top-8 right-8 border border-brand-maroon rounded-2xl p-2">
        <ArrowUp />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-90 max-w-md">
        <div className='border-l border-brand-maroon/30 pl-6'>
          <p className="text-xs tracking-widest uppercase text-brand-maroon">Navigate</p>
          <ul className="mt-4 space-y-2">
            <li>Home</li>
            <li>About</li>
          </ul>
        </div>

        <div className='border-l border-brand-maroon/30 pl-6'>
          <p className="text-xs tracking-widest uppercase text-brand-maroon">Connect</p>
          <ul className="mt-4 space-y-2">
            <li>Instagram</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <p className="mt-16 text-xs tracking-widest uppercase">
        &copy; 2026 Nene&apos;s Interlude. All rights reserved
      </p>

      {/* Giant wordmark */}
      <h2 className="font-heading font-bold text-brand-maroon leading-none text-[16vw] mt-4">
        The Bakery
      </h2>
    </footer>
  );
};

export default Footer;