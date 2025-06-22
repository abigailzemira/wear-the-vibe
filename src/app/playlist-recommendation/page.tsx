"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Button } from "@/src/components/ui/button";
import { Play, Pause, ExternalLink, Camera, Heart, Share2 } from "lucide-react";
import {
  selectMood,
  selectColorPalette,
  selectMoodData,
} from "@/src/store/moodSlice";
import { savePlaylistToAccount } from "@/src/actions";
import Swal from "sweetalert2";

export type Playlist = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: {
    height: number;
    width: number;
    url: string;
  };
  uri: string;
  redirect_url: string;
};

// Mock data - in a real app, this would come from an API based on color analysis
const mockPlaylist = [
  {
    id: "1",
    title: "Electric Feel",
    artist: "MGMT",
    album: "Oracular Spectacular",
    duration: "3:49",
    cover: "/placeholder.svg?height=300&width=300&text=MGMT",
  },
  {
    id: "2",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    cover: "/placeholder.svg?height=300&width=300&text=The%20Weeknd",
  },
  {
    id: "3",
    title: "Dance Monkey",
    artist: "Tones and I",
    album: "The Kids Are Coming",
    duration: "3:29",
    cover: "/placeholder.svg?height=300&width=300&text=Tones%20and%20I",
  },
  {
    id: "4",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: "3:23",
    cover: "/placeholder.svg?height=300&width=300&text=Dua%20Lipa",
  },
  {
    id: "5",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    duration: "2:54",
    cover: "/placeholder.svg?height=300&width=300&text=Harry%20Styles",
  },
  {
    id: "6",
    title: "Don't Start Now",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: "3:03",
    cover: "/placeholder.svg?height=300&width=300&text=Dua%20Lipa",
  },
  {
    id: "7",
    title: "Savage Love",
    artist: "Jawsh 685 & Jason Derulo",
    album: "Savage Love",
    duration: "2:51",
    cover: "/placeholder.svg?height=300&width=300&text=Jason%20Derulo",
  },
];

export default function PlaylistRecommendationPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<Playlist[]>([]);

  // Get mood data from Redux store
  const mood = useSelector(selectMood) as { mood?: string } | null;
  const colorPalette = useSelector(selectColorPalette);
  const moodData = useSelector(selectMoodData);

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const savePlaylist = async () => {
    try {
      setIsSaved(true);
      // In a real app, we would save the playlist to the user's account
      await savePlaylistToAccount(mood?.mood as string);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error saving playlist",
        text: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  const handleSongClick = (id: string) => {
    setSelectedSong(id);
  };
  async function getPlaylist() {
    try {
      console.log("Fetching playlist for mood:", mood);
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-playlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mood),
        }
      );

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json();
        console.log("Error response:", errorData);
        throw {
          message: "Failed to fetch playlist",
          status: res.status,
          details: errorData,
        };
      }

      let data = await res.json();
      console.log(data, "<<<< data from playlist reccomendation page");
      setPlaylist(data);
    } catch (error) {
      console.log(error, "<<<< error from playlist reccomendation page");
      // Set some fallback data or show error message
      alert(`Error generating playlist: ${error.message || "Unknown error"}`);
    }
  }
  useEffect(() => {
    // Fetch playlist data when the component mounts
    getPlaylist();
  }, []);
  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading playlist...</p>
      </div>
    );
  } else {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 bg-gray-900 text-white min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Your {mood?.mood || "Custom"} Playlist
            </h1>
            <p className="text-gray-400 mt-1">
              Based on your {mood?.mood ? mood.mood.toLowerCase() : "outfit"}{" "}
              colors
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={savePlaylist}
              disabled={isSaved}
            >
              <Heart
                size={16}
                className={isSaved ? "fill-purple-600 text-purple-600" : ""}
              />
              {isSaved ? "Saved" : "Save Playlist"}
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 size={16} />
              Share
            </Button>
          </div>
        </div>

        {/* Color Palette Section */}
        {colorPalette.length > 0 && (
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Color Palette Analysis
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {colorPalette.map((swatch, index) => (
                <div key={index} className="flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-md shadow-sm"
                    style={{ backgroundColor: swatch.color }}
                  ></div>
                  <p className="text-xs text-center mt-1 text-gray-400">
                    {swatch.percentage}%
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-300">
              Detected mood:{" "}
              <span className="text-purple-400 font-medium">
                {mood?.mood || "Unknown"}
              </span>
            </p>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Artist
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Album
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Listen
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {playlist?.map((song, index) => (
                  <tr
                    key={song.id}
                    className={`hover:bg-gray-700 cursor-pointer ${
                      selectedSong === song.id ? "bg-gray-700" : ""
                    }`}
                    onClick={() => handleSongClick(song.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded"
                            src={song.cover.url || "/placeholder.svg"}
                            alt={song.album}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {song.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {song.artist}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {song.album}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {song.duration.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay(song.id);
                        }}
                      >
                        {playingId === song.id ? (
                          <Pause size={16} className="text-purple-400" />
                        ) : (
                          <Play size={16} className="text-gray-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={(e) => {
                          window.open(song.redirect_url, "_blank");
                          e.stopPropagation();
                        }}
                      >
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} className="text-gray-400" />
                        </a>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedSong && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center">
                {mockPlaylist
                  .filter((song) => song.id === selectedSong)
                  .map((song) => (
                    <div key={song.id} className="flex items-center">
                      <img
                        src={song.cover || "/placeholder.svg"}
                        alt={song.title}
                        className="h-12 w-12 rounded mr-4"
                      />
                      <div>
                        <p className="font-medium text-white">{song.title}</p>
                        <p className="text-sm text-gray-400">{song.artist}</p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-gray-700"
                  onClick={() => togglePlay(selectedSong)}
                >
                  {playingId === selectedSong ? (
                    <Pause size={20} className="text-white" />
                  ) : (
                    <Play size={20} className="text-white" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  asChild
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="text-gray-400" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/photo-input">
              <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                <Camera size={16} />
                Try Another Photo
              </Button>
            </Link>
            <Button variant="outline" className="gap-2">
              <ExternalLink size={16} />
              Open in Spotify
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
