'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Play, Pause } from 'lucide-react';

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
  'S+C 01-title.mp4',
  'S+C 02 plaza.mp4',
  'S+C 03 cafe.mp4',
  'S+C 04 cat.mp4',
  'S+C 05 vinyl.mp4',
  'S+C 06 radio.mp4',
  'S+C 07 móvil.mp4',
  'S+C 08 flashback.mp4',
  'S+C 09 demo.mp4',
  'S+C 10 Strategy.mp4',
  'S+C 11 Coco.mp4',
  'S+C 12 Ferrari taller.mp4',
  'S+C 13 brand.mp4',
  'S+C 14 Ferrari race.mp4',
  'S+C 15 Nintendo .mp4',
  'S+C 16 products.mp4',
  'S+C 17 Jobs.mp4',
  'S+C 18 messages.mp4',
  'S+C 19 bike.mp4'
];

export default function HomePage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [projectData, setProjectData] = useState<ProjectData>(initialProjectData);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

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
        interviews: 'Entrevistas realizadas con el equipo fundador',
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
        social: { name: 'TechStart', bio: 'Innovando el futuro' },
        ads: 'Campaña de lanzamiento'
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
          <input
            type="text"
            value={value || ''}
            onChange={(e) => updateField(step.field, e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            placeholder={`Escribe tu respuesta...`}
            autoFocus
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => updateField(step.field, e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            rows={4}
            placeholder={`Escribe tu respuesta...`}
            autoFocus
          />
        );

      case 'competitors':
        return (
          <div className="space-y-3">
            {value.map((competitor: string, index: number) => (
              <input
                key={index}
                type="text"
                value={competitor}
                onChange={(e) => {
                  const newCompetitors = [...value];
                  newCompetitors[index] = e.target.value;
                  updateField(step.field, newCompetitors);
                }}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Nombre del competidor"
                autoFocus={index === value.length - 1}
              />
            ))}
            <button
              onClick={() => updateField(step.field, [...value, ''])}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              + Añadir competidor
            </button>
          </div>
        );

      case 'plan':
        return (
          <div className="space-y-3">
            {value.map((item: string, index: number) => (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => {
                  const newPlan = [...value];
                  newPlan[index] = e.target.value;
                  updateField(step.field, newPlan);
                }}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Tarea del plan"
                autoFocus={index === value.length - 1}
              />
            ))}
            <button
              onClick={() => updateField(step.field, [...value, ''])}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              + Añadir tarea
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
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              + Añadir valor
            </button>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-3">
            {value.map((feature: string, index: number) => (
              <input
                key={index}
                type="text"
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...value];
                  newFeatures[index] = e.target.value;
                  updateField(step.field, newFeatures);
                }}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Funcionalidad"
                autoFocus={index === value.length - 1}
              />
            ))}
            <button
              onClick={() => updateField(step.field, [...value, ''])}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              + Añadir funcionalidad
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

      {/* Main content - Fullscreen */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen">
            {/* Video column */}
            <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]">
              <div className="relative w-full h-64 lg:h-full bg-gray-100 rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                >
                  <source src={`/videos/${videos[currentStepIndex]}`} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
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

            {/* Content column */}
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
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {steps[currentStepIndex].title}
                  </h1>
                  
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
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>
        
        <button
          onClick={handleDummyData}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          Ver ejemplo
        </button>
        
        <button
          onClick={handleNext}
          disabled={currentStepIndex === steps.length - 1}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span>Continuar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}