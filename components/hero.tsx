'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, CheckCircle } from 'lucide-react';

export default function NavbarHero() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Smooth scroll function - FIXED: Added type annotation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About Us', id: 'about' },
    { label: 'Our Solutions', id: 'solutions' },
  ];

  return (
    <section id="hero" className="relative w-full min-h-[40vh] md:min-h-[70vh] overflow-hidden font-nunito-sans">
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
            <button 
              onClick={() => scrollToSection('hero')}
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="relative w-30 h-10 sm:w-20 sm:h-20 md:w-40 md:h-20">
                <Image
                  src="/logo/logo.png"
                  alt="Agrochain Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-white/90 font-medium text-sm lg:text-base relative group hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  <span className="relative z-10">
                    {link.label}
                  </span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-3/4"></span>
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('join')}
                className="px-5 lg:px-6 py-2 border border-white/30 rounded-full font-medium text-white text-sm lg:text-base relative overflow-hidden group transition-all duration-300 hover:border-lime-400 hover:text-lime-400 hover:bg-white/10"
              >
                <span className="relative z-10">
                  Contact Us
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
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

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-black/80 backdrop-blur-xl shadow-2xl z-50 transform transition-all duration-500 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-4 p-6 pt-24">
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-medium text-lg text-white/90 hover:text-lime-400 transition-all duration-300 transform hover:translate-x-3 py-2 cursor-pointer text-left"
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              {link.label}
            </button>
          ))}
          <button
            className="w-full px-6 py-3 border border-white/30 rounded-full font-medium text-white hover:border-lime-400 hover:text-lime-400 hover:bg-white/10 transition-all duration-300 mt-4"
            onClick={() => scrollToSection('join')}
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-80 ml-5 flex items-start justify-start pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-12">
          <div className="max-w-3xl hero-content">
            {/* Main Heading - Slide In */}
            <h1 className="font-nunito-sans text-lg font-bold sm:text-xl md:text-3xl lg:text-4xl text-white mb-4 sm:mb-6 leading-tight animate-on-scroll opacity-0 translate-x-[-20px]">
              Secure data storage solution for Farmers.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base font-nunito-sans md:text-lg text-white/95 mb-8 sm:mb-10 leading-relaxed animate-on-scroll opacity-0 translate-x-[-20px]" style={{ animationDelay: '100ms' }}>
              Transforming agricultural supply chains with cutting-edge technology. Empowering farmers, ensuring quality, and building trust across the entire ecosystem from farm to market.
            </p>

         
            {/* CTA Button */}
            <div className="animate-on-scroll opacity-0 translate-x-[-20px]" style={{ animationDelay: '300ms' }}>
              <button 
                onClick={() => scrollToSection('solutions')}
                className="bg-lime-400 hover:bg-lime-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-lime-400/30 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2 justify-center sm:justify-start">
                  Explore Our Solutions
                  <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: slideInFromLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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

        /* Mobile optimizations */
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
        }

        @media (max-width: 480px) {
          section {
            min-height: 80vh;
          }
          
          .hero-content h1 {
            font-size: 1.125rem;
            line-height: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}