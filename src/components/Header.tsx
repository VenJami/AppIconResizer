import { Zap, Github, Heart } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                App Icon Resizer
              </h1>
              <p className="text-xs text-gray-500">
                Free • Client-side • Privacy-focused
              </p>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/VenJami/AppIconResizer"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="View source on GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for developers</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}