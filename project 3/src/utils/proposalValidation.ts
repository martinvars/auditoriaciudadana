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
  if (data.title.length < 10) {
    return {
      isValid: false,
      error: 'El título debe tener al menos 10 caracteres'
    };
  }

  if (data.title.length > 200) {
    return {
      isValid: false,
      error: 'El título no puede exceder los 200 caracteres'
    };
  }

  // Description validation
  if (data.description.length < 200) {
    return {
      isValid: false,
      error: 'La descripción debe tener al menos 200 caracteres'
    };
  }

  if (data.description.length > 4000) {
    return {
      isValid: false,
      error: 'La descripción no puede exceder los 4000 caracteres'
    };
  }

  // Check for structured content in description
  const requiredSections = [
    { keyword: "situación actual", error: "Debe incluir una descripción de la situación actual" },
    { keyword: "ahorro", error: "Debe explicar cómo se logra el ahorro" },
    { keyword: "implementación", error: "Debe incluir un plan de implementación" }
  ];

  const descriptionLower = data.description.toLowerCase();
  for (const section of requiredSections) {
    if (!descriptionLower.includes(section.keyword)) {
      return {
        isValid: false,
        error: section.error
      };
    }
  }

  // Savings validation
  if (isNaN(data.savings) || data.savings <= 0) {
    return {
      isValid: false,
      error: 'El ahorro estimado debe ser un número positivo'
    };
  }

  if (data.savings > 100000) {
    return {
      isValid: false,
      error: 'El ahorro estimado parece poco realista'
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

  // Check for reasonable content structure
  const hasNumberedList = /\d+\./m.test(data.description);
  const hasBulletPoints = /[-•]/m.test(data.description);
  
  if (!hasNumberedList && !hasBulletPoints) {
    return {
      isValid: false,
      error: 'La propuesta debe estar estructurada con listas numeradas o viñetas'
    };
  }

  // All validations passed
  return { isValid: true };
}