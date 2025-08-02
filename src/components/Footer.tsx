import { Github, Linkedin, Mail, Heart, MessageCircle, Star } from 'lucide-react';

export function Footer() {
  const handleFeedback = () => {
    // Open email client with feedback template
    const subject = encodeURIComponent('App Icon Resizer - Feedback');
    const body = encodeURIComponent(`Hi Raven,

I just used your App Icon Resizer and wanted to share my feedback:

What I liked:
- 

What could be improved:
- 

Overall rating: ⭐⭐⭐⭐⭐

Keep up the great work!

Best regards,
[Your name]`);
    
    window.open(`mailto:jaminalraven@gmail.com?subject=${subject}&body=${body}`);
  };

  return (
    <footer className="bg-dark-900 border-t border-dark-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg shadow-lg shadow-accent-500/25 overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="App Icon Resizer - Free iOS and Android Icon Generator Tool" 
                  className="h-9 w-9 object-cover rounded-md"
                />
              </div>
              <h3 className="text-xl font-bold text-white">App Icon Resizer</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform your logos into perfect app icons with style. Built with modern web technologies and a focus on user experience.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>by Raven Jaminal</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/icon-sizes" className="text-gray-400 hover:text-accent-400 transition-colors duration-200">
                  Icon Sizes
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="text-gray-400 hover:text-accent-400 transition-colors duration-200">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/file-formats" className="text-gray-400 hover:text-accent-400 transition-colors duration-200">
                  File Formats
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-accent-400 transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="https://github.com/VenJami/AppIconResizer" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-400 transition-colors duration-200">
                  View Source
                </a>
              </li>
              <li>
                <button 
                  onClick={handleFeedback}
                  className="text-gray-400 hover:text-accent-400 transition-colors duration-200 flex items-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Leave Feedback</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <a href="mailto:jaminalraven@gmail.com" className="text-gray-400 hover:text-accent-400 transition-colors duration-200 text-sm">
                  jaminalraven@gmail.com
                </a>
              </div>
              
              {/* Social Buttons */}
              <div className="flex items-center space-x-3 pt-2">
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
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-12 pt-8 border-t border-dark-700">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm">Enjoying the app?</span>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Your feedback helps me improve App Icon Resizer and create better tools for developers. 
              I'd love to hear about your experience!
            </p>
            <button
              onClick={handleFeedback}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Share Your Feedback</span>
            </button>
          </div>
        </div>

        {/* External Resources */}
        <div className="mt-8 pt-6 border-t border-dark-700">
          <div className="text-center space-y-4">
            <h5 className="text-sm font-medium text-gray-400">Developer Resources</h5>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <a 
                href="https://developer.apple.com/design/human-interface-guidelines/app-icons" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-accent-400 transition-colors"
              >
                Apple Icon Guidelines
              </a>
              <a 
                href="https://developer.android.com/guide/practices/ui_guidelines/icon_design" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-accent-400 transition-colors"
              >
                Android Icon Guidelines
              </a>
              <a 
                href="https://www.w3.org/TR/appmanifest/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-accent-400 transition-colors"
              >
                Web App Manifest
              </a>
              <a 
                href="https://developer.mozilla.org/en-US/docs/Web/Manifest" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-accent-400 transition-colors"
              >
                MDN Web Manifest
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-dark-700 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Raven Jaminal. All rights reserved. App Icon Resizer is open source and available under the MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
} 