import React from 'react';
import { ArrowLeft, Upload, Settings, Download, CheckCircle, Smartphone, Tablet, Watch, Zap, Shield, Clock } from 'lucide-react';

const steps = [
  {
    step: 1,
    title: "Upload Your Image",
    description: "Drag and drop your 1024×1024 pixel image onto the upload area or click to browse files. We support PNG, JPG, JPEG, SVG, WebP, and GIF formats.",
    icon: Upload,
    details: [
      "High-resolution images (512×512 or 1024×1024 pixels recommended)",
      "Multiple file formats supported",
      "Maximum file size: 10MB",
      "Automatic format validation"
    ]
  },
  {
    step: 2,
    title: "Select Platforms & Customize",
    description: "Choose which platforms you need icons for (iOS, Android, Apple Watch) and customize background color, padding, and other settings.",
    icon: Settings,
    details: [
      "iOS iPhone/iPad (20 different sizes)",
      "Apple Watch (6 different sizes)", 
      "Android (7 density levels)",
      "Custom background colors",
      "Adjustable padding settings"
    ]
  },
  {
    step: 3,
    title: "Automatic Processing",
    description: "Our advanced algorithms automatically resize your image to all required dimensions while maintaining quality and ensuring perfect scaling.",
    icon: Zap,
    details: [
      "High-quality resizing algorithms",
      "Zero cropping guarantee",
      "Quality preservation",
      "Background processing (non-blocking)",
      "Real-time progress tracking"
    ]
  },
  {
    step: 4,
    title: "Download All Icons",
    description: "Download your complete icon set as a ZIP file with organized folders for each platform, ready for immediate use in your app development.",
    icon: Download,
    details: [
      "ZIP file with organized structure",
      "Platform-specific folders",
      "All 41+ icon sizes included",
      "Instant download option",
      "No registration required"
    ]
  }
];

const features = [
  {
    icon: Shield,
    title: "Privacy-Focused",
    description: "All processing happens in your browser. Your images never leave your device, ensuring complete privacy and security."
  },
  {
    icon: Clock,
    title: "Lightning Fast",
    description: "Generate all 41+ icon sizes in seconds. No waiting for server processing or upload delays."
  },
  {
    icon: CheckCircle,
    title: "Zero Cropping",
    description: "Our algorithms ensure your icons are perfectly scaled without any cropping or distortion."
  },
  {
    icon: Smartphone,
    title: "Platform Complete",
    description: "Cover all iOS, Android, and Apple Watch requirements with a single upload."
  }
];

const platforms = [
  {
    name: "iOS iPhone/iPad",
    icon: Smartphone,
    sizes: "20 different sizes",
    description: "Complete coverage for iPhone, iPad, and App Store requirements including settings, spotlight, and notification icons."
  },
  {
    name: "Apple Watch",
    icon: Watch,
    sizes: "6 different sizes",
    description: "Specialized sizes for Apple Watch apps, optimized for different watch models and screen densities."
  },
  {
    name: "Android",
    icon: Tablet,
    sizes: "7 density levels",
    description: "Full Android adaptive icon set supporting all device densities from LDPI to XXXHDPI."
  }
];

export function HowItWorksPage() {
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
                How Does App Icon Resizer Work?
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              App Icon Resizer works by automatically resizing your original logo to all required iOS and Android icon sizes. 
              Simply drag and drop your 1024×1024px image onto the upload area or upload it manually. 
              The image is uploaded and the icons are generated automatically. Activate the instant download option to directly download all icons.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-accent-500/20 text-accent-400 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span>4 Simple Steps</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full">
                <Clock className="h-4 w-4" />
                <span>Seconds to Complete</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4" />
                <span>100% Private</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Step-by-Step Process
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Follow these 4 simple steps to generate all your app icons automatically
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg shadow-accent-500/25">
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-accent-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-lg text-gray-300 mb-6">{step.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-2 text-gray-400">
                        <CheckCircle className="h-4 w-4 text-accent-400 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose App Icon Resizer?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional-grade icon generation with enterprise-level features, completely free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-glass border border-dark-600 p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent-500/25">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Coverage */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Complete Platform Coverage
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Generate icons for all major platforms with a single upload
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div key={index} className="card-glass border border-dark-600 p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent-500/25">
                  <platform.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{platform.name}</h3>
                <div className="text-accent-400 font-medium mb-4">{platform.sizes}</div>
                <p className="text-gray-400">{platform.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Best Practices for App Icon Resizing
            </h2>
            <p className="text-xl text-gray-400">
              Follow these guidelines for optimal results
            </p>
          </div>

          <div className="space-y-6">
            <div className="card-glass border border-dark-600 p-6">
              <h3 className="text-xl font-bold text-white mb-3">Image Requirements</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent-400" />
                  <span>Use high-resolution images (512×512 or 1024×1024 pixels)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent-400" />
                  <span>PNG format recommended for best quality and transparency</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent-400" />
                  <span>Ensure your logo has adequate padding around edges</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent-400" />
                  <span>Keep file size under 10MB for optimal processing</span>
                </div>
              </div>
            </div>

            <div className="card-glass border border-dark-600 p-6">
              <h3 className="text-xl font-bold text-white mb-3">Design Tips</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent-400" />
                  <span>Design for the smallest size (29×29) to ensure readability</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent-400" />
                  <span>Use simple, recognizable shapes and avoid fine details</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent-400" />
                  <span>Test your icon on different background colors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent-400" />
                  <span>Ensure good contrast for accessibility</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Create Your App Icons?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust App Icon Resizer for their app icon needs. 
            Fast, free, and privacy-focused.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/#upload-section"
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>Start Creating Icons</span>
            </a>
            <a 
              href="/icon-sizes"
              className="btn-outline flex items-center justify-center space-x-2"
            >
              <Smartphone className="h-5 w-5" />
              <span>View Icon Sizes</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 