'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function NavbarHero() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Detect window size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
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

  // Determine if we're on mobile, tablet, or desktop
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  return (
    <section id="hero" className="relative w-full overflow-hidden font-nunito-sans">
      {/* Dynamic height based on device */}
      <div className={`relative ${
        isMobile ? 'h-[40vh] min-h-[220px]' : 
        isTablet ? 'h-[35vh] min-h-[280px]' : 
        'h-[65vh] min-h-[500px]'
      }`}>
        {/* Background Image */}
        <Image
          src="/img/main.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />

        {/* Overlay */}
        <div className={`absolute inset-0 ${
          isMobile 
            ? 'bg-gradient-to-b from-black/70 via-black/60 to-black/50' 
            : isTablet
            ? 'bg-gradient-to-b from-black/60 via-black/50 to-black/40'
            : 'bg-gradient-to-b from-black/40 via-black/30 to-black/20'
        }`}></div>

        {/* Hero Content - Left-aligned with whitepaper content */}
        <div className="relative z-10 h-full flex items-center justify-start pt-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="w-full flex justify-start">
              {isMobile ? (
                // Mobile layout
                <div className="max-w-xs text-left">
                  <h1 className="font-nunito-sans text-base font-bold text-white mb-2 leading-tight">
                    A Simple Trust System for African Agriculture
                  </h1>

                  <p className="text-xs font-nunito-sans text-white/90 mb-3 leading-relaxed">
                    Safe and honest records for farmers. Helping farmers prove their work, 
                    buyers trust what they're buying, and institutions make better decisions with real data.
                  </p>

                  <button 
                    onClick={() => scrollToSection('solutions')}
                    className="bg-lime-400 hover:bg-lime-500 text-black px-4 py-2 rounded-full font-semibold transition-all duration-300 text-xs"
                  >
                    <span className="flex items-center gap-1 justify-center">
                      Explore Solutions
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                </div>
              ) : isTablet ? (
                // Tablet layout
                <div className="max-w-md text-left">
                  <h1 className="font-nunito-sans text-lg font-bold text-white mb-3 leading-tight">
                    A Simple Trust System for African Agriculture
                  </h1>

                  <p className="text-sm font-nunito-sans text-white/90 mb-4 leading-relaxed">
                    Keep safe and honest records of your farming work. AgroChain helps farmers prove 
                    their work, helps buyers trust what they are buying, and helps institutions make 
                    better decisions using real data.
                  </p>

                  <button 
                    onClick={() => scrollToSection('solutions')}
                    className="bg-lime-400 hover:bg-lime-500 text-black px-5 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm"
                  >
                    <span className="flex items-center gap-1 justify-center">
                      Explore Solutions
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              ) : (
                // Desktop layout
                <div className="max-w-lg lg:max-w-xl text-left">
                  <h1 className="font-nunito-sans text-xl lg:text-2xl font-bold text-white mb-4 leading-tight">
                    A Simple Trust System for African Agriculture
                  </h1>

                  <p className="text-sm lg:text-base font-nunito-sans text-white/90 mb-6 leading-relaxed">
                    AgroChain helps farmers keep safe and honest records of their farming work. 
                    We record what happens on the farm and turn those records into proof that 
                    cannot be changed or lied about. Helping farmers prove their work, buyers 
                    trust what they are buying, and institutions make better decisions using real data.
                  </p>

                  <button 
                    onClick={() => scrollToSection('solutions')}
                    className="bg-lime-400 hover:bg-lime-500 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300"
                  >
                    <span className="flex items-center gap-2 justify-center">
                      Explore Our Solutions
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/20 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
          isMobile ? 'py-3' : isTablet ? 'py-3' : 'py-4'
        }`}>
          <div className="flex items-center justify-between">
            <button 
              onClick={() => scrollToSection('hero')}
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className={`relative ${
                isMobile ? 'w-20 h-8' : 
                isTablet ? 'w-28 h-10' : 
                'w-36 h-14'
              }`}>
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
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-white/90 font-medium text-base xl:text-lg relative group hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  <span className="relative z-10">
                    {link.label}
                  </span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-3/4"></span>
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('join')}
                className="px-6 xl:px-8 py-2.5 border border-white/30 rounded-full font-medium text-white text-base xl:text-lg relative overflow-hidden group transition-all duration-300 hover:border-lime-400 hover:text-lime-400 hover:bg-white/10"
              >
                <span className="relative z-10">
                  Contact Us
                </span>
              </button>
            </div>

            {/* Tablet/Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg transition-all duration-300 text-white hover:bg-white/10"
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

      {/* Mobile/Tablet Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-all duration-500 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile/Tablet Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-screen ${
          isMobile ? 'w-64' : 'w-72'
        } bg-black/80 backdrop-blur-xl shadow-2xl z-50 transform transition-all duration-500 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className={`flex flex-col gap-4 p-6 ${
          isMobile ? 'pt-20' : 'pt-24'
        }`}>
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`font-medium ${
                isMobile ? 'text-base' : 'text-lg'
              } text-white/90 hover:text-lime-400 transition-all duration-300 transform hover:translate-x-3 py-2 cursor-pointer text-left`}
            >
              {link.label}
            </button>
          ))}
          <button
            className={`w-full px-6 py-3 border border-white/30 rounded-full font-medium text-white hover:border-lime-400 hover:text-lime-400 hover:bg-white/10 transition-all duration-300 mt-4 ${
              isMobile ? 'text-sm' : 'text-base'
            }`}
            onClick={() => scrollToSection('join')}
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Global CSS */}
      <style jsx global>{`
        /* Navbar transparency effect */
        nav {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* Ensure image shows properly on all devices */
        @media (max-width: 767px) {
          #hero img {
            object-position: center 25%;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          #hero img {
            object-position: center 35%;
          }
        }

        @media (min-width: 1024px) {
          #hero img {
            object-position: center 45%;
          }
        }
      `}</style>
    </section>
  );
}