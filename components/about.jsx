'use client';

import { useEffect } from 'react';
import { CheckCircle, Users, Target, Zap } from 'lucide-react';

export default function About() {
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

  const values = [
    {
      icon: Target,
      title: 'Transparency',
      description: 'Complete visibility across the agricultural supply chain'
    },
    {
      icon: Users,
      title: 'Empowerment',
      description: 'Giving farmers control over their products and pricing'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Leveraging AI and blockchain for trust and efficiency'
    },
    {
      icon: CheckCircle,
      title: 'Quality',
      description: 'Ensuring every product meets the highest standards'
    }
  ];

  return (
    <section id="about" className="relative w-full py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centered for all screens */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-on-scroll opacity-0 translate-y-4">
            About Agrochain
          </h2>
        </div>

        {/* Main About Content - Mobile optimized */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 items-center">
          {/* Left Side - Mission - Centered on mobile */}
          <div className="animate-on-scroll opacity-0 lg:translate-x-[-20px] text-center lg:text-start">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h3>
            <p className="text-gray-600 text-base text-start md:text-lg leading-relaxed mb-6">
              We believe that African farmers deserve equal opportunity in the global agricultural market. Our mission is to revolutionize agricultural supply chains by eliminating intermediaries, ensuring fair prices, and building verifiable trust through cutting-edge technology.
            </p>
            <p className="text-gray-600 text-base text-start md:text-lg leading-relaxed">
              By combining blockchain transparency with artificial intelligence, we create an ecosystem where farmers have direct access to international buyers, real-time market insights, and fair compensation for their quality products.
            </p>
          </div>

          {/* Right Side - Problem - Centered on mobile */}
          <div className="animate-on-scroll opacity-0 lg:translate-x-[20px] flex justify-center w-full">
            <div className="bg-white/80 text-black backdrop-blur-sm border border-lime-200 rounded-xl p-6 md:p-8 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-lime-300 w-full max-w-md lg:max-w-none lg:w-auto">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-center lg:text-start">The Problem We Solve</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-black font-bold flex-shrink-0">•</span>
                  <span className="text-sm md:text-base">Farmers receive only 10-20% of the final product value</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-black font-bold flex-shrink-0">•</span>
                  <span className="text-sm md:text-base">No verifiable quality assurance mechanisms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-black font-bold flex-shrink-0">•</span>
                  <span className="text-sm md:text-base">Limited access to international markets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-black font-bold flex-shrink-0">•</span>
                  <span className="text-sm md:text-base">Lack of transparency in supply chain pricing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>


      
      </div>

      <style jsx>{`
        @keyframes slideInFromBottom {
          from {    
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: slideInFromBottom 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        /* Mobile-specific adjustments */
        @media (max-width: 640px) {
          .max-w-xs {
            max-width: 20rem;
          }
        }
      `}</style>
    </section>
  );
}