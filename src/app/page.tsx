'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Palette, 
  Smartphone, 
  Megaphone, 
  Rocket,
  ArrowRight,
  ArrowLeft,
  Check,
  Mic,
  MicOff,
  Upload,
  Sparkles,
  Download,
  Save,
  Play,
  Pause
} from 'lucide-react';
import AudioRecorder from '@/components/AudioRecorder';
import DummyContentButton from '@/components/DummyContentButton';

interface ProjectData {
  name: string;
  vision: string;
  values: string[];
  strategy: {
    marketAnalysis: string;
    competition: string;
    targetAudience: string;
    positioning: string;
  };
  brand: {
    visualIdentity: string;
    toneOfVoice: string;
    brandPersonality: string;
    colorPalette: string;
  };
  product: {
    mvpFeatures: string;
    userExperience: string;
    technicalRequirements: string;
    monetization: string;
  };
  communication: {
    socialMediaStrategy: string;
    advertisingCampaigns: string;
    contentStrategy: string;
    prStrategy: string;
  };
  launch: {
    launchPlan: string;
    successMetrics: string;
    timeline: string;
    budget: string;
  };
}

const questions = [
  {
    id: 'welcome',
    title: '¡Bienvenido a Studio Framework!',
    subtitle: 'Vamos a desarrollar tu marca y producto paso a paso',
    type: 'welcome',
    fields: []
  },
  {
    id: 'project-info',
    title: 'Cuéntanos sobre tu proyecto',
    subtitle: 'Empecemos con la información básica',
    type: 'form',
    fields: [
      { key: 'name', label: 'Nombre del Proyecto', type: 'text', placeholder: 'Ej: Mi Startup Innovadora' },
      { key: 'vision', label: 'Visión del Proyecto', type: 'textarea', placeholder: 'Describe tu visión y objetivos...' }
    ]
  },
  {
    id: 'values',
    title: '¿Cuáles son tus valores principales?',
    subtitle: 'Los valores que guían tu proyecto',
    type: 'form',
    fields: [
      { key: 'values', label: 'Valores Principales', type: 'tags', placeholder: 'Escribe un valor y presiona Enter' }
    ]
  },
  {
    id: 'strategy',
    title: 'Estrategia de Mercado',
    subtitle: 'Analicemos tu mercado y competencia',
    type: 'form',
    fields: [
      { key: 'marketAnalysis', label: 'Análisis de Mercado', type: 'textarea', placeholder: 'Describe el mercado objetivo, tamaño, tendencias...' },
      { key: 'competition', label: 'Competencia', type: 'textarea', placeholder: 'Identifica competidores directos e indirectos...' },
      { key: 'targetAudience', label: 'Audiencia Objetivo', type: 'textarea', placeholder: 'Define tu audiencia ideal, demografía, necesidades...' },
      { key: 'positioning', label: 'Posicionamiento', type: 'textarea', placeholder: 'Cómo te diferencias de la competencia...' }
    ]
  },
  {
    id: 'brand',
    title: 'Identidad de Marca',
    subtitle: 'Desarrollemos la personalidad de tu marca',
    type: 'form',
    fields: [
      { key: 'visualIdentity', label: 'Identidad Visual', type: 'textarea', placeholder: 'Describe el estilo visual, colores, tipografía...' },
      { key: 'toneOfVoice', label: 'Tono de Voz', type: 'textarea', placeholder: 'Cómo se comunica tu marca, personalidad...' },
      { key: 'brandPersonality', label: 'Personalidad de Marca', type: 'textarea', placeholder: 'Atributos y características de tu marca...' },
      { key: 'colorPalette', label: 'Paleta de Colores', type: 'textarea', placeholder: 'Colores principales y secundarios...' }
    ]
  },
  {
    id: 'product',
    title: 'Desarrollo del Producto',
    subtitle: 'Definamos las características de tu producto',
    type: 'form',
    fields: [
      { key: 'mvpFeatures', label: 'Características MVP', type: 'textarea', placeholder: 'Funcionalidades esenciales para el lanzamiento...' },
      { key: 'userExperience', label: 'Experiencia de Usuario', type: 'textarea', placeholder: 'Cómo será la experiencia del usuario...' },
      { key: 'technicalRequirements', label: 'Requisitos Técnicos', type: 'textarea', placeholder: 'Tecnologías, infraestructura, integraciones...' },
      { key: 'monetization', label: 'Modelo de Monetización', type: 'textarea', placeholder: 'Cómo generarás ingresos...' }
    ]
  },
  {
    id: 'communication',
    title: 'Estrategia de Comunicación',
    subtitle: 'Cómo te comunicarás con tu audiencia',
    type: 'form',
    fields: [
      { key: 'socialMediaStrategy', label: 'Estrategia de Redes Sociales', type: 'textarea', placeholder: 'Plataformas, contenido, frecuencia...' },
      { key: 'advertisingCampaigns', label: 'Campañas Publicitarias', type: 'textarea', placeholder: 'Canales, presupuesto, objetivos...' },
      { key: 'contentStrategy', label: 'Estrategia de Contenido', type: 'textarea', placeholder: 'Tipos de contenido, calendario, recursos...' },
      { key: 'prStrategy', label: 'Estrategia de PR', type: 'textarea', placeholder: 'Relaciones con medios, eventos, partnerships...' }
    ]
  },
  {
    id: 'launch',
    title: 'Plan de Lanzamiento',
    subtitle: 'Preparémonos para el lanzamiento',
    type: 'form',
    fields: [
      { key: 'launchPlan', label: 'Plan de Lanzamiento', type: 'textarea', placeholder: 'Fases del lanzamiento, hitos, recursos...' },
      { key: 'successMetrics', label: 'Métricas de Éxito', type: 'textarea', placeholder: 'KPIs, objetivos cuantificables...' },
      { key: 'timeline', label: 'Timeline', type: 'textarea', placeholder: 'Cronograma detallado del lanzamiento...' },
      { key: 'budget', label: 'Presupuesto', type: 'textarea', placeholder: 'Inversión necesaria, distribución de recursos...' }
    ]
  },
  {
    id: 'brandbook',
    title: '¡Tu Brandbook está listo!',
    subtitle: 'Hemos compilado toda la información en un documento completo',
    type: 'completion',
    fields: []
  }
];

export default function HomePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    vision: '',
    values: [],
    strategy: {
      marketAnalysis: '',
      competition: '',
      targetAudience: '',
      positioning: ''
    },
    brand: {
      visualIdentity: '',
      toneOfVoice: '',
      brandPersonality: '',
      colorPalette: ''
    },
    product: {
      mvpFeatures: '',
      userExperience: '',
      technicalRequirements: '',
      monetization: ''
    },
    communication: {
      socialMediaStrategy: '',
      advertisingCampaigns: '',
      contentStrategy: '',
      prStrategy: ''
    },
    launch: {
      launchPlan: '',
      successMetrics: '',
      timeline: '',
      budget: ''
    }
  });

  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const updateProjectData = (field: string, value: any) => {
    if (field === 'values') {
      setProjectData(prev => ({ ...prev, values: value }));
    } else if (field.includes('.')) {
      const [section, key] = field.split('.');
      setProjectData(prev => ({
        ...prev,
        [section]: { ...prev[section as keyof typeof prev], [key]: value }
      }));
    } else {
      setProjectData(prev => ({ ...prev, [field]: value }));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAudioTranscription = async (transcript: string) => {
    setTranscription(transcript);
    // Aquí podrías usar IA para extraer información específica
  };

  const generateBrandbook = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    const brandbookData = {
      project: projectData,
      generatedAt: new Date().toISOString(),
      questions: questions
    };
    
    const dataStr = JSON.stringify(brandbookData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `${projectData.name || 'project'}-brandbook.json`);
    linkElement.click();
  };

  const fillDummyData = () => {
    setProjectData({
      name: 'TechFlow',
      vision: 'Revolucionar la gestión de flujos de trabajo con IA',
      values: ['Innovación', 'Transparencia', 'Excelencia', 'Colaboración'],
      strategy: {
        marketAnalysis: 'Mercado de herramientas de productividad en crecimiento del 15% anual',
        competition: 'Notion, Asana, Monday.com - diferenciación por IA nativa',
        targetAudience: 'Equipos remotos de 10-100 personas, startups tecnológicas',
        positioning: 'La primera plataforma de productividad con IA integrada'
      },
      brand: {
        visualIdentity: 'Diseño minimalista, colores azul y blanco, tipografía moderna',
        toneOfVoice: 'Profesional pero accesible, innovador pero confiable',
        brandPersonality: 'Inteligente, eficiente, colaborativo, visionario',
        colorPalette: 'Azul primario #2563EB, Blanco #FFFFFF, Gris #6B7280'
      },
      product: {
        mvpFeatures: 'Dashboard principal, gestión de tareas, IA para automatización, colaboración en tiempo real',
        userExperience: 'Interfaz intuitiva, onboarding guiado, personalización por usuario',
        technicalRequirements: 'React/Next.js, Supabase, OpenAI API, Vercel hosting',
        monetization: 'Freemium: plan gratuito hasta 5 usuarios, Pro $10/usuario/mes'
      },
      communication: {
        socialMediaStrategy: 'LinkedIn para B2B, Twitter para updates técnicos, YouTube para demos',
        advertisingCampaigns: 'Google Ads para "productivity tools", LinkedIn Ads para empresas',
        contentStrategy: 'Blog técnico, case studies, webinars sobre productividad',
        prStrategy: 'Press releases en TechCrunch, Product Hunt launch, podcast appearances'
      },
      launch: {
        launchPlan: 'Beta cerrada con 50 empresas, feedback loop, lanzamiento público en 3 meses',
        successMetrics: '1000 usuarios activos, $50K MRR, 4.5+ rating en reviews',
        timeline: '3 meses desarrollo, 1 mes beta, lanzamiento Q2 2024',
        budget: '$100K para marketing, $50K para desarrollo, $25K para operaciones'
      }
    });
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    
    if (question.type === 'welcome') {
      return (
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {question.title}
            </h1>
            <p className="text-xl text-gray-600">
              {question.subtitle}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
          >
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">¿Cómo te gustaría empezar?</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={nextQuestion}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    <span>Empezar desde cero</span>
                  </button>
                  <button
                    onClick={fillDummyData}
                    className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Ver ejemplo</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    if (question.type === 'completion') {
      return (
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {question.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {question.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Proyecto:</h3>
                <p className="text-gray-700">{projectData.name || 'Sin nombre'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Visión:</h3>
                <p className="text-gray-700">{projectData.vision || 'Sin definir'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Valores:</h3>
                <p className="text-gray-700">{projectData.values.join(', ') || 'Sin definir'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Secciones completadas:</h3>
                <p className="text-gray-700">{questions.length - 2}</p>
              </div>
            </div>

            <button
              onClick={generateBrandbook}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg text-lg font-semibold disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Descargar Brandbook</span>
                </div>
              )}
            </button>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {question.title}
            </h1>
            <p className="text-lg text-gray-600">
              {question.subtitle}
            </p>
          </div>

          <div className="space-y-6">
            {question.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                
                {field.type === 'textarea' ? (
                  <textarea
                    value={field.key.includes('.') 
                      ? projectData[field.key.split('.')[0] as keyof typeof projectData][field.key.split('.')[1] as keyof any] || ''
                      : projectData[field.key as keyof typeof projectData] || ''
                    }
                    onChange={(e) => updateProjectData(field.key, e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    rows={3}
                    placeholder={field.placeholder}
                  />
                ) : field.type === 'tags' ? (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {projectData.values.map((value, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg">
                          {value}
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          updateProjectData('values', [...projectData.values, e.currentTarget.value.trim()]);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder={field.placeholder}
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    value={projectData[field.key as keyof typeof projectData] || ''}
                    onChange={(e) => updateProjectData(field.key, e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}

            {currentQuestion === 1 && (
              <div className="mt-8">
                <AudioRecorder
                  onTranscription={handleAudioTranscription}
                  isRecording={isRecording}
                  setIsRecording={setIsRecording}
                />
                {transcription && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Transcripción:</h3>
                    <p className="text-gray-700">{transcription}</p>
                  </div>
                )}
              </div>
            )}

            <DummyContentButton onClick={fillDummyData} />
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">🧭 Studio Framework</h1>
              <div className="hidden md:flex items-center space-x-2">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentQuestion 
                        ? 'bg-blue-500 scale-125' 
                        : index < currentQuestion 
                          ? 'bg-green-500' 
                          : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {currentQuestion + 1} de {questions.length}
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex items-center justify-center px-4"
          >
            {renderQuestion()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Anterior</span>
        </button>

        <button
          onClick={nextQuestion}
          disabled={currentQuestion === questions.length - 1}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span>
            {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
          </span>
          {currentQuestion < questions.length - 1 && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}