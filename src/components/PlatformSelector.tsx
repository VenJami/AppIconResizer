import type { Platform } from '../types';
import { Smartphone, Tablet, Check } from 'lucide-react';
import { iOS_SIZES, ANDROID_SIZES } from '../utils/constants';

interface PlatformSelectorProps {
  selectedPlatforms: Platform[];
  onPlatformChange: (platforms: Platform[]) => void;
  disabled?: boolean;
}

export function PlatformSelector({
  selectedPlatforms,
  onPlatformChange,
  disabled = false
}: PlatformSelectorProps) {
  const handlePlatformToggle = (platform: Platform) => {
    if (disabled) return;
    
    if (selectedPlatforms.includes(platform)) {
      const newPlatforms = selectedPlatforms.filter(p => p !== platform);
      // Ensure at least one platform is selected
      if (newPlatforms.length > 0) {
        onPlatformChange(newPlatforms);
      }
    } else {
      onPlatformChange([...selectedPlatforms, platform]);
    }
  };
  
  const platforms = [
    {
      name: 'All' as Platform,
      icon: Smartphone,
      description: '31 sizes for all platforms',
      sizeCount: iOS_SIZES.sizes.length + ANDROID_SIZES.sizes.length
    },
    {
      name: 'iOS' as Platform,
      icon: Smartphone,
      description: '18 sizes for iPhone & iPad',
      sizeCount: iOS_SIZES.sizes.length
    },
    {
      name: 'Android' as Platform,
      icon: Tablet,
      description: '13 sizes for all densities',
      sizeCount: ANDROID_SIZES.sizes.length
    },
    {
      name: 'Apple Watch' as Platform,
      icon: Smartphone,
      description: '8 sizes for Apple Watch',
      sizeCount: 8
    },
    {
      name: 'Smart Watch' as Platform,
      icon: Smartphone,
      description: '6 sizes for Wear OS',
      sizeCount: 6
    },
    {
      name: 'Custom' as Platform,
      icon: Smartphone,
      description: 'Create your own sizes',
      sizeCount: 0
    }
  ];
  
  return (
    <div className="space-y-6">
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
      
      {selectedPlatforms.length === 0 && (
        <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
          <p className="text-red-400 font-medium">Please select at least one platform</p>
        </div>
      )}
    </div>
  );
}