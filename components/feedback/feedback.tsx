import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"

interface FeedbackProps {
  videoUrl: string
  isPlaying: boolean
  togglePlayPause: () => void
}

export function Feedback({ videoUrl, isPlaying, togglePlayPause }: FeedbackProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">Feedback</h2>
      {/* <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-inner">
        <video src={videoUrl} className="w-full h-full object-cover" />
      </div> */}
      <div className="flex justify-center space-x-4">
        <Button size="icon" variant="outline" onClick={() => console.log("Skip backward")}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={togglePlayPause}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button size="icon" variant="outline" onClick={() => console.log("Skip forward")}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-purple-600">Overall Performance</h3>
        <p className="text-gray-700">Your presentation was clear and well-structured. Here are some key points:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Excellent use of vocal variety</li>
          <li>Good eye contact with the audience</li>
          <li>Clear articulation of main ideas</li>
          <li>Consider adding more pauses for emphasis</li>
        </ul>
      </div>
    </div>
  )
}