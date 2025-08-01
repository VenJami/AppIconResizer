import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Zap, Smartphone, Download } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "How does App Icon Resizer work?",
    answer: "App Icon Resizer works by automatically resizing your original logo to all required iOS and Android icon sizes. Simply drag and drop your 1024x1024px image onto the upload area, select your target platforms (iOS, Android, or both), and download the generated icons in a ZIP file. The process is completely client-side, ensuring your images never leave your device.",
    keywords: ["how", "works", "resize", "app icon", "automatic", "drag drop"]
  },
  {
    question: "What file formats does App Icon Resizer support?",
    answer: "App Icon Resizer supports multiple image formats including PNG, JPG, JPEG, SVG, WebP, and GIF. For best results, we recommend using PNG or SVG files with a 1024x1024px resolution. The tool automatically converts your image to the appropriate format for each platform requirement.",
    keywords: ["file formats", "PNG", "JPG", "SVG", "WebP", "GIF", "supported"]
  },
  {
    question: "What icon sizes does App Icon Resizer generate?",
    answer: "App Icon Resizer generates all standard iOS and Android icon sizes. For iOS: 1024x1024px (App Store), 180x180px (iPhone), 167x167px (iPad Pro), 152x152px (iPad), 120x120px (Spotlight), 87x87px (iPad Spotlight), 80x80px (Settings), 60x60px (Settings). For Android: 512x512px (Play Store), 192x192px (High-res), 144x144px (Medium), 96x96px (Low), 72x72px (Extra-low), 48x48px (Legacy).",
    keywords: ["icon sizes", "iOS", "Android", "1024x1024", "180x180", "512x512"]
  },
  {
    question: "Is App Icon Resizer free to use?",
    answer: "Yes, App Icon Resizer is completely free to use with no signup required. You can resize unlimited app icons without any restrictions. The tool is open source and privacy-focused, with all processing happening in your browser.",
    keywords: ["free", "no signup", "unlimited", "privacy", "open source"]
  },
  {
    question: "How fast is App Icon Resizer?",
    answer: "App Icon Resizer is extremely fast, generating all icon sizes in seconds. The tool uses optimized algorithms and client-side processing to ensure lightning-fast results. You can resize multiple icons simultaneously and download them immediately without waiting for server processing.",
    keywords: ["fast", "speed", "seconds", "lightning", "optimized", "instant"]
  },
  {
    question: "Can I customize the background color of my icons?",
    answer: "Yes, App Icon Resizer allows you to customize the background color of your icons. You can choose from preset colors or use a custom color picker. The tool also supports transparency preservation and padding adjustments to ensure your icons look perfect on all platforms.",
    keywords: ["customize", "background color", "transparency", "padding", "color picker"]
  }
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-16 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-accent-400 mr-3" />
            <h2 className="text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about App Icon Resizer
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <div 
              key={index}
              className="card-glass border border-dark-600 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-dark-800/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {item.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-accent-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-accent-400 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.keywords.map((keyword, keyIndex) => (
                      <span 
                        key={keyIndex}
                        className="px-2 py-1 bg-accent-500/20 text-accent-400 text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-accent-500/10 to-blue-500/10 rounded-2xl p-8 border border-accent-500/20">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-accent-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">
                Ready to Create Your App Icons?
              </h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who trust App Icon Resizer for their app icon needs. 
              Fast, free, and privacy-focused.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Smartphone className="h-5 w-5" />
                <span>Start Creating Icons</span>
              </button>
              <a 
                href="https://github.com/VenJami/AppIconResizer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 