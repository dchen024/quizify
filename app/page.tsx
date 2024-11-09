import LoginButton from "@/components/LoginLogoutButton";
import { Button } from "@/components/ui/button";
import { FaFilePdf, FaQuestionCircle, FaCheckCircle } from "react-icons/fa"; 

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

            <div className="relative">
              <div className="relative w-full max-w-md mx-auto flex flex-col items-center">
                
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-lg shadow-lg transform rotate-[-3deg] scale-95"></div>
                
                <div className="relative w-full aspect-[4/3] bg-white rounded-lg shadow-md p-6 space-y-4">
                  
                  <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-6 rounded-lg shadow-xl relative transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <FaFilePdf className="text-red-500 text-3xl" />
                      <div className="text-gray-600 font-semibold text-xl">PDF Document</div>
                    </div>
                    <p className="mt-2 text-gray-500">Upload your class notes in PDF format, and let the AI process them into interactive quizzes and flashcards.</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-lg shadow-xl relative transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <FaQuestionCircle className="text-green-500 text-3xl" />
                      <div className="text-gray-600 font-semibold text-xl">Quiz Page</div>
                    </div>
                    <p className="mt-2 text-gray-500">Create dynamic quizzes from your notes and track your progress with fun quizzes.</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-lg shadow-xl relative transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <FaCheckCircle className="text-blue-500 text-3xl" />
                      <div className="text-gray-600 font-semibold text-xl">Flashcard Preview</div>
                    </div>
                    <p className="mt-2 text-gray-500">Preview your flashcards and quiz answers in a sleek and efficient layout for easy learning.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-white space-y-8 flex flex-col justify-center items-center">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-center">
                Transform Your Study Materials into Interactive Quizzes!
              </h2>
              <p className="text-lg md:text-xl opacity-90 text-center">
                Easily upload class documents and let AI create custom flashcards and quizzes for you.
                Play in real-time with friends and classmates for an engaging learning experience.
              </p>
              <div className="mt-6 flex justify-center items-center">
                <Button 
                  className="bg-white text-[#4B0082] hover:bg-purple-200 px-8 py-6 rounded-full text-lg font-semibold transition-colors duration-300"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer pb-9 px-6 relative mb-0">
      </footer>
    </div>
  );
}
