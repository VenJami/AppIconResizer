import React, { useState, useCallback } from 'react';
import type { Platform, ProcessingOptions, ProcessedIcon, ZipPackage } from './types';
import { PLATFORM_PRESETS, PROCESSING_CONFIG } from './utils/constants';

// Components
import { Header } from './components/Header';
import { InfoSection } from './components/InfoSection';
import { FileUpload } from './components/FileUpload';
import { PlatformSelector } from './components/PlatformSelector';
import { CustomizationPanel } from './components/CustomizationPanel';
import { ProcessingStatus } from './components/ProcessingStatus';
import { PreviewGrid } from './components/PreviewGrid';
import { DownloadSection } from './components/DownloadSection';

// Hooks
import { useFileUpload } from './hooks/useFileUpload';
import { useImageProcessor } from './hooks/useImageProcessor';
import { useZipDownload } from './hooks/useZipDownload';

function App() {
  // State
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['iOS']);
  const [processingOptions, setProcessingOptions] = useState<ProcessingOptions>({
    platforms: ['iOS'],
    padding: PROCESSING_CONFIG.DEFAULT_PADDING,
    backgroundColor: PROCESSING_CONFIG.DEFAULT_BACKGROUND
  });
  const [processedIcons, setProcessedIcons] = useState<ProcessedIcon[]>([]);
  const [zipPackage, setZipPackage] = useState<ZipPackage | null>(null);
  
  // Hooks
  const fileUpload = useFileUpload();
  const imageProcessor = useImageProcessor();
  const zipDownload = useZipDownload();
  
  // Handlers
  const handlePlatformChange = useCallback((platforms: Platform[]) => {
    setSelectedPlatforms(platforms);
    setProcessingOptions(prev => ({ ...prev, platforms }));
  }, []);
  
  const handleProcessingOptionsChange = useCallback((options: ProcessingOptions) => {
    setProcessingOptions(options);
  }, []);
  
  const handleProcessImage = useCallback(async () => {
    if (!fileUpload.imageData || selectedPlatforms.length === 0) return;
    
    try {
      setProcessedIcons([]); // Clear previous results
      setZipPackage(null); // Clear previous ZIP
      
      const allProcessedIcons: ProcessedIcon[] = [];
      
      // Process each platform
      for (const platform of selectedPlatforms) {
        const platformSizes = PLATFORM_PRESETS[platform].sizes;
        const icons = await imageProcessor.processImage(
          fileUpload.imageData,
          platformSizes,
          processingOptions,
          platform
        );
        allProcessedIcons.push(...icons);
      }
      
      setProcessedIcons(allProcessedIcons);
      
    } catch (error) {
      console.error('Processing error:', error);
    }
  }, [fileUpload.imageData, selectedPlatforms, processingOptions, imageProcessor]);
  
  const handleGenerateZip = useCallback(async () => {
    if (processedIcons.length === 0) return;
    
    try {
      const zipPkg = await zipDownload.generateZip(processedIcons);
      setZipPackage(zipPkg);
    } catch (error) {
      console.error('ZIP generation error:', error);
    }
  }, [processedIcons, zipDownload]);
  
  const handleDownloadZip = useCallback((zipPkg: ZipPackage) => {
    zipDownload.downloadZip(zipPkg);
  }, [zipDownload]);
  
  const handleDownloadIcon = useCallback((icon: ProcessedIcon) => {
    const url = URL.createObjectURL(icon.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = icon.size.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);
  
  // Auto-process when file and platforms are ready
  React.useEffect(() => {
    if (fileUpload.imageData && selectedPlatforms.length > 0 && !imageProcessor.status.isProcessing) {
      handleProcessImage();
    }
  }, [fileUpload.imageData, selectedPlatforms, handleProcessImage, imageProcessor.status.isProcessing]);
  
  const canProcess = fileUpload.imageData && selectedPlatforms.length > 0;
  const isProcessingDisabled = imageProcessor.status.isProcessing || fileUpload.isLoading;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Convert Your Logo to App Icons
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Upload a 1024×1024px logo and get all required iOS and Android icon sizes instantly.
              No signup required, completely free.
            </p>
          </div>
          
          {/* Info Section */}
          <InfoSection />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upload and Settings */}
            <div className="lg:col-span-1 space-y-6">
              {/* File Upload */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  1. Upload Your Logo
                </h3>
                <FileUpload
                  onFileSelect={fileUpload.handleFileSelect}
                  file={fileUpload.file}
                  onClear={fileUpload.clearFile}
                  isLoading={fileUpload.isLoading}
                  error={fileUpload.error}
                  disabled={isProcessingDisabled}
                />
              </div>
              
              {/* Platform Selection */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  2. Select Platforms
                </h3>
                <PlatformSelector
                  selectedPlatforms={selectedPlatforms}
                  onPlatformChange={handlePlatformChange}
                  disabled={isProcessingDisabled}
                />
              </div>
              
              {/* Customization */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  3. Customize (Optional)
                </h3>
                <CustomizationPanel
                  options={processingOptions}
                  onOptionsChange={handleProcessingOptionsChange}
                  disabled={isProcessingDisabled}
                />
              </div>
              
              {/* Manual Process Button (if auto-processing fails) */}
              {canProcess && !imageProcessor.status.isProcessing && processedIcons.length === 0 && (
                <button
                  onClick={handleProcessImage}
                  disabled={isProcessingDisabled}
                  className="w-full btn-primary py-3"
                >
                  Generate Icons
                </button>
              )}
            </div>
            
            {/* Right Column - Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Processing Status */}
              <ProcessingStatus
                status={imageProcessor.status}
                onCancel={imageProcessor.cancelProcessing}
              />
              
              {/* Preview Grid */}
              {(processedIcons.length > 0 || imageProcessor.status.isProcessing) && (
                <div className="card">
                  <PreviewGrid
                    icons={processedIcons}
                    onDownloadIcon={handleDownloadIcon}
                  />
                </div>
              )}
              
              {/* Download Section */}
              {processedIcons.length > 0 && (
                <DownloadSection
                  icons={processedIcons}
                  onGenerateZip={handleGenerateZip}
                  onDownloadZip={handleDownloadZip}
                  zipPackage={zipPackage}
                  isGenerating={zipDownload.isGenerating}
                  progress={zipDownload.progress}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>
              Built with React, TypeScript, and modern web APIs. 
              All processing happens in your browser for maximum privacy.
            </p>
            <p className="mt-2">
              © 2025 App Icon Resizer. Open source and free to use.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;