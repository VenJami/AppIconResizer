import type { PlatformPreset } from '../types';

// iOS App Icon Sizes (Official Xcode Asset Catalog specifications)
export const iOS_SIZES: PlatformPreset = {
  name: 'iOS',
  sizes: [
    // App Store Marketing Icon
    {
      width: 1024,
      height: 1024,
      name: 'App Store Marketing',
      description: 'Required for App Store submission',
      filename: 'AppIcon-AppStore-1024x1024.png'
    },
    
    // iPhone App Icons (60×60 pt base)
    {
      width: 180,
      height: 180,
      name: 'iPhone App Icon (@3x)',
      description: 'iPhone home screen @3x',
      filename: 'AppIcon-iPhone-App-180x180.png'
    },
    {
      width: 120,
      height: 120,
      name: 'iPhone App Icon (@2x)',
      description: 'iPhone home screen @2x',
      filename: 'AppIcon-iPhone-App-120x120.png'
    },
    
    // iPhone Spotlight (40×40 pt base)
    {
      width: 120,
      height: 120,
      name: 'iPhone Spotlight (@3x)',
      description: 'iPhone Spotlight search @3x',
      filename: 'AppIcon-iPhone-Spotlight-120x120.png'
    },
    {
      width: 80,
      height: 80,
      name: 'iPhone Spotlight (@2x)',
      description: 'iPhone Spotlight search @2x',
      filename: 'AppIcon-iPhone-Spotlight-80x80.png'
    },
    
    // iPhone Settings (29×29 pt base)
    {
      width: 87,
      height: 87,
      name: 'iPhone Settings (@3x)',
      description: 'iPhone Settings app @3x',
      filename: 'AppIcon-iPhone-Settings-87x87.png'
    },
    {
      width: 58,
      height: 58,
      name: 'iPhone Settings (@2x)',
      description: 'iPhone Settings app @2x',
      filename: 'AppIcon-iPhone-Settings-58x58.png'
    },
    
    // iPhone Notifications (20×20 pt base)
    {
      width: 60,
      height: 60,
      name: 'iPhone Notification (@3x)',
      description: 'iPhone notifications @3x',
      filename: 'AppIcon-iPhone-Notification-60x60.png'
    },
    {
      width: 40,
      height: 40,
      name: 'iPhone Notification (@2x)',
      description: 'iPhone notifications @2x',
      filename: 'AppIcon-iPhone-Notification-40x40.png'
    },
    
    // iPad App Icons (76×76 pt base)
    {
      width: 152,
      height: 152,
      name: 'iPad App Icon (@2x)',
      description: 'iPad home screen @2x',
      filename: 'AppIcon-iPad-App-152x152.png'
    },
    {
      width: 76,
      height: 76,
      name: 'iPad App Icon (@1x)',
      description: 'iPad home screen @1x',
      filename: 'AppIcon-iPad-App-76x76.png'
    },
    
    // iPad Pro App Icon (83.5×83.5 pt base)
    {
      width: 167,
      height: 167,
      name: 'iPad Pro App Icon (@2x)',
      description: 'iPad Pro home screen @2x',
      filename: 'AppIcon-iPadPro-App-167x167.png'
    },
    
    // iPad Spotlight (40×40 pt base)
    {
      width: 80,
      height: 80,
      name: 'iPad Spotlight (@2x)',
      description: 'iPad Spotlight search @2x',
      filename: 'AppIcon-iPad-Spotlight-80x80.png'
    },
    {
      width: 40,
      height: 40,
      name: 'iPad Spotlight (@1x)',
      description: 'iPad Spotlight search @1x',
      filename: 'AppIcon-iPad-Spotlight-40x40.png'
    },
    
    // iPad Settings (29×29 pt base)
    {
      width: 58,
      height: 58,
      name: 'iPad Settings (@2x)',
      description: 'iPad Settings app @2x',
      filename: 'AppIcon-iPad-Settings-58x58.png'
    },
    {
      width: 29,
      height: 29,
      name: 'iPad Settings (@1x)',
      description: 'iPad Settings app @1x',
      filename: 'AppIcon-iPad-Settings-29x29.png'
    },
    
    // iPad Notifications (20×20 pt base)
    {
      width: 40,
      height: 40,
      name: 'iPad Notification (@2x)',
      description: 'iPad notifications @2x',
      filename: 'AppIcon-iPad-Notification-40x40.png'
    },
    {
      width: 20,
      height: 20,
      name: 'iPad Notification (@1x)',
      description: 'iPad notifications @1x',
      filename: 'AppIcon-iPad-Notification-20x20.png'
    }
  ]
};

// Android App Icon Sizes (Official Google specifications)
export const ANDROID_SIZES: PlatformPreset = {
  name: 'Android',
  sizes: [
    // Play Store High Resolution Icon
    {
      width: 512,
      height: 512,
      name: 'Play Store Icon',
      description: 'Required for Google Play Store (PNG, no alpha)',
      filename: 'ic_launcher-playstore-512x512.png'
    },
    
    // Adaptive Icon Components (Android 8.0+)
    {
      width: 432,
      height: 432,
      name: 'Adaptive Icon Foreground',
      description: 'Adaptive icon foreground layer (@4x)',
      filename: 'ic_launcher_foreground-432x432.png'
    },
    {
      width: 432,
      height: 432,
      name: 'Adaptive Icon Background',
      description: 'Adaptive icon background layer (@4x)',
      filename: 'ic_launcher_background-432x432.png'
    },
    
    // Legacy Launcher Icons (All Densities)
    {
      width: 192,
      height: 192,
      name: 'XXXHDPI Launcher',
      description: 'Legacy launcher icon (xxxhdpi/drawable-xxxhdpi)',
      filename: 'ic_launcher-xxxhdpi-192x192.png'
    },
    {
      width: 144,
      height: 144,
      name: 'XXHDPI Launcher',
      description: 'Legacy launcher icon (xxhdpi/drawable-xxhdpi)',
      filename: 'ic_launcher-xxhdpi-144x144.png'
    },
    {
      width: 96,
      height: 96,
      name: 'XHDPI Launcher',
      description: 'Legacy launcher icon (xhdpi/drawable-xhdpi)',
      filename: 'ic_launcher-xhdpi-96x96.png'
    },
    {
      width: 72,
      height: 72,
      name: 'HDPI Launcher',
      description: 'Legacy launcher icon (hdpi/drawable-hdpi)',
      filename: 'ic_launcher-hdpi-72x72.png'
    },
    {
      width: 48,
      height: 48,
      name: 'MDPI Launcher',
      description: 'Legacy launcher icon (mdpi/drawable-mdpi)',
      filename: 'ic_launcher-mdpi-48x48.png'
    },
    
    // Round Icons (Android 7.1+)
    {
      width: 192,
      height: 192,
      name: 'XXXHDPI Round',
      description: 'Round launcher icon (xxxhdpi)',
      filename: 'ic_launcher_round-xxxhdpi-192x192.png'
    },
    {
      width: 144,
      height: 144,
      name: 'XXHDPI Round',
      description: 'Round launcher icon (xxhdpi)',
      filename: 'ic_launcher_round-xxhdpi-144x144.png'
    },
    {
      width: 96,
      height: 96,
      name: 'XHDPI Round',
      description: 'Round launcher icon (xhdpi)',
      filename: 'ic_launcher_round-xhdpi-96x96.png'
    },
    {
      width: 72,
      height: 72,
      name: 'HDPI Round',
      description: 'Round launcher icon (hdpi)',
      filename: 'ic_launcher_round-hdpi-72x72.png'
    },
    {
      width: 48,
      height: 48,
      name: 'MDPI Round',
      description: 'Round launcher icon (mdpi)',
      filename: 'ic_launcher_round-mdpi-48x48.png'
    }
  ]
};

export const PLATFORM_PRESETS = {
  iOS: iOS_SIZES,
  Android: ANDROID_SIZES
};

// File validation constants
export const FILE_CONSTRAINTS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  MIN_SIZE: 200, // Minimum width/height for meaningful cropping
  ALLOWED_TYPES: ['image/png', 'image/jpeg', 'image/jpg'] as const,
  ALLOWED_EXTENSIONS: ['.png', '.jpg', '.jpeg'] as const
};

// Processing constants
export const PROCESSING_CONFIG = {
  QUALITY: 0.9,
  INTERPOLATION: 'lanczos3' as const,
  DEFAULT_PADDING: 0,
  DEFAULT_BACKGROUND: '#FFFFFF',
  CHUNK_SIZE: 4 // Process icons in chunks for better performance
};

// UI constants
export const UI_CONFIG = {
  ANIMATION_DURATION: 200,
  PREVIEW_GRID_COLS: {
    mobile: 2,
    tablet: 3,
    desktop: 4
  },
  MAX_PREVIEW_SIZE: 200
};