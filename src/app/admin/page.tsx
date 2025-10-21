'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Calendar,
  User,
  TrendingUp,
  FileText
} from 'lucide-react';
import { ProjectData } from '@/types';

export default function AdminPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading projects from database
    const dummyProjects: ProjectData[] = [
      {
        id: '1',
        project: {
          id: '1',
          name: 'TechFlow Pro',
          sector: 'SaaS',
          vision: 'Revolucionar el flujo de trabajo empresarial',
          values: ['Innovación', 'Eficiencia', 'Colaboración'],
          clientType: 'B',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-20'),
        },
        strategy: {
          interviews: { founders: true, users: true, stakeholders: false, notes: 'Entrevistas completadas' },
          benchmark: { competitors: [], matrix: 'Análisis completado' },
          market: { insights: 'Mercado en crecimiento', opportunities: ['Expansión B2B'], positioning: 'Líder en eficiencia' },
          plan: { vision: 'Ser líder del mercado', valueProp: 'Eficiencia empresarial', roadmap: ['MVP Q1', 'Launch Q2'] },
          validation: { completed: true, feedback: 'Validado con usuarios' }
        },
        brand: {
          values: { essence: 'Eficiencia', archetype: 'El Experto', tone: 'Profesional' },
          naming: { options: ['TechFlow', 'FlowPro'], selected: 'TechFlow', messages: ['Flujo eficiente'] },
          visual: { logoConcepts: ['Minimalista'], selectedLogo: 'Minimalista', colors: ['#007AFF'], typography: 'Inter' },
          validation: { completed: false, feedback: '' }
        },
        product: {
          features: { mvp: ['Dashboard', 'API'], navigation: 'Sidebar navigation', architecture: 'Microservices' },
          prototype: { functional: true, interactive: true, multiDevice: false, notes: 'Prototipo funcional' },
          validation: { completed: false, feedback: '' }
        },
        communication: {
          social: { avatar: 'Profesional', bio: 'TechFlow para empresas', templates: [], guidelines: '' },
          ads: { heroPiece: 'Hero ad', campaigns: [], mediaPlan: '' },
          merch: { concepts: [], packaging: '', experience: '' },
          validation: { completed: false, feedback: '' }
        },
        launch: {
          goToMarket: { roadmap: ['Beta launch'], coordination: '', plan: '' },
          postLaunch: { feedback: '', kpis: [], reports: '' },
          deliverables: { checklist: [], report: '', playbook: '' }
        },
        progress: { strategy: 80, brand: 60, product: 70, communication: 30, launch: 20 }
      },
      {
        id: '2',
        project: {
          id: '2',
          name: 'EcoMarket',
          sector: 'E-commerce',
          vision: 'Mercado sostenible para todos',
          values: ['Sostenibilidad', 'Comunidad', 'Transparencia'],
          clientType: 'A',
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-18'),
        },
        strategy: {
          interviews: { founders: true, users: false, stakeholders: false, notes: 'Entrevista con fundadores' },
          benchmark: { competitors: [], matrix: 'Análisis básico' },
          market: { insights: 'Mercado verde en crecimiento', opportunities: ['Consumidores conscientes'], positioning: 'Sostenible y accesible' },
          plan: { vision: 'Mercado líder en sostenibilidad', valueProp: 'Compras sostenibles fáciles', roadmap: ['MVP Q1'] },
          validation: { completed: false, feedback: '' }
        },
        brand: {
          values: { essence: 'Sostenibilidad', archetype: 'El Cuidador', tone: 'Cercano y auténtico' },
          naming: { options: ['EcoMarket'], selected: 'EcoMarket', messages: ['Mercado verde'] },
          visual: { logoConcepts: ['Natural'], selectedLogo: 'Natural', colors: ['#34C759'], typography: 'Poppins' },
          validation: { completed: false, feedback: '' }
        },
        product: {
          features: { mvp: ['Catálogo', 'Carrito'], navigation: 'Grid layout', architecture: 'Monolito' },
          prototype: { functional: false, interactive: false, multiDevice: false, notes: 'En desarrollo' },
          validation: { completed: false, feedback: '' }
        },
        communication: {
          social: { avatar: 'Eco-friendly', bio: 'EcoMarket - Compras sostenibles', templates: [], guidelines: '' },
          ads: { heroPiece: '', campaigns: [], mediaPlan: '' },
          merch: { concepts: [], packaging: '', experience: '' },
          validation: { completed: false, feedback: '' }
        },
        launch: {
          goToMarket: { roadmap: [], coordination: '', plan: '' },
          postLaunch: { feedback: '', kpis: [], reports: '' },
          deliverables: { checklist: [], report: '', playbook: '' }
        },
        progress: { strategy: 60, brand: 40, product: 30, communication: 10, launch: 0 }
      }
    ];

    setTimeout(() => {
      setProjects(dummyProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getClientTypeColor = (type: string) => {
    switch (type) {
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'B': return 'bg-green-100 text-green-800';
      case 'C': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportProject = (project: ProjectData) => {
    const dataStr = JSON.stringify(project, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${project.project.name}-data.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando proyectos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">🧭 Studio Admin</h1>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {projects.length} proyectos
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Nuevo Proyecto
              </button>
              <a href="/" className="text-gray-600 hover:text-gray-900">
                Volver a la App
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Proyectos Activos</h2>
                <p className="text-gray-600 text-sm">Gestiona todos los proyectos del estudio</p>
              </div>
              
              <div className="divide-y">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {project.project.name}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getClientTypeColor(project.project.clientType)}`}>
                            Tipo {project.project.clientType}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">
                          {project.project.sector} • {project.project.vision}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{project.project.createdAt.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{project.project.values.length} valores</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            exportProject(project);
                          }}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Progress Bars */}
                    <div className="mt-4 space-y-2">
                      {Object.entries(project.progress).map(([section, progress]) => (
                        <div key={section} className="flex items-center justify-between">
                          <span className="text-xs text-gray-600 capitalize">{section}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${getProgressColor(progress)}`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600 w-8">{Math.round(progress)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-1">
            {selectedProject ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-lg"
              >
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Detalles del Proyecto</h3>
                </div>
                
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Información Básica</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Nombre:</span>
                        <span className="ml-2 font-medium">{selectedProject.project.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Sector:</span>
                        <span className="ml-2 font-medium">{selectedProject.project.sector}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Tipo:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getClientTypeColor(selectedProject.project.clientType)}`}>
                          Tipo {selectedProject.project.clientType}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Valores</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.project.values.map((value, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Progreso General</h4>
                    <div className="space-y-3">
                      {Object.entries(selectedProject.progress).map(([section, progress]) => (
                        <div key={section}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600 capitalize">{section}</span>
                            <span className="text-sm font-medium">{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(progress)}`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      <Edit className="w-4 h-4 inline mr-2" />
                      Editar
                    </button>
                    <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                      <FileText className="w-4 h-4 inline mr-2" />
                      Brandbook
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center">
                  <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Selecciona un proyecto para ver los detalles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
