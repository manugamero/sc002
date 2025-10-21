'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateDummyContent } from '@/lib/openai';
import { generateDummyProjectData } from '@/lib/dummyData';

interface DummyContentButtonProps {
  section: string;
  clientType: 'A' | 'B' | 'C';
  onContentGenerated: (content: any) => void;
  variant?: 'full' | 'quick';
}

export default function DummyContentButton({ 
  section, 
  clientType, 
  onContentGenerated, 
  variant = 'quick' 
}: DummyContentButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    
    try {
      if (variant === 'full') {
        // Generar contenido completo para toda la sección
        const dummyData = generateDummyProjectData(clientType);
        onContentGenerated(dummyData);
      } else {
        // Generar contenido específico para la sección
        const content = await generateDummyContent(section, clientType);
        onContentGenerated({ content });
      }
    } catch (error) {
      console.error('Error generating dummy content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleGenerateContent}
      disabled={isGenerating}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
        ${variant === 'full' 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600' 
          : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl transform hover:scale-105
      `}
    >
      {isGenerating ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Sparkles className="w-4 h-4" />
      )}
      <span className="font-medium">
        {isGenerating 
          ? 'Generando...' 
          : variant === 'full' 
            ? `✨ Rellenar ${section} completo` 
            : `🎨 Ideas para ${section}`
        }
      </span>
    </button>
  );
}
