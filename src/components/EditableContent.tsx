'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, X, Eye, EyeOff } from 'lucide-react';

interface EditableContentProps {
  initialContent: string;
  onSave: (content: string) => void;
  placeholder?: string;
  className?: string;
  multiline?: boolean;
}

export default function EditableContent({ 
  initialContent, 
  onSave, 
  placeholder = "Click to edit...",
  className = "",
  multiline = false
}: EditableContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSave = () => {
    onSave(content);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(initialContent);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isPreview) {
    return (
      <div className={`relative group ${className}`}>
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="whitespace-pre-wrap text-gray-700">
            {content || placeholder}
          </div>
        </div>
        <button
          onClick={() => setIsPreview(false)}
          className="absolute top-2 right-2 p-1 bg-blue-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <EyeOff className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative ${className}`}
      >
        {multiline ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full p-3 border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full p-3 border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
        )}
        
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center space-x-1 px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`relative group cursor-pointer ${className}`} onClick={() => setIsEditing(true)}>
      <div className="p-4 border-2 border-transparent hover:border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
        <div className="whitespace-pre-wrap text-gray-700">
          {content || placeholder}
        </div>
      </div>
      
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPreview(true);
          }}
          className="p-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
