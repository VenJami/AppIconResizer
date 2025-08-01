import { useState, useCallback } from 'react';
import { Download, Settings, FileType } from 'lucide-react';
import { EXPORT_FORMATS, DEFAULT_EXPORT_SETTINGS, estimateFileSize, recommendFormat, type ExportSettings } from '../utils/exportFormats';
import type { ProcessedIcon } from '../types';

interface ExportControlsProps {
  icons: ProcessedIcon[];
  onExport: (settings: ExportSettings) => void;
  isExporting?: boolean;
  progress?: number;
}

export function ExportControls({ icons, onExport, isExporting = false, progress = 0 }: ExportControlsProps) {
  const [settings, setSettings] = useState<ExportSettings>(DEFAULT_EXPORT_SETTINGS);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateSetting = useCallback(<K extends keyof ExportSettings>(
    key: K,
    value: ExportSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const selectedFormat = EXPORT_FORMATS[settings.format];
  const hasTransparency = icons.some(icon => 
    icon.size.name.toLowerCase().includes('transparent') || 
    settings.format === 'png'
  );

  const totalEstimatedSize = icons.reduce((total, icon) => {
    return total + estimateFileSize(
      icon.size.width,
      icon.size.height,
      settings.format,
      settings.quality
    );
  }, 0);

  const formatFileSize = (bytes: number) => {
    const kb = bytes / 1024;
    const mb = kb / 1024;
    if (mb >= 1) return `${mb.toFixed(1)} MB`;
    return `${kb.toFixed(0)} KB`;
  };

  const getRecommendedFormat = () => {
    return recommendFormat(hasTransparency, 'app');
  };

  const handleExport = () => {
    onExport(settings);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="section-heading">
          <span className="text-accent-400">5.</span> Export Settings
        </h3>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="btn-secondary text-sm"
        >
          <Settings className="h-4 w-4 mr-2" />
          {showAdvanced ? 'Simple' : 'Advanced'}
        </button>
      </div>

      {/* Format Selection */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            Export Format
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(EXPORT_FORMATS).map(([key, format]) => {
              const isSelected = settings.format === key;
              const isRecommended = key === getRecommendedFormat();
              
              return (
                <button
                  key={key}
                  onClick={() => updateSetting('format', key)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 group ${
                    isSelected
                      ? 'border-accent-500 bg-accent-500/10'
                      : 'border-dark-600 hover:border-dark-500 hover:bg-dark-800/50'
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      ⭐
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center space-y-2">
                    <FileType className={`h-6 w-6 ${
                      isSelected ? 'text-accent-400' : 'text-gray-400'
                    }`} />
                    <span className={`font-semibold ${
                      isSelected ? 'text-accent-400' : 'text-white'
                    }`}>
                      {format.name}
                    </span>
                    <p className="text-xs text-gray-500 text-center">
                      {format.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          
          {selectedFormat && (
            <div className="mt-3 p-3 bg-dark-800/50 rounded-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-accent-400">💡 {selectedFormat.recommendation}</strong>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Transparency: {selectedFormat.supportsTransparency ? '✅ Supported' : '❌ Not supported'}
              </p>
            </div>
          )}
        </div>

        {/* Quality Settings */}
        {selectedFormat?.compressionOptions.quality && (
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Quality: {settings.quality}%
            </label>
            <div className="space-y-3">
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={settings.quality}
                onChange={(e) => updateSetting('quality', parseInt(e.target.value))}
                className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Smaller file</span>
                <span>Better quality</span>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="space-y-4 border-t border-dark-700 pt-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Advanced Options</h4>
            
            {selectedFormat?.compressionOptions.lossless && (
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.lossless}
                  onChange={(e) => updateSetting('lossless', e.target.checked)}
                  className="rounded border-dark-600 text-accent-500 focus:ring-accent-500"
                />
                <span className="text-sm text-gray-300">
                  Lossless compression (larger file, perfect quality)
                </span>
              </label>
            )}

            {selectedFormat?.compressionOptions.progressive && (
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.progressive}
                  onChange={(e) => updateSetting('progressive', e.target.checked)}
                  className="rounded border-dark-600 text-accent-500 focus:ring-accent-500"
                />
                <span className="text-sm text-gray-300">
                  Progressive encoding (better for web)
                </span>
              </label>
            )}

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.optimizeForWeb}
                onChange={(e) => updateSetting('optimizeForWeb', e.target.checked)}
                className="rounded border-dark-600 text-accent-500 focus:ring-accent-500"
              />
              <span className="text-sm text-gray-300">
                Optimize for web display
              </span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.preserveMetadata}
                onChange={(e) => updateSetting('preserveMetadata', e.target.checked)}
                className="rounded border-dark-600 text-accent-500 focus:ring-accent-500"
              />
              <span className="text-sm text-gray-300">
                Preserve metadata (EXIF, color profile)
              </span>
            </label>
          </div>
        )}

        {/* File Size Estimation */}
        <div className="bg-dark-800/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-300">Estimated ZIP size:</span>
            <span className="text-lg font-bold text-accent-400">
              {formatFileSize(totalEstimatedSize)}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Based on {icons.length} icon{icons.length !== 1 ? 's' : ''} • {selectedFormat?.name} format
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={isExporting || icons.length === 0}
          className="w-full btn-primary py-4 text-lg font-bold morph-button relative overflow-hidden"
        >
          {isExporting ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              <span>Exporting... {Math.round(progress)}%</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Export {icons.length} Icon{icons.length !== 1 ? 's' : ''}</span>
            </div>
          )}
          
          {isExporting && (
            <div 
              className="absolute bottom-0 left-0 h-1 bg-accent-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          )}
        </button>
      </div>
    </div>
  );
}