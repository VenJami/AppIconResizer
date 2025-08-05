import React from 'react';
import * as Sentry from '@sentry/react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; componentStack: string | null; eventId: string | null }>;
}

export const SentryErrorBoundary: React.FC<Props> = ({ children, fallback }) => {
  const defaultFallback = ({ error, componentStack, eventId }: { error: Error; componentStack: string | null; eventId: string | null }) => (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-dark-900 rounded-2xl p-8 border border-red-500/20">
        <h1 className="text-2xl font-bold text-red-400 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-300 mb-4">
          An error occurred and has been reported to our team.
          {eventId && (
            <span className="block text-sm text-gray-400 mt-2">
              Error ID: {eventId}
            </span>
          )}
        </p>
        {error && (
          <details className="text-sm text-gray-400">
            <summary className="cursor-pointer hover:text-gray-300">
              Error details
            </summary>
            <pre className="mt-2 p-3 bg-dark-800 rounded-lg overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
        <button
          onClick={() => window.location.reload()}
          className="mt-4 btn-primary w-full"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );

  return (
    <Sentry.ErrorBoundary fallback={fallback || defaultFallback}>
      {children}
    </Sentry.ErrorBoundary>
  );
}; 