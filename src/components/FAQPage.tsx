import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Search, FileText, Smartphone, Download, Shield, Clock, Zap } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "How does App Icon Resizer work?",
    answer: "App Icon Resizer works by automatically resizing your original logo to all required iOS and Android icon sizes. Simply drag and drop your 1024×1024px image onto the upload area or upload it manually. The image is uploaded and the icons are generated automatically. Activate the instant download option to directly download all icons. Best results are achieved with resolutions of 512×512 or 1024×1024 pixels.",
    category: "General",
    keywords: ["how", "works", "resize", "app icon", "automatic", "drag drop", "upload manually", "instant download", "512×512", "1024×1024"]
  },
  {
    question: "What file formats does App Icon Resizer support?",
    answer: "App Icon Resizer supports multiple image formats including PNG, JPG, JPEG, SVG, WebP, and GIF. For best results, we recommend using PNG or SVG files with a 1024×1024px resolution. The tool automatically converts your image to the appropriate format for each platform requirement.",
    category: "File Formats",
    keywords: ["file formats", "PNG", "JPG", "SVG", "WebP", "GIF", "supported"]
  },
  {
    question: "What icon sizes does App Icon Resizer generate?",
    answer: "App Icon Resizer generates all standard iOS and Android icon sizes. For iOS iPhone/iPad: 29×29, 40×40, 50×50, 57×57, 58×58, 72×72, 76×76, 80×80, 100×100, 114×114, 120×120, 144×144, 152×152, 180×180, 512×512, 1024×1024, 167×167, 87×87, 20×20, 60×60, 16×16, 24×24, 32×32, 48×48, 64×64, 128×128, 256×256 pixels. For iOS Watch: 48×48, 55×55, 80×80, 88×88, 172×172, 196×196 pixels. For Android: 36×36 (LDPI), 48×48 (MDPI), 72×72 (HDPI), 96×96 (XHDPI), 144×144 (XXHDPI), 192×192 (XXHDPI), 512×512 (Google Play Store) pixels.",
    category: "Icon Sizes",
    keywords: ["icon sizes", "iOS", "Android", "iPhone", "iPad", "Watch", "LDPI", "MDPI", "HDPI", "XHDPI", "XXHDPI", "Google Play Store"]
  },
  {
    question: "Is App Icon Resizer free to use?",
    answer: "Yes, App Icon Resizer is completely free to use with no signup required. You can resize unlimited app icons without any restrictions. The tool is open source and privacy-focused, with all processing happening in your browser.",
    category: "General",
    keywords: ["free", "no signup", "unlimited", "privacy", "open source"]
  },
  {
    question: "How fast is App Icon Resizer?",
    answer: "App Icon Resizer is extremely fast, generating all icon sizes in seconds. The tool uses optimized algorithms and client-side processing to ensure lightning-fast results. You can resize multiple icons simultaneously and download them immediately without waiting for server processing.",
    category: "Performance",
    keywords: ["fast", "speed", "seconds", "lightning", "optimized", "instant"]
  },
  {
    question: "Can I customize the background color of my icons?",
    answer: "Yes, App Icon Resizer allows you to customize the background color of your icons. You can choose from preset colors or use a custom color picker. The tool also supports transparency preservation and padding adjustments to ensure your icons look perfect on all platforms.",
    category: "Customization",
    keywords: ["customize", "background color", "transparency", "padding", "color picker"]
  },
  {
    question: "What are the best practices for app icon resizing?",
    answer: "For best results, use high-resolution images of 512×512 or 1024×1024 pixels. Activate the instant download option to directly download all icons. The tool supports drag and drop or manual upload. We recommend using PNG format for best quality and transparency support. All icons are generated automatically with zero cropping guarantee.",
    category: "Best Practices",
    keywords: ["best practices", "512×512", "1024×1024", "instant download", "drag drop", "manual upload", "PNG", "zero cropping"]
  },
  {
    question: "Is my data secure when using App Icon Resizer?",
    answer: "Yes, your data is completely secure. App Icon Resizer processes all images in your browser using client-side technology. Your images never leave your device and are not uploaded to any server. This ensures complete privacy and security for your sensitive design files.",
    category: "Security",
    keywords: ["secure", "privacy", "client-side", "browser", "no upload", "data protection"]
  },
  {
    question: "What is the maximum file size I can upload?",
    answer: "The maximum file size for uploads is 10MB. We recommend keeping files under 5MB for optimal processing speed. Larger files may take longer to process but will still work. The tool supports all major image formats including PNG, JPG, JPEG, SVG, WebP, and GIF.",
    category: "Technical",
    keywords: ["file size", "maximum", "10MB", "upload limit", "processing speed"]
  },
  {
    question: "Do I need to create an account to use App Icon Resizer?",
    answer: "No, you don't need to create an account or sign up for anything. App Icon Resizer is completely free to use without any registration required. Simply upload your image and start generating icons immediately. No personal information is collected or stored.",
    category: "General",
    keywords: ["account", "signup", "registration", "free", "no account", "immediate use"]
  },
  {
    question: "Can I use App Icon Resizer for commercial projects?",
    answer: "Yes, you can absolutely use App Icon Resizer for commercial projects. The tool is free for both personal and commercial use. There are no restrictions on how you use the generated icons. You retain full rights to your original images and the generated icons.",
    category: "Usage",
    keywords: ["commercial", "commercial use", "projects", "rights", "restrictions", "free"]
  },
  {
    question: "What platforms are supported for icon generation?",
    answer: "App Icon Resizer supports all major mobile platforms including iOS (iPhone, iPad, Apple Watch) and Android. The tool generates all required icon sizes for App Store, Google Play Store, and various device settings. This includes legacy sizes for older devices and modern sizes for current platforms.",
    category: "Platforms",
    keywords: ["platforms", "iOS", "Android", "iPhone", "iPad", "Apple Watch", "App Store", "Google Play"]
  }
];

const categories = ["All", "General", "File Formats", "Icon Sizes", "Performance", "Customization", "Best Practices", "Security", "Technical", "Usage", "Platforms"];

export function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQs = FAQ_DATA.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-dark-950 pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-dark-900 to-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <ArrowLeft 
                className="h-6 w-6 text-gray-400 mr-4 cursor-pointer hover:text-white transition-colors"
                onClick={() => window.history.back()}
              />
              <h1 className="text-4xl font-bold text-white">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Everything you need to know about App Icon Resizer. Find answers to common questions about file formats, icon sizes, and best practices.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 transition-colors"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-accent-500 text-white'
                      : 'bg-dark-800 text-gray-300 hover:bg-dark-700 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No questions found</h3>
              <p className="text-gray-400">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((item, index) => (
                <div 
                  key={index}
                  className="card-glass border border-dark-600 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-dark-800/50 transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white pr-4">
                        {item.question}
                      </h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="px-2 py-1 bg-accent-500/20 text-accent-400 text-xs rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-accent-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-accent-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openItems.includes(index) && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {item.answer}
                      </p>
                      <div className="flex flex-wrap gap-2">
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
          )}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent-500/25">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">12</div>
              <div className="text-gray-400">Common Questions</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">41+</div>
              <div className="text-gray-400">Icon Sizes</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-400">Privacy Secure</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">Seconds</div>
              <div className="text-gray-400">Processing Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            If you couldn't find the answer you're looking for, feel free to reach out to us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/#upload-section"
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Start Creating Icons</span>
            </a>
            <a 
              href="mailto:jaminalraven@gmail.com"
              className="btn-outline flex items-center justify-center space-x-2"
            >
              <FileText className="h-5 w-5" />
              <span>Contact Support</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 