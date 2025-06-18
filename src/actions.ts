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
