// Configuration utility for environment variables
export const config = {
  // App Configuration
  appName: import.meta.env.VITE_APP_NAME || "App Icon Resizer",
  appDescription: import.meta.env.VITE_APP_DESCRIPTION || "Free online tool to resize app icons for iOS and Android",
  appUrl: import.meta.env.VITE_APP_URL || "https://appiconresizer.com",
  
  // Analytics
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || "G-631GXM1X67",
  
  // Developer Information (public contact info)
  developerName: import.meta.env.VITE_DEVELOPER_NAME || "Raven Jaminal",
  developerEmail: import.meta.env.VITE_DEVELOPER_EMAIL || "jaminalraven@gmail.com",
  developerLinkedIn: import.meta.env.VITE_DEVELOPER_LINKEDIN || "https://linkedin.com/in/ravenjaminal",
  developerGithub: import.meta.env.VITE_DEVELOPER_GITHUB || "https://github.com/VenJami",
  
  // Social Media
  twitterHandle: import.meta.env.VITE_TWITTER_HANDLE || "@ravenjaminal",
  
  // SEO
  ogImageUrl: import.meta.env.VITE_OG_IMAGE_URL || "https://appiconresizer.com/og-image.png",
} as const; 