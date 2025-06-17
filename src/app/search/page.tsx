"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Play, Pause, Mic, SearchIcon } from "lucide-react";
import { Input } from "@/src/components/ui/input";

// Mock data - in a real app, this would come from an API
const mockSearchResults = [
  {
    id: "1",
    title: "Electric Feel",
    artist: "MGMT",
    album: "Oracular Spectacular",
    cover: "/placeholder.svg?height=300&width=300&text=MGMT",
  },
  {
    id: "2",
    title: "Electricity",
    artist: "Dua Lipa & Silk City",
    album: "Electricity",
    cover: "/placeholder.svg?height=300&width=300&text=Dua%20Lipa",
  },
  {
    id: "3",
    title: "Electric Avenue",
    artist: "Eddy Grant",
    album: "Killer on the Rampage",
    cover: "/placeholder.svg?height=300&width=300&text=Eddy%20Grant",
  },
  {
    id: "4",
    title: "Electric Love",
    artist: "BØRNS",
    album: "Dopamine",
    cover: "/placeholder.svg?height=300&width=300&text=BORNS",
  },
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("title");
  const [isRecording, setIsRecording] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [results, setResults] = useState<typeof mockSearchResults>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would search the API based on the search term and active tab
    console.log(`Searching for ${searchTerm} in ${activeTab}`);
    // For demo purposes, we'll just filter the mock data
    if (searchTerm.trim() === "") {
      setResults([]);
    } else {
      const filtered = mockSearchResults.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Show auto suggestions when typing
    if (value.length > 1) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real app, we would start recording audio here

    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      // In a real app, we would process the audio and search for matching songs
      setResults(mockSearchResults);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Find Your Music</h1>

      <Tabs defaultValue="title" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6 bg-gray-800">
          <TabsTrigger
            value="title"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Title
          </TabsTrigger>
          <TabsTrigger
            value="artist"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Artist
          </TabsTrigger>
          <TabsTrigger
            value="lyrics"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Lyrics
          </TabsTrigger>
          <TabsTrigger
            value="tune"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Tune
          </TabsTrigger>
        </TabsList>

        <TabsContent value="title" className="mt-0">
          <form onSubmit={handleSearch} className="flex gap-2 relative">
            <Input
              type="text"
              placeholder="Search by song title..."
              value={searchTerm}
              onChange={handleInputChange}
              className="flex-1 bg-gray-800 border-gray-700 text-white"
            />
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <SearchIcon size={18} className="mr-2" />
              Search
            </Button>

            {/* Auto suggestions */}
            {showSuggestions && searchTerm.length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                {mockSearchResults
                  .filter(
                    (item) =>
                      item.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      item.artist
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .slice(0, 5)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        setSearchTerm(item.title);
                        setShowSuggestions(false);
                        setResults([item]);
                      }}
                    >
                      <img
                        src={item.cover || "/placeholder.svg"}
                        alt={item.title}
                        className="h-8 w-8 rounded"
                      />
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-gray-400">{item.artist}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </form>
        </TabsContent>

        <TabsContent value="artist" className="mt-0">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search by artist name..."
              value={searchTerm}
              onChange={handleInputChange}
              className="flex-1 bg-gray-800 border-gray-700 text-white"
            />
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <SearchIcon size={18} className="mr-2" />
              Search
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="lyrics" className="mt-0">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search by lyrics..."
              value={searchTerm}
              onChange={handleInputChange}
              className="flex-1 bg-gray-800 border-gray-700 text-white"
            />
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <SearchIcon size={18} className="mr-2" />
              Search
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="tune" className="mt-0">
          <div className="text-center py-6">
            <Button
              onClick={startRecording}
              disabled={isRecording}
              size="lg"
              className={`rounded-full h-16 w-16 ${
                isRecording ? "bg-red-500 animate-pulse" : "bg-purple-600"
              }`}
            >
              <Mic size={24} />
            </Button>
            <p className="mt-4 text-gray-400">
              {isRecording ? "Listening..." : "Tap to hum or sing a tune"}
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={result.cover || "/placeholder.svg"}
                  alt={result.album}
                  className="w-full aspect-square object-cover"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-2 right-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm shadow-md"
                  onClick={() => togglePlay(result.id)}
                >
                  {playingId === result.id ? (
                    <Pause size={18} className="text-white" />
                  ) : (
                    <Play size={18} className="text-white" />
                  )}
                </Button>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate text-white">
                  {result.title}
                </h3>
                <p className="text-xs text-gray-400 truncate">
                  {result.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        searchTerm && (
          <div className="text-center py-12 text-gray-400">
            No results found. Try a different search term.
          </div>
        )
      )}
    </div>
  );
}
