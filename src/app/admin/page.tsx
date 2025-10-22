'use client';

import { useState, useEffect } from 'react';
import { APP_VERSION } from '@/lib/config';
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
  MoreHorizontal,
  Save,
  Upload,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Volume2,
  Image,
  Palette,
  Video,
  Type,
  Users,
  Target,
  Heart,
  Zap,
  Sparkles,
  Lightbulb,
  Gem,
  Rocket,
  Flame,
  Star,
  Shield,
  X,
  Check,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { ProjectData, AppConfig } from '@/types';
import { adminService } from '@/lib/adminService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import StepResponses from '@/components/StepResponses';

type AdminView = 'dashboard' | 'steps' | 'assets' | 'projects' | 'settings';

export default function AdminPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<AdminView>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'A' | 'B' | 'C'>('all');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [editingStep, setEditingStep] = useState<string | null>(null);
  const [newStep, setNewStep] = useState<any>(null);
  const [showAssetManager, setShowAssetManager] = useState(false);
  const [assetType, setAssetType] = useState<'videos' | 'icons' | 'colors'>('videos');
  const [showStepResponses, setShowStepResponses] = useState(false);
  const [selectedStepForResponses, setSelectedStepForResponses] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [searchSteps, setSearchSteps] = useState('');
  const [filterSection, setFilterSection] = useState<'all' | 'strategy' | 'brand' | 'product' | 'messages'>('all');
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set());
  const [editingStepData, setEditingStepData] = useState<any>(null);
  const [viewStepDetails, setViewStepDetails] = useState<{stepId: string, projectId?: string} | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    try {
      const projectsData = adminService.getProjects();
      const configData = adminService.getConfig();
      setProjects(projectsData);
      setConfig(configData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = () => {
    try {
      // Los datos se guardan automáticamente en el servicio
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleStepReorder = (stepIds: string[]) => {
    if (config) {
      adminService.updateStepOrder(stepIds);
      setConfig(adminService.getConfig());
    }
  };

  const handleStepUpdate = (stepId: string, updates: any) => {
    if (config) {
      adminService.updateStep(stepId, updates);
      setConfig(adminService.getConfig());
    }
  };

  const handleAddStep = () => {
    const step = {
      id: `step-${Date.now()}`,
      title: 'Nuevo Paso',
      description: 'Descripción del paso',
      type: 'custom',
      required: true,
      order: config?.steps.length || 0
    };
    adminService.addStep(step);
    setConfig(adminService.getConfig());
    setNewStep(null);
  };

  const handleRemoveStep = (stepId: string) => {
    adminService.removeStep(stepId);
    setConfig(adminService.getConfig());
  };

  const handleProjectToggle = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const handleAssetUpload = (type: 'video' | 'icon', file: File) => {
    // Implementar subida de archivos
    console.log(`Uploading ${type}:`, file.name);
  };

  const exportData = () => {
    const data = adminService.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admin-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        if (adminService.importData(data)) {
          loadData();
          alert('Datos importados correctamente');
        } else {
          alert('Error al importar datos');
        }
      };
      reader.readAsText(file);
    }
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
          <p style={{ color: '#cccccc', fontSize: '16px' }}>Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      users: Users,
      'trending-up': TrendingUp,
      target: Target,
      heart: Heart,
      zap: Zap,
      sparkles: Sparkles,
      lightbulb: Lightbulb,
      gem: Gem,
      rocket: Rocket,
      flame: Flame,
      star: Star,
      shield: Shield
    };
    return icons[iconName] || Target;
  };

  // Obtener numeración del paso (1.0, 1.1, 2.0, etc.)
  const getStepNumber = (stepId: string): string => {
    const stepNumberMap: { [key: string]: string } = {
      'strategy-1': '1.0',
      'strategy-2': '1.1',
      'strategy-3': '1.2',
      'brand-1': '2.0',
      'brand-2': '2.1',
      'brand-3': '2.2',
      'product-1': '3.0',
      'product-2': '3.1',
      'product-3': '3.2',
      'messages-1': '4.0',
      'messages-2': '4.1',
      'messages-3': '4.2'
    };
    return stepNumberMap[stepId] || stepId;
  };

  // Obtener número de respuestas para un paso específico de un proyecto
  const getStepResponseCount = (project: ProjectData, stepId: string): number => {
    const stepData = getStepData(project, stepId);
    if (!stepData) return 0;
    
    // Contar campos completados como indicador de respuestas
    const values = Object.values(stepData);
    const completed = values.filter(v => {
      if (typeof v === 'boolean') return v;
      if (typeof v === 'string') return v.length > 0;
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === 'object' && v !== null) return Object.keys(v).length > 0;
      return false;
    });
    return completed.length;
  };

  // Obtener datos de un paso específico
  const getStepData = (project: ProjectData, stepId: string): any => {
    const stepMap: { [key: string]: any } = {
      'strategy-1': project.strategy.interviews,
      'strategy-2': project.strategy.benchmark,
      'strategy-3': project.strategy.plan,
      'brand-1': project.brand.values,
      'brand-2': project.brand.naming,
      'brand-3': project.brand.visual,
      'product-1': project.product.features,
      'product-2': project.product.prototype,
      'product-3': project.product.validation,
      'messages-1': project.communication.social,
      'messages-2': project.communication.ads,
      'messages-3': project.communication.merch
    };
    return stepMap[stepId] || null;
  };

  // Verificar si un paso está completado
  const isStepCompleted = (project: ProjectData, stepId: string): boolean => {
    return getStepResponseCount(project, stepId) > 0;
  };

  // Obtener sección del paso (strategy, brand, product, messages)
  const getStepSection = (stepId: string): string => {
    if (stepId.startsWith('strategy-')) return 'strategy';
    if (stepId.startsWith('brand-')) return 'brand';
    if (stepId.startsWith('product-')) return 'product';
    if (stepId.startsWith('messages-')) return 'messages';
    return '';
  };

  // Filtrar pasos según búsqueda y filtro de sección
  const getFilteredSteps = () => {
    if (!config) return [];
    
    return config.steps
      .filter(step => {
        // Filtro de búsqueda
        const matchesSearch = searchSteps === '' || 
          step.title.toLowerCase().includes(searchSteps.toLowerCase()) ||
          step.description.toLowerCase().includes(searchSteps.toLowerCase()) ||
          getStepNumber(step.id).includes(searchSteps);
        
        // Filtro de sección
        const matchesSection = filterSection === 'all' || 
          getStepSection(step.id) === filterSection;
        
        return matchesSearch && matchesSection;
      })
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  };

  // Exportar datos filtrados
  const exportFilteredData = () => {
    const projectsToExport = selectedProjects.size > 0
      ? projects.filter(p => selectedProjects.has(p.id))
      : projects;
    
    const data = JSON.stringify({
      projects: projectsToExport,
      config: config,
      exportDate: new Date().toISOString(),
      totalProjects: projectsToExport.length
    }, null, 2);
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-data-${selectedProjects.size > 0 ? 'filtered-' : ''}${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Toggle selección de proyecto
  const toggleProjectSelection = (projectId: string) => {
    const newSelection = new Set(selectedProjects);
    if (newSelection.has(projectId)) {
      newSelection.delete(projectId);
    } else {
      newSelection.add(projectId);
    }
    setSelectedProjects(newSelection);
  };

  // Seleccionar todos los proyectos
  const toggleAllProjects = () => {
    if (selectedProjects.size === projects.length) {
      setSelectedProjects(new Set());
    } else {
      setSelectedProjects(new Set(projects.map(p => p.id)));
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans">
      {/* Header */}
      <header className="sticky top-0 bg-black/80 backdrop-blur-md px-6 py-5 z-50 border-b border-white/[0.08]">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-10 px-4 flex items-center justify-center bg-white text-black rounded-full hover:bg-white/90 transition-all duration-200"
            >
              <Menu className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-semibold text-white tracking-tight">
                  Panel de Administración
                </h1>
                <p className="text-xs text-white/40">v{APP_VERSION} - Animation System</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={selectedProjects.size > 0 ? exportFilteredData : exportData}
              className="h-10 px-6 flex items-center gap-2 text-sm bg-white text-black rounded-full hover:bg-white/90 transition-all duration-200"
              title={selectedProjects.size > 0 ? `Exportar ${selectedProjects.size} proyecto(s) seleccionado(s)` : 'Exportar todos los datos'}
            >
              <Download className="w-4 h-4" />
              {selectedProjects.size > 0 ? `Exportar (${selectedProjects.size})` : 'Exportar'}
            </button>
            
            <label className="h-10 px-6 flex items-center gap-2 text-sm bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer">
              <Upload className="w-4 h-4" />
              Importar
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="h-10 w-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all duration-200"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="px-6 py-5 border-b border-white/[0.08] bg-white/[0.02]">
        <div className="max-w-7xl mx-auto flex gap-3">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'steps', label: 'Gestión de Pasos', icon: Target },
            { id: 'assets', label: 'Assets', icon: Image },
            { id: 'projects', label: 'Proyectos', icon: FileText },
            { id: 'settings', label: 'Configuración', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setView(id as AdminView)}
              className={`
                px-6 py-3 rounded-full text-sm font-medium
                flex items-center gap-2 transition-all duration-200
                ${view === id 
                  ? 'bg-white text-black' 
                  : 'bg-transparent text-white/60 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="px-6 py-10 max-w-7xl mx-auto">
        {view === 'dashboard' && config && (
          <div className="flex flex-col gap-6">
            {/* Título y Acciones */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-1">
                  Índice de Pasos
                </h2>
                <p className="text-sm text-gray-400">
                  Gestiona y visualiza las respuestas de cada paso del proceso
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setView('steps')}
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all text-sm flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Configurar Pasos
                </button>
                <button
                  onClick={handleAddStep}
                  className="px-6 py-3 bg-white text-black hover:bg-white/90 rounded-full transition-all text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Nuevo Paso
                </button>
              </div>
            </div>

            {/* Búsqueda y Filtros */}
            <div className="flex flex-col gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar pasos por nombre, descripción o número..."
                    value={searchSteps}
                    onChange={(e) => setSearchSteps(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
                <button
                  onClick={() => {
                    setSearchSteps('');
                    setFilterSection('all');
                  }}
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white/60 hover:bg-white/10 hover:text-white transition-all text-sm"
                >
                  Limpiar
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-white/40 font-medium">Filtrar por sección:</span>
                <div className="flex gap-2">
                  {[
                    { id: 'all', label: 'Todas' },
                    { id: 'strategy', label: 'Strategy' },
                    { id: 'brand', label: 'Brand' },
                    { id: 'product', label: 'Product' },
                    { id: 'messages', label: 'Messages' }
                  ].map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setFilterSection(section.id as any)}
                      className={`
                        px-4 py-2 rounded-full text-xs font-medium transition-all
                        ${filterSection === section.id
                          ? 'bg-white text-black'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                        }
                      `}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de Proyectos para Exportación */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.08]">
                <span className="text-sm text-white/40 font-medium">Seleccionar proyectos:</span>
                <button
                  onClick={toggleAllProjects}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
                >
                  <Check className="w-3 h-3" />
                  {selectedProjects.size === projects.length ? 'Deseleccionar Todos' : 'Seleccionar Todos'}
                </button>
                <div className="flex gap-2 flex-wrap">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => toggleProjectSelection(project.id)}
                      className={`
                        px-4 py-2 rounded-full text-xs font-medium transition-all border
                        ${selectedProjects.has(project.id)
                          ? 'bg-white text-black border-white'
                          : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                        }
                      `}
                    >
                      {selectedProjects.has(project.id) && <Check className="w-3 h-3 inline mr-1" />}
                      {project.project.name}
                    </button>
                  ))}
                </div>
                {selectedProjects.size > 0 && (
                  <span className="ml-auto text-xs text-white/40">
                    {selectedProjects.size} seleccionado(s)
                  </span>
                )}
              </div>
            </div>

            {/* Tabla de Pasos */}
            <div className="bg-transparent border border-white/[0.08] rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-white/[0.08] hover:bg-transparent">
                    <TableHead className="text-white/40 font-medium w-32">#</TableHead>
                    <TableHead className="text-white/40 font-medium w-48">Paso</TableHead>
                    <TableHead className="text-white/40 font-medium">Descripción</TableHead>
                    <TableHead className="text-white/40 font-medium text-center w-32">Respuestas</TableHead>
                    <TableHead className="text-white/40 font-medium text-right w-40">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredSteps().length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <Search className="w-12 h-12 text-gray-600" />
                          <div>
                            <p className="text-gray-400 font-medium">No se encontraron pasos</p>
                            <p className="text-gray-600 text-sm mt-1">
                              Intenta ajustar los filtros de búsqueda
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    getFilteredSteps().map((step: any, index: number) => {
                      const IconComponent = getIconComponent(step.icon || 'target');
                      const stepNumber = getStepNumber(step.id);
                      const totalResponses = projects.reduce(
                        (acc, project) => acc + getStepResponseCount(project, step.id),
                        0
                      );
                      
                      return (
                        <TableRow 
                          key={step.id} 
                          className="border-b border-white/[0.08] hover:bg-white/[0.02] transition-colors"
                        >
                          <TableCell className="font-mono text-white font-medium">
                            {stepNumber}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <IconComponent className="w-5 h-5 text-white" />
                              <div>
                                <div className="text-white font-medium">{step.title}</div>
                                <div className="text-xs text-white/40">{step.type}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-white/60 text-sm max-w-md">
                            {step.description}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex flex-col gap-2 items-center">
                              <button
                                onClick={() => setViewStepDetails({ stepId: step.id })}
                                className="text-white font-semibold text-lg hover:text-white/80 transition-colors cursor-pointer"
                                title="Ver todas las respuestas de este paso"
                              >
                                {totalResponses}
                              </button>
                              <div className="flex gap-1">
                                {projects.map((project) => {
                                  const count = getStepResponseCount(project, step.id);
                                  const isCompleted = count > 0;
                                  return (
                                    <button
                                      key={project.id}
                                      onClick={() => {
                                        setSelectedProject(project);
                                        setSelectedStepForResponses(step.id);
                                        setShowStepResponses(true);
                                      }}
                                      className={`w-6 h-6 rounded text-xs font-medium transition-all ${
                                        isCompleted
                                          ? 'bg-white text-black hover:bg-white/90'
                                          : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'
                                      }`}
                                      title={`${project.project.name}: ${count} respuestas`}
                                    >
                                      {count > 0 ? count : '•'}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-2">
                              {step.videoUrl && (
                                <button
                                  onClick={() => setPreviewVideo(step.videoUrl)}
                                  className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all"
                                  title="Previsualizar video"
                                >
                                  <Play className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => setEditingStepData(step)}
                                className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all"
                                title="Editar paso"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`¿Eliminar el paso "${step.title}"?`)) {
                                    handleRemoveStep(step.id);
                                  }
                                }}
                                className="w-9 h-9 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
                                title="Eliminar paso"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Contador de resultados */}
            {searchSteps || filterSection !== 'all' ? (
              <div className="text-sm text-gray-400 text-center">
                Mostrando {getFilteredSteps().length} de {config.steps.length} pasos
              </div>
            ) : null}

            {/* Estadísticas Resumidas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/[0.03] border-white/[0.08]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-white/40">Total Proyectos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{projects.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/[0.03] border-white/[0.08]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-white/40">Pasos Configurados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{config.steps.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/[0.03] border-white/[0.08]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-white/40">Videos Disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{config.videos?.length || 0}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {view === 'steps' && config && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">
                Gestión de Pasos
              </h2>
              <button
                onClick={() => setNewStep({})}
                className="px-6 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-all text-sm font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Nuevo Paso
              </button>
            </div>

            <div className="flex flex-col gap-0">
              {config.steps
                .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                .map((step: any, index: number) => {
                  const IconComponent = getIconComponent(step.icon || 'target');
                  const stepNumber = getStepNumber(step.id);
                  return (
                    <div
                      key={step.id}
                      className="px-6 py-5 border-b border-white/[0.08] flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="font-mono text-white font-medium w-16">
                        {stepNumber}
                      </div>
                      
                      <IconComponent className="w-5 h-5 text-white" />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-base font-medium text-white">
                            {step.title}
                          </h3>
                          <span className="px-3 py-1 bg-white/5 text-white/60 rounded-full text-xs font-medium">
                            {step.type}
                          </span>
                          {step.required && (
                            <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-medium">
                              Requerido
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed">
                          {step.description}
                        </p>
                        {step.videoUrl && (
                          <div className="mt-2 text-xs text-white/40">
                            Video: {step.videoUrl}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingStep(editingStep === step.id ? null : step.id)}
                          className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handleRemoveStep(step.id)}
                          className="w-9 h-9 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {view === 'assets' && config && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">
                Gestión de Assets
              </h2>
              <div className="flex gap-2">
                {['videos', 'icons', 'colors'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setAssetType(type as any)}
                    className={`
                      px-6 py-3 rounded-full text-sm font-medium transition-all capitalize
                      ${assetType === type 
                        ? 'bg-white text-black' 
                        : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {assetType === 'videos' && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    Videos Disponibles
                  </h3>
                  <button
                    onClick={() => setShowAssetManager(true)}
                    className="px-6 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-all text-sm font-medium flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Video
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {config.videos?.map((video: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Video className="w-5 h-5 text-white" />
                        <div>
                          <div className="text-sm font-medium text-white">
                            {video.name}
                          </div>
                          <div className="text-xs text-white/40">
                            {video.category}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-white/60 mb-3">
                        {video.url}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPreviewVideo(video.url)}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all text-xs flex items-center gap-1.5"
                        >
                          <Play className="w-3 h-3" />
                          Preview
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar el video "${video.name}"?`)) {
                              adminService.removeVideo(video.name);
                              setConfig(adminService.getConfig());
                            }
                          }}
                          className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-all text-xs flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3 h-3" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {assetType === 'icons' && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    Iconos Disponibles
                  </h3>
                  <button
                    onClick={() => setShowAssetManager(true)}
                    className="px-6 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-all text-sm font-medium flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Icono
                  </button>
                </div>
                
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {config.icons.map((icon: any, index: number) => {
                    const IconComponent = getIconComponent(icon.name);
                    return (
                      <div
                        key={index}
                        className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-center hover:bg-white/[0.05] cursor-pointer transition-all"
                      >
                        <IconComponent className="w-8 h-8 text-white mx-auto mb-2" />
                        <div className="text-xs text-white/60 mb-1">
                          {icon.name}
                        </div>
                        <div className="text-xs text-white/40">
                          {icon.category}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {assetType === 'colors' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff' }}>
                  Paleta de Colores
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                  {Object.entries(config.colors).map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        padding: '16px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid #333333',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: value as string,
                          borderRadius: '6px',
                          border: '1px solid #333333'
                        }}
                      />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', textTransform: 'capitalize' }}>
                          {key}
                        </div>
                        <div style={{ fontSize: '12px', color: '#888888' }}>
                          {value as string}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#ffffff' }}>
                Gestión de Proyectos
              </h2>
              <button
                onClick={() => {
                  const newProject = adminService.createProject({
                    project: {
                      id: '',
                      name: 'Nuevo Proyecto',
                      sector: 'Tecnología',
                      vision: 'Descripción del proyecto',
                      values: ['Innovación'],
                      clientType: 'A',
                      createdAt: new Date(),
                      updatedAt: new Date()
                    },
                    strategy: {} as any,
                    brand: {} as any,
                    product: {} as any,
                    communication: {} as any,
                    launch: {} as any,
                    progress: { strategy: 0, brand: 0, product: 0, communication: 0, launch: 0 }
                  });
                  setProjects(adminService.getProjects());
                }}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#4a9eff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Plus style={{ width: '16px', height: '16px' }} />
                Nuevo Proyecto
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid #333333',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff' }}>
                        {project.project.name}
                      </h3>
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: 'rgba(74, 158, 255, 0.2)',
                        color: '#4a9eff',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {project.project.clientType}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#cccccc' }}>
                      {project.project.sector} • {project.project.vision}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setShowStepResponses(true);
                      }}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: 'rgba(74, 158, 255, 0.1)',
                        border: '1px solid rgba(74, 158, 255, 0.3)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        color: '#4a9eff',
                        fontSize: '14px'
                      }}
                    >
                      <Eye style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                      Ver Respuestas
                    </button>
                    <button
                      style={{
                        padding: '8px 16px',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        color: '#22c55e',
                        fontSize: '14px'
                      }}
                    >
                      <Edit style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        adminService.deleteProject(project.id);
                        setProjects(adminService.getProjects());
                      }}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        color: '#ef4444',
                        fontSize: '14px'
                      }}
                    >
                      <Trash2 style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                      Eliminar
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>
        )}

        {view === 'settings' && config && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#ffffff' }}>
              Configuración General
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div style={{
                padding: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid #333333',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginBottom: '16px' }}>
                  Información Básica
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '14px', color: '#cccccc', marginBottom: '4px', display: 'block' }}>
                      Título
                    </label>
                    <input
                      type="text"
                      value={config.title}
                      onChange={(e) => {
                        const newConfig = { ...config, title: e.target.value };
                        setConfig(newConfig);
                        adminService.updateConfig({ title: e.target.value });
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid #333333',
                        borderRadius: '6px',
                        color: '#ffffff',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '14px', color: '#cccccc', marginBottom: '4px', display: 'block' }}>
                      Versión
                    </label>
                    <input
                      type="text"
                      value={config.version}
                      onChange={(e) => {
                        const newConfig = { ...config, version: e.target.value };
                        setConfig(newConfig);
                        adminService.updateConfig({ version: e.target.value });
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid #333333',
                        borderRadius: '6px',
                        color: '#ffffff',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{
                padding: '24px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid #333333',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginBottom: '16px' }}>
                  Colores
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {Object.entries(config.colors).map(([key, value]) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: value as string,
                          borderRadius: '6px',
                          border: '1px solid #333333'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', color: '#ffffff', textTransform: 'capitalize' }}>
                          {key}
                        </div>
                        <div style={{ fontSize: '12px', color: '#888888' }}>
                          {value as string}
                        </div>
                      </div>
                      <input
                        type="color"
                        value={value as string}
                        onChange={(e) => {
                          const newColors = { ...config.colors, [key]: e.target.value };
                          const newConfig = { ...config, colors: newColors };
                          setConfig(newConfig);
                          adminService.updateConfig({ colors: newColors });
                        }}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <AlertCircle style={{ width: '20px', height: '20px', color: '#ef4444' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ef4444' }}>
                  Zona de Peligro
                </h3>
              </div>
              <p style={{ fontSize: '14px', color: '#cccccc', marginBottom: '16px' }}>
                Estas acciones son irreversibles. Ten cuidado al utilizarlas.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => {
                    if (confirm('¿Estás seguro de que quieres resetear todos los datos?')) {
                      adminService.resetData();
                      loadData();
                      alert('Datos reseteados correctamente');
                    }
                  }}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: '#ef4444',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Resetear Datos
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Step Edit Modal */}
      {editingStepData && (
        <div 
          className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-5"
          onClick={() => setEditingStepData(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-black border border-white/20 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-semibold text-white">Editar Paso</h3>
              <button
                onClick={() => setEditingStepData(null)}
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="step-title" className="text-white">Título</Label>
                <Input
                  id="step-title"
                  value={editingStepData.title || ''}
                  onChange={(e) => setEditingStepData({ ...editingStepData, title: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="step-description" className="text-white">Descripción</Label>
                <Textarea
                  id="step-description"
                  value={editingStepData.description || ''}
                  onChange={(e) => setEditingStepData({ ...editingStepData, description: e.target.value })}
                  className="bg-white/5 border-white/10 text-white min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="step-type" className="text-white">Tipo</Label>
                <Input
                  id="step-type"
                  value={editingStepData.type || ''}
                  onChange={(e) => setEditingStepData({ ...editingStepData, type: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="step-video" className="text-white">URL del Video (opcional)</Label>
                <Input
                  id="step-video"
                  value={editingStepData.videoUrl || ''}
                  onChange={(e) => setEditingStepData({ ...editingStepData, videoUrl: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="/video00.00.mp4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="step-icon" className="text-white">Icono</Label>
                <Select
                  value={editingStepData.icon || 'target'}
                  onValueChange={(value) => setEditingStepData({ ...editingStepData, icon: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20">
                    {['users', 'trending-up', 'target', 'heart', 'zap', 'sparkles', 'lightbulb', 'gem', 'rocket', 'flame', 'star', 'shield'].map((icon) => (
                      <SelectItem key={icon} value={icon} className="text-white hover:bg-white/10">
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="step-required"
                  checked={editingStepData.required || false}
                  onChange={(e) => setEditingStepData({ ...editingStepData, required: e.target.checked })}
                  className="w-4 h-4 rounded border-white/20 bg-white/5"
                />
                <Label htmlFor="step-required" className="text-white">Paso requerido</Label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
              <button
                onClick={() => setEditingStepData(null)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (editingStepData.id) {
                    handleStepUpdate(editingStepData.id, editingStepData);
                    setEditingStepData(null);
                    setEditingStep(null);
                  }
                }}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step Responses Modal */}
      {showStepResponses && selectedProject && (
        <StepResponses
          project={selectedProject}
          onClose={() => {
            setShowStepResponses(false);
            setSelectedProject(null);
            setSelectedStepForResponses(null);
          }}
        />
      )}

      {/* Step Details Modal - Ver todas las respuestas de un paso */}
      {viewStepDetails && config && (
        <div 
          className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-5"
          onClick={() => setViewStepDetails(null)}
        >
          <div 
            className="relative w-full max-w-6xl bg-black border border-white/20 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const step = config.steps.find(s => s.id === viewStepDetails.stepId);
              if (!step) return null;
              
              const IconComponent = getIconComponent(step.icon || 'target');
              
              return (
                <>
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {getStepNumber(step.id)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setViewStepDetails(null)}
                      className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-6">
                      {projects.map((project) => {
                        const stepData = getStepData(project, step.id);
                        const responseCount = getStepResponseCount(project, step.id);
                        
                        return (
                          <div 
                            key={project.id}
                            className="bg-white/[0.02] border border-white/10 rounded-xl p-6"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <h4 className="text-lg font-semibold text-white">
                                  {project.project.name}
                                </h4>
                                <Badge className={`${
                                  responseCount > 0 
                                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                    : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                                }`}>
                                  {responseCount > 0 ? `${responseCount} respuestas` : 'Sin respuestas'}
                                </Badge>
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedProject(project);
                                  setShowStepResponses(true);
                                  setViewStepDetails(null);
                                }}
                                className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-md text-blue-400 hover:bg-blue-500/20 transition-all text-sm flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                Ver Detalles Completos
                              </button>
                            </div>
                            
                            {stepData && responseCount > 0 ? (
                              <div className="space-y-3">
                                {Object.entries(stepData).map(([key, value]) => {
                                  if (!value) return null;
                                  
                                  return (
                                    <div key={key} className="bg-white/[0.02] p-4 rounded-lg">
                                      <div className="text-sm font-medium text-gray-400 mb-2 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                      </div>
                                      <div className="text-white">
                                        {typeof value === 'boolean' ? (
                                          <div className="flex items-center gap-2">
                                            {value ? (
                                              <><Check className="w-4 h-4 text-green-400" /> Sí</>
                                            ) : (
                                              <><X className="w-4 h-4 text-red-400" /> No</>
                                            )}
                                          </div>
                                        ) : typeof value === 'string' ? (
                                          <p className="text-sm">{value}</p>
                                        ) : Array.isArray(value) ? (
                                          <ul className="text-sm space-y-1">
                                            {value.map((item, idx) => (
                                              <li key={idx} className="flex items-start gap-2">
                                                <span className="text-blue-400">•</span>
                                                {typeof item === 'object' ? JSON.stringify(item, null, 2) : item}
                                              </li>
                                            ))}
                                          </ul>
                                        ) : typeof value === 'object' ? (
                                          <pre className="text-xs bg-black/30 p-3 rounded overflow-auto">
                                            {JSON.stringify(value, null, 2)}
                                          </pre>
                                        ) : (
                                          <p className="text-sm">{String(value)}</p>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>No hay respuestas para este paso</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {previewVideo && (
        <div 
          className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-5"
          onClick={() => setPreviewVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-black border border-white/20 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Previsualización de Video</h3>
              <button
                onClick={() => setPreviewVideo(null)}
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <video
                src={previewVideo}
                controls
                autoPlay
                className="w-full h-full"
              >
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
            <div className="p-4 bg-white/[0.02] border-t border-white/10">
              <p className="text-sm text-gray-400">
                Archivo: <span className="text-white font-mono">{previewVideo}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}