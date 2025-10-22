'use client';

import { useState } from 'react';
import { ProjectData } from '@/types';
import { generateDummyProjectData } from '@/lib/dummyData';

interface SectionData {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  content: any;
}

export default function SimplePage() {
  const [projectData, setProjectData] = useState<ProjectData>(() => {
    const dummyData = generateDummyProjectData('B') as ProjectData;
    return dummyData;
  });

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['strategy']));

  const sections: SectionData[] = [
    {
      id: 'strategy',
      title: 'Estrategia',
      description: 'Análisis de mercado, competencia y planificación estratégica',
      completed: projectData.progress.strategy > 0,
      content: projectData.strategy
    },
    {
      id: 'brand',
      title: 'Marca',
      description: 'Identidad visual, naming y valores de marca',
      completed: projectData.progress.brand > 0,
      content: projectData.brand
    },
    {
      id: 'product',
      title: 'Producto',
      description: 'Desarrollo de características y prototipado',
      completed: projectData.progress.product > 0,
      content: projectData.product
    },
    {
      id: 'communication',
      title: 'Comunicación',
      description: 'Estrategia de comunicación y marketing',
      completed: projectData.progress.communication > 0,
      content: projectData.communication
    },
    {
      id: 'launch',
      title: 'Lanzamiento',
      description: 'Plan de lanzamiento y post-lanzamiento',
      completed: projectData.progress.launch > 0,
      content: projectData.launch
    }
  ];

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const updateProgress = (sectionId: string, progress: number) => {
    setProjectData(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        [sectionId]: progress
      }
    }));
  };

  const renderStrategyContent = (strategy: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Entrevistas</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked={strategy.interviews.founders} className="mr-2" />
              Fundadores
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked={strategy.interviews.users} className="mr-2" />
              Usuarios
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked={strategy.interviews.stakeholders} className="mr-2" />
              Stakeholders
            </label>
          </div>
          <textarea 
            defaultValue={strategy.interviews.notes}
            className="w-full mt-3 p-2 border rounded"
            rows={3}
            placeholder="Notas de las entrevistas..."
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Benchmark</h4>
          <div className="space-y-2">
            {strategy.benchmark.competitors.map((competitor: any, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <input 
                  type="text" 
                  defaultValue={competitor.name}
                  className="flex-1 p-1 border rounded text-sm"
                />
                <input 
                  type="url" 
                  defaultValue={competitor.url}
                  className="flex-1 p-1 border rounded text-sm"
                />
              </div>
            ))}
          </div>
          <textarea 
            defaultValue={strategy.benchmark.matrix}
            className="w-full mt-3 p-2 border rounded"
            rows={2}
            placeholder="Matriz de análisis..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Mercado</h4>
          <textarea 
            defaultValue={strategy.market.insights}
            className="w-full p-2 border rounded mb-3"
            rows={2}
            placeholder="Insights del mercado..."
          />
          <div className="space-y-2">
            {strategy.market.opportunities.map((opportunity: string, index: number) => (
              <input 
                key={index}
                type="text" 
                defaultValue={opportunity}
                className="w-full p-1 border rounded text-sm"
              />
            ))}
          </div>
          <input 
            type="text" 
            defaultValue={strategy.market.positioning}
            className="w-full mt-3 p-2 border rounded"
            placeholder="Posicionamiento..."
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Plan</h4>
          <textarea 
            defaultValue={strategy.plan.vision}
            className="w-full p-2 border rounded mb-3"
            rows={2}
            placeholder="Visión..."
          />
          <textarea 
            defaultValue={strategy.plan.valueProp}
            className="w-full p-2 border rounded mb-3"
            rows={2}
            placeholder="Value Proposition..."
          />
          <div className="space-y-2">
            {strategy.plan.roadmap.map((item: string, index: number) => (
              <input 
                key={index}
                type="text" 
                defaultValue={item}
                className="w-full p-1 border rounded text-sm"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Validación</h4>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked={strategy.validation.completed} className="mr-2" />
            Completada
          </label>
        </div>
        <textarea 
          defaultValue={strategy.validation.feedback}
          className="w-full mt-3 p-2 border rounded"
          rows={2}
          placeholder="Feedback de validación..."
        />
      </div>
    </div>
  );

  const renderBrandContent = (brand: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Valores</h4>
          <input 
            type="text" 
            defaultValue={brand.values.essence}
            className="w-full p-2 border rounded mb-3"
            placeholder="Esencia de la marca..."
          />
          <input 
            type="text" 
            defaultValue={brand.values.archetype}
            className="w-full p-2 border rounded mb-3"
            placeholder="Arquetipo..."
          />
          <input 
            type="text" 
            defaultValue={brand.values.tone}
            className="w-full p-2 border rounded"
            placeholder="Tono de voz..."
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Naming</h4>
          <div className="space-y-2 mb-3">
            {brand.naming.options.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="naming" 
                  defaultChecked={option === brand.naming.selected}
                  className="mr-2"
                />
                <input 
                  type="text" 
                  defaultValue={option}
                  className="flex-1 p-1 border rounded text-sm"
                />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {brand.naming.messages.map((message: string, index: number) => (
              <input 
                key={index}
                type="text" 
                defaultValue={message}
                className="w-full p-1 border rounded text-sm"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Visual</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Conceptos de Logo</label>
            <div className="space-y-2">
              {brand.visual.logoConcepts.map((concept: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="logo" 
                    defaultChecked={concept === brand.visual.selectedLogo}
                    className="mr-2"
                  />
                  <input 
                    type="text" 
                    defaultValue={concept}
                    className="flex-1 p-1 border rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Colores</label>
            <div className="space-y-2">
              {brand.visual.colors.map((color: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    defaultValue={color}
                    className="w-8 h-8 border rounded"
                  />
                  <input 
                    type="text" 
                    defaultValue={color}
                    className="flex-1 p-1 border rounded text-sm"
                  />
                </div>
              ))}
            </div>
            <input 
              type="text" 
              defaultValue={brand.visual.typography}
              className="w-full mt-3 p-2 border rounded"
              placeholder="Tipografía..."
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Validación</h4>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked={brand.validation.completed} className="mr-2" />
            Completada
          </label>
        </div>
        <textarea 
          defaultValue={brand.validation.feedback}
          className="w-full mt-3 p-2 border rounded"
          rows={2}
          placeholder="Feedback de validación..."
        />
      </div>
    </div>
  );

  const renderProductContent = (product: any) => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Características</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">MVP</label>
            <div className="space-y-2">
              {product.features.mvp.map((feature: string, index: number) => (
                <input 
                  key={index}
                  type="text" 
                  defaultValue={feature}
                  className="w-full p-1 border rounded text-sm"
                />
              ))}
            </div>
          </div>
          <input 
            type="text" 
            defaultValue={product.features.navigation}
            className="w-full p-2 border rounded"
            placeholder="Navegación..."
          />
          <textarea 
            defaultValue={product.features.architecture}
            className="w-full p-2 border rounded"
            rows={2}
            placeholder="Arquitectura..."
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Prototipo</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked={product.prototype.functional} className="mr-2" />
              Funcional
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked={product.prototype.interactive} className="mr-2" />
              Interactivo
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked={product.prototype.multiDevice} className="mr-2" />
              Multi-dispositivo
            </label>
          </div>
          <textarea 
            defaultValue={product.prototype.notes}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Notas del prototipo..."
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Validación</h4>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked={product.validation.completed} className="mr-2" />
            Completada
          </label>
        </div>
        <textarea 
          defaultValue={product.validation.feedback}
          className="w-full mt-3 p-2 border rounded"
          rows={2}
          placeholder="Feedback de validación..."
        />
      </div>
    </div>
  );

  const renderCommunicationContent = (communication: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Redes Sociales</h4>
          <input 
            type="text" 
            defaultValue={communication.social.avatar}
            className="w-full p-2 border rounded mb-3"
            placeholder="Avatar..."
          />
          <textarea 
            defaultValue={communication.social.bio}
            className="w-full p-2 border rounded mb-3"
            rows={2}
            placeholder="Bio..."
          />
          <div className="space-y-2">
            {communication.social.templates.map((template: string, index: number) => (
              <input 
                key={index}
                type="text" 
                defaultValue={template}
                className="w-full p-1 border rounded text-sm"
              />
            ))}
          </div>
          <textarea 
            defaultValue={communication.social.guidelines}
            className="w-full mt-3 p-2 border rounded"
            rows={2}
            placeholder="Guías..."
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Publicidad</h4>
          <input 
            type="text" 
            defaultValue={communication.ads.heroPiece}
            className="w-full p-2 border rounded mb-3"
            placeholder="Hero Piece..."
          />
          <div className="space-y-2 mb-3">
            {communication.ads.campaigns.map((campaign: string, index: number) => (
              <input 
                key={index}
                type="text" 
                defaultValue={campaign}
                className="w-full p-1 border rounded text-sm"
              />
            ))}
          </div>
          <textarea 
            defaultValue={communication.ads.mediaPlan}
            className="w-full p-2 border rounded"
            rows={2}
            placeholder="Plan de medios..."
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Merchandising</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Conceptos</label>
            <div className="space-y-2">
              {communication.merch.concepts.map((concept: string, index: number) => (
                <input 
                  key={index}
                  type="text" 
                  defaultValue={concept}
                  className="w-full p-1 border rounded text-sm"
                />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <input 
              type="text" 
              defaultValue={communication.merch.packaging}
              className="w-full p-2 border rounded"
              placeholder="Packaging..."
            />
            <textarea 
              defaultValue={communication.merch.experience}
              className="w-full p-2 border rounded"
              rows={2}
              placeholder="Experiencia..."
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Validación</h4>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked={communication.validation.completed} className="mr-2" />
            Completada
          </label>
        </div>
        <textarea 
          defaultValue={communication.validation.feedback}
          className="w-full mt-3 p-2 border rounded"
          rows={2}
          placeholder="Feedback de validación..."
        />
      </div>
    </div>
  );

  const renderLaunchContent = (launch: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Go-to-Market</h4>
          <div className="space-y-2 mb-3">
            {launch.goToMarket.roadmap.map((item: string, index: number) => (
              <input 
                key={index}
                type="text" 
                defaultValue={item}
                className="w-full p-1 border rounded text-sm"
              />
            ))}
          </div>
          <textarea 
            defaultValue={launch.goToMarket.coordination}
            className="w-full p-2 border rounded mb-3"
            rows={2}
            placeholder="Coordinación..."
          />
          <textarea 
            defaultValue={launch.goToMarket.plan}
            className="w-full p-2 border rounded"
            rows={2}
            placeholder="Plan..."
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Post-Lanzamiento</h4>
          <textarea 
            defaultValue={launch.postLaunch.feedback}
            className="w-full p-2 border rounded mb-3"
            rows={2}
            placeholder="Feedback..."
          />
          <div className="space-y-2 mb-3">
            {launch.postLaunch.kpis.map((kpi: string, index: number) => (
              <input 
                key={index}
                type="text" 
                defaultValue={kpi}
                className="w-full p-1 border rounded text-sm"
              />
            ))}
          </div>
          <textarea 
            defaultValue={launch.postLaunch.reports}
            className="w-full p-2 border rounded"
            rows={2}
            placeholder="Reportes..."
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Entregables</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">Checklist</label>
            <div className="space-y-2">
              {launch.deliverables.checklist.map((item: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <input type="checkbox" className="mr-2" />
                  <input 
                    type="text" 
                    defaultValue={item}
                    className="flex-1 p-1 border rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          <textarea 
            defaultValue={launch.deliverables.report}
            className="w-full p-2 border rounded mb-3"
            rows={2}
            placeholder="Reporte..."
          />
          <textarea 
            defaultValue={launch.deliverables.playbook}
            className="w-full p-2 border rounded"
            rows={2}
            placeholder="Playbook..."
          />
        </div>
      </div>
    </div>
  );

  const renderSectionContent = (section: SectionData) => {
    switch (section.id) {
      case 'strategy':
        return renderStrategyContent(section.content);
      case 'brand':
        return renderBrandContent(section.content);
      case 'product':
        return renderProductContent(section.content);
      case 'communication':
        return renderCommunicationContent(section.content);
      case 'launch':
        return renderLaunchContent(section.content);
      default:
        return <div>Contenido no disponible</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Studio Framework - Vista Simple</h1>
            <p className="text-gray-600 mt-2">Gestión de proyecto en formato documentación</p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {sections.map((section) => (
                <div key={section.id} className="border border-gray-200 rounded-lg">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${section.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <div>
                          <h3 className="font-semibold text-gray-900">{section.title}</h3>
                          <p className="text-sm text-gray-600">{section.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {Math.round(projectData.progress[section.id as keyof typeof projectData.progress] * 100)}%
                        </span>
                        <svg 
                          className={`w-5 h-5 transform transition-transform ${expandedSections.has(section.id) ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {expandedSections.has(section.id) && (
                    <div className="px-4 pb-4 border-t border-gray-200">
                      <div className="pt-4">
                        {renderSectionContent(section)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
