export const dynamic = "force-dynamic"
export const revalidate = 0

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">About WearTheVibe</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Our Mission</h2>
          <p className="text-gray-300">
            WearTheVibe connects fashion and music in a unique way. We believe that your style expresses your mood, and
            your mood deserves a soundtrack. Our app uses advanced color analysis to match your outfit with music that
            complements your vibe.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">How It Works</h2>
          <p className="text-gray-300 mb-4">
            Our technology analyzes the colors in your outfit photo and maps them to emotional states using color
            psychology. We then curate playlists that match these emotions, creating a personalized audio experience
            that complements your visual style.
          </p>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">The Science Behind It</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Color extraction using computer vision algorithms</li>
              <li>Mood mapping based on color psychology research</li>
              <li>Music recommendation using genre and mood correlations</li>
              <li>Continuous learning from user feedback</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Our Team</h2>
          <p className="text-gray-300">
            WearTheVibe was created by a team of music lovers, fashion enthusiasts, and tech innovators who wanted to
            bridge the gap between visual and auditory experiences. We're constantly working to improve our algorithms
            and expand our music library.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Contact Us</h2>
          <p className="text-gray-300">
            Have questions, suggestions, or feedback? We'd love to hear from you! Reach out to us at
            <a href="mailto:contact@wearthevibe.com" className="text-purple-400 ml-1 hover:underline">
              contact@wearthevibe.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
