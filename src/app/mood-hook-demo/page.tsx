"use client";

import { useMoodStore } from "../../hooks/useMoodStore";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export default function MoodHookDemoPage() {
  // Using the custom hook - much cleaner!
  const {
    mood,
    colorPalette,
    isAnalyzing,
    error,
    hasMoodData,
    hasColorPalette,
    isReady,
    clearMoodData,
    setIsAnalyzing,
  } = useMoodStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Mood Hook Demo Page
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Using Custom Hook</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="font-medium text-purple-400 mb-2">Status</h3>
            <ul className="space-y-1 text-sm">
              <li>Has Mood Data: {hasMoodData ? "✅" : "❌"}</li>
              <li>Has Color Palette: {hasColorPalette ? "✅" : "❌"}</li>
              <li>Is Ready: {isReady ? "✅" : "❌"}</li>
              <li>Is Analyzing: {isAnalyzing ? "🔄" : "✅"}</li>
              <li>Has Error: {error ? "❌" : "✅"}</li>
            </ul>
          </div>

          <div className="bg-gray-700 p-4 rounded">
            <h3 className="font-medium text-purple-400 mb-2">Quick Stats</h3>
            <ul className="space-y-1 text-sm">
              <li>Current Mood: {mood?.mood || "None"}</li>
              <li>Color Count: {colorPalette.length}</li>
              <li>
                Confidence:{" "}
                {mood?.confidence
                  ? `${Math.round(mood.confidence * 100)}%`
                  : "N/A"}
              </li>
            </ul>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded p-4 mb-4">
            <h3 className="font-medium text-red-400 mb-1">Error</h3>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}
      </div>

      {hasColorPalette && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
          <div className="flex flex-wrap gap-3">
            {colorPalette.map((swatch, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-16 h-16 rounded-lg shadow-md mb-2"
                  style={{ backgroundColor: swatch.color }}
                ></div>
                <p className="text-xs text-gray-400">{swatch.color}</p>
                <p className="text-xs text-gray-500">{swatch.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasMoodData && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Mood Information</h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-purple-400">Mood: </span>
              <span className="text-lg">{mood?.mood}</span>
            </div>
            {mood?.confidence && (
              <div>
                <span className="font-medium text-purple-400">
                  Confidence:{" "}
                </span>
                <span>{Math.round(mood.confidence * 100)}%</span>
              </div>
            )}
            {mood?.description && (
              <div>
                <span className="font-medium text-purple-400">
                  Description:{" "}
                </span>
                <span>{mood.description}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="text-center space-x-4 space-y-2">
        <div>
          <Link href="/upload">
            <Button variant="outline">Upload New Image</Button>
          </Link>
          <Link href="/color-palette">
            <Button variant="outline" className="ml-2">
              View Color Palette
            </Button>
          </Link>
          <Link href="/playlist-recommendation">
            <Button variant="outline" className="ml-2">
              View Playlist
            </Button>
          </Link>
        </div>

        <div>
          <Button
            variant="destructive"
            onClick={clearMoodData}
            disabled={!hasMoodData && !hasColorPalette}
          >
            Clear All Data
          </Button>
        </div>
      </div>
    </div>
  );
}
