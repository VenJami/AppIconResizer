import { useState, useCallback } from 'react';
import JSZip from 'jszip';
import type { ProcessedIcon, ZipPackage } from '../types';

interface UseZipDownloadReturn {
  isGenerating: boolean;
  progress: number;
  generateZip: (icons: ProcessedIcon[]) => Promise<ZipPackage>;
  downloadZip: (zipPackage: ZipPackage) => void;
}

export function useZipDownload(): UseZipDownloadReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const generateZip = useCallback(async (icons: ProcessedIcon[]): Promise<ZipPackage> => {
    setIsGenerating(true);
    setProgress(0);
    
    try {
      const zip = new JSZip();
      const total = icons.length;
      
      // Group icons by platform
      const iosIcons = icons.filter(icon => icon.platform === 'iOS');
      const androidIcons = icons.filter(icon => icon.platform === 'Android');
      
      // Add iOS icons
      if (iosIcons.length > 0) {
        const iosFolder = zip.folder('iOS');
        for (let i = 0; i < iosIcons.length; i++) {
          const icon = iosIcons[i];
          iosFolder?.file(icon.size.filename, icon.blob);
          setProgress(((i + 1) / total) * 50); // First 50% for iOS
        }
      }
      
      // Add Android icons
      if (androidIcons.length > 0) {
        const androidFolder = zip.folder('Android');
        for (let i = 0; i < androidIcons.length; i++) {
          const icon = androidIcons[i];
          androidFolder?.file(icon.size.filename, icon.blob);
          setProgress(50 + ((i + 1) / androidIcons.length) * 50); // Next 50% for Android
        }
      }
      
      // Generate ZIP blob
      const blob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });
      
      // Calculate total size
      const totalSize = icons.reduce((sum, icon) => sum + icon.blob.size, 0);
      
      const zipPackage: ZipPackage = {
        blob,
        filename: `app-icons-${new Date().toISOString().split('T')[0]}.zip`,
        totalFiles: icons.length,
        totalSize
      };
      
      setProgress(100);
      return zipPackage;
      
    } finally {
      setIsGenerating(false);
    }
  }, []);
  
  const downloadZip = useCallback((zipPackage: ZipPackage) => {
    const url = URL.createObjectURL(zipPackage.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = zipPackage.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);
  
  return {
    isGenerating,
    progress,
    generateZip,
    downloadZip
  };
}