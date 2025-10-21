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
  FileText,
  ArrowRight,
  ArrowLeft,
  Menu,
  Plus
} from 'lucide-react';
import { ProjectData } from '@/types';

export default function AdminPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'dashboard' | 'project'>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#000000', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            border: '2px solid #333333', 
            borderTop: '2px solid #4a9eff', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#cccccc', fontSize: '16px' }}>Cargando proyectos...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      display: 'flex', 
      fontFamily: 'Inter, system-ui, sans-serif' 
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
        justifyContent: 'space-between',
        width: '100%'
      }}>
        {/* Left: Menu + Back */}
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
          {view === 'project' && (
            <button
              onClick={() => setView('dashboard')}
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
              <ArrowLeft style={{ width: '16px', height: '16px' }} />
            </button>
          )}
        </div>
        
        {/* Center: Title */}
        <div style={{ 
          fontSize: '16px', 
          color: '#ffffff', 
          fontWeight: '500',
          textAlign: 'center'
        }}>
          {view === 'dashboard' ? 'ADMIN / Dashboard' : `ADMIN / ${selectedProject?.project.name}`}
        </div>
        
        {/* Right: New Project */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => {/* TODO: Create new project */}}
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
            <Plus style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '64px' 
      }}>
        <div style={{ width: '100%', maxWidth: '800px' }}>
          {/* Separator line */}
          <div style={{ 
            width: '100%', 
            height: '1px', 
            backgroundColor: '#333333', 
            marginBottom: '32px',
            opacity: 0.08
          }}></div>
          
          {view === 'dashboard' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Projects List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      padding: '24px',
                      border: '1px solid #333333',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = '#4a9eff';
                      e.target.style.backgroundColor = 'rgba(74, 158, 255, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = '#333333';
                      e.target.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => {
                      setSelectedProject(project);
                      setView('project');
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ 
                          fontSize: '18px', 
                          fontWeight: '500', 
                          color: '#ffffff', 
                          marginBottom: '4px' 
                        }}>
                          {project.project.name}
                        </h3>
                        <p style={{ 
                          fontSize: '14px', 
                          color: '#cccccc', 
                          marginBottom: '8px' 
                        }}>
                          {project.project.sector} • {project.project.vision}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#666666' }}>
                          <span>{project.project.createdAt.toLocaleDateString()}</span>
                          <span>Tipo {project.project.clientType}</span>
                          <span>{project.project.values.length} valores</span>
                        </div>
                      </div>
                      <ArrowRight style={{ width: '16px', height: '16px', color: '#666666' }} />
                    </div>
                    
                    {/* Progress Bars */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {Object.entries(project.progress).map(([section, progress]) => (
                        <div key={section} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12px', color: '#666666', textTransform: 'capitalize' }}>{section}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ 
                              width: '80px', 
                              height: '4px', 
                              backgroundColor: '#333333', 
                              borderRadius: '2px' 
                            }}>
                              <div
                                style={{ 
                                  height: '4px', 
                                  backgroundColor: progress >= 80 ? '#4a9eff' : progress >= 60 ? '#ffaa00' : progress >= 40 ? '#ff6600' : '#ff4444',
                                  borderRadius: '2px',
                                  width: `${progress}%`,
                                  transition: 'width 0.3s ease'
                                }}
                              />
                            </div>
                            <span style={{ fontSize: '12px', color: '#666666', width: '32px' }}>{Math.round(progress)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {selectedProject && (
                <div>
                  <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: '500', 
                    color: '#ffffff', 
                    marginBottom: '8px' 
                  }}>
                    {selectedProject.project.name}
                  </h2>
                  <p style={{ 
                    fontSize: '16px', 
                    color: '#cccccc', 
                    marginBottom: '32px' 
                  }}>
                    {selectedProject.project.sector} • {selectedProject.project.vision}
                  </p>
                  
                  {/* Project Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                      <h3 style={{ 
                        fontSize: '16px', 
                        fontWeight: '500', 
                        color: '#ffffff', 
                        marginBottom: '16px' 
                      }}>
                        Información Básica
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                        <div>
                          <span style={{ color: '#666666' }}>Nombre:</span>
                          <span style={{ color: '#ffffff', marginLeft: '8px' }}>{selectedProject.project.name}</span>
                        </div>
                        <div>
                          <span style={{ color: '#666666' }}>Sector:</span>
                          <span style={{ color: '#ffffff', marginLeft: '8px' }}>{selectedProject.project.sector}</span>
                        </div>
                        <div>
                          <span style={{ color: '#666666' }}>Tipo:</span>
                          <span style={{ 
                            color: '#ffffff', 
                            marginLeft: '8px',
                            padding: '2px 8px',
                            backgroundColor: '#333333',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}>
                            Tipo {selectedProject.project.clientType}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 style={{ 
                        fontSize: '16px', 
                        fontWeight: '500', 
                        color: '#ffffff', 
                        marginBottom: '16px' 
                      }}>
                        Valores
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {selectedProject.project.values.map((value, index) => (
                          <span key={index} style={{
                            padding: '4px 12px',
                            backgroundColor: '#333333',
                            color: '#ffffff',
                            borderRadius: '16px',
                            fontSize: '12px'
                          }}>
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 style={{ 
                        fontSize: '16px', 
                        fontWeight: '500', 
                        color: '#ffffff', 
                        marginBottom: '16px' 
                      }}>
                        Progreso General
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {Object.entries(selectedProject.progress).map(([section, progress]) => (
                          <div key={section}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <span style={{ fontSize: '14px', color: '#666666', textTransform: 'capitalize' }}>{section}</span>
                              <span style={{ fontSize: '14px', color: '#ffffff' }}>{Math.round(progress)}%</span>
                            </div>
                            <div style={{ 
                              width: '100%', 
                              height: '6px', 
                              backgroundColor: '#333333', 
                              borderRadius: '3px' 
                            }}>
                              <div
                                style={{ 
                                  height: '6px', 
                                  backgroundColor: progress >= 80 ? '#4a9eff' : progress >= 60 ? '#ffaa00' : progress >= 40 ? '#ff6600' : '#ff4444',
                                  borderRadius: '3px',
                                  width: `${progress}%`,
                                  transition: 'width 0.3s ease'
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
