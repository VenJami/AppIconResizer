import { useState } from 'react';
import type { IconSize, CustomSize } from '../types';
import { iOS_SIZES, ANDROID_SIZES } from '../utils/constants';
import { Smartphone, Tablet, Check, Settings } from 'lucide-react';
import { CustomSizeAdder } from './CustomSizeAdder';

interface SizeSelectorProps {
  selectedSizes: (IconSize | CustomSize)[];
  onSizeChange: (sizes: (IconSize | CustomSize)[]) => void;
  disabled?: boolean;
}

export function SizeSelector({
  selectedSizes,
  onSizeChange,
  disabled = false
}: SizeSelectorProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'ios' | 'android' | 'custom'>('all');
  const [customSizes, setCustomSizes] = useState<CustomSize[]>([]);

  const allSizes = [...iOS_SIZES.sizes, ...ANDROID_SIZES.sizes, ...customSizes];
  
  const getDisplaySizes = () => {
    switch (activeTab) {
      case 'ios':
        return iOS_SIZES.sizes;
      case 'android':
        return ANDROID_SIZES.sizes;
      case 'custom':
        return customSizes;
      default:
        return allSizes;
    }
  };

  const handleSizeToggle = (size: IconSize | CustomSize) => {
    if (disabled) return;
    
         const isSelected = selectedSizes.some(s => {
       if ('isCustom' in size && size.isCustom && 'isCustom' in s && (s as CustomSize).isCustom) {
         return (s as CustomSize).id === size.id; // Custom size comparison
       }
       return s.width === size.width && s.height === size.height && s.name === size.name;
     });
    
    if (isSelected) {
             const newSizes = selectedSizes.filter(s => {
         if ('isCustom' in size && size.isCustom && 'isCustom' in s && (s as CustomSize).isCustom) {
           return (s as CustomSize).id !== size.id; // Custom size removal
         }
         return !(s.width === size.width && s.height === size.height && s.name === size.name);
       });
      onSizeChange(newSizes);
    } else {
      onSizeChange([...selectedSizes, size]);
    }
  };

  const handleSelectAll = (platform?: 'ios' | 'android' | 'custom') => {
    if (disabled) return;
    
    let sizesToAdd: (IconSize | CustomSize)[] = [];
    if (platform === 'ios') {
      sizesToAdd = iOS_SIZES.sizes;
    } else if (platform === 'android') {
      sizesToAdd = ANDROID_SIZES.sizes;
    } else if (platform === 'custom') {
      sizesToAdd = customSizes;
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
             } else if (platform === 'custom') {
         return !('isCustom' in selected && selected.isCustom);
      } else {
        return false; // Select all - replace everything
      }
    });
    
    onSizeChange([...otherSizes, ...sizesToAdd]);
  };

  const handleDeselectAll = (platform?: 'ios' | 'android' | 'custom') => {
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
         } else if (platform === 'custom') {
       const newSizes = selectedSizes.filter(selected => !('isCustom' in selected && selected.isCustom));
       onSizeChange(newSizes);
    } else {
      onSizeChange([]);
    }
  };

  const getSizeIcon = (size: IconSize | CustomSize) => {
    if ('isCustom' in size && size.isCustom) return Settings;
    
    const isIOS = iOS_SIZES.sizes.some(ios => 
      ios.width === size.width && ios.height === size.height && ios.name === size.name
    );
    return isIOS ? Smartphone : Tablet;
  };

  const getSizePlatform = (size: IconSize | CustomSize) => {
    if ('isCustom' in size && size.isCustom) return 'Custom';
    
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
  const customSelected = customSizes.filter(custom => 
    selectedSizes.some(s => 'isCustom' in s && s.isCustom && (s as CustomSize).id === custom.id)
  ).length;

  const handleAddCustomSize = (newSize: CustomSize) => {
    setCustomSizes(prev => [...prev, newSize]);
  };

  const handleRemoveCustomSize = (id: string) => {
    setCustomSizes(prev => prev.filter(size => size.id !== id));
    // Also remove from selected sizes if it was selected
    const newSelectedSizes = selectedSizes.filter(s => !('isCustom' in s && s.isCustom && (s as CustomSize).id === id));
    onSizeChange(newSelectedSizes);
  };

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
          className={`flex-1 py-2 px-2 text-xs font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'all'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          All ({allSizes.length})
        </button>
        <button
          onClick={() => setActiveTab('ios')}
          className={`flex-1 py-2 px-2 text-xs font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'ios'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          iOS ({iosSelected}/{iOS_SIZES.sizes.length})
        </button>
        <button
          onClick={() => setActiveTab('android')}
          className={`flex-1 py-2 px-2 text-xs font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'android'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Android ({androidSelected}/{ANDROID_SIZES.sizes.length})
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 py-2 px-2 text-xs font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'custom'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Custom ({customSelected}/{customSizes.length})
        </button>
      </div>

      {/* Quick Actions */}
      {activeTab !== 'custom' && (
        <div className="flex space-x-2">
          <button
            onClick={() => handleSelectAll(activeTab === 'all' ? undefined : activeTab)}
            disabled={disabled}
            className="btn-secondary text-xs"
          >
            Select {activeTab === 'all' ? 'All' : activeTab === 'ios' ? 'iOS' : activeTab === 'android' ? 'Android' : 'Custom'}
          </button>
          <button
            onClick={() => handleDeselectAll(activeTab === 'all' ? undefined : activeTab)}
            disabled={disabled}
            className="btn-secondary text-xs"
          >
            Deselect {activeTab === 'all' ? 'All' : activeTab === 'ios' ? 'iOS' : activeTab === 'android' ? 'Android' : 'Custom'}
          </button>
        </div>
      )}

      {/* Size Grid or Custom Size Adder */}
      {activeTab === 'custom' ? (
        <CustomSizeAdder
          onAddSize={handleAddCustomSize}
          onRemoveSize={handleRemoveCustomSize}
          customSizes={customSizes}
          disabled={disabled}
        />
      ) : (
        <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
          {displaySizes.map((size, index) => {
                                       const isSelected = selectedSizes.some(s => {
                if ('isCustom' in size && size.isCustom && 'isCustom' in s) {
                  const customS = s as CustomSize;
                  const customSize = size as CustomSize;
                  return customS.isCustom && customS.id === customSize.id;
                }
                return s.width === size.width && s.height === size.height && s.name === size.name;
              });
            const Icon = getSizeIcon(size);
            const platform = getSizePlatform(size);
            
            return (
              <button
                                 key={`${platform}-${size.width}-${size.height}-${index}-${'isCustom' in size && size.isCustom ? (size as CustomSize).id : ''}`}
                onClick={() => handleSizeToggle(size)}
                disabled={disabled}
                className={`
                  relative p-3 rounded-lg border text-left transition-all duration-200
                  ${isSelected 
                    ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                     ${'isCustom' in size && size.isCustom ? 'border-amber-200 bg-amber-50' : ''}
                `}
              >
                <div className="flex items-center space-x-3">
                                     <Icon className={`h-5 w-5 ${isSelected ? 'text-primary-600' : 'isCustom' in size && size.isCustom ? 'text-amber-500' : 'text-gray-400'}`} />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium truncate ${isSelected ? 'text-primary-900' : 'text-gray-900'}`}>
                        {size.name}
                      </h4>
                      <span className={`
                        text-xs font-medium px-2 py-1 rounded-full
                        ${isSelected 
                          ? 'bg-primary-100 text-primary-700' 
                                                     : 'isCustom' in size && size.isCustom
                           ? 'bg-amber-100 text-amber-700'
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
      )}
      
      {selectedSizes.length === 0 && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          Please select at least one icon size
        </p>
      )}
    </div>
  );
} 