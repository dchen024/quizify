'use client';
import LoginButton from "@/components/LoginLogoutButton";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { useState } from "react";

export default function Home() {
  const [started, setStarted] = useState(false);

  const handleNext = () => {
    setStarted(true);
  }
  return (
    <div className="flex flex-col flex-1">
    <main className="flex justify-center flex-1">
        {!started? <h1 className="text-3xl font-bold">Welcome to Your AI Quiz 👋</h1> :
        <div>
            <h2 className="text-3xl font-bold">How well do you know NEXT JS?</h2>
            <div className="grid grid-cols-1 gap-6 m-6">
                <Button>Beginner</Button>
                <Button>Intermediate</Button>
                <Button>Advanced</Button>
                <Button>Expert</Button>
            </div>
        </div>
        }
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <LoginButton />
        </div>
    </main>
      <footer className="footer pb-9 px-6 relative mb-0">
        <Button onClick={handleNext}>{!started ? 'Start' : 'Next'}</Button>
      </footer>
      </div>

  );
}
