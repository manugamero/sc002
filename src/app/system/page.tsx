'use client';

import { useState } from 'react';
import { APP_VERSION } from '@/lib/config';
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
  ArrowLeft,
  Zap,
  Shield,
  Star
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import HamburgerMenu from '@/components/HamburgerMenu';
import { cn } from '@/lib/utils';

export default function SystemPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('colors');

  const colorPalette = [
    { name: 'Primary', value: '#3B82F6', bg: 'bg-blue-600', description: 'Color principal' },
    { name: 'Secondary', value: '#8B5CF6', bg: 'bg-purple-600', description: 'Color secundario' },
    { name: 'Success', value: '#10B981', bg: 'bg-emerald-600', description: 'Éxito' },
    { name: 'Warning', value: '#F59E0B', bg: 'bg-amber-500', description: 'Advertencia' },
    { name: 'Error', value: '#EF4444', bg: 'bg-red-500', description: 'Error' },
    { name: 'Info', value: '#06B6D4', bg: 'bg-cyan-500', description: 'Información' },
  ];

  const typography = [
    { name: 'Heading 1', class: 'text-4xl font-bold', example: 'Título Principal' },
    { name: 'Heading 2', class: 'text-3xl font-semibold', example: 'Subtítulo' },
    { name: 'Heading 3', class: 'text-2xl font-medium', example: 'Sección' },
    { name: 'Body Large', class: 'text-lg', example: 'Texto grande' },
    { name: 'Body', class: 'text-base', example: 'Texto normal' },
    { name: 'Body Small', class: 'text-sm', example: 'Texto pequeño' },
    { name: 'Caption', class: 'text-xs text-muted-foreground', example: 'Pie de texto' },
  ];

  const buttonVariants = [
    { name: 'Default', variant: 'default' },
    { name: 'Destructive', variant: 'destructive' },
    { name: 'Outline', variant: 'outline' },
    { name: 'Secondary', variant: 'secondary' },
    { name: 'Ghost', variant: 'ghost' },
    { name: 'Link', variant: 'link' },
  ];

  const iconSet = [
    { name: 'Target', icon: Target, description: 'Objetivo' },
    { name: 'Palette', icon: Palette, description: 'Diseño' },
    { name: 'Smartphone', icon: Smartphone, description: 'Móvil' },
    { name: 'Megaphone', icon: Megaphone, description: 'Marketing' },
    { name: 'Rocket', icon: Rocket, description: 'Lanzamiento' },
    { name: 'Heart', icon: Heart, description: 'Favorito' },
    { name: 'Users', icon: Users, description: 'Usuarios' },
    { name: 'Search', icon: Search, description: 'Búsqueda' },
    { name: 'TrendingUp', icon: TrendingUp, description: 'Crecimiento' },
    { name: 'Code', icon: Code, description: 'Desarrollo' },
    { name: 'Play', icon: Play, description: 'Reproducir' },
    { name: 'Monitor', icon: Monitor, description: 'Pantalla' },
    { name: 'Upload', icon: Upload, description: 'Subir' },
    { name: 'Eye', icon: Eye, description: 'Ver' },
    { name: 'ExternalLink', icon: ExternalLink, description: 'Enlace' },
    { name: 'Zap', icon: Zap, description: 'Rápido' },
    { name: 'Shield', icon: Shield, description: 'Seguridad' },
    { name: 'Star', icon: Star, description: 'Destacado' },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="h-9 px-3 flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </button>
              <div className="h-6 w-px bg-gray-800" />
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Design System
                  </h1>
                  <p className="text-xs text-gray-400">v{APP_VERSION} - Animation System</p>
                </div>
              </div>
            </div>
            <HamburgerMenu isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="colors" className="text-xs data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Palette className="w-4 h-4 mr-1" />
              Colores
            </TabsTrigger>
            <TabsTrigger value="typography" className="text-xs data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Type className="w-4 h-4 mr-1" />
              Tipografía
            </TabsTrigger>
            <TabsTrigger value="buttons" className="text-xs data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-1" />
              Botones
            </TabsTrigger>
            <TabsTrigger value="forms" className="text-xs data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Smartphone className="w-4 h-4 mr-1" />
              Formularios
            </TabsTrigger>
            <TabsTrigger value="tables" className="text-xs data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Monitor className="w-4 h-4 mr-1" />
              Tablas
            </TabsTrigger>
            <TabsTrigger value="cards" className="text-xs data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Code className="w-4 h-4 mr-1" />
              Tarjetas
            </TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Megaphone className="w-4 h-4 mr-1" />
              Alertas
            </TabsTrigger>
            <TabsTrigger value="loading" className="text-xs data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Loader2 className="w-4 h-4 mr-1" />
              Carga
            </TabsTrigger>
            <TabsTrigger value="progress" className="text-xs data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-1" />
              Progreso
            </TabsTrigger>
            <TabsTrigger value="icons" className="text-xs data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Star className="w-4 h-4 mr-1" />
              Iconos
            </TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="border-b border-gray-800/50">
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    Paleta de Colores
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Sistema de colores unificado para toda la aplicación
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {colorPalette.map((color, index) => (
                      <motion.div
                        key={color.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group"
                      >
                        <Card className="bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg">
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                              <div className={cn("w-16 h-16 rounded-lg shadow-lg", color.bg)} />
                              <div>
                                <h3 className="text-white font-semibold">{color.name}</h3>
                                <p className="text-gray-400 text-sm">{color.value}</p>
                                <p className="text-gray-500 text-xs">{color.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="border-b border-gray-800/50">
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg">
                      <Type className="w-6 h-6 text-white" />
                    </div>
                    Tipografía
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Jerarquía tipográfica y estilos de texto
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {typography.map((type, index) => (
                      <motion.div
                        key={type.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/30"
                      >
                        <div>
                          <h4 className="text-gray-300 font-medium">{type.name}</h4>
                          <p className="text-gray-500 text-sm">{type.class}</p>
                        </div>
                        <div className={cn("text-white", type.class)}>
                          {type.example}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Buttons Tab */}
          <TabsContent value="buttons" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="border-b border-gray-800/50">
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    Botones
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Variantes y estados de botones
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {buttonVariants.map((variant, index) => (
                      <motion.div
                        key={variant.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex flex-col items-center space-y-3 p-6 bg-gray-800/30 rounded-lg border border-gray-700/30"
                      >
                        <h4 className="text-gray-300 font-medium text-sm mb-2">{variant.name}</h4>
                        <button className="w-full h-10 px-4 rounded-lg bg-white/10 border border-gray-700 text-white font-medium transition-all duration-200 hover:bg-white/20 hover:border-white">
                          {variant.name}
                        </button>
                        <button className="w-full h-8 px-3 text-sm rounded-md bg-white/10 border border-gray-700 text-white font-medium transition-all duration-200 hover:bg-white/20 hover:border-white">
                          Pequeño
                        </button>
                        <button className="w-full h-12 px-6 rounded-lg bg-white/10 border border-gray-700 text-white font-medium transition-all duration-200 hover:bg-white/20 hover:border-white">
                          Grande
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="border-b border-gray-800/50">
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <div className="p-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    Formularios
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Componentes de formulario y validación
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="text-gray-300 text-sm font-medium mb-2 block">Email</label>
                        <input
                          type="email"
                          placeholder="tu@email.com"
                          className="w-full h-12 px-4 text-base border border-gray-700 rounded-lg bg-transparent text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-white focus:shadow-[0_0_0_2px_rgba(74,158,255,0.2)]"
                        />
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm font-medium mb-2 block">Contraseña</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full h-12 px-4 text-base border border-gray-700 rounded-lg bg-transparent text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-white focus:shadow-[0_0_0_2px_rgba(74,158,255,0.2)]"
                        />
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm font-medium mb-2 block">Mensaje</label>
                        <textarea
                          placeholder="Escribe tu mensaje aquí..."
                          rows={4}
                          className="w-full px-4 py-3 text-base border border-gray-700 rounded-lg bg-transparent text-white placeholder:text-gray-500 outline-none transition-all duration-200 resize-none focus:border-white focus:shadow-[0_0_0_2px_rgba(74,158,255,0.2)]"
                        />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="text-gray-300 text-sm font-medium mb-2 block">País</label>
                        <select className="w-full h-12 px-4 text-base border border-gray-700 rounded-lg bg-black text-white outline-none transition-all duration-200 cursor-pointer focus:border-white focus:shadow-[0_0_0_2px_rgba(74,158,255,0.2)]">
                          <option value="">Selecciona un país</option>
                          <option value="es">España</option>
                          <option value="mx">México</option>
                          <option value="ar">Argentina</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-3 py-4">
                        <input 
                          type="checkbox" 
                          id="terms" 
                          className="w-4 h-4 rounded border-gray-700 bg-transparent cursor-pointer accent-blue-500"
                        />
                        <label htmlFor="terms" className="text-gray-300 text-sm cursor-pointer">
                          Acepto los términos y condiciones
                        </label>
                      </div>
                      <button className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                        Enviar Formulario
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Tables Tab */}
          <TabsContent value="tables" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="border-b border-gray-800/50">
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
                      <Monitor className="w-6 h-6 text-white" />
                    </div>
                    Tablas
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Componentes de tabla y datos estructurados
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700/50">
                        <TableHead className="text-gray-300">Nombre</TableHead>
                        <TableHead className="text-gray-300">Email</TableHead>
                        <TableHead className="text-gray-300">Rol</TableHead>
                        <TableHead className="text-gray-300">Estado</TableHead>
                        <TableHead className="text-gray-300">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-gray-700/30 hover:bg-gray-800/30">
                        <TableCell className="text-gray-300">Juan Pérez</TableCell>
                        <TableCell className="text-gray-400">juan@email.com</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                            Admin
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-green-600/30 text-green-400">
                            Activo
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <button className="p-2 bg-transparent hover:bg-gray-800/50 rounded-md text-gray-400 hover:text-white transition-colors duration-200 border-none cursor-pointer">
                            <Eye className="w-4 h-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-gray-700/30 hover:bg-gray-800/30">
                        <TableCell className="text-gray-300">María García</TableCell>
                        <TableCell className="text-gray-400">maria@email.com</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-purple-600/20 text-purple-400 border-purple-600/30">
                            Usuario
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-yellow-600/30 text-yellow-400">
                            Pendiente
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <button className="p-2 bg-transparent hover:bg-gray-800/50 rounded-md text-gray-400 hover:text-white transition-colors duration-200 border-none cursor-pointer">
                            <Eye className="w-4 h-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Cards Tab */}
          <TabsContent value="cards" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg">
                        <Rocket className="w-5 h-5 text-white" />
                      </div>
                      Lanzamiento
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Información sobre el próximo lanzamiento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Preparando el lanzamiento de la nueva versión con características innovadoras.
                    </p>
                    <button className="w-full h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl border-none cursor-pointer">
                      Ver Detalles
                    </button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      Estadísticas
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Métricas de rendimiento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Usuarios activos</span>
                        <span className="text-white font-semibold">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Conversiones</span>
                        <span className="text-white font-semibold">89%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      Feedback
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Comentarios de usuarios
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      "Excelente experiencia de usuario y diseño intuitivo."
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <Alert className="bg-blue-600/10 border-blue-600/30 text-blue-300">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle className="text-blue-200">Información</AlertTitle>
                  <AlertDescription className="text-blue-300">
                    Esta es una alerta informativa con información importante.
                  </AlertDescription>
                </Alert>

                <Alert className="bg-green-600/10 border-green-600/30 text-green-300">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle className="text-green-200">Éxito</AlertTitle>
                  <AlertDescription className="text-green-300">
                    Operación completada exitosamente.
                  </AlertDescription>
                </Alert>

                <Alert className="bg-yellow-600/10 border-yellow-600/30 text-yellow-300">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle className="text-yellow-200">Advertencia</AlertTitle>
                  <AlertDescription className="text-yellow-300">
                    Por favor, revisa la información antes de continuar.
                  </AlertDescription>
                </Alert>

                <Alert className="bg-red-600/10 border-red-600/30 text-red-300">
                  <X className="h-4 w-4" />
                  <AlertTitle className="text-red-200">Error</AlertTitle>
                  <AlertDescription className="text-red-300">
                    Ha ocurrido un error. Por favor, inténtalo de nuevo.
                  </AlertDescription>
                </Alert>
              </div>
            </motion.div>
          </TabsContent>

          {/* Loading Tab */}
          <TabsContent value="loading" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="border-b border-gray-800/50">
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <div className="p-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg">
                      <Loader2 className="w-6 h-6 text-white" />
                    </div>
                    Estados de Carga
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Indicadores de carga y estados de espera
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                        <span className="text-gray-300">Cargando datos...</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="animate-pulse flex space-x-4 w-full">
                          <div className="rounded-full bg-gray-700 h-10 w-10"></div>
                          <div className="flex-1 space-y-2 py-1">
                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-700 rounded"></div>
                              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <button disabled className="w-full h-10 rounded-lg bg-white/10 border border-gray-700 text-white font-medium cursor-not-allowed opacity-50 flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Procesando...
                      </button>
                      <div className="flex items-center justify-center p-8 bg-gray-800/30 rounded-lg">
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
                          <p className="text-gray-400">Cargando contenido...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="border-b border-gray-800/50">
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <div className="p-2 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    Barras de Progreso
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Indicadores de progreso y completado
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Progreso básico</span>
                        <span className="text-gray-400">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Carga de archivos</span>
                        <span className="text-gray-400">45%</span>
                      </div>
                      <Progress value={45} className="h-3" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Instalación</span>
                        <span className="text-gray-400">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Icons Tab */}
          <TabsContent value="icons" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="border-b border-gray-800/50">
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <div className="p-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    Iconografía
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Biblioteca de iconos del sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {iconSet.map((icon, index) => (
                      <motion.div
                        key={icon.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group flex flex-col items-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 cursor-pointer"
                      >
                        <div className="p-3 bg-gray-700/50 rounded-lg group-hover:bg-gray-600/50 transition-colors duration-300 mb-3">
                          <icon.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h4 className="text-gray-300 text-sm font-medium text-center">{icon.name}</h4>
                        <p className="text-gray-500 text-xs text-center mt-1">{icon.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}