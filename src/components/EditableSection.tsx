'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, Edit3 } from 'lucide-react';
import EditableContent from './EditableContent';

interface EditableItem {
  id: string;
  content: string;
}

interface EditableSectionProps {
  title: string;
  items: EditableItem[];
  onUpdate: (items: EditableItem[]) => void;
  placeholder?: string;
  multiline?: boolean;
}

export default function EditableSection({ 
  title, 
  items, 
  onUpdate, 
  placeholder = "Add new item...",
  multiline = false
}: EditableSectionProps) {
  const [localItems, setLocalItems] = useState<EditableItem[]>(items);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const addItem = () => {
    const newItem: EditableItem = {
      id: Date.now().toString(),
      content: ''
    };
    const updatedItems = [...localItems, newItem];
    setLocalItems(updatedItems);
    onUpdate(updatedItems);
  };

  const updateItem = (id: string, content: string) => {
    const updatedItems = localItems.map(item => 
      item.id === id ? { ...item, content } : item
    );
    setLocalItems(updatedItems);
    onUpdate(updatedItems);
  };

  const removeItem = (id: string) => {
    const updatedItems = localItems.filter(item => item.id !== id);
    setLocalItems(updatedItems);
    onUpdate(updatedItems);
  };

  const saveAll = () => {
    onUpdate(localItems);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <button
              onClick={saveAll}
              className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save All</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {localItems.map((item, index) => (
          <div key={item.id} className="flex items-start space-x-2">
            <div className="flex-1">
              <EditableContent
                initialContent={item.content}
                onSave={(content) => updateItem(item.id, content)}
                placeholder={placeholder}
                multiline={multiline}
                className="min-h-[40px]"
              />
            </div>
            {isEditing && (
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        
        {isEditing && (
          <button
            onClick={addItem}
            className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add {title.slice(0, -1)}</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
