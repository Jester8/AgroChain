'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Leaf, Users, TrendingUp, Sprout } from 'lucide-react';

export default function JoinNow() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Email submitted:', email);
      setSubmitted(true);
      setIsLoading(false);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const benefits = [
    { icon: Leaf, text: 'Early access to platform' },
    { icon: Users, text: 'Join innovative community' },
    { icon: TrendingUp, text: 'Exclusive market insights' },
    { icon: Sprout, text: 'Priority for pilot programs' }
  ];

  return (
    <div style={{ fontFamily: 'Nunito Sans, sans-serif' }} className="relative">
      {/* Desktop Section */}
      <section className="hidden md:block relative w-full py-20 md:py-24 lg:py-28 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
        {/* Clean Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50/30 to-lime-50/30"></div>

        {/* Subtle Corner Accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-200/20 to-transparent rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-lime-200/20 to-transparent rounded-full"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            {/* Main Content */}
            <div className="mb-10 lg:mb-12">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-600">Agricultural</span> Revolution
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Be part of the transformation. Explore agricultural advancement and create meaningful change together.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 lg:mb-12 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index} 
                    className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-emerald-100 hover:shadow-md hover:border-emerald-200 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium text-center">{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Success Message */}
            {submitted && (
              <div className="max-w-md mx-auto mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-3 animate-fade-in">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Thank you! We'll be in touch soon.</span>
              </div>
            )}

            {/* Form */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="relative w-full sm:w-auto sm:flex-1 max-w-lg">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-6 py-4 rounded-full bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none  shadow-sm transition-all"
                    />
                    {email && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap shadow-md min-w-[140px] justify-center"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      <>
                        Join Now
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Section - Reduced height from py-16 to py-12 */}
      <section className="md:hidden relative w-full py-12 bg-gradient-to-b from-white to-emerald-50 px-5">
        {/* Clean Mobile Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/20 to-lime-50/20"></div>

        <div className="relative z-10 max-w-md mx-auto">
          <div className="text-center">
            {/* Main Content */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
                Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-600">Agricultural</span> Revolution
              </h1>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Be part of the transformation. Create meaningful change together.
              </p>
            </div>

            
            <div className="grid grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index} 
                    className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm border border-emerald-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-gray-700 text-xs font-medium text-center leading-tight">{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Success Message */}
            {submitted && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-center gap-2 animate-fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 text-sm font-medium">Thank you! We'll be in touch.</span>
              </div>
            )}

            {/* Form */}
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-5 py-3.5 rounded-full bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                    />
                    {email && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white font-bold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 disabled:opacity-70 w-full"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      <>
                        Join Now
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
               
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}