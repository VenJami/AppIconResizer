# 🎯 App Icon Resizer

> Convert your high-quality logo into all required iOS and Android app icon sizes instantly. No signup required, completely free, and privacy-focused.

![App Icon Resizer](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7-purple?style=flat-square&logo=vite)

## ✨ Features

- 📱 **Multi-Platform Support**: Generate icons for iOS (18 sizes), Android (13 sizes), Apple Watch (8 sizes), and Smart Watch (6 sizes)
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

### iOS (18 sizes)
- 1024×1024px - App Store Marketing (required)
- 180×180px - iPhone App Icon (@3x)
- 120×120px - iPhone App Icon (@2x)
- 120×120px - iPhone Spotlight (@3x)
- 80×80px - iPhone Spotlight (@2x)
- 87×87px - iPhone Settings (@3x)
- 58×58px - iPhone Settings (@2x)
- 60×60px - iPhone Notification (@3x)
- 40×40px - iPhone Notification (@2x)
- 152×152px - iPad App Icon (@2x)
- 76×76px - iPad App Icon (@1x)
- 167×167px - iPad Pro App Icon (@2x)
- 80×80px - iPad Spotlight (@2x)
- 40×40px - iPad Spotlight (@1x)
- 58×58px - iPad Settings (@2x)
- 29×29px - iPad Settings (@1x)
- 40×40px - iPad Notification (@2x)
- 20×20px - iPad Notification (@1x)

### Android (13 sizes)
- 512×512px - Play Store Icon
- 432×432px - Adaptive Icon Foreground
- 432×432px - Adaptive Icon Background
- 192×192px - XXXHDPI Launcher
- 144×144px - XXHDPI Launcher
- 96×96px - XHDPI Launcher
- 72×72px - HDPI Launcher
- 48×48px - MDPI Launcher
- 192×192px - XXXHDPI Round
- 144×144px - XXHDPI Round
- 96×96px - XHDPI Round
- 72×72px - HDPI Round
- 48×48px - MDPI Round

### Apple Watch (8 sizes)
- 1024×1024px - App Store Icon
- 172×172px - Home Screen (@2x)
- 88×88px - Home Screen (@2x, 38mm)
- 87×87px - Home Screen (@2x, 42mm)
- 80×80px - Home Screen (@2x, 40mm)
- 92×92px - Home Screen (@2x, 44mm)
- 102×102px - Home Screen (@2x, 41mm)
- 120×120px - Home Screen (@2x, 45mm)

### Smart Watch (6 sizes)
- 512×512px - Play Store Icon
- 192×192px - Wear OS Launcher (@2x)
- 96×96px - Wear OS Launcher (@1x)
- 48×48px - Wear OS Launcher (@0.5x)
- 24×24px - Wear OS Launcher (@0.25x)
- 16×16px - Wear OS Launcher (@0.125x)

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
