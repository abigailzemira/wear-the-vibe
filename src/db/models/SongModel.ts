import IBMSongGenerator from "@/src/helpers/ibm-ai-songs";

type Songs = {
  title: string;
  artist: string;
};
export default class SongModel {
  static async getReccomendedSongs(mood: { mood: string }): Promise<Songs[]> {
    try {
      let reccomendations = await IBMSongGenerator(mood.mood);
      if (!reccomendations)
        throw {
          message: "Failed to generate song reccomendations",
          status: 500,
        };
      //   reccomendations = JSON.parse(reccomendations);
      console.log(Array.isArray(reccomendations), "<<<< reccomendations");
      // Ensure always returning an array
      let parsed = JSON.parse(reccomendations);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.log(error, "<<< error from get reccommended songs");
      return [];
    }
  }
  static async spotifyingSongs({
    mood,
    auth,
  }: {
    mood: { mood: string };
    auth: string;
  }) {
    try {
      let data = await this.getReccomendedSongs(mood);
      console.log(data, "<<<<< typeof data");
      let tracks = [];
      for (let i = 0; i < data.length; i++) {
        const song = data[i];
        // Create a proper search query using the actual song title and artist
        const searchQuery = encodeURIComponent(
          `track:"${song.title}" artist:"${song.artist}"`
        );
        const searchTracks = await fetch(
          `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=1&offset=0`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth,
            },
          }
        );
        if (!searchTracks.ok) {
          console.log(`Failed to search for ${song.title} by ${song.artist}`);
          continue; // Skip this song and continue with the next one
        }

        const track = await searchTracks.json();
        tracks.push(track);
      }
      console.log(tracks, "<<<< tracks ");
      return tracks;
    } catch (error) {
      console.log(error, "<<< error from spotifying songs");
      return [];
    }
  }
}
