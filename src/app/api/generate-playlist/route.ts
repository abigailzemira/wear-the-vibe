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

    if (!mood) {
      return Response.json(
        {
          error: {
            message: "Mood data is required",
            type: "VALIDATION_ERROR",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const auth = cookieStore.get("spotify_access_token")?.value;

    if (!auth) {
      console.log("No Spotify access token found");
      return Response.json(
        {
          error: {
            message:
              "Spotify authentication required. Please login to Spotify first.",
            type: "AUTHENTICATION_ERROR",
            status: 401,
          },
        },
        { status: 401 }
      );
    }

    console.log("Spotify token exists, calling SongModel.spotifyingSongs...");
    let songs = await SongModel.spotifyingSongs({
      mood: mood,
      auth: auth as string,
    });

    if (!songs || (Array.isArray(songs) && songs.length === 0)) {
      return Response.json(
        {
          error: {
            message: "No songs found for the current mood. Please try again.",
            type: "NO_RESULTS_ERROR",
            status: 404,
          },
        },
        { status: 404 }
      );
    }

    console.log("Songs retrieved successfully:", songs);
    return Response.json(songs);
  } catch (error: any) {
    console.log(error, "<<< error from generate playlist api");

    // Handle Spotify API errors
    if (error.status === 401) {
      return Response.json(
        {
          error: {
            message: "Spotify session expired. Please login again.",
            type: "AUTHENTICATION_ERROR",
            status: 401,
          },
        },
        { status: 401 }
      );
    }

    if (error.status === 403) {
      return Response.json(
        {
          error: {
            message: "Spotify access forbidden. Please check your permissions.",
            type: "PERMISSION_ERROR",
            status: 403,
          },
        },
        { status: 403 }
      );
    }

    if (error.status === 429) {
      return Response.json(
        {
          error: {
            message: "Rate limit exceeded. Please try again later.",
            type: "RATE_LIMIT_ERROR",
            status: 429,
          },
        },
        { status: 429 }
      );
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return Response.json(
        {
          error: {
            message: "Invalid request data format",
            type: "VALIDATION_ERROR",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    // Generic error handling
    return Response.json(
      {
        error: {
          message:
            error.message || "Failed to generate playlist. Please try again.",
          type: "PLAYLIST_GENERATION_ERROR",
          status: 500,
        },
      },
      { status: 500 }
    );
  }
}
