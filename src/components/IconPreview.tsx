import type { ProcessedIcon } from '../types';
import { formatFileSize } from '../utils/imageUtils';
import { Download } from 'lucide-react';

interface IconPreviewProps {
  icon: ProcessedIcon;
  showDownload?: boolean;
  onDownload?: (icon: ProcessedIcon) => void;
}

export function IconPreview({ 
  icon, 
  showDownload = false, 
  onDownload 
}: IconPreviewProps) {
  const handleDownload = () => {
    if (onDownload) {
      onDownload(icon);
    } else {
      // Default download behavior
      const url = URL.createObjectURL(icon.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = icon.size.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="space-y-3">
        {/* Icon Display */}
        <div className="relative">
          <div 
            className="mx-auto rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden"
            style={{
              width: Math.min(icon.size.width, 120),
              height: Math.min(icon.size.height, 120),
              aspectRatio: `${icon.size.width}/${icon.size.height}`
            }}
          >
            <img
              src={icon.dataUrl}
              alt={`${icon.size.name} icon`}
              className="w-full h-full object-contain"
            />
          </div>
          
          {showDownload && (
            <button
              onClick={handleDownload}
              className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              title="Download this size"
            >
              <Download className="h-3 w-3 text-gray-600" />
            </button>
          )}
        </div>
        
        {/* Icon Info */}
        <div className="text-center space-y-1">
          <h4 className="font-medium text-gray-900 text-sm">
            {icon.size.name}
          </h4>
          <p className="text-xs text-gray-500">
            {icon.size.width}×{icon.size.height}px
          </p>
          <p className="text-xs text-gray-400">
            {formatFileSize(icon.blob.size)}
          </p>
        </div>
        
        {/* Description */}
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          {icon.size.description}
        </p>
      </div>
    </div>
  );
}