import { useState } from 'react';
import type { ProcessedIcon, Platform } from '../types';
import { IconPreview } from './IconPreview';
import { DeviceMockup } from './DeviceMockup';
import { Grid, Smartphone, Eye } from 'lucide-react';

interface PreviewGridProps {
  icons: ProcessedIcon[];
  onDownloadIcon?: (icon: ProcessedIcon) => void;
}

type ViewMode = 'grid' | 'mockups';

export function PreviewGrid({ icons, onDownloadIcon }: PreviewGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  
  // Group icons by platform
  const iosIcons = icons.filter(icon => icon.platform === 'iOS');
  const androidIcons = icons.filter(icon => icon.platform === 'Android');
  
  // Filter icons based on selected platform
  const filteredIcons = selectedPlatform === 'all' 
    ? icons 
    : icons.filter(icon => icon.platform === selectedPlatform);
  
  const platforms = [
    { id: 'all' as const, name: 'All', count: icons.length },
    { id: 'iOS' as Platform, name: 'iOS', count: iosIcons.length },
    { id: 'Android' as Platform, name: 'Android', count: androidIcons.length }
  ].filter(platform => platform.count > 0);
  
  if (icons.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Eye className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <p>No icons generated yet</p>
        <p className="text-sm">Upload an image and select platforms to see previews</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Generated Icons ({icons.length})
          </h3>
          <p className="text-sm text-gray-500">
            Preview and download your app icons
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Platform Filter */}
          <div className="flex items-center space-x-2">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`
                  px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200
                  ${selectedPlatform === platform.id
                    ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {platform.name} ({platform.count})
              </button>
            ))}
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`
                p-2 rounded-md transition-colors duration-200
                ${viewMode === 'grid' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
                }
              `}
              title="Grid view"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('mockups')}
              className={`
                p-2 rounded-md transition-colors duration-200
                ${viewMode === 'mockups' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
                }
              `}
              title="Device mockups"
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Icons Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredIcons.map((icon, index) => (
            <IconPreview
              key={`${icon.platform}-${icon.size.width}-${index}`}
              icon={icon}
              showDownload
              onDownload={onDownloadIcon}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIcons
            .filter(icon => {
              // Show only a few key sizes for mockups to avoid clutter
              const keyIOSSizes = [180, 167, 152]; // iPhone, iPad Pro, iPad
              const keyAndroidSizes = [192, 144, 96]; // XXXHDPI, XXHDPI, XHDPI
              
              if (icon.platform === 'iOS') {
                return keyIOSSizes.includes(icon.size.width);
              } else {
                return keyAndroidSizes.includes(icon.size.width);
              }
            })
            .map((icon, index) => (
              <DeviceMockup
                key={`${icon.platform}-mockup-${icon.size.width}-${index}`}
                icon={icon}
                className="mx-auto"
              />
            ))}
        </div>
      )}
      
      {filteredIcons.length === 0 && selectedPlatform !== 'all' && (
        <div className="text-center py-8 text-gray-500">
          <p>No {selectedPlatform} icons generated</p>
        </div>
      )}
    </div>
  );
}