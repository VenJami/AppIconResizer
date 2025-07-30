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
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
    
    if (status.progress === 100) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    
    if (status.isProcessing) {
      return <Loader2 className="h-5 w-5 text-primary-500 animate-spin" />;
    }
    
    return <AlertCircle className="h-5 w-5 text-yellow-500" />;
  };
  
  const getStatusColor = () => {
    if (status.error) return 'bg-red-50 border-red-200';
    if (status.progress === 100) return 'bg-green-50 border-green-200';
    if (status.isProcessing) return 'bg-primary-50 border-primary-200';
    return 'bg-yellow-50 border-yellow-200';
  };
  
  const getTextColor = () => {
    if (status.error) return 'text-red-700';
    if (status.progress === 100) return 'text-green-700';
    if (status.isProcessing) return 'text-primary-700';
    return 'text-yellow-700';
  };
  
  return (
    <div className={`rounded-lg border p-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          
          <div className="flex-1">
            <p className={`font-medium ${getTextColor()}`}>
              {status.error ? 'Processing Failed' : status.currentStep}
            </p>
            
            {status.error && (
              <p className="text-sm text-red-600 mt-1">{status.error}</p>
            )}
            
            {status.isProcessing && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(status.progress)}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${status.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {status.isProcessing && onCancel && (
          <button
            onClick={onCancel}
            className="ml-4 px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}