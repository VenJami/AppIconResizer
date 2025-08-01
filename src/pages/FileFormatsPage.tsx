import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function FileFormatsPage() {
  const formats = [
    {
      name: 'PNG',
      description: 'Portable Network Graphics',
      features: ['Lossless compression', 'Transparency support', 'Best for icons'],
      color: 'text-blue-400'
    },
    {
      name: 'SVG',
      description: 'Scalable Vector Graphics',
      features: ['Infinitely scalable', 'Small file size', 'Perfect for logos'],
      color: 'text-purple-400'
    },
    {
      name: 'JPEG',
      description: 'Joint Photographic Experts Group',
      features: ['Good compression', 'Wide compatibility', 'Smaller file size'],
      color: 'text-green-400'
    },
    {
      name: 'WebP',
      description: 'Web Picture format',
      features: ['Modern format', 'Excellent compression', 'Web optimized'],
      color: 'text-orange-400'
    },
    {
      name: 'GIF',
      description: 'Graphics Interchange Format',
      features: ['Animation support', 'Simple graphics', 'Wide support'],
      color: 'text-pink-400'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Supported File Formats
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Learn about the image formats we support and their best use cases
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formats.map((format) => (
              <div key={format.name} className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`text-2xl font-bold ${format.color}`}>
                    {format.name}
                  </div>
                </div>
                <p className="text-gray-400 mb-4">{format.description}</p>
                <ul className="space-y-2">
                  {format.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                      <span className="text-accent-400">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Best Practices
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-3">For App Icons</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Use PNG format for best quality</li>
                  <li>• Start with 1024×1024px resolution</li>
                  <li>• Ensure your design works at small sizes</li>
                  <li>• Avoid thin lines and small details</li>
                </ul>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-3">For Web Use</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Consider WebP for modern browsers</li>
                  <li>• Use SVG for scalable graphics</li>
                  <li>• Optimize file sizes for faster loading</li>
                  <li>• Test across different devices</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 