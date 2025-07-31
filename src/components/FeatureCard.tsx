import React from 'react';
import { use3DTilt } from '../hooks/useAdvancedAnimations';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const tiltRef = use3DTilt(8);

  return (
    <div 
      ref={tiltRef}
      className="feature-card card-glass text-center group relative overflow-hidden"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Card content */}
      <div className="relative z-10">
        <div className="text-4xl mb-6 transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-400 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-accent-500/30 transition-all duration-300" />
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    </div>
  );
}