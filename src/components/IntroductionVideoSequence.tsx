'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoPlayer from './VideoPlayer';
import { getAvailableIntroductionVideos, videoExists } from '@/lib/videoMapping';

interface IntroductionVideoSequenceProps {
  onComplete?: () => void;
  onSkip?: () => void;
  className?: string;
}

export default function IntroductionVideoSequence({ 
  onComplete, 
  onSkip,
  className = '' 
}: IntroductionVideoSequenceProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [availableVideos, setAvailableVideos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const videos = getAvailableIntroductionVideos();
    const existingVideos = videos.filter(videoExists);
    setAvailableVideos(existingVideos);
    setIsLoading(false);
  }, []);

  const handleVideoEnd = () => {
    if (currentVideoIndex < availableVideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      onComplete?.();
    }
  };

  const handleSkip = () => {
    onSkip?.();
  };

  const handleSkipToNext = () => {
    if (currentVideoIndex < availableVideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      onComplete?.();
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (availableVideos.length === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <p className="text-gray-500">No hay videos de introducción disponibles</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVideoIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <VideoPlayer
            videoPath={availableVideos[currentVideoIndex]}
            autoPlay={true}
            onEnded={handleVideoEnd}
            className="w-full h-full"
          />
          
          {/* Overlay con controles */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handleSkipToNext}
              className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-lg hover:bg-opacity-30 transition-all"
            >
              Siguiente
            </button>
            <button
              onClick={handleSkip}
              className="px-4 py-2 bg-red-500 bg-opacity-80 backdrop-blur-sm text-white rounded-lg hover:bg-opacity-100 transition-all"
            >
              Saltar introducción
            </button>
          </div>
          
          {/* Indicador de progreso */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center space-x-2 text-white">
              <span className="text-sm">
                Video {currentVideoIndex + 1} de {availableVideos.length}
              </span>
              <div className="flex-1 bg-white bg-opacity-20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ 
                    width: `${((currentVideoIndex + 1) / availableVideos.length) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
