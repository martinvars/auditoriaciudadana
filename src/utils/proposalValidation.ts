import { validateSavings } from './validators';

interface ProposalData {
  title: string;
  description: string;
  savings: number;
  category: string;
  level: string;
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateProposal(data: ProposalData): ValidationResult {
  // Title validation
  if (data.title.length < 5) {
    return {
      isValid: false,
      error: 'El título debe tener al menos 5 caracteres'
    };
  }

  if (data.title.length > 200) {
    return {
      isValid: false,
      error: 'El título no puede exceder los 200 caracteres'
    };
  }

  // Description validation
  if (data.description.length < 20) {
    return {
      isValid: false,
      error: 'La descripción debe tener al menos 20 caracteres'
    };
  }

  if (data.description.length > 4000) {
    return {
      isValid: false,
      error: 'La descripción no puede exceder los 4000 caracteres'
    };
  }

  // Savings validation
  if (isNaN(data.savings) || data.savings <= 0) {
    return {
      isValid: false,
      error: 'El ahorro estimado debe ser un número positivo'
    };
  }

  if (data.savings > 10000) {
    return {
      isValid: false,
      error: 'El ahorro máximo permitido por propuesta es de 10.000M€'
    };
  }

  // Category validation
  const validCategories = {
    nacional: [
      'Administración',
      'Contratación',
      'Defensa',
      'Infraestructuras',
      'Otros'
    ],
    autonomico: [
      'Sanidad',
      'Educación',
      'Transportes',
      'Servicios Sociales',
      'Otros'
    ],
    municipal: [
      'Transporte',
      'Infraestructura',
      'Servicios Municipales',
      'Cultura',
      'Otros'
    ]
  };

  if (!validCategories[data.level]?.includes(data.category)) {
    return {
      isValid: false,
      error: 'Categoría no válida para el nivel seleccionado'
    };
  }

  // Level validation
  if (!['nacional', 'autonomico', 'municipal'].includes(data.level)) {
    return {
      isValid: false,
      error: 'Nivel administrativo no válido'
    };
  }

  // All validations passed
  return { isValid: true };
}