"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SpotifyCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const authError = searchParams.get("error");
      console.log(code, "<<<< code yg dapet abis auth spotify");
      if (authError) {
        setError(`Authorization failed: ${authError}`);
        setLoading(false);
        return;
      }

      if (!code) {
        setError("No authorization code received");
        setLoading(false);
        return;
      }

      try {
        // Exchange code for access token
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, state }),
          }
        );

        const data = await response.json();

        if (data.error) {
          setError(data.error);
          return;
        }

        // Store tokens (you might want to use a different storage method)
        localStorage.setItem("spotify_access_token", data.access_token);
        localStorage.setItem("spotify_refresh_token", data.refresh_token);

        // Redirect to main app
        router.push("/"); // or wherever you want to redirect
      } catch (err) {
        setError("Failed to process callback");
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4">Connecting to Spotify...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p>{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Success!</h1>
        <p>Redirecting...</p>
      </div>
    </div>
  );
}
