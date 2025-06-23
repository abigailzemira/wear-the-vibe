// pages/api/callback.js

import { NextRequest, NextResponse } from "next/server";
import querystring from "querystring";

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

export async function POST(req: NextRequest) {
  try {
    console.log("Token exchange request received");
    const { code, state } = await req.json();

    if (!code) {
      return NextResponse.json(
        {
          error: {
            message: "Authorization code is required",
            type: "VALIDATION_ERROR",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    if (state === null) {
      return NextResponse.json(
        {
          error: {
            message: "Invalid state parameter. Possible CSRF attack.",
            type: "SECURITY_ERROR",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    if (!client_id || !client_secret || !redirect_uri) {
      console.error("Missing Spotify configuration");
      return NextResponse.json(
        {
          error: {
            message: "Spotify configuration error. Please contact support.",
            type: "CONFIGURATION_ERROR",
            status: 500,
          },
        },
        { status: 500 }
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

    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(
        "Spotify token exchange failed:",
        response.status,
        errorData
      );

      if (response.status === 400) {
        return NextResponse.json(
          {
            error: {
              message: "Invalid authorization code or redirect URI",
              type: "AUTHENTICATION_ERROR",
              status: 400,
            },
          },
          { status: 400 }
        );
      }

      if (response.status === 401) {
        return NextResponse.json(
          {
            error: {
              message: "Invalid client credentials",
              type: "AUTHENTICATION_ERROR",
              status: 401,
            },
          },
          { status: 401 }
        );
      }

      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.access_token) {
      throw new Error("No access token received from Spotify");
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Token exchange failed:", error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
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

    // Handle network errors
    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      return NextResponse.json(
        {
          error: {
            message: "Unable to connect to Spotify. Please try again later.",
            type: "NETWORK_ERROR",
            status: 503,
          },
        },
        { status: 503 }
      );
    }
    // Generic error handling
    return NextResponse.json(
      {
        error: {
          message: "Token exchange failed. Please try logging in again.",
          type: "TOKEN_EXCHANGE_ERROR",
          status: 500,
        },
      },
      { status: 500 }
    );
  }
}
