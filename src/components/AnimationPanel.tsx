'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Check } from 'lucide-react';

interface AnimationPanelProps {
  currentAnimation: string;
  onAnimationChange: (animationType: string) => void;
}

const animations = [
  {
    id: 'fade',
    name: 'Fade In',
    description: 'Aparición suave con opacidad',
    icon: '✨'
  },
  {
    id: 'slide-left',
    name: 'Slide Left',
    description: 'Desliza desde la izquierda',
    icon: '←'
  },
  {
    id: 'slide-right',
    name: 'Slide Right',
    description: 'Desliza desde la derecha',
    icon: '→'
  },
  {
    id: 'typewriter',
    name: 'Typewriter',
    description: 'Efecto máquina de escribir',
    icon: '⌨️'
  },
  {
    id: 'cascade',
    name: 'Cascade',
    description: 'Cascada rápida',
    icon: '⚡'
  },
  {
    id: 'zoom',
    name: 'Zoom In',
    description: 'Zoom suave desde el centro',
    icon: '🔍'
  }
];

export default function AnimationPanel({ currentAnimation, onAnimationChange }: AnimationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer transition-colors duration-200 ${
          isOpen ? 'text-blue-400' : 'text-white hover:text-gray-300'
        }`}
        title="Panel de animaciones"
      >
        <Settings2 className="w-4 h-4" />
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 w-80 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-blue-400" />
                  <h3 className="text-white font-medium text-sm">Animaciones de Intro</h3>
                </div>
                <p className="text-gray-400 text-xs mt-1">Selecciona el estilo de transición</p>
              </div>

              {/* Animation Options */}
              <div className="p-2 max-h-96 overflow-y-auto">
                {animations.map((animation) => (
                  <motion.button
                    key={animation.id}
                    onClick={() => {
                      onAnimationChange(animation.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 mb-1 ${
                      currentAnimation === animation.id
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : 'bg-transparent hover:bg-white/5 border border-transparent'
                    }`}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-2xl">{animation.icon}</div>
                    <div className="flex-1 text-left">
                      <div className="text-white text-sm font-medium">{animation.name}</div>
                      <div className="text-gray-400 text-xs">{animation.description}</div>
                    </div>
                    {currentAnimation === animation.id && (
                      <Check className="w-4 h-4 text-blue-400" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-gray-700/50 bg-gray-800/30">
                <p className="text-gray-500 text-xs text-center">
                  Los cambios se aplican instantáneamente
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

