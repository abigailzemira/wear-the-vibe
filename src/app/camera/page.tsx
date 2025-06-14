"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Camera, RefreshCw, ArrowRight } from "lucide-react"
import { Button } from "@/src/components/ui/button"

export default function CameraPage() {
  const [hasCamera, setHasCamera] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  useEffect(() => {
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

    return () => {
      // Clean up video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

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
    startCamera()
  }

  const handleAnalyze = () => {
    if (!capturedImage) return

    setIsLoading(true)

    // Simulate processing delay
    setTimeout(() => {
      // In a real app, we would process the image here
      router.push("/palette")
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Take a Photo of Your Outfit</h1>

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
            <Button onClick={retakePhoto} variant="outline" className="gap-2" size="lg">
              <RefreshCw size={16} />
              Retake Photo
            </Button>
            <Button
              onClick={handleAnalyze}
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
    </div>
  )
}
