import { cookies, headers } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("spotify_access_token")?.value;
  const searchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth,
    },
  };
  try {
    const searchTracks = await fetch(
      `https://api.spotify.com/v1/search?q=remaster%2520genre%3AMysterious&type=track`,
      searchOptions
    );
    const data = await searchTracks.json();

    return Response.json({ data });
  } catch (error) {
    console.log(error, "<<< error from generate playlist api");
    return Response.json(
      { error: "Failed to fetch playlist" },
      { status: 500 }
    );
  }
}
