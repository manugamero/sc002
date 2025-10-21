// Sistema de mapeo de videos basado en la nueva nomenclatura
export interface VideoMapping {
  introduction: string[]; // Videos 00.00, 00.01, etc.
  chapterCovers: Record<string, string>; // Videos 01.00, 02.00, etc.
  chapterSections: Record<string, string>; // Videos 01.01, 02.01, etc.
}

// Mapeo de capítulos a números
export const CHAPTER_MAPPING = {
  strategy: '01',
  brand: '02', 
  product: '03',
  communication: '04',
  launch: '05'
} as const;

// Función para obtener el video de introducción secuencial
export function getIntroductionVideo(index: number): string {
  const videoNumber = index.toString().padStart(2, '0');
  return `/video00.${videoNumber}.mp4`;
}

// Función para obtener el video de portada de un capítulo
export function getChapterCoverVideo(chapter: keyof typeof CHAPTER_MAPPING): string {
  const chapterNumber = CHAPTER_MAPPING[chapter];
  return `/video${chapterNumber}.00.mp4`;
}

// Función para obtener el video de subsecciones de un capítulo
export function getChapterSectionVideo(chapter: keyof typeof CHAPTER_MAPPING): string {
  const chapterNumber = CHAPTER_MAPPING[chapter];
  return `/video${chapterNumber}.01.mp4`;
}

// Función para obtener todos los videos de introducción disponibles
export function getAvailableIntroductionVideos(): string[] {
  const videos: string[] = [];
  let index = 0;
  
  // Buscar videos de introducción hasta encontrar uno que no exista
  while (true) {
    const videoPath = getIntroductionVideo(index);
    // En un entorno real, aquí verificarías si el archivo existe
    // Por ahora asumimos que tenemos videos hasta el 07 basado en los archivos
    if (index > 7) break;
    videos.push(videoPath);
    index++;
  }
  
  return videos;
}

// Función para verificar si un video existe
export function videoExists(videoPath: string): boolean {
  // En un entorno real, esto verificaría la existencia del archivo
  // Por ahora retornamos true para los videos que sabemos que existen
  const videoName = videoPath.split('/').pop();
  const availableVideos = [
    'video00.00.mp4', 'video00.01.mp4', 'video00.02.mp4', 'video00.03.mp4',
    'video00.04.mp4', 'video00.05.mp4', 'video00.06.mp4', 'video00.07.mp4',
    'video01.00.mp4', 'video01.01.mp4',
    'video02.00.mp4', 'video02.01.mp4', 'video02.02.mp4',
    'video03.00.mp4', 'video03.01.mp4',
    'video04.00.mp4', 'video04.01.mp4',
    'video05.00.mp4'
  ];
  
  return availableVideos.includes(videoName || '');
}

// Función para obtener el video apropiado para una sección específica
export function getVideoForSection(
  chapter: keyof typeof CHAPTER_MAPPING,
  section?: string
): string {
  // Si es la portada del capítulo (no hay sección específica)
  if (!section) {
    return getChapterCoverVideo(chapter);
  }
  
  // Para cualquier subsección, usar el video de subsecciones del capítulo
  return getChapterSectionVideo(chapter);
}
