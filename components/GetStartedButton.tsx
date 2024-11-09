"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const GetStartedButton = () => {
  const router = useRouter();
  return (
    <Button
      className="bg-white text-[#4B0082] hover:bg-gray-100 px-8 py-6 rounded-full text-lg font-semibold"
      onClick={() => {
        router.push("/login");
      }}
    >
      Get Started
    </Button>
  );
};

export default GetStartedButton;
