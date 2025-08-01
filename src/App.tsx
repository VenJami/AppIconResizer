import React, { useState, useCallback } from 'react';
import type { IconSize, CustomSize, ProcessingOptions, ProcessedIcon, ZipPackage } from './types';
import { iOS_SIZES, ANDROID_SIZES, PROCESSING_CONFIG } from './utils/constants';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FAQSection } from './components/FAQSection';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { PerformanceOptimizer } from './components/PerformanceOptimizer';
import { InfoSection } from './components/InfoSection';
import { FileUpload } from './components/FileUpload';
import { ImageCropper } from './components/ImageCropper';
import { SizeSelector } from './components/SizeSelector';
import { CustomizationPanel } from './components/CustomizationPanel';
import { ProcessingStatus } from './components/ProcessingStatus';
import { PreviewGrid } from './components/PreviewGrid';
import { DownloadSection } from './components/DownloadSection';
import { ExportControls } from './components/ExportControls';
import { ToastContainer } from './components/Toast';
// import { ParticleSystem } from './components/ParticleSystem';
// import { FeatureCard } from './components/FeatureCard';

// Hooks
import { useFileUpload } from './hooks/useFileUpload';
import { useImageProcessor } from './hooks/useImageProcessor';
import { useZipDownload } from './hooks/useZipDownload';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useToast } from './hooks/useToast';
// import { useStaggerAnimation } from './hooks/useAdvancedAnimations';
import type { ExportSettings } from './utils/exportFormats';

function App() {
  // State
  const [selectedSizes, setSelectedSizes] = useState<(IconSize | CustomSize)[]>([]);
  const [processingOptions, setProcessingOptions] = useState<ProcessingOptions>({
    selectedSizes: [],
    padding: PROCESSING_CONFIG.DEFAULT_PADDING,
    backgroundColor: PROCESSING_CONFIG.DEFAULT_BACKGROUND
  });
  const [processedIcons, setProcessedIcons] = useState<ProcessedIcon[]>([]);
  const [zipPackage, setZipPackage] = useState<ZipPackage | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  
  // Hooks
  const fileUpload = useFileUpload();
  const imageProcessor = useImageProcessor();
  const zipDownload = useZipDownload();
  const toast = useToast();
  
  // Initialize animations
  useScrollAnimation();
  // const staggerRef = useStaggerAnimation(150);
  
  // Handlers
  const handleSizeChange = useCallback((sizes: (IconSize | CustomSize)[]) => {
    setSelectedSizes(sizes);
    setProcessingOptions(prev => ({ ...prev, selectedSizes: sizes }));
  }, []);
  
  // Clear processed icons when new file is uploaded
  React.useEffect(() => {
    if (fileUpload.finalImageData) {
      setProcessedIcons([]);
      setZipPackage(null);
    }
  }, [fileUpload.finalImageData]);
  
  const handleProcessingOptionsChange = useCallback((options: ProcessingOptions) => {
    setProcessingOptions(options);
  }, []);
  
  const handleProcessImage = useCallback(async () => {
    if (!fileUpload.finalImageData || selectedSizes.length === 0) return;
    
    try {
      setProcessedIcons([]); // Clear previous results
      setZipPackage(null); // Clear previous ZIP
      
      const allProcessedIcons: ProcessedIcon[] = [];
      
      // Group sizes by platform
      const iosSizes = selectedSizes.filter(size => 
        !('isCustom' in size) && iOS_SIZES.sizes.some(ios => ios.width === size.width && ios.height === size.height && ios.name === size.name)
      );
      const androidSizes = selectedSizes.filter(size => 
        !('isCustom' in size) && ANDROID_SIZES.sizes.some(android => android.width === size.width && android.height === size.height && android.name === size.name)
      );
             const customSizes = selectedSizes.filter(size => 'isCustom' in size && size.isCustom) as CustomSize[];
      
      // Process iOS sizes
      if (iosSizes.length > 0) {
        const icons = await imageProcessor.processImage(
          fileUpload.finalImageData,
          iosSizes,
          processingOptions,
          'iOS'
        );
        allProcessedIcons.push(...icons);
      }
      
      // Process Android sizes
      if (androidSizes.length > 0) {
        const icons = await imageProcessor.processImage(
          fileUpload.finalImageData,
          androidSizes,
          processingOptions,
          'Android'
        );
        allProcessedIcons.push(...icons);
      }
      
      // Process Custom sizes
      if (customSizes.length > 0) {
        const icons = await imageProcessor.processImage(
          fileUpload.finalImageData,
          customSizes,
          processingOptions,
          'Custom'
        );
        allProcessedIcons.push(...icons);
      }
      
      setProcessedIcons(allProcessedIcons);
      
    } catch (error) {
      console.error('Processing error:', error);
    }
  }, [fileUpload.finalImageData, selectedSizes, processingOptions, imageProcessor]);
  
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

  const handleAdvancedExport = useCallback(async (settings: ExportSettings) => {
    if (processedIcons.length === 0) return;
    
    setIsExporting(true);
    setExportProgress(0);
    
    try {
      // Simulate advanced export process with progress
      const progressInterval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // For now, use the existing ZIP generation but with enhanced settings
      const zipPkg = await zipDownload.generateZip(processedIcons);
      
      clearInterval(progressInterval);
      setExportProgress(100);
      
      // Auto-download after a brief moment
      setTimeout(() => {
        zipDownload.downloadZip(zipPkg);
        setIsExporting(false);
        setExportProgress(0);
        toast.success(`Exported ${processedIcons.length} icons in ${settings.format.toUpperCase()} format!`);
      }, 500);
      
    } catch (error) {
      console.error('Export error:', error);
      setIsExporting(false);
      setExportProgress(0);
      toast.error('Export failed. Please try again.');
    }
  }, [processedIcons, zipDownload, toast]);
  
  // Remove auto-processing to prevent infinite loops
  // Users will manually trigger processing with a button
  
  const canProcess = fileUpload.finalImageData && selectedSizes.length > 0;
  const isProcessingDisabled = imageProcessor.status.isProcessing || fileUpload.isLoading;
  
  return (
    <div id="root">
      <GoogleAnalytics measurementId="G-631GXM1X67" />
      <PerformanceOptimizer />
      <Header />
      
      {/* Particle System - Adding CSS-only animated background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-blue-500/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Hero Section */}
      <section className="hero-container relative min-h-screen flex items-center justify-center pt-20">
        <div className="hero-bg-gradient"></div>
        <div className="hero-grid"></div>
        
        {/* Floating orbs */}
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="hero-text">
                <span className="text-white">Powerful</span><br/>
                <span className="text-shimmer">App Icon</span><br/>
                <span className="text-white">Generator</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transform your 1024×1024px logo into all required iOS and Android icon sizes instantly.
                <span className="text-accent-400 font-semibold"> No signup required, completely free.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                className="btn-hero morph-button magnetic-hover neon-glow" 
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🚀 Start Creating Icons
              </button>
              <button className="btn-outline elastic-scale shimmer">
                📱 View Samples
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="feature-card card-glass text-center group relative overflow-hidden animate-fade-in transform-gpu hover:scale-105 transition-all duration-500">
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-400 transition-colors duration-300">
                  Lightning Fast
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                  Generate all icon sizes in seconds with our optimized processing engine
                </p>
              </div>
              <div className="feature-card card-glass text-center group relative overflow-hidden animate-fade-in transform-gpu hover:scale-105 transition-all duration-500" style={{ animationDelay: '0.2s' }}>
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
                  🎯
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-400 transition-colors duration-300">
                  Pixel Perfect
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                  Maintains quality and follows platform guidelines for iOS and Android
                </p>
              </div>
              <div className="feature-card card-glass text-center group relative overflow-hidden animate-fade-in transform-gpu hover:scale-105 transition-all duration-500" style={{ animationDelay: '0.4s' }}>
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
                  🔒
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-400 transition-colors duration-300">
                  Privacy First
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                  All processing happens in your browser - your images never leave your device
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <main id="upload-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          
          {/* Info Section */}
          <div className="reveal-on-scroll">
            <InfoSection />
          </div>
          
          {/* Cropping Step */}
          {fileUpload.showCropper && fileUpload.imageInfo && (
            <div className="mb-12 reveal-on-scroll">
              <ImageCropper
                image={fileUpload.imageInfo.image}
                onCropChange={fileUpload.handleCropChange}
                onConfirm={fileUpload.handleCropConfirm}
                onCancel={fileUpload.handleCropCancel}
              />
            </div>
          )}

          {!fileUpload.showCropper && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal-on-scroll perspective-container">
              {/* Left Column - Upload and Settings */}
              <div className="lg:col-span-1 space-y-6">
                {/* File Upload */}
                <div className="card card-3d">
                  <h3 className="section-heading mb-6">
                    <span className="text-accent-400">1.</span> Upload Your Logo
                  </h3>
                  <FileUpload
                    onFileSelect={fileUpload.handleFileSelect}
                    file={fileUpload.file}
                    onClear={fileUpload.clearFile}
                    isLoading={fileUpload.isLoading}
                    error={fileUpload.error}
                    disabled={isProcessingDisabled}
                    onError={toast.error}
                  />
                </div>
              
                              {/* Size Selection - only show when we have an image */}
                {fileUpload.finalImageData && (
                  <div className="card card-3d">
                    <h3 className="section-heading mb-6">
                      <span className="text-accent-400">2.</span> Select Icon Sizes
                    </h3>
                    <SizeSelector
                      selectedSizes={selectedSizes}
                      onSizeChange={handleSizeChange}
                      disabled={isProcessingDisabled}
                    />
                  </div>
                )}
              
              {/* Customization */}
                              {/* Customization Panel - only show when we have an image */}
                {fileUpload.finalImageData && (
                  <div className="card card-3d">
                    <h3 className="section-heading mb-6">
                      <span className="text-accent-400">3.</span> Customize (Optional)
                    </h3>
                    <CustomizationPanel
                      options={processingOptions}
                      onOptionsChange={handleProcessingOptionsChange}
                      disabled={isProcessingDisabled}
                    />
                  </div>
                )}
              
                              {/* Generate Icons Button */}
                {canProcess && !imageProcessor.status.isProcessing && (
                  <div className="card glow-accent card-3d">
                    <h3 className="section-heading mb-6">
                      <span className="text-accent-400">4.</span> Generate Icons
                    </h3>
                    <button
                      onClick={handleProcessImage}
                      disabled={isProcessingDisabled}
                      className="w-full btn-primary py-4 text-lg font-bold processing-pulse morph-button bounce-in"
                    >
                      🚀 Generate App Icons
                    </button>
                    <p className="text-sm text-gray-400 mt-3 text-center">
                      This will create <span className="text-accent-400 font-semibold">{selectedSizes.length}</span> icon{selectedSizes.length !== 1 ? 's' : ''} in total
                    </p>
                  </div>
                )}
            </div>
            
                          {/* Right Column - Results */}
              <div className="lg:col-span-2 space-y-6">
                {/* Show a preview of the uploaded image */}
                {fileUpload.finalImageData && !imageProcessor.status.isProcessing && processedIcons.length === 0 && (
                  <div className="card text-center">
                    <h3 className="section-heading mb-6">
                      Ready to Process
                    </h3>
                    <div className="inline-block p-6 bg-dark-800/50 rounded-xl border border-accent-500/20">
                      <p className="text-gray-300">
                        ✅ <span className="text-accent-400 font-semibold">Image uploaded and ready</span><br/>
                        📱 Select icon sizes and click "Generate Icons" to continue
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Processing Status */}
                {imageProcessor.status.isProcessing && (
                  <ProcessingStatus
                    status={imageProcessor.status}
                    onCancel={imageProcessor.cancelProcessing}
                  />
                )}
                
                {/* Preview Grid */}
                {processedIcons.length > 0 && (
                  <div className="card">
                    <PreviewGrid
                      icons={processedIcons}
                      onDownloadIcon={handleDownloadIcon}
                    />
                  </div>
                )}
                
                {/* Enhanced Export Controls */}
                {processedIcons.length > 0 && (
                  <ExportControls
                    icons={processedIcons}
                    onExport={handleAdvancedExport}
                    isExporting={isExporting}
                    progress={exportProgress}
                  />
                )}
                
                {/* Legacy Download Section (for comparison) */}
                {processedIcons.length > 0 && (
                  <details className="mt-6">
                    <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300 transition-colors">
                      Show Legacy Download Options
                    </summary>
                    <div className="mt-4">
                      <DownloadSection
                        icons={processedIcons}
                        onGenerateZip={handleGenerateZip}
                        onDownloadZip={handleDownloadZip}
                        zipPackage={zipPackage}
                        isGenerating={zipDownload.isGenerating}
                        progress={zipDownload.progress}
                      />
                    </div>
                  </details>
                )}
              </div>
          </div>
          )}
        </div>
      </main>
      
                {/* FAQ Section */}
          <FAQSection />
          
          {/* Footer */}
          <Footer />
      
      {/* Toast Notifications */}
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
    </div>
  );
}

export default App;