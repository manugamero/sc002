'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Play, Pause, Plus, Trash2, RefreshCw, Wand2 } from 'lucide-react';

interface ProjectData {
  name: string;
  company: string;
  strategy: {
    interviews: string;
    competitors: string[];
    plan: string[];
  };
  brand: {
    values: { value: string; opposite: string }[];
    names: string[];
    selectedName: string;
  };
  product: {
    features: string[];
    prototype: string;
  };
  communication: {
    social: { name: string; bio: string };
    ads: string;
  };
  launch: {
    questions: { question: string; answer: boolean }[];
  };
}

const initialProjectData: ProjectData = {
  name: '',
  company: '',
  strategy: { interviews: '', competitors: [], plan: [] },
  brand: { values: [], names: [], selectedName: '' },
  product: { features: [], prototype: '' },
  communication: { social: { name: '', bio: '' }, ads: '' },
  launch: { questions: [] }
};

// Pasos individuales
const steps = [
  // Welcome
  { id: 'welcome-1', title: '¿Cómo te llamas?', type: 'text', field: 'name' },
  { id: 'welcome-2', title: '¿Cómo se llama tu empresa?', type: 'text', field: 'company' },
  
  // Strategy
  { id: 'strategy-1', title: '1.1 Entrevistas / Contexto', type: 'textarea', field: 'strategy.interviews' },
  { id: 'strategy-2', title: '1.2 Competidores', type: 'competitors', field: 'strategy.competitors' },
  { id: 'strategy-3', title: '1.3 Plan / Direction', type: 'plan', field: 'strategy.plan' },
  
  // Brand
  { id: 'brand-1', title: '2.1 Valores', type: 'values', field: 'brand.values' },
  { id: 'brand-2', title: '2.2 Nombre', type: 'text', field: 'brand.selectedName' },
  
  // Product
  { id: 'product-1', title: '3.1 Funcionalidades', type: 'features', field: 'product.features' },
  { id: 'product-2', title: '3.2 Prototipo', type: 'text', field: 'product.prototype' },
  
  // Communication
  { id: 'communication-1', title: '4.1 Social Media', type: 'social', field: 'communication.social' },
  { id: 'communication-2', title: '4.2 Campaña', type: 'textarea', field: 'communication.ads' },
  
  // Launch
  { id: 'launch-1', title: '5.1 Validación', type: 'questions', field: 'launch.questions' },
];

const videos = [
  'video01.mp4',
  'video02.mp4',
  'video03.mp4',
  'video04.mp4',
  'video05.mp4',
  'video06.mp4',
  'video07.mp4',
  'video08.mp4',
  'video09.mp4',
  'video10.mp4',
  'video11.mp4',
  'video12.mp4',
  'video13.mp4',
  'video14.mp4',
  'video15.mp4',
  'video16.mp4',
  'video17.mp4',
  'video18.mp4',
  'video19.mp4'
];

export default function HomePage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [projectData, setProjectData] = useState<ProjectData>(initialProjectData);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Forzar autoplay cuando cambie el video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
      setIsVideoPlaying(true);
    }
  }, [currentStepIndex]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleDummyData = () => {
    setProjectData({
      name: 'Juan Pérez',
      company: 'TechStart',
      strategy: {
        interviews: 'Entrevistas realizadas con el equipo fundador y usuarios clave',
        competitors: ['Competitor A', 'Competitor B', 'Competitor C'],
        plan: ['Desarrollar MVP', 'Validar mercado', 'Lanzar beta']
      },
      brand: {
        values: [
          { value: 'Innovación', opposite: 'Tradición' },
          { value: 'Transparencia', opposite: 'Ocultismo' }
        ],
        names: ['TechStart', 'InnovateLab', 'FutureTech'],
        selectedName: 'TechStart'
      },
      product: {
        features: ['Dashboard', 'Autenticación', 'Reportes'],
        prototype: 'https://figma.com/prototype'
      },
      communication: {
        social: { name: 'TechStart', bio: 'Innovando el futuro de la tecnología' },
        ads: 'Campaña de lanzamiento para TechStart'
      },
      launch: {
        questions: [
          { question: '¿Entiendes el producto?', answer: true },
          { question: '¿Te transmite los valores?', answer: true }
        ]
      }
    });
  };

  const updateField = (field: string, value: any) => {
    setProjectData(prev => {
      const newData = { ...prev };
      const keys = field.split('.');
      let current = newData as any;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return newData;
    });
  };

  const getFieldValue = (field: string) => {
    const keys = field.split('.');
    let current = projectData as any;
    
    for (const key of keys) {
      current = current[key];
    }
    return current;
  };

  const renderStep = () => {
    const step = steps[currentStepIndex];
    const value = getFieldValue(step.field);

    switch (step.type) {
      case 'text':
        return (
          <div className="relative">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => updateField(step.field, e.target.value)}
              className="w-full h-12 px-4 pr-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder={step.title}
              autoFocus
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
              <Wand2 className="w-5 h-5" />
            </button>
          </div>
        );

      case 'textarea':
        return (
          <div className="relative">
            <textarea
              value={value || ''}
              onChange={(e) => updateField(step.field, e.target.value)}
              className="w-full h-32 px-4 pr-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
              placeholder={step.title}
              autoFocus
            />
            <button className="absolute right-3 top-3 p-1 text-gray-400 hover:text-gray-600">
              <Wand2 className="w-5 h-5" />
            </button>
          </div>
        );

      case 'competitors':
        return (
          <div className="space-y-3">
            {value.map((competitor: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={competitor}
                    onChange={(e) => {
                      const newCompetitors = [...value];
                      newCompetitors[index] = e.target.value;
                      updateField(step.field, newCompetitors);
                    }}
                    className="w-full h-12 px-4 pr-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Nombre del competidor"
                    autoFocus={index === value.length - 1}
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                    <Wand2 className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    const newCompetitors = value.filter((_: any, i: number) => i !== index);
                    updateField(step.field, newCompetitors);
                  }}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => updateField(step.field, [...value, ''])}
              className="flex items-center gap-2 h-12 px-4 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
              Añadir competidor
            </button>
          </div>
        );

      case 'plan':
        return (
          <div className="space-y-3">
            {value.map((item: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newPlan = [...value];
                    newPlan[index] = e.target.value;
                    updateField(step.field, newPlan);
                  }}
                  className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="Tarea del plan"
                  autoFocus={index === value.length - 1}
                />
                <button
                  onClick={() => {
                    const newPlan = value.filter((_: any, i: number) => i !== index);
                    updateField(step.field, newPlan);
                  }}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => updateField(step.field, [...value, ''])}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Plus className="w-4 h-4" />
              Añadir tarea
            </button>
          </div>
        );

      case 'values':
        return (
          <div className="space-y-3">
            {value.map((item: any, index: number) => (
              <div key={index} className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={item.value || ''}
                  onChange={(e) => {
                    const newValues = [...value];
                    newValues[index] = { ...newValues[index], value: e.target.value };
                    updateField(step.field, newValues);
                  }}
                  className="px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="Valor"
                />
                <input
                  type="text"
                  value={item.opposite || ''}
                  onChange={(e) => {
                    const newValues = [...value];
                    newValues[index] = { ...newValues[index], opposite: e.target.value };
                    updateField(step.field, newValues);
                  }}
                  className="px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="Contrario"
                />
              </div>
            ))}
            <button
              onClick={() => updateField(step.field, [...value, { value: '', opposite: '' }])}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Plus className="w-4 h-4" />
              Añadir valor
            </button>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-3">
            {value.map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const newFeatures = [...value];
                    newFeatures[index] = e.target.value;
                    updateField(step.field, newFeatures);
                  }}
                  className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="Funcionalidad"
                  autoFocus={index === value.length - 1}
                />
                <button
                  onClick={() => {
                    const newFeatures = value.filter((_: any, i: number) => i !== index);
                    updateField(step.field, newFeatures);
                  }}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => updateField(step.field, [...value, ''])}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Plus className="w-4 h-4" />
              Añadir funcionalidad
            </button>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-3">
            <input
              type="text"
              value={value.name || ''}
              onChange={(e) => updateField(step.field, { ...value, name: e.target.value })}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Nombre"
              autoFocus
            />
            <textarea
              value={value.bio || ''}
              onChange={(e) => updateField(step.field, { ...value, bio: e.target.value })}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              rows={2}
              placeholder="Bio"
            />
          </div>
        );

      case 'questions':
        return (
          <div className="space-y-4">
            {value.map((q: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">{q.question}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const newQuestions = [...value];
                      newQuestions[index] = { ...newQuestions[index], answer: true };
                      updateField(step.field, newQuestions);
                    }}
                    className={`px-4 py-2 rounded text-sm ${
                      q.answer === true ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => {
                      const newQuestions = [...value];
                      newQuestions[index] = { ...newQuestions[index], answer: false };
                      updateField(step.field, newQuestions);
                    }}
                    className={`px-4 py-2 rounded text-sm ${
                      q.answer === false ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return <div>Tipo de paso no soportado</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header minimalista */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {currentStepIndex + 1} de {steps.length}
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-1">
              <div 
                className="bg-gray-900 h-1 rounded-full transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content - 2 columnas */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen">
            {/* Video column - Izquierda */}
            <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]">
              <div className="relative w-full h-64 lg:h-full bg-gray-100 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  key={currentStepIndex}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onLoadedData={() => setIsVideoPlaying(true)}
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                >
                  <source src={`/${videos[currentStepIndex]}`} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        if (videoRef.current.paused) {
                          videoRef.current.play();
                        } else {
                          videoRef.current.pause();
                        }
                      }
                    }}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isVideoPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Content column - Derecha */}
            <div className="lg:h-[calc(100vh-5rem)] overflow-y-auto">
              <div className="p-6">
                <motion.div
                  key={currentStepIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {renderStep()}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation - Siempre visible */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
          className="flex items-center space-x-2 px-6 h-12 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>
        
        <button
          onClick={handleDummyData}
          className="px-6 h-12 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Ver ejemplo
        </button>
        
        <button
          onClick={handleNext}
          disabled={currentStepIndex === steps.length - 1}
          className="flex items-center space-x-2 px-6 h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span>Continuar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}