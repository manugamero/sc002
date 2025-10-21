'use client';

import { motion } from 'framer-motion';
import { 
  Target, 
  Palette, 
  Smartphone, 
  Megaphone, 
  Rocket,
  CheckCircle,
  Circle
} from 'lucide-react';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  progress: {
    strategy: number;
    brand: number;
    product: number;
    communication: number;
    launch: number;
  };
}

export default function Sidebar({ currentSection, onSectionChange, progress }: SidebarProps) {
  const sections = [
    {
      key: 'strategy',
      label: 'Strategy',
      icon: Target,
      description: 'Entrevistas, benchmark, mercado y planificación',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
    },
    {
      key: 'brand',
      label: 'Brand',
      icon: Palette,
      description: 'Valores, naming, logo y sistema visual',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
    },
    {
      key: 'product',
      label: 'Product',
      icon: Smartphone,
      description: 'Features, prototipo y validación',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
    },
    {
      key: 'communication',
      label: 'Communication',
      icon: Megaphone,
      description: 'Social, ads, merch y validación',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100',
    },
    {
      key: 'launch',
      label: 'Launch',
      icon: Rocket,
      description: 'Go-to-market, post-launch y entregables',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      hoverColor: 'hover:bg-red-100',
    },
  ];

  return (
    <div className="w-80 bg-white shadow-xl h-screen overflow-y-auto">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            🧭 Studio Framework
          </h1>
          <p className="text-gray-600 text-sm">
            Proceso completo de desarrollo de marca y producto
          </p>
        </div>

        <nav className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const sectionProgress = progress[section.key as keyof typeof progress];
            const isActive = currentSection === section.key;
            const isCompleted = sectionProgress === 100;

            return (
              <motion.button
                key={section.key}
                onClick={() => onSectionChange(section.key)}
                className={`
                  w-full text-left p-4 rounded-lg transition-all duration-200
                  ${isActive 
                    ? `${section.bgColor} ${section.color} border-2 border-current` 
                    : `bg-gray-50 text-gray-700 ${section.hoverColor} border-2 border-transparent`
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm">
                        {section.label}
                      </h3>
                      <span className="text-xs font-medium">
                        {Math.round(sectionProgress)}%
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2">
                      {section.description}
                    </p>
                    
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <motion.div
                        className={`h-1.5 rounded-full ${
                          isCompleted ? 'bg-green-500' : section.color.replace('text-', 'bg-')
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${sectionProgress}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-sm text-gray-900 mb-2">
            💡 Consejo
          </h4>
          <p className="text-xs text-gray-600">
            Completa cada sección paso a paso. Puedes usar el botón "🎨 Ideas" 
            para obtener sugerencias automáticas con IA.
          </p>
        </div>
      </div>
    </div>
  );
}
