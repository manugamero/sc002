import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY || 'dummy-key',
});

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.webm');
  formData.append('model', 'whisper-1');

  const response = await fetch('/api/transcribe', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Transcription failed');
  }

  const result = await response.json();
  return result.text;
};

export const extractProjectInfo = async (transcription: string) => {
  const prompt = `
    Analiza la siguiente transcripción de audio y extrae información del proyecto:
    
    "${transcription}"
    
    Extrae y devuelve en formato JSON:
    {
      "name": "nombre del proyecto/empresa",
      "sector": "sector de negocio",
      "vision": "visión del proyecto",
      "values": ["valor1", "valor2", "valor3"],
      "clientType": "A, B o C basado en la complejidad",
      "summary": "resumen del proyecto"
    }
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return JSON.parse(response.choices[0].message.content || '{}');
};

export const generateSuggestions = async (context: string, field: string, currentValue?: string) => {
  const prompt = `
    Contexto: ${context}
    Campo: ${field}
    Valor actual: ${currentValue || 'ninguno'}
    
    Genera 5 sugerencias creativas y profesionales para este campo específico.
    Responde solo con un array JSON de strings.
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
  });

  try {
    return JSON.parse(response.choices[0].message.content || '[]');
  } catch {
    return [];
  }
};

export const generateDummyContent = async (section: string, clientType: 'A' | 'B' | 'C') => {
  const prompts = {
    strategy: {
      A: "Genera contenido dummy para Strategy nivel A (fundadores, 3-5 competidores, insights rápidos)",
      B: "Genera contenido dummy para Strategy nivel B (fundadores + usuarios, 5-10 competidores, oportunidades)",
      C: "Genera contenido dummy para Strategy nivel C (stakeholders, análisis por categorías, informe completo)"
    },
    brand: {
      A: "Genera contenido dummy para Brand nivel A (workshop propósito, brainstorm naming, 1-2 propuestas logo)",
      B: "Genera contenido dummy para Brand nivel B (arquetipos + tono, naming sprint, 3-4 líneas visuales)",
      C: "Genera contenido dummy para Brand nivel C (auditoría cultural, naming system, sistema modular completo)"
    },
    product: {
      runs: "Genera contenido dummy para Product (MVP + flow, prototipo funcional, validación)",
      B: "Genera contenido dummy para Product nivel B (journeys + mockups, prototipo interactivo, A/B testing)",
      C: "Genera contenido dummy para Product nivel C (arquitectura multi-producto, multi-device, QA + rollout)"
    },
    communication: {
      A: "Genera contenido dummy para Communication nivel A (avatar + bio, 1-2 templates, pieza hero)",
      B: "Genera contenido dummy para rond B (multi-formato, campaña principal, merch limitado)",
      C: "Genera contenido dummy para Communication nivel C (sistema completo, sistema 360°, full merch)"
    },
    launch: {
      A: "Genera contenido dummy para Launch nivel A (mini roadmap, feedback directo, launch checklist)",
      B: "Genera contenido dummy para Launch nivel B (coordinación marketing, KPI review, learn report)",
      C: "Genera contenido dummy para Launch nivel C (plan global, reporting trimestral, optimization playbook)"
    }
  };

  const prompt = prompts[section]?.[clientType] || `Genera contenido dummy para ${section}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
  });

  return response.choices[0].message.content || '';
};
