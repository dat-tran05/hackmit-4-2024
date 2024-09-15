"use client";

import { Button } from "@/components/ui/button";
import { Camera, Upload, MonitorUp, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Component() {
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      console.log("File dropped:", file.name);

      // Navigating to new page for processing and display
      // Create a URL for the file
      const fileUrl = URL.createObjectURL(file);

      // Construct URL with query parameters
      const url = new URL("/feedback", window.location.origin);
      url.searchParams.set("fileUrl", fileUrl);

      // Navigate to the new URL
      router.push(url.href);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-white overflow-hidden">
      <motion.div
        className="absolute top-4 left-4 flex items-center space-x-2 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Mic className="h-8 w-8 text-purple-600" />
        <h1 className="text-2xl font-bold text-purple-600">OrateAI</h1>
      </motion.div>

      <motion.div
        className="text-center space-y-6 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold text-purple-600 mb-4">
          Add a video.
        </h1>
        <h2 className="text-3xl font-bold text-purple-600 mb-8">
          Get instant feedback for improvement.
        </h2>
        {/* <motion.input
          className={"border-4 rounded-lg p-1 outline-purple-600 transition-colors"}
        /> */}
        <motion.div
          className={`border-4 border-dashed rounded-lg p-8 transition-colors ${
            dragActive ? "border-purple-500 bg-purple-100" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <p className="text-gray-500 mb-4">
            Drag & drop a video file anywhere
          </p>
          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => console.log("Upload video clicked")}
            >
              <Upload className="mr-2 h-4 w-4" /> Upload video
            </Button>
            <Button
              size="lg"
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => console.log("Record from camera clicked")}
            >
              <Camera className="mr-2 h-4 w-4" /> Record from camera
            </Button>
            <Button
              size="lg"
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => console.log("Record my screen clicked")}
            >
              <MonitorUp className="mr-2 h-4 w-4" /> Record my screen
            </Button>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 bg-purple-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
      <footer className="absolute bottom-4 text-sm text-gray-500">
        An open source project by HackMIT 2024 |{" "}
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          className="underline"
        >
          im dying chat
        </a>
      </footer>
    </div>
  );
}
