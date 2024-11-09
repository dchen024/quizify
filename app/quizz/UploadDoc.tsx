'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import { ImSpinner2 } from 'react-icons/im';
import { cn } from '@/lib/utils';

const UploadDoc = () => {
  const router = useRouter();
  const [document, setDocument] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'generating' | 'finished'>(
    'idle'
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!document) {
      setError('Please select a document to generate quiz');
      return;
    }
    setStatus('generating');

    const formData = new FormData();
    formData.append('pdf', document as Blob);

    try {
      const res = await fetch('/api/quizz/generate', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.status === 200) {
        setStatus('finished');
        setTimeout(() => {
          router.push('/quizz');
        }, 1000);
      } else {
        setError(data.error || 'Failed to generate quiz');
        setStatus('idle');
      }
    } catch (e) {
      setError('An error occurred while generating the quiz');
      setStatus('idle');
    }
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit} className='w-full'>
        <label
          htmlFor='document'
          className='mb-4 bg-secondary w-full flex
                h-20 rounded-md border-4 border-dashed border-blue-900 relative'
        >
          <div
            className='absolute inset-0 m-auto
                    flex justify-center items-center'
          >
            {document && document?.name
              ? document.name
              : 'Drag and drop your document here'}
          </div>
          <input
            type='file'
            id='document'
            className='relative block w-full h-full z-50 opacity-0'
            onChange={(e) => setDocument(e.target.files?.[0] || null)}
          />
        </label>
        {error && <p className='text-red-600'>{error}</p>}
        <Button
          type='submit'
          size='lg'
          disabled={status === 'generating'}
          className={cn('mt-2 w-36 rounded-lg overflow-hidden')}
        >
          <AnimatePresence mode='wait'>
            {status === 'idle' && (
              <motion.span
                key='generate'
                exit={{
                  opacity: 0,
                  y: -15,
                  transition: { duration: 0.3, type: 'spring' },
                }}
              >
                Generate Quiz
              </motion.span>
            )}
            {status === 'generating' && (
              <motion.span
                key='generating'
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 100, y: 0 }}
                exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
              >
                <ImSpinner2 className='animate-spin' size='19' />
              </motion.span>
            )}
            {status === 'finished' && (
              <motion.span
                key='finished'
                initial={{ opacity: 0, y: 15, scale: 0 }}
                animate={{
                  opacity: 100,
                  y: 0,
                  scale: 1,
                  transition: { delay: 0.1, duration: 0.4 },
                }}
                exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
              >
                <FaCircleCheck size='20' />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </form>
    </div>
  );
};

export default UploadDoc;
