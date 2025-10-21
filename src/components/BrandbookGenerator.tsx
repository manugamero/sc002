'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Sparkles } from 'lucide-react';
import { ProjectData } from '@/types';

interface BrandbookGeneratorProps {
  projectData: ProjectData;
}

export default function BrandbookGenerator({ projectData }: BrandbookGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateBrandbook = async () => {
    setIsGenerating(true);
    
    try {
      // Generate comprehensive brandbook
      const brandbookContent = {
        title: `${projectData.project.name} - Brandbook`,
        project: projectData.project,
        strategy: projectData.strategy,
        brand: projectData.brand,
        product: projectData.product,
        communication: projectData.communication,
        launch: projectData.launch,
        generatedAt: new Date().toISOString(),
      };

      // Create downloadable content
      const content = JSON.stringify(brandbookContent, null, 2);
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectData.project.name}-brandbook.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error generating brandbook:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const totalProgress = Object.values(projectData.progress).reduce((sum, val) => sum + val, 0) / 5;
  const isComplete = totalProgress >= 80;

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">
            📖 Generar Brandbook
          </h3>
          <p className="text-purple-100 mb-2">
            Compila toda la información en un documento completo
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <span>Progreso: {Math.round(totalProgress)}%</span>
            <span>•</span>
            <span>
              {isComplete ? '✅ Listo para generar' : '⏳ Completar más secciones'}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateBrandbook}
            disabled={!isComplete || isGenerating}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all
              ${isComplete && !isGenerating
                ? 'bg-white text-purple-600 hover:bg-gray-100'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <FileText className="w-5 h-5" />
            )}
            <span>
              {isGenerating ? 'Generando...' : 'Generar Brandbook'}
            </span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all"
          >
            <Download className="w-5 h-5" />
            <span>Exportar</span>
          </motion.button>
        </div>
      </div>
      
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-3 bg-white/10 rounded-lg"
        >
          <p className="text-sm text-purple-100">
            💡 Completa al menos el 80% de cada sección para generar el brandbook completo.
            Actualmente tienes {Math.round(totalProgress)}% de progreso.
          </p>
        </motion.div>
      )}
    </div>
  );
}
