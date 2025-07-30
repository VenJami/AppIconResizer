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
      answer: "Currently, we support PNG files only. Your source image must be exactly 1024×1024 pixels and under 10MB in size."
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
    "Device mockup previews",
    "Organized folder structure",
    "Privacy-focused (client-side processing)",
    "Free and unlimited use",
    "Mobile-responsive interface"
  ];
  
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left hover:bg-gray-100 -m-2 p-2 rounded-lg transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <HelpCircle className="h-6 w-6 text-primary-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              What is App Icon Resizer?
            </h2>
            <p className="text-sm text-gray-600">
              Learn how this tool works and why you need it
            </p>
          </div>
        </div>
        
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      
      {isExpanded && (
        <div className="mt-6 space-y-8">
          {/* Introduction */}
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed">
              Creating app icons for iOS and Android requires generating multiple sizes with precise dimensions. 
              This tool automates the entire process, ensuring your icons meet platform guidelines and look 
              perfect across all devices.
            </p>
          </div>
          
          {/* How it Works */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="mx-auto w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-3">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Key Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Platform Requirements */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Requirements</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-900">iOS Guidelines</h4>
                </div>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 1024×1024px source image required</li>
                  <li>• App Store icons must be opaque</li>
                  <li>• Supports iPhone and iPad sizes</li>
                  <li>• High-quality PNG format only</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Tablet className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Android Guidelines</h4>
                </div>
                <ul className="text-sm text-green-800 space-y-1">
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
                  </summary>
                  <div className="mt-2 p-3 text-sm text-gray-700 bg-gray-50 rounded-lg">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
          
          {/* Tips */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">💡 Pro Tips</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Use vector-based logos for best quality</li>
              <li>• Test your icons on actual devices when possible</li>
              <li>• Consider how your icon looks at small sizes</li>
              <li>• Use padding if your logo needs breathing room</li>
              <li>• Choose background colors that complement your design</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}