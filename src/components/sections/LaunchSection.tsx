'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  BarChart3, 
  FileText, 
  CheckCircle,
  Plus,
  Trash2
} from 'lucide-react';
import DummyContentButton from '@/components/DummyContentButton';
import { LaunchData } from '@/types';

interface LaunchSectionProps {
  data?: LaunchData;
  onUpdate: (data: LaunchData) => void;
  clientType: 'A' | 'B' | 'C';
}

export default function LaunchSection({ data, onUpdate, clientType }: LaunchSectionProps) {
  const [localData, setLocalData] = useState<LaunchData>(data || {
    goToMarket: {
      roadmap: [],
      coordination: '',
      plan: '',
    },
    postLaunch: {
      feedback: '',
      kpis: [],
      reports: '',
    },
    deliverables: {
      checklist: [],
      report: '',
      playbook: '',
    },
  });

  const updateData = (section: keyof LaunchData, value: any) => {
    const newData = { ...localData, [section]: value };
    setLocalData(newData);
    onUpdate(newData);
  };

  const addRoadmapItem = () => {
    const newRoadmap = [...localData.goToMarket.roadmap, ''];
    updateData('goToMarket', { ...localData.goToMarket, roadmap: newRoadmap });
  };

  const updateRoadmapItem = (index: number, value: string) => {
    const newRoadmap = [...localData.goToMarket.roadmap];
    newRoadmap[index] = value;
    updateData('goToMarket', { ...localData.goToMarket, roadmap: newRoadmap });
  };

  const removeRoadmapItem = (index: number) => {
    const newRoadmap = localData.goToMarket.roadmap.filter((_, i) => i !== index);
    updateData('goToMarket', { ...localData.goToMarket, roadmap: newRoadmap });
  };

  const addKpi = () => {
    const newKpis = [...localData.postLaunch.kpis, ''];
    updateData('postLaunch', { ...localData.postLaunch, kpis: newKpis });
  };

  const updateKpi = (index: number, value: string) => {
    const newKpis = [...localData.postLaunch.kpis];
    newKpis[index] = value;
    updateData('postLaunch', { ...localData.postLaunch, kpis: newKpis });
  };

  const removeKpi = (index: number) => {
    const newKpis = localData.postLaunch.kpis.filter((_, i) => i !== index);
    updateData('postLaunch', { ...localData.postLaunch, kpis: newKpis });
  };

  const addChecklistItem = () => {
    const newChecklist = [...localData.deliverables.checklist, ''];
    updateData('deliverables', { ...localData.deliverables, checklist: newChecklist });
  };

  const updateChecklistItem = (index: number, value: string) => {
    const newChecklist = [...localData.deliverables.checklist];
    newChecklist[index] = value;
    updateData('deliverables', { ...localData.deliverables, checklist: newChecklist });
  };

  const removeChecklistItem = (index: number) => {
    const newChecklist = localData.deliverables.checklist.filter((_, i) => i !== index);
    updateData('deliverables', { ...localData.deliverables, checklist: newChecklist });
  };

  const handleDummyContent = (content: any) => {
    if (content.launch) {
      setLocalData(content.launch);
      onUpdate(content.launch);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🚀 Launch</h2>
          <p className="text-gray-600">
            Planifica el lanzamiento y la iteración post-launch
          </p>
        </div>
        <DummyContentButton
          section="launch"
          clientType={clientType}
          onContentGenerated={handleDummyContent}
          variant="full"
        />
      </div>

      {/* Go-to-Market */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Rocket className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-semibold">Go-to-Market</h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Roadmap de Lanzamiento</span>
              <button
                onClick={addRoadmapItem}
                className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            {localData.goToMarket.roadmap.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Hito del lanzamiento"
                  value={item}
                  onChange={(e) => updateRoadmapItem(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coordinación
            </label>
            <textarea
              placeholder="Plan de coordinación entre equipos..."
              value={localData.goToMarket.coordination}
              onChange={(e) => updateData('goToMarket', {
                ...localData.goToMarket,
                coordination: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Global
            </label>
            <textarea
              placeholder="Plan global de lanzamiento..."
              value={localData.goToMarket.plan}
              onChange={(e) => updateData('goToMarket', {
                ...localData.goToMarket,
                plan: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </div>
      </motion.div>

      {/* Post-Launch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <BarChart3 className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-semibold">Post-Launch / Learning</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback
            </label>
            <textarea
              placeholder="Feedback post-lanzamiento..."
              value={localData.postLaunch.feedback}
              onChange={(e) => updateData('postLaunch', {
                ...localData.postLaunch,
                feedback: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">KPIs</span>
              <button
                onClick={addKpi}
                className="flex items-center space-x-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            {localData.postLaunch.kpis.map((kpi, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="KPI a medir"
                  value={kpi}
                  onChange={(e) => updateKpi(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={() => removeKpi(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reportes
            </label>
            <textarea
              placeholder="Estrategia de reportes..."
              value={localData.postLaunch.reports}
              onChange={(e) => updateData('postLaunch', {
                ...localData.postLaunch,
                reports: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </div>
      </motion.div>

      {/* Deliverables */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="w-6 h-6 text-purple-500" />
          <h3 className="text-xl font-semibold">Entregables de Cierre</h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Launch Checklist</span>
              <button
                onClick={addChecklistItem}
                className="flex items-center space-x-2 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            {localData.deliverables.checklist.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Item del checklist"
                  value={item}
                  onChange={(e) => updateChecklistItem(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={() => removeChecklistItem(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reporte Final
            </label>
            <textarea
              placeholder="Reporte final del proyecto..."
              value={localData.deliverables.report}
              onChange={(e) => updateData('deliverables', {
                ...localData.deliverables,
                report: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Playbook de Optimización
            </label>
            <textarea
              placeholder="Playbook para optimización continua..."
              value={localData.deliverables.playbook}
              onChange={(e) => updateData('deliverables', {
                ...localData.deliverables,
                playbook: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
