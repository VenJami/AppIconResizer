import { useState, useCallback } from 'react';
import type { FileValidation } from '../types';
import { validateFile, loadImageData } from '../utils/imageUtils';

interface UseFileUploadReturn {
  file: File | null;
  imageData: ImageData | null;
  validation: FileValidation | null;
  isLoading: boolean;
  handleFileSelect: (file: File) => Promise<void>;
  clearFile: () => void;
  error: string | null;
}

export function useFileUpload(): UseFileUploadReturn {
  const [file, setFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [validation, setValidation] = useState<FileValidation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleFileSelect = useCallback(async (selectedFile: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate file
      const fileValidation = validateFile(selectedFile);
      setValidation(fileValidation);
      
      if (!fileValidation.isValid) {
        setError(fileValidation.error || 'Invalid file');
        setFile(null);
        setImageData(null);
        return;
      }
      
      // Load image data
      const data = await loadImageData(selectedFile);
      
      setFile(selectedFile);
      setImageData(data);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load image';
      setError(errorMessage);
      setValidation({
        isValid: false,
        error: errorMessage
      });
      setFile(null);
      setImageData(null);
      
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const clearFile = useCallback(() => {
    setFile(null);
    setImageData(null);
    setValidation(null);
    setError(null);
  }, []);
  
  return {
    file,
    imageData,
    validation,
    isLoading,
    handleFileSelect,
    clearFile,
    error
  };
}