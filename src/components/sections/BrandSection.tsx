'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Type, 
  Palette, 
  CheckCircle,
  Plus,
  Trash2,
  Upload,
  Eye
} from 'lucide-react';
import DummyContentButton from '@/components/DummyContentButton';
import { BrandData } from '@/types';

interface BrandSectionProps {
  data?: BrandData;
  onUpdate: (data: BrandData) => void;
  clientType: 'A' | 'B' | 'C';
}

export default function BrandSection({ data, onUpdate, clientType }: BrandSectionProps) {
  const [localData, setLocalData] = useState<BrandData>(data || {
    values: {
      essence: '',
      archetype: '',
      tone: '',
    },
    naming: {
      options: [],
      selected: '',
      messages: [],
    },
    visual: {
      logoConcepts: [],
      selectedLogo: '',
      colors: [],
      typography: '',
    },
    validation: {
      completed: false,
      feedback: '',
    },
  });

  const updateData = (section: keyof BrandData, value: any) => {
    const newData = { ...localData, [section]: value };
    setLocalData(newData);
    onUpdate(newData);
  };

  const addNamingOption = () => {
    const newOptions = [...localData.naming.options, ''];
    updateData('naming', { ...localData.naming, options: newOptions });
  };

  const updateNamingOption = (index: number, value: string) => {
    const newOptions = [...localData.naming.options];
    newOptions[index] = value;
    updateData('naming', { ...localData.naming, options: newOptions });
  };

  const removeNamingOption = (index: number) => {
    const newOptions = localData.naming.options.filter((_, i) => i !== index);
    updateData('naming', { ...localData.naming, options: newOptions });
  };

  const addMessage = () => {
    const newMessages = [...localData.naming.messages, ''];
    updateData('naming', { ...localData.naming, messages: newMessages });
  };

  const updateMessage = (index: number, value: string) => {
    const newMessages = [...localData.naming.messages];
    newMessages[index] = value;
    updateData('naming', { ...localData.naming, messages: newMessages });
  };

  const removeMessage = (index: number) => {
    const newMessages = localData.naming.messages.filter((_, i) => i !== index);
    updateData('naming', { ...localData.naming, messages: newMessages });
  };

  const addColor = () => {
    const newColors = [...localData.visual.colors, '#000000'];
    updateData('visual', { ...localData.visual, colors: newColors });
  };

  const updateColor = (index: number, value: string) => {
    const newColors = [...localData.visual.colors];
    newColors[index] = value;
    updateData('visual', { ...localData.visual, colors: newColors });
  };

  const removeColor = (index: number) => {
    const newColors = localData.visual.colors.filter((_, i) => i !== index);
    updateData('visual', { ...localData.visual, colors: newColors });
  };

  const addLogoConcept = () => {
    const newConcepts = [...localData.visual.logoConcepts, ''];
    updateData('visual', { ...localData.visual, logoConcepts: newConcepts });
  };

  const updateLogoConcept = (index: number, value: string) => {
    const newConcepts = [...localData.visual.logoConcepts];
    newConcepts[index] = value;
    updateData('visual', { ...localData.visual, logoConcepts: newConcepts });
  };

  const removeLogoConcept = (index: number) => {
    const newConcepts = localData.visual.logoConcepts.filter((_, i) => i !== index);
    updateData('visual', { ...localData.visual, logoConcepts: newConcepts });
  };

  const handleDummyContent = (content: any) => {
    if (content.brand) {
      setLocalData(content.brand);
      onUpdate(content.brand);
    }
  };

  const archetypes = [
    'El Creador', 'El Cuidador', 'El Explorador', 'El Héroe', 'El Inocente',
    'El Mago', 'El Rebelde', 'El Sabio', 'El Amante', 'El Gobernante',
    'El Bufón', 'El Ciudadano'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🎨 Brand</h2>
          <p className="text-gray-600">
            Define la identidad y valores de tu marca
          </p>
        </div>
        <DummyContentButton
          section="brand"
          clientType={clientType}
          onContentGenerated={handleDummyContent}
          variant="full"
        />
      </div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Heart className="w-6 h-6 text-red-500" />
          <h3 className="text-xl font-semibold">Valores / Esencia</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Esencia de la marca
            </label>
            <textarea
              placeholder="¿Cuál es la esencia de tu marca?"
              value={localData.values.essence}
              onChange={(e) => updateData('values', {
                ...localData.values,
                essence: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Arquetipo de marca
            </label>
            <select
              value={localData.values.archetype}
              onChange={(e) => updateData('values', {
                ...localData.values,
                archetype: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Seleccionar arquetipo</option>
              {archetypes.map((archetype) => (
                <option key={archetype} value={archetype}>{archetype}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tono de comunicación
            </label>
            <textarea
              placeholder="¿Cómo se comunica tu marca?"
              value={localData.values.tone}
              onChange={(e) => updateData('values', {
                ...localData.values,
                tone: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows={2}
            />
          </div>
        </div>
      </motion.div>

      {/* Naming */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Type className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-semibold">Nombre / Verbal Identity</h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Opciones de nombres</span>
              <button
                onClick={addNamingOption}
                className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            {localData.naming.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Nombre de la marca"
                  value={option}
                  onChange={(e) => updateNamingOption(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeNamingOption(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre seleccionado
            </label>
            <input
              type="text"
              placeholder="Nombre final de la marca"
              value={localData.naming.selected}
              onChange={(e) => updateData('naming', {
                ...localData.naming,
                selected: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Key Messages</span>
              <button
                onClick={addMessage}
                className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            {localData.naming.messages.map((message, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Mensaje clave"
                  value={message}
                  onChange={(e) => updateMessage(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeMessage(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Palette className="w-6 h-6 text-purple-500" />
          <h3 className="text-xl font-semibold">Logo / Sistema Visual</h3>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Conceptos de logo</span>
              <button
                onClick={addLogoConcept}
                className="flex items-center space-x-2 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            {localData.visual.logoConcepts.map((concept, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Concepto de logo"
                  value={concept}
                  onChange={(e) => updateLogoConcept(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={() => removeLogoConcept(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo seleccionado
            </label>
            <input
              type="text"
              placeholder="Concepto de logo seleccionado"
              value={localData.visual.selectedLogo}
              onChange={(e) => updateData('visual', {
                ...localData.visual,
                selectedLogo: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Paleta de colores</span>
              <button
                onClick={addColor}
                className="flex items-center space-x-2 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {localData.visual.colors.map((color, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="w-20 p-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={() => removeColor(index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipografía
            </label>
            <input
              type="text"
              placeholder="Fuentes principales"
              value={localData.visual.typography}
              onChange={(e) => updateData('visual', {
                ...localData.visual,
                typography: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
          <CheckCircle className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-semibold">Validación de Marca</h3>
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
