'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, User, FileText, Truck, QrCode, TrendingUp, Shield, BarChart3, Globe, Smartphone } from 'lucide-react';

export default function Solutions() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      number: '01',
      title: 'Farmers Register',
      description: 'Farmers register via mobile app and create digital profiles with verified identity and farm details',
      icon: User,
      color: 'bg-red-500',
      details: 'Easy onboarding process with document verification and land mapping integration'
    },
    {
      number: '02',
      title: 'Log Harvests',
      description: 'Harvests are logged with dates, quantity, quality metrics, and batch QR codes',
      icon: FileText,
      color: 'bg-blue-500',
      details: 'Real-time data capture with photo evidence and quality assessment tools'
    },
  
    {
      number: '03',
      title: 'Verify Quality',
      description: 'Buyers scan QR codes to verify origin, handling history, and quality certifications',
      icon: QrCode,
      color: 'bg-amber-500',
      details: 'Complete transparency with blockchain-verified records and quality assurance data'
    },
    {
      number: '04',
      title: 'Build Identity',
      description: 'Digital reputation builds financial identity and credit history for farmers',
      icon: TrendingUp,
      color: 'bg-purple-500',
      details: 'Performance-based scoring system that enables access to financial services and premium markets'
    },
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: 'Data Security',
      description: 'Bank-grade encryption and blockchain technology protect farmer data'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time insights on market prices, demand trends, and yield predictions'
    },
    {
      icon: Globe,
      title: 'Global Marketplace',
      description: 'Connect directly with buyers worldwide without intermediaries'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Works offline in rural areas with low-bandwidth optimization'
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % steps.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + steps.length) % steps.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, isAnimating]);

  return (
    <div 
      style={{ fontFamily: 'Nunito Sans, sans-serif' }} 
      className="bg-[#f0fdf4] transition-all duration-500"
    >
      {/* Desktop Section */}
      <section id='solutions' className="hidden lg:block px-8 lg:px-16 py-20 bg-gradient-to-b from-lime-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-left">
            <h1 className="text-2xl sm:text-2xl md:text-2xl font-bold text-gray-900 leading-tight mb-6 animate-fade-in">
              Our Solutions
            </h1>
           
          </div>

        

          {/* Desktop Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-lime-300 group"
                >
                  {/* Colored Header with Animation */}
                  <div className={`${step.color} h-24 flex items-center justify-center rounded-t-xl transition-all duration-500 group-hover:h-28`}>
                    <div className="relative">
                      <Icon size={40} className="text-white animate-pulse-once" />
                     
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-lime-700 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <div className="text-xs text-gray-500 mb-4 p-3 bg-lime-50 rounded-lg border border-lime-100">
                      {step.details}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        
        </div>
      </section>

      {/* Mobile Section */}
      <section className="lg:hidden px-6 py-16 bg-gradient-to-b from-lime-50 to-emerald-50">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-6 animate-slide-in-right">
            Our Solutions
          </h1>
         

      
          {/* Mobile Card Slider */}
          <div className="relative">
            {/* Card Container */}
            <div 
              className={`bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-500 ${isAnimating ? 'opacity-90 scale-95' : 'opacity-100 scale-100'}`}
            >
              {/* Animated Colored Header */}
              <div className={`${steps[currentSlide].color} h-32 flex items-center justify-center transition-all duration-500`}>
                <div className="relative animate-bounce-gentle">
                  {React.createElement(steps[currentSlide].icon, { size: 56, className: 'text-white' })}
                  {/* <span className="absolute -top-3 -right-3 bg-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                    {steps[currentSlide].number}
                  </span> */}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300">
                  {steps[currentSlide].title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  {steps[currentSlide].description}
                </p>
                <div className="text-sm text-gray-500 mb-6 p-4 bg-lime-50 rounded-lg border border-lime-100">
                  {steps[currentSlide].details}
                </div>
              </div>
            </div>

            {/* Navigation Buttons with Enhanced Animation */}
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="absolute left-[-9] top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-lime-100 text-lime-700 p-3 rounded-full shadow-lg transition-all duration-300 active:scale-95 border border-lime-300 disabled:opacity-50"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-lime-100 text-lime-700 p-3 rounded-full shadow-lg transition-all duration-300 active:scale-95 border border-lime-300 disabled:opacity-50"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* Enhanced Slide Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentSlide(idx);
                      setTimeout(() => setIsAnimating(false), 300);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === currentSlide
                      ? 'bg-lime-600 w-10 opacity-100'
                      : 'bg-lime-300 w-2 opacity-50'
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>

      
        </div>
      </section>

      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes bounceGentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseOnce {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-out;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-out;
        }
        .animate-bounce-gentle {
          animation: bounceGentle 2s ease-in-out infinite;
        }
        .animate-pulse-once {
          animation: pulseOnce 0.5s ease-in-out;
        }
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }
        .active\:scale-95:active {
          transform: scale(0.95);
        }
        .transition-all {
          transition-property: all;
        }
      `}</style>
    </div>
  );
}