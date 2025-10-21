'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Code, 
  CheckCircle,
  Plus,
  Trash2,
  Play,
  Monitor
} from 'lucide-react';
import DummyContentButton from '@/components/DummyContentButton';
import VideoPlayer from '@/components/VideoPlayer';
import { getVideoForSection, videoExists } from '@/lib/videoMapping';
import { ProductData } from '@/types';

interface ProductSectionProps {
  data?: ProductData;
  onUpdate: (data: ProductData) => void;
  clientType: 'A' | 'B' | 'C';
}

export default function ProductSection({ data, onUpdate, clientType }: ProductSectionProps) {
  const [localData, setLocalData] = useState<ProductData>(data || {
    features: {
      mvp: [],
      navigation: '',
      architecture: '',
    },
    prototype: {
      functional: false,
      interactive: false,
      multiDevice: false,
      notes: '',
    },
    validation: {
      completed: false,
      feedback: '',
    },
  });

  const updateData = (section: keyof ProductData, value: any) => {
    const newData = { ...localData, [section]: value };
    setLocalData(newData);
    onUpdate(newData);
  };

  const addMvpFeature = () => {
    const newFeatures = [...localData.features.mvp, ''];
    updateData('features', { ...localData.features, mvp: newFeatures });
  };

  const updateMvpFeature = (index: number, value: string) => {
    const newFeatures = [...localData.features.mvp];
    newFeatures[index] = value;
    updateData('features', { ...localData.features, mvp: newFeatures });
  };

  const removeMvpFeature = (index: number) => {
    const newFeatures = localData.features.mvp.filter((_, i) => i !== index);
    updateData('features', { ...localData.features, mvp: newFeatures });
  };

  const handleDummyContent = (content: any) => {
    if (content.product) {
      setLocalData(content.product);
      onUpdate(content.product);
    }
  };

  // Obtener el video de portada para Product
  const coverVideo = getVideoForSection('product');
  const hasCoverVideo = videoExists(coverVideo);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">📱 Product</h2>
          <p className="text-gray-600">
            Define las características y funcionalidades del producto
          </p>
        </div>
        <DummyContentButton
          section="product"
          clientType={clientType}
          onContentGenerated={handleDummyContent}
          variant="full"
        />
      </div>

      {/* Video de portada del capítulo */}
      {hasCoverVideo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">03</span>
            </div>
            <h3 className="text-xl font-semibold">Introducción a Product</h3>
          </div>
          <VideoPlayer
            videoPath={coverVideo}
            className="w-full h-64 rounded-lg"
          />
        </motion.div>
      )}

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Smartphone className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-semibold">Features & Navigation</h3>
        </div>
        
        {/* Video de subsección */}
        {(() => {
          const sectionVideo = getVideoForSection('product', 'features');
          const hasSectionVideo = videoExists(sectionVideo);
          
          return hasSectionVideo ? (
            <div className="mb-6">
              <VideoPlayer
                videoPath={sectionVideo}
                className="w-full h-48 rounded-lg"
              />
            </div>
          ) : null;
        })()}
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">MVP Features</span>
              <button
                onClick={addMvpFeature}
                className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            {localData.features.mvp.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Característica del MVP"
                  value={feature}
                  onChange={(e) => updateMvpFeature(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeMvpFeature(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Navegación
            </label>
            <textarea
              placeholder="Describe la estructura de navegación..."
              value={localData.features.navigation}
              onChange={(e) => updateData('features', {
                ...localData.features,
                navigation: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Arquitectura
            </label>
            <textarea
              placeholder="Describe la arquitectura del producto..."
              value={localData.features.architecture}
              onChange={(e) => updateData('features', {
                ...localData.features,
                architecture: e.target.value,
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </div>
      </motion.div>

      {/* Prototype */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Code className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-semibold">Iteration & Prototype</h3>
        </div>
        
        {/* Video de subsección */}
        {(() => {
          const sectionVideo = getVideoForSection('product', 'prototype');
          const hasSectionVideo = videoExists(sectionVideo);
          
          return hasSectionVideo ? (
            <div className="mb-6">
              <VideoPlayer
                videoPath={sectionVideo}
                className="w-full h-48 rounded-lg"
              />
            </div>
          ) : null;
        })()}
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={localData.prototype.functional}
                onChange={(e) => updateData('prototype', {
                  ...localData.prototype,
                  functional: e.target.checked,
                })}
                className="w-4 h-4 text-green-600"
              />
              <div className="flex items-center space-x-1">
                <Play className="w-4 h-4" />
                <span className="text-sm">Prototipo funcional</span>
              </div>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={localData.prototype.interactive}
                onChange={(e) => updateData('prototype', {
                  ...localData.prototype,
                  interactive: e.target.checked,
                })}
                className="w-4 h-4 text-green-600"
              />
              <div className="flex items-center space-x-1">
                <Smartphone className="w-4 h-4" />
                <span className="text-sm">Interactivo</span>
              </div>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={localData.prototype.multiDevice}
                onChange={(e) => updateData('prototype', {
                  ...localData.prototype,
                  multiDevice: e.target.checked,
                })}
                className="w-4 h-4 text-green-600"
              />
              <div className="flex items-center space-x-1">
                <Monitor className="w-4 h-4" />
                <span className="text-sm">Multi-device</span>
              </div>
            </label>
          </div>
          
          <textarea
            placeholder="Notas sobre el prototipo..."
            value={localData.prototype.notes}
            onChange={(e) => updateData('prototype', {
              ...localData.prototype,
              notes: e.target.value,
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </motion.div>

      {/* Validation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-6 h-6 text-purple-500" />
          <h3 className="text-xl font-semibold">Validate & Ship</h3>
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
              className="w-4 h-4 text-purple-600"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </motion.div>
    </div>
  );
}
