import { profanityList } from './profanityList';

export function moderateContent(text: string): { isValid: boolean; reason?: string } {
  // Convert to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase();

  // Check for profanity
  for (const word of profanityList) {
    if (lowerText.includes(word)) {
      return {
        isValid: false,
        reason: 'El contenido contiene lenguaje inapropiado'
      };
    }
  }

  // Check for non-constructive patterns
  const nonConstructivePatterns = [
    /^(?:jaja|jeje|lol|xd)+$/i,
    /^[!?.]+$/,
    /^(?:k|q) (?:dices|hablas)/i,
    /(?:tonto|idiota|estupid)/i,
  ];

  for (const pattern of nonConstructivePatterns) {
    if (pattern.test(lowerText)) {
      return {
        isValid: false,
        reason: 'Por favor, mantén un tono constructivo y respetuoso'
      };
    }
  }

  // Check for minimum word count (100 words)
  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount < 100) {
    return {
      isValid: false,
      reason: 'La propuesta debe tener al menos 100 palabras para asegurar una descripción detallada'
    };
  }

  // Check for excessive capitalization
  const upperCaseRatio = text.split('').filter(char => char.match(/[A-Z]/)).length / text.length;
  if (upperCaseRatio > 0.5 && text.length > 20) {
    return {
      isValid: false,
      reason: 'Por favor, evita escribir en mayúsculas excesivas'
    };
  }

  // Check for repetitive characters (spam) - Now more strict
  if (/(.)\1{4,}/.test(text) || /(.{2,})\1{2,}/i.test(text)) {
    return {
      isValid: false,
      reason: 'El texto contiene patrones repetitivos que parecen spam'
    };
  }

  // Check for currency spam
  if ((text.match(/[$€¥£]/g) || []).length > 5) {
    return {
      isValid: false,
      reason: 'Por favor, usa los símbolos de moneda con moderación'
    };
  }

  // Check for URL spam
  if ((text.match(/https?:\/\/[^\s]+/g) || []).length > 2) {
    return {
      isValid: false,
      reason: 'Demasiados enlaces en el contenido'
    };
  }

  // Check for coherent sentences
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length < 5) {
    return {
      isValid: false,
      reason: 'La propuesta debe contener al menos 5 oraciones completas'
    };
  }

  // Check for reasonable sentence length
  const hasLongSentences = sentences.some(s => s.split(/\s+/).length > 50);
  if (hasLongSentences) {
    return {
      isValid: false,
      reason: 'Algunas oraciones son demasiado largas. Por favor, divídelas para mejorar la legibilidad'
    };
  }

  return { isValid: true };
}