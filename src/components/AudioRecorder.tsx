'use client';

import { useState, useRef } from 'react';
import { Mic, MicOff, Play, Square } from 'lucide-react';
import { transcribeAudio, extractProjectInfo } from '@/lib/openai';

interface AudioRecorderProps {
  onTranscriptionComplete: (data: any) => void;
}

export default function AudioRecorder({ onTranscriptionComplete }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      
      audio.play();
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const processAudio = async () => {
    if (!audioBlob) return;
    
    setIsProcessing(true);
    try {
      const transcription = await transcribeAudio(audioBlob);
      const projectInfo = await extractProjectInfo(transcription);
      
      onTranscriptionComplete({
        transcription,
        projectInfo,
      });
    } catch (error) {
      console.error('Error processing audio:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">🎤 Cuéntanos sobre tu proyecto</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <Mic className="w-5 h-5" />
              <span>Grabar</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <MicOff className="w-5 h-5" />
              <span>Detener</span>
            </button>
          )}
          
          {audioBlob && (
            <>
              {!isPlaying ? (
                <button
                  onClick={playAudio}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Play className="w-5 h-5" />
                  <span>Reproducir</span>
                </button>
              ) : (
                <button
                  onClick={stopAudio}
                  className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Square className="w-5 h-5" />
                  <span>Detener</span>
                </button>
              )}
              
              <button
                onClick={processAudio}
                disabled={isProcessing}
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>✨</span>
                )}
                <span>{isProcessing ? 'Procesando...' : 'Analizar'}</span>
              </button>
            </>
          )}
        </div>
        
        <p className="text-sm text-gray-600">
          Graba un audio explicando tu proyecto, visión, valores y objetivos. 
          Nuestro sistema lo analizará y pre-llenará los campos iniciales.
        </p>
      </div>
    </div>
  );
}
