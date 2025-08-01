// Export format utilities and optimization

export interface ExportFormat {
  name: string;
  extension: string;
  mimeType: string;
  supportsTransparency: boolean;
  compressionOptions: {
    quality: boolean; // Supports quality adjustment
    lossless: boolean; // Supports lossless compression
    progressive: boolean; // Supports progressive encoding
  };
  description: string;
  recommendation: string;
}

export const EXPORT_FORMATS: Record<string, ExportFormat> = {
  png: {
    name: 'PNG',
    extension: 'png',
    mimeType: 'image/png',
    supportsTransparency: true,
    compressionOptions: {
      quality: false,
      lossless: true,
      progressive: false
    },
    description: 'Best for logos with transparency',
    recommendation: 'Recommended for app icons'
  },
  jpeg: {
    name: 'JPEG',
    extension: 'jpg',
    mimeType: 'image/jpeg',
    supportsTransparency: false,
    compressionOptions: {
      quality: true,
      lossless: false,
      progressive: true
    },
    description: 'Smaller file size, no transparency',
    recommendation: 'Good for backgrounds'
  },
  webp: {
    name: 'WebP',
    extension: 'webp',
    mimeType: 'image/webp',
    supportsTransparency: true,
    compressionOptions: {
      quality: true,
      lossless: true,
      progressive: false
    },
    description: 'Modern format with excellent compression',
    recommendation: 'Best overall quality/size ratio'
  },
  avif: {
    name: 'AVIF',
    extension: 'avif',
    mimeType: 'image/avif',
    supportsTransparency: true,
    compressionOptions: {
      quality: true,
      lossless: true,
      progressive: false
    },
    description: 'Next-gen format with superior compression',
    recommendation: 'Cutting-edge for supported browsers'
  }
};

export interface ExportSettings {
  format: string;
  quality: number; // 0-100
  lossless: boolean;
  progressive: boolean;
  optimizeForWeb: boolean;
  preserveMetadata: boolean;
}

export const DEFAULT_EXPORT_SETTINGS: ExportSettings = {
  format: 'png',
  quality: 95,
  lossless: true,
  progressive: false,
  optimizeForWeb: true,
  preserveMetadata: false
};

// Canvas to specific format conversion
export async function convertCanvasToFormat(
  canvas: HTMLCanvasElement,
  settings: ExportSettings
): Promise<Blob> {
  const format = EXPORT_FORMATS[settings.format];
  
  if (!format) {
    throw new Error(`Unsupported format: ${settings.format}`);
  }

  // For formats that support quality adjustment
  if (format.compressionOptions.quality && settings.format !== 'png') {
    const quality = settings.lossless ? 1.0 : settings.quality / 100;
    
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        format.mimeType,
        quality
      );
    });
  }

  // For PNG and lossless formats
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob'));
        }
      },
      format.mimeType
    );
  });
}

// Advanced optimization using OffscreenCanvas (when available)
export async function optimizeImage(
  imageData: ImageData,
  settings: ExportSettings
): Promise<Blob> {
  const canvas = new OffscreenCanvas(imageData.width, imageData.height);
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  ctx.putImageData(imageData, 0, 0);

  // Apply optimizations
  if (settings.optimizeForWeb) {
    // Apply slight sharpening for web display
    ctx.filter = 'contrast(1.02) brightness(1.01)';
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
  }

  return convertCanvasToFormat(canvas as any, settings);
}

// Batch export functionality
export interface BatchExportJob {
  id: string;
  name: string;
  size: { width: number; height: number };
  imageData: ImageData;
  settings: ExportSettings;
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: Blob;
  error?: string;
}

export class BatchExporter {
  private jobs: Map<string, BatchExportJob> = new Map();
  private concurrency = 3; // Process 3 images simultaneously
  private activeJobs = 0;

  addJob(job: Omit<BatchExportJob, 'id' | 'progress' | 'status'>): string {
    const id = Math.random().toString(36).substring(2, 11);
    const fullJob: BatchExportJob = {
      ...job,
      id,
      progress: 0,
      status: 'pending'
    };
    
    this.jobs.set(id, fullJob);
    this.processNext();
    return id;
  }

  private async processNext() {
    if (this.activeJobs >= this.concurrency) return;

    const pendingJob = Array.from(this.jobs.values()).find(
      job => job.status === 'pending'
    );

    if (!pendingJob) return;

    this.activeJobs++;
    pendingJob.status = 'processing';

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        if (pendingJob.progress < 90) {
          pendingJob.progress += (Math.random() * 20);
        }
      }, 100);

      pendingJob.result = await optimizeImage(pendingJob.imageData, pendingJob.settings);
      
      clearInterval(progressInterval);
      pendingJob.progress = 100;
      pendingJob.status = 'completed';
    } catch (error) {
      pendingJob.status = 'failed';
      pendingJob.error = error instanceof Error ? error.message : 'Unknown error';
    }

    this.activeJobs--;
    this.processNext(); // Process next job
  }

  getJob(id: string): BatchExportJob | undefined {
    return this.jobs.get(id);
  }

  getAllJobs(): BatchExportJob[] {
    return Array.from(this.jobs.values());
  }

  getProgress(): { completed: number; total: number; failed: number } {
    const jobs = this.getAllJobs();
    return {
      completed: jobs.filter(j => j.status === 'completed').length,
      total: jobs.length,
      failed: jobs.filter(j => j.status === 'failed').length
    };
  }

  clear() {
    this.jobs.clear();
  }
}

// File size estimation
export function estimateFileSize(
  width: number,
  height: number,
  format: string,
  quality: number = 95
): number {
  const pixels = width * height;
  const baseSize = pixels * 4; // RGBA

  switch (format) {
    case 'png':
      return baseSize * 0.3; // PNG compression ratio
    case 'jpeg':
      return baseSize * (quality / 100) * 0.1; // JPEG compression
    case 'webp':
      return baseSize * (quality / 100) * 0.08; // WebP compression
    case 'avif':
      return baseSize * (quality / 100) * 0.05; // AVIF compression
    default:
      return baseSize;
  }
}

// Format recommendation engine
export function recommendFormat(
  hasTransparency: boolean,
  targetUse: 'web' | 'app' | 'print' = 'app'
): string {
  if (hasTransparency) {
    if (targetUse === 'web') return 'webp';
    return 'png';
  }

  switch (targetUse) {
    case 'web':
      return 'webp';
    case 'app':
      return 'png';
    case 'print':
      return 'jpeg';
    default:
      return 'png';
  }
}