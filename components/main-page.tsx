import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function MainPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-5xl font-bold text-blue-600">OralAI</h1>
        </div>
        <p className="text-xl text-gray-600">
          Revolutionizing presentations and interviews with AI Agents
        </p>
      </div>
    </div>
  );
}
