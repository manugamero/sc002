'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Megaphone, 
  Users, 
  ShoppingBag, 
  CheckCircle,
  Plus,
  Trash2
} from 'lucide-react';
import DummyContentButton from '@/components/DummyContentButton';
import { CommunicationData } from '@/types';

interface CommunicationSectionProps {
  data?: CommunicationData;
  onUpdate: (data: CommunicationData) => void;
  clientType: 'A' | 'B' | 'C';
}

export default function CommunicationSection({ data, onUpdate, clientType }: CommunicationSectionProps) {
  const [localData, setLocalData] = useState<CommunicationData>(data || {
    social: {
      avatar: '',
      bio: '',
      templates: [],
      guidelines: '',
    },
    ads: {
      heroPiece: '',
      campaigns: [],
      mediaPlan: '',
    },
    merch: {
      concepts: [],
      packaging: '',
      experience: '',
    },
    validation: {
      completed: false,
      feedback: '',
    },
  });

  const updateData = (section: keyof CommunicationData, value: any) => {
    const newData = { ...localData, [section]: value };
    setLocalData(newData);
    onUpdate(newData);
  };

  const addTemplate = () => {
    const newTemplates = [...localData.social.templates, ''];
    updateData('social', { ...localData.social, templates: newTemplates });
  };

  const updateTemplate = (index: number, value: string) => {
    const newTemplates = [...localData.social.templates];
    newTemplates[index] = value;
    updateData('social', { ...localData.social, templates: newTemplates });
  };

  const removeTemplate = (index: number) => {
    const newTemplates = localData.social.templates.filter((_, i) => i !== index);
    updateData('social', { ...localData.social, templates: newTemplates });
  };

  const addCampaign = () => {
    const newCampaigns = [...localData.ads.campaigns, ''];
    updateData('ads', { ...localData.ads, campaigns: newCampaigns });
  };

  const updateCampaign = (index: number, value: string) => {
    const newCampaigns = [...localData.ads.campaigns];
    newCampaigns[index] = value;
    updateData('ads', { ...localData.ads, campaigns: newCampaigns });
  };

  const removeCampaign = (index: number) => {
    const newCampaigns = localData.ads.campaigns.filter((_, i) => i !== index);
    updateData('ads', { ...localData.ads, campaigns: newCampaigns });
  };

  const addMerchConcept = () => {
    const newConcepts = [...localData.merch.concepts, ''];
    updateData('merch', { ...localData.merch, concepts: newConcepts });
  };

  const updateMerchConcept = (index: number, value: string) => {
    const newConcepts = [...localData.merch.concepts];
    newConcepts[index] = value;
    updateData('merch', { ...localData.merch, concepts: newConcepts });
  };

  const removeMerchConcept = (index: number) => {
    const newConcepts = localData.merch.concepts.filter((_, i) => i !== index);
    updateData('merch', { ...localData.merch, concepts: newConcepts });
  };

  const handleDummyContent = (content: any) => {
    if (content.communication) {
      setLocalData(content.communication);
      onUpdate(content.communication);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">📢 Communication</h2>
          <p className="text-gray-600">
            Define la estrategia de comunicación y marketing
          </p>
        </div>
        <DummyContentButton
          section="communication"
          clientType={clientType}
          onContentGenerated={handleDummyContent}
          variant="full"
        />
      </div>

      {/* Social */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Users className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-semibold">Social / Content</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avatar / Perfil
            </label>
            <input
              type="text"
              placeholder="Descripción del avatar de marca"
              value={localData.social.avatar}
              onChange={(e) => updateData('social', {
                ...localData.social,
                avatar: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              placeholder="Biografía de la marca"
              value={localData.social.bio}
              onChange={(e) => updateData('social', {
                ...localData.social,
                bio: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Templates</span>
              <button
                onClick={addTemplate}
                className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            {localData.social.templates.map((template, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Template de contenido"
                  value={template}
                  onChange={(e) => updateTemplate(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeTemplate(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guidelines
            </label>
            <textarea
              placeholder="Guías de comunicación..."
              value={localData.social.guidelines}
              onChange={(e) => updateData('social', {
                ...localData.social,
                guidelines: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </div>
      </motion.div>

      {/* Ads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Megaphone className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-semibold">Ads / Campañas</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pieza Hero
            </label>
            <textarea
              placeholder="Descripción de la pieza principal..."
              value={localData.ads.heroPiece}
              onChange={(e) => updateData('ads', {
                ...localData.ads,
                heroPiece: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Campañas</span>
              <button
                onClick={addCampaign}
                className="flex items-center space-x-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            {localData.ads.campaigns.map((campaign, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Campaña publicitaria"
                  value={campaign}
                  onChange={(e) => updateCampaign(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={() => removeCampaign(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Media Plan
            </label>
            <textarea
              placeholder="Plan de medios..."
              value={localData.ads.mediaPlan}
              onChange={(e) => updateData('ads', {
                ...localData.ads,
                mediaPlan: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </div>
      </motion.div>

      {/* Merch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <ShoppingBag className="w-6 h-6 text-purple-500" />
          <h3 className="text-xl font-semibold">Merch / Físico</h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Conceptos de Merch</span>
              <button
                onClick={addMerchConcept}
                className="flex items-center space-x-2 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            {localData.merch.concepts.map((concept, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Concepto de merchandising"
                  value={concept}
                  onChange={(e) => updateMerchConcept(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={() => removeMerchConcept(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Packaging
            </label>
            <textarea
              placeholder="Concepto de packaging..."
              value={localData.merch.packaging}
              onChange={(e) => updateData('merch', {
                ...localData.merch,
                packaging: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experiencia
            </label>
            <textarea
              placeholder="Experiencia de marca física..."
              value={localData.merch.experience}
              onChange={(e) => updateData('merch', {
                ...localData.merch,
                experience: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </div>
      </motion.div>

      {/* Validation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-6 h-6 text-orange-500" />
          <h3 className="text-xl font-semibold">Validación Comunicativa</h3>
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
              className="w-4 h-4 text-orange-600"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </motion.div>
    </div>
  );
}
