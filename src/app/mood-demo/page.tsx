"use client";

import { useSelector } from "react-redux";
import {
  selectMood,
  selectColorPalette,
  selectIsAnalyzing,
  selectMoodData,
  selectImageUrl,
} from "../../store/moodSlice";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export default function MoodDisplayPage() {
  // Access mood state from Redux store
  const mood = useSelector(selectMood);
  const colorPalette = useSelector(selectColorPalette);
  const isAnalyzing = useSelector(selectIsAnalyzing);
  const imageUrl = useSelector(selectImageUrl);
  const allMoodData = useSelector(selectMoodData);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Mood State Demo Page
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Mood Data</h2>

        {isAnalyzing ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Analyzing mood...</p>
          </div>
        ) : mood ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-purple-400">Detected Mood:</h3>
              <p className="text-lg">{mood.mood}</p>
            </div>

            {mood.confidence && (
              <div>
                <h3 className="font-medium text-purple-400">Confidence:</h3>
                <p>{Math.round(mood.confidence * 100)}%</p>
              </div>
            )}

            {mood.description && (
              <div>
                <h3 className="font-medium text-purple-400">Description:</h3>
                <p>{mood.description}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-400">
            No mood data available. Upload an image first!
          </p>
        )}
      </div>

      {colorPalette.length > 0 && (
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

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Raw Redux State</h2>
        <pre className="text-sm text-gray-300 overflow-auto max-h-60 bg-gray-900 p-4 rounded">
          {JSON.stringify(allMoodData, null, 2)}
        </pre>
      </div>

      <div className="text-center space-x-4">
        <Link href="/upload">
          <Button variant="outline">Upload New Image</Button>
        </Link>
        <Link href="/color-palette">
          <Button variant="outline">View Color Palette</Button>
        </Link>
        <Link href="/playlist-recommendation">
          <Button variant="outline">View Playlist</Button>
        </Link>
      </div>
    </div>
  );
}
