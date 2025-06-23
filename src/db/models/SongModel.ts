import IBMSongGenerator from "@/src/helpers/ibm-ai-songs";

type Songs = {
  title: string;
  artist: string;
};
export default class SongModel {
  static async getReccomendedSongs(mood: { mood: string }): Promise<Songs[]> {
    try {
      console.log("Generating AI song recommendations for mood:", mood.mood);
      let reccomendations = await IBMSongGenerator(mood.mood);
      if (!reccomendations)
        throw {
          message: "Failed to generate song reccomendations",
          status: 500,
        };

      console.log("Raw AI response:", reccomendations);

      // Ensure always returning an array
      let parsed = JSON.parse(reccomendations);
      console.log("Parsed AI response:", parsed);

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
      console.log("Getting AI song recommendations for mood:", mood.mood);
      let data = await this.getReccomendedSongs(mood);
      console.log(data, "<<<<< AI generated songs data");

      if (!data || data.length === 0) {
        console.log("No AI song recommendations generated");
        return [];
      }

      let tracks = [];
      for (let i = 0; i < data.length; i++) {
        const song = data[i];
        console.log(`Searching Spotify for: ${song.title} by ${song.artist}`);

        // Create a more precise search query
        const searchQuery = `track:"${song.title}" artist:"${song.artist}"`;
        const encodedQuery = encodeURIComponent(searchQuery);

        const searchTracks = await fetch(
          `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=1&offset=0`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth,
            },
          }
        );

        if (!searchTracks.ok) {
          console.log(
            `Spotify search failed for ${song.title}:`,
            await searchTracks.text()
          );
          throw await searchTracks.json();
        }

        const track = await searchTracks.json();

        // If no exact match found, try a simpler search
        if (track.tracks.items.length === 0) {
          console.log(
            `No exact match found for ${song.title}, trying simpler search...`
          );
          const simpleQuery = encodeURIComponent(
            `${song.title} ${song.artist}`
          );
          const fallbackSearch = await fetch(
            `https://api.spotify.com/v1/search?q=${simpleQuery}&type=track&limit=1&offset=0`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth,
              },
            }
          );
          if (fallbackSearch.ok) {
            const fallbackTrack = await fallbackSearch.json();
            if (fallbackTrack.tracks.items.length > 0) {
              console.log(`Found fallback match for ${song.title}`);
              tracks.push(fallbackTrack.tracks.items[0]);
              continue;
            }
          }
        }

        if (track.tracks.items.length > 0) {
          console.log(track.tracks.items[0].album, "<<<< track items");
          tracks.push(track.tracks.items[0]);
        } else {
          console.log(
            `No Spotify match found for: ${song.title} by ${song.artist}`
          );
        }
      }
      console.log(tracks, "<<<< tracks ");

      let filteredTracks = tracks.map((el) => {
        let minutes = el.duration_ms / (1000 * 60);
        let output = {
          id: el.id,
          title: el.name,
          artist: el.artists[0].name,
          album: el.album.name,
          duration: minutes,
          cover: el.album.images[0],
          uri: el.uri,
          redirect_url: el.external_urls.spotify,
        };
        return output;
      });
      console.log(filteredTracks, "<<<< filtered tracks");

      return filteredTracks;
    } catch (error) {
      console.log(error, "<<< error from spotifying songs");
      throw error;
    }
  }
}
