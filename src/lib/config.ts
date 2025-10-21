// Configuración global de la aplicación
export interface AppConfig {
  // Información básica
  version: string;
  title: string;
  
  // Colores por defecto
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  
  // Iconos disponibles
  icons: {
    name: string;
    component: string;
  }[];
  
  // Tipografías disponibles
  typographies: string[];
  
  // Industrias disponibles
  industries: string[];
  
  // Tamaños de empresa
  companySizes: string[];
  
  // Introducciones por sección
  introductions: {
    [key: string]: {
      title: string;
      description: string;
      alternatives: string[];
    };
  };
  
  // Configuración de pasos
  steps: {
    id: string;
    title: string;
    description: string;
    type: string;
    required: boolean;
    alternatives?: string[];
  }[];
}

// Configuración por defecto
export const defaultConfig: AppConfig = {
  version: "013",
  title: "S+C",
  
  colors: {
    primary: "#ffffff",
    secondary: "#000000",
    background: "#1a1a1a",
    text: "#ffffff",
    accent: "#333333"
  },
  
  icons: [
    { name: "zap", component: "Zap" },
    { name: "rocket", component: "Rocket" },
    { name: "lightbulb", component: "Lightbulb" },
    { name: "target", component: "Target" },
    { name: "star", component: "Star" },
    { name: "flame", component: "Flame" },
    { name: "gem", component: "Gem" },
    { name: "sparkles", component: "Sparkles" }
  ],
  
  typographies: [
    "Inter",
    "Helvetica",
    "Arial",
    "Roboto",
    "Montserrat",
    "Poppins",
    "Open Sans",
    "Lato"
  ],
  
  industries: [
    "Tecnología",
    "Salud",
    "Educación",
    "Finanzas",
    "Retail",
    "Manufactura",
    "Consultoría",
    "Marketing",
    "Otro"
  ],
  
  companySizes: [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "500+"
  ],
  
  introductions: {
    "strategy-1": {
      title: "1 STRATEGY",
      description: "A todos nos ha pasado: tener una idea y no saber cómo aterrizarla. El primer paso no es diseñar ni planificar, sino escuchar. Las entrevistas con fundadores, equipo y usuarios nos permiten entender la historia desde dentro.",
      alternatives: [
        "A todos nos ha pasado: tener una idea y no saber cómo aterrizarla. El primer paso no es diseñar ni planificar, sino escuchar. Las entrevistas con fundadores, equipo y usuarios nos permiten entender la historia desde dentro.",
        "La estrategia es el fundamento de todo proyecto exitoso. Comenzamos escuchando las voces que importan: fundadores, usuarios y stakeholders que dan vida a cada iniciativa.",
        "Cada gran proyecto nace de una comprensión profunda del contexto. Las entrevistas nos revelan la verdadera esencia y potencial de cada idea."
      ]
    },
    "brand-1": {
      title: "2 BRAND",
      description: "La marca es la personalidad de tu proyecto. Más allá del logo, es la forma en que te perciben, la historia que cuentas y los valores que transmites en cada interacción.",
      alternatives: [
        "La marca es la personalidad de tu proyecto. Más allá del logo, es la forma en que te perciben, la historia que cuentas y los valores que transmites en cada interacción.",
        "Una marca fuerte es el alma de cualquier proyecto. Definimos su esencia, valores y personalidad para crear conexiones auténticas con tu audiencia.",
        "La marca trasciende lo visual. Es la experiencia completa que vives con un proyecto, desde el primer contacto hasta la relación a largo plazo."
      ]
    },
    "product-1": {
      title: "3 PRODUCT",
      description: "El producto es donde la estrategia y la marca cobran vida. Desde las funcionalidades core hasta la experiencia de usuario, cada detalle cuenta en la creación de valor.",
      alternatives: [
        "El producto es donde la estrategia y la marca cobran vida. Desde las funcionalidades core hasta la experiencia de usuario, cada detalle cuenta en la creación de valor.",
        "Un gran producto resuelve problemas reales de forma elegante. Diseñamos funcionalidades que importan y experiencias que enamoran.",
        "El producto es el puente entre la visión y la realidad. Cada función, cada interacción, cada detalle está pensado para crear valor genuino."
      ]
    },
    "messages-1": {
      title: "4 MESSAGES",
      description: "Los mensajes son la voz de tu proyecto. Desde las redes sociales hasta las campañas publicitarias, cada palabra cuenta para construir la narrativa que conecta con tu audiencia.",
      alternatives: [
        "Los mensajes son la voz de tu proyecto. Desde las redes sociales hasta las campañas publicitarias, cada palabra cuenta para construir la narrativa que conecta con tu audiencia.",
        "Una comunicación efectiva transforma ideas en conexiones. Desarrollamos mensajes que resuenan y estrategias que impactan.",
        "Los mensajes dan vida a la marca. Cada contenido, cada campaña, cada palabra está diseñada para crear conversaciones significativas."
      ]
    }
  },
  
  steps: [
    {
      id: "strategy-1",
      title: "Context",
      description: "Entrevistas con fundadores, equipo y usuarios para entender la historia desde dentro.",
      type: "interview",
      required: true
    },
    {
      id: "strategy-2", 
      title: "Market",
      description: "Análisis del mercado y competidores para identificar oportunidades.",
      type: "competitors",
      required: true
    },
    {
      id: "strategy-3",
      title: "Plan",
      description: "Definición de la propuesta de valor y roadmap del proyecto.",
      type: "plan",
      required: true
    },
    {
      id: "brand-1",
      title: "Values",
      description: "Definición de valores, propósito y personalidad de la marca.",
      type: "values",
      required: true
    },
    {
      id: "brand-2",
      title: "Verbal",
      description: "Desarrollo del sistema verbal: naming, mensajes y tono de voz.",
      type: "names",
      required: true
    },
    {
      id: "brand-3",
      title: "Visual",
      description: "Creación del sistema visual: logo, colores y tipografía.",
      type: "logo",
      required: true
    },
    {
      id: "product-1",
      title: "Features",
      description: "Definición de funcionalidades y flujos de usuario principales.",
      type: "userflow",
      required: true
    },
    {
      id: "product-2",
      title: "Prototype",
      description: "Desarrollo de prototipos interactivos y validación con usuarios.",
      type: "prototype",
      required: true
    },
    {
      id: "product-3",
      title: "Launch",
      description: "Planificación del lanzamiento y estrategia de go-to-market.",
      type: "rollout",
      required: true
    },
    {
      id: "messages-1",
      title: "Social",
      description: "Desarrollo de presencia en redes sociales y contenido.",
      type: "social",
      required: true
    },
    {
      id: "messages-2",
      title: "Campaigns",
      description: "Creación de campañas publicitarias y piezas creativas.",
      type: "campaign",
      required: true
    },
    {
      id: "messages-3",
      title: "Merch",
      description: "Desarrollo de merchandising y elementos promocionales.",
      type: "merch",
      required: true
    }
  ]
};

// Función para obtener configuración
export const getConfig = (): AppConfig => {
  if (typeof window !== 'undefined') {
    const savedConfig = localStorage.getItem('app-config');
    if (savedConfig) {
      return JSON.parse(savedConfig);
    }
  }
  return defaultConfig;
};

// Función para guardar configuración
export const saveConfig = (config: AppConfig): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('app-config', JSON.stringify(config));
  }
};

// Función para resetear configuración
export const resetConfig = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('app-config');
  }
};
