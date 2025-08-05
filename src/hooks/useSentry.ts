import { useCallback } from 'react';
import * as Sentry from '@sentry/react';

export const useSentry = () => {
  const captureException = useCallback((error: Error, context?: Record<string, any>) => {
    Sentry.captureException(error, {
      contexts: context,
      tags: {
        source: 'manual',
      },
    });
  }, []);

  const captureMessage = useCallback((message: string, level: Sentry.SeverityLevel = 'info', context?: Record<string, any>) => {
    Sentry.captureMessage(message, {
      level,
      contexts: context,
      tags: {
        source: 'manual',
      },
    });
  }, []);

  const setUser = useCallback((user: { id?: string; email?: string; username?: string; ip_address?: string }) => {
    Sentry.setUser(user);
  }, []);

  const setTag = useCallback((key: string, value: string) => {
    Sentry.setTag(key, value);
  }, []);

  const setContext = useCallback((name: string, context: Record<string, any>) => {
    Sentry.setContext(name, context);
  }, []);

  const addBreadcrumb = useCallback((breadcrumb: Sentry.Breadcrumb) => {
    Sentry.addBreadcrumb(breadcrumb);
  }, []);

  return {
    captureException,
    captureMessage,
    setUser,
    setTag,
    setContext,
    addBreadcrumb,
  };
}; 