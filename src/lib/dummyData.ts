import { ProjectData } from '@/types';

export const generateDummyProjectData = (clientType: 'A' | 'B' | 'C'): Partial<ProjectData> => {
  const baseProject = {
    id: `project-${Date.now()}`,
    project: {
      id: `project-${Date.now()}`,
      name: `Proyecto ${clientType}`,
      sector: 'Tech Startup',
      vision: 'Revolucionar la industria con tecnología innovadora',
      values: ['Innovación', 'Transparencia', 'Excelencia'],
      clientType,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    progress: {
      strategy: 0,
      brand: 0,
      product: 0,
      communication: 0,
      launch: 0,
    },
  };

  const dummyData = {
    A: {
      strategy: {
        interviews: {
          founders: true,
          users: false,
          stakeholders: false,
          notes: 'Entrevista con fundadores completada. Visión clara del producto, necesidad de validación con usuarios.',
        },
        benchmark: {
          competitors: [
            { name: 'Competidor 1', url: 'https://competidor1.com', insights: 'Enfoque en UX simplificado' },
            { name: 'Competidor 2', url: 'https://competidor2.com', insights: 'Fuerte presencia en redes sociales' },
          ],
          matrix: 'Análisis básico de 3 competidores principales',
        },
        market: {
          insights: 'Mercado en crecimiento, oportunidad en segmento premium',
          opportunities: ['Expansión internacional', 'Partnerships estratégicos'],
          positioning: 'Líder en innovación y calidad',
        },
        plan: {
          vision: 'Ser la plataforma líder en el sector para 2025',
          valueProp: 'Simplificamos procesos complejos con tecnología intuitiva',
          roadmap: ['MVP Q1', 'Beta Q2', 'Launch Q3'],
        },
        validation: {
          completed: false,
          feedback: 'Pendiente validación con fundadores',
        },
      },
      brand: {
        values: {
          essence: 'Innovación accesible',
          archetype: 'El Creador',
          tone: 'Profesional pero cercano',
        },
        naming: {
          options: ['TechFlow', 'InnovateHub', 'SmartCore'],
          selected: 'TechFlow',
          messages: ['Flujo de trabajo inteligente', 'Tecnología que fluye'],
        },
        visual: {
          logoConcepts: ['Concepto minimalista', 'Concepto moderno'],
          selectedLogo: 'Concepto minimalista',
          colors: ['#007AFF', '#34C759', '#FF9500'],
          typography: 'Inter, sans-serif',
        },
        validation: {
          completed: false,
          feedback: 'Pendiente validación con fundadores',
        },
      },
    },
    B: {
      strategy: {
        interviews: {
          founders: true,
          users: true,
          stakeholders: false,
          notes: 'Entrevistas con fundadores y usuarios completadas. Insights valiosos sobre necesidades del mercado.',
        },
        benchmark: {
          competitors: [
            { name: 'Competidor 1', url: 'https://competidor1.com', insights: 'Enfoque en UX simplificado' },
            { name: 'Competidor 2', url: 'https://competidor2.com', insights: 'Fuerte presencia en redes sociales' },
            { name: 'Competidor 3', url: 'https://competidor3.com', insights: 'Precio competitivo' },
            { name: 'Competidor 4', url: 'https://competidor4.com', insights: 'Excelente soporte al cliente' },
            { name: 'Competidor 5', url: 'https://competidor5.com', insights: 'Integración con herramientas populares' },
          ],
          matrix: 'Análisis detallado de 8 competidores con matriz de atributos',
        },
        market: {
          insights: 'Mercado maduro con oportunidades en nichos específicos',
          opportunities: ['Expansión B2B', 'Integración API', 'Mercados emergentes'],
          positioning: 'Especialistas en soluciones personalizadas',
        },
        plan: {
          vision: 'Ser la plataforma de referencia para empresas medianas',
          valueProp: 'Soluciones personalizadas que se adaptan a cada cliente',
          roadmap: ['Research Q1', 'MVP Q2', 'Beta Q3', 'Launch Q4'],
        },
        validation: {
          completed: true,
          feedback: 'Validado con usuarios y advisors. Listo para siguiente fase.',
        },
      },
      brand: {
        values: {
          essence: 'Confianza y especialización',
          archetype: 'El Experto',
          tone: 'Profesional y confiable',
        },
        naming: {
          options: ['ProFlow', 'ExpertCore', 'TrustHub', 'CustomTech'],
          selected: 'ProFlow',
          messages: ['Flujo profesional', 'Procesos optimizados', 'Experiencia premium'],
        },
        visual: {
          logoConcepts: ['Concepto corporativo', 'Concepto moderno', 'Concepto minimalista'],
          selectedLogo: 'Concepto corporativo',
          colors: ['#1D4ED8', '#059669', '#DC2626', '#7C3AED'],
          typography: 'Poppins, sans-serif',
        },
        validation: {
          completed: true,
          feedback: 'Validado con equipo interno. Aprobado para implementación.',
        },
      },
    },
    C: {
      strategy: {
        interviews: {
          founders: true,
          users: true,
          stakeholders: true,
          notes: 'Entrevistas completas con todos los stakeholders. Análisis exhaustivo del ecosistema.',
        },
        benchmark: {
          competitors: [
            { name: 'Competidor 1', url: 'https://competidor1.com', insights: 'Enfoque en UX simplificado' },
            { name: 'Competidor 2', url: 'https://competidor2.com', insights: 'Fuerte presencia en redes sociales' },
            { name: 'Competidor 3', url: 'https://competidor3.com', insights: 'Precio competitivo' },
            { name: 'Competidor 4', url: 'https://competidor4.com', insights: 'Excelente soporte al cliente' },
            { name: 'Competidor 5', url: 'https://competidor5.com', insights: 'Integración con herramientas populares' },
            { name: 'Competidor 6', url: 'https://competidor6.com', insights: 'Innovación constante' },
            { name: 'Competidor 7', url: 'https://competidor7.com', insights: 'Enfoque en seguridad' },
            { name: 'Competidor 8', url: 'https://competidor8.com', insights: 'Escalabilidad empresarial' },
          ],
          matrix: 'Análisis completo por categorías con informe detallado',
        },
        market: {
          insights: 'Mercado complejo con múltiples segmentos y oportunidades de disrupción',
          opportunities: ['Expansión global', 'Plataforma multi-tenant', 'IA integrada', 'Ecosistema de partners'],
          positioning: 'Líder en transformación digital empresarial',
        },
        plan: {
          vision: 'Septar el estándar de la industria con soluciones integrales',
          valueProp: 'Ecosistema completo de herramientas que transforman empresas',
          roadmap: ['Research Q1', 'MVP Q2', 'Beta Q3', 'Launch Q4', 'Scale Q5'],
        },
        validation: {
          completed: true,
          feedback: 'Validado en workshop interdisciplinar. Plan aprobado por todos los stakeholders.',
        },
      },
      brand: {
        values: {
          essence: 'Transformación y liderazgo',
          archetype: 'El Líder',
          tone: 'Autoridad y visión',
        },
        naming: {
          options: ['EnterpriseFlow', 'TransformCore', 'VisionHub', 'LeadershipTech', 'FutureFlow'],
          selected: 'TransformCore',
          messages: ['Transformación empresarial', 'Core de la innovación', 'Liderando el futuro'],
        },
        visual: {
          logoConcepts: ['Concepto premium', 'Concepto futurista', 'Concepto corporativo', 'Concepto minimalista'],
          selectedLogo: 'Concepto premium',
          colors: ['#0F172A', '#1E40AF', '#059669', '#DC2626', '#7C3AED'],
          typography: 'Inter, sans-serif',
        },
        validation: {
          completed: true,
          feedback: 'Validado por comité interdepartamental. Sistema completo aprobado.',
        },
      },
    },
  };

  return {
    ...baseProject,
    strategy: dummyData[clientType].strategy,
    brand: dummyData[clientType].brand,
  };
};

export const dummyContentTemplates = {
  strategy: {
    A: {
      interviews: 'Entrevista con fundadores completada. Visión clara del producto, necesidad de validación con usuarios.',
      benchmark: 'Análisis de 3-5 competidores principales con enfoque en diferenciación.',
      market: 'Insights rápidos sobre mercado objetivo y oportunidades de crecimiento.',
      plan: 'Vision Deck básico con Value Proposition clara.',
    },
    B: {
      interviews: 'Entrevistas con fundadores y usuarios completadas. Insights valiosos sobre necesidades del mercado.',
      benchmark: 'Matriz de atributos de 5-10 competidores con análisis detallado.',
      market: 'Análisis de oportunidades con 5-10 referentes del sector.',
      plan: 'Strategy Brief completo con MVP Roadmap detallado.',
    },
    C: {
      interviews: 'Workshop interdisciplinar con todos los stakeholders completado.',
      benchmark: 'Análisis completo por categorías con informe detallado.',
      market: 'Market & Category Report exhaustivo con análisis de disrupción.',
      plan: 'Strategic Playbook completo con Alignment Board.',
    },
  },
  brand: {
    A: {
      values: 'Workshop de propósito completado. Esencia de marca definida.',
      naming: 'Brainstorm de nombres con chequeo básico de disponibilidad.',
      visual: '1-2 propuestas de logo con mini guía de marca.',
    },
    B: {
      values: 'Arquetipos de marca y tono definidos con test social.',
      naming: 'Naming Sprint completado con testeo y key messages.',
      visual: '3-4 líneas visuales con mini-brandbook.',
    },
    C: {
      values: 'Auditoría cultural completa con Brand DNA definido.',
      naming: 'Naming System completo con Manual verbal y Copy frameworks.',
      visual: 'Sistema modular completo con Brand Book digital.',
    },
  },
};
