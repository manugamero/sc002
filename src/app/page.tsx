'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Plus, Trash2, RefreshCw, Wand2, Menu, SkipForward, Mic, MicOff, Zap, Rocket, Lightbulb, Target, Star, Flame, Gem, Sparkles, Calendar } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import HamburgerMenu from '@/components/HamburgerMenu';

interface ProjectData {
  name: string;
  company: string;
  size: string;
  strategy: {
    mode: string;
    interviews: string;
    competitors: string[];
    plan: string[];
  };
  brand: {
    mode: string;
    values: { value: string; opposite: string }[];
    names: string[];
    selectedName: string;
  };
  product: {
    mode: string;
    features: string[];
    prototype: string;
    shippingQuestions: { date: string; task: string; completed: boolean }[];
  };
  communication: {
    mode: string;
    social: { name: string; bio: string };
    ads: string;
    campaignText: string;
    merchImages: string[];
  };
  launch: {
    questions: { question: string; answer: boolean }[];
    brandbook: string;
    feedback: string;
  };
}

const initialProjectData: ProjectData = {
  name: '',
  company: '',
  size: '1-10',
  strategy: { mode: '', interviews: '', competitors: ['', '', ''], plan: [] },
  brand: { mode: '', values: [{ value: '', opposite: '' }, { value: '', opposite: '' }, { value: '', opposite: '' }], names: [], selectedName: '' },
  product: { mode: '', features: ['', '', ''], prototype: '', shippingQuestions: [] },
  communication: { mode: '', social: { name: '', bio: '' }, ads: '', campaignText: '', merchImages: [] },
  launch: { 
    questions: [
      { question: '¿Tienes un presupuesto definido para el lanzamiento?', answer: false },
      { question: '¿Qué canales de marketing vas a usar?', answer: false },
      { question: '¿Tienes una lista de usuarios beta?', answer: false }
    ],
    brandbook: '',
    feedback: ''
  }
};

// Pasos individuales con contenido detallado
const steps = [
  // Strategy
  { id: 'intro', title: 'S+C Framework', type: 'intro', field: null },
  { id: 'strategy-0', title: '1.0 Strategy', type: 'mode-selector', field: 'strategy.mode' },
  { id: 'strategy-1', title: '1.1 Contexto / Entrevistas', type: 'interview', field: 'strategy.interviews' },
  { id: 'strategy-2', title: '1.2 Mercado / Competidores', type: 'competitors', field: 'strategy.competitors' },
  { id: 'strategy-3', title: '1.3 Plan / Estrategia', type: 'plan', field: 'strategy.plan' },
  
  // Brand
  { id: 'brand-0', title: '2.0 Brand', type: 'mode-selector', field: 'brand.mode' },
  { id: 'brand-1', title: '2.1 Valores / Esencia', type: 'values', field: 'brand.values' },
  { id: 'brand-2', title: '2.2 Verbal / Naming', type: 'names', field: 'brand.names' },
  { id: 'brand-3', title: '2.3 Visual / Logo', type: 'logo', field: 'brand.logo' },
  
  // Product
  { id: 'product-0', title: '3.0 Product', type: 'mode-selector', field: 'product.mode' },
  { id: 'product-1', title: '3.1 Features / MVP', type: 'features', field: 'product.features' },
  { id: 'product-2', title: '3.2 Iteración / Prototipo', type: 'prototype', field: 'product.prototype' },
  { id: 'product-3', title: '3.3 Shipping / Lanzamiento', type: 'rollout', field: 'product.shippingQuestions' },
  
  // Messages
  { id: 'messages-0', title: '4.0 Messages', type: 'mode-selector', field: 'communication.mode' },
  { id: 'messages-1', title: '4.1 Social / Contenido', type: 'social', field: 'communication.social' },
  { id: 'messages-2', title: '4.2 Ads / Campañas', type: 'campaign', field: 'communication.campaignText' },
  { id: 'messages-3', title: '4.3 Merch / Merchandising', type: 'merch', field: 'communication.merchImages' },
  
  // Launch
  { id: 'launch-1', title: '5.1 Validación Final', type: 'questions', field: 'launch.questions' },
  { id: 'launch-2', title: '5.2 Brandbook Generation', type: 'brandbook', field: 'launch.brandbook' },
];

const videos = [
  'video00.00.mp4',
  'video00.01.mp4',
  'video00.02.mp4',
  'video00.03.mp4',
  'video00.04.mp4',
  'video00.05.mp4',
  'video00.06.mp4',
  'video00.07.mp4',
  'video01.00.mp4',
  'video01.01.mp4',
  'video02.00.mp4',
  'video02.01.mp4',
  'video02.02.mp4',
  'video03.00.mp4',
  'video03.01.mp4',
  'video04.00.mp4',
  'video04.01.mp4',
  'video05.00.mp4',
  'video11.mp4'
];

export default function HomePage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [projectData, setProjectData] = useState<ProjectData>(initialProjectData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('strategy');
  const [selectedMode, setSelectedMode] = useState<'startup' | 'scaleup' | 'corporate'>('startup');
  
  // Calcular progreso basado en los datos del proyecto
  const calculateProgress = () => {
    const strategy = projectData.strategy.interviews ? 100 : 0;
    const brand = projectData.brand.values.length > 0 ? 100 : 0;
    const product = projectData.product.features.length > 0 ? 100 : 0;
    const messages = projectData.communication.social.name ? 100 : 0;
    const launch = projectData.launch.questions.length > 0 ? 100 : 0;
    
    return { strategy, brand, product, messages, launch };
  };

  // Mapeo de videos por sección
  const getVideoForSection = (section: string) => {
    const sectionVideos: { [key: string]: string[] } = {
      'strategy': ['video01.00.mp4', 'video01.01.mp4'],
      'brand': ['video02.00.mp4', 'video02.01.mp4', 'video02.02.mp4'],
      'product': ['video03.00.mp4', 'video03.01.mp4'],
      'messages': ['video04.00.mp4', 'video04.01.mp4'],
      'launch': ['video05.00.mp4', 'video11.mp4']
    };
    
    return sectionVideos[section] || ['video00.00.mp4'];
  };

  // Función para obtener la sección principal
  const getMainSection = (stepId: string) => {
    if (stepId.startsWith('strategy-')) return 'strategy';
    if (stepId.startsWith('brand-')) return 'brand';
    if (stepId.startsWith('product-')) return 'product';
    if (stepId.startsWith('messages-')) return 'messages';
    if (stepId.startsWith('launch-')) return 'launch';
    return 'intro';
  };

  // Función para obtener video, siempre devuelve uno
  const getCurrentVideo = () => {
    const stepId = steps[currentStepIndex].id;
    
    // Video especial para intro - secuencia de videos
    if (stepId === 'intro') {
      const videoIndex = Math.min(currentVideoIndex, introVideos.length - 1);
      return introVideos[videoIndex] || 'video00.00.mp4';
    }
    
    // Videos fijos por sección principal
    if (stepId.startsWith('strategy-')) {
      return 'video01.01.mp4';
    } else if (stepId.startsWith('brand-')) {
      return 'video02.01.mp4';
    } else if (stepId.startsWith('product-')) {
      return 'video03.01.mp4';
    } else if (stepId.startsWith('messages-')) {
      return 'video04.01.mp4';
    } else if (stepId.startsWith('launch-')) {
      return 'video05.00.mp4';
    }
    
    // Fallback
    return 'video00.00.mp4';
  };
  const [selectedVersion, setSelectedVersion] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showElements, setShowElements] = useState({
    video: false,
    title: false,
    description: false,
    form: false,
    selectors: false
  });
  
  // Estados para la secuencia de videos en intro
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const introVideos = ['video00.02.mp4', 'video00.03.mp4', 'video00.04.mp4', 'video00.05.mp4', 'video00.06.mp4', 'video00.07.mp4'];
  
  // Estados para animaciones
  const [selectedAnimation, setSelectedAnimation] = useState('fade');
  const [showAnimationDropdown, setShowAnimationDropdown] = useState(false);
  
  // Estados para el sistema de carrito/plan semanal
  const [showPlanSlide, setShowPlanSlide] = useState(false);
  const [weeklyPlan, setWeeklyPlan] = useState<{[key: string]: number}>({
    'strategy-1': 1, // 1.1 Contexto
    'strategy-2': 1, // 1.2 Mercado
    'strategy-3': 1, // 1.3 Plan
    'brand-1': 1,   // 2.1 Valores
    'brand-2': 1,   // 2.2 Naming
    'brand-3': 1,   // 2.3 Logo
    'product-1': 1, // 3.1 Features
    'product-2': 1, // 3.2 Prototipo
    'product-3': 1, // 3.3 Lanzamiento
    'messages-1': 1, // 4.1 Social
    'messages-2': 1, // 4.2 Ads
    'messages-3': 1, // 4.3 Merch
    'launch-1': 1,  // 5.1 Validación
    'launch-2': 1   // 5.2 Brandbook
  });
  
  const animations = [
    { id: 'version-1', name: 'Versión 1', description: 'Animación clásica suave' },
    { id: 'version-2', name: 'Versión 2', description: 'Animación dinámica' },
    { id: 'version-3', name: 'Versión 3', description: 'Animación elegante' },
    { id: 'version-4', name: 'Versión 4', description: 'Animación moderna' },
    { id: 'version-5', name: 'Versión 5', description: 'Animación fluida' },
    { id: 'version-6', name: 'Versión 6', description: 'Animación premium' }
  ];

  // Función para calcular semanas según el modo
  const getWeeksForMode = (baseWeeks: number) => {
    switch (selectedMode) {
      case 'startup':
        return baseWeeks; // Sin iteraciones adicionales
      case 'scaleup':
        return baseWeeks + 1; // +1 iteración
      case 'corporate':
        return baseWeeks + 2; // +2 iteraciones
      default:
        return baseWeeks;
    }
  };

  // Función para obtener el total de semanas
  const getTotalWeeks = () => {
    return Object.values(weeklyPlan).reduce((total, weeks) => total + weeks, 0);
  };

  // Función para actualizar semanas de un item
  const updateItemWeeks = (itemId: string, newWeeks: number) => {
    if (newWeeks < 1) return; // Mínimo 1 semana
    setWeeklyPlan(prev => ({
      ...prev,
      [itemId]: newWeeks
    }));
  };

  // Función para renderizar texto con círculos integrados
  const renderTextWithCircles = (text: string) => {
    if (!text) return '';
    
    // Dividir el texto en palabras y reemplazar números con círculos
    const words = text.split(' ');
    return words.map((word, index) => {
      // Si la palabra es un número del 1-3, reemplazarla con un círculo
      if (word === '1' || word === '2' || word === '3') {
        return (
          <span key={index} style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '20px',
            height: '20px',
            backgroundColor: '#ffffff',
            color: '#000000',
            borderRadius: '50%',
            fontSize: '12px',
            fontWeight: '600',
            margin: '0 4px',
            verticalAlign: 'middle'
          }}>
            {word}
          </span>
        );
      }
      return <span key={index}>{word} </span>;
    });
  };

  // Función para obtener estilos de animación
  const getAnimationStyles = (isVisible: boolean) => {
    const baseStyles = {
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.6s ease-out'
    };

    switch (selectedAnimation) {
      case 'version-1':
        return { 
          ...baseStyles,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out'
        };
      case 'version-2':
        return { 
          ...baseStyles, 
          transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-30px) scale(0.95)',
          transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
        };
      case 'version-3':
        return { 
          ...baseStyles, 
          transform: isVisible ? 'translateY(0) rotate(0deg)' : 'translateY(15px) rotate(2deg)',
          transition: 'all 0.9s ease-in-out'
        };
      case 'version-4':
        return { 
          ...baseStyles, 
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(25px)',
          transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        };
      case 'version-5':
        return { 
          ...baseStyles, 
          transform: isVisible ? 'translateX(0) translateY(0)' : 'translateX(20px) translateY(10px)',
          transition: 'all 0.5s ease-out'
        };
      case 'version-6':
        return { 
          ...baseStyles, 
          transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.95) rotate(-1deg)',
          transition: 'all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        };
      default:
        return baseStyles;
    }
  };

  // Función para generar contenido aleatorio
  const generateRandomContent = (fieldType: string) => {
    const randomData = {
      companyNames: ['TechCorp', 'InnovateLab', 'FutureSoft', 'DigitalFlow', 'CloudSync', 'DataVault', 'SmartTech', 'NextGen'],
      companySizes: ['1-10', '11-50', '51-200', '201-500', '500+'],
      industries: ['Tecnología', 'Salud', 'Educación', 'Finanzas', 'Retail', 'Manufactura', 'Consultoría', 'Marketing'],
      founderNames: ['María García', 'Carlos Rodríguez', 'Ana López', 'David Martínez', 'Laura Sánchez', 'Javier Pérez', 'Carmen Ruiz', 'Antonio González'],
      descriptions: [
        'Una empresa innovadora enfocada en soluciones tecnológicas para el futuro.',
        'Startup disruptiva que transforma la industria con tecnología de vanguardia.',
        'Compañía líder en digitalización y automatización de procesos empresariales.',
        'Empresa emergente especializada en inteligencia artificial y machine learning.',
        'Innovadora en el sector de la sostenibilidad y tecnología verde.'
      ]
    };

    switch (fieldType) {
      case 'name':
        return randomData.companyNames[Math.floor(Math.random() * randomData.companyNames.length)];
      case 'size':
        return randomData.companySizes[Math.floor(Math.random() * randomData.companySizes.length)];
      case 'industry':
        return randomData.industries[Math.floor(Math.random() * randomData.industries.length)];
      case 'founder':
        return randomData.founderNames[Math.floor(Math.random() * randomData.founderNames.length)];
      case 'description':
        return randomData.descriptions[Math.floor(Math.random() * randomData.descriptions.length)];
      default:
        return '';
    }
  };

  // Función para obtener componentes de iconos
  const getIconComponent = (iconName: string) => {
    const iconMap = {
      'zap': <Zap size={32} />,
      'rocket': <Rocket size={32} />,
      'lightbulb': <Lightbulb size={32} />,
      'target': <Target size={32} />,
      'star': <Star size={32} />,
      'flame': <Flame size={32} />,
      'gem': <Gem size={32} />,
      'sparkles': <Sparkles size={32} />
    };
    return iconMap[iconName] || <Star size={32} />;
  };

  // Función para procesar texto de voz y extraer información inteligentemente
  const processVoiceText = (text: string, fieldType: string) => {
    const lowerText = text.toLowerCase();
    
    // Patrones para extraer información específica
    const patterns = {
      name: [
        /(?:nombre|empresa|compañía|se llama|es)\s+(?:de\s+)?(?:la\s+)?(?:empresa\s+)?([a-zA-Z\s]+?)(?:\s|$|\.|,)/i,
        /(?:la\s+)?(?:empresa\s+)?([a-zA-Z\s]{2,20})\s+(?:es\s+una|es\s+un|se\s+dedica)/i
      ],
      size: [
        /(?:tamaño|tienen|somos|empleados|trabajadores).*?(?:entre\s+)?(\d+)\s*(?:y\s+(\d+)|a\s+(\d+)|menos|más)/i,
        /(?:empresa\s+)?(?:pequeña|mediana|grande)/i
      ],
      industry: [
        /(?:sector|industria|dedicamos|nos\s+dedicamos|somos\s+una\s+empresa\s+de)\s+(?:la\s+)?([a-zA-Z\s]+?)(?:\s|$|\.|,)/i,
        /(?:tecnología|salud|educación|finanzas|retail|manufactura|consultoría|marketing)/i
      ],
      founder: [
        /(?:fundador|fundadora|creador|creadora|director|directora)\s+(?:es\s+)?([a-zA-Z\s]+?)(?:\s|$|\.|,)/i,
        /(?:me\s+llamo|soy)\s+([a-zA-Z\s]+?)(?:\s|$|\.|,)/i
      ],
      description: [
        /(?:descripción|somos|empresa|compañía).*?(.+)/i
      ]
    };

    // Buscar coincidencias
    for (const pattern of patterns[fieldType] || []) {
      const match = lowerText.match(pattern);
      if (match) {
        if (fieldType === 'size') {
          // Lógica especial para tamaño
          if (match[1] && match[2]) {
            const min = parseInt(match[1]);
            const max = parseInt(match[2] || match[3]);
            if (max <= 10) return '1-10';
            if (max <= 50) return '11-50';
            if (max <= 200) return '51-200';
            if (max <= 500) return '201-500';
            return '500+';
          }
          if (lowerText.includes('pequeña')) return '1-10';
          if (lowerText.includes('mediana')) return '51-200';
          if (lowerText.includes('grande')) return '500+';
        }
        
        if (fieldType === 'industry') {
          // Mapear texto a industrias válidas
          const industryMap = {
            'tecnología': 'Tecnología',
            'tech': 'Tecnología',
            'software': 'Tecnología',
            'salud': 'Salud',
            'médico': 'Salud',
            'educación': 'Educación',
            'educativo': 'Educación',
            'finanzas': 'Finanzas',
            'bancario': 'Finanzas',
            'retail': 'Retail',
            'comercio': 'Retail',
            'manufactura': 'Manufactura',
            'consultoría': 'Consultoría',
            'marketing': 'Marketing'
          };
          
          const foundIndustry = Object.keys(industryMap).find(key => 
            lowerText.includes(key)
          );
          return foundIndustry ? industryMap[foundIndustry] : match[1]?.trim();
        }
        
        return match[1]?.trim() || match[0]?.trim();
      }
    }
    
    // Si no encuentra patrones específicos, devolver el texto completo
    return text.trim();
  };
  const [typewriterText, setTypewriterText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const [showVoicePanel, setShowVoicePanel] = useState(false);
  const recognitionRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Actualizar título al cargar la página
  useEffect(() => {
    document.title = "S+C Framework v1.0";
    // Forzar actualización del título con un pequeño delay
    setTimeout(() => {
      document.title = "S+C Framework v1.0";
    }, 100);

    // Actualizar título cuando la ventana vuelva a estar activa
    const handleFocus = () => {
      document.title = "S+C Framework v1.0";
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Forzar autoplay cuando cambie el video y actualizar título
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Asegurar que el video se cargue y reproduzca
      videoElement.load();
      
      // Intentar reproducir inmediatamente
      const playVideo = async () => {
        try {
          await videoElement.play();
        } catch (error) {
          console.log('Error playing video:', error);
          // Si falla, intentar con interacción del usuario
          const handleUserInteraction = () => {
            videoElement.play().catch(console.error);
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
          };
          document.addEventListener('click', handleUserInteraction);
          document.addEventListener('touchstart', handleUserInteraction);
        }
      };
      
      playVideo();
    }
    // Forzar actualización del título para evitar caché del navegador
    document.title = "S+C Framework v1.0";
    setTimeout(() => {
      document.title = "S+C Framework v1.0";
    }, 50);
  }, [currentStepIndex]);

  // Animaciones escalonadas cuando cambie el paso
  useEffect(() => {
    // Reset elementos
    setShowElements({
      video: false,
      title: false,
      description: false,
      form: false,
      selectors: false
    });

    // Todos los elementos aparecen juntos
    setTimeout(() => setShowElements(prev => ({ 
      ...prev, 
      video: true, 
      title: true 
    })), 100);
    
            // Descripción con delay y fade-in por palabras
            setTimeout(() => {
              const description = getStepContent(steps[currentStepIndex]?.id);
              if (description) {
                // Activar descripción y typewriter al mismo tiempo
                setShowElements(prev => ({ ...prev, description: true }));
                setTypewriterText('');
                const words = description.split(' ');
                let i = 0;
                const wordInterval = setInterval(() => {
                  if (i < words.length) {
                    setTypewriterText(words.slice(0, i + 1).join(' '));
                    i++;
                  } else {
                    clearInterval(wordInterval);
                    // Mostrar formulario solo después de que termine la animación del texto
                    setTimeout(() => setShowElements(prev => ({ ...prev, form: true })), 300);
                  }
                }, 80); // Más rápido y suave: 80ms por palabra
              } else {
                // Si no hay descripción, mostrar formulario inmediatamente
                setShowElements(prev => ({ ...prev, description: true, form: true }));
              }
            }, 1000);
    
    // Selectores al final
    setTimeout(() => setShowElements(prev => ({ ...prev, selectors: true })), 1800);
  }, [currentStepIndex]);

  // Efecto para actualizar el texto cuando cambie la versión seleccionada
  useEffect(() => {
    const description = getStepContent(steps[currentStepIndex]?.id);
    if (description) {
      setTypewriterText('');
      const words = description.split(' ');
      let i = 0;
      const wordInterval = setInterval(() => {
        if (i < words.length) {
          setTypewriterText(words.slice(0, i + 1).join(' '));
          i++;
        } else {
          clearInterval(wordInterval);
        }
      }, 80); // Más rápido y suave: 80ms por palabra
      
      return () => clearInterval(wordInterval);
    }
  }, [selectedVersion, currentStepIndex]);

  // Efecto para manejar la secuencia de videos en la intro
  useEffect(() => {
    if (steps[currentStepIndex].id === 'intro') {
      const videoElement = videoRef.current;
      if (videoElement) {
        const handleVideoEnd = () => {
          if (currentVideoIndex < introVideos.length - 1) {
            setCurrentVideoIndex(prev => prev + 1);
          } else {
            // Reiniciar la secuencia
            setCurrentVideoIndex(0);
          }
        };
        
        videoElement.addEventListener('ended', handleVideoEnd);
        return () => videoElement.removeEventListener('ended', handleVideoEnd);
      }
    }
  }, [currentStepIndex, currentVideoIndex]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
      setCurrentStepIndex(currentStepIndex + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
      setCurrentStepIndex(currentStepIndex - 1);
        setIsAnimating(false);
      }, 300);
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
        const suggestions = (data.text || '').split('\n').filter((line: string) => line.trim());
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

  // Función para generar contenido para toda la slide actual
  const handleGlobalAIGenerate = () => {
    const step = steps[currentStepIndex];
    const value = getFieldValue(step.field);
    
    // Generar contenido según el tipo de paso
    switch (step.type) {
      case 'interview':
        const interviewData = {
          name: generateRandomContent('name'),
          size: generateRandomContent('size'),
          industry: generateRandomContent('industry'),
          founder: generateRandomContent('founder'),
          description: generateRandomContent('description')
        };
        updateField(step.field, interviewData);
        break;
        
      case 'plan':
        const planData = [
          generateRandomContent('description'),
          generateRandomContent('description'),
          generateRandomContent('description')
        ];
        updateField(step.field, planData);
        break;
        
      case 'values':
        const valuesData = [
          { value: generateRandomContent('description'), opposite: generateRandomContent('description') },
          { value: generateRandomContent('description'), opposite: generateRandomContent('description') },
          { value: generateRandomContent('description'), opposite: generateRandomContent('description') }
        ];
        updateField(step.field, valuesData);
        break;
        
      case 'userflow':
        const userflowData = {
          steps: [
            { title: generateRandomContent('description'), description: generateRandomContent('description') },
            { title: generateRandomContent('description'), description: generateRandomContent('description') },
            { title: generateRandomContent('description'), description: generateRandomContent('description') }
          ]
        };
        updateField(step.field, userflowData);
        break;
        
      default:
        // Para otros tipos, generar contenido básico
        const randomContent = generateRandomContent('description');
        updateField(step.field, randomContent);
    }
  };

  // Función para iniciar el reconocimiento de voz
  const startVoiceRecognition = (field: string) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'es-ES';

    recognition.onstart = () => {
      setIsListening(true);
      setActiveVoiceField(field);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      
      // Procesar el texto según el campo
      if (field.includes('interviews')) {
        // Para entrevistas, intentar extraer información estructurada
        const processedText = processInterviewText(transcript);
        updateField(field, processedText);
      } else {
        // Para otros campos, usar el texto directamente
        updateField(field, transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Error en reconocimiento de voz:', event.error);
      setIsListening(false);
      setActiveVoiceField(null);
    };

    recognition.onend = () => {
      setIsListening(false);
      setActiveVoiceField(null);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // Función para detener el reconocimiento de voz
  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // Función para procesar texto de entrevistas con IA
  const processInterviewText = async (transcript: string) => {
    // Simulación de procesamiento con IA
    // En una implementación real, esto llamaría a OpenAI para extraer información estructurada
    const mockProcessedData = {
      name: extractFromText(transcript, ['nombre', 'me llamo', 'soy']),
      company: extractFromText(transcript, ['empresa', 'compañía', 'negocio']),
      size: extractFromText(transcript, ['tamaño', 'empleados', 'equipo']),
      industry: extractFromText(transcript, ['sector', 'industria', 'rubro']),
      founder: extractFromText(transcript, ['fundador', 'creador', 'dueño']),
      description: transcript
    };
    
    return mockProcessedData;
  };

  // Función para reconocimiento de voz global con IA
  const startGlobalVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'es-ES';

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceTranscript('');
      setShowVoicePanel(true);
    };

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setVoiceTranscript(transcript);
      
      // Procesar con IA para extraer información relevante
      try {
        const response = await fetch('/api/transcribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: `Analiza este texto de voz y extrae información relevante para el paso actual "${steps[currentStepIndex].title}": "${transcript}". Devuelve un JSON con los campos relevantes encontrados.`,
            type: 'voice_analysis'
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          const extractedData = JSON.parse(data.text || '{}');
          
          // Aplicar la información extraída al paso actual
          const currentStep = steps[currentStepIndex];
          if (currentStep.field) {
            updateField(currentStep.field, extractedData);
          }
        }
      } catch (error) {
        console.error('Error procesando voz con IA:', error);
        // Fallback: usar el texto directamente
        const currentStep = steps[currentStepIndex];
        if (currentStep.field) {
          updateField(currentStep.field, transcript);
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Error en reconocimiento de voz:', event.error);
      setIsListening(false);
      setShowVoicePanel(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // Función auxiliar para extraer información del texto
  const extractFromText = (text: string, keywords: string[]): string => {
    const sentences = text.split(/[.!?]/);
    for (const sentence of sentences) {
      for (const keyword of keywords) {
        if (sentence.toLowerCase().includes(keyword)) {
          return sentence.trim();
        }
      }
    }
    return '';
  };

  const getFieldValue = (field: string) => {
    const keys = field.split('.');
    let current = projectData as any;
    
    for (const key of keys) {
      current = current[key];
    }
    return current;
  };

  const getSectionTitle = (stepId: string) => {
    const sectionMap: { [key: string]: string } = {
      'intro': 'S+C / Framework',
      'strategy-0': '1. Strategy / Intro',
      'strategy-1': '1. Strategy / 1.1 Context',
      'strategy-2': '1. Strategy / 1.2 Market',
      'strategy-3': '1. Strategy / 1.3 Plan',
      'brand-0': '2. Brands / Intro',
      'brand-1': '2. Brands / 2.1 Values',
      'brand-2': '2. Brands / 2.2 Verbal',
      'brand-3': '2. Brands / 2.3 Visual',
      'product-0': '3. Product / Intro',
      'product-1': '3. Product / 3.1 Features',
      'product-2': '3. Product / 3.2 Iteration',
      'product-3': '3. Product / 3.3 Shipping',
      'messages-0': '4. Messages / Intro',
      'messages-1': '4. Messages / 4.1 Social',
      'messages-2': '4. Messages / 4.2 Ads',
      'messages-3': '4. Messages / 4.3 Merch',
      'launch-1': '5. Launch / 5.1 Validation',
      'launch-2': '5. Launch / 5.2 Brandbook'
    };
    return sectionMap[stepId] || 'S+C / Framework';
  };

  // Función para encontrar el índice de una sección principal
  const findSectionIndex = (sectionName: string) => {
    const sectionMap: { [key: string]: string } = {
      'STRATEGY': 'strategy-0',
      'BRANDS': 'brand-0', 
      'PRODUCT': 'product-0',
      'MESSAGES': 'messages-0',
      'LAUNCH': 'launch-1'
    };
    
    const stepId = sectionMap[sectionName];
    if (stepId) {
      return steps.findIndex(step => step.id === stepId);
    }
    return -1;
  };

  // Función para encontrar el índice de una subsección específica
  const findSubsectionIndex = (subsectionName: string) => {
    const subsectionMap: { [key: string]: string } = {
      '1.1 Context': 'strategy-1',
      '1.2 Market': 'strategy-2',
      '1.3 Plan': 'strategy-3',
      '2.1 Values': 'brand-1',
      '2.2 Verbal': 'brand-2',
      '2.3 Visual': 'brand-3',
      '3.1 Features': 'product-1',
      '3.2 Iteration': 'product-2',
      '3.3 Shipping': 'product-3',
      '4.1 Social': 'messages-1',
      '4.2 Ads': 'messages-2',
      '4.3 Merch': 'messages-3',
      '5.1 Validation': 'launch-1',
      '5.2 Brandbook': 'launch-2'
    };
    
    const stepId = subsectionMap[subsectionName];
    if (stepId) {
      return steps.findIndex(step => step.id === stepId);
    }
    return -1;
  };

  // Función para verificar si estamos en un capítulo principal
  const isMainChapter = (stepId: string) => {
    const mainChapters = ['strategy-0', 'brand-0', 'product-0', 'messages-0'];
    return mainChapters.includes(stepId);
  };

  const getStepContent = (stepId: string) => {
    const contentMap: { [key: string]: string[] } = {
      'intro': [
        'Bienvenido al S+C Framework, una metodología completa para desarrollar tu marca y producto desde cero hasta el lanzamiento.',
        'Este proceso te guiará a través de 5 fases fundamentales, cada una diseñada para construir una base sólida para tu proyecto.',
        'Cada paso está pensado para llevarte desde la idea inicial hasta un lanzamiento exitoso, con herramientas y guías específicas.'
      ],
      'strategy-0': [
        'La estrategia es el fundamento de todo proyecto exitoso. Comenzamos escuchando las voces que importan: fundadores, usuarios y stakeholders que dan vida a cada iniciativa.',
        'Cada gran proyecto nace de una comprensión profunda del contexto. Las entrevistas nos revelan la verdadera esencia y potencial de cada idea.',
        'Una estrategia sólida guía cada decisión. Definimos el camino más efectivo hacia nuestros objetivos.'
      ],
      'strategy-1': [
        'A todos nos ha pasado: tener una idea y no saber cómo aterrizarla. El primer paso no es diseñar ni planificar, sino escuchar. Las entrevistas con fundadores, equipo y usuarios nos permiten entender la historia desde dentro.',
        'La estrategia es el fundamento de todo proyecto exitoso. Comenzamos escuchando las voces que importan: fundadores, usuarios y stakeholders que dan vida a cada iniciativa.',
        'Cada gran proyecto nace de una comprensión profunda del contexto. Las entrevistas nos revelan la verdadera esencia y potencial de cada idea.'
      ],
      'strategy-2': [
        'Mirar hacia fuera es tan importante como escuchar dentro. El mercado no es una amenaza: es el terreno donde la idea se pone a prueba. Analizamos competidores directos e indirectos, categorías, tendencias y comportamientos.',
        'El análisis competitivo revela oportunidades ocultas. Entendemos el panorama completo para posicionar la propuesta de valor de manera única.',
        'El mercado es nuestro laboratorio. Cada competidor nos enseña algo sobre lo que funciona y lo que podemos mejorar.'
      ],
      'strategy-3': [
        'Una vez entendido el contexto y el entorno, llega el momento de elegir una dirección. El plan une la visión con los recursos: define prioridades, metas y tiempos.',
        'La planificación estratégica transforma ideas en acciones concretas. Definimos el camino más efectivo hacia nuestros objetivos.',
        'Un plan sólido es la brújula que guía cada decisión. Establecemos prioridades claras y tiempos realistas.'
      ],
      'brand-0': [
        'Una marca fuerte es el alma de cualquier proyecto. Definimos su esencia, valores y personalidad para crear conexiones auténticas con tu audiencia.',
        'La marca trasciende lo visual. Es la experiencia completa que vives con un proyecto, desde el primer contacto hasta la relación a largo plazo.',
        'Los valores son la columna vertebral de la marca. Establecen los principios que guían cada interacción y decisión.'
      ],
      'brand-1': [
        'Cuando todo cambia, los valores son lo único que permanece. Aquí se define el propósito, la esencia que da coherencia al resto. No son palabras bonitas para un manifiesto: son decisiones que marcarán cada elección futura.',
        'Una marca fuerte es el alma de cualquier proyecto. Definimos su esencia, valores y personalidad para crear conexiones auténticas con tu audiencia.',
        'Los valores son la columna vertebral de la marca. Establecen los principios que guían cada interacción y decisión.'
      ],
      'brand-2': [
        'Cuando le ponemos nombre a algo, lo volvemos real. El lenguaje convierte la idea en presencia. Aquí trabajamos cómo suena la marca cuando habla: su nombre, su tono, su narrativa.',
        'El lenguaje da vida a la marca. Desarrollamos un sistema verbal coherente que resuena con la audiencia objetivo.',
        'Las palabras tienen poder. Creamos un universo lingüístico que conecta emocionalmente con las personas.'
      ],
      'brand-3': [
        'El logo es la síntesis más clara de una idea. Una combinación de forma, nombre y símbolo que se vuelve reconocible. Pero el sistema visual va más allá: es el conjunto de decisiones que hacen coherente todo lo que la marca toca.',
        'El sistema visual es la expresión tangible de la marca. Diseñamos elementos que comunican la personalidad y valores de forma consistente.',
        'La identidad visual trasciende lo estético. Cada elemento está pensado para reforzar la narrativa de la marca.'
      ],
      'product-0': [
        'Un gran producto resuelve problemas reales de forma elegante. Diseñamos funcionalidades que importan y experiencias que enamoran.',
        'El producto es el puente entre la visión y la realidad. Cada función, cada interacción, cada detalle está pensado para crear valor genuino.',
        'La iteración es el camino hacia la excelencia. Cada prototipo nos acerca más a la solución perfecta.'
      ],
      'product-1': [
        'Definir las funcionalidades es definir el alma del producto. Aquí se decide qué debe hacer, cómo y para quién. El MVP no es una versión reducida: es la esencia funcional.',
        'Un gran producto resuelve problemas reales de forma elegante. Diseñamos funcionalidades que importan y experiencias que enamoran.',
        'El producto es el puente entre la visión y la realidad. Cada función, cada interacción, cada detalle está pensado para crear valor genuino.'
      ],
      'product-2': [
        'Iterar no es corregir, es aprender. Los prototipos se diseñan para descubrir lo que aún no sabemos. Se prueban hipótesis, se recogen datos, se afinan detalles.',
        'La iteración es el camino hacia la excelencia. Cada prototipo nos acerca más a la solución perfecta.',
        'Los prototipos son experimentos controlados. Nos permiten validar ideas antes de comprometer recursos importantes.'
      ],
      'product-3': [
        'Llega el momento de ponerlo en marcha. Shipping no es el cierre, es la apertura al mundo real. Lo que antes eran hipótesis se convierte en hechos.',
        'El lanzamiento es el inicio de una nueva fase. Preparamos todo para que el producto encuentre su lugar en el mercado.',
        'Shipping marca el comienzo del aprendizaje real. El producto finalmente se enfrenta a sus usuarios verdaderos.'
      ],
      'messages-0': [
        'Una comunicación efectiva transforma ideas en conexiones. Desarrollamos mensajes que resuenan y estrategias que impactan.',
        'Los mensajes dan vida a la marca. Cada contenido, cada campaña, cada palabra está diseñada para crear conversaciones significativas.',
        'Las redes no son escaparates, son conversaciones. Aquí se define cómo la marca se presenta, cómo responde, cómo escucha.'
      ],
      'messages-1': [
        'Las redes no son escaparates, son conversaciones. Aquí se define cómo la marca se presenta, cómo responde, cómo escucha. La presencia digital es ritmo, tono y continuidad.',
        'Una comunicación efectiva transforma ideas en conexiones. Desarrollamos mensajes que resuenan y estrategias que impactan.',
        'Los mensajes dan vida a la marca. Cada contenido, cada campaña, cada palabra está diseñada para crear conversaciones significativas.'
      ],
      'messages-2': [
        'Los anuncios son momentos breves de atención. Cada uno debe decir lo máximo en lo mínimo. Aquí se traduce la estrategia en piezas concretas: campañas, clips, titulares.',
        'La publicidad eficaz comunica valor en segundos. Creamos mensajes que capturan la atención y generan acción.',
        'Cada anuncio es una oportunidad de conexión. Diseñamos piezas que no solo venden, sino que construyen relaciones.'
      ],
      'messages-3': [
        'El merchandising es la parte tangible del mensaje. Cuando se diseña con intención, se convierte en una extensión emocional de la marca. Una camiseta, un cartel o un cuaderno son recordatorios de pertenencia.',
        'El merchandising amplifica el mensaje de marca. Cada objeto se convierte en un embajador silencioso de los valores.',
        'Los objetos cuentan historias. Diseñamos merchandising que refuerza la conexión emocional con la marca.'
      ],
      'launch-1': [
        'El lanzamiento no es un final feliz: es el principio del cambio. Lo importante no es llegar, sino escuchar lo que ocurre después. Cada release enseña algo nuevo sobre el producto.',
        'El lanzamiento marca el inicio de una nueva era. Preparamos todo para que el producto encuentre su audiencia.',
        'Cada lanzamiento es una oportunidad de aprendizaje. El feedback real nos guía hacia la mejora continua.'
      ],
      'launch-2': [
        'Todo el proceso se compila en un Brandbook completo. Una síntesis de la estrategia, la identidad, el producto y los mensajes. El documento que cuenta la historia completa de la marca.',
        'El Brandbook es la biblia de la marca. Recopila todas las decisiones y directrices para mantener la coherencia.',
        'Un Brandbook bien estructurado es la guía definitiva. Documenta cada aspecto de la identidad para uso futuro.'
      ]
    };
    const alternatives = contentMap[stepId] || [''];
    const versionIndex = Math.max(0, selectedVersion - 1);
    return alternatives[versionIndex] || alternatives[0] || '';
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
                e.target.style.borderColor = '#ffffff';
                e.target.style.boxShadow = '0 0 0 2px rgba(74, 158, 255, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#333333';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        );

      case 'textarea':
        return (
          <div style={{ position: 'relative' }}>
            <textarea
              value={value || ''}
              onChange={(e) => updateField(step.field, e.target.value)}
              style={{
                width: '100%',
                height: '120px',
                padding: '12px 48px 12px 16px',
                fontSize: '16px',
                border: '1px solid #333333',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                color: '#ffffff',
                outline: 'none',
                transition: 'all 0.2s ease',
                resize: 'none'
              }}
              placeholder={step.title}
              autoFocus
              onFocus={(e) => {
                e.target.style.borderColor = '#ffffff';
                e.target.style.boxShadow = '0 0 0 2px rgba(74, 158, 255, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#333333';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        );

      case 'intro':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
            {/* Texto introductorio */}
            <div style={{ 
              fontSize: '18px', 
              lineHeight: '1.6', 
              color: '#ffffff',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <p style={{ marginBottom: '24px' }}>
                Bienvenido al <strong>S+C Framework</strong>, una metodología completa para desarrollar tu marca y producto desde cero hasta el lanzamiento.
              </p>
              <p style={{ marginBottom: '24px' }}>
                Este proceso te guiará a través de 5 fases fundamentales, cada una diseñada para construir una base sólida para tu proyecto.
              </p>
            </div>

            {/* Tabla de contenidos */}
            <div style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.3)', 
              borderRadius: '8px', 
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ 
                color: '#ffffff', 
                fontSize: '20px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                Tabla de Contenidos
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {/* 1. Strategy */}
                <div style={{ 
                  padding: '16px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '8px' }}>1. Strategy</h4>
                  <p style={{ color: '#cccccc', fontSize: '14px', margin: '0' }}>
                    Análisis del mercado, competidores y definición de la estrategia base.
                  </p>
                </div>

                {/* 2. Brand */}
                <div style={{ 
                  padding: '16px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '8px' }}>2. Brand</h4>
                  <p style={{ color: '#cccccc', fontSize: '14px', margin: '0' }}>
                    Desarrollo de valores, naming y identidad visual de la marca.
                  </p>
                </div>

                {/* 3. Product */}
                <div style={{ 
                  padding: '16px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '8px' }}>3. Product</h4>
                  <p style={{ color: '#cccccc', fontSize: '14px', margin: '0' }}>
                    Definición de features, prototipo y plan de lanzamiento.
                  </p>
                </div>
              </div>
            </div>

            {/* Botón para continuar */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                onClick={handleNext}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ffffff';
                }}
              >
                Comenzar Framework
              </button>
            </div>
          </div>
        );

      case 'interview':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* Nombre de la empresa */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 0',
                borderBottom: '1px solid #333333',
                cursor: 'text',
                transition: 'all 0.2s ease'
              }}
              onClick={() => {
                const input = document.querySelector('input[data-field="name"]') as HTMLInputElement;
                input?.focus();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = '#ffffff';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = '#333333';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <label style={{ 
                fontSize: '16px', 
                color: '#ffffff', 
                fontWeight: '600'
              }}>
                Nombre
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  data-field="name"
                  type="text"
                  value={value?.name || ''}
                  onChange={(e) => {
                    updateField(step.field, { ...value, name: e.target.value });
                  }}
                  style={{
                    width: '200px',
                    height: '48px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  autoFocus
                />
              </div>
            </div>

            {/* Tamaño de la empresa */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 0',
                borderBottom: '1px solid #333333',
                cursor: 'text',
                transition: 'all 0.2s ease'
              }}
              onClick={() => {
                // Focus en el input de tamaño
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = '#ffffff';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = '#333333';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <label style={{ 
                fontSize: '16px', 
                color: '#ffffff', 
                fontWeight: '600'
              }}>
                Tamaño
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentSize = value?.size || '1-10';
                      const sizes = ['1-10', '11-50', '51-200', '201-500', '500+'];
                      const currentIndex = sizes.indexOf(currentSize);
                      const newIndex = Math.max(0, currentIndex - 1);
                      updateField(step.field, { ...value, size: sizes[newIndex] });
                    }}
                    style={{
                      width: '32px',
                      height: '48px',
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
                    -
                  </button>
                  <input
                    type="text"
                    value={value?.size || ''}
                    readOnly
                    style={{
                      width: '120px',
                      height: '48px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      outline: 'none',
                      textAlign: 'center'
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentSize = value?.size || '1-10';
                      const sizes = ['1-10', '11-50', '51-200', '201-500', '500+'];
                      const currentIndex = sizes.indexOf(currentSize);
                      const newIndex = Math.min(sizes.length - 1, currentIndex + 1);
                      updateField(step.field, { ...value, size: sizes[newIndex] });
                    }}
                    style={{
                      width: '32px',
                      height: '48px',
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
                    +
            </button>
          </div>
              </div>
            </div>

            {/* Industria */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 0',
                borderBottom: '1px solid #333333',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => {
                const select = document.querySelector('select[data-field="industry"]') as HTMLSelectElement;
                select?.focus();
                select?.click();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = '#ffffff';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = '#333333';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <label style={{ 
                fontSize: '16px', 
                color: '#ffffff', 
                fontWeight: '600'
              }}>
                Industria
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <select
                  data-field="industry"
                  value={value?.industry || ''}
                  onChange={(e) => updateField(step.field, { ...value, industry: e.target.value })}
                  style={{
                    width: '200px',
                    height: '48px',
                    padding: '12px 48px 12px 16px',
                    fontSize: '16px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23666' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px'
                  }}
                >
                  <option value="" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Seleccionar industria</option>
                  <option value="Tecnología" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Tecnología</option>
                  <option value="Salud" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Salud</option>
                  <option value="Educación" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Educación</option>
                  <option value="Finanzas" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Finanzas</option>
                  <option value="Retail" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Retail</option>
                  <option value="Manufactura" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Manufactura</option>
                  <option value="Consultoría" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Consultoría</option>
                  <option value="Marketing" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Marketing</option>
                  <option value="Otro" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Otro</option>
                </select>
              </div>
            </div>

            {/* Fundador */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 0',
                borderBottom: '1px solid #333333',
                cursor: 'text',
                transition: 'all 0.2s ease'
              }}
              onClick={() => {
                const input = document.querySelector('input[data-field="founder"]') as HTMLInputElement;
                input?.focus();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = '#ffffff';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = '#333333';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <label style={{ 
                fontSize: '16px', 
                color: '#ffffff', 
                fontWeight: '600'
              }}>
                Fundador
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  data-field="founder"
                  type="text"
                  value={value?.founder || ''}
                  onChange={(e) => updateField(step.field, { ...value, founder: e.target.value })}
                  style={{
                    width: '200px',
                    height: '48px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                />
              </div>
            </div>

            {/* Descripción */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '24px 0',
                cursor: 'text',
                transition: 'all 0.2s ease'
              }}
              onClick={() => {
                const textarea = document.querySelector('textarea[data-field="description"]') as HTMLTextAreaElement;
                textarea?.focus();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <label style={{ 
                fontSize: '16px', 
                color: '#ffffff', 
                fontWeight: '600',
                marginTop: '12px'
              }}>
                Descripción
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <textarea
                  data-field="description"
                  value={value?.description || ''}
                  onChange={(e) => updateField(step.field, { ...value, description: e.target.value })}
                  style={{
                    width: '400px',
                    minHeight: '80px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'all 0.2s ease'
                  }}
                />
                <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
                </div>
              </div>
            </div>
          </div>
        );

      case 'competitors':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Matriz de competidores */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '400px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #333333',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {/* Líneas de la cuadrícula */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                right: '0',
                height: '1px',
                backgroundColor: '#333333',
                zIndex: 1
              }} />
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '0',
                bottom: '0',
                width: '1px',
                backgroundColor: '#333333',
                zIndex: 1
              }} />
              
              {/* Etiquetas de ejes */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                color: '#666666',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {value?.yAxis || 'Eje Y'}
              </div>
              <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                color: '#666666',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {value?.xAxis || 'Eje X'}
              </div>

              {/* Competidores en la matriz */}
              {(value?.competitors || []).map((competitor: any, index: number) => {
                const x = competitor.x !== undefined ? competitor.x : 50 + (index * 20) % 60;
                const y = competitor.y !== undefined ? competitor.y : 50 + (index * 15) % 40;
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];
                const color = colors[index % colors.length];
                
                return (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      left: `${x}%`,
                      top: `${100 - y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '60px',
                      height: '60px',
                      backgroundColor: color,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'move',
                      border: '2px solid #ffffff',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#ffffff',
                      textAlign: 'center',
                      zIndex: 2,
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translate(-50%, -50%) scale(1.1)';
                      e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translate(-50%, -50%) scale(1)';
                      e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
                    }}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = 'move';
                      e.dataTransfer.setData('text/plain', index.toString());
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
                      const matrixContainer = e.currentTarget.parentElement;
                      if (matrixContainer && draggedIndex !== undefined) {
                        const rect = matrixContainer.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((rect.bottom - e.clientY) / rect.height) * 100;
                        
                        const newCompetitors = [...(value?.competitors || [])];
                        newCompetitors[draggedIndex] = { 
                          ...newCompetitors[draggedIndex], 
                          name: newCompetitors[draggedIndex].name || newCompetitors[draggedIndex],
                          x: Math.max(10, Math.min(90, x)),
                          y: Math.max(10, Math.min(90, y))
                        };
                        updateField(step.field, { ...value, competitors: newCompetitors });
                      }
                    }}
                  >
                    {competitor.name || competitor || `C${index + 1}`}
                  </div>
                );
              })}
            </div>
            
            
            {/* Lista de competidores */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600' }}>
                  Competidores
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    type="text"
                    value={value?.yAxis || ''}
                    onChange={(e) => updateField(step.field, { ...value, yAxis: e.target.value })}
                    style={{
                      width: '80px',
                      height: '32px',
                      padding: '6px 8px',
                      fontSize: '12px',
                      border: 'none',
                      borderBottom: '1px solid #333333',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.borderBottomColor = '#ffffff'}
                    onMouseLeave={(e) => e.target.style.borderBottomColor = '#333333'}
                  />
                  <input
                    type="text"
                    value={value?.xAxis || ''}
                    onChange={(e) => updateField(step.field, { ...value, xAxis: e.target.value })}
                    style={{
                      width: '80px',
                      height: '32px',
                      padding: '6px 8px',
                      fontSize: '12px',
                      border: 'none',
                      borderBottom: '1px solid #333333',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.borderBottomColor = '#ffffff'}
                    onMouseLeave={(e) => e.target.style.borderBottomColor = '#333333'}
                  />
                </div>
              </div>
              {(value?.competitors || []).map((competitor: any, index: number) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  padding: '24px 0',
                  borderBottom: index < (value?.competitors || []).length - 1 ? '1px solid #333333' : 'none'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'][index % 8],
                    borderRadius: '50%',
                    flexShrink: 0
                  }} />
                  <div style={{ position: 'relative', flex: 1 }}>
                    <input
                      type="text"
                      value={competitor.name || competitor || ''}
                      onChange={(e) => {
                        const newCompetitors = [...(value?.competitors || [])];
                        newCompetitors[index] = { 
                          ...newCompetitors[index], 
                          name: e.target.value,
                          x: newCompetitors[index].x !== undefined ? newCompetitors[index].x : 50 + (index * 20) % 60,
                          y: newCompetitors[index].y !== undefined ? newCompetitors[index].y : 50 + (index * 15) % 40
                        };
                        updateField(step.field, { ...value, competitors: newCompetitors });
                      }}
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '12px 48px 12px 16px',
                        fontSize: '16px',
                        border: 'none',
                        borderBottom: '1px solid #333333',
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.borderBottomColor = '#ffffff'}
                      onMouseLeave={(e) => e.target.style.borderBottomColor = '#333333'}
                      placeholder="Nombre del competidor"
                      autoFocus={index === (value?.competitors || []).length - 1}
                    />
                  </div>
                  <button
                    onClick={() => {
                      const newCompetitors = (value?.competitors || []).filter((_: any, i: number) => i !== index);
                      updateField(step.field, { ...value, competitors: newCompetitors });
                    }}
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
                    onMouseEnter={(e) => e.target.style.color = '#ff4444'}
                    onMouseLeave={(e) => e.target.style.color = '#666666'}
                  >
                    <Trash2 style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
              ))}
              
            <button
                onClick={() => {
                  const currentCount = (value?.competitors || []).length;
                  const maxCompetitors = selectedMode === 'startup' ? 3 : selectedMode === 'scaleup' ? 6 : 10;
                  
                  if (currentCount >= maxCompetitors) {
                    alert(`Máximo ${maxCompetitors} competidores para modo ${selectedMode.toUpperCase()}`);
                    return;
                  }
                  
                  updateField(step.field, { 
                    ...value, 
                    competitors: [...(value?.competitors || []), ''],
                    xAxis: value?.xAxis || '',
                    yAxis: value?.yAxis || ''
                  });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '48px',
                  padding: '0 16px',
                  fontSize: '14px',
                  color: '#666666',
                  backgroundColor: 'transparent',
                  border: '1px solid #333333',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#666666';
                  e.target.style.borderColor = '#333333';
                }}
              >
                <Plus style={{ width: '16px', height: '16px' }} />
                Añadir competidor ({(value?.competitors || []).length}/{selectedMode === 'startup' ? 3 : selectedMode === 'scaleup' ? 6 : 10})
            </button>
            </div>
          </div>
        );

      case 'plan':
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {(value || ['', '', '']).map((item: string, index: number) => (
              <div key={index}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '24px 0' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                        const newPlan = [...(value || [])];
                      newPlan[index] = e.target.value;
                      updateField(step.field, newPlan);
                    }}
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '12px 48px 12px 16px',
                        fontSize: '16px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      placeholder="Propuesta de valor"
                      autoFocus={index === (value || []).length - 1}
                    />
                  </div>
                  <button
                    onClick={() => {
                      const newPlan = (value || []).filter((_: any, i: number) => i !== index);
                      updateField(step.field, newPlan);
                    }}
                    style={{
                      padding: '8px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#666666',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#ff4444'}
                    onMouseLeave={(e) => e.target.style.color = '#666666'}
                  >
                    <Trash2 style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
                {index < (value || []).length - 1 && (
                  <div style={{ 
                    height: '1px', 
                    backgroundColor: '#333333', 
                    margin: '0 0 0 0' 
                  }} />
                )}
              </div>
            ))}
            
            <button
              onClick={() => updateField(step.field, [...(value || []), ''])}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '48px',
                padding: '0 16px',
                fontSize: '14px',
                color: '#666666',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginTop: '16px'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666666';
              }}
            >
              <Plus style={{ width: '16px', height: '16px' }} />
              Añadir propuesta de valor
            </button>
          </div>
        );

      case 'values':
      return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(value || [
              { value: '', opposite: '' },
              { value: '', opposite: '' },
              { value: '', opposite: '' }
            ]).map((item: any, index: number) => (
              <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={item.value || ''}
                  onChange={(e) => {
                    const newValues = [...value];
                    newValues[index] = { ...newValues[index], value: e.target.value };
                    updateField(step.field, newValues);
                  }}
                  style={{
                    flex: 1,
                    height: '48px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  placeholder="Valor"
                />
                <div style={{ color: '#666666', fontSize: '16px', fontWeight: '500' }}>vs</div>
                <input
                  type="text"
                  value={item.opposite || ''}
                  onChange={(e) => {
                    const newValues = [...value];
                    newValues[index] = { ...newValues[index], opposite: e.target.value };
                    updateField(step.field, newValues);
                  }}
                  style={{
                    flex: 1,
                    height: '48px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  placeholder="Contrario"
                />
                <button
                  onClick={() => {
                    const newValues = value.filter((_: any, i: number) => i !== index);
                    updateField(step.field, newValues);
                  }}
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
                  onMouseEnter={(e) => e.target.style.color = '#ff4444'}
                  onMouseLeave={(e) => e.target.style.color = '#666666'}
                >
                  <Trash2 style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            ))}
            <button
              onClick={() => updateField(step.field, [...value, { value: '', opposite: '' }])}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '48px',
                padding: '0 16px',
                fontSize: '14px',
                color: '#666666',
                backgroundColor: 'transparent',
                border: '1px solid #333333',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
                e.target.style.borderColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666666';
                e.target.style.borderColor = '#333333';
              }}
            >
              <Plus style={{ width: '16px', height: '16px' }} />
              Añadir valor
            </button>
            </div>
        );

      case 'features':
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {(value || ['', '', '']).map((feature: string, index: number) => (
              <div key={index}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '24px 0' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...(value || [])];
                        newFeatures[index] = e.target.value;
                        updateField(step.field, newFeatures);
                      }}
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '12px 48px 12px 16px',
                        fontSize: '16px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      placeholder="Funcionalidad"
                      autoFocus={index === (value || []).length - 1}
                    />
                  </div>
                  <button
                    onClick={() => {
                      const newFeatures = (value || []).filter((_: any, i: number) => i !== index);
                      updateField(step.field, newFeatures);
                    }}
                    style={{
                      padding: '8px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#666666',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#ff4444'}
                    onMouseLeave={(e) => e.target.style.color = '#666666'}
                  >
                    <Trash2 style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
                {index < (value || []).length - 1 && (
                  <div style={{ 
                    height: '1px', 
                    backgroundColor: '#333333', 
                    margin: '0 0 0 0' 
                  }} />
                )}
              </div>
            ))}
            
            <button
              onClick={() => updateField(step.field, [...(value || []), ''])}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '48px',
                padding: '0 16px',
                fontSize: '14px',
                color: '#666666',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginTop: '16px'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666666';
              }}
            >
              <Plus style={{ width: '16px', height: '16px' }} />
              Añadir funcionalidad
            </button>
          </div>
        );

      case 'social':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Social Media Mockup */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #333333',
              borderRadius: '8px'
            }}>
              <div style={{
                position: 'relative',
                width: '300px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}>
                {/* Avatar */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#ffffff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: '#ffffff',
                  marginBottom: '12px'
                }}>
                  {(value?.name || 'Marca').charAt(0).toUpperCase()}
                </div>
                
                {/* Name - Editable */}
                <input
                  type="text"
                  value={value?.name || ''}
                  onChange={(e) => updateField(step.field, { ...value, name: e.target.value })}
                  style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#000000',
                    marginBottom: '4px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    textAlign: 'center'
                  }}
                  placeholder="Nombre de la marca"
                  autoFocus
                />
                
                {/* Bio */}
                <div style={{
                  fontSize: '14px',
                  color: '#666666',
                  lineHeight: '1.4'
                }}>
                  {value?.bio || 'Descripción de la marca y su propuesta de valor'}
                </div>
                
                {/* Background Pattern */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '80px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #007AFF 100%)',
                  borderRadius: '12px 12px 0 0'
                }}></div>
              </div>
            </div>
            
            {/* Bio Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <textarea
                value={value?.bio || ''}
              onChange={(e) => updateField(step.field, { ...value, bio: e.target.value })}
                style={{
                  width: '100%',
                  height: '80px',
                  padding: '12px 16px',
                  fontSize: '16px',
                  border: '1px solid #333333',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  resize: 'none'
                }}
                placeholder="Bio de la marca"
              />
            </div>
          </div>
        );

      case 'questions':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(value || []).map((q: any, index: number) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                border: '1px solid #333333'
              }}>
                <span style={{ color: '#ffffff', fontSize: '14px' }}>{q.question}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      const newQuestions = [...(value || [])];
                      newQuestions[index] = { ...newQuestions[index], answer: true };
                      updateField(step.field, newQuestions);
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: q.answer === true ? '#ffffff' : '#333333',
                      color: q.answer === true ? '#ffffff' : '#666666',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => {
                      const newQuestions = [...(value || [])];
                      newQuestions[index] = { ...newQuestions[index], answer: false };
                      updateField(step.field, newQuestions);
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: q.answer === false ? '#ffffff' : '#333333',
                      color: q.answer === false ? '#ffffff' : '#666666',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            ))}
        </div>
      );

      case 'rollout':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {(value || [
              { date: '', task: '', completed: false },
              { date: '', task: '', completed: false },
              { date: '', task: '', completed: false }
            ]).map((item: any, index: number) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '24px 0',
                borderBottom: '1px solid #333333'
              }}>
                <input
                  type="date"
                  value={item.date || ''}
                  onChange={(e) => {
                    const newRollout = [...(value || [
                      { date: '', task: '', completed: false },
                      { date: '', task: '', completed: false },
                      { date: '', task: '', completed: false }
                    ])];
                    newRollout[index] = { ...newRollout[index], date: e.target.value };
                    updateField(step.field, newRollout);
                  }}
                  style={{
                    height: '48px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                />
                <input
                  type="text"
                  value={item.task || ''}
                  onChange={(e) => {
                    const newRollout = [...(value || [
                      { date: '', task: '', completed: false },
                      { date: '', task: '', completed: false },
                      { date: '', task: '', completed: false }
                    ])];
                    newRollout[index] = { ...newRollout[index], task: e.target.value };
                    updateField(step.field, newRollout);
                  }}
                  style={{
                    flex: 1,
                    height: '48px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  placeholder="Tarea del plan"
                />
                <button
                  onClick={() => {
                    const newRollout = [...(value || [
                      { date: '', task: '', completed: false },
                      { date: '', task: '', completed: false },
                      { date: '', task: '', completed: false }
                    ])];
                    newRollout[index] = { ...newRollout[index], completed: !newRollout[index].completed };
                    updateField(step.field, newRollout);
                  }}
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '2px solid #333333',
                    borderRadius: '50%',
                    backgroundColor: item.completed ? '#ffffff' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.borderColor = '#333333'}
                >
                  {item.completed && (
                    <div style={{ color: '#000000', fontSize: '14px', fontWeight: 'bold' }}>✓</div>
                  )}
                </button>
              </div>
            ))}
            
            <button
              onClick={() => updateField(step.field, [...(value || [
                { date: '', task: '', completed: false },
                { date: '', task: '', completed: false },
                { date: '', task: '', completed: false }
              ]), { date: '', task: '', completed: false }])}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '48px',
                padding: '0 16px',
                fontSize: '14px',
                color: '#666666',
                backgroundColor: 'transparent',
                border: '1px solid #333333',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
                e.target.style.borderColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666666';
                e.target.style.borderColor = '#333333';
              }}
            >
              <Plus style={{ width: '16px', height: '16px' }} />
              Añadir tarea al plan
            </button>
          </div>
        );

      case 'campaign':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(value || []).map((campaign: any, index: number) => (
              <div key={index} style={{
                padding: '20px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                border: '1px solid #333333'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="text"
                    value={campaign.title || ''}
                    onChange={(e) => {
                      const newCampaigns = [...(value || [])];
                      newCampaigns[index] = { ...newCampaigns[index], title: e.target.value };
                      updateField(step.field, newCampaigns);
                    }}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      border: '1px solid #333333',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      outline: 'none'
                    }}
                    placeholder="Título de la campaña"
                  />
                  <textarea
                    value={campaign.description || ''}
                    onChange={(e) => {
                      const newCampaigns = [...(value || [])];
                      newCampaigns[index] = { ...newCampaigns[index], description: e.target.value };
                      updateField(step.field, newCampaigns);
                    }}
                    style={{
                      width: '100%',
                      height: '80px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      border: '1px solid #333333',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      outline: 'none',
                      resize: 'none'
                    }}
                    placeholder="Descripción de la campaña"
                  />
                  <input
                    type="url"
                    value={campaign.link || ''}
                    onChange={(e) => {
                      const newCampaigns = [...(value || [])];
                      newCampaigns[index] = { ...newCampaigns[index], link: e.target.value };
                      updateField(step.field, newCampaigns);
                    }}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      border: '1px solid #333333',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      outline: 'none'
                    }}
                    placeholder="Enlace o URL"
                  />
                </div>
                <button
                  onClick={() => {
                    const newCampaigns = (value || []).filter((_: any, i: number) => i !== index);
                    updateField(step.field, newCampaigns);
                  }}
                  style={{
                    marginTop: '12px',
                    padding: '8px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#666666',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#ff4444'}
                  onMouseLeave={(e) => e.target.style.color = '#666666'}
                >
                  <Trash2 style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            ))}
            
            <button
              onClick={() => updateField(step.field, [...(value || []), { title: '', description: '', link: '' }])}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '48px',
                padding: '0 16px',
                fontSize: '14px',
                color: '#666666',
                backgroundColor: 'transparent',
                border: '1px solid #333333',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
                e.target.style.borderColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666666';
                e.target.style.borderColor = '#333333';
              }}
            >
              <Plus style={{ width: '16px', height: '16px' }} />
              Añadir campaña
            </button>
          </div>
        );

      case 'logo':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* Logo Preview */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '120px',
              backgroundColor: value?.backgroundColor || '#1a1a1a',
              border: '1px solid #333333',
              borderRadius: '8px',
              marginBottom: '24px',
              gap: '16px'
            }}>
              {value?.icon && (
                <div style={{
                  width: '64px',
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: value?.textColor || '#ffffff'
                }}>
                  {getIconComponent(value?.icon)}
                </div>
              )}
              <div style={{
                fontSize: '24px',
                fontWeight: '500',
                color: value?.textColor || '#ffffff',
                textAlign: 'center',
                fontFamily: value?.typography || 'Inter'
              }}>
                {getFieldValue('brand.names')?.selectedName || 'Marca'}
              </div>
            </div>
            
            {/* Typography Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 0',
              borderBottom: '1px solid #333333'
            }}>
              <label style={{ 
                fontSize: '16px', 
                color: '#ffffff', 
                fontWeight: '600'
              }}>
                Tipografía
              </label>
              <div style={{ position: 'relative', minWidth: '200px' }}>
                <select
                  value={value?.typography || 'Inter'}
                  onChange={(e) => updateField(step.field, { ...value, typography: e.target.value })}
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '8px 32px 8px 12px',
                    fontSize: '14px',
                    border: 'none',
                    borderBottom: '1px solid #333333',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    outline: 'none',
                    appearance: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: value?.typography || 'Inter'
                  }}
                  onMouseEnter={(e) => e.target.style.borderBottomColor = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.borderBottomColor = '#333333'}
                  onFocus={(e) => e.target.style.borderBottomColor = '#ffffff'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#333333'}
                >
                  {['Inter', 'Helvetica', 'Arial', 'Roboto', 'Montserrat', 'Poppins', 'Open Sans', 'Lato'].map((font, index) => (
                    <option key={index} value={font} style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
                      {font}
                    </option>
                  ))}
                </select>
                <div style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#666666',
                  fontSize: '12px'
                }}>
                  ▼
                </div>
              </div>
            </div>
            
            {/* Color */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 0',
              borderBottom: '1px solid #333333'
            }}>
              <label style={{ 
                fontSize: '16px', 
                color: '#ffffff', 
                fontWeight: '600'
              }}>
                Color
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#cccccc' }}>Fondo</span>
                  <input
                    type="color"
                    value={value?.backgroundColor || '#000000'}
                    onChange={(e) => updateField(step.field, { ...value, backgroundColor: e.target.value })}
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '1px solid #333333',
                      borderRadius: '50%',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.borderColor = '#ffffff'}
                    onMouseLeave={(e) => e.target.style.borderColor = '#333333'}
                  />
                </div>
                <div style={{ 
                  width: '1px', 
                  height: '20px', 
                  backgroundColor: '#333333' 
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#cccccc' }}>Texto</span>
                  <input
                    type="color"
                    value={value?.textColor || '#ffffff'}
                    onChange={(e) => updateField(step.field, { ...value, textColor: e.target.value })}
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '1px solid #333333',
                      borderRadius: '50%',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.borderColor = '#ffffff'}
                    onMouseLeave={(e) => e.target.style.borderColor = '#333333'}
                  />
                </div>
              </div>
            </div>
            
            {/* Icono */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 0'
            }}>
              <label style={{ 
                fontSize: '16px', 
                color: '#ffffff', 
                fontWeight: '600'
              }}>
                Icono
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['zap', 'rocket', 'lightbulb', 'target', 'star', 'flame', 'gem', 'sparkles'].map((iconName, index) => (
                  <button
                    key={index}
                    onClick={() => updateField(step.field, { ...value, icon: iconName })}
                    style={{
                      width: '32px',
                      height: '32px',
                      border: value?.icon === iconName ? '2px solid #ffffff' : '1px solid #333333',
                      borderRadius: '50%',
                      backgroundColor: value?.icon === iconName ? '#2a2a2a' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: value?.icon === iconName ? '#ffffff' : '#666666'
                    }}
                    onMouseEnter={(e) => {
                      if (value?.icon !== iconName) {
                        e.target.style.borderColor = '#666666';
                        e.target.style.color = '#ffffff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (value?.icon !== iconName) {
                        e.target.style.borderColor = '#333333';
                        e.target.style.color = '#666666';
                      }
                    }}
                  >
                    {getIconComponent(iconName)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'archetypes':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {[
                { name: 'El Experto', description: 'Autoridad y conocimiento', example: 'IBM, Harvard' },
                { name: 'El Cuidador', description: 'Protección y cuidado', example: 'Johnson & Johnson, Volvo' },
                { name: 'El Héroe', description: 'Valentía y determinación', example: 'Nike, FedEx' },
                { name: 'El Inocente', description: 'Simplicidad y optimismo', example: 'Coca-Cola, McDonald\'s' },
                { name: 'El Explorador', description: 'Aventura y descubrimiento', example: 'Red Bull, Jeep' },
                { name: 'El Rebelde', description: 'Revolución y cambio', example: 'Harley-Davidson, Apple' },
                { name: 'El Mago', description: 'Transformación y visión', example: 'Disney, Tesla' },
                { name: 'El Gobernante', description: 'Liderazgo y control', example: 'Mercedes-Benz, Rolex' }
              ].map((archetype, index) => (
                <button
                  key={index}
                  onClick={() => updateField(step.field, archetype)}
                  style={{
                    padding: '20px',
                    backgroundColor: value?.name === archetype.name ? 'rgba(74, 158, 255, 0.1)' : '#1a1a1a',
                    border: value?.name === archetype.name ? '2px solid #ffffff' : '1px solid #333333',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (value?.name !== archetype.name) {
                      e.target.style.backgroundColor = '#2a2a2a';
                      e.target.style.borderColor = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (value?.name !== archetype.name) {
                      e.target.style.backgroundColor = '#1a1a1a';
                      e.target.style.borderColor = '#333333';
                    }
                  }}
                >
                  <h3 style={{ 
                    color: '#ffffff', 
                    fontSize: '16px', 
                    fontWeight: '500', 
                    marginBottom: '8px' 
                  }}>
                    {archetype.name}
                  </h3>
                  <p style={{ 
                    color: '#cccccc', 
                    fontSize: '14px', 
                    marginBottom: '8px' 
                  }}>
                    {archetype.description}
                  </p>
                  <p style={{ 
                    color: '#666666', 
                    fontSize: '12px' 
                  }}>
                    {archetype.example}
                  </p>
                </button>
              ))}
            </div>
            
            {value && (
              <div style={{
                padding: '20px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                border: '1px solid #333333'
              }}>
                <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '12px' }}>
                  Arquetipo Seleccionado: {value.name}
                </h3>
                <p style={{ color: '#cccccc', fontSize: '16px', marginBottom: '16px' }}>
                  {value.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="text"
                    value={value.tone || ''}
                    onChange={(e) => updateField(step.field, { ...value, tone: e.target.value })}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      border: '1px solid #333333',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      outline: 'none'
                    }}
                    placeholder="Tono de voz específico"
                  />
                  <textarea
                    value={value.guidelines || ''}
                    onChange={(e) => updateField(step.field, { ...value, guidelines: e.target.value })}
                    style={{
                      width: '100%',
                      height: '100px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      border: '1px solid #333333',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      outline: 'none',
                      resize: 'none'
                    }}
                    placeholder="Guías de comunicación"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'nameTypes':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              {[
                { 
                  type: 'Fundador', 
                  description: 'Nombre del creador o fundador', 
                  examples: ['IKEA (Ingvar Kamprad)', 'Scrama (Sergio Ramos)', 'Ben & Jerry\'s'] 
                },
                { 
                  type: 'Descriptivo', 
                  description: 'Describe la función o beneficio', 
                  examples: ['Spotify', 'Instagram', 'LinkedIn'] 
                },
                { 
                  type: 'Abstracto', 
                  description: 'Palabras inventadas o sin significado', 
                  examples: ['Google', 'Kodak', 'Xerox'] 
                },
                { 
                  type: 'Geográfico', 
                  description: 'Ubicación o lugar específico', 
                  examples: ['Amazon', 'Cisco', 'Adobe'] 
                },
                { 
                  type: 'Acrónimo', 
                  description: 'Iniciales de palabras clave', 
                  examples: ['IBM', 'BMW', 'ASOS'] 
                },
                { 
                  type: 'Metafórico', 
                  description: 'Símbolo o concepto abstracto', 
                  examples: ['Apple', 'Oracle', 'Phoenix'] 
                },
                { 
                  type: 'Híbrido', 
                  description: 'Combinación de elementos', 
                  examples: ['Microsoft', 'Netflix', 'WhatsApp'] 
                }
              ].map((nameType, index) => (
                <div
                  key={index}
                  style={{
                    padding: '20px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                    border: '1px solid #333333',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#2a2a2a';
                    e.target.style.borderColor = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#1a1a1a';
                    e.target.style.borderColor = '#333333';
                  }}
                  onClick={() => updateField(step.field, nameType)}
                >
                  <h3 style={{ 
                    color: '#ffffff', 
                    fontSize: '16px', 
                    fontWeight: '500', 
                    marginBottom: '8px' 
                  }}>
                    {nameType.type}
                  </h3>
                  <p style={{ 
                    color: '#cccccc', 
                    fontSize: '14px', 
                    marginBottom: '12px' 
                  }}>
                    {nameType.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {nameType.examples.map((example, i) => (
                      <span key={i} style={{ 
                        color: '#666666', 
                        fontSize: '12px',
                        padding: '2px 8px',
                        backgroundColor: '#333333',
                        borderRadius: '4px',
                        display: 'inline-block',
                        marginRight: '4px'
                      }}>
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {value && (
              <div style={{
                padding: '20px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                border: '1px solid #333333'
              }}>
                <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '12px' }}>
                  Tipo Seleccionado: {value.type}
                </h3>
                <p style={{ color: '#cccccc', fontSize: '16px', marginBottom: '16px' }}>
                  {value.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="text"
                    value={value.selectedName || ''}
                    onChange={(e) => updateField(step.field, { ...value, selectedName: e.target.value })}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      border: '1px solid #333333',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      outline: 'none'
                    }}
                    placeholder="Nombre seleccionado"
                  />
                  <textarea
                    value={value.rationale || ''}
                    onChange={(e) => updateField(step.field, { ...value, rationale: e.target.value })}
                    style={{
                      width: '100%',
                      height: '100px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      border: '1px solid #333333',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      outline: 'none',
                      resize: 'none'
                    }}
                    placeholder="Justificación de la elección"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'userTesting':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333333'
            }}>
              <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '16px' }}>
                Preguntas de Testing de Usuarios
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  '¿Qué te transmite este nombre?',
                  '¿Es fácil de recordar?',
                  '¿Qué asociaciones tienes con él?',
                  '¿Te parece profesional?',
                  '¿Lo recomendarías a otros?',
                  '¿Qué industria crees que representa?',
                  '¿Es fácil de pronunciar?',
                  '¿Te gusta cómo suena?'
                ].map((question, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '8px',
                    border: '1px solid #333333'
                  }}>
                    <span style={{ color: '#ffffff', fontSize: '14px' }}>{question}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          const newQuestions = [...(value || [])];
                          newQuestions[index] = { question, answer: true };
                          updateField(step.field, newQuestions);
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: (value || [])[index]?.answer === true ? '#ffffff' : '#333333',
                          color: (value || [])[index]?.answer === true ? '#ffffff' : '#666666',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Sí
                      </button>
                      <button
                        onClick={() => {
                          const newQuestions = [...(value || [])];
                          newQuestions[index] = { question, answer: false };
                          updateField(step.field, newQuestions);
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: (value || [])[index]?.answer === false ? '#ffffff' : '#333333',
                          color: (value || [])[index]?.answer === false ? '#ffffff' : '#666666',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '12px' }}>
                  Comentarios Adicionales
                </h4>
                <textarea
                  value={value?.comments || ''}
                  onChange={(e) => updateField(step.field, { ...value, comments: e.target.value })}
                  style={{
                    width: '100%',
                    height: '100px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    outline: 'none',
                    resize: 'none'
                  }}
                  placeholder="Comentarios y observaciones adicionales..."
                />
              </div>
            </div>
          </div>
        );

      case 'brandSystem':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333333'
            }}>
              <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '16px' }}>
                Sistema de Marca Verbal
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    color: '#666666', 
                    marginBottom: '8px' 
                  }}>
                    Eslogan Principal
                  </label>
                  <input
                    type="text"
                    value={value?.slogan || ''}
                    onChange={(e) => updateField(step.field, { ...value, slogan: e.target.value })}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      border: '1px solid #333333',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      outline: 'none'
                    }}
                    placeholder="Eslogan principal de la marca"
                  />
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    color: '#666666', 
                    marginBottom: '8px' 
                  }}>
                    Texto Principal
                  </label>
                  <textarea
                    value={value?.mainText || ''}
                    onChange={(e) => updateField(step.field, { ...value, mainText: e.target.value })}
                    style={{
                      width: '100%',
                      height: '120px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      border: '1px solid #333333',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      outline: 'none',
                      resize: 'none'
                    }}
                    placeholder="Texto principal para comunicaciones corporativas"
                  />
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    color: '#666666', 
                    marginBottom: '8px' 
                  }}>
                    Texto Secundario
                  </label>
                  <textarea
                    value={value?.secondaryText || ''}
                    onChange={(e) => updateField(step.field, { ...value, secondaryText: e.target.value })}
                    style={{
                      width: '100%',
                      height: '120px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      border: '1px solid #333333',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      outline: 'none',
                      resize: 'none'
                    }}
                    placeholder="Texto secundario para comunicaciones específicas"
                  />
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    color: '#666666', 
                    marginBottom: '8px' 
                  }}>
                    Mensajes Clave
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(value?.keyMessages || []).map((message: string, index: number) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => {
                            const newMessages = [...(value?.keyMessages || [])];
                            newMessages[index] = e.target.value;
                            updateField(step.field, { ...value, keyMessages: newMessages });
                          }}
                          style={{
                            flex: 1,
                            height: '40px',
                            padding: '8px 12px',
                            fontSize: '14px',
                            border: '1px solid #333333',
                            borderRadius: '6px',
                            backgroundColor: 'transparent',
                            color: '#ffffff',
                            outline: 'none'
                          }}
                          placeholder="Mensaje clave"
                        />
                        <button
                          onClick={() => {
                            const newMessages = (value?.keyMessages || []).filter((_: any, i: number) => i !== index);
                            updateField(step.field, { ...value, keyMessages: newMessages });
                          }}
                          style={{
                            padding: '8px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#666666',
                            transition: 'color 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.color = '#ff4444'}
                          onMouseLeave={(e) => e.target.style.color = '#666666'}
                        >
                          <Trash2 style={{ width: '16px', height: '16px' }} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => updateField(step.field, { 
                        ...value, 
                        keyMessages: [...(value?.keyMessages || []), ''] 
                      })}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        height: '40px',
                        padding: '0 12px',
                        fontSize: '14px',
                        color: '#666666',
                        backgroundColor: 'transparent',
                        border: '1px solid #333333',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#ffffff';
                        e.target.style.borderColor = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#666666';
                        e.target.style.borderColor = '#333333';
                      }}
                    >
                      <Plus style={{ width: '16px', height: '16px' }} />
                      Añadir mensaje
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'userflow':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {(value?.steps || [
              { title: '', description: '' },
              { title: '', description: '' },
              { title: '', description: '' }
            ]).map((step: any, index: number) => (
              <div 
                key={index} 
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', index.toString());
                  e.dataTransfer.effectAllowed = 'move';
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
                  if (draggedIndex !== index) {
                    const newSteps = [...(value?.steps || [])];
                    const draggedStep = newSteps[draggedIndex];
                    newSteps.splice(draggedIndex, 1);
                    newSteps.splice(index, 0, draggedStep);
                    updateField(step.field, { ...value, steps: newSteps });
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '24px 0',
                  borderBottom: index < (value?.steps || []).length - 1 ? '1px solid #333333' : 'none',
                  cursor: 'move'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#ffffff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#000000',
                  flexShrink: 0,
                  cursor: 'grab'
                }}>
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={step.title || ''}
                  onChange={(e) => {
                    const newSteps = [...(value?.steps || [])];
                    newSteps[index] = { ...newSteps[index], title: e.target.value };
                    updateField(step.field, { ...value, steps: newSteps });
                  }}
                  style={{
                    flex: 1,
                    height: '40px',
                    padding: '8px 12px',
                    fontSize: '14px',
                    border: 'none',
                    borderBottom: '1px solid #333333',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  placeholder="Paso del flujo"
                  onMouseEnter={(e) => e.target.style.borderBottomColor = '#666666'}
                  onMouseLeave={(e) => e.target.style.borderBottomColor = '#333333'}
                  onFocus={(e) => e.target.style.borderBottomColor = '#ffffff'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#333333'}
                />
                <input
                  type="text"
                  value={step.description || ''}
                  onChange={(e) => {
                    const newSteps = [...(value?.steps || [])];
                    newSteps[index] = { ...newSteps[index], description: e.target.value };
                    updateField(step.field, { ...value, steps: newSteps });
                  }}
                  style={{
                    flex: 2,
                    height: '40px',
                    padding: '8px 12px',
                    fontSize: '14px',
                    border: 'none',
                    borderBottom: '1px solid #333333',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  placeholder="Descripción del paso"
                  onMouseEnter={(e) => e.target.style.borderBottomColor = '#666666'}
                  onMouseLeave={(e) => e.target.style.borderBottomColor = '#333333'}
                  onFocus={(e) => e.target.style.borderBottomColor = '#ffffff'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#333333'}
                />
                <button
                  onClick={() => {
                    const newSteps = (value?.steps || []).filter((_: any, i: number) => i !== index);
                    updateField(step.field, { ...value, steps: newSteps });
                  }}
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
                  onMouseEnter={(e) => e.target.style.color = '#ff4444'}
                  onMouseLeave={(e) => e.target.style.color = '#666666'}
                >
                  <Trash2 style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            ))}
            
            <button
              onClick={() => updateField(step.field, { 
                ...value, 
                steps: [...(value?.steps || []), { title: '', description: '' }] 
              })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '48px',
                padding: '0 16px',
                fontSize: '14px',
                color: '#666666',
                backgroundColor: 'transparent',
                border: '1px solid #333333',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginTop: '16px'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
                e.target.style.borderColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666666';
                e.target.style.borderColor = '#333333';
              }}
            >
              <Plus style={{ width: '16px', height: '16px' }} />
              Añadir paso al flujo
            </button>
          </div>
        );

      case 'figma':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333333'
            }}>
              <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '16px' }}>
                Enlace de Figma
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input
                  type="url"
                  value={value?.figmaLink || ''}
                  onChange={(e) => updateField(step.field, { ...value, figmaLink: e.target.value })}
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    outline: 'none'
                  }}
                  placeholder="https://figma.com/file/..."
                />
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  backgroundColor: '#2a2a2a',
                  borderRadius: '8px',
                  border: '1px solid #333333'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#F24E1E',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#ffffff'
                  }}>
                    F
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500' }}>
                      Prototipo de Figma
                    </div>
                    <div style={{ color: '#666666', fontSize: '12px' }}>
                      {value?.figmaLink || 'No hay enlace configurado'}
                    </div>
                  </div>
                  {value?.figmaLink && (
                    <button
                      onClick={() => window.open(value.figmaLink, '_blank')}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#ffffff',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#3a8eef'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
                    >
                      Abrir
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'productTesting':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333333'
            }}>
              <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '16px' }}>
                Testing de Usuarios - Producto
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  '¿Es intuitiva la navegación?',
                  '¿Entiendes qué hace cada función?',
                  '¿Te parece útil el producto?',
                  '¿Lo usarías en tu día a día?',
                  '¿Hay algo que cambiarías?',
                  '¿Es fácil encontrar lo que buscas?',
                  '¿Te parece profesional?',
                  '¿Recomendarías este producto?'
                ].map((question, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '8px',
                    border: '1px solid #333333'
                  }}>
                    <span style={{ color: '#ffffff', fontSize: '14px' }}>{question}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          const newQuestions = [...(value || [])];
                          newQuestions[index] = { question, answer: true };
                          updateField(step.field, newQuestions);
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: (value || [])[index]?.answer === true ? '#ffffff' : '#333333',
                          color: (value || [])[index]?.answer === true ? '#ffffff' : '#666666',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Sí
                      </button>
                      <button
                        onClick={() => {
                          const newQuestions = [...(value || [])];
                          newQuestions[index] = { question, answer: false };
                          updateField(step.field, newQuestions);
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: (value || [])[index]?.answer === false ? '#ffffff' : '#333333',
                          color: (value || [])[index]?.answer === false ? '#ffffff' : '#666666',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <h4 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '12px' }}>
                  Feedback Adicional
                </h4>
                <textarea
                  value={value?.feedback || ''}
                  onChange={(e) => updateField(step.field, { ...value, feedback: e.target.value })}
                  style={{
                    width: '100%',
                    height: '100px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    outline: 'none',
                    resize: 'none'
                  }}
                  placeholder="Comentarios y sugerencias adicionales..."
                />
              </div>
            </div>
          </div>
        );

      case 'multiplePrototypes':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333333'
            }}>
              <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '16px' }}>
                Múltiples Prototipos
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(value?.prototypes || []).map((prototype: any, index: number) => (
                  <div key={index} style={{
                    padding: '20px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '8px',
                    border: '1px solid #333333'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#ffffff'
                      }}>
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={prototype.name || ''}
                        onChange={(e) => {
                          const newPrototypes = [...(value?.prototypes || [])];
                          newPrototypes[index] = { ...newPrototypes[index], name: e.target.value };
                          updateField(step.field, { ...value, prototypes: newPrototypes });
                        }}
                        style={{
                          flex: 1,
                          height: '40px',
                          padding: '8px 12px',
                          fontSize: '14px',
                          border: '1px solid #333333',
                          borderRadius: '6px',
                          backgroundColor: 'transparent',
                          color: '#ffffff',
                          outline: 'none'
                        }}
                        placeholder="Nombre del prototipo"
                      />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <input
                        type="url"
                        value={prototype.link || ''}
                        onChange={(e) => {
                          const newPrototypes = [...(value?.prototypes || [])];
                          newPrototypes[index] = { ...newPrototypes[index], link: e.target.value };
                          updateField(step.field, { ...value, prototypes: newPrototypes });
                        }}
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '8px 12px',
                          fontSize: '14px',
                          border: '1px solid #333333',
                          borderRadius: '6px',
                          backgroundColor: 'transparent',
                          color: '#ffffff',
                          outline: 'none'
                        }}
                        placeholder="Enlace del prototipo"
                      />
                      <textarea
                        value={prototype.description || ''}
                        onChange={(e) => {
                          const newPrototypes = [...(value?.prototypes || [])];
                          newPrototypes[index] = { ...newPrototypes[index], description: e.target.value };
                          updateField(step.field, { ...value, prototypes: newPrototypes });
                        }}
                        style={{
                          width: '100%',
                          height: '80px',
                          padding: '8px 12px',
                          fontSize: '14px',
                          border: '1px solid #333333',
                          borderRadius: '6px',
                          backgroundColor: 'transparent',
                          color: '#ffffff',
                          outline: 'none',
                          resize: 'none'
                        }}
                        placeholder="Descripción del prototipo"
                      />
                    </div>
                    
                    <button
                      onClick={() => {
                        const newPrototypes = (value?.prototypes || []).filter((_: any, i: number) => i !== index);
                        updateField(step.field, { ...value, prototypes: newPrototypes });
                      }}
                      style={{
                        marginTop: '12px',
                        padding: '8px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666666',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#ff4444'}
                      onMouseLeave={(e) => e.target.style.color = '#666666'}
                    >
                      <Trash2 style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => updateField(step.field, { 
                    ...value, 
                    prototypes: [...(value?.prototypes || []), { name: '', link: '', description: '' }] 
                  })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    height: '48px',
                    padding: '0 16px',
                    fontSize: '14px',
                    color: '#666666',
                    backgroundColor: 'transparent',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#ffffff';
                    e.target.style.borderColor = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666666';
                    e.target.style.borderColor = '#333333';
                  }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} />
                  Añadir prototipo
                </button>
              </div>
            </div>
          </div>
        );

      case 'multipleSocial':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333333'
            }}>
              <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '16px' }}>
                Múltiples Cuentas Sociales
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(value?.accounts || []).map((account: any, index: number) => (
                  <div key={index} style={{
                    padding: '20px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '8px',
                    border: '1px solid #333333'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <select
                        value={account.platform || ''}
                        onChange={(e) => {
                          const newAccounts = [...(value?.accounts || [])];
                          newAccounts[index] = { ...newAccounts[index], platform: e.target.value };
                          updateField(step.field, { ...value, accounts: newAccounts });
                        }}
                        style={{
                          width: '120px',
                          height: '40px',
                          padding: '8px 12px',
                          fontSize: '14px',
                          border: '1px solid #333333',
                          borderRadius: '6px',
                          backgroundColor: 'transparent',
                          color: '#ffffff',
                          outline: 'none'
                        }}
                      >
                        <option value="">Plataforma</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Twitter">Twitter</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Facebook">Facebook</option>
                        <option value="TikTok">TikTok</option>
                        <option value="YouTube">YouTube</option>
                      </select>
                      <input
                        type="text"
                        value={account.handle || ''}
                        onChange={(e) => {
                          const newAccounts = [...(value?.accounts || [])];
                          newAccounts[index] = { ...newAccounts[index], handle: e.target.value };
                          updateField(step.field, { ...value, accounts: newAccounts });
                        }}
                        style={{
                          flex: 1,
                          height: '40px',
                          padding: '8px 12px',
                          fontSize: '14px',
                          border: '1px solid #333333',
                          borderRadius: '6px',
                          backgroundColor: 'transparent',
                          color: '#ffffff',
                          outline: 'none'
                        }}
                        placeholder="@usuario"
                      />
                    </div>
                    
                    <textarea
                      value={account.bio || ''}
                      onChange={(e) => {
                        const newAccounts = [...(value?.accounts || [])];
                        newAccounts[index] = { ...newAccounts[index], bio: e.target.value };
                        updateField(step.field, { ...value, accounts: newAccounts });
                      }}
                      style={{
                        width: '100%',
                        height: '80px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        border: '1px solid #333333',
                        borderRadius: '6px',
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        outline: 'none',
                        resize: 'none'
                      }}
                      placeholder="Bio específica para esta plataforma"
                    />
                    
                    <button
                      onClick={() => {
                        const newAccounts = (value?.accounts || []).filter((_: any, i: number) => i !== index);
                        updateField(step.field, { ...value, accounts: newAccounts });
                      }}
                      style={{
                        marginTop: '12px',
                        padding: '8px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666666',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#ff4444'}
                      onMouseLeave={(e) => e.target.style.color = '#666666'}
                    >
                      <Trash2 style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => updateField(step.field, { 
                    ...value, 
                    accounts: [...(value?.accounts || []), { platform: '', handle: '', bio: '' }] 
                  })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    height: '48px',
                    padding: '0 16px',
                    fontSize: '14px',
                    color: '#666666',
                    backgroundColor: 'transparent',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#ffffff';
                    e.target.style.borderColor = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666666';
                    e.target.style.borderColor = '#333333';
                  }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} />
                  Añadir cuenta social
                </button>
              </div>
            </div>
          </div>
        );

      case 'socialCalendar':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333333'
            }}>
              <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '16px' }}>
                Calendario de Redes Sociales
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(value?.posts || []).map((post: any, index: number) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '8px',
                    border: '1px solid #333333'
                  }}>
                    <input
                      type="date"
                      value={post.date || ''}
                      onChange={(e) => {
                        const newPosts = [...(value?.posts || [])];
                        newPosts[index] = { ...newPosts[index], date: e.target.value };
                        updateField(step.field, { ...value, posts: newPosts });
                      }}
                      style={{
                        padding: '8px 12px',
                        fontSize: '14px',
                        border: '1px solid #333333',
                        borderRadius: '6px',
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        outline: 'none'
                      }}
                    />
                    <select
                      value={post.platform || ''}
                      onChange={(e) => {
                        const newPosts = [...(value?.posts || [])];
                        newPosts[index] = { ...newPosts[index], platform: e.target.value };
                        updateField(step.field, { ...value, posts: newPosts });
                      }}
                      style={{
                        width: '120px',
                        height: '40px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        border: '1px solid #333333',
                        borderRadius: '6px',
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        outline: 'none'
                      }}
                    >
                      <option value="">Plataforma</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Twitter">Twitter</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Facebook">Facebook</option>
                      <option value="TikTok">TikTok</option>
                    </select>
                    <input
                      type="text"
                      value={post.content || ''}
                      onChange={(e) => {
                        const newPosts = [...(value?.posts || [])];
                        newPosts[index] = { ...newPosts[index], content: e.target.value };
                        updateField(step.field, { ...value, posts: newPosts });
                      }}
                      style={{
                        flex: 1,
                        height: '40px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        border: '1px solid #333333',
                        borderRadius: '6px',
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        outline: 'none'
                      }}
                      placeholder="Contenido del post"
                    />
                    <button
                      onClick={() => {
                        const newPosts = (value?.posts || []).filter((_: any, i: number) => i !== index);
                        updateField(step.field, { ...value, posts: newPosts });
                      }}
                      style={{
                        padding: '8px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666666',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#ff4444'}
                      onMouseLeave={(e) => e.target.style.color = '#666666'}
                    >
                      <Trash2 style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => updateField(step.field, { 
                    ...value, 
                    posts: [...(value?.posts || []), { date: '', platform: '', content: '' }] 
                  })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    height: '48px',
                    padding: '0 16px',
                    fontSize: '14px',
                    color: '#666666',
                    backgroundColor: 'transparent',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#ffffff';
                    e.target.style.borderColor = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666666';
                    e.target.style.borderColor = '#333333';
                  }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} />
                  Añadir post al calendario
                </button>
              </div>
            </div>
          </div>
        );

      case 'shippingQuestions':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333333'
            }}>
              <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '16px' }}>
                Preguntas de Shipping - {selectedMode === 'startup' ? 'Startup' : selectedMode === 'scaleup' ? 'ScaleUp' : 'Corporate'}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedMode === 'startup' && [
                  '¿Cuál es tu fecha de lanzamiento objetivo?',
                  '¿Tienes un presupuesto definido para el lanzamiento?',
                  '¿Qué canales de marketing vas a usar?',
                  '¿Tienes una lista de usuarios beta?',
                  '¿Necesitas ayuda con la estrategia de precios?'
                ].map((question, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '8px',
                    border: '1px solid #333333'
                  }}>
                    <span style={{ color: '#ffffff', fontSize: '14px', flex: 1 }}>{question}</span>
                    <input
                      type="text"
                      value={value?.[`answer_${index}`] || ''}
                      onChange={(e) => updateField(step.field, { ...value, [`answer_${index}`]: e.target.value })}
                      style={{
                        flex: 1,
                        height: '40px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        border: '1px solid #333333',
                        borderRadius: '6px',
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        outline: 'none'
                      }}
                      placeholder="Tu respuesta..."
                    />
                  </div>
                ))}
                
                {selectedMode === 'scaleup' && [
                  '¿Cuál es tu estrategia de lanzamiento por fases?',
                  '¿Tienes equipos específicos para cada canal?',
                  '¿Cómo vas a medir el éxito del lanzamiento?',
                  '¿Tienes un plan de escalabilidad definido?',
                  '¿Qué herramientas de analytics vas a usar?',
                  '¿Tienes un presupuesto de marketing asignado?'
                ].map((question, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '8px',
                    border: '1px solid #333333'
                  }}>
                    <span style={{ color: '#ffffff', fontSize: '14px', flex: 1 }}>{question}</span>
                    <input
                      type="text"
                      value={value?.[`answer_${index}`] || ''}
                      onChange={(e) => updateField(step.field, { ...value, [`answer_${index}`]: e.target.value })}
                      style={{
                        flex: 1,
                        height: '40px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        border: '1px solid #333333',
                        borderRadius: '6px',
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        outline: 'none'
                      }}
                      placeholder="Tu respuesta..."
                    />
                  </div>
                ))}
                
                {selectedMode === 'corporate' && [
                  '¿Cuál es tu plan de lanzamiento global?',
                  '¿Tienes equipos regionales preparados?',
                  '¿Cómo vas a coordinar el lanzamiento internacional?',
                  '¿Tienes un presupuesto de marketing corporativo?',
                  '¿Qué métricas de ROI vas a seguir?',
                  '¿Tienes un plan de crisis preparado?',
                  '¿Cómo vas a manejar la comunicación corporativa?',
                  '¿Tienes un equipo de soporte escalado?'
                ].map((question, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '8px',
                    border: '1px solid #333333'
                  }}>
                    <span style={{ color: '#ffffff', fontSize: '14px', flex: 1 }}>{question}</span>
                    <input
                      type="text"
                      value={value?.[`answer_${index}`] || ''}
                      onChange={(e) => updateField(step.field, { ...value, [`answer_${index}`]: e.target.value })}
                      style={{
                        flex: 1,
                        height: '40px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        border: '1px solid #333333',
                        borderRadius: '6px',
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        outline: 'none'
                      }}
                      placeholder="Tu respuesta..."
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'multipleUserflows':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333333'
            }}>
              <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '16px' }}>
                Múltiples User Flows
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(value?.flows || []).map((flow: any, flowIndex: number) => (
                  <div key={flowIndex} style={{
                    padding: '20px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '8px',
                    border: '1px solid #333333'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#ffffff'
                      }}>
                        {flowIndex + 1}
                      </div>
                      <input
                        type="text"
                        value={flow.name || ''}
                        onChange={(e) => {
                          const newFlows = [...(value?.flows || [])];
                          newFlows[flowIndex] = { ...newFlows[flowIndex], name: e.target.value };
                          updateField(step.field, { ...value, flows: newFlows });
                        }}
                        style={{
                          flex: 1,
                          height: '40px',
                          padding: '8px 12px',
                          fontSize: '14px',
                          border: '1px solid #333333',
                          borderRadius: '6px',
                          backgroundColor: 'transparent',
                          color: '#ffffff',
                          outline: 'none'
                        }}
                        placeholder="Nombre del flujo"
                      />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {(flow.steps || []).map((step: any, stepIndex: number) => (
                        <div key={stepIndex} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px',
                          backgroundColor: '#1a1a1a',
                          borderRadius: '6px',
                          border: '1px solid #333333'
                        }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            backgroundColor: '#ffffff',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#ffffff',
                            flexShrink: 0
                          }}>
                            {stepIndex + 1}
                          </div>
                          <input
                            type="text"
                            value={step.title || ''}
                            onChange={(e) => {
                              const newFlows = [...(value?.flows || [])];
                              newFlows[flowIndex].steps[stepIndex] = { ...newFlows[flowIndex].steps[stepIndex], title: e.target.value };
                              updateField(step.field, { ...value, flows: newFlows });
                            }}
                            style={{
                              flex: 1,
                              height: '32px',
                              padding: '6px 10px',
                              fontSize: '12px',
                              border: '1px solid #333333',
                              borderRadius: '4px',
                              backgroundColor: 'transparent',
                              color: '#ffffff',
                              outline: 'none'
                            }}
                            placeholder="Paso del flujo"
                          />
                          <input
                            type="text"
                            value={step.description || ''}
                            onChange={(e) => {
                              const newFlows = [...(value?.flows || [])];
                              newFlows[flowIndex].steps[stepIndex] = { ...newFlows[flowIndex].steps[stepIndex], description: e.target.value };
                              updateField(step.field, { ...value, flows: newFlows });
                            }}
                            style={{
                              flex: 2,
                              height: '32px',
                              padding: '6px 10px',
                              fontSize: '12px',
                              border: '1px solid #333333',
                              borderRadius: '4px',
                              backgroundColor: 'transparent',
                              color: '#ffffff',
                              outline: 'none'
                            }}
                            placeholder="Descripción del paso"
                          />
                          <button
                            onClick={() => {
                              const newFlows = [...(value?.flows || [])];
                              newFlows[flowIndex].steps = newFlows[flowIndex].steps.filter((_: any, i: number) => i !== stepIndex);
                              updateField(step.field, { ...value, flows: newFlows });
                            }}
                            style={{
                              padding: '4px',
                              backgroundColor: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#666666',
                              transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#ff4444'}
                            onMouseLeave={(e) => e.target.style.color = '#666666'}
                          >
                            <Trash2 style={{ width: '12px', height: '12px' }} />
                          </button>
                        </div>
                      ))}
                      
                      <button
                        onClick={() => {
                          const newFlows = [...(value?.flows || [])];
                          if (!newFlows[flowIndex].steps) newFlows[flowIndex].steps = [];
                          newFlows[flowIndex].steps.push({ title: '', description: '' });
                          updateField(step.field, { ...value, flows: newFlows });
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          height: '32px',
                          padding: '0 12px',
                          fontSize: '12px',
                          color: '#666666',
                          backgroundColor: 'transparent',
                          border: '1px solid #333333',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = '#ffffff';
                          e.target.style.borderColor = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = '#666666';
                          e.target.style.borderColor = '#333333';
                        }}
                      >
                        <Plus style={{ width: '12px', height: '12px' }} />
                        Añadir paso
                      </button>
                    </div>
                    
                    <button
                      onClick={() => {
                        const newFlows = (value?.flows || []).filter((_: any, i: number) => i !== flowIndex);
                        updateField(step.field, { ...value, flows: newFlows });
                      }}
                      style={{
                        marginTop: '12px',
                        padding: '8px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666666',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#ff4444'}
                      onMouseLeave={(e) => e.target.style.color = '#666666'}
                    >
                      <Trash2 style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => updateField(step.field, { 
                    ...value, 
                    flows: [...(value?.flows || []), { name: '', steps: [] }] 
                  })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    height: '48px',
                    padding: '0 16px',
                    fontSize: '14px',
                    color: '#666666',
                    backgroundColor: 'transparent',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#ffffff';
                    e.target.style.borderColor = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666666';
                    e.target.style.borderColor = '#333333';
                  }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} />
                  Añadir user flow
                </button>
              </div>
            </div>
          </div>
        );

      case 'multipleCampaigns':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333333'
            }}>
              <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '16px' }}>
                Múltiples Campañas
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(value?.campaigns || []).map((campaign: any, index: number) => (
                  <div key={index} style={{
                    padding: '20px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '8px',
                    border: '1px solid #333333'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#ffffff'
                      }}>
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={campaign.title || ''}
                        onChange={(e) => {
                          const newCampaigns = [...(value?.campaigns || [])];
                          newCampaigns[index] = { ...newCampaigns[index], title: e.target.value };
                          updateField(step.field, { ...value, campaigns: newCampaigns });
                        }}
                        style={{
                          flex: 1,
                          height: '40px',
                          padding: '8px 12px',
                          fontSize: '14px',
                          border: '1px solid #333333',
                          borderRadius: '6px',
                          backgroundColor: 'transparent',
                          color: '#ffffff',
                          outline: 'none'
                        }}
                        placeholder="Título de la campaña"
                      />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <textarea
                        value={campaign.description || ''}
                        onChange={(e) => {
                          const newCampaigns = [...(value?.campaigns || [])];
                          newCampaigns[index] = { ...newCampaigns[index], description: e.target.value };
                          updateField(step.field, { ...value, campaigns: newCampaigns });
                        }}
                        style={{
                          width: '100%',
                          height: '80px',
                          padding: '8px 12px',
                          fontSize: '14px',
                          border: '1px solid #333333',
                          borderRadius: '6px',
                          backgroundColor: 'transparent',
                          color: '#ffffff',
                          outline: 'none',
                          resize: 'none'
                        }}
                        placeholder="Descripción de la campaña"
                      />
                      <input
                        type="url"
                        value={campaign.link || ''}
                        onChange={(e) => {
                          const newCampaigns = [...(value?.campaigns || [])];
                          newCampaigns[index] = { ...newCampaigns[index], link: e.target.value };
                          updateField(step.field, { ...value, campaigns: newCampaigns });
                        }}
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '8px 12px',
                          fontSize: '14px',
                          border: '1px solid #333333',
                          borderRadius: '6px',
                          backgroundColor: 'transparent',
                          color: '#ffffff',
                          outline: 'none'
                        }}
                        placeholder="Enlace de la campaña"
                      />
                      <input
                        type="text"
                        value={campaign.target || ''}
                        onChange={(e) => {
                          const newCampaigns = [...(value?.campaigns || [])];
                          newCampaigns[index] = { ...newCampaigns[index], target: e.target.value };
                          updateField(step.field, { ...value, campaigns: newCampaigns });
                        }}
                        style={{
                          width: '100%',
                          height: '40px',
                          padding: '8px 12px',
                          fontSize: '14px',
                          border: '1px solid #333333',
                          borderRadius: '6px',
                          backgroundColor: 'transparent',
                          color: '#ffffff',
                          outline: 'none'
                        }}
                        placeholder="Audiencia objetivo"
                      />
                    </div>
                    
                    <button
                      onClick={() => {
                        const newCampaigns = (value?.campaigns || []).filter((_: any, i: number) => i !== index);
                        updateField(step.field, { ...value, campaigns: newCampaigns });
                      }}
                      style={{
                        marginTop: '12px',
                        padding: '8px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666666',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#ff4444'}
                      onMouseLeave={(e) => e.target.style.color = '#666666'}
                    >
                      <Trash2 style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => updateField(step.field, { 
                    ...value, 
                    campaigns: [...(value?.campaigns || []), { title: '', description: '', link: '', target: '' }] 
                  })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    height: '48px',
                    padding: '0 16px',
                    fontSize: '14px',
                    color: '#666666',
                    backgroundColor: 'transparent',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#ffffff';
                    e.target.style.borderColor = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666666';
                    e.target.style.borderColor = '#333333';
                  }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} />
                  Añadir campaña
                </button>
              </div>
            </div>
          </div>
        );

      case 'merch':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Merchandise Mockups */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {/* Sticker */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                border: '1px solid #333333'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: '500',
                  color: '#000000',
                  marginBottom: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                  {value?.name || 'Logo'}
                </div>
                <span style={{ color: '#ffffff', fontSize: '14px' }}>Sticker</span>
              </div>
              
              {/* T-Shirt */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                border: '1px solid #333333'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#000000',
                  marginBottom: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: '#ffffff'
                  }}>
                    {value?.name || 'Logo'}
                  </div>
                </div>
                <span style={{ color: '#ffffff', fontSize: '14px' }}>Camiseta</span>
              </div>
              
              {/* Hoodie (ScaleUp) */}
              {selectedMode === 'scaleup' && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '8px',
                  border: '1px solid #333333'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: '#333333',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#ffffff',
                    marginBottom: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#ffffff',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: '#ffffff'
                    }}>
                      {value?.name || 'Logo'}
                    </div>
                  </div>
                  <span style={{ color: '#ffffff', fontSize: '14px' }}>Sudadera</span>
                </div>
              )}
              
              {/* Backpack (ScaleUp) */}
              {selectedMode === 'scaleup' && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '8px',
                  border: '1px solid #333333'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#ffffff',
                    marginBottom: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#ffffff',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: '#ffffff'
                    }}>
                      {value?.name || 'Logo'}
                    </div>
                  </div>
                  <span style={{ color: '#ffffff', fontSize: '14px' }}>Mochila</span>
                </div>
              )}
              
              {/* Corporate Items */}
              {selectedMode === 'corporate' && (
                <>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                    border: '1px solid #333333'
                  }}>
                    <div style={{
                      width: '120px',
                      height: '120px',
                      backgroundColor: '#2a2a2a',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#ffffff',
                      marginBottom: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#ffffff',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: '#ffffff'
                      }}>
                        {value?.name || 'Logo'}
                      </div>
                    </div>
                    <span style={{ color: '#ffffff', fontSize: '14px' }}>Bolsa de Laptop</span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                    border: '1px solid #333333'
                  }}>
                    <div style={{
                      width: '120px',
                      height: '120px',
                      backgroundColor: '#2a2a2a',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#ffffff',
                      marginBottom: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#ffffff',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: '#ffffff'
                      }}>
                        {value?.name || 'Logo'}
                      </div>
                    </div>
                    <span style={{ color: '#ffffff', fontSize: '14px' }}>Taza</span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                    border: '1px solid #333333'
                  }}>
                    <div style={{
                      width: '120px',
                      height: '120px',
                      backgroundColor: '#2a2a2a',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#ffffff',
                      marginBottom: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#ffffff',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: '#ffffff'
                      }}>
                        {value?.name || 'Logo'}
                      </div>
                    </div>
                    <span style={{ color: '#ffffff', fontSize: '14px' }}>Libreta</span>
                  </div>
                </>
              )}
            </div>
            
            {/* Generate Button */}
            <button
              onClick={() => {
                // Generar mockups de merchandising
                console.log('Generando mockups de merchandising...');
                // Aquí se implementaría la lógica para generar mockups
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '48px',
                padding: '0 16px',
                fontSize: '14px',
                color: '#ffffff',
                backgroundColor: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#3a8eef'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
            >
              <Wand2 style={{ width: '16px', height: '16px' }} />
              Generar mockups
            </button>
          </div>
        );

      case 'names':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* Caja grande editable */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #333333',
              borderRadius: '8px',
              marginBottom: '24px',
              position: 'relative',
              cursor: 'text'
            }}>
              <input
                type="text"
                value={value?.selectedName || ''}
                onChange={(e) => updateField(step.field, { ...value, selectedName: e.target.value })}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '24px',
                  fontWeight: '500',
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  outline: 'none',
                  padding: '20px'
                }}
                placeholder="Nombre de la marca"
                onMouseEnter={(e) => {
                  e.target.parentElement.style.borderColor = '#666666';
                }}
                onMouseLeave={(e) => {
                  e.target.parentElement.style.borderColor = '#333333';
                }}
                onFocus={(e) => {
                  e.target.parentElement.style.borderColor = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.parentElement.style.borderColor = '#333333';
                }}
              />
            </div>

            {/* Tipos de nombre separados por líneas */}
            {[
              { 
                type: 'Fundador', 
                examples: ['IKEA', 'Scrama', 'Ben & Jerry\'s'] 
              },
              { 
                type: 'Descriptivo', 
                examples: ['Spotify', 'Instagram', 'LinkedIn'] 
              },
              { 
                type: 'Abstracto', 
                examples: ['Google', 'Kodak', 'Xerox'] 
              },
              { 
                type: 'Geográfico', 
                examples: ['Amazon', 'Cisco', 'Adobe'] 
              },
              { 
                type: 'Acrónimo', 
                examples: ['IBM', 'BMW', 'ASOS'] 
              },
              { 
                type: 'Metafórico', 
                examples: ['Apple', 'Oracle', 'Phoenix'] 
              }
            ].map((nameType, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '24px 0',
                  borderBottom: index < 5 ? '1px solid #333333' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => updateField(step.field, { ...value, nameType })}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <span style={{
                  fontSize: '16px',
                  color: value?.nameType?.type === nameType.type ? '#ffffff' : '#cccccc',
                  fontWeight: value?.nameType?.type === nameType.type ? '500' : '400'
                }}>
                  {nameType.type}
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#666666'
                }}>
                  {nameType.examples.join(' · ')}
                </span>
              </div>
            ))}
        </div>
      );

      case 'mode-selector':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 0',
              borderBottom: '1px solid #333333'
            }}>
              <label style={{ 
                fontSize: '16px', 
                color: '#ffffff', 
                fontWeight: '600'
              }}>
                Tipo de proyecto
              </label>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { 
                  type: 'startup', 
                  title: 'Startup', 
                  description: 'Proyecto en fase inicial, MVP y validación',
                  color: '#4a9eff'
                },
                { 
                  type: 'scale', 
                  title: 'Scale', 
                  description: 'Crecimiento y expansión del negocio',
                  color: '#ff6b35'
                },
                { 
                  type: 'corporate', 
                  title: 'Corporate', 
                  description: 'Empresa establecida, optimización y eficiencia',
                  color: '#00d4aa'
                }
              ].map((mode, index) => (
                <button
                  key={index}
                  onClick={() => updateField(step.field, mode.type)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px',
                    backgroundColor: value === mode.type ? 'rgba(74, 158, 255, 0.1)' : '#1a1a1a',
                    border: value === mode.type ? '2px solid #ffffff' : '1px solid #333333',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (value !== mode.type) {
                      e.target.style.backgroundColor = '#2a2a2a';
                      e.target.style.borderColor = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (value !== mode.type) {
                      e.target.style.backgroundColor = '#1a1a1a';
                      e.target.style.borderColor = '#333333';
                    }
                  }}
                >
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: mode.color
                  }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      color: '#ffffff', 
                      fontSize: '16px', 
                      fontWeight: '500', 
                      marginBottom: '4px' 
                    }}>
                      {mode.title}
                    </h3>
                    <p style={{ 
                      color: '#cccccc', 
                      fontSize: '14px',
                      margin: 0
                    }}>
                      {mode.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'brandbook':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 0',
              borderBottom: '1px solid #333333'
            }}>
              <label style={{ 
                fontSize: '16px', 
                color: '#ffffff', 
                fontWeight: '600'
              }}>
                Generar Brandbook
              </label>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
              backgroundColor: '#1a1a1a',
              border: '2px dashed #333333',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#ffffff';
              e.target.style.backgroundColor = '#2a2a2a';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#333333';
              e.target.style.backgroundColor = '#1a1a1a';
            }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px',
                  color: '#666666',
                  marginBottom: '16px'
                }}>
                  📄
                </div>
                <h3 style={{ 
                  color: '#ffffff', 
                  fontSize: '18px', 
                  fontWeight: '500', 
                  marginBottom: '8px' 
                }}>
                  Generar Brandbook
                </h3>
                <p style={{ 
                  color: '#cccccc', 
                  fontSize: '14px',
                  margin: 0
                }}>
                  Crea un documento completo con toda la información de tu marca
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };


      return (
    <>
        <style jsx>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
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
            key={`video-${getCurrentVideo()}-${currentStepIndex}`}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              opacity: showElements.video ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out'
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls={false}
          >
            <source src={`/${getCurrentVideo()}`} type="video/mp4" />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#ffffff',
              fontSize: '16px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.play().catch(console.error);
                  }
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid #ffffff',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#ffffff',
                  fontSize: '24px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                ▶
              </button>
              <div>Haz clic para reproducir</div>
            </div>
          </video>
        </div>
      </div>

      {/* Content column - Derecha */}
      <div style={{ 
        width: '50%', 
        height: '100vh', 
        backgroundColor: '#000000', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ 
          position: 'sticky', 
          top: 0, 
          backgroundColor: '#000000', 
          padding: '16px', 
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Left: Menu + Previous */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <HamburgerMenu 
              isOpen={isMenuOpen} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
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
          </div>
          
          
          {/* Right: Animation + Voice + Next */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Dropdown de animaciones */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowAnimationDropdown(!showAnimationDropdown)}
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
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#666666';
                }}
              >
                <Wand2 style={{ width: '16px', height: '16px' }} />
              </button>
              
              {/* Dropdown menu */}
              {showAnimationDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  right: '0',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333333',
                  borderRadius: '8px',
                  padding: '8px',
                  minWidth: '200px',
                  zIndex: 1000
                }}>
                  <div style={{ 
                    color: '#ffffff', 
                    fontSize: '12px', 
                    fontWeight: '600', 
                    marginBottom: '8px',
                    padding: '0 8px'
                  }}>
                    Animaciones
                  </div>
                  {animations.map((animation) => (
                    <button
                      key={animation.id}
                      onClick={() => {
                        setSelectedAnimation(animation.id);
                        setShowAnimationDropdown(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '8px',
                        backgroundColor: selectedAnimation === animation.id ? '#333333' : 'transparent',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '14px',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedAnimation !== animation.id) {
                          e.target.style.backgroundColor = '#333333';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedAnimation !== animation.id) {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <div style={{ fontWeight: '500' }}>{animation.name}</div>
                      <div style={{ fontSize: '12px', color: '#cccccc' }}>{animation.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Botón del plan semanal */}
            <button
              onClick={() => setShowPlanSlide(!showPlanSlide)}
              style={{ 
                width: '32px', 
                height: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'transparent', 
                border: 'none', 
                cursor: 'pointer',
                color: showPlanSlide ? '#ffffff' : '#666666',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!showPlanSlide) e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                if (!showPlanSlide) e.target.style.color = '#666666';
              }}
            >
              <Calendar style={{ width: '16px', height: '16px' }} />
            </button>
            
            <button
              onClick={startGlobalVoiceRecognition}
              disabled={isListening}
              style={{ 
                width: '32px', 
                height: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: 'transparent', 
                border: 'none', 
                cursor: isListening ? 'not-allowed' : 'pointer',
                color: isListening ? '#ffffff' : '#666666',
                opacity: isListening ? 0.8 : 1,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isListening) e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                if (!isListening) e.target.style.color = '#666666';
              }}
            >
              {isListening ? (
                <MicOff style={{ width: '16px', height: '16px' }} />
              ) : (
                <Mic style={{ width: '16px', height: '16px' }} />
              )}
            </button>
            <button
              onClick={handleGlobalAIGenerate}
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
              <Wand2 style={{ width: '16px', height: '16px' }} />
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
        
        {/* Panel de voz colapsado */}
        {showVoicePanel && (
          <div style={{
            position: 'absolute',
            top: '60px',
            right: '16px',
            width: '300px',
            backgroundColor: '#1a1a1a',
            border: '1px solid #333333',
            borderRadius: '8px',
            padding: '16px',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: isListening ? '#ffffff' : '#666666',
                borderRadius: '50%',
                animation: isListening ? 'pulse 1s infinite' : 'none'
              }} />
              <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500' }}>
                {isListening ? 'Escuchando...' : 'Procesando con IA...'}
              </span>
            </div>
            
            {voiceTranscript && (
              <div style={{
                backgroundColor: '#2a2a2a',
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '12px'
              }}>
                <div style={{ color: '#666666', fontSize: '12px', marginBottom: '4px' }}>
                  Texto detectado:
                </div>
                <div style={{ color: '#ffffff', fontSize: '14px', lineHeight: '1.4' }}>
                  "{voiceTranscript}"
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '8px' }}>
            <button
                onClick={() => {
                  setShowVoicePanel(false);
                  setVoiceTranscript('');
                  if (recognitionRef.current) {
                    recognitionRef.current.stop();
                  }
                }}
              style={{ 
                  flex: 1,
                height: '32px', 
                  padding: '0 12px',
                  fontSize: '12px',
                  color: '#666666',
                backgroundColor: 'transparent', 
                  border: '1px solid #333333',
                  borderRadius: '4px',
                cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#666666';
                  e.target.style.borderColor = '#333333';
                }}
              >
                Cerrar
            </button>
          </div>
        </div>
        )}
        
        {/* Sidebar Menu */}
        <Sidebar
          currentSection={currentSection}
          onSectionChange={(section) => {
            setCurrentSection(section);
            // Mapear sección a step index
            const sectionToStepMap: { [key: string]: number } = {
              'strategy': 1,
              'brand': 5,
              'product': 9,
              'messages': 13,
              'launch': 16
            };
            const stepIndex = sectionToStepMap[section] || 0;
            setCurrentStepIndex(stepIndex);
          }}
          progress={calculateProgress()}
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />

        {/* Contenido */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'center', 
          padding: '64px',
          opacity: isAnimating ? 0.3 : 1,
          transform: isAnimating ? 'translateX(20px)' : 'translateX(0)',
          transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
          overflowY: 'auto'
        }}>
          <div style={{ width: '100%', maxWidth: '400px' }}>
            {/* Línea separadora */}
            <div style={{ 
              width: '100%', 
              height: '1px', 
              backgroundColor: '#333333', 
              marginBottom: '32px',
              opacity: 0.06
            }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Título interactivo */}
              <div style={{ 
                marginBottom: '16px',
                opacity: showElements.title ? 1 : 0,
                transform: showElements.title ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
              }}>
                <div style={{ 
                  fontSize: '24px', 
                  color: '#666666', 
                  marginBottom: '4px',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                onMouseLeave={(e) => e.target.style.color = '#666666'}
                onClick={() => setCurrentStepIndex(0)}
                >
                  S+C
                </div>
                <div style={{ 
                  fontSize: '24px', 
                  color: '#ffffff', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                onClick={() => {
                  const stepId = steps[currentStepIndex].id;
                  let sectionName = 'STRATEGY';
                  
                  if (stepId.startsWith('strategy-')) sectionName = 'STRATEGY';
                  else if (stepId.startsWith('brand-')) sectionName = 'BRANDS';
                  else if (stepId.startsWith('product-')) sectionName = 'PRODUCT';
                  else if (stepId.startsWith('messages-')) sectionName = 'MESSAGES';
                  else if (stepId.startsWith('launch-')) sectionName = 'LAUNCH';
                  
                  console.log('Section name:', sectionName);
                  const targetIndex = findSectionIndex(sectionName);
                  console.log('Target index:', targetIndex);
                  if (targetIndex !== -1) {
                    setCurrentStepIndex(targetIndex);
                  }
                }}
                >
                  {getSectionTitle(steps[currentStepIndex]?.id || 'intro').split(' / ')[0]?.toUpperCase() || 'S+C'}
                </div>
                <div style={{ 
                  fontSize: '24px', 
                  color: '#cccccc',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                onMouseLeave={(e) => e.target.style.color = '#cccccc'}
                onClick={() => {
                  const subsectionName = getSectionTitle(steps[currentStepIndex]?.id || 'intro').split(' / ')[1] || 'Framework';
                  console.log('Subsection name:', subsectionName);
                  const targetIndex = findSubsectionIndex(subsectionName);
                  console.log('Target index:', targetIndex);
                  if (targetIndex !== -1) {
                    setCurrentStepIndex(targetIndex);
                  }
                }}
                >
                  {getSectionTitle(steps[currentStepIndex]?.id || 'intro').split(' / ')[1]?.toUpperCase() || 'FRAMEWORK'}
                </div>
              </div>
              
              
              {/* Contenido narrativo */}
              {getStepContent(steps[currentStepIndex].id) && (
                <div style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#cccccc',
                  marginBottom: '32px',
                opacity: showElements.description ? 1 : 0,
                transform: showElements.description ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                minHeight: '60px'
              }}>
                {/* Selector de versiones integrado */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '4px'
                  }}>
                    {[1, 2, 3].map((version) => (
                      <button
                        key={version}
                        onClick={() => setSelectedVersion(version)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: '1px solid #333333',
                          backgroundColor: selectedVersion === version ? '#ffffff' : 'transparent',
                          color: selectedVersion === version ? '#000000' : '#666666',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedVersion !== version) {
                            e.target.style.backgroundColor = '#333333';
                            e.target.style.color = '#ffffff';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedVersion !== version) {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#666666';
                          }
                        }}
                      >
                        {version}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Texto de descripción */}
                <div style={{
                  opacity: showElements.description ? 1 : 0,
                  transform: showElements.description ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  minHeight: '120px', // Altura fija para evitar saltos
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  {renderTextWithCircles(typewriterText)}
                </div>
              </div>
              )}
              
              {/* Formulario */}
              <div style={{
                opacity: showElements.form ? 1 : 0,
                transform: showElements.form ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
              }}>
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </>
  );
}