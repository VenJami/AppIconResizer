import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FAQSection } from '../components/FAQSection';

export function FAQPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Find answers to common questions about app icon resizing
            </p>
          </div>
        </div>
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
} 