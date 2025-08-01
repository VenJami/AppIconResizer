export interface IconSize {
  width: number;
  height: number;
  name: string;
  description: string;
  filename: string;
}

export interface PlatformPreset {
  name: 'All' | 'iOS' | 'Android' | 'Apple Watch' | 'Smart Watch' | 'Custom';
  sizes: IconSize[];
}

export interface CustomSize extends IconSize {
  id: string;
  isCustom: true;
}

export interface ProcessingOptions {
  selectedSizes: (IconSize | CustomSize)[];
  padding: number;
  backgroundColor: string;
}

export interface ProcessedIcon {
  size: IconSize;
  dataUrl: string;
  blob: Blob;
  platform: 'All' | 'iOS' | 'Android' | 'Apple Watch' | 'Smart Watch' | 'Custom';
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

export type Platform = 'All' | 'iOS' | 'Android' | 'Apple Watch' | 'Smart Watch' | 'Custom';
export type ProcessingStep = 'validating' | 'processing' | 'packaging' | 'complete' | 'error';