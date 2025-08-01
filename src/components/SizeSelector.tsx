import React, { useState } from 'react';
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

  // Reactive calculation of all sizes that updates when customSizes changes
  const allSizes = React.useMemo(() => [...iOS_SIZES.sizes, ...ANDROID_SIZES.sizes, ...customSizes], [customSizes]);
  
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
        if ('isCustom' in size && size.isCustom) {
          if ('isCustom' in s && (s as CustomSize).isCustom) {
            return (s as CustomSize).id === size.id; // Custom size comparison
          }
          return false; // Custom size not matching non-custom
        }
        return s.width === size.width && s.height === size.height && s.name === size.name;
      });
    
    if (isSelected) {
                    const newSizes = selectedSizes.filter(s => {
          if ('isCustom' in size && size.isCustom) {
            if ('isCustom' in s && (s as CustomSize).isCustom) {
              return (s as CustomSize).id !== size.id; // Custom size removal
            }
            return true; // Keep non-custom sizes
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
    // Auto-select the newly added custom size
    onSizeChange([...selectedSizes, newSize]);
  };

  const handleRemoveCustomSize = (id: string) => {
    setCustomSizes(prev => prev.filter(size => size.id !== id));
    // Also remove from selected sizes if it was selected
    const newSelectedSizes = selectedSizes.filter(s => !('isCustom' in s && s.isCustom && (s as CustomSize).id === id));
    onSizeChange(newSelectedSizes);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <label className="block text-xl font-bold text-white">
          Select Icon Sizes ({selectedSizes.length} selected)
        </label>
        
        {selectedSizes.length > 0 && (
          <button
            onClick={() => handleDeselectAll()}
            className="text-sm text-accent-400 hover:text-accent-300 transition-colors duration-300 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 bg-dark-800/50 backdrop-blur-sm rounded-2xl p-2 border border-dark-600/30 mt-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-300 ${
            activeTab === 'all'
              ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30'
              : 'text-gray-400 hover:text-white hover:bg-dark-700/50'
          }`}
        >
          All ({allSizes.length})
        </button>
        <button
          onClick={() => setActiveTab('ios')}
          className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-300 ${
            activeTab === 'ios'
              ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30'
              : 'text-gray-400 hover:text-white hover:bg-dark-700/50'
          }`}
        >
          iOS ({iosSelected}/{iOS_SIZES.sizes.length})
        </button>
        <button
          onClick={() => setActiveTab('android')}
          className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-300 ${
            activeTab === 'android'
              ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30'
              : 'text-gray-400 hover:text-white hover:bg-dark-700/50'
          }`}
        >
          Android ({androidSelected}/{ANDROID_SIZES.sizes.length})
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-300 ${
            activeTab === 'custom'
              ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30'
              : 'text-gray-400 hover:text-white hover:bg-dark-700/50'
          }`}
        >
          Custom ({customSelected}/{customSizes.length})
        </button>
      </div>

      {/* Quick Actions */}
      {activeTab !== 'custom' && (
        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => handleSelectAll(activeTab === 'all' ? undefined : activeTab)}
            disabled={disabled}
            className="btn-secondary text-sm px-4 py-2"
          >
            Select {activeTab === 'all' ? 'All' : activeTab === 'ios' ? 'iOS' : activeTab === 'android' ? 'Android' : 'Custom'}
          </button>
          <button
            onClick={() => handleDeselectAll(activeTab === 'all' ? undefined : activeTab)}
            disabled={disabled}
            className="btn-secondary text-sm px-4 py-2"
          >
            Deselect {activeTab === 'all' ? 'All' : activeTab === 'ios' ? 'iOS' : activeTab === 'android' ? 'Android' : 'Custom'}
          </button>
        </div>
      )}
      
      {/* Custom Tab Quick Actions */}
      {activeTab === 'custom' && customSizes.length > 0 && (
        <div className="flex space-x-2">
          <button
            onClick={() => handleSelectAll('custom')}
            disabled={disabled}
            className="btn-secondary text-xs"
          >
            Select All Custom
          </button>
          <button
            onClick={() => handleDeselectAll('custom')}
            disabled={disabled}
            className="btn-secondary text-xs"
          >
            Deselect All Custom
          </button>
        </div>
      )}

      {/* Size Grid or Custom Size Adder */}
      {activeTab === 'custom' ? (
        <CustomSizeAdder
          onAddSize={handleAddCustomSize}
          onRemoveSize={handleRemoveCustomSize}
          onSizeToggle={handleSizeToggle}
          customSizes={customSizes}
          selectedSizes={selectedSizes}
          disabled={disabled}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto pr-2 mt-6">
          {displaySizes.map((size, index) => {
            const isSelected = selectedSizes.some(s => {
              if ('isCustom' in size && size.isCustom) {
                if ('isCustom' in s && (s as CustomSize).isCustom) {
                  return (s as CustomSize).id === (size as CustomSize).id;
                }
                return false; // Custom size not matching non-custom
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
                  relative p-5 rounded-2xl border-2 text-left transition-all duration-500 group overflow-hidden
                  ${isSelected 
                    ? 'border-accent-500/50 bg-gradient-to-br from-accent-500/10 to-accent-600/5 shadow-xl shadow-accent-500/20' 
                    : 'border-dark-600/50 hover:border-accent-500/30 hover:bg-gradient-to-br hover:from-dark-800/50 hover:to-dark-700/50'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'}
                  ${'isCustom' in size && size.isCustom ? 'border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-amber-600/5' : ''}
                  backdrop-blur-sm
                `}
              >
                {/* Background glow effect */}
                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                  isSelected 
                    ? 'bg-gradient-to-br from-accent-500/20 to-transparent opacity-100' 
                    : 'bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100'
                }`} />
                
                <div className="relative flex items-center space-x-4">
                  <div className={`p-3 rounded-xl transition-all duration-500 ${
                    isSelected 
                      ? 'bg-gradient-to-br from-accent-500 to-accent-600 shadow-lg shadow-accent-500/30' 
                      : 'bg-gradient-to-br from-dark-700 to-dark-600 group-hover:bg-gradient-to-br group-hover:from-accent-500/20 group-hover:to-accent-600/20'
                  }`}>
                    <Icon className={`h-6 w-6 transition-colors duration-500 ${
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
                        text-sm font-bold px-3 py-1 rounded-full transition-all duration-300
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
                      {platform} • {size.description}
                    </p>
                  </div>
                  
                  {isSelected && (
                    <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full shadow-lg shadow-accent-500/30">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
      
      {selectedSizes.length === 0 && (
        <div className="flex items-center space-x-3 text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          <p className="text-sm font-medium">Please select at least one icon size</p>
        </div>
      )}
    </div>
  );
} 