'use client';

import { useState, useEffect } from 'react';
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
  Pause,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface ProjectData {
  name: string;
  company: string;
  vision: string;
  values: string[];
  strategy: {
    interviews: string;
    competitors: string[];
    positioning: { name: string; x: number; y: number }[];
    plan: { id: string; text: string; group: string }[];
  };
  brand: {
    values: { value: string; opposite: string }[];
    names: string[];
    selectedName: string;
    logo: {
      icon: string;
      typography: string;
      color: string;
      background: string;
    };
  };
  product: {
    features: string[];
    flow: { from: string; to: string }[];
    prototype: string;
  };
  communication: {
    social: {
      avatar: string;
      background: string;
      name: string;
      bio: string;
    };
    ads: string;
    merch: string[];
  };
  launch: {
    questions: { question: string; answer: boolean }[];
  };
}

const initialProjectData: ProjectData = {
  name: '',
  company: '',
  vision: '',
  values: [],
  strategy: {
    interviews: '',
    competitors: [],
    positioning: [],
    plan: []
  },
  brand: {
    values: [],
    names: [],
    selectedName: '',
    logo: {
      icon: 'circle',
      typography: 'Arial',
      color: '#000000',
      background: '#ffffff'
    }
  },
  product: {
    features: [],
    flow: [],
    prototype: ''
  },
  communication: {
    social: {
      avatar: '',
      background: '',
      name: '',
      bio: ''
    },
    ads: '',
    merch: []
  },
  launch: {
    questions: []
  }
};

const sections = [
  { key: 'welcome', title: 'Bienvenida', icon: Target },
  { key: 'strategy', title: 'Strategy', icon: Target },
  { key: 'brand', title: 'Brand', icon: Palette },
  { key: 'product', title: 'Product', icon: Smartphone },
  { key: 'communication', title: 'Messages', icon: Megaphone },
  { key: 'launch', title: 'Launch', icon: Rocket },
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
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [projectData, setProjectData] = useState<ProjectData>(initialProjectData);
  const [isRecording, setIsRecording] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentVideo(currentSectionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentVideo(currentSectionIndex - 1);
    }
  };

  const handleDummyData = () => {
    setProjectData({
      name: 'Juan Pérez',
      company: 'TechStart',
      vision: 'Revolucionar la industria tecnológica con soluciones innovadoras',
      values: ['Innovación', 'Transparencia', 'Excelencia'],
      strategy: {
        interviews: 'Entrevistas realizadas con el equipo fundador y usuarios clave',
        competitors: ['Competitor A', 'Competitor B', 'Competitor C'],
        positioning: [
          { name: 'TechStart', x: 0.7, y: 0.8 },
          { name: 'Competitor A', x: 0.3, y: 0.6 },
          { name: 'Competitor B', x: 0.5, y: 0.4 },
          { name: 'Competitor C', x: 0.8, y: 0.3 }
        ],
        plan: [
          { id: '1', text: 'Desarrollar MVP', group: 'Desarrollo' },
          { id: '2', text: 'Validar mercado', group: 'Validación' },
          { id: '3', text: 'Lanzar beta', group: 'Lanzamiento' }
        ]
      },
      brand: {
        values: [
          { value: 'Innovación', opposite: 'Tradición' },
          { value: 'Transparencia', opposite: 'Ocultismo' },
          { value: 'Excelencia', opposite: 'Mediocridad' }
        ],
        names: ['TechStart', 'InnovateLab', 'FutureTech'],
        selectedName: 'TechStart',
        logo: {
          icon: 'circle',
          typography: 'Arial',
          color: '#3B82F6',
          background: '#FFFFFF'
        }
      },
      product: {
        features: ['Dashboard', 'Autenticación', 'Reportes', 'API'],
        flow: [
          { from: 'Login', to: 'Dashboard' },
          { from: 'Dashboard', to: 'Reportes' },
          { from: 'Reportes', to: 'Export' }
        ],
        prototype: ''
      },
      communication: {
        social: {
          avatar: '',
          background: '',
          name: 'TechStart',
          bio: 'Innovando el futuro de la tecnología'
        },
        ads: 'Campaña de lanzamiento para TechStart',
        merch: ['Camisetas', 'Stickers', 'Tazas']
      },
      launch: {
        questions: [
          { question: '¿Entiendes el producto?', answer: true },
          { question: '¿Te transmite los valores?', answer: true },
          { question: '¿Lo recomendarías?', answer: true }
        ]
      }
    });
  };

  const renderWelcomeSection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Bienvenido a Studio Framework!
        </h1>
        <p className="text-lg text-gray-600">
          Vamos a desarrollar tu marca y producto paso a paso
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿Cómo te llamas?
          </label>
          <input
            type="text"
            value={projectData.name}
            onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tu nombre"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ¿Cómo se llama tu empresa?
          </label>
          <input
            type="text"
            value={projectData.company}
            onChange={(e) => setProjectData(prev => ({ ...prev, company: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nombre de la empresa"
          />
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={handleNext}
            className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Empezar desde cero
          </button>
          <button 
            onClick={handleDummyData}
            className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Ver ejemplo
          </button>
        </div>
      </div>
    </div>
  );

  const renderStrategySection = () => {
    const { strategy } = projectData;
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Strategy</h2>
        
        {/* 1.1 Entrevistas */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">1.1 Entrevistas / Contexto</h3>
          <textarea
            value={strategy.interviews}
            onChange={(e) => setProjectData(prev => ({
              ...prev,
              strategy: { ...prev.strategy, interviews: e.target.value }
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Describe las entrevistas realizadas..."
          />
        </div>

        {/* 1.2 Benchmark */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">1.2 Benchmark & Posicionamiento</h3>
          <div className="space-y-3">
            {strategy.competitors.map((competitor, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={competitor}
                  onChange={(e) => {
                    const newCompetitors = [...strategy.competitors];
                    newCompetitors[index] = e.target.value;
                    setProjectData(prev => ({
                      ...prev,
                      strategy: { ...prev.strategy, competitors: newCompetitors }
                    }));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nombre del competidor"
                />
                <button
                  onClick={() => {
                    const newCompetitors = strategy.competitors.filter((_, i) => i !== index);
                    setProjectData(prev => ({
                      ...prev,
                      strategy: { ...prev.strategy, competitors: newCompetitors }
                    }));
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setProjectData(prev => ({
                ...prev,
                strategy: { ...prev.strategy, competitors: [...prev.strategy.competitors, ''] }
              }))}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <Plus className="w-4 h-4" />
              Añadir competidor
            </button>
          </div>
        </div>

        {/* Mapa de posicionamiento */}
        {strategy.competitors.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Mapa de Posicionamiento</h3>
            <div className="relative w-full h-64 bg-gray-100 rounded-lg border-2 border-gray-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-500">Mapa de posicionamiento interactivo</div>
              </div>
            </div>
          </div>
        )}

        {/* 1.3 Plan */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">1.3 Plan / Direction</h3>
          <div className="space-y-2">
            {strategy.plan.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-500">{index + 1}</span>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => {
                    const newPlan = [...strategy.plan];
                    newPlan[index] = { ...newPlan[index], text: e.target.value };
                    setProjectData(prev => ({
                      ...prev,
                      strategy: { ...prev.strategy, plan: newPlan }
                    }));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => {
                    const newPlan = strategy.plan.filter((_, i) => i !== index);
                    setProjectData(prev => ({
                      ...prev,
                      strategy: { ...prev.strategy, plan: newPlan }
                    }));
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setProjectData(prev => ({
                ...prev,
                strategy: { 
                  ...prev.strategy, 
                  plan: [...prev.strategy.plan, { 
                    id: Date.now().toString(), 
                    text: '', 
                    group: 'General' 
                  }] 
                }
              }))}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <Plus className="w-4 h-4" />
              Añadir tarea
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderBrandSection = () => {
    const { brand } = projectData;
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Brand</h2>
        
        {/* 2.1 Valores */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">2.1 Valores / Esencia</h3>
          <div className="space-y-3">
            {brand.values.map((value, index) => (
              <div key={index} className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={value.value}
                  onChange={(e) => {
                    const newValues = [...brand.values];
                    newValues[index] = { ...newValues[index], value: e.target.value };
                    setProjectData(prev => ({
                      ...prev,
                      brand: { ...prev.brand, values: newValues }
                    }));
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Valor"
                />
                <input
                  type="text"
                  value={value.opposite}
                  onChange={(e) => {
                    const newValues = [...brand.values];
                    newValues[index] = { ...newValues[index], opposite: e.target.value };
                    setProjectData(prev => ({
                      ...prev,
                      brand: { ...prev.brand, values: newValues }
                    }));
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Contrario"
                />
              </div>
            ))}
            <button
              onClick={() => setProjectData(prev => ({
                ...prev,
                brand: { ...prev.brand, values: [...prev.brand.values, { value: '', opposite: '' }] }
              }))}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <Plus className="w-4 h-4" />
              Añadir valor
            </button>
          </div>
        </div>

        {/* 2.2 Nombre */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">2.2 Nombre / Verbal Identity</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={brand.selectedName}
                onChange={(e) => setProjectData(prev => ({
                  ...prev,
                  brand: { ...prev.brand, selectedName: e.target.value }
                }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre propuesto"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                <Save className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {brand.names.map((name, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span>{name}</span>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2.3 Logo */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">2.3 Logo / Sistema Visual</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: brand.logo.color }}
              >
                {brand.logo.icon === 'circle' ? '●' : '■'}
              </div>
              <div className="space-y-2">
                <select
                  value={brand.logo.typography}
                  onChange={(e) => setProjectData(prev => ({
                    ...prev,
                    brand: { ...prev.brand, logo: { ...prev.brand.logo, typography: e.target.value } }
                  }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times">Times</option>
                </select>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={brand.logo.color}
                    onChange={(e) => setProjectData(prev => ({
                      ...prev,
                      brand: { ...prev.brand, logo: { ...prev.brand.logo, color: e.target.value } }
                    }))}
                    className="w-8 h-8 rounded border"
                  />
                  <input
                    type="color"
                    value={brand.logo.background}
                    onChange={(e) => setProjectData(prev => ({
                      ...prev,
                      brand: { ...prev.brand, logo: { ...prev.brand.logo, background: e.target.value } }
                    }))}
                    className="w-8 h-8 rounded border"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProductSection = () => {
    const { product } = projectData;
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Product</h2>
        
        {/* 3.1 Features */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">3.1 Features & Navigation</h3>
          <div className="space-y-2">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const newFeatures = [...product.features];
                    newFeatures[index] = e.target.value;
                    setProjectData(prev => ({
                      ...prev,
                      product: { ...prev.product, features: newFeatures }
                    }));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Funcionalidad"
                />
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setProjectData(prev => ({
                ...prev,
                product: { ...prev.product, features: [...prev.product.features, ''] }
              }))}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <Plus className="w-4 h-4" />
              Añadir funcionalidad
            </button>
          </div>
        </div>

        {/* 3.2 Prototipo */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">3.2 Prototipo</h3>
          <div className="space-y-3">
            <input
              type="url"
              value={product.prototype}
              onChange={(e) => setProjectData(prev => ({
                ...prev,
                product: { ...prev.product, prototype: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enlace de Figma"
            />
            {product.prototype && (
              <div className="w-full h-64 bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <ExternalLink className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500">Prototipo en pantalla completa</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCommunicationSection = () => {
    const { communication } = projectData;
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
        
        {/* 4.1 Social */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">4.1 Social / Content</h3>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div 
              className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ backgroundImage: communication.social.background ? `url(${communication.social.background})` : undefined }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
              </div>
            </div>
            <div className="p-4 text-center">
              <h4 className="font-semibold text-lg">{communication.social.name}</h4>
              <p className="text-gray-600 text-sm">{communication.social.bio}</p>
            </div>
          </div>
        </div>

        {/* 4.2 Ads */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">4.2 Ads / Campaigns</h3>
          <textarea
            value={communication.ads}
            onChange={(e) => setProjectData(prev => ({
              ...prev,
              communication: { ...prev.communication, ads: e.target.value }
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Describe tu campaña publicitaria..."
          />
        </div>

        {/* 4.3 Merch */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">4.3 Merch / Físico</h3>
          <div className="grid grid-cols-3 gap-4">
            {communication.merch.map((item, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderLaunchSection = () => {
    const { launch } = projectData;
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Launch</h2>
        
        <div className="space-y-4">
          {launch.questions.map((q, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">{q.question}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const newQuestions = [...launch.questions];
                    newQuestions[index] = { ...newQuestions[index], answer: true };
                    setProjectData(prev => ({
                      ...prev,
                      launch: { ...prev.launch, questions: newQuestions }
                    }));
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    q.answer === true ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Sí
                </button>
                <button
                  onClick={() => {
                    const newQuestions = [...launch.questions];
                    newQuestions[index] = { ...newQuestions[index], answer: false };
                    setProjectData(prev => ({
                      ...prev,
                      launch: { ...prev.launch, questions: newQuestions }
                    }));
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    q.answer === false ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSection = () => {
    const section = sections[currentSectionIndex];
    
    switch (section.key) {
      case 'welcome':
        return renderWelcomeSection();
      case 'strategy':
        return renderStrategySection();
      case 'brand':
        return renderBrandSection();
      case 'product':
        return renderProductSection();
      case 'communication':
        return renderCommunicationSection();
      case 'launch':
        return renderLaunchSection();
      default:
        return <div>Sección no encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Main content - Two column layout */}
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen">
            {/* Left column - Video */}
            <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]">
              <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                >
                  <source src={`/videos/${videos[currentVideo]}`} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isVideoPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right column - Content */}
            <div className="lg:h-[calc(100vh-5rem)] overflow-y-auto">
              <div className="p-6">
                <motion.div
                  key={currentSectionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderSection()}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
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