import { Zap, Gem, Crown, Shield, Info } from 'lucide-react';
import React from 'react';

export const amcPlans = {
  domestic: [
    {
      name: 'Urban Company Native Care',
      price: 2499,
      originalPrice: 2999,
      duration: '1 Year',
      icon: <Zap className="text-blue-500" size={24} />,
      description: 'Specialized maintenance for Urban Company native machines and services.',
      features: [
        '3 Compulsory Service Visits',
        'Genuine Native Spares Only',
        '1 Year Component Warranty',
        'Same-day Technician Arrival',
        'Water Quality Analytics'
      ],
      color: 'from-blue-500/20 to-blue-600/5',
      borderColor: 'border-blue-100',
      popular: true
    },
    {
      name: 'Multi-Brand Shield',
      price: 2999,
      originalPrice: 3999,
      duration: '1 Year',
      icon: <Gem className="text-cyan-500" size={24} />,
      description: 'Comprehensive care for RO systems of all major brands and different companies.',
      features: [
        'Unlimited Breakdown Calls',
        'All Major Brands Covered',
        'Sediment & Carbon Filter Change',
        'RO Membrane Health Check',
        'Free TDS Monitoring'
      ],
      color: 'from-cyan-500/20 to-blue-600/10',
      borderColor: 'border-cyan-200',
      popular: false
    },
    {
      name: 'Custom Domestic',
      price: 'Custom',
      originalPrice: 0,
      duration: 'Flexible',
      icon: <Info className="text-slate-500" size={24} />,
      description: 'Design a maintenance schedule that fits your specific needs and machine type.',
      features: [
        'Flexible Service Schedule',
        'Choose Your Components',
        'Optional Spare Coverage',
        'Dedicated Support Line',
        'Multi-unit discounts'
      ],
      color: 'from-slate-500/10 to-slate-600/5',
      borderColor: 'border-slate-200',
      popular: false
    }
  ],
  commercial: [
    {
      name: 'Mahi Commercial Native',
      price: 14999,
      originalPrice: 18999,
      duration: '1 Year',
      icon: <Crown className="text-amber-500" size={24} />,
      description: 'High-performance maintenance for Mahi RO commercial plants and native setups.',
      features: [
        'Monthly Professional Service',
        'Genuine High-flow spares',
        'High-pressure pump coverage',
        'Vessel media replacement',
        'Priority 2-hour response'
      ],
      color: 'from-amber-500/20 to-orange-600/5',
      borderColor: 'border-amber-100',
      popular: true
    },
    {
      name: 'Enterprise Multi-Brand',
      price: 19999,
      originalPrice: 24999,
      duration: '1 Year',
      icon: <Shield className="text-indigo-500" size={24} />,
      description: 'Professional servicing for commercial plants of any make or model.',
      features: [
        '24/7 Enterprise Support',
        'All Industrial Brands Covered',
        'Dual Pre-filtration coverage',
        'Antiscalant dosing included',
        'Compliance reports & certification'
      ],
      color: 'from-indigo-500/20 to-purple-600/5',
      borderColor: 'border-indigo-100',
      popular: false
    },
    {
      name: 'Industrial Custom Solution',
      price: 'Custom',
      originalPrice: 0,
      duration: 'Tailored',
      icon: <Info className="text-slate-500" size={24} />,
      description: 'Tailored industrial-grade maintenance for large-scale operations and RO plants.',
      features: [
        'Bespoke Maintenance frequency',
        'System-wide Parts Warranty',
        'Dedicated On-site Technician',
        'Remote Monitoring Setup',
        'Scale-up/down flexibility'
      ],
      color: 'from-slate-500/10 to-slate-600/5',
      borderColor: 'border-slate-200',
      popular: false
    }
  ]
};
