# Sentry Integration Setup

This project has been configured with Sentry for error tracking and performance monitoring.

## Configuration

The Sentry DSN is configured via environment variable `VITE_SENTRY_DSN` in `src/utils/sentry.ts`:

**For your own project, set this environment variable:**
```bash
VITE_SENTRY_DSN=https://your-sentry-dsn-here
```

**Important:** No default DSN is provided. You MUST set `VITE_SENTRY_DSN` to use Sentry.

## Features Enabled

- ✅ **Error Tracking**: Automatic capture of JavaScript errors
- ✅ **Performance Monitoring**: Transaction and span tracking
- ✅ **Session Replay**: 10% of sessions, 100% of error sessions
- ✅ **Error Boundaries**: React error boundary integration
- ✅ **Breadcrumbs**: User action tracking
- ✅ **Release Tracking**: Automatic release versioning

## Environment Variables

To customize Sentry behavior, you can set these environment variables:

```bash
# Your Sentry DSN (REQUIRED for production)
VITE_SENTRY_DSN=https://your-sentry-dsn-here

# Enable Sentry debug mode in development
VITE_SENTRY_DEBUG=true

# Custom environment
VITE_SENTRY_ENVIRONMENT=production
```

## Usage

### Automatic Error Tracking

Errors are automatically captured by the Sentry Error Boundary and global error handlers.

### Manual Error Reporting

Use the `useSentry` hook in your components:

```typescript
import { useSentry } from '../hooks/useSentry';

function MyComponent() {
  const { captureException, captureMessage, addBreadcrumb } = useSentry();

  const handleError = () => {
    try {
      // Some risky operation
    } catch (error) {
      captureException(error, {
        context: 'user_action',
        userId: '123',
      });
    }
  };

  const logUserAction = () => {
    addBreadcrumb({
      category: 'user',
      message: 'User clicked button',
      level: 'info',
    });
  };

  return (
    <button onClick={handleError}>
      Test Error
    </button>
  );
}
```

### Error Boundary

The app is wrapped with `SentryErrorBoundary` which provides:

- Automatic error capture
- User-friendly error UI
- Error ID for support tracking

## Monitoring

Visit your Sentry dashboard at: https://raven-x0.sentry.io/projects/appiconresizer/

## Performance

Performance monitoring is enabled with:
- 100% transaction sampling
- Browser tracing integration
- Automatic React component tracking

## Security

- DSN is public (safe for client-side use)
- Sensitive data is automatically scrubbed
- Custom filters can be added in `sentry.ts`

## For Contributors & Forkers

### Setting Up Your Own Sentry Project

1. **Create a Sentry account** at https://sentry.io
2. **Create a new project** for your app
3. **Get your DSN** from the project settings
4. **Set the environment variable:**
   ```bash
   VITE_SENTRY_DSN=https://your-sentry-dsn-here
   ```

### Why This Matters

- **Open Source:** This project is open source, so others can fork and use it
- **Privacy:** Each user should have their own Sentry project for their errors
- **Separation:** Your errors won't mix with others' errors
- **Control:** You control your own error monitoring and data

### Default Behavior

- If `VITE_SENTRY_DSN` is not set, Sentry will not be initialized (no error tracking)
- In development, Sentry events are disabled by default
- In production, you MUST set `VITE_SENTRY_DSN` to your own project for error tracking 