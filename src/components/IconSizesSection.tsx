import React from 'react';
import { Smartphone, Tablet, Watch, Zap, Download } from 'lucide-react';

interface IconSize {
  width: number;
  height: number;
  name: string;
  description?: string;
}

const IOS_IPHONE_IPAD_SIZES: IconSize[] = [
  { width: 29, height: 29, name: "Settings" },
  { width: 40, height: 40, name: "Spotlight" },
  { width: 50, height: 50, name: "Settings" },
  { width: 57, height: 57, name: "Legacy" },
  { width: 58, height: 58, name: "Settings" },
  { width: 72, height: 72, name: "iPad Settings" },
  { width: 76, height: 76, name: "iPad Settings" },
  { width: 80, height: 80, name: "Spotlight" },
  { width: 100, height: 100, name: "App Store" },
  { width: 114, height: 114, name: "iPhone Settings" },
  { width: 120, height: 120, name: "iPhone Settings" },
  { width: 144, height: 144, name: "iPad Settings" },
  { width: 152, height: 152, name: "iPad Settings" },
  { width: 167, height: 167, name: "iPad Pro Settings" },
  { width: 180, height: 180, name: "iPhone Settings" },
  { width: 512, height: 512, name: "App Store" },
  { width: 1024, height: 1024, name: "App Store" },
  { width: 87, height: 87, name: "iPad Spotlight" },
  { width: 20, height: 20, name: "Notification" },
  { width: 60, height: 60, name: "Settings" },
  { width: 16, height: 16, name: "Legacy" },
  { width: 24, height: 24, name: "Legacy" },
  { width: 32, height: 32, name: "Legacy" },
  { width: 48, height: 48, name: "Legacy" },
  { width: 64, height: 64, name: "Legacy" },
  { width: 128, height: 128, name: "Legacy" },
  { width: 256, height: 256, name: "Legacy" },
];

const IOS_WATCH_SIZES: IconSize[] = [
  { width: 48, height: 48, name: "Watch Settings" },
  { width: 55, height: 55, name: "Watch Settings" },
  { width: 80, height: 80, name: "Watch Settings" },
  { width: 88, height: 88, name: "Watch Settings" },
  { width: 172, height: 172, name: "Watch Settings" },
  { width: 196, height: 196, name: "Watch Settings" },
];

const ANDROID_SIZES: IconSize[] = [
  { width: 36, height: 36, name: "LDPI", description: "Low Density" },
  { width: 48, height: 48, name: "MDPI", description: "Medium Density" },
  { width: 72, height: 72, name: "HDPI", description: "High Density" },
  { width: 96, height: 96, name: "XHDPI", description: "Extra High Density" },
  { width: 144, height: 144, name: "XXHDPI", description: "Extra Extra High Density" },
  { width: 192, height: 192, name: "XXXHDPI", description: "Extra Extra Extra High Density" },
  { width: 512, height: 512, name: "Google Play Store", description: "Play Store" },
];

export function IconSizesSection() {
  return (
    <section id="icon-sizes" className="py-16 bg-dark-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Complete Icon Size Coverage
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Generate all required icon sizes for iOS iPhone/iPad, iOS Watch, and Android platforms. 
            Best results achieved with 512x512 or 1024x1024 pixel source images.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* iOS iPhone/iPad */}
          <div className="card-glass border border-dark-600">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Smartphone className="h-6 w-6 text-accent-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">iOS. iPhone/iPad.</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {IOS_IPHONE_IPAD_SIZES.map((size, index) => (
                  <div key={index} className="flex justify-between items-center py-1 px-2 bg-dark-700/50 rounded">
                    <span className="text-gray-300">{size.width}x{size.height}</span>
                    <span className="text-accent-400 text-xs">{size.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* iOS Watch */}
          <div className="card-glass border border-dark-600">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Watch className="h-6 w-6 text-accent-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">iOS. Watch.</h3>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {IOS_WATCH_SIZES.map((size, index) => (
                  <div key={index} className="flex justify-between items-center py-1 px-2 bg-dark-700/50 rounded">
                    <span className="text-gray-300">{size.width}x{size.height}</span>
                    <span className="text-accent-400 text-xs">{size.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Android */}
          <div className="card-glass border border-dark-600">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Tablet className="h-6 w-6 text-accent-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Android.</h3>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {ANDROID_SIZES.map((size, index) => (
                  <div key={index} className="flex justify-between items-center py-1 px-2 bg-dark-700/50 rounded">
                    <div>
                      <span className="text-gray-300">{size.width}x{size.height}</span>
                      {size.description && (
                        <span className="text-gray-500 text-xs ml-2">({size.description})</span>
                      )}
                    </div>
                    <span className="text-accent-400 text-xs">{size.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-accent-500/10 to-blue-500/10 rounded-2xl p-8 border border-accent-500/20">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-accent-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">
                Ready to Generate Your Icons?
              </h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Upload your 512x512 or 1024x1024 pixel image and get all required icon sizes instantly. 
              Activate instant download for immediate results.
            </p>
            <button 
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary flex items-center justify-center space-x-2 mx-auto"
            >
              <Download className="h-5 w-5" />
              <span>Start Generating Icons</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 