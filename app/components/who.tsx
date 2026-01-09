'use client';

import React from 'react';
import { Users, Building, ShoppingBag, Shield, Banknote, Globe } from 'lucide-react';

export default function WhoWeHelp() {
  const targetUsers = [
    {
      icon: Users,
      title: 'Smallholder Farmers',
      description: 'Empower individual farmers with digital tools, fair pricing, and access to global markets',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100'
    },
    {
      icon: Building,
      title: 'Cooperatives',
      description: 'Strengthen collective bargaining power with transparent management and logistics support',
      color: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-100'
    },
    {
      icon: ShoppingBag,
      title: 'Buyers & Exporters',
      description: 'Source quality produce directly with verified traceability and consistent supply',
      color: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-100'
    },
    {
      icon: Shield,
      title: 'Banks & Insurers',
      description: 'Access reliable farmer data for risk assessment, credit scoring, and insurance products',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-100'
    },
    {
      icon: Banknote,
      title: 'Government Agencies',
      description: 'Monitor agricultural trends, implement subsidies effectively, and ensure food security',
      color: 'bg-red-50',
      iconColor: 'text-red-600',
      borderColor: 'border-red-100'
    },
    {
      icon: Globe,
      title: 'NGOs & Aid Organizations',
      description: 'Track impact, ensure aid reaches intended beneficiaries, and promote sustainable practices',
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      borderColor: 'border-indigo-100'
    }
  ];

  return (
    <div style={{ fontFamily: 'Nunito Sans, sans-serif' }} className="bg-white">
      <section className="px-4 sm:px-6 lg:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Who We Help
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering Everyone in the Agricultural Value Chain
            </p>
          </div>

          {/* Grid of Cards Only */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {targetUsers.map((user, index) => {
              const Icon = user.icon;
              return (
                <div
                  key={index}
                  className={`group relative ${user.color} border ${user.borderColor} rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                    <Icon size={96} className={user.iconColor} />
                  </div>
                  
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white shadow-sm border border-gray-100">
                      <Icon size={28} className={user.iconColor} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {user.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {user.description}
                  </p>

                  {/* Hover Indicator */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${user.iconColor.replace('text', 'bg')} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}