import { Github, Heart, Linkedin, Mail } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-lg border-b border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl shadow-lg shadow-accent-500/25 overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="App Icon Resizer Logo" 
                  className="h-11 w-11 object-cover rounded-lg"
                />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl blur opacity-30 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                <span className="text-gradient">App Icon</span> Resizer
              </h1>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span className="bg-accent-500/20 text-accent-400 px-2 py-1 rounded-full">Free</span>
                <span>•</span>
                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">Client-side</span>
                <span>•</span>
                <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">Privacy-focused</span>
              </div>
            </div>
          </div>
          
          {/* Navigation and Social */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200">Features</a>
              <a href="#upload-section" className="text-gray-300 hover:text-white transition-colors duration-200">Get Started</a>
            </nav>
            
            {/* Social Buttons */}
            <div className="flex items-center space-x-2">
              <a
                href="https://github.com/VenJami/AppIconResizer"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white hover:bg-dark-800 rounded-lg transition-all duration-200 group"
                aria-label="View source on GitHub"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              </a>
              
              <a
                href="https://linkedin.com/in/ravenjaminal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-dark-800 rounded-lg transition-all duration-200 group"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              </a>
              
              <a
                href="mailto:jaminalraven@gmail.com"
                className="p-2 text-gray-400 hover:text-accent-400 hover:bg-dark-800 rounded-lg transition-all duration-200 group"
                aria-label="Send email"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              </a>
            </div>
            
            <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-400 bg-dark-800/50 px-4 py-2 rounded-xl">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>by Raven</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}