import { supabase } from '../lib/supabase';

interface ProposalData {
  title: string;
  description: string;
  savings: number;
  category: string;
  level: string;
}

interface ValidationResult {
  isValid: boolean;
  improvedProposal?: ProposalData;
  error?: string;
}

// Budget reference data (in millions €)
const BUDGET_REFERENCES = {
  nacional: {
    total: 459769, // Total national budget
    categories: {
      Administración: 31275,
      Defensa: 12825,
      Infraestructuras: 15000,
      Contratación: 200000, // Public procurement
      Otros: 200669
    }
  },
  autonomico: {
    total: 183589, // Total regional budgets
    categories: {
      Sanidad: 87356,
      Educación: 55172,
      Transportes: 12000,
      'Servicios Sociales': 22457,
      Otros: 6604
    }
  },
  municipal: {
    total: 102453, // Total municipal budgets
    categories: {
      Transporte: 10245,
      Infraestructura: 15368,
      'Servicios Municipales': 51227,
      Cultura: 10245,
      Otros: 15368
    }
  }
};

// Maximum reasonable savings as percentage of category budget
const MAX_SAVINGS_PERCENTAGE = 0.25; // 25%

export async function validateAndImproveProposal(proposal: ProposalData): Promise<ValidationResult> {
  try {
    // Basic validation
    if (!proposal.title || !proposal.description || !proposal.savings) {
      return { isValid: false, error: 'Faltan campos requeridos' };
    }

    // Get reference budget for level and category
    const levelBudget = BUDGET_REFERENCES[proposal.level];
    const categoryBudget = levelBudget.categories[proposal.category] || levelBudget.total * 0.1;

    // Calculate maximum reasonable savings
    const maxSavings = categoryBudget * MAX_SAVINGS_PERCENTAGE;

    // Check if savings are reasonable
    if (proposal.savings > maxSavings) {
      const improvedProposal = {
        ...proposal,
        savings: Math.round(maxSavings)
      };

      return {
        isValid: true,
        improvedProposal,
        error: `El ahorro propuesto parece demasiado optimista. Se ha ajustado a ${Math.round(maxSavings)}M€ basado en el presupuesto de la categoría.`
      };
    }

    // Analyze description quality
    const descriptionIssues = analyzeDescription(proposal.description);
    if (descriptionIssues.length > 0) {
      const improvedDescription = await improveDescription(proposal.description);
      return {
        isValid: true,
        improvedProposal: {
          ...proposal,
          description: improvedDescription
        },
        error: 'Se ha mejorado la descripción para incluir más detalles y referencias.'
      };
    }

    return { isValid: true };
  } catch (error) {
    console.error('Error validating proposal:', error);
    return { isValid: false, error: 'Error al validar la propuesta' };
  }
}

function analyzeDescription(description: string): string[] {
  const issues = [];
  
  // Check minimum length
  if (description.length < 200) {
    issues.push('Descripción demasiado corta');
  }

  // Check for structure (look for numbers or bullet points)
  if (!description.match(/\d\.|•|-|\*|1\)/) && !description.includes('\n')) {
    issues.push('Falta estructura clara');
  }

  // Check for quantitative data
  if (!description.match(/\d+[M€%]/)) {
    issues.push('Faltan datos cuantitativos');
  }

  // Check for references or examples
  if (!description.toLowerCase().includes('ejemplo') && 
      !description.match(/\([^)]*\)/) &&
      !description.toLowerCase().includes('referencia')) {
    issues.push('Faltan ejemplos o referencias');
  }

  return issues;
}

async function improveDescription(description: string): Promise<string> {
  // Add structure if missing
  if (!description.includes('\n')) {
    description = description.replace(/\. /g, '.\n\n');
  }

  // Add sections if missing
  if (!description.match(/1\.|Situación actual|Medidas propuestas|Ahorros/)) {
    description = `1. Situación actual:\n${description}\n\n2. Medidas propuestas:\n- [Detallar medidas específicas]\n\n3. Ahorros estimados:\n- [Desglosar ahorros por medida]`;
  }

  return description;
}