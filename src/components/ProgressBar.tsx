'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  sections: Array<{
    key: string;
    title: string;
    icon: any;
    color: string;
  }>;
}

export default function ProgressBar({ currentStep, totalSteps, sections }: ProgressBarProps) {
  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">🧭 Studio Framework</h1>
            <div className="hidden md:flex items-center space-x-2">
              {sections.map((section, index) => {
                const Icon = section.icon;
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                
                return (
                  <motion.div
                    key={section.key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      isCurrent 
                        ? `bg-${section.color}-100 text-${section.color}-700 border-2 border-${section.color}-300` 
                        : isCompleted 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">{section.title}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {currentStep + 1} de {totalSteps}
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}