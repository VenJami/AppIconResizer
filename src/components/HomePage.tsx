import React, { useState, useEffect } from 'react';
import type { IconSize, CustomSize, Platform, ProcessedIcon, ZipPackage } from '../types';

// Components
import { Header } from './Header';
import { Footer } from './Footer';
import { FAQSection } from './FAQSection';
import { IconSizesSection } from './IconSizesSection';
import { GoogleAnalytics } from './GoogleAnalytics';
import { PerformanceOptimizer } from './PerformanceOptimizer';
import { InfoSection } from './InfoSection';
import { FileUpload } from './FileUpload';
import { PlatformSizeSelector } from './PlatformSizeSelector';
import { CustomizationPanel } from './CustomizationPanel';
import { PreviewGrid } from './PreviewGrid';
import { ProcessingStatus } from './ProcessingStatus';
import { DownloadSection } from './DownloadSection';
import { ExportControls } from './ExportControls';
import { ToastContainer } from './Toast';

// Hooks
import { useFileUpload } from '../hooks/useFileUpload';
import { useImageProcessor } from '../hooks/useImageProcessor';
import { useZipDownload } from '../hooks/useZipDownload';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useToast } from '../hooks/useToast';
import type { ExportSettings } from '../utils/exportFormats';
import { config } from '../utils/config';
import { iOS_SIZES, ANDROID_SIZES } from '../utils/constants';

export function HomePage() {
  // State
  const [selectedSizes, setSelectedSizes] = useState<(IconSize | CustomSize)[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['iOS', 'Android']);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [padding, setPadding] = useState(0);
  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    format: 'PNG',
    quality: 0.9,
    lossless: false,
    progressive: false,
    optimizeForWeb: true,
    preserveMetadata: false
  });
  const [processedIcons, setProcessedIcons] = useState<ProcessedIcon[]>([]);
  const [zipPackage, setZipPackage] = useState<ZipPackage | null>(null);

  // Hooks
  const { 
    file, 
    imageInfo, 
    isLoading, 
    handleFileSelect, 
    clearFile, 
    error: uploadError,
    finalImageData 
  } = useFileUpload();
  
  const { 
    processImage, 
    status: processingStatus, 
    cancelProcessing 
  } = useImageProcessor();
  
  const { generateZip, downloadZip, isGenerating } = useZipDownload();
  const { toasts, success, error: showError, removeToast } = useToast();

  // Scroll animation
  useScrollAnimation();

  // Debug: Log component mount
  useEffect(() => {
    console.log('HomePage component mounted');
    console.log('Root element:', document.getElementById('root'));
  }, []);

  // Error handling
  useEffect(() => {
    if (uploadError) {
      showError(uploadError);
    }
  }, [uploadError, showError]);

  useEffect(() => {
    if (processingStatus.error) {
      showError(processingStatus.error);
    }
  }, [processingStatus.error, showError]);

  // Handle file upload
  const handleFileUpload = async (uploadedFile: File) => {
    try {
      await handleFileSelect(uploadedFile);
      success('File uploaded successfully!');
    } catch (error) {
      // Error is handled by the hook
    }
  };

  // Handle processing
  const handleProcess = async (exportSettings?: any) => {
    console.log('handleProcess called', { 
      hasFinalImageData: !!finalImageData, 
      selectedSizes: selectedSizes.length,
      exportSettings 
    });
    
    if (!finalImageData) {
      console.log('No finalImageData available');
      return;
    }

    try {
      const allSizes = [...selectedSizes];
      if (allSizes.length === 0) {
        showError('Please select at least one icon size');
        return;
      }

      const options = {
        selectedSizes: allSizes,
        backgroundColor,
        padding,
        exportSettings // Include export settings if provided
      };

      console.log('Starting image processing with options:', options);

      const processedIcons = await processImage(
        finalImageData,
        allSizes,
        options,
        selectedPlatforms[0] // Process with first selected platform
      );

      console.log('Processing completed, icons generated:', processedIcons.length);
      setProcessedIcons(processedIcons);
      success('Icons generated successfully!');
    } catch (error) {
      console.error('Processing error:', error);
      // Error is handled by the hook
    }
  };

  // Handle download
  const handleDownload = async () => {
    if (!processedIcons.length) return;

    try {
      const zipPackage = await generateZip(processedIcons);
      downloadZip(zipPackage);
      success('Download completed!');
    } catch (error) {
      showError('Download failed. Please try again.');
    }
  };

  // Handle ZIP generation
  const handleGenerateZip = async () => {
    if (!processedIcons.length) return;

    try {
      const zipPackage = await generateZip(processedIcons);
      setZipPackage(zipPackage);
      success('ZIP package generated successfully!');
    } catch (error) {
      showError('Failed to generate ZIP package.');
    }
  };

  // Handle size selection
  const handleSizeSelection = (sizes: (IconSize | CustomSize)[]) => {
    setSelectedSizes(sizes);
  };

  // Handle platform selection
  const handlePlatformSelection = (platforms: Platform[]) => {
    setSelectedPlatforms(platforms);
  };

  return (
    <div id="root" className="min-h-screen bg-dark-950">
      <GoogleAnalytics measurementId={config.gaMeasurementId} />
      <PerformanceOptimizer />
      <Header />
      
             {/* Hero Section */}
       <section id="hero-section" className="hero-container relative min-h-screen flex items-center justify-center overflow-hidden">
         <div className="hero-bg-gradient absolute inset-0"></div>
         <div className="hero-grid absolute inset-0 opacity-20"></div>
         
         {/* Enhanced floating orbs */}
         <div className="hero-orb absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-accent-500 to-blue-500 rounded-full blur-3xl opacity-30 animate-float animate-glow"></div>
         <div className="hero-orb absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-500 to-accent-500 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
         <div className="hero-orb absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
         <div className="hero-orb absolute bottom-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-accent-500 to-purple-500 rounded-full blur-2xl opacity-25 animate-float" style={{ animationDelay: '6s' }}></div>
         
         <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-on-scroll">
             <span className="text-gradient">App Icon</span> Resizer
           </h1>
           <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-on-scroll">
             Transform your logos into perfect app icons for iOS, Android, and Apple Watch. 
             <span className="text-gradient font-semibold"> Free, fast, and privacy-focused.</span>
           </p>
           
           <div className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll">
             <div className="flex items-center space-x-2 bg-gradient-to-r from-accent-500/20 to-accent-600/20 text-accent-400 px-6 py-3 rounded-full border border-accent-500/30 hover-lift backdrop-blur-sm">
               <span className="text-sm font-bold">41+ Icon Sizes</span>
             </div>
             <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 px-6 py-3 rounded-full border border-blue-500/30 hover-lift backdrop-blur-sm">
               <span className="text-sm font-bold">Instant Processing</span>
             </div>
             <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-400 px-6 py-3 rounded-full border border-purple-500/30 hover-lift backdrop-blur-sm">
               <span className="text-sm font-bold">Zero Cropping</span>
             </div>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-6 justify-center animate-on-scroll">
             <button 
               onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
               className="btn-primary text-lg px-10 py-5 flex items-center justify-center space-x-3 hover-lift"
             >
               <span>Start Creating Icons</span>
             </button>
             <button 
               onClick={() => document.getElementById('info-section')?.scrollIntoView({ behavior: 'smooth' })}
               className="btn-outline text-lg px-10 py-5 flex items-center justify-center space-x-3 hover-lift"
             >
               <span>Learn How It Works</span>
             </button>
           </div>
         </div>
       </section>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Upload Section */}
        <section id="upload-section" className="py-16 bg-dark-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Upload Your Image
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Drag and drop your logo or click to browse. We support PNG, JPG, JPEG, SVG, WebP, and GIF formats.
              </p>
            </div>

            <FileUpload 
              onFileSelect={handleFileUpload}
              file={file}
              onClear={clearFile}
              isLoading={isLoading}
              error={uploadError}
              onError={showError}
            />
          </div>
        </section>

        {/* Platform Selection */}
        {file && (
          <>
            <section id="platform-selection" className="py-20 bg-dark-800">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8">Select Platforms & Sizes</h3>
                  <PlatformSizeSelector 
                    selectedPlatforms={selectedPlatforms}
                    selectedSizes={selectedSizes}
                    onPlatformChange={handlePlatformSelection}
                    onSizeChange={handleSizeSelection}
                  />
                </div>
              </div>
            </section>

            {/* Customization */}
            <section id="customization" className="py-16 bg-dark-900">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Customization Panel */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Customize Your Icons</h3>
                    <CustomizationPanel 
                      options={{
                        selectedSizes,
                        backgroundColor,
                        padding
                      }}
                      onOptionsChange={(options) => {
                        setBackgroundColor(options.backgroundColor);
                        setPadding(options.padding);
                      }}
                    />
                  </div>

                  {/* Export Settings */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Export Settings</h3>
                    <ExportControls 
                      selectedSizes={selectedSizes}
                      onExport={handleProcess}
                      isExporting={processingStatus.isProcessing}
                      progress={processingStatus.progress || 0}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Processing & Download */}
            <section id="processing" className="py-16 bg-dark-800">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {processingStatus.isProcessing && (
                  <ProcessingStatus status={processingStatus} onCancel={cancelProcessing} />
                )}

                {processedIcons.length > 0 && (
                  <>
                    <PreviewGrid icons={processedIcons} />
                    <DownloadSection 
                      icons={processedIcons}
                      onGenerateZip={handleGenerateZip}
                      onDownloadZip={downloadZip}
                      zipPackage={zipPackage}
                      isGenerating={isGenerating}
                      progress={0}
                    />
                  </>
                )}
              </div>
            </section>
          </>
        )}

        {/* Info Section */}
        <section id="info-section" className="py-16 bg-dark-900">
          <InfoSection />
        </section>
      </main>

      {/* Icon Sizes Section */}
      <div id="icon-sizes">
        <IconSizesSection />
      </div>
      
      {/* FAQ Section */}
      <div id="faq">
        <FAQSection />
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
} 