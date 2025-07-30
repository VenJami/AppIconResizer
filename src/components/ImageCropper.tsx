import { useRef, useEffect, useState, useCallback } from 'react';
import type { CropArea } from '../types';
import { Crop, RotateCcw, Check } from 'lucide-react';

interface ImageCropperProps {
  image: HTMLImageElement;
  onCropChange: (cropArea: CropArea) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ImageCropper({ image, onCropChange, onConfirm, onCancel }: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, size: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

  // Calculate initial crop area (centered square)
  useEffect(() => {
    const maxSize = 600; // Maximum canvas size
    const aspectRatio = image.width / image.height;
    
    let canvasWidth, canvasHeight;
    if (aspectRatio > 1) {
      canvasWidth = Math.min(maxSize, image.width);
      canvasHeight = canvasWidth / aspectRatio;
    } else {
      canvasHeight = Math.min(maxSize, image.height);
      canvasWidth = canvasHeight * aspectRatio;
    }
    
    setCanvasDimensions({ width: canvasWidth, height: canvasHeight });
    
    // Calculate the largest square that fits in the image
    const maxSquareSize = Math.min(image.width, image.height);
    const cropSize = maxSquareSize;
    const cropX = (image.width - cropSize) / 2;
    const cropY = (image.height - cropSize) / 2;
    
    const initialCrop = { x: cropX, y: cropY, size: cropSize };
    setCropArea(initialCrop);
    onCropChange(initialCrop);
  }, [image, onCropChange]);

  // Draw the image and crop overlay
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d')!;
    const { width: canvasWidth, height: canvasHeight } = canvasDimensions;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw image
    ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
    
    // Calculate crop area on canvas
    const scaleX = canvasWidth / image.width;
    const scaleY = canvasHeight / image.height;
    const canvasCropX = cropArea.x * scaleX;
    const canvasCropY = cropArea.y * scaleY;
    const canvasCropSize = cropArea.size * Math.min(scaleX, scaleY);
    
    // Draw overlay (darken everything except crop area)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Clear the crop area (remove dark overlay)
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillRect(canvasCropX, canvasCropY, canvasCropSize, canvasCropSize);
    
    // Draw crop border
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.strokeRect(canvasCropX, canvasCropY, canvasCropSize, canvasCropSize);
    
    // Draw corner handles
    const handleSize = 12;
    const handleOffset = handleSize / 2;
    
    ctx.fillStyle = '#3b82f6';
    // Top-left
    ctx.fillRect(canvasCropX - handleOffset, canvasCropY - handleOffset, handleSize, handleSize);
    // Top-right
    ctx.fillRect(canvasCropX + canvasCropSize - handleOffset, canvasCropY - handleOffset, handleSize, handleSize);
    // Bottom-left
    ctx.fillRect(canvasCropX - handleOffset, canvasCropY + canvasCropSize - handleOffset, handleSize, handleSize);
    // Bottom-right
    ctx.fillRect(canvasCropX + canvasCropSize - handleOffset, canvasCropY + canvasCropSize - handleOffset, handleSize, handleSize);
  }, [image, cropArea, canvasDimensions]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDragging(true);
    setDragStart({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const deltaX = x - dragStart.x;
    const deltaY = y - dragStart.y;
    
    // Convert canvas coordinates to image coordinates
    const scaleX = image.width / canvasDimensions.width;
    const scaleY = image.height / canvasDimensions.height;
    
    const newCropX = Math.max(0, Math.min(image.width - cropArea.size, cropArea.x + deltaX * scaleX));
    const newCropY = Math.max(0, Math.min(image.height - cropArea.size, cropArea.y + deltaY * scaleY));
    
    const newCropArea = { ...cropArea, x: newCropX, y: newCropY };
    setCropArea(newCropArea);
    onCropChange(newCropArea);
    
    setDragStart({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetCrop = () => {
    const maxSquareSize = Math.min(image.width, image.height);
    const cropSize = maxSquareSize;
    const cropX = (image.width - cropSize) / 2;
    const cropY = (image.height - cropSize) / 2;
    
    const resetCropArea = { x: cropX, y: cropY, size: cropSize };
    setCropArea(resetCropArea);
    onCropChange(resetCropArea);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Crop className="h-5 w-5 text-primary-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Crop Your Image
          </h3>
        </div>
        
        <button
          onClick={resetCrop}
          className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset</span>
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Drag the crop area to select the square portion of your image that will be used for the icons.
      </p>
      
      <div className="flex justify-center mb-6">
        <canvas
          ref={canvasRef}
          width={canvasDimensions.width}
          height={canvasDimensions.height}
          className="border border-gray-300 rounded-lg cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <span className="text-gray-500">Original Size:</span>
            <span className="ml-2 font-medium">{image.width}×{image.height}px</span>
          </div>
          <div>
            <span className="text-gray-500">Crop Size:</span>
            <span className="ml-2 font-medium">{Math.round(cropArea.size)}×{Math.round(cropArea.size)}px</span>
          </div>
        </div>
        
        {/* Preview of cropped area at different sizes */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Preview at different icon sizes:</h4>
          <div className="flex items-center space-x-4">
            {[192, 120, 60, 32].map(size => (
              <div key={size} className="text-center">
                <div 
                  className="border border-gray-300 rounded bg-white mx-auto mb-1"
                  style={{ width: size / 4, height: size / 4 }}
                >
                  <canvas
                    width={size / 4}
                    height={size / 4}
                    className="rounded"
                    ref={canvas => {
                      if (canvas && cropArea.size > 0) {
                        const ctx = canvas.getContext('2d')!;
                        ctx.clearRect(0, 0, size / 4, size / 4);
                        
                        // Calculate source crop area
                        const sourceX = cropArea.x;
                        const sourceY = cropArea.y;
                        const sourceSize = cropArea.size;
                        
                        // Draw cropped area
                        try {
                          ctx.drawImage(
                            image,
                            sourceX, sourceY, sourceSize, sourceSize,
                            0, 0, size / 4, size / 4
                          );
                        } catch (e) {
                          // Ignore drawing errors during initialization
                        }
                      }
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500">{size}px</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="btn-primary flex items-center space-x-2"
        >
          <Check className="h-4 w-4" />
          <span>Use This Crop</span>
        </button>
      </div>
    </div>
  );
} 