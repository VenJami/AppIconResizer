import type { ProcessingOptions } from '../types';

interface CustomizationPanelProps {
  options: ProcessingOptions;
  onOptionsChange: (options: ProcessingOptions) => void;
  disabled?: boolean;
}

export function CustomizationPanel({
  options,
  onOptionsChange,
  disabled = false
}: CustomizationPanelProps) {
  const handlePaddingChange = (padding: number) => {
    onOptionsChange({
      ...options,
      padding: Math.max(0, Math.min(100, padding))
    });
  };
  
  const handleBackgroundColorChange = (backgroundColor: string) => {
    onOptionsChange({
      ...options,
      backgroundColor
    });
  };
  
  const predefinedColors = [
    '#FFFFFF', // White
    '#000000', // Black
    '#F3F4F6', // Light Gray
    '#374151', // Dark Gray
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#F97316', // Orange
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Padding
        </label>
        
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="50"
            value={options.padding}
            onChange={(e) => handlePaddingChange(Number(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
          />
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>No padding</span>
            <span className="font-medium text-gray-700">
              {options.padding}px
            </span>
            <span>Max padding</span>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Background Color
        </label>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={options.backgroundColor}
              onChange={(e) => handleBackgroundColorChange(e.target.value)}
              disabled={disabled}
              className="h-10 w-16 rounded-lg border border-gray-300 cursor-pointer disabled:opacity-50"
            />
            
            <input
              type="text"
              value={options.backgroundColor}
              onChange={(e) => handleBackgroundColorChange(e.target.value)}
              disabled={disabled}
              placeholder="#FFFFFF"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
            />
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {predefinedColors.map((color) => (
              <button
                key={color}
                onClick={() => handleBackgroundColorChange(color)}
                disabled={disabled}
                className={`
                  h-10 w-full rounded-lg border-2 transition-all duration-200
                  ${options.backgroundColor === color 
                    ? 'border-primary-500 ring-2 ring-primary-200' 
                    : 'border-gray-300 hover:border-gray-400'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                style={{ backgroundColor: color }}
                title={color}
                aria-label={`Select color ${color}`}
              >
                {options.backgroundColor === color && (
                  <div className="flex items-center justify-center h-full">
                    <div className={`h-2 w-2 rounded-full ${
                      color === '#FFFFFF' || color === '#F3F4F6' ? 'bg-gray-800' : 'bg-white'
                    }`} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 space-y-1">
        <p>• Padding adds space around your logo</p>
        <p>• Background color fills transparent areas</p>
        <p>• iOS App Store icons are automatically made opaque</p>
      </div>
    </div>
  );
}