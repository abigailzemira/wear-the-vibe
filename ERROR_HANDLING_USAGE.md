# Error Handling with Sweet Alert - Usage Guide

Your application now has comprehensive error handling implemented using Sweet Alert for all user-facing error notifications.

## 🚀 Quick Start

### 1. Import the Error Handler Hook

```tsx
import { useErrorHandler } from "@/src/hooks/useErrorHandler";
```

### 2. Use in Your Component

```tsx
function MyComponent() {
  const { handleApiCall, showError, showSuccess, showConfirm } =
    useErrorHandler();

  const handleSubmit = async () => {
    // This will automatically show Sweet Alert on errors
    const result = await handleApiCall("/api/some-endpoint", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (result) {
      await showSuccess("Operation completed successfully!");
    }
  };
}
```

## 📋 Available Methods

### `handleApiCall(url, options, showErrorAlert?)`

- Automatically handles API calls with error notifications
- Returns data on success, null on error
- Errors are automatically displayed via Sweet Alert

### `showError(error, title?)`

- Display error messages
- Can accept string or error objects

### `showSuccess(message, title?)`

- Display success notifications

### `showWarning(message, title?)`

- Display warning notifications

### `showConfirm(message, title?)`

- Display confirmation dialogs
- Returns boolean (true if confirmed)

## 🔧 API Endpoints Error Handling

All your API endpoints (`/api/color-palette`, `/api/mood-analysis`, `/api/generate-playlist`, `/api/token`) now return structured error responses:

```json
{
  "error": {
    "message": "User-friendly error message",
    "type": "ERROR_TYPE",
    "status": 400
  }
}
```

### Error Types Include:

- `VALIDATION_ERROR` - Invalid input data
- `AUTHENTICATION_ERROR` - Login required
- `AUTHORIZATION_ERROR` - Permission denied
- `RATE_LIMIT_ERROR` - Too many requests
- `PROCESSING_ERROR` - Processing failed
- `CONFIGURATION_ERROR` - Server configuration issue

## 💡 Examples

### Image Upload with Error Handling

```tsx
const handleImageUpload = async (file: File) => {
  if (!file.type.startsWith("image/")) {
    await showError("Please select a valid image file");
    return;
  }

  const result = await handleApiCall("/api/color-palette", {
    method: "POST",
    body: JSON.stringify(imageData),
  });

  if (result) {
    await showSuccess("Analysis completed!");
  }
  // Errors are automatically handled
};
```

### Manual Error Handling

```tsx
const handleCustomOperation = async () => {
  try {
    // Your custom logic here
    const data = await someOperation();
    await showSuccess("Operation successful!");
  } catch (error) {
    await showError("Something went wrong", "Custom Error");
  }
};
```

### Confirmation Dialogs

```tsx
const handleDelete = async () => {
  const confirmed = await showConfirm(
    "Are you sure you want to delete this item?",
    "Confirm Deletion"
  );

  if (confirmed) {
    // Proceed with deletion
  }
};
```

## 🎨 Sweet Alert Styling

The error alerts are styled to match your application theme and include:

- ✅ Success alerts (green)
- ❌ Error alerts (red)
- ⚠️ Warning alerts (yellow)
- ❓ Confirmation dialogs
- Custom button styling with Tailwind CSS classes

## 🔍 Testing Error Handling

You can test the error handling by:

1. Using the `ExampleApiUsage` component
2. Triggering API calls with invalid data
3. Testing network failures
4. Testing authentication errors

All errors will be properly displayed to users with appropriate messages via Sweet Alert.

## 📝 Best Practices

1. **Always use `handleApiCall`** for API requests instead of raw fetch
2. **Use specific error messages** that help users understand what went wrong
3. **Show success feedback** for completed operations
4. **Use confirmations** for destructive actions
5. **Handle edge cases** like network failures and timeouts

Your error handling system is now ready to use throughout your application! 🎉
