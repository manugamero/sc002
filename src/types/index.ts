export interface Project {
  id: string;
  name: string;
  sector: string;
  vision: string;
  values: string[];
  clientType: 'A' | 'B' | 'C';
  audioTranscription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StrategyData {
  interviews: {
    founders: boolean;
    users: boolean;
    stakeholders: boolean;
    notes: string;
  };
  benchmark: {
    competitors: Array<{
      name: string;
      url: string;
      insights: string;
    }>;
    matrix: string;
  };
  market: {
    insights: string;
    opportunities: string[];
    positioning: string;
  };
  plan: {
    vision: string;
    valueProp: string;
    roadmap: string[];
  };
  validation: {
    completed: boolean;
    feedback: string;
  };
}

export interface BrandData {
  values: {
    essence: string;
    archetype: string;
    tone: string;
  };
  naming: {
    options: string[];
    selected: string;
    messages: string[];
  };
  visual: {
    logoConcepts: string[];
    selectedLogo: string;
    colors: string[];
    typography: string;
  };
  validation: {
    completed: boolean;
    feedback: string;
  };
}

export interface ProductData {
  features: {
    mvp: string[];
    navigation: string;
    architecture: string;
  };
  prototype: {
    functional: boolean;
    interactive: boolean;
    multiDevice: boolean;
    notes: string;
  };
  validation: {
    completed: boolean;
    feedback: string;
  };
}

export interface CommunicationData {
  social: {
    avatar: string;
    bio: string;
    templates: string[];
    guidelines: string;
  };
  ads: {
    heroPiece: string;
    campaigns: string[];
    mediaPlan: string;
  };
  merch: {
    concepts: string[];
    packaging: string;
    experience: string;
  };
  validation: {
    completed: boolean;
    feedback: string;
  };
}

export interface LaunchData {
  goToMarket: {
    roadmap: string[];
    coordination: string;
    plan: string;
  };
  postLaunch: {
    feedback: string;
    kpis: string[];
    reports: string;
  };
  deliverables: {
    checklist: string[];
    report: string;
    playbook: string;
  };
}

export interface ProjectData {
  id: string;
  project: Project;
  strategy: StrategyData;
  brand: BrandData;
  product: ProductData;
  communication: CommunicationData;
  launch: LaunchData;
  progress: {
    strategy: number;
    brand: number;
    product: number;
    communication: number;
    launch: number;
  };
}

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
    category?: string;
  }[];
  
  // Videos disponibles
  videos?: {
    name: string;
    url: string;
    stepId?: string;
    category?: string;
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
    videoUrl?: string;
    icon?: string;
    order?: number;
  }[];
}
