import React, { useCallback, useState } from 'react';
import { Upload, X, Image, AlertCircle } from 'lucide-react';
import { formatFileSize } from '../utils/imageUtils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  file: File | null;
  onClear: () => void;
  isLoading?: boolean;
  error?: string | null;
  disabled?: boolean;
}

export function FileUpload({
  onFileSelect,
  file,
  onClear,
  isLoading = false,
  error = null,
  disabled = false
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled || isLoading) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect, disabled, isLoading]);
  
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
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);
  
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
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-200 hover:border-primary-500
            ${isDragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}
            ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            ${error ? 'border-red-300 bg-red-50' : ''}
          `}
        >
                      <input
              id="file-input"
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFileInput}
              className="hidden"
              disabled={disabled || isLoading}
            />
          
          <div className="flex flex-col items-center space-y-4">
            {isLoading ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
            ) : (
              <Upload className={`h-12 w-12 ${error ? 'text-red-400' : 'text-gray-400'}`} />
            )}
            
            <div>
              <p className={`text-lg font-medium ${error ? 'text-red-700' : 'text-gray-700'}`}>
                {isLoading ? 'Loading image...' : 'Drop your logo here'}
              </p>
              <p className={`text-sm mt-1 ${error ? 'text-red-600' : 'text-gray-500'}`}>
                or click to browse files
              </p>
            </div>
            
                      <div className={`text-xs ${error ? 'text-red-600' : 'text-gray-400'}`}>
            PNG, JPG, JPEG files • Any size • Max 10MB
          </div>
          </div>
          
          {isDragOver && !disabled && !isLoading && (
            <div className="absolute inset-0 bg-primary-500 bg-opacity-10 rounded-xl flex items-center justify-center">
              <div className="text-primary-700 font-medium">Drop file here</div>
            </div>
          )}
        </div>
      ) : (
        <div className="card">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Image className="h-12 w-12 text-primary-500" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.name}
              </p>
              <p className="text-sm text-gray-500">
                {formatFileSize(file.size)}
              </p>
            </div>
            
            <button
              onClick={onClear}
              disabled={isLoading}
              className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
              aria-label="Remove file"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-3 flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}