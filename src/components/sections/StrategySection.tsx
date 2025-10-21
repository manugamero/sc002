'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  TrendingUp, 
  Target, 
  CheckCircle,
  Plus,
  Trash2,
  ExternalLink
} from 'lucide-react';
import DummyContentButton from '@/components/DummyContentButton';
import { StrategyData } from '@/types';

interface StrategySectionProps {
  data?: StrategyData;
  onUpdate: (data: StrategyData) => void;
  clientType: 'A' | 'B' | 'C';
}

export default function StrategySection({ data, onUpdate, clientType }: StrategySectionProps) {
  const [localData, setLocalData] = useState<StrategyData>(data || {
    interviews: {
      founders: false,
      users: false,
      stakeholders: false,
      notes: '',
    },
    benchmark: {
      competitors: [],
      matrix: '',
    },
    market: {
      insights: '',
      opportunities: [],
      positioning: '',
    },
    plan: {
      vision: '',
      valueProp: '',
      roadmap: [],
    },
    validation: {
      completed: false,
      feedback: '',
    },
  });

  const updateData = (section: keyof StrategyData, value: any) => {
    const newData = { ...localData, [section]: value };
    setLocalData(newData);
    onUpdate(newData);
  };

  const addCompetitor = () => {
    const newCompetitors = [...localData.benchmark.competitors, {
      name: '',
      url: '',
      insights: '',
    }];
    updateData('benchmark', { ...localData.benchmark, competitors: newCompetitors });
  };

  const updateCompetitor = (index: number, field: string, value: string) => {
    const newCompetitors = [...localData.benchmark.competitors];
    newCompetitors[index] = { ...newCompetitors[index], [field]: value };
    updateData('benchmark', { ...localData.benchmark, competitors: newCompetitors });
  };

  const removeCompetitor = (index: number) => {
    const newCompetitors = localData.benchmark.competitors.filter((_, i) => i !== index);
    updateData('benchmark', { ...localData.benchmark, competitors: newCompetitors });
  };

  const addOpportunity = () => {
    const newOpportunities = [...localData.market.opportunities, ''];
    updateData('market', { ...localData.market, opportunities: newOpportunities });
  };

  const updateOpportunity = (index: number, value: string) => {
    const newOpportunities = [...localData.market.opportunities];
    newOpportunities[index] = value;
    updateData('market', { ...localData.market, opportunities: newOpportunities });
  };

  const removeOpportunity = (index: number) => {
    const newOpportunities = localData.market.opportunities.filter((_, i) => i !== index);
    updateData('market', { ...localData.market, opportunities: newOpportunities });
  };

  const addRoadmapItem = () => {
    const newRoadmap = [...localData.plan.roadmap, ''];
    updateData('plan', { ...localData.plan, roadmap: newRoadmap });
  };

  const updateRoadmapItem = (index: number, value: string) => {
    const newRoadmap = [...localData.plan.roadmap];
    newRoadmap[index] = value;
    updateData('plan', { ...localData.plan, roadmap: newRoadmap });
  };

  const removeRoadmapItem = (index: number) => {
    const newRoadmap = localData.plan.roadmap.filter((_, i) => i !== index);
    updateData('plan', { ...localData.plan, roadmap: newRoadmap });
  };

  const handleDummyContent = (content: any) => {
    if (content.strategy) {
      setLocalData(content.strategy);
      onUpdate(content.strategy);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 Strategy</h2>
          <p className="text-gray-600">
            Define la estrategia base de tu proyecto
          </p>
        </div>
        <DummyContentButton
          section="strategy"
          clientType={clientType}
          onContentGenerated={handleDummyContent}
          variant="full"
        />
      </div>

      {/* Interviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Users className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-semibold">Entrevistas / Contexto</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={localData.interviews.founders}
                onChange={(e) => updateData('interviews', {
                  ...localData.interviews,
                  founders: e.target.checked,
                })}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">
                {clientType === 'A' ? 'Fundadores' : 
                 clientType === 'B' ? 'Fundadores + Usuarios' : 
                 'Stakeholders'}
              </span>
            </label>
            
            {clientType !== 'A' && (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localData.interviews.users}
                  onChange={(e) => updateData('interviews', {
                    ...localData.interviews,
                    users: e.target.checked,
                  })}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm">Usuarios</span>
              </label>
            )}
            
            {clientType === 'C' && (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localData.interviews.stakeholders}
                  onChange={(e) => updateData('interviews', {
                    ...localData.interviews,
                    stakeholders: e.target.checked,
                  })}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm">Stakeholders</span>
              </label>
            )}
          </div>
          
          <textarea
            placeholder="Notas de las entrevistas..."
            value={localData.interviews.notes}
            onChange={(e) => updateData('interviews', {
              ...localData.interviews,
              notes: e.target.value,
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </motion.div>

      {/* Benchmark */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Search className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-semibold">Benchmark / Competencia</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {clientType === 'A' ? '3-5 competidores' : 
               clientType === 'B' ? '5-10 competidores' : 
               'Por categorías - análisis completo'}
            </span>
            <button
              onClick={addCompetitor}
              className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar</span>
            </button>
          </div>
          
          {localData.benchmark.competitors.map((competitor, index) => (
            <div key={index} className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-4">
                <input
                  type="text"
                  placeholder="Nombre del competidor"
                  value={competitor.name}
                  onChange={(e) => updateCompetitor(index, 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-3">
                <input
                  type="url"
                  placeholder="URL"
                  value={competitor.url}
                  onChange={(e) => updateCompetitor(index, 'url', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-4">
                <input
                  type="text"
                  placeholder="Insights"
                  value={competitor.insights}
                  onChange={(e) => updateCompetitor(index, 'insights', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-1">
                <button
                  onClick={() => removeCompetitor(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          <textarea
            placeholder="Matriz de análisis..."
            value={localData.benchmark.matrix}
            onChange={(e) => updateData('benchmark', {
              ...localData.benchmark,
              matrix: e.target.value,
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </motion.div>

      {/* Market */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-6 h-6 text-purple-500" />
          <h3 className="text-xl font-semibold">Mercado / Posicionamiento</h3>
        </div>
        
        <div className="space-y-4">
          <textarea
            placeholder="Insights del mercado..."
            value={localData.market.insights}
            onChange={(e) => updateData('market', {
              ...localData.market,
              insights: e.target.value,
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={3}
          />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Oportunidades</span>
              <button
                onClick={addOpportunity}
                className="flex items-center space-x-2 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            {localData.market.opportunities.map((opportunity, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Oportunidad de mercado"
                  value={opportunity}
                  onChange={(e) => updateOpportunity(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={() => removeOpportunity(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <textarea
            placeholder="Posicionamiento..."
            value={localData.market.positioning}
            onChange={(e) => updateData('market', {
              ...localData.market,
              positioning: e.target.value,
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={2}
          />
        </div>
      </motion.div>

      {/* Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-6 h-6 text-orange-500" />
          <h3 className="text-xl font-semibold">Plan / Direction</h3>
        </div>
        
        <div className="space-y-4">
          <textarea
            placeholder="Visión del proyecto..."
            value={localData.plan.vision}
            onChange={(e) => updateData('plan', {
              ...localData.plan,
              vision: e.target.value,
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            rows={2}
          />
          
          <textarea
            placeholder="Value Proposition..."
            value={localData.plan.valueProp}
            onChange={(e) => updateData('plan', {
              ...localData.plan,
              valueProp: e.target.value,
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            rows={2}
          />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Roadmap</span>
              <button
                onClick={addRoadmapItem}
                className="flex items-center space-x-2 px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            {localData.plan.roadmap.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Hito del roadmap"
                  value={item}
                  onChange={(e) => updateRoadmapItem(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={() => removeRoadmapItem(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Validation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-semibold">Validación Estratégica</h3>
        </div>
        
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={localData.validation.completed}
              onChange={(e) => updateData('validation', {
                ...localData.validation,
                completed: e.target.checked,
              })}
              className="w-4 h-4 text-green-600"
            />
            <span>Validación completada</span>
          </label>
          
          <textarea
            placeholder="Feedback de validación..."
            value={localData.validation.feedback}
            onChange={(e) => updateData('validation', {
              ...localData.validation,
              feedback: e.target.value,
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </motion.div>
    </div>
  );
}
