"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Feedback } from "@/components/feedback/feedback";
import { Transcript } from "@/components/feedback/transcript";
import { PossibleQuestions } from "@/components/feedback/possible-questions";

interface FeedbackPageProps {
  videoUrl: string;
}

export default function FeedbackPage({ videoUrl }: FeedbackPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);

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
                videoUrl={videoUrl}
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
