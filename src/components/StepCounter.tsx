'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StepCounterProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export default function StepCounter({ currentStep, totalSteps, className }: StepCounterProps) {
  const percentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Counter Text */}
      <div className="flex items-baseline gap-1 font-mono text-sm">
        <motion.span 
          key={currentStep}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white font-semibold"
        >
          {String(currentStep + 1).padStart(2, '0')}
        </motion.span>
        <span className="text-gray-500">/</span>
        <span className="text-gray-400">{String(totalSteps).padStart(2, '0')}</span>
      </div>

      {/* Progress Bar */}
      <div className="relative w-24 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

