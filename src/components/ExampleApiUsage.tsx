"use client";

import { useState } from "react";
import { useErrorHandler } from "@/src/hooks/useErrorHandler";

// Example component showing how to use error handling in your app
export function ExampleApiUsage() {
  const {
    handleApiCall,
    showSuccess,
    showError,
    showConfirm,
    handleSpotifyTokenExpired,
    redirectToSpotifyLogin,
  } = useErrorHandler();
  const [isLoading, setIsLoading] = useState(false);

  // Example: Handle image upload and color analysis
  const handleImageUpload = async (file: File) => {
    if (!file) {
      await showError("Please select an image file");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      await showError("Please select a valid image file", "Invalid File Type");
      return;
    }

    setIsLoading(true);

    try {
      // Convert file to base64 or handle as needed
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;

        // Color analysis
        const colorResult = await handleApiCall("/api/color-palette", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imageData),
        });

        if (colorResult) {
          await showSuccess("Color analysis completed successfully!");

          // Mood analysis
          const moodResult = await handleApiCall("/api/mood-analysis", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(imageData),
          });

          if (moodResult) {
            await showSuccess("Mood analysis completed successfully!");

            // Ask user if they want to generate playlist
            const shouldGeneratePlaylist = await showConfirm(
              "Would you like to generate a playlist based on your mood?",
              "Generate Playlist"
            );

            if (shouldGeneratePlaylist) {
              await handlePlaylistGeneration(moodResult.mood);
            }
          }
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      await showError("Failed to process image. Please try again.");
    } finally {
      setIsLoading(false);
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

  // Example of manual error handling
  const handleManualErrorTest = async () => {
    try {
      // Simulate an error
      throw new Error("This is a test error");
    } catch (error) {
      await showError(
        "Something went wrong in manual test",
        "Manual Error Test"
      );
    }
  };

  // Test Spotify token expiration dialog
  const testSpotifyTokenExpired = async () => {
    await handleSpotifyTokenExpired();
  };

  // Test direct Spotify login redirect
  const testSpotifyLoginRedirect = () => {
    redirectToSpotifyLogin();
  };

  // Test expired token by simulating the error
  const testExpiredTokenError = async () => {
    // Simulate an expired Spotify token error
    const mockError = {
      message: "Spotify session expired. Please login again.",
      status: 401,
      details: { type: "AUTHENTICATION_ERROR" },
    };
    await showError(mockError, "Simulated Spotify Error");
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-2">Error Handling Examples</h2>
        <p className="text-gray-600">
          All API calls include automatic error handling with Sweet Alert
          notifications. Errors are properly displayed to users with appropriate
          messages.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Image Processing</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={isLoading}
          />
          {isLoading && (
            <p className="text-blue-600 mt-2">Processing image...</p>
          )}
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">API Test Buttons</h3>
          <div className="space-x-2 space-y-2">
            <button
              onClick={() => handlePlaylistGeneration({ mood: "happy" })}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              disabled={isLoading}
            >
              Test Playlist Generation
            </button>

            <button
              onClick={() => handleSpotifyAuth("invalid-code", "invalid-state")}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Test Invalid Spotify Auth
            </button>

            <button
              onClick={handleManualErrorTest}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Test Manual Error
            </button>

            <button
              onClick={testSpotifyTokenExpired}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Test Spotify Token Expired
            </button>

            <button
              onClick={testSpotifyLoginRedirect}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Test Spotify Login Redirect
            </button>

            <button
              onClick={testExpiredTokenError}
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Test Simulated Expired Token
            </button>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">🎵 Spotify Token Handling:</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>• Automatically detects when Spotify access token expires</p>
            <p>• Shows a Sweet Alert with "Login to Spotify" button</p>
            <p>• Clicking the button redirects to Spotify OAuth flow</p>
            <p>
              • Works for all API calls that return 401 with Spotify-related
              messages
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">How to Use in Your Components:</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              1. Import the hook:{" "}
              <code className="bg-gray-200 px-1 rounded">useErrorHandler</code>
            </p>
            <p>
              2. Use{" "}
              <code className="bg-gray-200 px-1 rounded">handleApiCall</code>{" "}
              for automatic error handling
            </p>
            <p>
              3. Use <code className="bg-gray-200 px-1 rounded">showError</code>
              , <code className="bg-gray-200 px-1 rounded">showSuccess</code>{" "}
              for manual alerts
            </p>{" "}
            <p>4. All errors will be displayed via Sweet Alert automatically</p>
            <p>
              5. <strong>Spotify token expiration</strong> is automatically
              detected and shows a login button
            </p>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">🎵 Spotify Token Handling:</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>• Automatically detects when Spotify access token expires</p>
            <p>• Shows a Sweet Alert with "Login to Spotify" button</p>
            <p>• Clicking the button redirects to Spotify OAuth flow</p>
            <p>
              • Works for all API calls that return 401 with Spotify-related
              messages
            </p>
          </div>
        </div>
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
