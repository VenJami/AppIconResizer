import { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';
import type { CustomSize, IconSize } from '../types';

interface CustomSizeAdderProps {
  onAddSize: (size: CustomSize) => void;
  onRemoveSize: (id: string) => void;
  onSizeToggle: (size: CustomSize) => void;
  customSizes: CustomSize[];
  selectedSizes: (IconSize | CustomSize)[];
  disabled?: boolean;
}

export function CustomSizeAdder({
  onAddSize,
  onRemoveSize,
  onSizeToggle,
  customSizes,
  selectedSizes,
  disabled = false
}: CustomSizeAdderProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newSize, setNewSize] = useState({
    width: '',
    height: '',
    name: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const width = parseInt(newSize.width);
    const height = parseInt(newSize.height);
    
    if (!width || !height || width < 8 || height < 8 || width > 2048 || height > 2048) {
      return;
    }
    
    const customSize: CustomSize = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      width,
      height,
      name: newSize.name || `${width}×${height}`,
      description: newSize.description || `Custom size ${width}×${height}px`,
      filename: `custom-${width}x${height}.png`,
      isCustom: true
    };
    
    onAddSize(customSize);
    setNewSize({ width: '', height: '', name: '', description: '' });
    setIsAdding(false);
  };

  const handleCancel = () => {
    setNewSize({ width: '', height: '', name: '', description: '' });
    setIsAdding(false);
  };

  const isFormValid = () => {
    const width = parseInt(newSize.width);
    const height = parseInt(newSize.height);
    return width >= 8 && height >= 8 && width <= 2048 && height <= 2048;
  };

  const isCustomSizeSelected = (size: CustomSize) => {
    return selectedSizes.some(s => 
      'isCustom' in s && s.isCustom && (s as CustomSize).id === size.id
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">
          Custom Sizes ({customSizes.length})
        </h4>
        
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            disabled={disabled}
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-md hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Custom Size
          </button>
        )}
      </div>

      {/* Add New Size Form */}
      {isAdding && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Width (px) *
                </label>
                <input
                  type="number"
                  min="8"
                  max="2048"
                  value={newSize.width}
                  onChange={(e) => setNewSize(prev => ({ ...prev, width: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="512"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Height (px) *
                </label>
                <input
                  type="number"
                  min="8"
                  max="2048"
                  value={newSize.height}
                  onChange={(e) => setNewSize(prev => ({ ...prev, height: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="512"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Name (optional)
              </label>
              <input
                type="text"
                value={newSize.name}
                onChange={(e) => setNewSize(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Custom Icon"
                maxLength={50}
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Description (optional)
              </label>
              <input
                type="text"
                value={newSize.description}
                onChange={(e) => setNewSize(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Custom size for specific use case"
                maxLength={100}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <X className="h-3 w-3 mr-1 inline" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid()}
                className="px-3 py-1.5 text-xs font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Check className="h-3 w-3 mr-1 inline" />
                Add Size
              </button>
            </div>
            
            <p className="text-xs text-gray-500">
              Size must be between 8×8 and 2048×2048 pixels
            </p>
          </form>
        </div>
      )}

      {/* Custom Sizes List */}
      {customSizes.length > 0 && (
        <div className="space-y-2">
          {customSizes.map((size) => {
            const isSelected = isCustomSizeSelected(size);
            return (
              <div
                key={size.id}
                className={`flex items-center justify-between p-3 border rounded-lg transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? 'bg-amber-100 border-amber-300 ring-2 ring-amber-200' 
                    : 'bg-amber-50 border-amber-200 hover:bg-amber-100'
                }`}
                onClick={() => !disabled && onSizeToggle(size)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded flex items-center justify-center transition-colors duration-200 ${
                      isSelected ? 'bg-amber-200' : 'bg-amber-100'
                    }`}>
                      {isSelected ? (
                        <Check className="h-4 w-4 text-amber-700" />
                      ) : (
                        <span className="text-xs font-medium text-amber-700">C</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className={`text-sm font-medium truncate transition-colors duration-200 ${
                        isSelected ? 'text-amber-900' : 'text-amber-800'
                      }`}>
                        {size.name}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                        isSelected 
                          ? 'bg-amber-200 text-amber-900' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {size.width}×{size.height}
                      </span>
                    </div>
                    <p className={`text-xs truncate transition-colors duration-200 ${
                      isSelected ? 'text-amber-800' : 'text-amber-700'
                    }`}>
                      {size.description}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSize(size.id);
                  }}
                  disabled={disabled}
                  className="flex-shrink-0 p-1.5 text-amber-400 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  title="Remove custom size"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
      
      {customSizes.length === 0 && !isAdding && (
        <div className="text-center py-8 text-gray-500">
          <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No custom sizes added yet</p>
          <p className="text-xs">Click "Add Custom Size" to create your own dimensions</p>
        </div>
      )}
    </div>
  );
} 