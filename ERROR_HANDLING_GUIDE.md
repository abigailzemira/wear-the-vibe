# Error Handling Guide

This project now includes comprehensive error handling with Sweet Alert notifications for all API endpoints.

## Features

### ✅ Server-side Error Handling
- All API endpoints now return structured error responses
- Proper HTTP status codes for different error types
- Detailed error messages for better debugging
- Error categorization (VALIDATION_ERROR, AUTHENTICATION_ERROR, etc.)

### ✅ Client-side Error Handling
- Sweet Alert integration for user-friendly error messages
- Custom hook for easy error handling in React components
- Utility functions for API calls with automatic error handling
- Success, warning, and confirmation dialogs

## Error Types

### API Error Categories
- `VALIDATION_ERROR` (400) - Invalid input data
- `AUTHENTICATION_ERROR` (401) - Login required or expired
- `PERMISSION_ERROR` (403) - Access forbidden
- `NOT_FOUND_ERROR` (404) - Resource not found
- `RATE_LIMIT_ERROR` (429) - Too many requests
- `PROCESSING_ERROR` (500) - Server processing error
- `NETWORK_ERROR` (503) - Connection issues

## Usage Examples

### Using the Error Handler Hook

```typescript
import { useErrorHandler } from '@/src/hooks/useErrorHandler';

function MyComponent() {
  const { handleApiCall, showSuccess, showError } = useErrorHandler();

  const submitData = async () => {
    const result = await handleApiCall('/api/endpoint', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (result) {
      await showSuccess('Data submitted successfully!');
    }
    // Errors are automatically shown via Sweet Alert
  };
}
```

### Manual Error Handling

```typescript
import { ErrorHandler, apiCall } from '@/src/lib/error-handler';

try {
  const data = await apiCall('/api/endpoint');
  await ErrorHandler.showSuccess('Success!');
} catch (error) {
  await ErrorHandler.showError(error);
}
```

### API Response Format

All API endpoints now return errors in this format:

```json
{
  "error": {
    "message": "User-friendly error message",
    "type": "ERROR_TYPE",
    "status": 400
  }
}
```

## API Endpoints Error Handling

### `/api/color-palette`
- Validates image data presence
- Handles different content types
- Returns specific errors for analysis failures

### `/api/mood-analysis`
- Validates image data
- Provides clear feedback for analysis failures
- Handles parsing errors

### `/api/generate-playlist`
- Validates mood data and Spotify authentication
- Handles Spotify API errors (401, 403, 429)
- Provides specific messages for different failure scenarios

### `/api/token`
- Validates authorization code and state
- Handles Spotify OAuth errors
- Provides security error messages

## Middleware Error Handling

The middleware now returns structured error responses instead of trying to show client-side alerts on the server.

## Best Practices

1. **Always use the error handler hook** in React components for consistent UX
2. **Check for null returns** from `handleApiCall` to determine if an error occurred
3. **Use specific error messages** that help users understand what went wrong
4. **Handle authentication errors** by redirecting to login
5. **Show success messages** for important operations

## Sweet Alert Customization

The error handler includes custom styling that matches your Tailwind theme:

- Error dialogs: Red confirm button
- Success dialogs: Green confirm button  
- Warning dialogs: Yellow confirm button
- Confirm dialogs: Blue confirm and gray cancel buttons

## Testing Error Handling

Use the `ExampleApiUsage` component to test all error scenarios:

```typescript
import { ExampleApiUsage } from '@/src/components/ExampleApiUsage';

// Add this component to any page to test error handling
<ExampleApiUsage />
```

## Migration Guide

To update existing API calls to use the new error handling:

1. Replace manual fetch calls with `handleApiCall` from the hook
2. Remove try-catch blocks for error handling (they're handled automatically)
3. Add success notifications where appropriate
4. Update error messages to be more user-friendly

Example migration:

```typescript
// Before
try {
  const response = await fetch('/api/endpoint');
  const data = await response.json();
  if (data.error) {
    alert(data.error);
    return;
  }
  // handle success
} catch (error) {
  alert('Something went wrong');
}

// After
const { handleApiCall, showSuccess } = useErrorHandler();
const data = await handleApiCall('/api/endpoint');
if (data) {
  await showSuccess('Operation completed!');
  // handle success
}
```
