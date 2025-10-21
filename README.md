# 🧭 Studio Framework

Una aplicación web moderna para el desarrollo completo de marca y producto con inteligencia artificial.

## ✨ Características

- **Proceso paso a paso**: Navegación intuitiva por las 5 secciones principales (Strategy, Brand, Product, Communication, Launch)
- **Transcripción de audio**: Graba audio explicando tu proyecto y el sistema lo analiza automáticamente
- **Autocompletado con IA**: Sugerencias inteligentes para cada campo usando OpenAI
- **Contenido dummy**: Botones para rellenar automáticamente cada sección con contenido de ejemplo
- **Progreso visual**: Barras de progreso animadas para cada sección
- **Generador de Brandbook**: Exporta toda la información en un documento completo
- **Panel de administración**: Acceso en `/admin` para gestionar todos los proyectos
- **Responsive**: Diseño completamente responsive con animaciones sutiles

## 🚀 Tecnologías

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Animaciones**: Framer Motion
- **IA**: OpenAI API (Whisper para transcripción, GPT-4 para análisis)
- **Base de datos**: Supabase (configurable)
- **Deploy**: Vercel

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd sc001
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
# Crea un archivo .env.local con:
NEXT_PUBLIC_OPENAI_API_KEY=tu_api_key_de_openai
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
OPENAI_API_KEY=tu_api_key_de_openai
```

4. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

## 🎯 Uso

1. **Inicio**: La aplicación inicia con un onboarding donde puedes grabar audio o continuar manualmente
2. **Navegación**: Usa la barra lateral para navegar entre las 5 secciones principales
3. **Contenido**: Cada sección tiene botones para generar contenido dummy automáticamente
4. **Progreso**: Ve el progreso de cada sección en tiempo real
5. **Exportar**: Al completar las secciones, genera un brandbook completo
6. **Admin**: Accede a `/admin` para gestionar todos los proyectos

## 📋 Estructura del Proyecto

```
src/
├── app/
│   ├── api/transcribe/     # API para transcripción de audio
│   ├── admin/              # Panel de administración
│   └── page.tsx            # Página principal
├── components/
│   ├── sections/           # Componentes de cada sección
│   ├── AudioRecorder.tsx   # Grabador de audio
│   ├── DummyContentButton.tsx # Botones de contenido dummy
│   ├── ProgressBar.tsx     # Barra de progreso
│   ├── Sidebar.tsx         # Navegación lateral
│   └── BrandbookGenerator.tsx # Generador de brandbook
├── lib/
│   ├── dummyData.ts        # Datos de ejemplo
│   ├── openai.ts           # Funciones de OpenAI
│   └── supabase.ts         # Configuración de Supabase
└── types/
    └── index.ts            # Tipos de TypeScript
```

## 🎨 Tipos de Cliente

La aplicación se adapta a tres tipos de cliente:

- **Tipo A**: Proceso básico con fundadores, 3-5 competidores, insights rápidos
- **Tipo B**: Proceso intermedio con usuarios, 5-10 competidores, oportunidades detalladas
- **Tipo C**: Proceso completo con stakeholders, análisis por categorías, informe exhaustivo

## 🚀 Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Despliega automáticamente

O usando la CLI:
```bash
npm install -g vercel
vercel --prod
```

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- OpenAI por las APIs de IA
- Vercel por la plataforma de despliegue
- Tailwind CSS por el sistema de diseño
- Framer Motion por las animaciones