import React, { useCallback, useState } from 'react';
import { Upload, X, AlertCircle, FileText, FileImage, File } from 'lucide-react';
import { formatFileSize } from '../utils/imageUtils';
import { trackFileUpload, trackError } from './GoogleAnalytics';
import { useSentry } from '../hooks/useSentry';

// Supported file types
const SUPPORTED_FORMATS: Record<string, { name: string; icon: any; color: string }> = {
  'image/png': { name: 'PNG', icon: FileImage, color: 'text-blue-400' },
  'image/jpeg': { name: 'JPEG', icon: FileImage, color: 'text-green-400' },
  'image/jpg': { name: 'JPG', icon: FileImage, color: 'text-green-400' },
  'image/svg+xml': { name: 'SVG', icon: FileText, color: 'text-purple-400' },
  'image/webp': { name: 'WebP', icon: FileImage, color: 'text-orange-400' },
  'image/gif': { name: 'GIF', icon: FileImage, color: 'text-pink-400' }
};

const SUPPORTED_EXTENSIONS = Object.keys(SUPPORTED_FORMATS).map(type => {
  const ext = type.split('/')[1];
  return ext === 'svg+xml' ? 'svg' : ext;
}).join(',');

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  file: File | null;
  onClear: () => void;
  isLoading?: boolean;
  error?: string | null;
  disabled?: boolean;
  onError?: (message: string) => void;
}

export function FileUpload({
  onFileSelect,
  file,
  onClear,
  isLoading = false,
  error = null,
  disabled = false,
  onError
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { captureException, addBreadcrumb } = useSentry();
  
  const validateFile = useCallback((file: File) => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File size (${formatFileSize(file.size)}) exceeds the 10MB limit`;
    }
    
    // Check file type
    if (!SUPPORTED_FORMATS[file.type]) {
      return `Unsupported file type: ${file.type}. Supported formats: ${Object.values(SUPPORTED_FORMATS).map(f => f.name).join(', ')}`;
    }
    
    return null;
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled || isLoading) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      
      // Add breadcrumb for file drop
      addBreadcrumb({
        category: 'file',
        message: 'File dropped via drag and drop',
        level: 'info',
        data: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        },
      });
      
      const error = validateFile(file);
      if (error) {
        onError?.(error);
        trackError('file_validation', error);
        
        // Report validation error to Sentry
        captureException(new Error(error), {
          file: {
            name: file.name,
            size: file.size,
            type: file.type,
          },
          validation: {
            method: 'drag_drop',
          },
        });
        return;
      }
      trackFileUpload(file.type, file.size);
      onFileSelect(file);
    }
  }, [onFileSelect, disabled, isLoading, validateFile, captureException, addBreadcrumb]);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !isLoading) {
      setIsDragOver(true);
    }
  }, [disabled, isLoading]);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);
  
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const file = files[0];
      
      // Add breadcrumb for file selection
      addBreadcrumb({
        category: 'file',
        message: 'File selected via file input',
        level: 'info',
        data: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        },
      });
      
      const error = validateFile(file);
      if (error) {
        onError?.(error);
        trackError('file_validation', error);
        
        // Report validation error to Sentry
        captureException(new Error(error), {
          file: {
            name: file.name,
            size: file.size,
            type: file.type,
          },
          validation: {
            method: 'file_input',
          },
        });
        return;
      }
      trackFileUpload(file.type, file.size);
      onFileSelect(file);
    }
  }, [onFileSelect, validateFile, captureException, addBreadcrumb]);
  
  const handleClick = useCallback(() => {
    if (disabled || isLoading) return;
    document.getElementById('file-input')?.click();
  }, [disabled, isLoading]);
  
  return (
    <div className="w-full">
      {!file ? (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer
            transition-all duration-500 hover:border-accent-500/50 hover:bg-gradient-to-br hover:from-accent-500/5 hover:to-accent-600/5 hover:scale-[1.02]
            ${isDragOver ? 'border-accent-500 bg-gradient-to-br from-accent-500/10 to-accent-600/10 scale-105 shadow-2xl shadow-accent-500/20' : 'border-dark-600/50 bg-gradient-to-br from-dark-800/50 to-dark-700/50'}
            ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            ${error ? 'border-red-500/50 bg-gradient-to-br from-red-500/5 to-red-600/5' : ''}
            backdrop-blur-sm
          `}
        >
                      <input
              id="file-input"
              type="file"
              accept={SUPPORTED_EXTENSIONS}
              onChange={handleFileInput}
              className="hidden"
              disabled={disabled || isLoading}
            />
          
          <div className="flex flex-col items-center space-y-6">
            {isLoading ? (
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-accent-500/30 border-t-accent-500" />
                <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-2 border-accent-500/30" />
                <div className="absolute inset-2 animate-pulse rounded-full h-16 w-16 bg-accent-500/10" />
              </div>
            ) : (
              <div className="relative group">
                <Upload className={`h-20 w-20 transition-all duration-500 group-hover:scale-110 ${
                  error ? 'text-red-400' : 'text-accent-400'
                }`} />
                <div className="absolute -inset-4 bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            )}
            
            <div className="text-center">
              <p className={`text-xl font-semibold mb-2 ${
                error ? 'text-red-400' : 'text-white'
              }`}>
                {isLoading ? 'Processing image...' : 'Drop your logo here'}
              </p>
              <p className={`text-base ${
                error ? 'text-red-400' : 'text-gray-400'
              }`}>
                or click to browse files
              </p>
            </div>
            
            <div className={`px-4 py-2 rounded-xl text-sm font-medium ${
              error 
                ? 'text-red-400 bg-red-500/10 border border-red-500/20' 
                : 'text-gray-400 bg-dark-800/50 border border-dark-600'
            }`}>
              PNG, JPG, JPEG, SVG, WebP, GIF • Any size • Max 10MB
            </div>
            
            {/* File type showcase */}
            <div className="flex items-center justify-center space-x-4 mt-4">
              {Object.entries(SUPPORTED_FORMATS).map(([type, format]) => {
                const Icon = format.icon;
                return (
                  <div key={type} className="flex flex-col items-center space-y-1">
                    <div className={`p-2 rounded-lg bg-dark-800/50 border border-dark-600 ${format.color.replace('text-', 'hover:bg-').replace('-400', '-500/20')} transition-colors duration-200`}>
                      <Icon className={`h-5 w-5 ${format.color}`} />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{format.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {isDragOver && !disabled && !isLoading && (
            <div className="absolute inset-0 bg-accent-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-accent-500">
              <div className="text-accent-400 font-bold text-xl">Drop file here</div>
            </div>
          )}
        </div>
      ) : (
        <div className="card">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="relative">
                {(() => {
                  const format = SUPPORTED_FORMATS[file.type];
                  const Icon = format?.icon || File;
                  const color = format?.color || 'text-gray-400';
                  return (
                    <>
                      <Icon className={`h-14 w-14 ${color}`} />
                      <div className="absolute -inset-1 bg-accent-500/20 rounded-xl blur animate-pulse" />
                    </>
                  );
                })()}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-1">
                <p className="text-lg font-semibold text-white truncate">
                  {file.name}
                </p>
                {SUPPORTED_FORMATS[file.type] && (
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    SUPPORTED_FORMATS[file.type].color.replace('text-', 'bg-').replace('-400', '-500/20')
                  } border ${
                    SUPPORTED_FORMATS[file.type].color.replace('text-', 'border-').replace('-400', '-500/30')
                  }`}>
                    {SUPPORTED_FORMATS[file.type].name}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 font-medium">
                {formatFileSize(file.size)}
              </p>
            </div>
            
            <button
              onClick={onClear}
              disabled={isLoading}
              className="flex-shrink-0 p-3 rounded-xl hover:bg-red-500/20 hover:text-red-400 text-gray-400 transition-all duration-200 disabled:opacity-50 group"
              aria-label="Remove file"
            >
              <X className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 flex items-center space-x-3 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}