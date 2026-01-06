'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const SkeletonLoader = ({ className = '' }: { className?: string }) => (
  <div className={`bg-gray-300 animate-pulse rounded-lg ${className}`} />
);

const ImageWithSkeleton = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {isLoading && <SkeletonLoader className="w-full h-full absolute inset-0 z-10" />}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
};

const TextSkeleton = ({ lines = 3, className = '' }: { lines?: number; className?: string }) => (
  <div className={`space-y-3 ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <SkeletonLoader
        key={i}
        className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
      />
    ))}
  </div>
);

export default function ProblemSection() {
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsContentLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 font-nunito-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Accent Line */}
        <div className="flex justify-start mb-8 sm:mb-10 md:mb-12">
          <div className="h-1 w-12 bg-lime-400 rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Title */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-900 leading-tight transition-all duration-500">
                Africa's Agricultural Problem Is Not Production, It's Proof
              </h2>
            </div>

            {/* Mobile Image - shows after heading on mobile only */}
            <div className="h-64 sm:h-72 md:hidden lg:hidden order-1 mb-6 sm:mb-8">
              <ImageWithSkeleton
                src="/img/slide.png"
                alt="Agricultural farming"
              />
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-8 sm:mb-10">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed transition-all duration-500">
                African farmers produce millions of tonnes of food every year, yet their produce is often underpriced, rejected, or exploited.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed transition-all duration-500">
                This happens because most agricultural goods lack verifiable records:
              </p>
            </div>

            {/* Bullet Points */}
            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {[
                'No proof of origin',
                'No harvest or handling history',
                'No reliable quality data',
                'No trusted farmer identity',
              ].map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 sm:gap-4 transition-all duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-lime-400 mt-2.5 sm:mt-3"></div>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>

          
          </div>

          {/* Right Image - hidden on mobile */}
          <div className="hidden md:block h-64 sm:h-72 md:h-80 lg:h-96 order-1 lg:order-2">
            <ImageWithSkeleton
              src="/img/slide.png"
              alt="Agricultural farming"
            />
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="flex justify-center mt-12 sm:mt-16 md:mt-20 lg:mt-24">
          <div className="h-1 w-12 bg-lime-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}