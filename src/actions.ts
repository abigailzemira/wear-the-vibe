"use server";

import { cookies } from "next/headers";

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string
) {
  const cookieStore = await cookies();
  cookieStore.set("spotify_access_token", accessToken);
  cookieStore.set("spotify_refresh_token", refreshToken);
  return;
}

export async function savePlaylistToAccount(mood: string) {
  const cookieStore = await cookies();
  let auth = cookieStore.get("spotify_access_token");
  console.log(auth, "masuk sini <<<<<<<<<");
  try {
    //     curl --request POST \
    //   --url https://api.spotify.com/v1/users/smedjan/playlists \
    //   --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z' \
    //   --header 'Content-Type: application/json' \
    //   --data '{
    //     "name": "New Playlist",
    //     "description": "New playlist description",
    //     "public": false
    // }'
    let res = await fetch(
      `https://api.spotify.com/v1/users/smedjan/playlists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth?.value,
        },
        body: JSON.stringify({
          name: "New Playlist",
          description: "New playlist description",
          public: true,
        }),
      }
    );

    if (!res.ok) throw await res.json();
    let data = await res.json();
    console.log(data, "<<<< data from actions page");
  } catch (error) {
    throw error;
  }
}
