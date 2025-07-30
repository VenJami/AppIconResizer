import type { FileValidation } from '../types';
import { FILE_CONSTRAINTS } from './constants';

/**
 * Validates uploaded file against requirements
 */
export function validateFile(file: File): FileValidation {
  // Check file type
  if (!FILE_CONSTRAINTS.ALLOWED_TYPES.includes(file.type as any)) {
    return {
      isValid: false,
      error: 'Only PNG, JPG, and JPEG files are supported'
    };
  }
  
  // Check file size
  if (file.size > FILE_CONSTRAINTS.MAX_SIZE) {
    return {
      isValid: false,
      error: `File size must be less than ${FILE_CONSTRAINTS.MAX_SIZE / (1024 * 1024)}MB`
    };
  }
  
  return {
    isValid: true,
    file
  };
}

/**
 * Validates image dimensions
 */
export function validateImageDimensions(
  width: number,
  height: number
): { isValid: boolean; error?: string } {
  const minSize = FILE_CONSTRAINTS.MIN_SIZE;
  
  if (width < minSize || height < minSize) {
    return {
      isValid: false,
      error: `Image must be at least ${minSize}x${minSize} pixels. Current: ${width}x${height}`
    };
  }
  
  return { isValid: true };
}

/**
 * Loads image file and returns HTMLImageElement for further processing
 */
export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      // Validate dimensions
      const validation = validateImageDimensions(img.width, img.height);
      if (!validation.isValid) {
        reject(new Error(validation.error));
        return;
      }
      
      resolve(img);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Extracts ImageData from a crop area of an image
 */
export function extractCropImageData(
  img: HTMLImageElement,
  cropX: number,
  cropY: number,
  cropSize: number
): ImageData {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  canvas.width = cropSize;
  canvas.height = cropSize;
  
  // Draw the cropped area
  ctx.drawImage(
    img,
    cropX, cropY, cropSize, cropSize, // Source crop area
    0, 0, cropSize, cropSize // Destination
  );
  
  return ctx.getImageData(0, 0, cropSize, cropSize);
}

/**
 * Checks if an image needs cropping (not square)
 */
export function needsCropping(img: HTMLImageElement): boolean {
  return img.width !== img.height;
}

/**
 * Formats file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Generates a random hex color
 */
export function generateRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

/**
 * Converts hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Determines if a color is light or dark
 */
export function isLightColor(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  
  // Using luminance calculation
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5;
}