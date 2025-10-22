'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Hash } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step {
  id: string;
  title: string;
  type: string;
}

interface NavigationDropdownProps {
  steps: Step[];
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  className?: string;
}

export default function NavigationDropdown({ 
  steps, 
  currentStepIndex, 
  onStepChange,
  className 
}: NavigationDropdownProps) {
  return (
    <Select
      value={String(currentStepIndex)}
      onValueChange={(value) => onStepChange(Number(value))}
    >
      <SelectTrigger 
        className={`w-[200px] bg-black/50 border-gray-700 text-white hover:bg-black/70 transition-colors ${className}`}
      >
        <div className="flex items-center gap-2">
          <Hash className="w-3 h-3 text-white" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-gray-900 border-gray-700 max-h-[400px]">
        {steps.map((step, index) => {
          const isSection = step.type === 'mode-selector';
          return (
            <SelectItem 
              key={step.id} 
              value={String(index)}
              className={`text-white hover:bg-gray-800 cursor-pointer ${
                isSection ? 'font-semibold text-blue-400 mt-2' : 'pl-6 text-gray-300'
              } ${index === currentStepIndex ? 'bg-gray-800' : ''}`}
            >
              {step.title}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

