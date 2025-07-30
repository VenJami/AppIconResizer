import type { Platform } from '../types';
import { Smartphone, Tablet } from 'lucide-react';

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
      name: 'iOS' as Platform,
      icon: Smartphone,
      description: '8 sizes for iPhone & iPad',
      sizeCount: 8
    },
    {
      name: 'Android' as Platform,
      icon: Tablet,
      description: '6 sizes for all densities',
      sizeCount: 6
    }
  ];
  
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Select Platforms
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.name);
          const Icon = platform.icon;
          
          return (
            <button
              key={platform.name}
              onClick={() => handlePlatformToggle(platform.name)}
              disabled={disabled}
              className={`
                relative p-4 rounded-lg border-2 text-left transition-all duration-200
                ${isSelected 
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-6 w-6 ${isSelected ? 'text-primary-600' : 'text-gray-400'}`} />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${isSelected ? 'text-primary-900' : 'text-gray-900'}`}>
                      {platform.name}
                    </h3>
                    <span className={`
                      text-xs font-medium px-2 py-1 rounded-full
                      ${isSelected 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}>
                      {platform.sizeCount} sizes
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${isSelected ? 'text-primary-700' : 'text-gray-500'}`}>
                    {platform.description}
                  </p>
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="h-2 w-2 bg-primary-500 rounded-full" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {selectedPlatforms.length === 0 && (
        <p className="text-sm text-red-600">Please select at least one platform</p>
      )}
    </div>
  );
}