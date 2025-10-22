'use client';

import { useState } from 'react';
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
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { ProjectData } from '@/types';

interface StepResponsesProps {
  project: ProjectData;
  onClose: () => void;
}

export default function StepResponses({ project, onClose }: StepResponsesProps) {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');

  const getStepData = (stepId: string) => {
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

  const getStepTitle = (stepId: string) => {
    const titles: { [key: string]: string } = {
      'strategy-1': 'Entrevistas',
      'strategy-2': 'Benchmark',
      'strategy-3': 'Plan Estratégico',
      'brand-1': 'Valores de Marca',
      'brand-2': 'Naming',
      'brand-3': 'Sistema Visual',
      'product-1': 'Funcionalidades',
      'product-2': 'Prototipo',
      'product-3': 'Validación',
      'messages-1': 'Redes Sociales',
      'messages-2': 'Campañas',
      'messages-3': 'Merchandising'
    };
    return titles[stepId] || 'Paso';
  };

  const getStepIcon = (stepId: string) => {
    const icons: { [key: string]: any } = {
      'strategy-1': Users,
      'strategy-2': TrendingUp,
      'strategy-3': Target,
      'brand-1': Heart,
      'brand-2': Zap,
      'brand-3': Sparkles,
      'product-1': Lightbulb,
      'product-2': Gem,
      'product-3': CheckCircle,
      'messages-1': Flame,
      'messages-2': Star,
      'messages-3': Shield
    };
    return icons[stepId] || Target;
  };

  const getStepStatus = (stepId: string) => {
    const stepData = getStepData(stepId);
    if (!stepData) return 'pending';
    
    if (stepId.includes('strategy-1')) {
      return stepData.founders && stepData.users ? 'completed' : 'pending';
    }
    if (stepId.includes('strategy-2')) {
      return stepData.competitors?.length > 0 ? 'completed' : 'pending';
    }
    if (stepId.includes('strategy-3')) {
      return stepData.vision && stepData.valueProp ? 'completed' : 'pending';
    }
    if (stepId.includes('brand-1')) {
      return stepData.essence && stepData.archetype ? 'completed' : 'pending';
    }
    if (stepId.includes('brand-2')) {
      return stepData.selected && stepData.messages?.length > 0 ? 'completed' : 'pending';
    }
    if (stepId.includes('brand-3')) {
      return stepData.selectedLogo && stepData.colors?.length > 0 ? 'completed' : 'pending';
    }
    if (stepId.includes('product-1')) {
      return stepData.mvp?.length > 0 ? 'completed' : 'pending';
    }
    if (stepId.includes('product-2')) {
      return stepData.functional ? 'completed' : 'pending';
    }
    if (stepId.includes('product-3')) {
      return stepData.completed ? 'completed' : 'pending';
    }
    if (stepId.includes('messages-1')) {
      return stepData.avatar && stepData.bio ? 'completed' : 'pending';
    }
    if (stepId.includes('messages-2')) {
      return stepData.heroPiece && stepData.campaigns?.length > 0 ? 'completed' : 'pending';
    }
    if (stepId.includes('messages-3')) {
      return stepData.concepts?.length > 0 ? 'completed' : 'pending';
    }
    
    return 'pending';
  };

  const steps = [
    'strategy-1', 'strategy-2', 'strategy-3',
    'brand-1', 'brand-2', 'brand-3',
    'product-1', 'product-2', 'product-3',
    'messages-1', 'messages-2', 'messages-3'
  ];

  const filteredSteps = steps.filter(stepId => {
    const status = getStepStatus(stepId);
    const title = getStepTitle(stepId);
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderStepContent = (stepId: string) => {
    const stepData = getStepData(stepId);
    if (!stepData) return null;

    return (
      <div style={{ padding: '24px', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px' }}>
        {stepId.includes('strategy-1') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '12px' }}>
              Entrevistas Realizadas
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {stepData.founders ? <CheckCircle style={{ width: '16px', height: '16px', color: '#22c55e' }} /> : <XCircle style={{ width: '16px', height: '16px', color: '#ef4444' }} />}
                <span style={{ fontSize: '14px', color: '#cccccc' }}>Fundadores</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {stepData.users ? <CheckCircle style={{ width: '16px', height: '16px', color: '#22c55e' }} /> : <XCircle style={{ width: '16px', height: '16px', color: '#ef4444' }} />}
                <span style={{ fontSize: '14px', color: '#cccccc' }}>Usuarios</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {stepData.stakeholders ? <CheckCircle style={{ width: '16px', height: '16px', color: '#22c55e' }} /> : <XCircle style={{ width: '16px', height: '16px', color: '#ef4444' }} />}
                <span style={{ fontSize: '14px', color: '#cccccc' }}>Stakeholders</span>
              </div>
            </div>
            {stepData.notes && (
              <div style={{ marginTop: '16px' }}>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '8px' }}>
                  Notas
                </h5>
                <p style={{ fontSize: '14px', color: '#cccccc', lineHeight: '1.5' }}>
                  {stepData.notes}
                </p>
              </div>
            )}
          </div>
        )}

        {stepId.includes('strategy-2') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '12px' }}>
              Análisis de Competidores
            </h4>
            {stepData.competitors?.map((competitor: any, index: number) => (
              <div key={index} style={{
                padding: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid #333333',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>
                    {competitor.name}
                  </h5>
                  <a 
                    href={competitor.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ fontSize: '12px', color: '#4a9eff', textDecoration: 'none' }}
                  >
                    Ver sitio
                  </a>
                </div>
                <p style={{ fontSize: '14px', color: '#cccccc', lineHeight: '1.4' }}>
                  {competitor.insights}
                </p>
              </div>
            ))}
            {stepData.matrix && (
              <div style={{ marginTop: '16px' }}>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '8px' }}>
                  Matriz de Análisis
                </h5>
                <p style={{ fontSize: '14px', color: '#cccccc', lineHeight: '1.5' }}>
                  {stepData.matrix}
                </p>
              </div>
            )}
          </div>
        )}

        {stepId.includes('strategy-3') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '12px' }}>
              Plan Estratégico
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '4px' }}>
                  Visión
                </h5>
                <p style={{ fontSize: '14px', color: '#cccccc', lineHeight: '1.5' }}>
                  {stepData.vision}
                </p>
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '4px' }}>
                  Propuesta de Valor
                </h5>
                <p style={{ fontSize: '14px', color: '#cccccc', lineHeight: '1.5' }}>
                  {stepData.valueProp}
                </p>
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '4px' }}>
                  Roadmap
                </h5>
                <ul style={{ fontSize: '14px', color: '#cccccc', lineHeight: '1.5', paddingLeft: '20px' }}>
                  {stepData.roadmap?.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {stepId.includes('brand-1') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '12px' }}>
              Valores de Marca
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '4px' }}>
                  Esencia
                </h5>
                <p style={{ fontSize: '14px', color: '#cccccc', lineHeight: '1.5' }}>
                  {stepData.essence}
                </p>
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '4px' }}>
                  Arquetipo
                </h5>
                <p style={{ fontSize: '14px', color: '#cccccc', lineHeight: '1.5' }}>
                  {stepData.archetype}
                </p>
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '4px' }}>
                  Tono
                </h5>
                <p style={{ fontSize: '14px', color: '#cccccc', lineHeight: '1.5' }}>
                  {stepData.tone}
                </p>
              </div>
            </div>
          </div>
        )}

        {stepId.includes('brand-2') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '12px' }}>
              Sistema Verbal
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '4px' }}>
                  Nombre Seleccionado
                </h5>
                <p style={{ fontSize: '14px', color: '#4a9eff', lineHeight: '1.5', fontWeight: '600' }}>
                  {stepData.selected}
                </p>
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '4px' }}>
                  Opciones Consideradas
                </h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {stepData.options?.map((option: string, index: number) => (
                    <span 
                      key={index}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: option === stepData.selected ? 'rgba(74, 158, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        color: option === stepData.selected ? '#4a9eff' : '#cccccc',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: option === stepData.selected ? '600' : '400'
                      }}
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '4px' }}>
                  Mensajes Clave
                </h5>
                <ul style={{ fontSize: '14px', color: '#cccccc', lineHeight: '1.5', paddingLeft: '20px' }}>
                  {stepData.messages?.map((message: string, index: number) => (
                    <li key={index}>{message}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {stepId.includes('brand-3') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '12px' }}>
              Sistema Visual
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '4px' }}>
                  Logo Seleccionado
                </h5>
                <p style={{ fontSize: '14px', color: '#4a9eff', lineHeight: '1.5', fontWeight: '600' }}>
                  {stepData.selectedLogo}
                </p>
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '4px' }}>
                  Colores
                </h5>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {stepData.colors?.map((color: string, index: number) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          backgroundColor: color,
                          borderRadius: '4px',
                          border: '1px solid #333333'
                        }}
                      />
                      <span style={{ fontSize: '12px', color: '#cccccc' }}>{color}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '4px' }}>
                  Tipografía
                </h5>
                <p style={{ fontSize: '14px', color: '#cccccc', lineHeight: '1.5' }}>
                  {stepData.typography}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Similar patterns for other steps... */}
      </div>
    );
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        backgroundColor: '#000000',
        border: '1px solid #333333',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #333333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#ffffff', marginBottom: '4px' }}>
              Respuestas del Proyecto
            </h2>
            <p style={{ fontSize: '14px', color: '#cccccc' }}>
              {project.project.name} • {project.project.sector}
            </p>
          </div>
          <button
            onClick={onClose}
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
              color: '#ffffff'
            }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Filters */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #333333',
          backgroundColor: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Buscar pasos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
            <div style={{ display: 'flex', gap: '8px' }}>
              {['all', 'completed', 'pending'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: filterStatus === status ? '#4a9eff' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${filterStatus === status ? '#4a9eff' : '#333333'}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: filterStatus === status ? '#ffffff' : '#cccccc',
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}
                >
                  {status === 'all' ? 'Todos' : status === 'completed' ? 'Completados' : 'Pendientes'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', height: '100%' }}>
            {/* Steps List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredSteps.map((stepId) => {
                const IconComponent = getStepIcon(stepId);
                const status = getStepStatus(stepId);
                const isSelected = selectedStep === stepId;
                
                return (
                  <button
                    key={stepId}
                    onClick={() => setSelectedStep(stepId)}
                    style={{
                      padding: '16px',
                      backgroundColor: isSelected ? 'rgba(74, 158, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${isSelected ? '#4a9eff' : '#333333'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      backgroundColor: status === 'completed' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '6px',
                      color: status === 'completed' ? '#22c55e' : '#cccccc'
                    }}>
                      <IconComponent style={{ width: '16px', height: '16px' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '2px' }}>
                        {getStepTitle(stepId)}
                      </div>
                      <div style={{ fontSize: '12px', color: '#888888' }}>
                        {status === 'completed' ? 'Completado' : 'Pendiente'}
                      </div>
                    </div>
                    {status === 'completed' ? (
                      <CheckCircle style={{ width: '16px', height: '16px', color: '#22c55e' }} />
                    ) : (
                      <Clock style={{ width: '16px', height: '16px', color: '#888888' }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Step Content */}
            <div style={{ flex: 1 }}>
              {selectedStep ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderStepContent(selectedStep)}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: '#888888',
                  fontSize: '16px'
                }}>
                  Selecciona un paso para ver las respuestas
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
