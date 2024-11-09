'use client';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const GetStartedButton = () => {
  const router = useRouter();
  return (
    <div className='relative overflow-hidden rounded-full dark:bg-zinc-900 bg-white shadow border dark:border-zinc-800 group border-zinc-400 p-0.5'>
      <span className='absolute inset-[-1000%] animate-[spin_5s_linear_infinite_reverse] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#fff_0%,#09090B_7%)] bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#fff_5%)] group-hover:bg-none' />
      <Button
        className={cn(
          'h-10 px-8 w-full rounded-full font-semibold backdrop-blur-xl',
          'bg-white text-[#4B0082] hover:bg-gray-100'
        )}
        onClick={() => {
          router.push('/login');
        }}
      >
        Get Started
      </Button>
    </div>
  );
};

export default GetStartedButton;
