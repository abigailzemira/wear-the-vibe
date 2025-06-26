"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import queryString from "query-string";
import { checkCookies } from "../actions";

export default function NavigationHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  const SpotifyLogin = async () => {
    console.log("masukkkkk ke spotify login");
    function generateRandomString(length: number) {
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      return Array.from({ length })
        .map(() => possible.charAt(Math.floor(Math.random() * possible.length)))
        .join("");
    }

    let client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    let redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const state = generateRandomString(16);
    const scope =
      "user-read-private user-read-email user-library-modify playlist-modify-private playlist-modify-public";

    const params = queryString.stringify({
      response_type: "code",
      client_id,
      scope: scope,
      redirect_uri, // or your redirect
      state: state,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params}`;
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await checkCookies();
      setAccessToken(token);
    };
    fetchToken();
  }, []);

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-purple-400">
                WearTheVibe
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* <Link
              href="/"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Home
            </Link> */}
            {/* <Link
              href="/search"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Search
            </Link> */}
            {/* <Link
              href="/playlists"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              My Playlists
            </Link> */}
            {!accessToken && (
              <a
                onClick={SpotifyLogin}
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Login with Spotify
              </a>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="text-white hover:bg-gray-800"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link> */}
            {/* <Link
              href="/search"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Search
            </Link> */}
            {/* <Link
              href="/playlists"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              My Playlists
            </Link> */}
            {!accessToken && (
              <a
                onClick={SpotifyLogin}
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Login with Spotify
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
