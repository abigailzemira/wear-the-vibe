"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Upload, ArrowRight } from "lucide-react"
import { useDropzone } from "react-dropzone"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      setFile(selectedFile)

      // Create preview
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
  })

  const handleAnalyze = () => {
    if (!file) return

    setIsLoading(true)

    // Simulate processing delay
    setTimeout(() => {
      // In a real app, we would upload and process the image here
      router.push("/palette")
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Upload Your Outfit Photo</h1>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-purple-400 bg-purple-50" : "border-gray-300 hover:border-purple-400"}`}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="flex flex-col items-center">
            <img
              src={preview || "/placeholder.svg"}
              alt="Preview"
              className="max-h-80 max-w-full rounded-lg mb-4 object-contain"
            />
            <p className="text-sm text-gray-500 mb-2">Click or drag to choose a different image</p>
          </div>
        ) : (
          <div className="flex flex-col items-center py-8">
            <Upload size={48} className="text-gray-400 mb-4" />
            <p className="text-lg font-medium mb-2">
              {isDragActive ? "Drop your image here" : "Drag & drop your outfit photo here"}
            </p>
            <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
            <p className="text-xs text-gray-400">Supports JPG, PNG, WEBP (max 10MB)</p>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleAnalyze}
          disabled={!file || isLoading}
          className="gap-2 bg-purple-600 hover:bg-purple-700"
          size="lg"
        >
          {isLoading ? "Analyzing..." : "Analyze Colors"}
          {!isLoading && <ArrowRight size={16} />}
        </Button>
      </div>
    </div>
  )
}
