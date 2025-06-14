"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Play, Pause, MoreHorizontal, Calendar, Clock } from "lucide-react"

// Mock data for saved playlists
const mockPlaylists = [
  {
    id: "1",
    title: "Summer Vibes",
    description: "Based on your colorful summer outfit",
    songCount: 12,
    duration: "42 min",
    createdAt: "June 8, 2025",
    cover: "/placeholder.svg?height=300&width=300&text=Summer%20Vibes",
  },
  {
    id: "2",
    title: "Evening Elegance",
    description: "Based on your black formal outfit",
    songCount: 8,
    duration: "32 min",
    createdAt: "June 5, 2025",
    cover: "/placeholder.svg?height=300&width=300&text=Evening%20Elegance",
  },
  {
    id: "3",
    title: "Workout Energy",
    description: "Based on your gym outfit",
    songCount: 15,
    duration: "58 min",
    createdAt: "June 1, 2025",
    cover: "/placeholder.svg?height=300&width=300&text=Workout%20Energy",
  },
]

export default function PlaylistsPage() {
  const [playingId, setPlayingId] = useState<string | null>(null)

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null)
    } else {
      setPlayingId(id)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8">My Playlists</h1>

      {mockPlaylists.length > 0 ? (
        <div className="space-y-6">
          {mockPlaylists.map((playlist) => (
            <div key={playlist.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 relative">
                  <img
                    src={playlist.cover || "/placeholder.svg"}
                    alt={playlist.title}
                    className="w-full aspect-square object-cover"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-4 right-4 rounded-full bg-purple-600 hover:bg-purple-700 shadow-md md:hidden"
                    onClick={() => togglePlay(playlist.id)}
                  >
                    {playingId === playlist.id ? (
                      <Pause size={20} className="text-white" />
                    ) : (
                      <Play size={20} className="text-white" />
                    )}
                  </Button>
                </div>
                <div className="p-6 md:w-3/4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold mb-1">{playlist.title}</h2>
                        <p className="text-gray-400 mb-4">{playlist.description}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-gray-400">
                        <MoreHorizontal size={20} />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{playlist.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 18V5l12-2v13" />
                          <circle cx="6" cy="18" r="3" />
                          <circle cx="18" cy="16" r="3" />
                        </svg>
                        <span>{playlist.songCount} songs</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{playlist.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button
                      className="gap-2 bg-purple-600 hover:bg-purple-700 hidden md:flex"
                      onClick={() => togglePlay(playlist.id)}
                    >
                      {playingId === playlist.id ? (
                        <>
                          <Pause size={16} />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play size={16} />
                          Play
                        </>
                      )}
                    </Button>
                    <Link href={`/playlist-recommendation?id=${playlist.id}`}>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-800 rounded-lg">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">No playlists yet</h2>
          <p className="text-gray-400 mb-6">Upload a photo to create your first playlist</p>
          <Link href="/photo-input">
            <Button className="bg-purple-600 hover:bg-purple-700">Create a Playlist</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
