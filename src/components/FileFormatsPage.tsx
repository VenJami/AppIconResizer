import React from 'react';
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Download, Image, FileImage, FileCode, Zap } from 'lucide-react';

const supportedFormats = [
  {
    format: "PNG",
    icon: FileImage,
    description: "Portable Network Graphics",
    advantages: [
      "Lossless compression",
      "Transparency support",
      "Best quality for icons",
      "Widely supported"
    ],
    bestFor: "App icons, logos with transparency",
    recommendation: "Highly recommended"
  },
  {
    format: "SVG",
    icon: FileCode,
    description: "Scalable Vector Graphics",
    advantages: [
      "Infinitely scalable",
      "Small file size",
      "Perfect for logos",
      "Vector-based"
    ],
    bestFor: "Vector logos, scalable graphics",
    recommendation: "Excellent for vector graphics"
  },
  {
    format: "JPG/JPEG",
    icon: Image,
    description: "Joint Photographic Experts Group",
    advantages: [
      "Small file size",
      "Good compression",
      "Widely supported",
      "Fast loading"
    ],
    bestFor: "Photographic content, complex images",
    recommendation: "Good for photos, not ideal for icons"
  },
  {
    format: "WebP",
    icon: FileImage,
    description: "Web Picture Format",
    advantages: [
      "Modern compression",
      "Smaller than PNG/JPG",
      "Transparency support",
      "Web optimized"
    ],
    bestFor: "Web applications, modern browsers",
    recommendation: "Great for web use"
  },
  {
    format: "GIF",
    icon: FileImage,
    description: "Graphics Interchange Format",
    advantages: [
      "Animation support",
      "Transparency support",
      "Widely supported",
      "Simple animations"
    ],
    bestFor: "Animated icons, simple graphics",
    recommendation: "Good for animated content"
  }
];

const exportFormats = [
  {
    format: "PNG",
    description: "Best quality with transparency support",
    useCase: "App store submissions, high-quality icons",
    quality: "Lossless"
  },
  {
    format: "JPEG",
    description: "Good compression for web use",
    useCase: "Web applications, faster loading",
    quality: "Lossy (adjustable)"
  },
  {
    format: "WebP",
    description: "Modern format with excellent compression",
    useCase: "Modern web applications",
    quality: "Lossy/Lossless"
  },
  {
    format: "AVIF",
    description: "Next-generation image format",
    useCase: "Future-proof applications",
    quality: "Lossy/Lossless"
  }
];

const requirements = [
  {
    title: "Image Resolution",
    description: "Use high-resolution images for best results",
    details: [
      "Minimum: 512×512 pixels",
      "Recommended: 1024×1024 pixels",
      "Maximum: No limit (10MB file size)"
    ]
  },
  {
    title: "File Size",
    description: "Keep files under 10MB for optimal processing",
    details: [
      "Maximum upload: 10MB",
      "Recommended: Under 5MB",
      "Larger files may take longer to process"
    ]
  },
  {
    title: "Aspect Ratio",
    description: "Square images work best for app icons",
    details: [
      "1:1 aspect ratio recommended",
      "Non-square images will be centered",
      "Padding can be added automatically"
    ]
  },
  {
    title: "Color Space",
    description: "RGB color space is standard for digital icons",
    details: [
      "RGB color space",
      "sRGB profile recommended",
      "Avoid CMYK for digital use"
    ]
  }
];

export function FileFormatsPage() {
  return (
    <div className="min-h-screen bg-dark-950 pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-dark-900 to-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <ArrowLeft 
                className="h-6 w-6 text-gray-400 mr-4 cursor-pointer hover:text-white transition-colors"
                onClick={() => window.history.back()}
              />
              <h1 className="text-4xl font-bold text-white">
                Supported File Formats
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              App Icon Resizer supports multiple image formats including PNG, JPG, JPEG, SVG, WebP, and GIF. 
              For best results, we recommend using PNG or SVG files with a 1024×1024px resolution.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-accent-500/20 text-accent-400 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span>6 Formats Supported</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full">
                <FileText className="h-4 w-4" />
                <span>Automatic Conversion</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full">
                <Zap className="h-4 w-4" />
                <span>Instant Processing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Input Formats We Support
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Upload your image in any of these formats and we'll handle the conversion automatically
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportedFormats.map((format, index) => (
              <div key={index} className="card-glass border border-dark-600 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-accent-500/25">
                    <format.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{format.format}</h3>
                    <p className="text-gray-400 text-sm">{format.description}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-accent-400 font-medium text-sm mb-2">{format.recommendation}</div>
                  <div className="text-gray-300 text-sm mb-3">{format.bestFor}</div>
                </div>

                <div className="space-y-2">
                  <div className="text-gray-400 text-sm font-medium">Advantages:</div>
                  {format.advantages.map((advantage, advIndex) => (
                    <div key={advIndex} className="flex items-center space-x-2 text-sm text-gray-300">
                      <CheckCircle className="h-3 w-3 text-accent-400 flex-shrink-0" />
                      <span>{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Formats */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Export Format Options
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose from multiple export formats to suit your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {exportFormats.map((format, index) => (
              <div key={index} className="card-glass border border-dark-600 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{format.format}</h3>
                  <div className="text-accent-400 font-medium">{format.quality}</div>
                </div>
                <p className="text-gray-300 mb-4">{format.description}</p>
                <div className="space-y-2">
                  <div className="text-gray-400 text-sm font-medium">Best for:</div>
                  <div className="text-gray-300 text-sm">{format.useCase}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Image Requirements & Best Practices
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Follow these guidelines for optimal results and best quality output
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {requirements.map((req, index) => (
              <div key={index} className="card-glass border border-dark-600 p-6">
                <h3 className="text-xl font-bold text-white mb-3">{req.title}</h3>
                <p className="text-gray-300 mb-4">{req.description}</p>
                <div className="space-y-2">
                  {req.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-400">
                      <CheckCircle className="h-4 w-4 text-accent-400 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pro Tips for Best Results
            </h2>
            <p className="text-xl text-gray-400">
              Expert advice for creating perfect app icons
            </p>
          </div>

          <div className="space-y-6">
            <div className="card-glass border border-dark-600 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Choose the Right Format</h3>
                  <p className="text-gray-300 mb-3">
                    PNG is ideal for app icons due to its lossless compression and transparency support. 
                    SVG is perfect for vector logos that need to scale perfectly.
                  </p>
                  <div className="text-sm text-gray-400">
                    <strong>Recommendation:</strong> Use PNG for raster images, SVG for vector graphics
                  </div>
                </div>
              </div>
            </div>

            <div className="card-glass border border-dark-600 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Image className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Optimize Your Source Image</h3>
                  <p className="text-gray-300 mb-3">
                    Start with a high-resolution square image. The better your source, the better your results. 
                    Ensure your logo has adequate padding and is centered.
                  </p>
                  <div className="text-sm text-gray-400">
                    <strong>Best Practice:</strong> 1024×1024 pixels with 10% padding around your logo
                  </div>
                </div>
              </div>
            </div>

            <div className="card-glass border border-dark-600 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Common Mistakes to Avoid</h3>
                  <p className="text-gray-300 mb-3">
                    Don't use low-resolution images, avoid complex backgrounds, and ensure your icon 
                    is recognizable at small sizes.
                  </p>
                  <div className="text-sm text-gray-400">
                    <strong>Warning:</strong> Images under 512×512 pixels may result in poor quality at larger sizes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Convert Your Images?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Upload your image in any supported format and get all required app icon sizes instantly. 
            Our tool automatically handles format conversion and optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/#upload-section"
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Start Converting Now</span>
            </a>
            <a 
              href="/how-it-works"
              className="btn-outline flex items-center justify-center space-x-2"
            >
              <FileText className="h-5 w-5" />
              <span>Learn How It Works</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 