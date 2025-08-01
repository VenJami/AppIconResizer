import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { InfoSection } from '../components/InfoSection';

export function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              How App Icon Resizer Works
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A step-by-step guide to creating perfect app icons for all platforms
            </p>
          </div>
        </div>
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
} 