import LoginButton from "@/components/LoginLogoutButton";
import Image from "next/image";
import GetStartedButton from "@/components/GetStartedButton";
import { Button } from "@/components/ui/button"
	
export default function Home() {
  return (
    
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quizify</h1>
        <LoginButton />
      </nav>

            {/* Hero Section */}
            <main className="bg-[#4B0082] min-h-[calc(100vh-72px)]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Illustration */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="relative w-full aspect-[4/3]">
                  <div className="bg-gray-100 rounded-lg p-4 transform rotate-[-5deg] shadow-xl">
                    <div className="bg-white rounded-lg p-4 h-full">
                      {/* Quiz paper illustration */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-green-400"></div>
                          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-red-400"></div>
                          <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-green-400"></div>
                          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="text-white space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Transform Your Study Materials into Interactive Quizzes!
              </h2>
              <p className="text-lg md:text-xl opacity-90">
                Easily upload class documents and let AI create custom flashcards and quizzes for you. 
                Play in real-time with friends and classmates for an engaging learning experience.
              </p>
              <GetStartedButton />
              
            </div>
          </div>
        </div>
      </main>
      

      <footer className="footer pb-9 px-6 relative mb-0">
      </footer>



      </div>

  );
}


