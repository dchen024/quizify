import LoginButton from "@/components/LoginLogoutButton";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">WELCOME ✋</h1>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <LoginButton />
        </div>
    </main>
  );
}
