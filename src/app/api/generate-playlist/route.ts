import SongModel from "@/src/db/models/SongModel";
import { cookies, headers } from "next/headers";

export type TrackItem = {
  id: string;
  name: string;
  artists: any[];
  album: {
    name: string;
    images: any[];
  };
  duration_ms: number;
  uri: string;
  external_urls: {
    spotify: string;
  };
};

export async function POST(req: Request) {
  let mood = await req.json();
  console.log(mood, "<<<< mood from generate playlist api");
  const cookieStore = await cookies();
  const auth = cookieStore.get("spotify_access_token")?.value;
  let songs = await SongModel.spotifyingSongs({
    mood: { mood: "happy" },
    auth: auth as string,
  });
  try {
    // const searchTracks = await fetch(
    //   `https://api.spotify.com/v1/search?q=remaster%2520genre%3A${mood.mood}&type=track`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + auth,
    //     },
    //   }
    // );
    // console.log(searchTracks, "<<<< search tracks response from spotify");
    // if (!searchTracks.ok) {
    //   throw new Error("Failed to fetch tracks from Spotify");
    // }
    // const data = await searchTracks.json();
    // console.log(data.tracks.items, "<<<< data from search tracks response");

    // let filteredData = data.tracks.items.map((el: TrackItem) => {
    //   let minutes = el.duration_ms / (1000 * 60);
    //   let output = {
    //     id: el.id,
    //     title: el.name,
    //     artist: el.artists,
    //     album: el.album.name,
    //     duration: minutes,
    //     cover: el.album.images[0],
    //     uri: el.uri,
    //     redirect_url: el.external_urls.spotify,
    //   };
    //   return output;
    // });
    // console.log(filteredData, "<<<<<< data syudah di filter");
    return Response.json({ data: "mew mew mew" });
  } catch (error) {
    console.log(error, "<<< error from generate playlist api");
    return Response.json(
      { error: "Failed to fetch playlist" },
      { status: 500 }
    );
  }
}
