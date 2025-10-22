'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Plus,
  GripVertical,
  Settings,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { ProjectData } from '@/types';

export default function AdminPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'dashboard' | 'project' | 'settings'>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'A' | 'B' | 'C'>('all');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

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

  // Drag & Drop functions
  const handleDragStart = (e: React.DragEvent, projectId: string) => {
    setDraggedItem(projectId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const newProjects = [...projects];
    const draggedIndex = newProjects.findIndex(p => p.id === draggedItem);
    const targetIndex = newProjects.findIndex(p => p.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const draggedProject = newProjects[draggedIndex];
      newProjects.splice(draggedIndex, 1);
      newProjects.splice(targetIndex, 0, draggedProject);
      setProjects(newProjects);
    }

    setDraggedItem(null);
  };

  // Filter and search
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.project.sector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || project.project.clientType === filterType;
    return matchesSearch && matchesFilter;
  });

  // Delete project
  const deleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
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
      fontFamily: 'Inter, system-ui, sans-serif' 
    }}>
      {/* Header */}
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        backgroundColor: '#000000', 
        padding: '20px 24px', 
        zIndex: 10,
        borderBottom: '1px solid #333333',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Left: Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ 
                width: '40px', 
                height: '40px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid #333333', 
                borderRadius: '8px',
                cursor: 'pointer',
                color: '#ffffff',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = '#333333';
              }}
            >
              <Menu style={{ width: '18px', height: '18px' }} />
            </button>
            
            {view === 'project' && (
              <button
                onClick={() => setView('dashboard')}
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid #333333', 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: '#ffffff',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = '#333333';
                }}
              >
                <ArrowLeft style={{ width: '18px', height: '18px' }} />
              </button>
            )}
            
            <div style={{ 
              fontSize: '20px', 
              color: '#ffffff', 
              fontWeight: '600',
              letterSpacing: '-0.02em'
            }}>
              {view === 'dashboard' ? 'Admin Dashboard' : selectedProject?.project.name}
            </div>
          </div>
          
          {/* Center: Search & Filters (only on dashboard) */}
          {view === 'dashboard' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <Search style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  width: '16px', 
                  height: '16px', 
                  color: '#666666' 
                }} />
                <input
                  type="text"
                  placeholder="Buscar proyectos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '12px 12px 12px 40px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    width: '240px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = '#666666'}
                  onMouseLeave={(e) => e.target.style.borderColor = '#333333'}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4a9eff';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#333333';
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'A' | 'B' | 'C')}
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid #333333',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.borderColor = '#666666'}
                onMouseLeave={(e) => e.target.style.borderColor = '#333333'}
              >
                <option value="all" style={{ backgroundColor: '#1a1a1a' }}>Todos los tipos</option>
                <option value="A" style={{ backgroundColor: '#1a1a1a' }}>Tipo A</option>
                <option value="B" style={{ backgroundColor: '#1a1a1a' }}>Tipo B</option>
                <option value="C" style={{ backgroundColor: '#1a1a1a' }}>Tipo C</option>
              </select>
            </div>
          )}
          
          {/* Right: Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setShowSettings(!showSettings)}
              style={{ 
                width: '40px', 
                height: '40px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid #333333', 
                borderRadius: '8px',
                cursor: 'pointer',
                color: '#ffffff',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = '#333333';
              }}
            >
              <Settings style={{ width: '18px', height: '18px' }} />
            </button>
            
            <button
              onClick={() => {
                console.log('Creando nuevo proyecto...');
              }}
              style={{ 
                width: '40px', 
                height: '40px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: '#4a9eff', 
                border: 'none', 
                borderRadius: '8px',
                cursor: 'pointer',
                color: '#ffffff',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#3a8bef';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#4a9eff';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <Plus style={{ width: '18px', height: '18px' }} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div style={{ 
        padding: '40px 24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
          
          {view === 'dashboard' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Stats Overview */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '20px',
                marginBottom: '8px'
              }}>
                <div style={{
                  padding: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid #333333',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#4a9eff', marginBottom: '8px' }}>
                    {projects.length}
                  </div>
                  <div style={{ fontSize: '14px', color: '#cccccc' }}>Total Proyectos</div>
                </div>
                
                <div style={{
                  padding: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid #333333',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#34c759', marginBottom: '8px' }}>
                    {Math.round(projects.reduce((acc, p) => acc + Object.values(p.progress).reduce((a, b) => a + b, 0) / 5, 0) / projects.length)}%
                  </div>
                  <div style={{ fontSize: '14px', color: '#cccccc' }}>Progreso Promedio</div>
                </div>
                
                <div style={{
                  padding: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid #333333',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#ff9500', marginBottom: '8px' }}>
                    {projects.filter(p => p.project.clientType === 'A').length}
                  </div>
                  <div style={{ fontSize: '14px', color: '#cccccc' }}>Tipo A</div>
                </div>
              </div>

              {/* Projects List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, project.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, project.id)}
                    style={{
                      padding: '28px',
                      border: '1px solid #333333',
                      borderRadius: '16px',
                      backgroundColor: draggedItem === project.id ? 'rgba(74, 158, 255, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                      cursor: 'move',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      opacity: draggedItem === project.id ? 0.7 : 1,
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                      if (draggedItem !== project.id) {
                        e.target.style.borderColor = '#4a9eff';
                        e.target.style.backgroundColor = 'rgba(74, 158, 255, 0.05)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 32px rgba(74, 158, 255, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (draggedItem !== project.id) {
                        e.target.style.borderColor = '#333333';
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {/* Drag Handle */}
                    <div style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#666666',
                      cursor: 'grab',
                      opacity: 0.6
                    }}>
                      <GripVertical style={{ width: '16px', height: '16px' }} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', marginLeft: '32px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <h3 style={{ 
                            fontSize: '20px', 
                            fontWeight: '600', 
                            color: '#ffffff',
                            letterSpacing: '-0.01em'
                          }}>
                            {project.project.name}
                          </h3>
                          <span style={{
                            padding: '4px 12px',
                            backgroundColor: project.project.clientType === 'A' ? 'rgba(52, 199, 89, 0.2)' : 
                                           project.project.clientType === 'B' ? 'rgba(74, 158, 255, 0.2)' : 'rgba(175, 82, 222, 0.2)',
                            color: project.project.clientType === 'A' ? '#34c759' : 
                                   project.project.clientType === 'B' ? '#4a9eff' : '#af52de',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            Tipo {project.project.clientType}
                          </span>
                        </div>
                        
                        <p style={{ 
                          fontSize: '15px', 
                          color: '#cccccc', 
                          marginBottom: '12px',
                          lineHeight: '1.5'
                        }}>
                          {project.project.sector} • {project.project.vision}
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '13px', color: '#666666' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar style={{ width: '14px', height: '14px' }} />
                            <span>{project.project.createdAt.toLocaleDateString()}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <User style={{ width: '14px', height: '14px' }} />
                            <span>{project.project.values.length} valores</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                            setView('project');
                          }}
                          style={{
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(74, 158, 255, 0.1)',
                            border: '1px solid rgba(74, 158, 255, 0.3)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            color: '#4a9eff',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(74, 158, 255, 0.2)';
                            e.target.style.borderColor = '#4a9eff';
                            e.target.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'rgba(74, 158, 255, 0.1)';
                            e.target.style.borderColor = 'rgba(74, 158, 255, 0.3)';
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          <Eye style={{ width: '16px', height: '16px' }} />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            exportProject(project);
                          }}
                          style={{
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid #333333',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            color: '#cccccc',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.borderColor = '#ffffff';
                            e.target.style.color = '#ffffff';
                            e.target.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                            e.target.style.borderColor = '#333333';
                            e.target.style.color = '#cccccc';
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          <Download style={{ width: '16px', height: '16px' }} />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(project.id);
                          }}
                          style={{
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 68, 68, 0.1)',
                            border: '1px solid rgba(255, 68, 68, 0.3)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            color: '#ff4444',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(255, 68, 68, 0.2)';
                            e.target.style.borderColor = '#ff4444';
                            e.target.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'rgba(255, 68, 68, 0.1)';
                            e.target.style.borderColor = 'rgba(255, 68, 68, 0.3)';
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          <Trash2 style={{ width: '16px', height: '16px' }} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Progress Bars */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginLeft: '32px' }}>
                      {Object.entries(project.progress).map(([section, progress]) => (
                        <div key={section} style={{ 
                          padding: '16px',
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid #333333',
                          borderRadius: '8px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ 
                              fontSize: '13px', 
                              color: '#cccccc', 
                              textTransform: 'capitalize',
                              fontWeight: '500'
                            }}>
                              {section}
                            </span>
                            <span style={{ 
                              fontSize: '13px', 
                              color: progress >= 80 ? '#4a9eff' : progress >= 60 ? '#ffaa00' : progress >= 40 ? '#ff6600' : '#ff4444',
                              fontWeight: '600'
                            }}>
                              {Math.round(progress)}%
                            </span>
                          </div>
                          <div style={{ 
                            width: '100%', 
                            height: '6px', 
                            backgroundColor: '#333333', 
                            borderRadius: '3px',
                            overflow: 'hidden'
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
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {selectedProject && (
                <div>
                  {/* Project Header */}
                  <div style={{ 
                    padding: '32px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid #333333',
                    borderRadius: '16px',
                    marginBottom: '32px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div>
                        <h2 style={{ 
                          fontSize: '28px', 
                          fontWeight: '600', 
                          color: '#ffffff',
                          letterSpacing: '-0.02em',
                          marginBottom: '8px'
                        }}>
                          {selectedProject.project.name}
                        </h2>
                        <p style={{ 
                          fontSize: '16px', 
                          color: '#cccccc',
                          lineHeight: '1.5'
                        }}>
                          {selectedProject.project.sector} • {selectedProject.project.vision}
                        </p>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{
                          padding: '8px 16px',
                          backgroundColor: selectedProject.project.clientType === 'A' ? 'rgba(52, 199, 89, 0.2)' : 
                                         selectedProject.project.clientType === 'B' ? 'rgba(74, 158, 255, 0.2)' : 'rgba(175, 82, 222, 0.2)',
                          color: selectedProject.project.clientType === 'A' ? '#34c759' : 
                                 selectedProject.project.clientType === 'B' ? '#4a9eff' : '#af52de',
                          borderRadius: '12px',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          Tipo {selectedProject.project.clientType}
                        </span>
                        
                        <button
                          onClick={() => exportProject(selectedProject)}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: 'rgba(74, 158, 255, 0.1)',
                            border: '1px solid rgba(74, 158, 255, 0.3)',
                            borderRadius: '8px',
                            color: '#4a9eff',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(74, 158, 255, 0.2)';
                            e.target.style.borderColor = '#4a9eff';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'rgba(74, 158, 255, 0.1)';
                            e.target.style.borderColor = 'rgba(74, 158, 255, 0.3)';
                          }}
                        >
                          <Download style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                          Exportar
                        </button>
                      </div>
                    </div>
                    
                    {/* Project Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#4a9eff', marginBottom: '4px' }}>
                          {selectedProject.project.values.length}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666666' }}>Valores</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#34c759', marginBottom: '4px' }}>
                          {selectedProject.project.createdAt.toLocaleDateString()}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666666' }}>Creado</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#ff9500', marginBottom: '4px' }}>
                          {Math.round(Object.values(selectedProject.progress).reduce((a, b) => a + b, 0) / 5)}%
                        </div>
                        <div style={{ fontSize: '12px', color: '#666666' }}>Progreso</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Details */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    {/* Basic Info */}
                    <div style={{
                      padding: '24px',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid #333333',
                      borderRadius: '12px'
                    }}>
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        color: '#ffffff', 
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <FileText style={{ width: '18px', height: '18px' }} />
                        Información Básica
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#666666', fontSize: '14px' }}>Nombre</span>
                          <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500' }}>{selectedProject.project.name}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#666666', fontSize: '14px' }}>Sector</span>
                          <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500' }}>{selectedProject.project.sector}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#666666', fontSize: '14px' }}>Tipo</span>
                          <span style={{ 
                            color: selectedProject.project.clientType === 'A' ? '#34c759' : 
                                   selectedProject.project.clientType === 'B' ? '#4a9eff' : '#af52de',
                            fontSize: '14px', 
                            fontWeight: '500'
                          }}>
                            Tipo {selectedProject.project.clientType}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Values */}
                    <div style={{
                      padding: '24px',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid #333333',
                      borderRadius: '12px'
                    }}>
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        color: '#ffffff', 
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <TrendingUp style={{ width: '18px', height: '18px' }} />
                        Valores
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {selectedProject.project.values.map((value, index) => (
                          <span key={index} style={{
                            padding: '6px 12px',
                            backgroundColor: 'rgba(74, 158, 255, 0.1)',
                            color: '#4a9eff',
                            borderRadius: '16px',
                            fontSize: '13px',
                            fontWeight: '500',
                            border: '1px solid rgba(74, 158, 255, 0.3)'
                          }}>
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Progress Overview */}
                    <div style={{
                      padding: '24px',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid #333333',
                      borderRadius: '12px',
                      gridColumn: '1 / -1'
                    }}>
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        color: '#ffffff', 
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <TrendingUp style={{ width: '18px', height: '18px' }} />
                        Progreso General
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        {Object.entries(selectedProject.progress).map(([section, progress]) => (
                          <div key={section} style={{ 
                            padding: '16px',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid #333333',
                            borderRadius: '8px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <span style={{ 
                                fontSize: '14px', 
                                color: '#cccccc', 
                                textTransform: 'capitalize',
                                fontWeight: '500'
                              }}>
                                {section}
                              </span>
                              <span style={{ 
                                fontSize: '14px', 
                                color: progress >= 80 ? '#4a9eff' : progress >= 60 ? '#ffaa00' : progress >= 40 ? '#ff6600' : '#ff4444',
                                fontWeight: '600'
                              }}>
                                {Math.round(progress)}%
                              </span>
                            </div>
                            <div style={{ 
                              width: '100%', 
                              height: '6px', 
                              backgroundColor: '#333333', 
                              borderRadius: '3px',
                              overflow: 'hidden'
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
