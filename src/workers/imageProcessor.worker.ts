import type { IconSize, ProcessedIcon, ProcessingOptions } from '../types';

interface WorkerMessage {
  type: 'PROCESS_IMAGE';
  payload: {
    imageData: ImageData;
    sizes: IconSize[];
    options: ProcessingOptions;
    platform: 'iOS' | 'Android';
  };
}

interface WorkerResponse {
  type: 'PROGRESS' | 'COMPLETE' | 'ERROR';
  payload: {
    progress?: number;
    currentStep?: string;
    processedIcons?: ProcessedIcon[];
    error?: string;
  };
}

// High-quality image resizing using Canvas with Lanczos-like interpolation
function resizeImageHighQuality(
  sourceImageData: ImageData,
  targetWidth: number,
  targetHeight: number,
  padding = 0,
  backgroundColor = '#FFFFFF'
): ImageData {
  const canvas = new OffscreenCanvas(targetWidth, targetHeight);
  const ctx = canvas.getContext('2d')!;
  
  // Set high-quality rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // Fill background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, targetWidth, targetHeight);
  
  // Calculate dimensions with padding
  const paddedSize = Math.min(targetWidth, targetHeight) - (padding * 2);
  const x = (targetWidth - paddedSize) / 2;
  const y = (targetHeight - paddedSize) / 2;
  
  // Create temporary canvas for source image
  const sourceCanvas = new OffscreenCanvas(sourceImageData.width, sourceImageData.height);
  const sourceCtx = sourceCanvas.getContext('2d')!;
  sourceCtx.putImageData(sourceImageData, 0, 0);
  
  // Draw resized image
  ctx.drawImage(sourceCanvas, x, y, paddedSize, paddedSize);
  
  return ctx.getImageData(0, 0, targetWidth, targetHeight);
}

// Convert ImageData to Blob
async function imageDataToBlob(imageData: ImageData): Promise<Blob> {
  const canvas = new OffscreenCanvas(imageData.width, imageData.height);
  const ctx = canvas.getContext('2d')!;
  ctx.putImageData(imageData, 0, 0);
  return await canvas.convertToBlob({ type: 'image/png', quality: 0.9 });
}

// Convert Blob to Data URL
function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Handle iOS-specific requirements (make App Store icon opaque)
function processIOSIcon(
  imageData: ImageData,
  size: IconSize,
  backgroundColor: string
): ImageData {
  // For iOS App Store icon (1024x1024), ensure it's opaque
  if (size.width === 1024 && size.height === 1024) {
    const canvas = new OffscreenCanvas(imageData.width, imageData.height);
    const ctx = canvas.getContext('2d')!;
    
    // Fill with background color first
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, imageData.width, imageData.height);
    
    // Draw the image on top
    ctx.putImageData(imageData, 0, 0);
    
    return ctx.getImageData(0, 0, imageData.width, imageData.height);
  }
  
  return imageData;
}

// Main processing function
async function processImages(
  sourceImageData: ImageData,
  sizes: IconSize[],
  options: ProcessingOptions,
  platform: 'iOS' | 'Android'
): Promise<ProcessedIcon[]> {
  const processedIcons: ProcessedIcon[] = [];
  const total = sizes.length;
  
  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    
    // Update progress
    self.postMessage({
      type: 'PROGRESS',
      payload: {
        progress: (i / total) * 100,
        currentStep: `Processing ${size.name} (${size.width}x${size.height})`
      }
    } as WorkerResponse);
    
    try {
      // Resize image
      let resizedImageData = resizeImageHighQuality(
        sourceImageData,
        size.width,
        size.height,
        options.padding,
        options.backgroundColor
      );
      
      // Apply platform-specific processing
      if (platform === 'iOS') {
        resizedImageData = processIOSIcon(resizedImageData, size, options.backgroundColor);
      }
      
      // Convert to blob and data URL
      const blob = await imageDataToBlob(resizedImageData);
      const dataUrl = await blobToDataUrl(blob);
      
      processedIcons.push({
        size,
        dataUrl,
        blob,
        platform
      });
      
    } catch (error) {
      console.error(`Error processing ${size.name}:`, error);
      // Continue with other sizes even if one fails
    }
  }
  
  return processedIcons;
}

// Worker message handler
self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const { type, payload } = event.data;
  
  if (type === 'PROCESS_IMAGE') {
    try {
      const { imageData, sizes, options, platform } = payload;
      
      self.postMessage({
        type: 'PROGRESS',
        payload: {
          progress: 0,
          currentStep: 'Starting image processing...'
        }
      } as WorkerResponse);
      
      const processedIcons = await processImages(imageData, sizes, options, platform);
      
      self.postMessage({
        type: 'COMPLETE',
        payload: {
          progress: 100,
          processedIcons
        }
      } as WorkerResponse);
      
    } catch (error) {
      self.postMessage({
        type: 'ERROR',
        payload: {
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      } as WorkerResponse);
    }
  }
};

// Export for TypeScript
export {};