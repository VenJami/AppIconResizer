export interface IconSize {
  width: number;
  height: number;
  name: string;
  description: string;
  filename: string;
}

export interface PlatformPreset {
  name: 'iOS' | 'Android';
  sizes: IconSize[];
}

export interface ProcessingOptions {
  platforms: ('iOS' | 'Android')[];
  padding: number;
  backgroundColor: string;
}

export interface ProcessedIcon {
  size: IconSize;
  dataUrl: string;
  blob: Blob;
  platform: 'iOS' | 'Android';
}

export interface ProcessingStatus {
  isProcessing: boolean;
  currentStep: string;
  progress: number;
  error?: string;
}

export interface FileValidation {
  isValid: boolean;
  error?: string;
  file?: File;
}

export interface CropArea {
  x: number;
  y: number;
  size: number;
}

export interface ImageInfo {
  file: File;
  image: HTMLImageElement;
  needsCropping: boolean;
  cropArea?: CropArea;
  processedImageData?: ImageData;
}

export interface ZipPackage {
  blob: Blob;
  filename: string;
  totalFiles: number;
  totalSize: number;
}

export type Platform = 'iOS' | 'Android';
export type ProcessingStep = 'validating' | 'processing' | 'packaging' | 'complete' | 'error';