"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Feedback } from "@/components/feedback/feedback";
import { Transcript } from "@/components/feedback/transcript";
import { PossibleQuestions } from "@/components/feedback/possible-questions";
import { useRouter, useSearchParams } from "next/navigation";

interface FeedbackPageProps {
  videoUrl: string;
}

export default function FeedbackPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  // For Drag Drop
  const searchParams = useSearchParams();
  const [fileData, setFileData] = useState<Blob | null>(null); // Allow Blob or null
  const [fileUrl, setFileUrl] = useState<string | null>(null); // Allow Blob or null
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState<string | null>(null); // State to track errors

  useEffect(() => {
    // Retrieve the fileUrl from search params
    const fileUrl = searchParams.get("fileUrl");
    setFileUrl(fileUrl);

    if (fileUrl) {
      fetch(fileUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch the file: ${res.statusText}`);
          }
          return res.blob(); // Convert the response to a blob (file object)
        })
        .then((blob) => {
          setFileData(blob); // Store the blob in state
          setLoading(false); // Set loading to false when data is ready
        })
        .catch((err) => {
          console.error("Error fetching file:", err);
          setError(err.message); // Capture any fetch errors
          setLoading(false); // Stop loading
        });
    } else {
      setLoading(false); // Set loading to false if no fileUrl is present
      setError("No file URL provided"); // Handle case when no fileUrl is provided
    }
  }, [searchParams]); // Update effect if searchParams change

  if (loading) return <p>Loading file...</p>;
  if (error) return <p>Error: {error}</p>;

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Add actual video play/pause logic here
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 gap-8">
        <motion.div
          className="col-span-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="h-full shadow-lg">
            <CardContent className="p-6">
              <Feedback
                videoUrl={fileUrl!}
                isPlaying={isPlaying}
                togglePlayPause={togglePlayPause}
              />
            </CardContent>
          </Card>   
        </motion.div>
        <div className="col-span-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <Transcript />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <PossibleQuestions />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
