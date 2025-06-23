"use client";

import { useErrorHandler } from "@/src/hooks/useErrorHandler";

// Example component showing how to use error handling
export function ExampleApiUsage() {
  const { handleApiCall, showSuccess, showError } = useErrorHandler();

  const handleColorAnalysis = async (imageData: string) => {
    const result = await handleApiCall("/api/color-palette", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageData),
    });

    if (result) {
      await showSuccess("Color analysis completed successfully!");
      // Process result here
      console.log("Color analysis result:", result);
    }
  };

  const handleMoodAnalysis = async (imageData: string) => {
    const result = await handleApiCall("/api/mood-analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageData),
    });

    if (result) {
      await showSuccess("Mood analysis completed successfully!");
      // Process result here
      console.log("Mood analysis result:", result);
    }
  };

  const handlePlaylistGeneration = async (moodData: any) => {
    const result = await handleApiCall("/api/generate-playlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(moodData),
    });

    if (result) {
      await showSuccess("Playlist generated successfully!");
      // Process result here
      console.log("Playlist result:", result);
    }
  };

  const handleSpotifyAuth = async (code: string, state: string) => {
    const result = await handleApiCall("/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, state }),
    });

    if (result) {
      await showSuccess("Successfully logged in to Spotify!");
      // Process result here
      console.log("Auth result:", result);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">API Usage Examples</h2>
      <p className="text-gray-600">
        All API calls now include automatic error handling with Sweet Alert
        notifications.
      </p>

      <div className="space-y-2">
        <button
          onClick={() => handleColorAnalysis("sample-image-data")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Color Analysis
        </button>

        <button
          onClick={() => handleMoodAnalysis("sample-image-data")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Mood Analysis
        </button>

        <button
          onClick={() => handlePlaylistGeneration({ mood: "happy" })}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Test Playlist Generation
        </button>

        <button
          onClick={() => handleSpotifyAuth("sample-code", "sample-state")}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Test Spotify Auth
        </button>
      </div>
    </div>
  );
}

// Example of manual error handling without the hook
export async function manualApiCall() {
  try {
    const response = await fetch("/api/mood-analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageData: "sample" }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData.error;
    }

    const data = await response.json();

    // Handle success
    await import("@/src/lib/error-handler").then(({ ErrorHandler }) => {
      ErrorHandler.showSuccess("Operation completed successfully!");
    });

    return data;
  } catch (error: any) {
    // Handle error
    await import("@/src/lib/error-handler").then(({ ErrorHandler }) => {
      ErrorHandler.showError(error);
    });
    return null;
  }
}
