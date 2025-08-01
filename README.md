# 🎯 App Icon Resizer

> Convert your high-quality logo into all required iOS and Android app icon sizes instantly. No signup required, completely free, and privacy-focused.

![App Icon Resizer](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7-purple?style=flat-square&logo=vite)

## ✨ Features

- 📱 **Multi-Platform Support**: Generate icons for iOS (8 sizes) and Android (6 sizes)
- ✂️ **Smart Image Cropping**: Upload any size image with interactive cropping tool
- 🎨 **Advanced Customization**: Padding control and background color picker
- 👀 **Device Mockup Previews**: See how your icons look on real devices
- ⚡ **Web Worker Processing**: Non-blocking image processing for smooth UX
- 📦 **Organized Downloads**: ZIP packages with platform-specific folders
- 🔒 **Privacy-First**: All processing happens in your browser
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- ♿ **Accessible**: Built with accessibility best practices

## 🚀 Live Demo

Visit the live application: appiconresizer.com

## 🎯 Use Cases

- **Mobile App Developers**: Generate all required icon sizes for app store submissions
- **UI/UX Designers**: Create consistent icon sets across platforms
- **Development Agencies**: Streamline client app icon delivery
- **Freelancers**: Professional icon generation for client projects

## 📱 Supported Icon Sizes

### iOS (8 sizes)
- 1024×1024px - App Store icon (required)
- 180×180px - iPhone Retina home screen
- 167×167px - iPad Pro home screen
- 152×152px - iPad Retina home screen
- 120×120px - iPhone Spotlight
- 87×87px - iPad Spotlight
- 80×80px - iPad App Settings
- 60×60px - iPhone App Settings

### Android (6 sizes)
- 512×512px - Google Play Store icon
- 192×192px - XXXHDPI launcher icon
- 144×144px - XXHDPI launcher
- 96×96px - XHDPI devices
- 72×72px - HDPI devices
- 48×48px - MDPI legacy fallback

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3.4
- **Image Processing**: Canvas API + Web Workers
- **File Handling**: JSZip for package generation
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🏗️ Architecture Highlights

- **Clean Component Architecture**: Modular, reusable components
- **Custom React Hooks**: `useFileUpload`, `useImageProcessor`, `useZipDownload`
- **TypeScript Interfaces**: Full type safety throughout the application
- **Web Workers**: Image processing in background threads
- **Responsive Design**: Mobile-first Tailwind CSS implementation

## 🔧 Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/VenJami/AppIconResizer.git
cd AppIconResizer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
src/
├── components/          # React components
│   ├── FileUpload.tsx      # Drag-and-drop file upload
│   ├── PlatformSelector.tsx # iOS/Android selection
│   ├── DeviceMockup.tsx    # Device preview frames
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useFileUpload.ts    # File handling logic
│   ├── useImageProcessor.ts # Web Worker integration
│   └── useZipDownload.ts   # ZIP generation
├── types/              # TypeScript interfaces
├── utils/              # Utility functions and constants
├── workers/            # Web Worker for image processing
└── App.tsx            # Main application component
```

## 🎨 Key Features Deep Dive

### Image Processing
- Interactive image cropping for non-square images
- High-quality Canvas API resizing with Lanczos-like interpolation
- iOS-specific processing (automatic opaque App Store icons)
- Web Worker implementation for non-blocking performance
- Support for multiple image formats (PNG, JPG, JPEG)

### User Experience
- Drag-and-drop file upload with validation
- Real-time platform switching and customization
- Device mockup previews for visual feedback
- Progress tracking for all operations

### Privacy & Security
- 100% client-side processing
- No file uploads to servers
- No data collection or tracking
- Automatic temporary file cleanup

## 📄 Requirements

- **Input**: PNG, JPG, JPEG files
- **Size**: Any size (minimum 200×200 pixels)
- **File Size**: Maximum 10MB
- **Quality**: High-resolution images recommended
- **Auto-Cropping**: Non-square images will show an interactive cropping tool

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with modern React patterns and TypeScript
- Designed for developer productivity and user privacy
- Inspired by the need for better app icon generation tools

---

**Made with ❤️ for the developer community**
