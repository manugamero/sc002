'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Palette, 
  Smartphone, 
  Megaphone, 
  Edit3,
  Save,
  Plus,
  Trash2,
  Check,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface FrameworkSection {
  id: string;
  title: string;
  subsections: {
    id: string;
    title: string;
    items: {
      id: string;
      title: string;
      description: string;
      deliverables: string[];
      level: 'A' | 'B' | 'C';
    }[];
  }[];
}

export default function IndexPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [expandedSubsections, setExpandedSubsections] = useState<string[]>([]);

  const [frameworkData, setFrameworkData] = useState<FrameworkSection[]>([
    {
      id: 'strategy',
      title: '1. STRATEGY',
      subsections: [
        {
          id: 'interviews-context',
          title: '1.1 Entrevistas / Contexto',
          items: [
            {
              id: 'main-context',
              title: 'A (Main): Entrevistas con founders',
              description: 'Síntesis de visión y objetivos',
              deliverables: ['Main Context Deck'],
              level: 'A'
            },
            {
              id: 'extended-context',
              title: 'B (Extended): Founders + users',
              description: 'Patrones y oportunidades',
              deliverables: ['Extended Context Deck'],
              level: 'B'
            },
            {
              id: 'system-context',
              title: 'C (System): Stakeholders interdepartamentales',
              description: 'Análisis completo del sistema',
              deliverables: ['System Context Deck'],
              level: 'C'
            }
          ]
        },
        {
          id: 'benchmark-positioning',
          title: '1.2 Benchmark & Posicionamiento',
          items: [
            {
              id: 'main-benchmark',
              title: 'A: Benchmark (3–5 competidores)',
              description: 'Insights básicos de mercado',
              deliverables: ['Main Benchmark Deck'],
              level: 'A'
            },
            {
              id: 'extended-benchmark',
              title: 'B: Benchmark (5–10 competidores)',
              description: 'Mapa de posicionamiento visual/UX + insights',
              deliverables: ['Extended Market Deck'],
              level: 'B'
            },
            {
              id: 'system-benchmark',
              title: 'C: Competidores directos/indirectos por categorías',
              description: 'Análisis global/local completo',
              deliverables: ['Market System Deck'],
              level: 'C'
            }
          ]
        },
        {
          id: 'plan-direction',
          title: '1.3 Plan / Direction',
          items: [
            {
              id: 'main-strategy',
              title: 'A: Value Proposition + prioridades MVP',
              description: 'Estrategia principal del producto',
              deliverables: ['Main Strategy Deck'],
              level: 'A'
            },
            {
              id: 'extended-strategy',
              title: 'B: Roadmap + prioridades de producto y marca',
              description: 'Planificación extendida',
              deliverables: ['Extended Strategy Deck'],
              level: 'B'
            },
            {
              id: 'system-strategy',
              title: 'C: OKRs + arquitectura de marca/producto',
              description: 'Dependencias y arquitectura completa',
              deliverables: ['Strategy System Deck'],
              level: 'C'
            }
          ]
        }
      ]
    },
    {
      id: 'brand',
      title: '2. BRAND',
      subsections: [
        {
          id: 'values-essence',
          title: '2.1 Valores / Esencia',
          items: [
            {
              id: 'main-brand',
              title: 'A: Workshop propósito y valores',
              description: 'Definición de la esencia de marca',
              deliverables: ['Main Brand Deck'],
              level: 'A'
            },
            {
              id: 'extended-brand',
              title: 'B: Taller arquetipos y tono',
              description: 'Desarrollo de personalidad de marca',
              deliverables: ['Extended Brand Deck'],
              level: 'B'
            },
            {
              id: 'system-brand',
              title: 'C: Auditoría cultural + Brand DNA Framework',
              description: 'Framework completo de marca',
              deliverables: ['Brand System Deck'],
              level: 'C'
            }
          ]
        },
        {
          id: 'naming-verbal',
          title: '2.2 Nombre / Verbal Identity + Narrativa',
          items: [
            {
              id: 'main-naming',
              title: 'A: Brainstorm (3–5 nombres)',
              description: 'Naming básico + chequeo legal',
              deliverables: ['Main Naming Deck'],
              level: 'A'
            },
            {
              id: 'extended-naming',
              title: 'B: Naming Sprint + testeo',
              description: 'Naming avanzado + key messages',
              deliverables: ['Extended Verbal Deck'],
              level: 'B'
            },
            {
              id: 'system-naming',
              title: 'C: Naming System + manual verbal',
              description: 'Sistema completo de identidad verbal',
              deliverables: ['Verbal System Deck'],
              level: 'C'
            }
          ]
        },
        {
          id: 'logo-visual',
          title: '2.3 Logo / Sistema Visual',
          items: [
            {
              id: 'main-visual',
              title: 'A: 1–2 propuestas + paleta + tipografía',
              description: 'Identidad visual básica',
              deliverables: ['Main Visual Deck'],
              level: 'A'
            },
            {
              id: 'extended-visual',
              title: 'B: 3–4 líneas de diseño + social test',
              description: 'Desarrollo visual extendido',
              deliverables: ['Extended Visual Deck'],
              level: 'B'
            },
            {
              id: 'system-visual',
              title: 'C: Sistema modular completo',
              description: 'Sistema visual completo',
              deliverables: ['Visual System Deck'],
              level: 'C'
            }
          ]
        }
      ]
    },
    {
      id: 'product',
      title: '3. PRODUCT',
      subsections: [
        {
          id: 'features-navigation',
          title: '3.1 Features & Navigation',
          items: [
            {
              id: 'main-product',
              title: 'A: MVP + user flow principal',
              description: 'Producto mínimo viable',
              deliverables: ['Main Product Deck'],
              level: 'A'
            },
            {
              id: 'extended-product',
              title: 'B: Journeys + mockups intermedios',
              description: 'Desarrollo de experiencia extendida',
              deliverables: ['Extended Product Deck'],
              level: 'B'
            },
            {
              id: 'system-product',
              title: 'C: Arquitectura multi-producto + UX research',
              description: 'Arquitectura completa del producto',
              deliverables: ['Product System Deck'],
              level: 'C'
            }
          ]
        },
        {
          id: 'iteration-prototype',
          title: '3.2 Iteration & Prototype',
          items: [
            {
              id: 'main-prototype',
              title: 'A: Prototipo funcional',
              description: 'Prototipo básico funcional',
              deliverables: ['Main Prototype Deck'],
              level: 'A'
            },
            {
              id: 'extended-prototype',
              title: 'B: Prototipo interactivo + test usuarios',
              description: 'Prototipo avanzado con testing',
              deliverables: ['Extended Prototype Deck'],
              level: 'B'
            },
            {
              id: 'system-prototype',
              title: 'C: Multi-device + handoff doc',
              description: 'Prototipo completo multi-dispositivo',
              deliverables: ['Prototype System Deck'],
              level: 'C'
            }
          ]
        },
        {
          id: 'shipping',
          title: '3.3 Shipping',
          items: [
            {
              id: 'main-shipping',
              title: 'A: Iteración post-lanzamiento',
              description: 'Mejoras post-lanzamiento',
              deliverables: ['Main Shipping Deck'],
              level: 'A'
            },
            {
              id: 'extended-shipping',
              title: 'B: A/B testing + versión final',
              description: 'Optimización con testing',
              deliverables: ['Extended Shipping Deck'],
              level: 'B'
            },
            {
              id: 'system-shipping',
              title: 'C: QA + soft launch + rollout plan',
              description: 'Plan completo de lanzamiento',
              deliverables: ['Shipping System Deck'],
              level: 'C'
            }
          ]
        }
      ]
    },
    {
      id: 'communication',
      title: '4. COMMUNICATION',
      subsections: [
        {
          id: 'social-content',
          title: '4.1 Social / Content',
          items: [
            {
              id: 'main-social',
              title: 'A: Avatar + bio + templates básicos',
              description: 'Presencia social básica',
              deliverables: ['Main Social Deck'],
              level: 'A'
            },
            {
              id: 'extended-social',
              title: 'B: Sistema visual multi-formato + templates base',
              description: 'Sistema de contenido extendido',
              deliverables: ['Extended Social Deck'],
              level: 'B'
            },
            {
              id: 'system-social',
              title: 'C: Plan por canal + manual de voz + calendario',
              description: 'Estrategia de comunicación completa',
              deliverables: ['Social System Deck'],
              level: 'C'
            }
          ]
        },
        {
          id: 'ads-campaigns',
          title: '4.2 Ads / Campaigns',
          items: [
            {
              id: 'main-campaign',
              title: 'A: 1 pieza Key',
              description: 'Campaña principal básica',
              deliverables: ['Main Campaign Deck'],
              level: 'A'
            },
            {
              id: 'extended-campaign',
              title: 'B: Campaña principal',
              description: 'Campaña principal completa',
              deliverables: ['Extended Campaign Deck'],
              level: 'B'
            },
            {
              id: 'system-campaign',
              title: 'C: Campaña principal + derivadas futuras',
              description: 'Sistema de campañas completo',
              deliverables: ['Campaign System Deck'],
              level: 'C'
            }
          ]
        },
        {
          id: 'merch-physical',
          title: '4.3 Merch / Físico',
          items: [
            {
              id: 'main-merch',
              title: 'A: Elementos Main (stickers, tote)',
              description: 'Merchandising básico',
              deliverables: ['Main Merch Deck'],
              level: 'A'
            },
            {
              id: 'extended-merch',
              title: 'B: Drop limitado / colaborativo',
              description: 'Merchandising extendido',
              deliverables: ['Extended Merch Deck'],
              level: 'B'
            },
            {
              id: 'system-merch',
              title: 'C: Merch + packaging + retail system',
              description: 'Sistema completo de merchandising',
              deliverables: ['Merch System Deck'],
              level: 'C'
            }
          ]
        }
      ]
    }
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleSubsection = (subsectionId: string) => {
    setExpandedSubsections(prev => 
      prev.includes(subsectionId) 
        ? prev.filter(id => id !== subsectionId)
        : [...prev, subsectionId]
    );
  };

  const updateItem = (sectionId: string, subsectionId: string, itemId: string, field: string, value: string) => {
    if (!isEditing) return;
    
    setFrameworkData(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          subsections: section.subsections.map(subsection => {
            if (subsection.id === subsectionId) {
              return {
                ...subsection,
                items: subsection.items.map(item => {
                  if (item.id === itemId) {
                    return { ...item, [field]: value };
                  }
                  return item;
                })
              };
            }
            return subsection;
          })
        };
      }
      return section;
    }));
  };

  const getLevelColor = (level: 'A' | 'B' | 'C') => {
    switch (level) {
      case 'A': return 'bg-green-100 text-green-800 border-green-300';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'C': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🧭 Studio Framework</h1>
              <p className="text-gray-600 mt-1">Editor de Framework - Estructura Completa</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isEditing 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span>{isEditing ? 'Guardar' : 'Editar'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Framework Structure */}
        <div className="space-y-6">
          {frameworkData.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Section Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  {expandedSections.includes(section.id) ? (
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-gray-500" />
                  )}
          </div>
        </div>

              {/* Subsections */}
              {expandedSections.includes(section.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t"
                >
                    {section.subsections.map((subsection) => (
                      <div key={subsection.id} className="border-b last:border-b-0">
                        <div 
                          className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => toggleSubsection(subsection.id)}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">{subsection.title}</h3>
                            {expandedSubsections.includes(subsection.id) ? (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>

                        {/* Items */}
                        {expandedSubsections.includes(subsection.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-gray-50"
                          >
                              {subsection.items.map((item) => (
                                <div key={item.id} className="p-4 border-b last:border-b-0">
                                  <div className="flex items-start space-x-4">
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(item.level)}`}>
                                      {item.level}
                </div>
                      <div className="flex-1">
                        {isEditing ? (
                                        <div className="space-y-3">
                          <input
                            type="text"
                                            value={item.title}
                                            onChange={(e) => updateItem(section.id, subsection.id, item.id, 'title', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                                          <textarea
                                            value={item.description}
                                            onChange={(e) => updateItem(section.id, subsection.id, item.id, 'description', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            rows={2}
                                          />
                                          <div className="flex flex-wrap gap-2">
                                            {item.deliverables.map((deliverable, index) => (
                                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                                {deliverable}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      ) : (
                                        <div>
                                          <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                                          <p className="text-gray-600 mb-3">{item.description}</p>
                                          <div className="flex flex-wrap gap-2">
                                            {item.deliverables.map((deliverable, index) => (
                                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                                {deliverable}
                                              </span>
                                            ))}
                                          </div>
                          </div>
                        )}
                      </div>
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                    </div>
                  ))}
                  </motion.div>
                )}
              </motion.div>
          ))}
        </div>

        {/* Export Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              const dataStr = JSON.stringify(frameworkData, null, 2);
              const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
              const linkElement = document.createElement('a');
              linkElement.setAttribute('href', dataUri);
              linkElement.setAttribute('download', 'studio-framework-structure.json');
              linkElement.click();
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            📖 Exportar Estructura del Framework
          </button>
        </div>
      </div>
    </div>
  );
}