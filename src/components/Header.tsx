import { Github, Heart, Linkedin, Mail, Menu, X, Smartphone, Tablet, Watch, FileText, HelpCircle, Settings } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Icon Sizes',
      href: '/icon-sizes',
      icon: Smartphone,
      description: 'Complete guide to iOS, Android & Watch icon sizes'
    },
    {
      name: 'How It Works',
      href: '/how-it-works',
      icon: Settings,
      description: 'Step-by-step guide to app icon resizing'
    },
    {
      name: 'File Formats',
      href: '/file-formats',
      icon: FileText,
      description: 'Supported formats and best practices'
    },
    {
      name: 'FAQ',
      href: '/faq',
      icon: HelpCircle,
      description: 'Frequently asked questions'
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-dark-950/95 to-dark-900/95 backdrop-blur-xl border-b border-dark-600/30 shadow-2xl shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
                     {/* Logo and Title */}
           <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                            <div className="relative group">
                 <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl shadow-lg shadow-accent-500/25 overflow-hidden transition-transform duration-300 group-hover:scale-110">
                   <img 
                     src="/logo.png" 
                     alt="App Icon Resizer - Free iOS and Android Icon Generator Tool" 
                     className="h-11 w-11 object-cover rounded-lg"
                   />
                 </div>
                 <div className="absolute -inset-1 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl blur opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-300"></div>
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
           </Link>
          
                     {/* Desktop Navigation */}
           <nav className="hidden lg:flex items-center space-x-8">
             {navigationItems.map((item) => (
               <Link
                 key={item.name}
                 to={item.href}
                 className={`group relative transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-dark-800/50 ${
                   location.pathname === item.href 
                     ? 'text-white bg-dark-800/50' 
                     : 'text-gray-300 hover:text-white'
                 }`}
               >
                 <div className="flex items-center space-x-2">
                   <item.icon className="h-4 w-4" />
                   <span>{item.name}</span>
                 </div>
                 {/* Tooltip */}
                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-dark-800 text-gray-300 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                   {item.description}
                   <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-dark-800"></div>
                 </div>
               </Link>
             ))}
             
             <Link 
               to="/" 
               className="btn-primary text-sm px-4 py-2"
             >
               Get Started
             </Link>
           </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white hover:bg-dark-800 rounded-lg transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
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
        </div>

                 {/* Mobile Navigation Menu */}
         {isMobileMenuOpen && (
           <div className="lg:hidden border-t border-dark-700/50 bg-dark-950/95 backdrop-blur-lg">
             <div className="px-4 py-6 space-y-4">
               {navigationItems.map((item) => (
                 <Link
                   key={item.name}
                   to={item.href}
                   className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                     location.pathname === item.href 
                       ? 'text-white bg-dark-800' 
                       : 'text-gray-300 hover:text-white hover:bg-dark-800'
                   }`}
                   onClick={() => setIsMobileMenuOpen(false)}
                 >
                   <item.icon className="h-5 w-5 text-accent-400" />
                   <div>
                     <div className="font-medium">{item.name}</div>
                     <div className="text-sm text-gray-500">{item.description}</div>
                   </div>
                 </Link>
               ))}
               
               <Link 
                 to="/" 
                 className="btn-primary w-full text-center py-3"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 Get Started
               </Link>
             </div>
           </div>
         )}
      </div>
    </header>
  );
}