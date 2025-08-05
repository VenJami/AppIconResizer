import * as Sentry from '@sentry/react';

// Only initialize Sentry if DSN is provided
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
  
    // Performance monitoring
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        // Capture 10% of all sessions
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
    tracesSampleRate: 1.0,

    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,

    // Environment
    environment: import.meta.env.MODE || 'development',

    // Release tracking
    release: 'app-icon-resizer@0.0.0',

    // Enable debug mode in development
    debug: import.meta.env.DEV,

    // Before sending event to Sentry
    beforeSend(event, hint) {
      // Don't send events in development unless explicitly enabled
      if (import.meta.env.DEV && !import.meta.env.VITE_SENTRY_DEBUG) {
        return null;
      }
      return event;
    },

    // Ignore certain errors
    ignoreErrors: [
      // Ignore network errors
      'Network Error',
      'Failed to fetch',
      // Ignore common browser errors
      'ResizeObserver loop limit exceeded',
      'Script error.',
    ],
  });
}

export default Sentry; 