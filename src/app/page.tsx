import Link from "next/link"
import { Camera, Upload } from "lucide-react"
import { Button } from "../components/ui/button"

// Force dynamic rendering
export const dynamic = "force-dynamic"
export const revalidate = 0

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="block">Wear the Vibe</span>
          <span className="block text-purple-400">Get Music That Matches Your Look</span>
        </h1>
        <p className="max-w-md mx-auto mt-4 text-lg text-gray-300">
          Upload a photo of your outfit and discover music that matches your style and mood.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/photo-input">
            <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700">
              <Upload size={18} />
              Upload Photo
            </Button>
          </Link>
          <Link href="/photo-input?camera=true">
            <Button size="lg" variant="outline" className="gap-2 border-purple-600 text-purple-400 hover:bg-gray-700">
              <Camera size={18} />
              Use Camera
            </Button>
          </Link>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-700">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-900 text-purple-300 mb-4">
                <Camera size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Step 1</h3>
              <p className="text-gray-300">Upload a photo of your outfit or use your camera to take a picture.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-700">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-900 text-purple-300 mb-4">
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
                >
                  <path d="M12 2v8"></path>
                  <path d="m4.93 10.93 1.41 1.41"></path>
                  <path d="M2 18h2"></path>
                  <path d="M20 18h2"></path>
                  <path d="m19.07 10.93-1.41 1.41"></path>
                  <path d="M22 22H2"></path>
                  <path d="m8 22 4-11 4 11"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Step 2</h3>
              <p className="text-gray-300">Our app analyzes the colors and determines the mood of your outfit.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-700">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-900 text-purple-300 mb-4">
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
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="12" y1="2" x2="12" y2="4"></line>
                  <line x1="12" y1="20" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line>
                  <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="4" y2="12"></line>
                  <line x1="20" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line>
                  <line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Step 3</h3>
              <p className="text-gray-300">Get a personalized playlist that matches the vibe of your outfit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Playlist Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">Featured Playlist</h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Check out this week's featured playlist based on trending styles
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {sampleSongs.map((song, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-600 rounded-md mb-3 overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=200&width=200&text=${encodeURIComponent(song.title)}`}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-sm truncate text-white">{song.title}</h3>
                <p className="text-xs text-gray-400 truncate">{song.artist}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const sampleSongs = [
  { title: "Summer Vibes", artist: "Coastal Dreams" },
  { title: "Colorful Days", artist: "The Palette" },
  { title: "Bright Horizons", artist: "Sunset Collective" },
  { title: "Neon Lights", artist: "City Glow" },
  { title: "Vibrant Energy", artist: "Color Theory" },
]
