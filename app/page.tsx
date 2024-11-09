import LoginButton from '@/components/LoginLogoutButton';
import { Button } from '@/components/ui/button';
import { FaFilePdf, FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';
import GetStartedButton from '@/components/GetStartedButton';

export default function Home() {
  return (
    <div className='min-h-screen'>
      {/* Navigation */}
      <nav className='px-6 py-4 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Quizify</h1>
        <LoginButton />
      </nav>

      {/* Hero Section */}
      <main className='bg-[#4B0082] min-h-[calc(100vh-72px)]'>
        <div className='max-w-7xl mx-auto px-2 sm:px-6 py-4 sm:py-12'>
          {/* Mobile Layout */}
          <div className='md:hidden flex flex-col items-center gap-6'>
            {/* Title */}
            <h2 className='text-3xl font-bold leading-tight text-center text-white px-4'>
              Transform Your Study Materials into Interactive Quizzes!
            </h2>

            {/* Hero Card */}
            <div className='w-full max-w-[250px] mx-auto'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-lg shadow-lg transform rotate-[-3deg] scale-95'></div>
                <div className='relative w-full aspect-[4/3] bg-white rounded-lg shadow-md p-3 space-y-2'>
                  {/* PDF Card */}
                  <div className='bg-gradient-to-r from-gray-200 to-gray-300 p-3 rounded-lg shadow-xl relative transform hover:scale-105 transition-transform duration-300'>
                    <div className='flex items-center gap-2 mb-1'>
                      <FaFilePdf className='text-red-500 text-xl' />
                      <div className='text-gray-600 font-semibold text-base'>
                        PDF Document
                      </div>
                    </div>
                    <p className='mt-1 text-gray-500 text-xs'>
                      Upload your class notes in PDF format, and let the AI
                      process them into interactive quizzes and flashcards.
                    </p>
                  </div>

                  {/* Quiz Card */}
                  <div className='bg-gradient-to-r from-green-100 to-green-200 p-3 rounded-lg shadow-xl relative transform hover:scale-105 transition-transform duration-300'>
                    <div className='flex items-center gap-2 mb-1'>
                      <FaQuestionCircle className='text-green-500 text-xl' />
                      <div className='text-gray-600 font-semibold text-base'>
                        Quiz Page
                      </div>
                    </div>
                    <p className='mt-1 text-gray-500 text-xs'>
                      Create dynamic quizzes from your notes and track your
                      progress with fun quizzes.
                    </p>
                  </div>

                  {/* Flashcard Card */}
                  <div className='bg-gradient-to-r from-blue-100 to-blue-200 p-3 rounded-lg shadow-xl relative transform hover:scale-105 transition-transform duration-300'>
                    <div className='flex items-center gap-2 mb-1'>
                      <FaCheckCircle className='text-blue-500 text-xl' />
                      <div className='text-gray-600 font-semibold text-base'>
                        Flashcard Preview
                      </div>
                    </div>
                    <p className='mt-1 text-gray-500 text-xs'>
                      Preview your flashcards and quiz answers in a sleek and
                      efficient layout for easy learning.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className='text-sm text-white opacity-90 text-center px-6'>
              Easily upload class documents and let AI create custom flashcards
              and quizzes for you. Play in real-time with friends and classmates
              for an engaging learning experience.
            </p>

            {/* Get Started Button */}
            <div className='w-full px-6'>
              <GetStartedButton />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className='hidden md:grid grid-cols-2 gap-12 items-center'>
            <div className='relative'>
              <div className='relative w-full max-w-md mx-auto flex flex-col items-center'>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-lg shadow-lg transform rotate-[-3deg] scale-95'></div>
                <div className='relative w-full aspect-[4/3] bg-white rounded-lg shadow-md p-6 space-y-4'>
                  <div className='bg-gradient-to-r from-gray-200 to-gray-300 p-6 rounded-lg shadow-xl relative transform hover:scale-105 transition-transform duration-300'>
                    <div className='flex items-center gap-3 mb-4'>
                      <FaFilePdf className='text-red-500 text-3xl' />
                      <div className='text-gray-600 font-semibold text-xl'>
                        PDF Document
                      </div>
                    </div>
                    <p className='mt-2 text-gray-500'>
                      Upload your class notes in PDF format, and let the AI
                      process them into interactive quizzes and flashcards.
                    </p>
                  </div>

                  <div className='bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-lg shadow-xl relative transform hover:scale-105 transition-transform duration-300'>
                    <div className='flex items-center gap-3 mb-4'>
                      <FaQuestionCircle className='text-green-500 text-3xl' />
                      <div className='text-gray-600 font-semibold text-xl'>
                        Quiz Page
                      </div>
                    </div>
                    <p className='mt-2 text-gray-500'>
                      Create dynamic quizzes from your notes and track your
                      progress with fun quizzes.
                    </p>
                  </div>

                  <div className='bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-lg shadow-xl relative transform hover:scale-105 transition-transform duration-300'>
                    <div className='flex items-center gap-3 mb-4'>
                      <FaCheckCircle className='text-blue-500 text-3xl' />
                      <div className='text-gray-600 font-semibold text-xl'>
                        Flashcard Preview
                      </div>
                    </div>
                    <p className='mt-2 text-gray-500'>
                      Preview your flashcards and quiz answers in a sleek and
                      efficient layout for easy learning.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='text-white space-y-8 flex flex-col justify-center items-center'>
              <h2 className='text-5xl font-bold leading-tight text-center'>
                Transform Your Study Materials into Interactive Quizzes!
              </h2>
              <p className='text-xl opacity-90 text-center'>
                Easily upload class documents and let AI create custom
                flashcards and quizzes for you. Play in real-time with friends
                and classmates for an engaging learning experience.
              </p>
              <div className='mt-6 w-full'>
                <GetStartedButton />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className='footer'></footer>
    </div>
  );
}
