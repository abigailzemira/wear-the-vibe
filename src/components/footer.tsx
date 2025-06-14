import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <Link href="/about" className="text-gray-500 hover:text-gray-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-gray-600">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-gray-600">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-600">
              Terms
            </Link>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-center md:text-right text-sm text-gray-500">
              &copy; {new Date().getFullYear()} WearTheVibe. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
