'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, X } from 'lucide-react';

export default function WaitlistPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

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
      
      // Close popup after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Popup */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-auto px-4">
        <div
          className="relative bg-white rounded-2xl shadow-2xl overflow-hidden animate-popup-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient Top Border */}
          <div className="h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500" />

          <div className="p-8">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close popup"
            >
              <X size={24} />
            </button>

            {!submitted ? (
              <>
                {/* Heading */}
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Join the Waitlist
                </h2>

                {/* Subheading */}
                <p className="text-gray-600 text-base mb-6 leading-relaxed">
                  Be the first to access our agricultural platform. Get early access and exclusive insights.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white transition-all"
                      autoFocus
                    />
                    {email && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer Text */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  We'll only use your email to notify you about updates.
                </p>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-4">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Success!
                </h3>
                <p className="text-gray-600 mb-4">
                  Check your email for confirmation. We'll be in touch soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes popupIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .animate-popup-in {
          animation: popupIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}