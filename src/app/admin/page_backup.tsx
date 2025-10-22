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
      }
    ];

    setTimeout(() => {
      setProjects(dummyProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

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
            >
              <Menu style={{ width: '18px', height: '18px' }} />
            </button>
            
            <div style={{ 
              fontSize: '20px', 
              color: '#ffffff', 
              fontWeight: '600',
              letterSpacing: '-0.02em'
            }}>
              Admin Dashboard
            </div>
          </div>
          
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
            >
              <Plus style={{ width: '18px', height: '18px' }} />
            </button>
          </div>
        </div>
      </div>
      
      <div style={{ 
        padding: '40px 24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
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
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '28px',
                  border: '1px solid #333333',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
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
                        backgroundColor: 'rgba(74, 158, 255, 0.2)',
                        color: '#4a9eff',
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
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => {
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
                    >
                      <Eye style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
