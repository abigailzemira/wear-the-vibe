# Mood Redux Store Documentation

This documentation explains how to use the Redux store to manage mood state across your application.

## Setup

The Redux store is already configured and provides mood state management throughout your application.

### Store Structure

```typescript
interface MoodState {
  colorPalette: ColorSwatch[]; // Array of color swatches with percentages
  mood: MoodData | null; // Detected mood information
  isAnalyzing: boolean; // Loading state for analysis
  error: string | null; // Error messages
  imageUrl: string | null; // Current image URL
}
```

## Usage Methods

### Method 1: Direct Redux Hooks (Recommended for simple use)

```typescript
import { useSelector, useDispatch } from "react-redux";
import {
  selectMood,
  selectColorPalette,
  selectIsAnalyzing,
  getColorPalette,
  analyzeMood,
} from "../store/moodSlice";

export function MyComponent() {
  const mood = useSelector(selectMood);
  const colorPalette = useSelector(selectColorPalette);
  const isAnalyzing = useSelector(selectIsAnalyzing);
  const dispatch = useDispatch();

  // Use the data
  return (
    <div>
      <h1>Current Mood: {mood?.mood || "Unknown"}</h1>
      {colorPalette.map((color, index) => (
        <div key={index} style={{ backgroundColor: color.color }}>
          {color.percentage}%
        </div>
      ))}
    </div>
  );
}
```

### Method 2: Custom Hook (Recommended for complex use)

```typescript
import { useMoodStore } from "../hooks/useMoodStore";

export function MyComponent() {
  const {
    mood,
    colorPalette,
    isAnalyzing,
    hasMoodData,
    hasColorPalette,
    isReady,
    getColorPalette,
    analyzeMood,
    clearMoodData,
  } = useMoodStore();

  // Simpler and cleaner access to all mood functionality
}
```

## Available Selectors

- `selectMood` - Get current mood data
- `selectColorPalette` - Get color palette array
- `selectIsAnalyzing` - Get loading state
- `selectMoodError` - Get error messages
- `selectImageUrl` - Get current image URL
- `selectMoodData` - Get all mood data at once

## Available Actions

### Synchronous Actions

- `setImageUrl(url)` - Set the image URL
- `setColorPalette(palette)` - Set color palette
- `setMood(moodData)` - Set mood data
- `setIsAnalyzing(boolean)` - Set loading state
- `clearMoodData()` - Clear all mood data
- `clearError()` - Clear error messages

### Asynchronous Actions

- `getColorPalette(imageUrl)` - Fetch color palette from API
- `analyzeMood(colorPalette)` - Analyze mood from colors

## Examples

### Basic Mood Display

```typescript
function MoodDisplay() {
  const mood = useSelector(selectMood);

  if (!mood) return <div>No mood detected</div>;

  return (
    <div>
      <h2>Mood: {mood.mood}</h2>
      {mood.confidence && <p>Confidence: {mood.confidence * 100}%</p>}
    </div>
  );
}
```

### Color Palette Display

```typescript
function ColorPalette() {
  const palette = useSelector(selectColorPalette);

  return (
    <div className="color-palette">
      {palette.map((swatch, index) => (
        <div
          key={index}
          style={{ backgroundColor: swatch.color }}
          className="color-swatch"
        >
          {swatch.percentage}%
        </div>
      ))}
    </div>
  );
}
```

### Using the Custom Hook

```typescript
function MoodManager() {
  const { mood, colorPalette, isAnalyzing, getColorPalette, clearMoodData } =
    useMoodStore();

  const handleAnalyze = async () => {
    const imageUrl = localStorage.getItem("imageUrl");
    if (imageUrl) {
      await getColorPalette(imageUrl);
    }
  };

  return (
    <div>
      <button onClick={handleAnalyze} disabled={isAnalyzing}>
        {isAnalyzing ? "Analyzing..." : "Analyze Mood"}
      </button>

      <button onClick={clearMoodData}>Clear Data</button>

      {mood && <div>Current Mood: {mood.mood}</div>}
    </div>
  );
}
```

## Demo Pages

Visit these pages to see the mood store in action:

- `/mood-demo` - Direct Redux hooks example
- `/mood-hook-demo` - Custom hook example
- `/color-palette` - Main color analysis page
- `/playlist-recommendation` - Uses mood data for playlist generation

## Benefits

1. **Centralized State**: All mood-related data is stored in one place
2. **Cross-Page Access**: Access mood data from any component/page
3. **Persistent State**: Data persists as users navigate between pages
4. **Loading States**: Built-in loading and error handling
5. **Type Safety**: Full TypeScript support with proper typing
6. **Easy to Use**: Simple selectors and custom hook for convenience

## Best Practices

1. Use the custom hook (`useMoodStore`) for complex components
2. Use direct selectors for simple mood/color displays
3. Always check for null values when using mood data
4. Clear mood data when appropriate (user logs out, starts new analysis)
5. Handle loading and error states in your UI

## Type Definitions

```typescript
interface ColorSwatch {
  color: string; // Hex color code
  percentage: number; // Percentage of the color in the image
}

interface MoodData {
  mood: string; // Detected mood name
  confidence?: number; // Confidence score (0-1)
  description?: string; // Optional mood description
}
```
