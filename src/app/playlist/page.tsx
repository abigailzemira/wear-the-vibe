"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Play, Pause, ExternalLink, Camera, Heart, Share2 } from "lucide-react"

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
]

export default function PlaylistPage() {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null)
    } else {
      setPlayingId(id)
    }
  }

  const savePlaylist = () => {
    setIsSaved(true)
    // In a real app, we would save the playlist to the user's account
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Energetic Playlist</h1>
          <p className="text-gray-600 mt-1">Based on your vibrant outfit colors</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={savePlaylist} disabled={isSaved}>
            <Heart size={16} className={isSaved ? "fill-purple-600 text-purple-600" : ""} />
            {isSaved ? "Saved" : "Save Playlist"}
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 size={16} />
            Share
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Artist</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Album</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Listen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockPlaylist.map((song, index) => (
                <tr key={song.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded" src={song.cover || "/placeholder.svg"} alt={song.album} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{song.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{song.artist}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{song.album}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{song.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => togglePlay(song.id)}
                    >
                      {playingId === song.id ? (
                        <Pause size={16} className="text-purple-600" />
                      ) : (
                        <Play size={16} className="text-gray-600" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="text-gray-600" />
                      </a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center">
        <Link href="/upload">
          <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
            <Camera size={16} />
            Try Another Photo
          </Button>
        </Link>
      </div>
    </div>
  )
}
