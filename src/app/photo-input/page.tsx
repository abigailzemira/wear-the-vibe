"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Camera, Upload, RefreshCw, ArrowRight } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/src/components/ui/button"
import { cookies } from "next/headers"

export default function PhotoInputPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasCamera, setHasCamera] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const showCamera = searchParams.get("camera") === "true"

  useEffect(() => {
    if (showCamera) {
      // Check if camera is available
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => {
          setHasCamera(true)
          startCamera()
        })
        .catch((err) => {
          console.error("Camera not available:", err)
          setHasCamera(false)
        })
    }

    return () => {
      // Clean up video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [showCamera])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreaming(true)
      }
    } catch (err) {
      console.error("Error starting camera:", err)
    }
  }

  const capturePhoto = () => {
    console.log("masuk sini <<<<<<<<")
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert canvas to data URL
    const imageDataUrl = canvas.toDataURL("image/jpeg")
    setCapturedImage(imageDataUrl)
    localStorage.setItem("imageUrl", imageDataUrl)
    // console.log(capturedImage, "<<<<< canvas disini")

    // Stop camera stream
    if (video.srcObject) {
      const stream = video.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      setIsStreaming(false)
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    localStorage.removeItem("imageUrl")
    startCamera()
  }

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      setFile(selectedFile)

      // Create preview
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
  })

  const handleAnalyze = () => {
    if ((!file && !capturedImage) || isLoading) return

    setIsLoading(true)

    // Simulate processing delay
    setTimeout(() => {
      // In a real app, we would upload and process the image here

      // to analyse the color palette, might need to use state management
      router.push("/color-palette")
    }, 1500)
  }
  console.log(capturedImage,  "<<<<< captured image disini ceunah")
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        {showCamera ? "Take a Photo of Your Outfit" : "Upload Your Outfit Photo"}
      </h1>

      {showCamera ? (
        <>
          <div className="bg-black rounded-lg overflow-hidden relative">
            {!hasCamera ? (
              <div className="flex flex-col items-center justify-center p-12 text-white bg-gray-800">
                <Camera size={48} className="mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">Camera not available</p>
                <p className="text-sm text-gray-400 text-center">
                  Please allow camera access or try uploading a photo instead
                </p>
              </div>
            ) : capturedImage ? (
              <div className="relative">
                <img
                  src={capturedImage || "/placeholder.svg"}
                  alt="Captured"
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>
            ) : (
              <div className="relative">
                <video ref={videoRef} autoPlay playsInline className="w-full max-h-[70vh] object-contain" />
              </div>
            )}

            {/* Hidden canvas for capturing */}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="mt-8 flex justify-center gap-4">
            {capturedImage ? (
              <>
                <Button
                // onClick={retakePhoto}
                onClick={() => {
                  console.log("keklik retake foto")
                }}
                 variant="outline" className="gap-2" size="lg">
                  <RefreshCw size={16} />
                  Retake Photo
                </Button>
                <Button
                  onClick={handleAnalyze}
                  // onClick={() => {
                  //   console.log("keklik analise")
                  // }}
                  disabled={isLoading}
                  className="gap-2 bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  {isLoading ? "Analyzing..." : "Analyze Colors"}
                  {!isLoading && <ArrowRight size={16} />}
                </Button>
              </>
            ) : (
              <Button
                onClick={capturePhoto}
                disabled={!isStreaming}
                className="gap-2 bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                <Camera size={16} />
                Capture Photo
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? "border-purple-400 bg-gray-800" : "border-gray-600 hover:border-purple-400"}`}
          >
            <input {...getInputProps()} />

            {preview ? (
              <div className="flex flex-col items-center">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-80 max-w-full rounded-lg mb-4 object-contain"
                />
                <p className="text-sm text-gray-400 mb-2">Click or drag to choose a different image</p>
              </div>
            ) : (
              <div className="flex flex-col items-center py-8">
                <Upload size={48} className="text-gray-500 mb-4" />
                <p className="text-lg font-medium mb-2 text-white">
                  {isDragActive ? "Drop your image here" : "Drag & drop your outfit photo here"}
                </p>
                <p className="text-sm text-gray-400 mb-4">or click to browse files</p>
                <p className="text-xs text-gray-500">Supports JPG, PNG, WEBP (max 10MB)</p>
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
        </>
      )}
    </div>
  )
}
