import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    // Initialize Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', measurementId, {
        page_title: 'App Icon Resizer',
        page_location: window.location.href,
        custom_map: {
          'custom_parameter_1': 'user_type',
          'custom_parameter_2': 'platform_selected',
          'custom_parameter_3': 'file_format',
          'custom_parameter_4': 'export_format'
        }
      });
    }
  }, [measurementId]);

  return null;
}

// Analytics event tracking functions
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Specific tracking functions for the app
export const trackFileUpload = (fileType: string, fileSize: number) => {
  trackEvent('file_upload', 'engagement', fileType, Math.round(fileSize / 1024)); // Size in KB
};

export const trackPlatformSelection = (platform: string) => {
  trackEvent('platform_selection', 'engagement', platform);
};

export const trackExport = (format: string, quality: number) => {
  trackEvent('export_completed', 'conversion', format, quality);
};

export const trackDownload = (fileCount: number) => {
  trackEvent('download_completed', 'conversion', 'zip_download', fileCount);
};

export const trackError = (errorType: string, errorMessage: string) => {
  trackEvent('error_occurred', 'error', errorType);
  console.error(`Error tracked: ${errorType} - ${errorMessage}`);
};

export const trackPageView = (page: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_title: page,
      page_location: window.location.href + '#' + page
    });
  }
}; 