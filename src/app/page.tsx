'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
    launchStrategy: string;
    metrics: string;
    timeline: string;
    budget: string;
  };
}

const initialProjectData: ProjectData = {
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
    launchStrategy: '',
    metrics: '',
    timeline: '',
    budget: ''
  }
};

const sections = [
  { key: 'welcome', title: 'Bienvenida', icon: Target },
  { key: 'strategy', title: 'Strategy', icon: Target },
  { key: 'brand', title: 'Brand', icon: Palette },
  { key: 'product', title: 'Product', icon: Smartphone },
  { key: 'communication', title: 'Communication', icon: Megaphone },
  { key: 'launch', title: 'Launch', icon: Rocket },
  { key: 'brandbook', title: 'Brandbook', icon: Target },
];

export default function HomePage() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [projectData, setProjectData] = useState<ProjectData>(initialProjectData);
  const [isRecording, setIsRecording] = useState(false);

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleDummyData = () => {
    setProjectData({
      name: 'TechStart',
      vision: 'Revolucionar la industria tecnológica con soluciones innovadoras',
      values: ['Innovación', 'Transparencia', 'Excelencia'],
      strategy: {
        marketAnalysis: 'Mercado en crecimiento con oportunidades en IA',
        competition: 'Competidores establecidos pero con nichos disponibles',
        targetAudience: 'Empresas medianas y startups tecnológicas',
        positioning: 'Solución integral y personalizada'
      },
      brand: {
        visualIdentity: 'Diseño moderno y minimalista',
        toneOfVoice: 'Profesional pero accesible',
        brandPersonality: 'Innovador, confiable, dinámico',
        colorPalette: 'Azul corporativo, gris moderno, acentos verdes'
      },
      product: {
        mvpFeatures: 'Dashboard principal, autenticación, reportes básicos',
        userExperience: 'Interfaz intuitiva y responsive',
        technicalRequirements: 'React, Node.js, PostgreSQL',
        monetization: 'SaaS con planes freemium y premium'
      },
      communication: {
        socialMediaStrategy: 'LinkedIn para B2B, Twitter para noticias',
        advertisingCampaigns: 'Google Ads, LinkedIn Ads',
        contentStrategy: 'Blog técnico, webinars, casos de estudio',
        prStrategy: 'Relaciones con medios tech, conferencias'
      },
      launch: {
        launchStrategy: 'Soft launch con beta users, luego público general',
        metrics: 'Usuarios activos, retención, ingresos',
        timeline: '6 meses de desarrollo, 3 meses de testing',
        budget: '$50,000 para marketing y desarrollo'
      }
    });
  };

  const renderWelcomeSection = () => (
    <div className="text-center">
      <div className="mb-8">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Target className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ¡Bienvenido a Studio Framework!
        </h1>
        <p className="text-xl text-gray-600">
          Vamos a desarrollar tu marca y producto paso a paso
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">¿Cómo te gustaría empezar?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleNext}
                className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Empezar desde cero</span>
              </button>
              <button 
                onClick={handleDummyData}
                className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                <span>Ver ejemplo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    const section = sections[currentSectionIndex];
    
    if (section.key === 'welcome') {
      return renderWelcomeSection();
    }

    return (
      <div className="text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <section.icon className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {section.title}
          </h1>
          <p className="text-xl text-gray-600">
            Información sobre {section.title.toLowerCase()}
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Contenido de {section.title}</h3>
              <p className="text-gray-600">
                Esta es la sección de {section.title.toLowerCase()}. Aquí puedes agregar el contenido específico.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">🧭 Studio Framework</h1>
              <div className="hidden md:flex items-center space-x-2">
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentSectionIndex === index ? 'bg-blue-500 scale-125' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {currentSectionIndex + 1} de {sections.length}
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentSectionIndex + 1) / sections.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-20 pb-20">
        <motion.div
          key={currentSectionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen flex items-center justify-center px-4"
        >
          {renderSection()}
        </motion.div>
      </main>

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentSectionIndex === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Anterior</span>
        </button>
        <button
          onClick={handleNext}
          disabled={currentSectionIndex === sections.length - 1}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span>Siguiente</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}