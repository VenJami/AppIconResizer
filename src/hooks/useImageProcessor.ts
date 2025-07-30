import { useState, useCallback, useRef } from 'react';
import type { ProcessedIcon, ProcessingOptions, ProcessingStatus, IconSize } from '../types';

interface UseImageProcessorReturn {
  processImage: (
    imageData: ImageData,
    sizes: IconSize[],
    options: ProcessingOptions,
    platform: 'iOS' | 'Android'
  ) => Promise<ProcessedIcon[]>;
  status: ProcessingStatus;
  cancelProcessing: () => void;
}

export function useImageProcessor(): UseImageProcessorReturn {
  const [status, setStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    currentStep: '',
    progress: 0
  });
  
  const workerRef = useRef<Worker | null>(null);
  
  const cancelProcessing = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    setStatus({
      isProcessing: false,
      currentStep: 'Cancelled',
      progress: 0
    });
  }, []);
  
  const processImage = useCallback(async (
    imageData: ImageData,
    sizes: IconSize[],
    options: ProcessingOptions,
    platform: 'iOS' | 'Android'
  ): Promise<ProcessedIcon[]> => {
    return new Promise((resolve, reject) => {
      // Clean up any existing worker
      if (workerRef.current) {
        workerRef.current.terminate();
      }
      
      // Create new worker
      workerRef.current = new Worker(
        new URL('../workers/imageProcessor.worker.ts', import.meta.url),
        { type: 'module' }
      );
      
      setStatus({
        isProcessing: true,
        currentStep: 'Initializing...',
        progress: 0
      });
      
      workerRef.current.onmessage = (event) => {
        const { type, payload } = event.data;
        
        switch (type) {
          case 'PROGRESS':
            setStatus(prev => ({
              ...prev,
              currentStep: payload.currentStep || prev.currentStep,
              progress: payload.progress || prev.progress
            }));
            break;
            
          case 'COMPLETE':
            setStatus({
              isProcessing: false,
              currentStep: 'Complete',
              progress: 100
            });
            resolve(payload.processedIcons || []);
            workerRef.current?.terminate();
            workerRef.current = null;
            break;
            
          case 'ERROR':
            setStatus({
              isProcessing: false,
              currentStep: 'Error',
              progress: 0,
              error: payload.error
            });
            reject(new Error(payload.error || 'Processing failed'));
            workerRef.current?.terminate();
            workerRef.current = null;
            break;
        }
      };
      
      workerRef.current.onerror = (error) => {
        setStatus({
          isProcessing: false,
          currentStep: 'Error',
          progress: 0,
          error: 'Worker error occurred'
        });
        reject(error);
        workerRef.current?.terminate();
        workerRef.current = null;
      };
      
      // Send processing request
      workerRef.current.postMessage({
        type: 'PROCESS_IMAGE',
        payload: {
          imageData,
          sizes,
          options,
          platform
        }
      });
    });
  }, []);
  
  return {
    processImage,
    status,
    cancelProcessing
  };
}