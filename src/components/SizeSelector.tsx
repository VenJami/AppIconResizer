import { useState } from 'react';
import type { IconSize } from '../types';
import { iOS_SIZES, ANDROID_SIZES } from '../utils/constants';
import { Smartphone, Tablet, Check } from 'lucide-react';

interface SizeSelectorProps {
  selectedSizes: IconSize[];
  onSizeChange: (sizes: IconSize[]) => void;
  disabled?: boolean;
}

export function SizeSelector({
  selectedSizes,
  onSizeChange,
  disabled = false
}: SizeSelectorProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'ios' | 'android'>('all');

  const allSizes = [...iOS_SIZES.sizes, ...ANDROID_SIZES.sizes];
  
  const getDisplaySizes = () => {
    switch (activeTab) {
      case 'ios':
        return iOS_SIZES.sizes;
      case 'android':
        return ANDROID_SIZES.sizes;
      default:
        return allSizes;
    }
  };

  const handleSizeToggle = (size: IconSize) => {
    if (disabled) return;
    
    const isSelected = selectedSizes.some(s => 
      s.width === size.width && s.height === size.height && s.name === size.name
    );
    
    if (isSelected) {
      const newSizes = selectedSizes.filter(s => 
        !(s.width === size.width && s.height === size.height && s.name === size.name)
      );
      onSizeChange(newSizes);
    } else {
      onSizeChange([...selectedSizes, size]);
    }
  };

  const handleSelectAll = (platform?: 'ios' | 'android') => {
    if (disabled) return;
    
    let sizesToAdd: IconSize[] = [];
    if (platform === 'ios') {
      sizesToAdd = iOS_SIZES.sizes;
    } else if (platform === 'android') {
      sizesToAdd = ANDROID_SIZES.sizes;
    } else {
      sizesToAdd = allSizes;
    }
    
    // Remove existing sizes from the same platform and add new ones
    const otherSizes = selectedSizes.filter(selected => {
      if (platform === 'ios') {
        return !iOS_SIZES.sizes.some(ios => 
          ios.width === selected.width && ios.height === selected.height && ios.name === selected.name
        );
      } else if (platform === 'android') {
        return !ANDROID_SIZES.sizes.some(android => 
          android.width === selected.width && android.height === selected.height && android.name === selected.name
        );
      } else {
        return false; // Select all - replace everything
      }
    });
    
    onSizeChange([...otherSizes, ...sizesToAdd]);
  };

  const handleDeselectAll = (platform?: 'ios' | 'android') => {
    if (disabled) return;
    
    if (platform === 'ios') {
      const newSizes = selectedSizes.filter(selected => 
        !iOS_SIZES.sizes.some(ios => 
          ios.width === selected.width && ios.height === selected.height && ios.name === selected.name
        )
      );
      onSizeChange(newSizes);
    } else if (platform === 'android') {
      const newSizes = selectedSizes.filter(selected => 
        !ANDROID_SIZES.sizes.some(android => 
          android.width === selected.width && android.height === selected.height && android.name === selected.name
        )
      );
      onSizeChange(newSizes);
    } else {
      onSizeChange([]);
    }
  };

  const getSizeIcon = (size: IconSize) => {
    const isIOS = iOS_SIZES.sizes.some(ios => 
      ios.width === size.width && ios.height === size.height && ios.name === size.name
    );
    return isIOS ? Smartphone : Tablet;
  };

  const getSizePlatform = (size: IconSize) => {
    const isIOS = iOS_SIZES.sizes.some(ios => 
      ios.width === size.width && ios.height === size.height && ios.name === size.name
    );
    return isIOS ? 'iOS' : 'Android';
  };

  const displaySizes = getDisplaySizes();
  const iosSelected = iOS_SIZES.sizes.filter(ios => 
    selectedSizes.some(s => s.width === ios.width && s.height === ios.height && s.name === ios.name)
  ).length;
  const androidSelected = ANDROID_SIZES.sizes.filter(android => 
    selectedSizes.some(s => s.width === android.width && s.height === android.height && s.name === android.name)
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Select Icon Sizes ({selectedSizes.length} selected)
        </label>
        
        {selectedSizes.length > 0 && (
          <button
            onClick={() => handleDeselectAll()}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'all'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          All ({allSizes.length})
        </button>
        <button
          onClick={() => setActiveTab('ios')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'ios'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          iOS ({iosSelected}/{iOS_SIZES.sizes.length})
        </button>
        <button
          onClick={() => setActiveTab('android')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'android'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Android ({androidSelected}/{ANDROID_SIZES.sizes.length})
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => handleSelectAll(activeTab === 'all' ? undefined : activeTab)}
          disabled={disabled}
          className="btn-secondary text-xs"
        >
          Select {activeTab === 'all' ? 'All' : activeTab === 'ios' ? 'iOS' : 'Android'}
        </button>
        <button
          onClick={() => handleDeselectAll(activeTab === 'all' ? undefined : activeTab)}
          disabled={disabled}
          className="btn-secondary text-xs"
        >
          Deselect {activeTab === 'all' ? 'All' : activeTab === 'ios' ? 'iOS' : 'Android'}
        </button>
      </div>

      {/* Size Grid */}
      <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
        {displaySizes.map((size, index) => {
          const isSelected = selectedSizes.some(s => 
            s.width === size.width && s.height === size.height && s.name === size.name
          );
          const Icon = getSizeIcon(size);
          const platform = getSizePlatform(size);
          
          return (
            <button
              key={`${platform}-${size.width}-${size.height}-${index}`}
              onClick={() => handleSizeToggle(size)}
              disabled={disabled}
              className={`
                relative p-3 rounded-lg border text-left transition-all duration-200
                ${isSelected 
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-5 w-5 ${isSelected ? 'text-primary-600' : 'text-gray-400'}`} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium truncate ${isSelected ? 'text-primary-900' : 'text-gray-900'}`}>
                      {size.name}
                    </h4>
                    <span className={`
                      text-xs font-medium px-2 py-1 rounded-full
                      ${isSelected 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}>
                      {size.width}×{size.height}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${isSelected ? 'text-primary-700' : 'text-gray-500'}`}>
                    {platform} • {size.description}
                  </p>
                </div>
                
                {isSelected && (
                  <Check className="h-5 w-5 text-primary-500 flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      {selectedSizes.length === 0 && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          Please select at least one icon size
        </p>
      )}
    </div>
  );
} 