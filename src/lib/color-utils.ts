// Function to extract dominant colors from an image
export async function extractColors(imageUrl: string, numColors = 5): Promise<string[]> {
  // In a real app, we would use a library like color-thief or a server-side API
  // For this demo, we'll return mock colors
  return ["#FF5E5B", "#D8D8D8", "#FFFFEA", "#00CECB", "#FFED66"].slice(0, numColors)
}

// Map colors to moods
export function getMoodFromColors(colors: string[]): { mood: string; emoji: string } {
  // This is a simplified version - a real implementation would be more sophisticated
  const dominantColor = colors[0]

  // Convert hex to HSL to determine mood
  const r = Number.parseInt(dominantColor.slice(1, 3), 16) / 255
  const g = Number.parseInt(dominantColor.slice(3, 5), 16) / 255
  const b = Number.parseInt(dominantColor.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
    else if (max === g) h = (b - r) / d + 2
    else if (max === b) h = (r - g) / d + 4

    h *= 60
  }

  // Determine mood based on HSL
  if (s < 0.2) return { mood: "Calm", emoji: "😌" }
  if (h >= 0 && h < 30) return { mood: "Energetic", emoji: "🔥" }
  if (h >= 30 && h < 60) return { mood: "Cheerful", emoji: "😊" }
  if (h >= 60 && h < 180) return { mood: "Fresh", emoji: "🌿" }
  if (h >= 180 && h < 240) return { mood: "Relaxed", emoji: "🌊" }
  if (h >= 240 && h < 300) return { mood: "Creative", emoji: "🎨" }
  return { mood: "Romantic", emoji: "💖" }
}

// Map moods to music genres
export function getGenresFromMood(mood: string): string[] {
  const moodToGenres: Record<string, string[]> = {
    Calm: ["Ambient", "Chillout", "Classical", "Jazz"],
    Energetic: ["Dance", "Electronic", "Hip Hop", "Rock"],
    Cheerful: ["Pop", "Indie Pop", "Folk", "Country"],
    Fresh: ["Alternative", "Indie", "Reggae", "World"],
    Relaxed: ["R&B", "Soul", "Lofi", "Acoustic"],
    Creative: ["Experimental", "Jazz", "Progressive", "Fusion"],
    Romantic: ["R&B", "Soul", "Pop Ballads", "Classical"],
  }

  return moodToGenres[mood] || ["Pop", "Rock", "Electronic", "Hip Hop"]
}
