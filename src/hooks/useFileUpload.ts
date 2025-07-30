import { useState, useCallback } from 'react';
import type { FileValidation, ImageInfo, CropArea } from '../types';
import { validateFile, loadImage, needsCropping, extractCropImageData } from '../utils/imageUtils';

interface UseFileUploadReturn {
  file: File | null;
  imageInfo: ImageInfo | null;
  validation: FileValidation | null;
  isLoading: boolean;
  showCropper: boolean;
  handleFileSelect: (file: File) => Promise<void>;
  handleCropChange: (cropArea: CropArea) => void;
  handleCropConfirm: () => void;
  handleCropCancel: () => void;
  clearFile: () => void;
  error: string | null;
  finalImageData: ImageData | null;
}

export function useFileUpload(): UseFileUploadReturn {
  const [file, setFile] = useState<File | null>(null);
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [validation, setValidation] = useState<FileValidation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finalImageData, setFinalImageData] = useState<ImageData | null>(null);
  
  const handleFileSelect = useCallback(async (selectedFile: File) => {
    setIsLoading(true);
    setError(null);
    setShowCropper(false);
    setFinalImageData(null);
    
    try {
      // Validate file
      const fileValidation = validateFile(selectedFile);
      setValidation(fileValidation);
      
      if (!fileValidation.isValid) {
        setError(fileValidation.error || 'Invalid file');
        setFile(null);
        setImageInfo(null);
        return;
      }
      
      // Load image
      const image = await loadImage(selectedFile);
      const needsCrop = needsCropping(image);
      
      const imageData: ImageInfo = {
        file: selectedFile,
        image,
        needsCropping: needsCrop
      };
      
      setFile(selectedFile);
      setImageInfo(imageData);
      
      if (needsCrop) {
        setShowCropper(true);
      } else {
        // Image is already square, extract ImageData directly
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const processedData = ctx.getImageData(0, 0, image.width, image.height);
        setFinalImageData(processedData);
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load image';
      setError(errorMessage);
      setValidation({
        isValid: false,
        error: errorMessage
      });
      setFile(null);
      setImageInfo(null);
      
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const [currentCropArea, setCurrentCropArea] = useState<CropArea | null>(null);
  
  const handleCropChange = useCallback((cropArea: CropArea) => {
    setCurrentCropArea(cropArea);
  }, []);
  
  const handleCropConfirm = useCallback(() => {
    if (!imageInfo || !currentCropArea) return;
    
    try {
      const croppedImageData = extractCropImageData(
        imageInfo.image,
        currentCropArea.x,
        currentCropArea.y,
        currentCropArea.size
      );
      
      setFinalImageData(croppedImageData);
      setShowCropper(false);
      
      // Update imageInfo with crop area
      setImageInfo(prev => prev ? { ...prev, cropArea: currentCropArea } : null);
      
    } catch (err) {
      setError('Failed to crop image');
    }
  }, [imageInfo, currentCropArea]);
  
  const handleCropCancel = useCallback(() => {
    setShowCropper(false);
    clearFile();
  }, []);
  
  const clearFile = useCallback(() => {
    setFile(null);
    setImageInfo(null);
    setValidation(null);
    setError(null);
    setShowCropper(false);
    setFinalImageData(null);
  }, []);
  
  return {
    file,
    imageInfo,
    validation,
    isLoading,
    showCropper,
    handleFileSelect,
    handleCropChange,
    handleCropConfirm,
    handleCropCancel,
    clearFile,
    error,
    finalImageData
  };
}