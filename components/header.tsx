'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm font-montserrat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/logo.png"
              alt="EcoHarvest Logo"
              width={45}
              height={45}
              className="w-10 h-10 sm:w-11 sm:h-11"
            />
          
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white font-semibold text-sm lg:text-base hover:opacity-80 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Contact Button */}
          <button
            className="hidden md:block px-5 lg:px-6 py-2 border-2 border-white rounded-full font-semibold text-white text-sm lg:text-base hover:bg-white hover:text-gray-800 transition-all duration-300"
          >
            Contact Us
          </button>

          {/* Hamburger Menu - Mobile/Tablet */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg transition-colors text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile/Tablet Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-16 left-0 h-screen w-64 bg-gray-900/95 backdrop-blur-sm shadow-xl z-40 transform transition-transform duration-300 ease-in-out md:hidden font-montserrat`}
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <div className="flex flex-col gap-6 p-6 pt-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-semibold text-lg text-white hover:text-gray-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile/Tablet Contact Button */}
          <button
            className="w-full px-6 py-3 border-2 border-white rounded-full font-semibold text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </button>
        </div>
      </div>
    </>
  );
}