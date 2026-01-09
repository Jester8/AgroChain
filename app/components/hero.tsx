'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, CheckCircle } from 'lucide-react';

export default function NavbarHero() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroContentRef = useRef(null);
  
  // Use a ref to track if animation has been completed globally (persists across re-renders)
  const animationCompletedRef = useRef(false);
  const fullText = "Africa's First AI + Blockchain Agricultural Trust Layer";
  const typingSpeed = 80;

  // Single useEffect for typing animation that only runs once
  useEffect(() => {
    let mounted = true;
    
    // Check if animation has already been completed
    if (animationCompletedRef.current) {
      // If already completed, just show the full text
      setDisplayText(fullText);
      setIsTypingComplete(true);
      return;
    }
    
    const startTyping = () => {
      if (!mounted) return;
      
      let index = 0;
      
      const typeCharacter = () => {
        if (!mounted || index >= fullText.length) {
          if (mounted) {
            setIsTypingComplete(true);
            // Mark animation as completed globally
            animationCompletedRef.current = true;
          }
          return;
        }
        
        setDisplayText(fullText.substring(0, index + 1));
        index++;
        setCurrentIndex(index);
        setTimeout(typeCharacter, typingSpeed);
      };
      
      typeCharacter();
    };

    // Start typing when component mounts
    startTyping();

    return () => {
      mounted = false;
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              if (entry.target.classList.contains('animate-on-scroll')) {
                entry.target.classList.add('animate-fade-in-up');
              }
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
    { href: '/services', label: 'How it works?' },
    { href: '/blog', label: 'Pilot' },
  ];

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-[85vh] overflow-hidden font-nunito-sans">
      {/* Background Image */}
      <Image
        src="/img/hero.jpg"
        alt="Hero Background"
        fill
        className="object-cover animate-fade-in"
        priority
        quality={85}
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/30"></div>

      
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

            {/* Desktop Navigation - Transparent background */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 font-medium text-sm lg:text-base relative group hover:text-white transition-colors duration-300"
                >
                  <span className="relative z-10">
                    {link.label}
                  </span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-3/4"></span>
                </Link>
              ))}
              <button className="px-5 lg:px-6 py-2 border border-white/30 rounded-full font-medium text-white text-sm lg:text-base relative overflow-hidden group transition-all duration-300 hover:border-lime-400 hover:text-lime-400 hover:bg-white/10">
                <span className="relative z-10">
                  Contact Us
                </span>
              </button>
            </div>

            {/* Mobile Menu Button - Transparent */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg transition-all duration-300 text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="transition-all duration-300" />
              ) : (
                <Menu size={24} className="transition-all duration-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden transition-all duration-500 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Drawer - Transparent */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-black/80 backdrop-blur-xl shadow-2xl z-50 transform transition-all duration-500 ease-out md:hidden ${
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
            className="w-full px-6 py-3 border border-white/30 rounded-full font-medium text-white hover:border-lime-400 hover:text-lime-400 hover:bg-white/10 transition-all duration-300 mt-4"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Hero Content - Aligned to left */}
      <div className="relative z-10 h-full flex items-start justify-start pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-12">
          <div className="max-w-3xl hero-content animate-on-scroll">
            {/* Main Heading with responsive line breaks */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight md:leading-normal">
              <span className="typewriter-text inline-block break-words md:break-normal">
                {displayText}
                {!isTypingComplete && (
                  <span className="cursor-blink">|</span>
                )}
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-white/95 mb-8 sm:mb-10 leading-relaxed animate-on-scroll opacity-0 translate-y-4">
              Transforming agricultural supply chains with cutting-edge technology. Empowering farmers, ensuring quality, and building trust across the entire ecosystem from farm to market.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-12">
              <div className="flex items-start gap-3 animate-on-scroll opacity-0 translate-y-4">
                <CheckCircle className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Verified Quality</h3>
                  <p className="text-white/80 text-sm">Every product has a verified origin and quality history</p>
                </div>
              </div>
              <div className="flex items-start gap-3 animate-on-scroll opacity-0 translate-y-4" style={{ animationDelay: '100ms' }}>
                <CheckCircle className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Fair Pricing</h3>
                  <p className="text-white/80 text-sm">Transparent pricing mechanisms for better farmer income</p>
                </div>
              </div>
              <div className="flex items-start gap-3 animate-on-scroll opacity-0 translate-y-4" style={{ animationDelay: '200ms' }}>
                <CheckCircle className="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Global Access</h3>
                  <p className="text-white/80 text-sm">Connect directly with international buyers and markets</p>
                </div>
              </div>
            </div>

            {/* Tags - Moved up */}
            <div className="flex flex-wrap gap-3 mb-8 sm:mb-12">
              {['Data Security', 'Analytics Dashboard', 'Mobile First'].map((tag, index) => (
                <span
                  key={tag}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-medium border border-white/20 animate-on-scroll opacity-0 translate-y-4 hover:bg-white/20 hover:border-lime-400/50 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
                  style={{ animationDelay: `${index * 100 + 300}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Button - Moved down after tags */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-on-scroll opacity-0 translate-y-4">
              <button className="bg-lime-400 hover:bg-lime-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-lime-400/30 w-full sm:w-auto">
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  Explore Our Solutions
                  <ArrowRight className="w-5 h-5 bg-black text-lime-400 rounded-full p-0.5 transition-all duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add global CSS for animations and responsive text breaking */}
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

        /* Ensure typing animation runs only once */
        .typewriter-text {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          min-height: 1.2em;
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

        /* Mobile optimizations - Text breaking */
        @media (max-width: 768px) {
          section {
            min-height: 85vh;
          }
          
          .hero-content h1 {
            line-height: 1.2;
          }
          
          .hero-content p {
            line-height: 1.5;
          }
          
          /* Break long words on mobile */
          .typewriter-text {
            white-space: normal;
            word-break: break-word;
            overflow-wrap: break-word;
          }
        }

        @media (max-width: 640px) {
          .typewriter-text {
            /* More aggressive line breaking on very small screens */
            word-break: break-all;
          }
        }

        @media (max-width: 480px) {
          section {
            min-height: 80vh;
          }
          
          .hero-content h1 {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }
          
          .typewriter-text {
            /* Allow text to break at appropriate points */
            word-break: break-word;
            hyphens: auto;
          }
        }

        /* Desktop - keep as single line */
        @media (min-width: 768px) {
          .typewriter-text {
            white-space: nowrap;
            word-break: normal;
          }
        }
      `}</style>
    </section>
  );
}