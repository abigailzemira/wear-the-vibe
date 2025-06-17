// pages/api/callback.js

import { NextRequest, NextResponse } from "next/server";
import querystring from "querystring";

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

export async function POST(req: NextRequest) {
  console.log("bisa masuk");
  const { code, state } = await req.json();

  if (state === null) {
    return NextResponse.redirect(
      "/#" + querystring.stringify({ error: "state_mismatch" })
    );
  }

  const authOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    body: new URLSearchParams({
      code: String(code),
      redirect_uri: redirect_uri || "",
      grant_type: "authorization_code",
    }),
  };

  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );
    const data = await response.json();

    // Optionally redirect or send token back
    // res.status(200).json(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Token exchange failed:", error);
    return NextResponse.json(
      { error: "token_exchange_failed" },
      { status: 500 }
    );
  }
}
