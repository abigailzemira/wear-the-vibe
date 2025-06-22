"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../components/ui/button";
import { Music } from "lucide-react";
import {
  selectColorPalette,
  selectMood,
  selectIsAnalyzing,
  selectMoodError,
  selectImageUrl,
  getColorPalette,
  analyzeMood,
  setIsAnalyzing,
} from "../../store/moodSlice";
import type { AppDispatch } from "../../store/index";

// Mock data - in a real app, this would come from color analysis of the uploaded image
const mockPalette = [
  { color: "#FF5E5B", percentage: 35 },
  { color: "#D8D8D8", percentage: 25 },
  { color: "#FFFFEA", percentage: 20 },
  { color: "#00CECB", percentage: 15 },
  { color: "#FFED66", percentage: 5 },
];

// Map colors to moods based on hue, saturation, and brightness
// const getMoodFromColors = (colors: { color: string; percentage: number }[]) => {
//   // Add safety check for empty array
//   if (!colors || colors.length === 0) {
//     return { mood: "Unknown", emoji: "🎨" };
//   }

//   // This is a simplified version - a real implementation would be more sophisticated
//   const dominantColor = colors[0].color;

//   // Convert hex to HSL to determine mood
//   const r = Number.parseInt(dominantColor.slice(1, 3), 16) / 255;
//   const g = Number.parseInt(dominantColor.slice(3, 5), 16) / 255;
//   const b = Number.parseInt(dominantColor.slice(5, 7), 16) / 255;

//   const max = Math.max(r, g, b);
//   const min = Math.min(r, g, b);

//   let h = 0;
//   let s = 0;
//   const l = (max + min) / 2;

//   if (max !== min) {
//     const d = max - min;
//     s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

//     if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
//     else if (max === g) h = (b - r) / d + 2;
//     else if (max === b) h = (r - g) / d + 4;

//     h *= 60;
//   }

//   // Determine mood based on HSL
//   if (s < 0.2) return { mood: "Calm", emoji: "😌" };
//   if (h >= 0 && h < 30) return { mood: "Energetic", emoji: "🔥" };
//   if (h >= 30 && h < 60) return { mood: "Cheerful", emoji: "😊" };
//   if (h >= 60 && h < 180) return { mood: "Fresh", emoji: "🌿" };
//   if (h >= 180 && h < 240) return { mood: "Relaxed", emoji: "🌊" };
//   if (h >= 240 && h < 300) return { mood: "Creative", emoji: "🎨" };
//   return { mood: "Romantic", emoji: "💖" };
// };

export default function ColorPalettePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Get state from Redux store
  const palette: { color: string; percentage: number }[] =
    useSelector(selectColorPalette);
  const mood = useSelector(selectMood);
  const isAnalyzing = useSelector(selectIsAnalyzing);
  const error = useSelector(selectMoodError);
  const imageUrl = useSelector(selectImageUrl);

  useEffect(() => {
    const fetchColorPalette = async () => {
      if (imageUrl) {
        dispatch(setIsAnalyzing(true));
        await dispatch(getColorPalette(imageUrl));
      }
    };

    fetchColorPalette();
  }, [dispatch, imageUrl]);

  // Handle mood analysis after palette is updated
  useEffect(() => {
    if (palette.length > 0) {
      const timer = setTimeout(async () => {
        await dispatch(analyzeMood(palette));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [palette, dispatch]);

  const handleGeneratePlaylist = () => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      router.push("/playlist-recommendation");
    }, 1500);
  };
  console.log(palette, "<<<<< palette");
  console.log(mood, "<<<<< mood");
  if (palette.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 bg-gray-900 text-white min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">
          Your Outfit's Color Palette
        </h1>

        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-lg font-medium">Analyzing colors...</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 bg-gray-900 text-white min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">
          Your Outfit's Color Palette
        </h1>

        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-lg font-medium">Analyzing colors...</p>
          </div>
        ) : (
          <>
            <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Color Swatches
              </h2>
              <div className="flex overflow-x-auto pb-2 gap-2">
                {Array.isArray(palette) &&
                  palette.map((swatch, index) => (
                    <div key={index} className="flex-shrink-0">
                      <div
                        className="w-20 h-20 rounded-md shadow-sm"
                        style={{ backgroundColor: swatch.color }}
                      ></div>
                      <p className="text-xs text-center mt-1 text-gray-400">
                        {swatch.percentage}%
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 text-center">
              <h2 className="text-xl font-semibold mb-2 text-white">
                Detected Mood
              </h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-full">
                <span className="font-medium text-purple-400">
                  {mood?.mood || "Unknown"}
                </span>
              </div>
              <p className="mt-4 text-gray-300">
                Your outfit colors suggest a{" "}
                {mood?.mood?.toLowerCase() || "unknown"} mood. We'll create a
                playlist that matches this vibe.
              </p>
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={handleGeneratePlaylist}
                disabled={isLoading}
                className="gap-2 bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                {isLoading ? "Generating..." : "Generate Playlist"}
                {!isLoading && <Music size={16} />}
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }
}
