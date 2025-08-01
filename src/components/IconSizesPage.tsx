import React from 'react';
import { Smartphone, Tablet, Watch, Download, ArrowLeft, Info, CheckCircle } from 'lucide-react';

interface IconSize {
  width: number;
  height: number;
  name: string;
  description?: string;
  usage: string;
}

const IOS_IPHONE_IPAD_SIZES: IconSize[] = [
  { width: 1024, height: 1024, name: "App Store", usage: "Primary app store listing", description: "Required for App Store submission" },
  { width: 512, height: 512, name: "App Store", usage: "App Store listing", description: "Alternative App Store size" },
  { width: 180, height: 180, name: "iPhone Settings", usage: "iPhone home screen and settings", description: "iPhone 6 Plus and newer" },
  { width: 167, height: 167, name: "iPad Pro Settings", usage: "iPad Pro home screen", description: "iPad Pro 12.9-inch" },
  { width: 152, height: 152, name: "iPad Settings", usage: "iPad home screen and settings", description: "iPad (all models)" },
  { width: 144, height: 144, name: "iPad Settings", usage: "iPad home screen", description: "iPad (legacy)" },
  { width: 120, height: 120, name: "iPhone Settings", usage: "iPhone home screen", description: "iPhone (all models)" },
  { width: 114, height: 114, name: "iPhone Settings", usage: "iPhone home screen", description: "iPhone (legacy)" },
  { width: 100, height: 100, name: "App Store", usage: "App Store search results", description: "App Store search" },
  { width: 87, height: 87, name: "iPad Spotlight", usage: "iPad spotlight search", description: "iPad spotlight" },
  { width: 80, height: 80, name: "Spotlight", usage: "Spotlight search results", description: "Spotlight search" },
  { width: 76, height: 76, name: "iPad Settings", usage: "iPad settings", description: "iPad settings" },
  { width: 72, height: 72, name: "iPad Settings", usage: "iPad settings", description: "iPad settings (legacy)" },
  { width: 60, height: 60, name: "Settings", usage: "Settings app", description: "Settings app" },
  { width: 58, height: 58, name: "Settings", usage: "Settings app", description: "Settings app" },
  { width: 50, height: 50, name: "Settings", usage: "Settings app", description: "Settings app" },
  { width: 40, height: 40, name: "Spotlight", usage: "Spotlight search", description: "Spotlight search" },
  { width: 29, height: 29, name: "Settings", usage: "Settings app", description: "Settings app" },
  { width: 20, height: 20, name: "Notification", usage: "Notification center", description: "Notification center" },
];

const IOS_WATCH_SIZES: IconSize[] = [
  { width: 196, height: 196, name: "Watch Settings", usage: "Apple Watch home screen", description: "Apple Watch Series 4 and newer" },
  { width: 172, height: 172, name: "Watch Settings", usage: "Apple Watch home screen", description: "Apple Watch Series 3" },
  { width: 88, height: 88, name: "Watch Settings", usage: "Apple Watch settings", description: "Apple Watch settings" },
  { width: 80, height: 80, name: "Watch Settings", usage: "Apple Watch settings", description: "Apple Watch settings" },
  { width: 55, height: 55, name: "Watch Settings", usage: "Apple Watch settings", description: "Apple Watch settings" },
  { width: 48, height: 48, name: "Watch Settings", usage: "Apple Watch settings", description: "Apple Watch settings" },
];

const ANDROID_SIZES: IconSize[] = [
  { width: 512, height: 512, name: "Google Play Store", usage: "Play Store listing", description: "Required for Play Store submission" },
  { width: 192, height: 192, name: "XXXHDPI", usage: "Extra Extra Extra High Density", description: "4K displays and high-end devices" },
  { width: 144, height: 144, name: "XXHDPI", usage: "Extra Extra High Density", description: "QHD displays and modern devices" },
  { width: 96, height: 96, name: "XHDPI", usage: "Extra High Density", description: "HD displays and tablets" },
  { width: 72, height: 72, name: "HDPI", usage: "High Density", description: "Standard modern devices" },
  { width: 48, height: 48, name: "MDPI", usage: "Medium Density", description: "Standard density devices" },
  { width: 36, height: 36, name: "LDPI", usage: "Low Density", description: "Legacy low-density devices" },
];

export function IconSizesPage() {
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
                Complete App Icon Size Guide
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Comprehensive guide to all required icon sizes for iOS, Android, and Apple Watch app development. 
              Generate all sizes automatically with our free tool.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-accent-500/20 text-accent-400 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span>41+ Icon Sizes</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full">
                <Info className="h-4 w-4" />
                <span>Platform Specific</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full">
                <Download className="h-4 w-4" />
                <span>Instant Generation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* iOS iPhone/iPad Section */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Smartphone className="h-8 w-8 text-accent-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">iOS iPhone & iPad Icon Sizes</h2>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              All required icon sizes for iOS app development, including iPhone, iPad, and App Store requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IOS_IPHONE_IPAD_SIZES.map((size, index) => (
              <div key={index} className="card-glass border border-dark-600 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-white">{size.width}×{size.height}</div>
                  <div className="text-accent-400 text-sm font-medium">{size.name}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-300 font-medium">{size.usage}</div>
                  {size.description && (
                    <div className="text-gray-500 text-sm">{size.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* iOS Watch Section */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Watch className="h-8 w-8 text-accent-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">Apple Watch Icon Sizes</h2>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Specialized icon sizes for Apple Watch apps, optimized for different watch models and screen sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IOS_WATCH_SIZES.map((size, index) => (
              <div key={index} className="card-glass border border-dark-600 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-white">{size.width}×{size.height}</div>
                  <div className="text-accent-400 text-sm font-medium">{size.name}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-300 font-medium">{size.usage}</div>
                  {size.description && (
                    <div className="text-gray-500 text-sm">{size.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Android Section */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Tablet className="h-8 w-8 text-accent-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">Android Icon Sizes</h2>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Complete Android adaptive icon set supporting all device densities from LDPI to XXXHDPI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ANDROID_SIZES.map((size, index) => (
              <div key={index} className="card-glass border border-dark-600 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-white">{size.width}×{size.height}</div>
                  <div className="text-accent-400 text-sm font-medium">{size.name}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-300 font-medium">{size.usage}</div>
                  {size.description && (
                    <div className="text-gray-500 text-sm">{size.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Generate All Icon Sizes Automatically
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Upload your 1024×1024 pixel image and get all 41+ required icon sizes instantly. 
            No manual resizing needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/#upload-section"
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Start Generating Icons</span>
            </a>
            <a 
              href="/how-it-works"
              className="btn-outline flex items-center justify-center space-x-2"
            >
              <Info className="h-5 w-5" />
              <span>Learn How It Works</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 