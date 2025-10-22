import { ProjectData, AppConfig } from '@/types';
import { defaultConfig } from './config';

// Servicio de persistencia para el panel de administración
export class AdminService {
  private static instance: AdminService;
  private projects: ProjectData[] = [];
  private config: AppConfig = defaultConfig;

  private constructor() {
    this.loadData();
  }

  public static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  // Cargar datos desde localStorage
  private loadData(): void {
    if (typeof window !== 'undefined') {
      const savedProjects = localStorage.getItem('admin-projects');
      const savedConfig = localStorage.getItem('admin-config');
      
      if (savedProjects) {
        this.projects = JSON.parse(savedProjects);
      } else {
        // Crear proyectos de ejemplo si no existen
        this.projects = this.createSampleProjects();
        this.saveData();
      }
      
      if (savedConfig) {
        this.config = JSON.parse(savedConfig);
      }
    }
  }

  // Crear proyectos de ejemplo
  private createSampleProjects(): ProjectData[] {
    return [
      {
        id: 'project-1',
        project: {
          id: 'project-1',
          name: 'TechFlow',
          sector: 'Tecnología',
          vision: 'Plataforma de gestión de proyectos para equipos remotos',
          values: ['Innovación', 'Colaboración', 'Eficiencia'],
          clientType: 'A',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        strategy: {
          interviews: {
            founders: true,
            users: true,
            stakeholders: true,
            notes: 'Entrevistas completadas con 3 fundadores, 5 usuarios beta y 2 stakeholders clave.'
          },
          benchmark: {
            competitors: [
              {
                name: 'Asana',
                url: 'https://asana.com',
                insights: 'Fuerte en gestión de tareas pero débil en comunicación en tiempo real.'
              },
              {
                name: 'Monday.com',
                url: 'https://monday.com',
                insights: 'Excelente UX pero costoso para equipos pequeños.'
              }
            ],
            matrix: 'Matriz de competidores completada con análisis FODA.'
          },
          market: {
            insights: 'Mercado en crecimiento del 25% anual',
            opportunities: ['Equipos remotos', 'Startups', 'Freelancers'],
            positioning: 'Solución premium para equipos de alto rendimiento'
          },
          plan: {
            vision: 'Ser la plataforma #1 para equipos remotos en 2025',
            valueProp: 'Gestión de proyectos + comunicación en un solo lugar',
            roadmap: ['MVP Q1 2024', 'Beta Q2 2024', 'Lanzamiento Q3 2024']
          },
          validation: {
            completed: true,
            feedback: 'Validación positiva con 15 usuarios beta'
          }
        },
        brand: {
          values: {
            essence: 'Eficiencia sin fricciones',
            archetype: 'El Sabio',
            tone: 'Profesional pero accesible'
          },
          naming: {
            options: ['TechFlow', 'FlowTech', 'TeamSync', 'ProjectHub'],
            selected: 'TechFlow',
            messages: ['Fluye con tu equipo', 'Proyectos sin fricciones', 'El futuro del trabajo']
          },
          visual: {
            logoConcepts: ['Concepto A', 'Concepto B', 'Concepto C'],
            selectedLogo: 'Concepto B - Símbolo de flujo minimalista',
            colors: ['#2563eb', '#7c3aed', '#06b6d4'],
            typography: 'Inter, sans-serif'
          },
          validation: {
            completed: true,
            feedback: 'Logo bien recibido por stakeholders'
          }
        },
        product: {
          features: {
            mvp: ['Dashboard de proyectos', 'Chat en tiempo real', 'Calendario compartido'],
            navigation: 'Sidebar principal con acceso rápido a proyectos',
            architecture: 'React + Node.js + PostgreSQL'
          },
          prototype: {
            functional: true,
            interactive: true,
            multiDevice: true,
            notes: 'Prototipo funcional en Figma con 25 pantallas'
          },
          validation: {
            completed: true,
            feedback: 'Usuarios validan la propuesta de valor'
          }
        },
        communication: {
          social: {
            avatar: 'Logo principal con gradiente',
            bio: 'Gestión de proyectos para equipos remotos 🚀',
            templates: ['Post de lanzamiento', 'Post de funcionalidades', 'Post de testimonios'],
            guidelines: 'Tono profesional, uso de emojis moderado, enfoque en valor'
          },
          ads: {
            heroPiece: 'Video de 30s mostrando flujo de trabajo',
            campaigns: ['Launch campaign', 'Feature highlights', 'User testimonials'],
            mediaPlan: 'LinkedIn Ads + Twitter Ads + Product Hunt'
          },
          merch: {
            concepts: ['Tazas', 'Camisetas', 'Stickers'],
            packaging: 'Cajas blancas con logo en azul',
            experience: 'Unboxing premium con carta de bienvenida'
          },
          validation: {
            completed: false,
            feedback: ''
          }
        },
        launch: {
          goToMarket: {
            roadmap: ['Product Hunt', 'LinkedIn Launch', 'Email Campaign'],
            coordination: 'Equipo de marketing + producto + ventas',
            plan: 'Lanzamiento gradual con beta cerrada primero'
          },
          postLaunch: {
            feedback: '',
            kpis: ['Usuarios activos', 'Retención', 'NPS'],
            reports: ''
          },
          deliverables: {
            checklist: ['Landing page', 'Documentación', 'Video demo'],
            report: '',
            playbook: ''
          }
        },
        progress: {
          strategy: 100,
          brand: 100,
          product: 80,
          communication: 60,
          launch: 20
        }
      },
      {
        id: 'project-2',
        name: 'HealthPro',
        sector: 'Salud',
        vision: 'App de telemedicina accesible',
        values: ['Cuidado', 'Innovación'],
        clientType: 'B',
        createdAt: new Date(),
        updatedAt: new Date(),
        strategy: {
          interviews: {
            founders: true,
            users: false,
            stakeholders: true,
            notes: 'Entrevistas con fundadores completadas'
          },
          benchmark: {
            competitors: [],
            matrix: ''
          },
          market: {
            insights: '',
            opportunities: [],
            positioning: ''
          },
          plan: {
            vision: 'Democratizar el acceso a la salud',
            valueProp: 'Consultas médicas desde casa',
            roadmap: []
          },
          validation: {
            completed: false,
            feedback: ''
          }
        },
        brand: {
          values: {
            essence: 'Cuidado profesional',
            archetype: 'El Cuidador',
            tone: 'Empático y profesional'
          },
          naming: {
            options: ['HealthPro', 'MediCare+', 'DocConnect'],
            selected: 'HealthPro',
            messages: []
          },
          visual: {
            logoConcepts: [],
            selectedLogo: '',
            colors: [],
            typography: ''
          },
          validation: {
            completed: false,
            feedback: ''
          }
        },
        product: {
          features: {
            mvp: [],
            navigation: '',
            architecture: ''
          },
          prototype: {
            functional: false,
            interactive: false,
            multiDevice: false,
            notes: ''
          },
          validation: {
            completed: false,
            feedback: ''
          }
        },
        communication: {
          social: {
            avatar: '',
            bio: '',
            templates: [],
            guidelines: ''
          },
          ads: {
            heroPiece: '',
            campaigns: [],
            mediaPlan: ''
          },
          merch: {
            concepts: [],
            packaging: '',
            experience: ''
          },
          validation: {
            completed: false,
            feedback: ''
          }
        },
        launch: {
          goToMarket: {
            roadmap: [],
            coordination: '',
            plan: ''
          },
          postLaunch: {
            feedback: '',
            kpis: [],
            reports: ''
          },
          deliverables: {
            checklist: [],
            report: '',
            playbook: ''
          }
        },
        progress: {
          strategy: 40,
          brand: 30,
          product: 0,
          communication: 0,
          launch: 0
        }
      } as any,
      {
        id: 'project-3',
        name: 'EcoMarket',
        sector: 'E-commerce',
        vision: 'Marketplace de productos sostenibles',
        values: ['Sostenibilidad', 'Transparencia'],
        clientType: 'C',
        createdAt: new Date(),
        updatedAt: new Date(),
        strategy: {
          interviews: {
            founders: true,
            users: true,
            stakeholders: false,
            notes: ''
          },
          benchmark: {
            competitors: [],
            matrix: ''
          },
          market: {
            insights: '',
            opportunities: [],
            positioning: ''
          },
          plan: {
            vision: '',
            valueProp: '',
            roadmap: []
          },
          validation: {
            completed: false,
            feedback: ''
          }
        },
        brand: {
          values: {
            essence: '',
            archetype: '',
            tone: ''
          },
          naming: {
            options: [],
            selected: '',
            messages: []
          },
          visual: {
            logoConcepts: [],
            selectedLogo: '',
            colors: [],
            typography: ''
          },
          validation: {
            completed: false,
            feedback: ''
          }
        },
        product: {
          features: {
            mvp: [],
            navigation: '',
            architecture: ''
          },
          prototype: {
            functional: false,
            interactive: false,
            multiDevice: false,
            notes: ''
          },
          validation: {
            completed: false,
            feedback: ''
          }
        },
        communication: {
          social: {
            avatar: '',
            bio: '',
            templates: [],
            guidelines: ''
          },
          ads: {
            heroPiece: '',
            campaigns: [],
            mediaPlan: ''
          },
          merch: {
            concepts: [],
            packaging: '',
            experience: ''
          },
          validation: {
            completed: false,
            feedback: ''
          }
        },
        launch: {
          goToMarket: {
            roadmap: [],
            coordination: '',
            plan: ''
          },
          postLaunch: {
            feedback: '',
            kpis: [],
            reports: ''
          },
          deliverables: {
            checklist: [],
            report: '',
            playbook: ''
          }
        },
        progress: {
          strategy: 20,
          brand: 0,
          product: 0,
          communication: 0,
          launch: 0
        }
      } as any
    ];
  }

  // Guardar datos en localStorage
  private saveData(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-projects', JSON.stringify(this.projects));
      localStorage.setItem('admin-config', JSON.stringify(this.config));
    }
  }

  // Gestión de proyectos
  public getProjects(): ProjectData[] {
    return this.projects;
  }

  public getProject(id: string): ProjectData | null {
    return this.projects.find(p => p.id === id) || null;
  }

  public createProject(projectData: Omit<ProjectData, 'id'>): ProjectData {
    const newProject: ProjectData = {
      ...projectData,
      id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    this.projects.push(newProject);
    this.saveData();
    return newProject;
  }

  public updateProject(id: string, updates: Partial<ProjectData>): ProjectData | null {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.projects[index] = { ...this.projects[index], ...updates };
    this.saveData();
    return this.projects[index];
  }

  public deleteProject(id: string): boolean {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.projects.splice(index, 1);
    this.saveData();
    return true;
  }

  // Gestión de configuración
  public getConfig(): AppConfig {
    return this.config;
  }

  public updateConfig(updates: Partial<AppConfig>): AppConfig {
    this.config = { ...this.config, ...updates };
    this.saveData();
    return this.config;
  }

  // Gestión de pasos
  public updateStepOrder(stepIds: string[]): void {
    this.config.steps = stepIds.map(id => 
      this.config.steps.find(step => step.id === id)
    ).filter(Boolean) as AppConfig['steps'];
    this.saveData();
  }

  public updateStep(stepId: string, updates: Partial<AppConfig['steps'][0]>): void {
    const stepIndex = this.config.steps.findIndex(step => step.id === stepId);
    if (stepIndex !== -1) {
      this.config.steps[stepIndex] = { ...this.config.steps[stepIndex], ...updates };
      this.saveData();
    }
  }

  public addStep(step: AppConfig['steps'][0]): void {
    this.config.steps.push(step);
    this.saveData();
  }

  public removeStep(stepId: string): void {
    this.config.steps = this.config.steps.filter(step => step.id !== stepId);
    this.saveData();
  }

  // Gestión de assets
  public addVideo(video: { name: string; url: string; stepId?: string }): void {
    if (!this.config.videos) {
      this.config.videos = [];
    }
    this.config.videos.push(video);
    this.saveData();
  }

  public removeVideo(videoName: string): void {
    if (this.config.videos) {
      this.config.videos = this.config.videos.filter(v => v.name !== videoName);
      this.saveData();
    }
  }

  public addIcon(icon: AppConfig['icons'][0]): void {
    this.config.icons.push(icon);
    this.saveData();
  }

  public removeIcon(iconName: string): void {
    this.config.icons = this.config.icons.filter(i => i.name !== iconName);
    this.saveData();
  }

  public updateColors(colors: { [key: string]: string }): void {
    this.config.colors = { ...this.config.colors, ...colors };
    this.saveData();
  }

  // Exportar/Importar datos
  public exportData(): string {
    return JSON.stringify({
      projects: this.projects,
      config: this.config
    }, null, 2);
  }

  public importData(data: string): boolean {
    try {
      const parsed = JSON.parse(data);
      if (parsed.projects && parsed.config) {
        this.projects = parsed.projects;
        this.config = parsed.config;
        this.saveData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  // Resetear datos
  public resetData(): void {
    this.projects = [];
    this.config = defaultConfig;
    this.saveData();
  }
}

export const adminService = AdminService.getInstance();
