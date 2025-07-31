import type { ProcessingStatus as Status } from '../types';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ProcessingStatusProps {
  status: Status;
  onCancel?: () => void;
}

export function ProcessingStatus({ status, onCancel }: ProcessingStatusProps) {
  if (!status.isProcessing && !status.error && status.progress === 0) {
    return null;
  }
  
  const getStatusIcon = () => {
    if (status.error) {
      return <XCircle className="h-6 w-6 text-red-400" />;
    }
    
    if (status.progress === 100) {
      return <CheckCircle className="h-6 w-6 text-accent-400" />;
    }
    
    if (status.isProcessing) {
      return (
        <div className="relative">
          <Loader2 className="h-6 w-6 text-accent-400 animate-spin" />
          <div className="absolute -inset-1 bg-accent-500/20 rounded-full blur animate-pulse" />
        </div>
      );
    }
    
    return <AlertCircle className="h-6 w-6 text-amber-400" />;
  };
  
  const getStatusColor = () => {
    if (status.error) return 'bg-red-500/10 border border-red-500/30';
    if (status.progress === 100) return 'bg-accent-500/10 border border-accent-500/30';
    if (status.isProcessing) return 'bg-accent-500/10 border border-accent-500/30 processing-pulse';
    return 'bg-amber-500/10 border border-amber-500/30';
  };
  
  const getTextColor = () => {
    if (status.error) return 'text-red-400';
    if (status.progress === 100) return 'text-accent-400';
    if (status.isProcessing) return 'text-accent-400';
    return 'text-amber-400';
  };
  
  return (
    <div className={`rounded-2xl p-6 ${getStatusColor()} backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {getStatusIcon()}
          
          <div className="flex-1">
            <p className={`font-semibold text-lg ${getTextColor()}`}>
              {status.error ? 'Processing Failed' : status.currentStep}
            </p>
            
            {status.error && (
              <p className="text-red-400 mt-2">{status.error}</p>
            )}
            
            {status.isProcessing && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-gray-300 mb-2">
                  <span className="font-medium">Progress</span>
                  <span className="text-accent-400 font-bold">{Math.round(status.progress)}%</span>
                </div>
                
                <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-accent-500 to-accent-400 h-3 rounded-full transition-all duration-500 ease-out relative"
                    style={{ width: `${status.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {status.isProcessing && onCancel && (
          <button
            onClick={onCancel}
            className="ml-6 px-4 py-2 text-sm font-semibold text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}