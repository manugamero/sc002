'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Palette, 
  Smartphone, 
  Megaphone, 
  Rocket,
  CheckCircle,
  Circle,
  X,
  Plus,
  Trash2,
  Heart,
  Type,
  Users,
  Search,
  TrendingUp,
  Sparkles,
  Loader2,
  Code,
  Play,
  Monitor,
  Upload,
  Eye,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import Button from '@/components/ui/Button';
import HamburgerMenu from '@/components/HamburgerMenu';

export default function SystemPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    password: '',
    textarea: '',
    select: '',
    checkbox: false,
    radio: '',
    switch: false,
    range: 50,
    date: '',
    time: '',
    color: '#3B82F6',
    file: null as File | null,
  });

  const [tableData, setTableData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  ]);

  const [listItems, setListItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addListItem = () => {
    setListItems(prev => [...prev, `Item ${prev.length + 1}`]);
  };

  const removeListItem = (index: number) => {
    setListItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateTableData = (index: number, field: string, value: string) => {
    setTableData(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">🎨 Design System</h1>
            </div>
            <HamburgerMenu 
              isOpen={isMenuOpen} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Colors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Palette className="w-5 h-5 text-purple-500" />
            <span>Paleta de Colores</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Primary Colors */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm font-medium">Gray 900</p>
              <p className="text-xs text-gray-500">#111827</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm font-medium">Gray 800</p>
              <p className="text-xs text-gray-500">#1F2937</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm font-medium">Gray 100</p>
              <p className="text-xs text-gray-500">#F3F4F6</p>
            </div>
            
            {/* Accent Colors */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm font-medium">Blue 500</p>
              <p className="text-xs text-gray-500">#3B82F6</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm font-medium">Red 500</p>
              <p className="text-xs text-gray-500">#EF4444</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm font-medium">Green 500</p>
              <p className="text-xs text-gray-500">#10B981</p>
            </div>
          </div>
        </motion.div>

        {/* Typography Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Type className="w-5 h-5 text-blue-500" />
            <span>Tipografía</span>
          </h2>
          
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Heading 1 - 4xl Bold</h1>
              <p className="text-sm text-gray-500 mt-1">text-4xl font-bold</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Heading 2 - 3xl Bold</h2>
              <p className="text-sm text-gray-500 mt-1">text-3xl font-bold</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Heading 3 - xl Semibold</h3>
              <p className="text-sm text-gray-500 mt-1">text-xl font-semibold</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Heading 4 - lg Medium</h4>
              <p className="text-sm text-gray-500 mt-1">text-lg font-medium</p>
            </div>
            <div>
              <p className="text-base text-gray-700">Body text - base Regular</p>
              <p className="text-sm text-gray-500 mt-1">text-base</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Small text - sm Regular</p>
              <p className="text-sm text-gray-500 mt-1">text-sm</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Extra small text - xs Regular</p>
              <p className="text-sm text-gray-500 mt-1">text-xs</p>
            </div>
          </div>
        </motion.div>

        {/* Buttons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-500" />
            <span>Botones</span>
          </h2>
          
          <div className="space-y-6">
            {/* Button Variants */}
            <div>
              <h3 className="text-lg font-medium mb-3">Variantes</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md">
                  Primary Button
                </Button>
                <Button variant="secondary" size="md">
                  Secondary Button
                </Button>
                <Button variant="ghost" size="md">
                  Ghost Button
                </Button>
              </div>
            </div>

            {/* Button Sizes */}
            <div>
              <h3 className="text-lg font-medium mb-3">Tamaños</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="md">
                  Medium
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
              </div>
            </div>

            {/* Button States */}
            <div>
              <h3 className="text-lg font-medium mb-3">Estados</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md">
                  Normal
                </Button>
                <Button variant="primary" size="md" disabled>
                  Disabled
                </Button>
                <Button variant="primary" size="md" className="opacity-75">
                  Loading
                </Button>
              </div>
            </div>

            {/* Gradient Buttons */}
            <div>
              <h3 className="text-lg font-medium mb-3">Botones con Gradiente</h3>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Sparkles className="w-4 h-4" />
                  <span>Gradient Button</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Generate</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Elements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-500" />
            <span>Elementos de Formulario</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Text Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Input
                </label>
                <input
                  type="text"
                  value={formData.text}
                  onChange={(e) => handleInputChange('text', e.target.value)}
                  placeholder="Escribe algo aquí..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Input
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Input
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Other Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Textarea
                </label>
                <textarea
                  value={formData.textarea}
                  onChange={(e) => handleInputChange('textarea', e.target.value)}
                  placeholder="Escribe un párrafo..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select
                </label>
                <select
                  value={formData.select}
                  onChange={(e) => handleInputChange('select', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="option1">Opción 1</option>
                  <option value="option2">Opción 2</option>
                  <option value="option3">Opción 3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Picker
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Checkboxes and Radio Buttons */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Checkboxes</h3>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.checkbox}
                  onChange={(e) => handleInputChange('checkbox', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span>Checkbox normal</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span>Checkbox checked</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  disabled
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span>Checkbox disabled</span>
              </label>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Radio Buttons</h3>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="radio-group"
                  value="option1"
                  checked={formData.radio === 'option1'}
                  onChange={(e) => handleInputChange('radio', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span>Opción 1</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="radio-group"
                  value="option2"
                  checked={formData.radio === 'option2'}
                  onChange={(e) => handleInputChange('radio', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span>Opción 2</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="radio-group"
                  value="option3"
                  checked={formData.radio === 'option3'}
                  onChange={(e) => handleInputChange('radio', e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span>Opción 3</span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Complex Tables Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Monitor className="w-5 h-5 text-orange-500" />
            <span>Tablas Complejas con Inputs</span>
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((row, index) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) => updateTableData(index, 'name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="email"
                        value={row.email}
                        onChange={(e) => updateTableData(index, 'email', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={row.role}
                        onChange={(e) => updateTableData(index, 'role', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={row.status}
                        onChange={(e) => updateTableData(index, 'status', e.target.value)}
                        className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          row.status === 'Active' 
                            ? 'border-green-300 bg-green-50 text-green-800' 
                            : 'border-red-300 bg-red-50 text-red-800'
                        }`}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Dynamic Lists Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Plus className="w-5 h-5 text-teal-500" />
            <span>Listas Dinámicas</span>
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Lista con inputs</h3>
              <button
                onClick={addListItem}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
            
            {listItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...listItems];
                    newItems[index] = e.target.value;
                    setListItems(newItems);
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeListItem(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Tarjetas</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-2">Tarjeta Básica</h3>
              <p className="text-gray-600 text-sm mb-4">
                Esta es una tarjeta básica con contenido simple.
              </p>
              <Button variant="primary" size="sm">
                Acción
              </Button>
            </div>

            {/* Card with Icon */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Con Icono</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Tarjeta con icono y contenido estructurado.
              </p>
              <div className="flex space-x-2">
                <Button variant="primary" size="sm">
                  Primario
                </Button>
                <Button variant="ghost" size="sm">
                  Secundario
                </Button>
              </div>
            </div>

            {/* Card with Image */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-400"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Con Imagen</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Tarjeta con imagen de fondo y contenido.
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  Ver más
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alerts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Alertas y Notificaciones</span>
          </h2>
          
          <div className="space-y-4">
            {/* Success Alert */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Éxito</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Operación completada exitosamente.
                  </p>
                </div>
              </div>
            </div>

            {/* Error Alert */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <X className="w-5 h-5 text-red-500" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-700 mt-1">
                    Ha ocurrido un error en la operación.
                  </p>
                </div>
              </div>
            </div>

            {/* Warning Alert */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Search className="w-5 h-5 text-yellow-500" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Advertencia</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Por favor, revisa los datos ingresados.
                  </p>
                </div>
              </div>
            </div>

            {/* Info Alert */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Información</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Esta es una notificación informativa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading States Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            <span>Estados de Carga</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Spinners</h3>
              <div className="flex items-center space-x-4">
                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                <Loader2 className="w-6 h-6 animate-spin text-green-500" />
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Botones con Loading</h3>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg opacity-50 cursor-not-allowed">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Cargando...</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg opacity-50 cursor-not-allowed">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Guardando...</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Bars Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            <span>Barras de Progreso</span>
          </h2>
          
          <div className="space-y-6">
            {/* Basic Progress Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progreso básico</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progreso con colores</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progreso con gradiente</span>
                  <span>60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            {/* Progress with Steps */}
            <div>
              <h3 className="text-lg font-medium mb-3">Progreso por pasos</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="ml-2 text-sm text-green-600">Completado</span>
                </div>
                <div className="flex-1 h-1 bg-green-500"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <span className="ml-2 text-sm text-blue-600">Actual</span>
                </div>
                <div className="flex-1 h-1 bg-gray-200"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-sm font-bold">3</span>
                  </div>
                  <span className="ml-2 text-sm text-gray-500">Pendiente</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Icons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Palette className="w-5 h-5 text-purple-500" />
            <span>Iconos</span>
          </h2>
          
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
            {[
              Target, Palette, Smartphone, Megaphone, Rocket,
              CheckCircle, Circle, X, Plus, Trash2, Heart, Type,
              Users, Search, TrendingUp, Sparkles, Loader2,
              Code, Play, Monitor, Upload, Eye, ExternalLink
            ].map((Icon, index) => (
              <div key={index} className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Icon className="w-6 h-6 text-gray-600 mb-2" />
                <span className="text-xs text-gray-500 text-center">{Icon.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}