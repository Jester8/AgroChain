'use client';
import React from 'react';
import { Twitter, Linkedin, BookOpen, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Team', href: '/team' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
      ]
    },
    {
      title: 'Solutions',
      links: [
        { name: 'How It Works', href: '/solutions' },
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Case Studies', href: '/case-studies' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'Documentation', href: '/docs' },
        { name: 'FAQs', href: '/faq' },
        { name: 'Support', href: '/support' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Compliance', href: '/compliance' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/agrochain', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/agrochain', label: 'LinkedIn' },
    { icon: BookOpen, href: 'https://medium.com/agrochain', label: 'Medium' },
    { icon: Mail, href: 'mailto:hello@agrochain.ng', label: 'Email' },
  ];

  const contactInfo = [
    { icon: MapPin, text: 'Ibadan, Nigeria' },
    { icon: Phone, text: '+224 80 5067 4789' },
    { icon: Mail, text: 'info@agrochain.africa' },
  ];

  return (
    <footer className="bg-gray-900 text-white" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="relative w-30 h-10 sm:w-20 sm:h-20 md:w-40 md:h-20 mb-4">
              <Image
                src="/logo/logo.png"
                alt="AgroChain Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            <p className="text-gray-400 text-sm mb-6 max-w-md">
              Transforming agriculture through AI and blockchain technology. Empowering farmers, ensuring transparency, and building trust across the agricultural value chain.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3 text-gray-300 text-sm">
                    <Icon className="w-4 h-4 text-lime-400" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-lime-400 transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div key={index} className="lg:col-span-2">
              <h3 className="font-semibold text-white mb-4 text-lg">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-lime-400 text-sm transition-colors duration-300 inline-flex items-center gap-2 group"
                    >
                      <span>{link.name}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8 lg:my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {currentYear} AgroChain. All Rights Reserved
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Powered by <span className="text-lime-400">Lazerjet Technologies LTD</span>
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-lime-500 to-lime-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 z-50"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}