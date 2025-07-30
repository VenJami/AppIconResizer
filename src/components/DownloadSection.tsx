import type { ProcessedIcon, ZipPackage } from '../types';
import { Download, Package, Loader2 } from 'lucide-react';
import { formatFileSize } from '../utils/imageUtils';

interface DownloadSectionProps {
  icons: ProcessedIcon[];
  onGenerateZip: () => Promise<void>;
  onDownloadZip: (zipPackage: ZipPackage) => void;
  zipPackage: ZipPackage | null;
  isGenerating: boolean;
  progress: number;
}

export function DownloadSection({
  icons,
  onGenerateZip,
  onDownloadZip,
  zipPackage,
  isGenerating,
  progress
}: DownloadSectionProps) {
  if (icons.length === 0) {
    return null;
  }
  
  const iosCount = icons.filter(icon => icon.platform === 'iOS').length;
  const androidCount = icons.filter(icon => icon.platform === 'Android').length;
  const totalSize = icons.reduce((sum, icon) => sum + icon.blob.size, 0);
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Package className="h-6 w-6 text-primary-500" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Download Package
          </h3>
          <p className="text-sm text-gray-500">
            Get all your icons in organized folders
          </p>
        </div>
      </div>
      
      {/* Package Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">{icons.length}</div>
          <div className="text-xs text-gray-500">Total Icons</div>
        </div>
        
        {iosCount > 0 && (
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-900">{iosCount}</div>
            <div className="text-xs text-blue-600">iOS Sizes</div>
          </div>
        )}
        
        {androidCount > 0 && (
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-900">{androidCount}</div>
            <div className="text-xs text-green-600">Android Sizes</div>
          </div>
        )}
        
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-900">
            {formatFileSize(totalSize).split(' ')[0]}
          </div>
          <div className="text-xs text-purple-600">
            {formatFileSize(totalSize).split(' ')[1]}
          </div>
        </div>
      </div>
      
      {/* Folder Structure Preview */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Folder Structure:</h4>
        <div className="text-sm text-gray-600 space-y-1 font-mono">
          <div>📁 app-icons-{new Date().toISOString().split('T')[0]}.zip</div>
          {iosCount > 0 && (
            <div className="ml-4">
              📁 iOS/ ({iosCount} files)
            </div>
          )}
          {androidCount > 0 && (
            <div className="ml-4">
              📁 Android/ ({androidCount} files)
            </div>
          )}
        </div>
      </div>
      
      {/* Download Actions */}
      <div className="space-y-4">
        {!zipPackage && !isGenerating ? (
          <button
            onClick={onGenerateZip}
            className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
          >
            <Package className="h-5 w-5" />
            <span>Generate ZIP Package</span>
          </button>
        ) : isGenerating ? (
          <div className="w-full">
            <div className="flex items-center justify-center space-x-3 py-3 px-4 bg-primary-50 text-primary-700 rounded-lg border border-primary-200">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-medium">Generating ZIP package...</span>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        ) : zipPackage ? (
          <div className="space-y-3">
            <button
              onClick={() => onDownloadZip(zipPackage)}
              className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
            >
              <Download className="h-5 w-5" />
              <span>Download ZIP ({formatFileSize(zipPackage.blob.size)})</span>
            </button>
            
            <div className="text-center">
              <button
                onClick={onGenerateZip}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Regenerate package
              </button>
            </div>
          </div>
        ) : null}
      </div>
      
      {/* Additional Info */}
      <div className="mt-6 text-xs text-gray-500 space-y-1">
        <p>• Icons are organized by platform in separate folders</p>
        <p>• All files use standard naming conventions</p>
        <p>• Ready for immediate use in your development projects</p>
      </div>
    </div>
  );
}