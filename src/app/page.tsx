'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Play, Pause, Plus, Trash2, RefreshCw, Wand2, Menu, SkipForward } from 'lucide-react';

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

// Pasos individuales con contenido detallado
const steps = [
  // Welcome
  { id: 'welcome-1', title: '¿Cómo te llamas?', type: 'text', field: 'name' },
  { id: 'welcome-2', title: '¿Cómo se llama tu empresa?', type: 'text', field: 'company' },
  
  // Strategy
  { id: 'strategy-1', title: '1.1 Contexto / Entrevistas', type: 'textarea', field: 'strategy.interviews' },
  { id: 'strategy-2', title: '1.2 Mercado / Competidores', type: 'competitors', field: 'strategy.competitors' },
  { id: 'strategy-3', title: '1.3 Plan / Estrategia', type: 'plan', field: 'strategy.plan' },
  
  // Brand
  { id: 'brand-1', title: '2.1 Valores / Esencia', type: 'values', field: 'brand.values' },
  { id: 'brand-2', title: '2.2 Verbal / Naming', type: 'names', field: 'brand.names' },
  { id: 'brand-3', title: '2.3 Visual / Logo', type: 'logo', field: 'brand.logo' },
  
  // Product
  { id: 'product-1', title: '3.1 Features / MVP', type: 'features', field: 'product.features' },
  { id: 'product-2', title: '3.2 Iteración / Prototipo', type: 'prototype', field: 'product.prototypeLink' },
  { id: 'product-3', title: '3.3 Shipping / Lanzamiento', type: 'questions', field: 'product.shippingQuestions' },
  
  // Messages
  { id: 'messages-1', title: '4.1 Social / Contenido', type: 'social', field: 'messages.social' },
  { id: 'messages-2', title: '4.2 Ads / Campañas', type: 'campaign', field: 'messages.campaignText' },
  { id: 'messages-3', title: '4.3 Merch / Merchandising', type: 'merch', field: 'messages.merchImages' },
  
  // Launch
  { id: 'launch-1', title: '5.1 Validación Final', type: 'questions', field: 'launch.questions' },
  { id: 'launch-2', title: '5.2 Brandbook Generation', type: 'brandbook', field: 'launch.brandbook' },
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleAIGenerate = async (field: string, currentValue: string) => {
    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Genera contenido para el campo: ${field}. Valor actual: ${currentValue}. Genera 3 opciones creativas y relevantes.`,
          type: 'text'
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const suggestions = data.text.split('\n').filter((line: string) => line.trim());
        if (suggestions.length > 0) {
          updateField(field, suggestions[0]);
        }
      }
    } catch (error) {
      console.error('Error generating AI content:', error);
      // Fallback to dummy data
      handleDummyData();
    }
  };

  const getFieldValue = (field: string) => {
    const keys = field.split('.');
    let current = projectData as any;
    
    for (const key of keys) {
      current = current[key];
    }
    return current;
  };

  const getStepContent = (stepId: string) => {
    const contentMap: { [key: string]: string } = {
      'welcome-1': 'Las ideas están por todas partes. Las hay buenas, malas, raras, olvidadas… e icónicas. Pero, ¿cómo lo consiguen? ¿Qué les hizo llegar hasta ahí?',
      'welcome-2': 'Para dar forma a una idea —la tienda que quisiste abrir, la historia que quieres contar— empezamos delimitándola. Una exploración del contexto permite descubrir qué la hace distinta.',
      'strategy-1': 'A todos nos ha pasado: tener una idea y no saber cómo aterrizarla. El primer paso no es diseñar ni planificar, sino escuchar. Las entrevistas con fundadores, equipo y usuarios nos permiten entender la historia desde dentro.',
      'strategy-2': 'Mirar hacia fuera es tan importante como escuchar dentro. El mercado no es una amenaza: es el terreno donde la idea se pone a prueba. Analizamos competidores directos e indirectos, categorías, tendencias y comportamientos.',
      'strategy-3': 'Una vez entendido el contexto y el entorno, llega el momento de elegir una dirección. El plan une la visión con los recursos: define prioridades, metas y tiempos.',
      'brand-1': 'Cuando todo cambia, los valores son lo único que permanece. Aquí se define el propósito, la esencia que da coherencia al resto. No son palabras bonitas para un manifiesto: son decisiones que marcarán cada elección futura.',
      'brand-2': 'Cuando le ponemos nombre a algo, lo volvemos real. El lenguaje convierte la idea en presencia. Aquí trabajamos cómo suena la marca cuando habla: su nombre, su tono, su narrativa.',
      'brand-3': 'El logo es la síntesis más clara de una idea. Una combinación de forma, nombre y símbolo que se vuelve reconocible. Pero el sistema visual va más allá: es el conjunto de decisiones que hacen coherente todo lo que la marca toca.',
      'product-1': 'Definir las funcionalidades es definir el alma del producto. Aquí se decide qué debe hacer, cómo y para quién. El MVP no es una versión reducida: es la esencia funcional.',
      'product-2': 'Iterar no es corregir, es aprender. Los prototipos se diseñan para descubrir lo que aún no sabemos. Se prueban hipótesis, se recogen datos, se afinan detalles.',
      'product-3': 'Llega el momento de ponerlo en marcha. Shipping no es el cierre, es la apertura al mundo real. Lo que antes eran hipótesis se convierte en hechos.',
      'messages-1': 'Las redes no son escaparates, son conversaciones. Aquí se define cómo la marca se presenta, cómo responde, cómo escucha. La presencia digital es ritmo, tono y continuidad.',
      'messages-2': 'Los anuncios son momentos breves de atención. Cada uno debe decir lo máximo en lo mínimo. Aquí se traduce la estrategia en piezas concretas: campañas, clips, titulares.',
      'messages-3': 'El merchandising es la parte tangible del mensaje. Cuando se diseña con intención, se convierte en una extensión emocional de la marca. Una camiseta, un cartel o un cuaderno son recordatorios de pertenencia.',
      'launch-1': 'El lanzamiento no es un final feliz: es el principio del cambio. Lo importante no es llegar, sino escuchar lo que ocurre después. Cada release enseña algo nuevo sobre el producto.',
      'launch-2': 'Todo el proceso se compila en un Brandbook completo. Una síntesis de la estrategia, la identidad, el producto y los mensajes. El documento que cuenta la historia completa de la marca.'
    };
    return contentMap[stepId] || '';
  };

  const renderStep = () => {
    const step = steps[currentStepIndex];
    const value = getFieldValue(step.field);
    const content = getStepContent(step.id);

    switch (step.type) {
      case 'text':
        return (
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={value || ''}
              onChange={(e) => updateField(step.field, e.target.value)}
              style={{
                width: '100%',
                height: '48px',
                padding: '12px 48px 12px 16px',
                fontSize: '18px',
                border: '1px solid #333333',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                color: '#ffffff',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              placeholder={step.title}
              autoFocus
              onFocus={(e) => {
                e.target.style.borderColor = '#4a9eff';
                e.target.style.boxShadow = '0 0 0 2px rgba(74, 158, 255, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#333333';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button 
              onClick={() => handleAIGenerate(step.field, value || '')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '6px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#666666',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = '#666666'}
            >
              <Wand2 style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        );

      case 'textarea':
        return (
          <div className="relative">
            <textarea
              value={value || ''}
              onChange={(e) => updateField(step.field, e.target.value)}
              className="w-full h-32 px-4 pr-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-white placeholder-gray-400 resize-none"
              placeholder={step.title}
              autoFocus
            />
            <button className="absolute right-3 top-3 p-1.5 text-gray-400 hover:text-white transition-colors">
              <Wand2 className="w-4 h-4" />
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
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      display: 'flex', 
      fontFamily: 'Inter, system-ui, sans-serif' 
    }}>
      {/* Video column - Izquierda */}
      <div style={{ 
        width: '50%', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#1a1a1a'
      }}>
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: '100%', 
          overflow: 'hidden' 
        }}>
          <video
            ref={videoRef}
            key={currentStepIndex}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
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
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
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
              style={{ 
                width: '48px', 
                height: '48px', 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                backdropFilter: 'blur(10px)', 
                borderRadius: '50%', 
                border: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isVideoPlaying ? (
                <Pause style={{ width: '24px', height: '24px', color: 'white' }} />
              ) : (
                <Play style={{ width: '24px', height: '24px', color: 'white', marginLeft: '2px' }} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content column - Derecha */}
      <div style={{ 
        width: '50%', 
        height: '100vh', 
        backgroundColor: '#000000', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        {/* Header */}
        <div style={{ 
          position: 'sticky', 
          top: 0, 
          backgroundColor: '#000000', 
          borderBottom: '1px solid #333333', 
          padding: '16px', 
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ 
                width: '32px', 
                height: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: 'transparent', 
                border: 'none', 
                cursor: 'pointer',
                color: '#666666',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = '#666666'}
            >
              <Menu style={{ width: '16px', height: '16px' }} />
            </button>
            <div style={{ fontSize: '14px', color: '#666666' }}>
              {currentStepIndex + 1} de {steps.length}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              style={{ 
                width: '32px', 
                height: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: 'transparent', 
                border: 'none', 
                cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
                color: currentStepIndex === 0 ? '#333333' : '#666666',
                opacity: currentStepIndex === 0 ? 0.5 : 1,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (currentStepIndex > 0) e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                if (currentStepIndex > 0) e.target.style.color = '#666666';
              }}
            >
              <ArrowLeft style={{ width: '16px', height: '16px' }} />
            </button>
            <button
              onClick={handleDummyData}
              style={{ 
                width: '32px', 
                height: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: 'transparent', 
                border: 'none', 
                cursor: 'pointer',
                color: '#666666',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = '#666666'}
            >
              <RefreshCw style={{ width: '16px', height: '16px' }} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex === steps.length - 1}
              style={{ 
                width: '32px', 
                height: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: 'transparent', 
                border: 'none', 
                cursor: currentStepIndex === steps.length - 1 ? 'not-allowed' : 'pointer',
                color: currentStepIndex === steps.length - 1 ? '#333333' : '#666666',
                opacity: currentStepIndex === steps.length - 1 ? 0.5 : 1,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (currentStepIndex < steps.length - 1) e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                if (currentStepIndex < steps.length - 1) e.target.style.color = '#666666';
              }}
            >
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
        
        {/* Menú desplegable */}
        {isMenuOpen && (
          <div style={{ 
            position: 'absolute', 
            top: '100%', 
            left: '16px', 
            right: '16px', 
            marginTop: '8px', 
            backgroundColor: '#1a1a1a', 
            border: '1px solid #333333', 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)', 
            zIndex: 20,
            padding: '8px',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            <div style={{ 
              fontSize: '12px', 
              fontWeight: '500', 
              color: '#666666', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              marginBottom: '8px' 
            }}>
              Navegación
            </div>
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => {
                  setCurrentStepIndex(index);
                  setIsMenuOpen(false);
                }}
                style={{ 
                  width: '100%', 
                  textAlign: 'left', 
                  padding: '8px 12px', 
                  borderRadius: '6px', 
                  fontSize: '14px', 
                  backgroundColor: index === currentStepIndex ? '#1a1a1a' : 'transparent',
                  color: index === currentStepIndex ? '#ffffff' : '#cccccc',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (index !== currentStepIndex) {
                    e.target.style.backgroundColor = '#333333';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentStepIndex) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {step.title}
              </button>
            ))}
              </div>
            )}

        {/* Contenido */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '64px' 
        }}>
          <div style={{ width: '100%', maxWidth: '400px' }}>
            {/* Línea separadora */}
            <div style={{ 
              width: '100%', 
              height: '1px', 
              backgroundColor: '#333333', 
              marginBottom: '32px',
              opacity: 0.08
            }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Contenido narrativo */}
              {getStepContent(steps[currentStepIndex].id) && (
                <div style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#cccccc',
                  marginBottom: '32px',
                  fontStyle: 'italic'
                }}>
                  {getStepContent(steps[currentStepIndex].id)}
              </div>
              )}
              
              {/* Formulario */}
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}