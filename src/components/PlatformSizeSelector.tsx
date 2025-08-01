import React, { useState } from 'react';
import type { Platform, IconSize, CustomSize } from '../types';
import { Smartphone, Tablet, Check, Plus, X } from 'lucide-react';
import { iOS_SIZES, ANDROID_SIZES, APPLE_WATCH_SIZES, SMART_WATCH_SIZES } from '../utils/constants';
import { CustomSizeAdder } from './CustomSizeAdder';

interface PlatformSizeSelectorProps {
  selectedPlatforms: Platform[];
  selectedSizes: (IconSize | CustomSize)[];
  onPlatformChange: (platforms: Platform[]) => void;
  onSizeChange: (sizes: (IconSize | CustomSize)[]) => void;
  disabled?: boolean;
}

export function PlatformSizeSelector({
  selectedPlatforms,
  selectedSizes,
  onPlatformChange,
  onSizeChange,
  disabled = false
}: PlatformSizeSelectorProps) {
  const [customSizes, setCustomSizes] = useState<CustomSize[]>([]);
  const [showSizeSelection, setShowSizeSelection] = useState<Platform | null>(null);

  const platforms = [
    {
      name: 'All' as Platform,
      icon: Smartphone,
      description: '31 sizes for all platforms',
      sizeCount: iOS_SIZES.sizes.length + ANDROID_SIZES.sizes.length,
      sizes: [...iOS_SIZES.sizes, ...ANDROID_SIZES.sizes]
    },
    {
      name: 'iOS' as Platform,
      icon: Smartphone,
      description: '18 sizes for iPhone & iPad',
      sizeCount: iOS_SIZES.sizes.length,
      sizes: iOS_SIZES.sizes
    },
    {
      name: 'Android' as Platform,
      icon: Tablet,
      description: '13 sizes for all densities',
      sizeCount: ANDROID_SIZES.sizes.length,
      sizes: ANDROID_SIZES.sizes
    },
    {
      name: 'Apple Watch' as Platform,
      icon: Smartphone,
      description: '8 sizes for Apple Watch',
      sizeCount: APPLE_WATCH_SIZES.sizes.length,
      sizes: APPLE_WATCH_SIZES.sizes
    },
    {
      name: 'Smart Watch' as Platform,
      icon: Smartphone,
      description: '6 sizes for Wear OS',
      sizeCount: SMART_WATCH_SIZES.sizes.length,
      sizes: SMART_WATCH_SIZES.sizes
    },
    {
      name: 'Custom' as Platform,
      icon: Smartphone,
      description: 'Create your own sizes',
      sizeCount: customSizes.length,
      sizes: customSizes
    }
  ];

  const handlePlatformToggle = (platform: Platform) => {
    if (disabled) return;
    
    if (selectedPlatforms.includes(platform)) {
      // If deselecting "All" or "Custom", just remove it
      const newPlatforms = selectedPlatforms.filter(p => p !== platform);
      onPlatformChange(newPlatforms);
    } else {
      // If selecting "All" or "Custom", unselect all other platforms
      if (platform === 'All' || platform === 'Custom') {
        onPlatformChange([platform]);
      } else {
        // If selecting other platforms, unselect "All" and "Custom" if they're selected
        const newPlatforms = selectedPlatforms.filter(p => p !== 'All' && p !== 'Custom');
        onPlatformChange([...newPlatforms, platform]);
      }
    }
    
    // Show size selection for this platform
    setShowSizeSelection(platform);
  };

  const handleSizeToggle = (size: IconSize | CustomSize) => {
    if (disabled) return;
    
    const isSelected = selectedSizes.some(s => {
      if ('isCustom' in size && size.isCustom) {
        if ('isCustom' in s && s.isCustom) {
          return s.id === size.id;
        }
        return false;
      }
      return s.width === size.width && s.height === size.height && s.name === size.name;
    });
    
    if (isSelected) {
      const newSizes = selectedSizes.filter(s => {
        if ('isCustom' in size && size.isCustom) {
          if ('isCustom' in s && s.isCustom) {
            return s.id !== size.id;
          }
          return true;
        }
        return !(s.width === size.width && s.height === size.height && s.name === size.name);
      });
      onSizeChange(newSizes);
    } else {
      onSizeChange([...selectedSizes, size]);
    }
  };

  const handleAddCustomSize = (newSize: CustomSize) => {
    setCustomSizes(prev => [...prev, newSize]);
    onSizeChange([...selectedSizes, newSize]);
  };

  const handleRemoveCustomSize = (id: string) => {
    setCustomSizes(prev => prev.filter(size => size.id !== id));
    const newSelectedSizes = selectedSizes.filter(s => !('isCustom' in s && s.isCustom && s.id === id));
    onSizeChange(newSelectedSizes);
  };

  const getCurrentPlatform = () => {
    return platforms.find(p => p.name === showSizeSelection);
  };

  const getAvailableSizes = () => {
    if (!showSizeSelection) return [];
    
    const platform = getCurrentPlatform();
    if (!platform) return [];
    
    if (platform.name === 'Custom') {
      return customSizes;
    }
    
    return platform.sizes;
  };

  return (
    <div className="space-y-8">
      {/* Platform Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.name);
          const Icon = platform.icon;
          
          return (
            <button
              key={platform.name}
              onClick={() => handlePlatformToggle(platform.name)}
              disabled={disabled}
              className={`
                relative group p-8 rounded-3xl text-left transition-all duration-500 transform hover:scale-105
                ${isSelected 
                  ? 'bg-gradient-to-br from-accent-500/20 to-accent-600/20 border-2 border-accent-500/50 shadow-2xl shadow-accent-500/20' 
                  : 'bg-gradient-to-br from-dark-800/80 to-dark-700/80 border-2 border-dark-600/50 hover:border-accent-500/30 hover:bg-gradient-to-br hover:from-dark-800/90 hover:to-dark-700/90'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                backdrop-blur-xl
              `}
            >
              {/* Background glow effect */}
              <div className={`
                absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500
                ${isSelected ? 'bg-gradient-to-br from-accent-500/10 to-accent-600/10 opacity-100' : 'group-hover:opacity-100'}
              `} />
              
              <div className="relative z-10 flex items-center space-x-6">
                <div className={`
                  p-3 rounded-2xl transition-all duration-500
                  ${isSelected 
                    ? 'bg-gradient-to-br from-accent-500 to-accent-600 shadow-lg shadow-accent-500/30' 
                    : 'bg-gradient-to-br from-dark-700 to-dark-600 group-hover:bg-gradient-to-br group-hover:from-accent-500/20 group-hover:to-accent-600/20'
                  }
                `}>
                  <Icon className={`h-8 w-8 transition-colors duration-500 ${
                    isSelected ? 'text-white' : 'text-gray-400 group-hover:text-accent-400'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-xl font-bold transition-colors duration-500 ${
                      isSelected ? 'text-accent-400' : 'text-white group-hover:text-accent-400'
                    }`}>
                      {platform.name}
                    </h3>
                    <span className={`
                      text-sm font-bold px-3 py-1.5 rounded-full transition-all duration-500
                      ${isSelected 
                        ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30' 
                        : 'bg-dark-600 text-gray-400 group-hover:bg-accent-500/20 group-hover:text-accent-400'
                      }
                    `}>
                      {platform.sizeCount} sizes
                    </span>
                  </div>
                  <p className={`text-sm transition-colors duration-500 ${
                    isSelected ? 'text-accent-300' : 'text-gray-400 group-hover:text-gray-300'
                  }`}>
                    {platform.description}
                  </p>
                </div>
              </div>
              
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="h-6 w-6 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center shadow-lg shadow-accent-500/30">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Size Selection */}
      {showSizeSelection && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              Select {showSizeSelection} Sizes
            </h3>
            <button
              onClick={() => setShowSizeSelection(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {showSizeSelection === 'Custom' ? (
            <CustomSizeAdder
              onAddSize={handleAddCustomSize}
              onRemoveSize={handleRemoveCustomSize}
              onSizeToggle={handleSizeToggle}
              customSizes={customSizes}
              selectedSizes={selectedSizes}
              disabled={disabled}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {getAvailableSizes().length} sizes available
                </span>
                <div className="flex space-x-2">
                                     <button
                     onClick={() => {
                       const allSizes = getAvailableSizes();
                       onSizeChange([...selectedSizes, ...allSizes]);
                     }}
                     disabled={disabled}
                     className="btn-secondary text-sm px-3 py-1"
                   >
                     Select All
                   </button>
                   <button
                     onClick={() => {
                       const platformSizes = getAvailableSizes();
                       const otherSizes = selectedSizes.filter(s => {
                         // If current platform is "All", deselect all sizes
                         if (showSizeSelection === 'All') {
                           return false;
                         }
                         // If current platform is "Custom", only deselect custom sizes
                         if (showSizeSelection === 'Custom') {
                           return !('isCustom' in s && s.isCustom);
                         }
                         // For other platforms, deselect only their sizes
                         return !platformSizes.some(ps => 
                           ps.width === s.width && ps.height === s.height && ps.name === s.name
                         );
                       });
                       onSizeChange(otherSizes);
                     }}
                     disabled={disabled}
                     className="btn-secondary text-sm px-3 py-1"
                   >
                     Deselect All
                   </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
                {getAvailableSizes().map((size, index) => {
                  const isSelected = selectedSizes.some(s => {
                    if ('isCustom' in size && size.isCustom) {
                      if ('isCustom' in s && s.isCustom) {
                        return s.id === size.id;
                      }
                      return false;
                    }
                    return s.width === size.width && s.height === size.height && s.name === size.name;
                  });
                  
                  return (
                    <button
                      key={`${size.width}-${size.height}-${index}`}
                      onClick={() => handleSizeToggle(size)}
                      disabled={disabled}
                      className={`
                        relative p-4 rounded-2xl border-2 text-left transition-all duration-500 group overflow-hidden
                        ${isSelected 
                          ? 'border-accent-500/50 bg-gradient-to-br from-accent-500/10 to-accent-600/5 shadow-xl shadow-accent-500/20' 
                          : 'border-dark-600/50 hover:border-accent-500/30 hover:bg-gradient-to-br hover:from-dark-800/50 hover:to-dark-700/50'
                        }
                        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'}
                        backdrop-blur-sm
                      `}
                    >
                      <div className="relative flex items-center space-x-4">
                        <div className={`p-2 rounded-xl transition-all duration-500 ${
                          isSelected 
                            ? 'bg-gradient-to-br from-accent-500 to-accent-600 shadow-lg shadow-accent-500/30' 
                            : 'bg-gradient-to-br from-dark-700 to-dark-600 group-hover:bg-gradient-to-br group-hover:from-accent-500/20 group-hover:to-accent-600/20'
                        }`}>
                          <Smartphone className={`h-5 w-5 transition-colors duration-500 ${
                            isSelected ? 'text-white' : 'text-gray-400 group-hover:text-accent-400'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-bold truncate transition-colors duration-300 ${
                              isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
                            }`}>
                              {size.name}
                            </h4>
                            <span className={`
                              text-sm font-bold px-2 py-1 rounded-full transition-all duration-300
                              ${isSelected 
                                ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30' 
                                : 'bg-dark-600 text-gray-400 group-hover:bg-accent-500/20 group-hover:text-accent-400'
                              }
                            `}>
                              {size.width}×{size.height}
                            </span>
                          </div>
                          <p className={`text-sm truncate transition-colors duration-300 ${
                            isSelected ? 'text-accent-300' : 'text-gray-400 group-hover:text-gray-300'
                          }`}>
                            {size.description}
                          </p>
                        </div>
                        
                        {isSelected && (
                          <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full shadow-lg shadow-accent-500/30">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      
      {selectedPlatforms.length === 0 && (
        <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
          <p className="text-red-400 font-medium">Please select at least one platform</p>
        </div>
      )}
    </div>
  );
} 