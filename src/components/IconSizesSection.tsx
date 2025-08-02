import React from 'react';
import { Smartphone, Tablet, Watch, Zap, Download } from 'lucide-react';
import { iOS_SIZES, ANDROID_SIZES, APPLE_WATCH_SIZES, SMART_WATCH_SIZES } from '../utils/constants';

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
            Generate all required icon sizes for iOS iPhone/iPad, Apple Watch, Android, and Smart Watch platforms. 
            Best results achieved with 512x512 or 1024x1024 pixel source images.
          </p>
        </div>

                 <div className="grid lg:grid-cols-2 gap-8">
           {/* iOS iPhone/iPad */}
           <div className="card-glass border border-dark-600">
             <div className="p-8">
               <div className="flex items-center mb-6">
                 <Smartphone className="h-7 w-7 text-accent-400 mr-4" />
                 <h3 className="text-2xl font-semibold text-white">iOS iPhone/iPad</h3>
               </div>
               <div className="grid grid-cols-1 gap-3 text-sm">
                 {iOS_SIZES.sizes.map((size, index) => (
                   <div key={index} className="flex justify-between items-center py-3 px-4 bg-dark-700/50 rounded-lg border border-dark-600/30">
                     <span className="text-gray-300 font-medium">{size.width}×{size.height}</span>
                     <span className="text-accent-400 text-sm font-medium">{size.name}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>

           {/* Android */}
           <div className="card-glass border border-dark-600">
             <div className="p-8">
               <div className="flex items-center mb-6">
                 <Tablet className="h-7 w-7 text-accent-400 mr-4" />
                 <h3 className="text-2xl font-semibold text-white">Android</h3>
               </div>
               <div className="grid grid-cols-1 gap-3 text-sm">
                 {ANDROID_SIZES.sizes.map((size, index) => (
                   <div key={index} className="flex justify-between items-center py-3 px-4 bg-dark-700/50 rounded-lg border border-dark-600/30">
                     <span className="text-gray-300 font-medium">{size.width}×{size.height}</span>
                     <span className="text-accent-400 text-sm font-medium">{size.name}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>

           {/* Apple Watch */}
           <div className="card-glass border border-dark-600">
             <div className="p-8">
               <div className="flex items-center mb-6">
                 <Watch className="h-7 w-7 text-accent-400 mr-4" />
                 <h3 className="text-2xl font-semibold text-white">Apple Watch</h3>
               </div>
               <div className="grid grid-cols-1 gap-3 text-sm">
                 {APPLE_WATCH_SIZES.sizes.map((size, index) => (
                   <div key={index} className="flex justify-between items-center py-3 px-4 bg-dark-700/50 rounded-lg border border-dark-600/30">
                     <span className="text-gray-300 font-medium">{size.width}×{size.height}</span>
                     <span className="text-accent-400 text-sm font-medium">{size.name}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>

           {/* Smart Watch */}
           <div className="card-glass border border-dark-600">
             <div className="p-8">
               <div className="flex items-center mb-6">
                 <Watch className="h-7 w-7 text-accent-400 mr-4" />
                 <h3 className="text-2xl font-semibold text-white">Smart Watch</h3>
               </div>
               <div className="grid grid-cols-1 gap-3 text-sm">
                 {SMART_WATCH_SIZES.sizes.map((size, index) => (
                   <div key={index} className="flex justify-between items-center py-3 px-4 bg-dark-700/50 rounded-lg border border-dark-600/30">
                     <span className="text-gray-300 font-medium">{size.width}×{size.height}</span>
                     <span className="text-accent-400 text-sm font-medium">{size.name}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>

        {/* Additional Information */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          {/* Best Practices */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-6">Best Practices for App Icons</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Use high-resolution source images (1024x1024px recommended) for best quality across all sizes</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Ensure your icon design works well at small sizes - test readability at 29x29px</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Use simple, recognizable designs that are easily identifiable on device home screens</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Avoid text in your icon design as it becomes unreadable at smaller sizes</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Test your icons on actual devices to ensure they look good in real-world conditions</p>
              </div>
            </div>
          </div>

          {/* Platform Guidelines */}
          <div className="bg-gradient-to-r from-green-500/10 to-accent-500/10 rounded-2xl p-8 border border-green-500/20">
            <h3 className="text-2xl font-bold text-white mb-6">Platform-Specific Guidelines</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-green-300 mb-3">iOS Guidelines</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• App Store icons must be opaque (no transparency)</li>
                  <li>• Use PNG format for best quality</li>
                  <li>• Icons are automatically rounded by iOS</li>
                  <li>• Support both iPhone and iPad resolutions</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-accent-300 mb-3">Android Guidelines</h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Multiple density variants for different screen densities</li>
                  <li>• Adaptive icons support foreground and background layers</li>
                  <li>• Material Design principles recommended</li>
                  <li>• Safe zone considerations for adaptive icons</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* External Resources */}
        <div className="mt-12 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-8 border border-amber-500/20">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Official Platform Documentation</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-amber-300 mb-4">Apple Developer Resources</h4>
              <div className="space-y-3">
                <a 
                  href="https://developer.apple.com/design/human-interface-guidelines/app-icons" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-accent-400 hover:text-accent-300 transition-colors"
                >
                  iOS App Icon Guidelines
                </a>
                <a 
                  href="https://developer.apple.com/design/human-interface-guidelines/watchos/icons" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-accent-400 hover:text-accent-300 transition-colors"
                >
                  watchOS Icon Guidelines
                </a>
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-amber-300 mb-4">Android Developer Resources</h4>
              <div className="space-y-3">
                <a 
                  href="https://developer.android.com/guide/practices/ui_guidelines/icon_design" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-accent-400 hover:text-accent-300 transition-colors"
                >
                  Android Icon Design Guidelines
                </a>
                <a 
                  href="https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-accent-400 hover:text-accent-300 transition-colors"
                >
                  Adaptive Icon Guidelines
                </a>
                <a 
                  href="https://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-accent-400 hover:text-accent-300 transition-colors"
                >
                  Launcher Icon Guidelines
                </a>
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