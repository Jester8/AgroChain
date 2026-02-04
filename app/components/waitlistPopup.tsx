'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, X, MessageCircle } from 'lucide-react';

export default function WaitlistPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to join waitlist');
      }

      setSubmitted(true);
      setEmail('');

      // Close popup after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
        setSubmitted(false);
      }, 4000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp group link
    window.open('https://chat.whatsapp.com/YOUR_GROUP_LINK', '_blank');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 animate-overlay-fade"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4 pointer-events-none">
        <div
          className="relative bg-white rounded-2xl shadow-2xl overflow-hidden animate-popup-in w-full max-w-md pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  Join Our Waitlist
                </h2>

                {/* Subheading */}
                <p className="text-gray-600 text-base mb-6 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  Get early access, exclusive insights, and connect with other farmers revolutionizing agriculture.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none  focus:bg-white transition-all"
                      autoFocus
                      disabled={isLoading}
                    />
                    {email && !error && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Joining...
                      </span>
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>

                {/* WhatsApp CTA */}
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95 animate-slide-up"
                  style={{ animationDelay: '0.4s' }}
                >
                  <MessageCircle size={20} />
                  Join our WhatsApp group
                </button>

                {/* Footer Text */}
                <p className="text-xs text-gray-500 text-center mt-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                  We'll only use your email to notify you about updates.
                </p>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-4 animate-slide-up">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-500 animate-slide-up" style={{ animationDelay: '0.1s' }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  Welcome!
                </h3>
                <p className="text-gray-600 mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  Check your email for confirmation. Join our WhatsApp group to connect with the community!
                </p>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95 animate-slide-up"
                  style={{ animationDelay: '0.4s' }}
                >
                  <MessageCircle size={20} />
                  Join WhatsApp Group
                </button>
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
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes overlayFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-popup-in {
          animation: popupIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }

        .animate-overlay-fade {
          animation: overlayFadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}