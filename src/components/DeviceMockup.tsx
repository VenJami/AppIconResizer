import type { ProcessedIcon } from '../types';

interface DeviceMockupProps {
  icon: ProcessedIcon;
  className?: string;
}

export function DeviceMockup({ icon, className = '' }: DeviceMockupProps) {
  const { size, dataUrl, platform } = icon;
  
  // iPhone mockup for iOS icons
  if (platform === 'iOS') {
    return (
      <div className={`relative ${className}`}>
        <div className="bg-gray-900 rounded-[2.5rem] p-2 shadow-xl">
          <div className="bg-black rounded-[2rem] relative overflow-hidden">
            {/* Screen */}
            <div className="bg-gray-100 aspect-[9/19.5] relative">
              {/* Status bar */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-white flex items-center justify-between px-6 text-black text-sm font-medium">
                <span>9:41</span>
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-black rounded-full" />
                    <div className="w-1 h-1 bg-black rounded-full" />
                    <div className="w-1 h-1 bg-black rounded-full" />
                  </div>
                  <div className="ml-2 w-6 h-3 border border-black rounded-sm">
                    <div className="w-4 h-1.5 bg-black rounded-sm m-0.5" />
                  </div>
                </div>
              </div>
              
              {/* Home screen with icon */}
              <div className="absolute top-16 left-0 right-0 bottom-0 p-6">
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div 
                      className="w-14 h-14 rounded-xl shadow-sm overflow-hidden bg-white"
                      style={{ 
                        backgroundImage: `url(${dataUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    <span className="text-xs text-black font-medium leading-none">
                      App
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full" />
          </div>
        </div>
        
        <div className="text-center mt-3">
          <p className="text-sm font-medium text-gray-900">{size.name}</p>
          <p className="text-xs text-gray-500">{size.width}×{size.height}px</p>
        </div>
      </div>
    );
  }
  
  // Android phone mockup for Android icons
  return (
    <div className={`relative ${className}`}>
      <div className="bg-gray-800 rounded-[2rem] p-2 shadow-xl">
        <div className="bg-black rounded-[1.5rem] relative overflow-hidden">
          {/* Screen */}
          <div className="bg-gray-100 aspect-[9/16] relative">
            {/* Status bar */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-white flex items-center justify-between px-4 text-black text-xs">
              <span>9:41</span>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-black rounded-full" />
                  <div className="w-1 h-1 bg-black rounded-full" />
                  <div className="w-1 h-1 bg-black rounded-full" />
                </div>
                <div className="w-4 h-2 border border-black rounded-sm">
                  <div className="w-3 h-1 bg-black rounded-sm m-0.5" />
                </div>
              </div>
            </div>
            
            {/* Home screen with icon */}
            <div className="absolute top-12 left-0 right-0 bottom-0 p-4">
              <div className="grid grid-cols-4 gap-3">
                <div className="flex flex-col items-center space-y-2">
                  <div 
                    className="w-12 h-12 rounded-xl shadow-sm overflow-hidden bg-white"
                    style={{ 
                      backgroundImage: `url(${dataUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <span className="text-xs text-black font-medium leading-none">
                    App
                  </span>
                </div>
              </div>
            </div>
            
            {/* Navigation bar */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-white flex items-center justify-center space-x-8">
              <div className="w-6 h-1 bg-gray-800 rounded-full" />
              <div className="w-6 h-6 border-2 border-gray-800 rounded-sm" />
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-gray-800" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-3">
        <p className="text-sm font-medium text-gray-900">{size.name}</p>
        <p className="text-xs text-gray-500">{size.width}×{size.height}px</p>
      </div>
    </div>
  );
}