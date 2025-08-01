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
    <div className="card">
      <div className="flex items-center space-x-3 mb-6">
        <Package className="h-6 w-6 text-accent-400" />
        <div>
          <h3 className="text-xl font-bold text-white">
            Download Your Icons
          </h3>
          <p className="text-sm text-gray-400">
            Get all your icons organized in a ZIP package
          </p>
        </div>
      </div>
      
      {/* Package Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-dark-800/50 rounded-lg border border-dark-600/30">
          <div className="text-2xl font-bold text-white">{icons.length}</div>
          <div className="text-xs text-gray-400">Total Icons</div>
        </div>
        
        {iosCount > 0 && (
          <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">{iosCount}</div>
            <div className="text-xs text-blue-300">iOS Sizes</div>
          </div>
        )}
        
        {androidCount > 0 && (
          <div className="text-center p-3 bg-accent-500/10 rounded-lg border border-accent-500/20">
            <div className="text-2xl font-bold text-accent-400">{androidCount}</div>
            <div className="text-xs text-accent-300">Android Sizes</div>
          </div>
        )}
        
        <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <div className="text-2xl font-bold text-purple-400">
            {formatFileSize(totalSize).split(' ')[0]}
          </div>
          <div className="text-xs text-purple-300">
            {formatFileSize(totalSize).split(' ')[1]}
          </div>
        </div>
      </div>
      
      {/* Folder Structure Preview */}
      <div className="bg-dark-800/50 rounded-lg p-4 mb-6 border border-dark-600/30">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Folder Structure:</h4>
        <div className="text-sm text-gray-400 space-y-1 font-mono">
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
            className="w-full btn-primary flex items-center justify-center space-x-2 py-4 text-lg"
          >
            <Package className="h-5 w-5" />
            <span>Create ZIP Package</span>
          </button>
        ) : isGenerating ? (
          <div className="w-full">
            <div className="flex items-center justify-center space-x-3 py-4 px-4 bg-accent-500/10 text-accent-400 rounded-lg border border-accent-500/20">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-medium">Creating ZIP package...</span>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              
              <div className="w-full bg-dark-700 rounded-full h-2">
                <div
                  className="bg-accent-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        ) : zipPackage ? (
          <div className="space-y-3">
            <button
              onClick={() => onDownloadZip(zipPackage)}
              className="w-full btn-primary flex items-center justify-center space-x-2 py-4 text-lg"
            >
              <Download className="h-5 w-5" />
              <span>Download ZIP ({formatFileSize(zipPackage.blob.size)})</span>
            </button>
            
            <div className="text-center">
              <button
                onClick={onGenerateZip}
                className="text-sm text-gray-400 hover:text-accent-400 transition-colors duration-200"
              >
                Create new package
              </button>
            </div>
          </div>
        ) : null}
      </div>
      
      {/* Additional Info */}
      <div className="mt-6 text-xs text-gray-400 space-y-1">
        <p>• Icons are organized by platform in separate folders</p>
        <p>• All files use standard naming conventions</p>
        <p>• Ready for immediate use in your development projects</p>
      </div>
    </div>
  );
}