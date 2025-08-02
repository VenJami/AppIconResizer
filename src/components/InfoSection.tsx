import { useState } from 'react';
import { 
  HelpCircle, 
  Smartphone, 
  Tablet, 
  Upload, 
  Download, 
  Settings,
  ChevronDown,
  ChevronUp,
  CheckCircle
} from 'lucide-react';

export function InfoSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const faqs = [
    {
      question: "What is App Icon Resizer?",
      answer: "App Icon Resizer is a free tool that automatically converts your high-quality logo (1024×1024px) into all the required icon sizes for iOS and Android app development. No more manual resizing!"
    },
    {
      question: "What file formats are supported?",
      answer: "We support PNG, JPG, JPEG, SVG, WebP, and GIF files. Your source image should ideally be 1024×1024 pixels and under 10MB in size for best results."
    },
    {
      question: "Which icon sizes are generated?",
      answer: "For iOS: 8 sizes including App Store (1024px), iPhone Retina (180px), iPad Pro (167px), and more. For Android: 6 sizes covering all density levels from MDPI (48px) to XXXHDPI (192px) plus Play Store (512px)."
    },
    {
      question: "How does the processing work?",
      answer: "All processing happens in your browser using Web Workers for optimal performance. No files are uploaded to servers - your privacy is protected."
    },
    {
      question: "Can I customize the output?",
      answer: "Yes! You can add padding around your logo and set a background color. This is especially useful for logos with transparent backgrounds."
    },
    {
      question: "Are the icons ready for app stores?",
      answer: "Absolutely! All icons follow official guidelines. iOS App Store icons are automatically made opaque, and Android icons include all required density variations."
    }
  ];
  
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Logo",
      description: "Drop a 1024×1024px PNG file or click to browse"
    },
    {
      icon: Settings,
      title: "Choose Platforms",
      description: "Select iOS, Android, or both with customization options"
    },
    {
      icon: Smartphone,
      title: "Preview Icons",
      description: "See how your icons look on real devices"
    },
    {
      icon: Download,
      title: "Download Package",
      description: "Get organized ZIP with all sizes ready for development"
    }
  ];
  
  const features = [
    "Zero-crop guarantee - your design stays intact",
    "Platform-specific optimization",
    "High-quality resizing algorithms",
    "Multiple format support (PNG, JPG, SVG, WebP, GIF)",
    "Device mockup previews",
    "Organized folder structure",
    "Privacy-focused (client-side processing)",
    "Free and unlimited use",
    "Mobile-responsive interface"
  ];
  
  return (
    <div className="card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left hover:bg-dark-800/50 -m-3 p-4 rounded-xl transition-all duration-300 group"
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <HelpCircle className="h-8 w-8 text-accent-400 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -inset-1 bg-accent-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              What is <span className="text-gradient">App Icon Resizer</span>?
            </h2>
            <p className="text-gray-400">
              Learn how this tool works and why you need it
            </p>
          </div>
        </div>
        
        {isExpanded ? (
          <ChevronUp className="h-6 w-6 text-accent-400 group-hover:scale-110 transition-all duration-300" />
        ) : (
          <ChevronDown className="h-6 w-6 text-accent-400 group-hover:scale-110 transition-all duration-300" />
        )}
      </button>
      
      {isExpanded && (
        <div className="mt-6 space-y-8">
          {/* Introduction */}
          <div className="max-w-none">
            <p className="text-gray-300 leading-relaxed text-lg">
              Creating app icons for iOS and Android requires generating multiple sizes with precise dimensions. 
              This tool <span className="text-accent-400 font-semibold">automates the entire process</span>, ensuring your icons meet platform guidelines and look 
              perfect across all devices.
            </p>
          </div>
          
          {/* How it Works */}
          <div>
            <h3 className="section-heading mb-6">How It Works</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-accent-400" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Key Features */}
          <div>
            <h3 className="section-heading mb-6">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Platform Requirements */}
          <div>
            <h3 className="section-heading mb-6">Platform Requirements</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Smartphone className="h-6 w-6 text-blue-400" />
                  <h4 className="font-semibold text-blue-300">iOS Guidelines</h4>
                </div>
                <ul className="text-gray-300 space-y-2">
                  <li>• 1024×1024px source image recommended</li>
                  <li>• App Store icons must be opaque</li>
                  <li>• Supports iPhone and iPad sizes</li>
                  <li>• Multiple formats supported (PNG, JPG, SVG, WebP, GIF)</li>
                </ul>
              </div>
              
              <div className="bg-accent-500/10 border border-accent-500/20 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Tablet className="h-6 w-6 text-accent-400" />
                  <h4 className="font-semibold text-accent-300">Android Guidelines</h4>
                </div>
                <ul className="text-gray-300 space-y-2">
                  <li>• Multiple density variations (MDPI to XXXHDPI)</li>
                  <li>• 512px Play Store icon included</li>
                  <li>• Adaptive icon considerations</li>
                  <li>• Standard launcher icon sizes</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* FAQ */}
          <div>
            <h3 className="section-heading mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-dark-800/50 rounded-xl border border-dark-600 hover:border-accent-500/50 hover:bg-dark-800 transition-all duration-300">
                    <span className="font-semibold text-white">{faq.question}</span>
                    <ChevronDown className="h-5 w-5 text-accent-400 group-open:rotate-180 transition-transform duration-300" />
                  </summary>
                  <div className="mt-3 p-4 text-gray-300 bg-dark-900/50 rounded-xl border border-dark-700/50">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
          
          {/* Tips */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6">
            <h4 className="font-semibold text-amber-300 mb-4 text-lg">💡 Pro Tips</h4>
            <ul className="text-gray-300 space-y-2">
              <li>• Use vector-based logos for best quality</li>
              <li>• Test your icons on actual devices when possible</li>
              <li>• Consider how your icon looks at small sizes</li>
              <li>• Use padding if your logo needs breathing room</li>
              <li>• Choose background colors that complement your design</li>
            </ul>
          </div>
          
          {/* Additional Resources */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
            <h4 className="font-semibold text-blue-300 mb-4 text-lg">📚 Learn More</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-white mb-2">Platform Guides</h5>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li><a href="/icon-sizes" className="text-accent-400 hover:text-accent-300 transition-colors">• Complete Icon Size Reference</a></li>
                  <li><a href="/how-it-works" className="text-accent-400 hover:text-accent-300 transition-colors">• Detailed How It Works Guide</a></li>
                  <li><a href="/file-formats" className="text-accent-400 hover:text-accent-300 transition-colors">• Supported File Formats</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-white mb-2">Help & Support</h5>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li><a href="/faq" className="text-accent-400 hover:text-accent-300 transition-colors">• Frequently Asked Questions</a></li>
                  <li><a href="#upload-section" className="text-accent-400 hover:text-accent-300 transition-colors">• Start Creating Icons</a></li>
                  <li><a href="#icon-sizes" className="text-accent-400 hover:text-accent-300 transition-colors">• View Icon Sizes</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}