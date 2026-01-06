'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function NavbarHero() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroContentRef = useRef(null);
  
  const fullText = "Africa's First AI + Blockchain Agricultural Trust Layer";
  const typingSpeed = 80;

  // Typewriter effect - runs only once
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else if (!isTypingComplete) {
      setIsTypingComplete(true);
      setHasAnimated(true);
    }
  }, [currentIndex, isTypingComplete]);

  // Scroll effect for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in-up');
            }, 300);
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [hasAnimated]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: ' How it works?' },
    { href: '/blog', label: ' Pilot' },
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden font-nunito-sans">
      {/* Background Image */}
      <Image
        src="/img/hero.jpg"
        alt="Hero Background"
        fill
        className="object-cover animate-fade-in"
        priority
        quality={85}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent"></div>

      {/* Navbar with dynamic transparency */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/20 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 group relative"
            >
              <span className="text-lg sm:text-xl font-bold text-white group-hover:text-lime-400 transition-all duration-300 ease-out">
                AgroChain
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-400 group-hover:w-full transition-all duration-300 ease-out"></div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 font-medium text-sm lg:text-base relative group"
                >
                  <span className="relative z-10 transition-all duration-300 group-hover:text-white group-hover:font-semibold">
                    {link.label}
                  </span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-3/4"></span>
                </Link>
              ))}
              <button className="px-5 lg:px-6 py-2 border border-white/50 rounded-full font-medium text-white text-sm lg:text-base relative overflow-hidden group transition-all duration-300 hover:border-lime-400 hover:scale-105">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Contact Us
                </span>
                <span className="absolute inset-0 bg-lime-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg transition-all duration-300 text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="transition-all duration-300 rotate-180" />
              ) : (
                <Menu size={24} className="transition-all duration-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-all duration-500 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Drawer - Transparent */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-gray-900/90 backdrop-blur-lg shadow-2xl z-50 transform transition-all duration-500 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-4 p-6 pt-24">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-medium text-lg text-white/90 hover:text-lime-400 transition-all duration-300 transform hover:translate-x-3 py-2"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <button
            className="w-full px-6 py-3 border border-white/50 rounded-full font-medium text-white hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-300 mt-4"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center pt-16 sm:pt-20 md:pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl hero-content animate-on-scroll">
            {/* Main Heading - Reduced to 4xl */}
            <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              <span className="typewriter-text">
                {displayText}
                {!isTypingComplete && (
                  <span className="cursor-blink">|</span>
                )}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-white/95 mb-6 sm:mb-8 leading-relaxed animate-on-scroll opacity-0 translate-y-4">
              AgroChain enables farmers, buyers, exporters, governments, and financial institutions to verify the origin, quality, and history of agricultural produce
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 sm:mb-10 animate-on-scroll opacity-0 translate-y-4">
              <button className="bg-lime-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-lime-400/30 w-full sm:w-auto">
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  Our Solutions
                  <ArrowRight className="w-5 h-5 bg-black text-lime-400 rounded-full p-0.5 transition-all duration-300 group-hover:translate-x-1 group-hover:rotate-12" />
                </span>
                <span className="absolute inset-0 bg-lime-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {['AgriTech', 'Eco-Friendly', 'Precision Farming', 'Sustainable Farming'].map((tag, index) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-medium border border-white/20 animate-on-scroll opacity-0 translate-y-4 hover:bg-white/20 hover:border-lime-400/50 hover:scale-105 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 100 + 800}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add global CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cursorBlink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .cursor-blink {
          display: inline-block;
          width: 3px;
          margin-left: 4px;
          background-color: #84cc16;
          animation: cursorBlink 1s infinite;
          height: 1.2em;
          vertical-align: middle;
        }

        /* Smooth transitions */
        * {
          transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Navbar transparency effect */
        nav {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}