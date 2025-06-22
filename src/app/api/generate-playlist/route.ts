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
  try {
    let mood = await req.json();
    console.log(mood, "<<<< mood from generate playlist api");
    
    const cookieStore = await cookies();
    const auth = cookieStore.get("spotify_access_token")?.value;
    
    if (!auth) {
      console.log("No Spotify access token found");
      return Response.json({ error: "No Spotify access token found" }, { status: 401 });
    }
    
    console.log("Spotify token exists, calling SongModel.spotifyingSongs...");
    let songs = await SongModel.spotifyingSongs({
      mood: mood,
      auth: auth as string,
    });
    
    console.log("Songs retrieved successfully:", songs);
    return Response.json(songs);
  } catch (error) {
    console.log(error, "<<< error from generate playlist api");
    return Response.json({ 
      error: error instanceof Error ? error.message : "Unknown error occurred",
      details: error 
    }, { status: 500 });
  }
}
