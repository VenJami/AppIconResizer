import type { PlatformPreset } from '../types';

// iOS App Icon Sizes (2025 specifications)
export const iOS_SIZES: PlatformPreset = {
  name: 'iOS',
  sizes: [
    {
      width: 1024,
      height: 1024,
      name: 'App Store',
      description: 'App Store icon (required)',
      filename: 'AppIcon-AppStore-1024x1024.png'
    },
    {
      width: 180,
      height: 180,
      name: 'iPhone Retina',
      description: 'iPhone Retina home screen',
      filename: 'AppIcon-iPhone-180x180.png'
    },
    {
      width: 167,
      height: 167,
      name: 'iPad Pro',
      description: 'iPad Pro home screen',
      filename: 'AppIcon-iPadPro-167x167.png'
    },
    {
      width: 152,
      height: 152,
      name: 'iPad Retina',
      description: 'iPad Retina home screen',
      filename: 'AppIcon-iPad-152x152.png'
    },
    {
      width: 120,
      height: 120,
      name: 'iPhone Spotlight',
      description: 'iPhone Spotlight',
      filename: 'AppIcon-iPhone-Spotlight-120x120.png'
    },
    {
      width: 87,
      height: 87,
      name: 'iPad Spotlight',
      description: 'iPad Spotlight',
      filename: 'AppIcon-iPad-Spotlight-87x87.png'
    },
    {
      width: 80,
      height: 80,
      name: 'iPad Settings',
      description: 'iPad App Settings',
      filename: 'AppIcon-iPad-Settings-80x80.png'
    },
    {
      width: 60,
      height: 60,
      name: 'iPhone Settings',
      description: 'iPhone App Settings',
      filename: 'AppIcon-iPhone-Settings-60x60.png'
    }
  ]
};

// Android App Icon Sizes (2025 specifications)
export const ANDROID_SIZES: PlatformPreset = {
  name: 'Android',
  sizes: [
    {
      width: 512,
      height: 512,
      name: 'Play Store',
      description: 'Google Play Store icon',
      filename: 'ic_launcher-PlayStore-512x512.png'
    },
    {
      width: 192,
      height: 192,
      name: 'XXXHDPI',
      description: 'High-resolution launcher icon',
      filename: 'ic_launcher-xxxhdpi-192x192.png'
    },
    {
      width: 144,
      height: 144,
      name: 'XXHDPI',
      description: 'Medium-density launcher',
      filename: 'ic_launcher-xxhdpi-144x144.png'
    },
    {
      width: 96,
      height: 96,
      name: 'XHDPI',
      description: 'Low-density devices',
      filename: 'ic_launcher-xhdpi-96x96.png'
    },
    {
      width: 72,
      height: 72,
      name: 'HDPI',
      description: 'Extra-low-density devices',
      filename: 'ic_launcher-hdpi-72x72.png'
    },
    {
      width: 48,
      height: 48,
      name: 'MDPI',
      description: 'Legacy fallback size',
      filename: 'ic_launcher-mdpi-48x48.png'
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