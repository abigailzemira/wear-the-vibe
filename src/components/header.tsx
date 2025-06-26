"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-purple-600">
                WearTheVibe
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/search"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Search
            </Link>
            {/* <Link href="/playlists" className="text-gray-600 hover:text-purple-600 transition-colors">
              My Playlists
            </Link> */}
            {/* <Link
              href="/about"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              About
            </Link> */}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/search"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Search
            </Link>
            {/* <Link
              href="/playlists"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              My Playlists
            </Link> */}
            {/* <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link> */}
          </div>
        </div>
      )}
    </header>
  );
}
