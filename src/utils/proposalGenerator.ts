import { supabase } from '../lib/supabase';

interface ProposalTemplate {
  title: string;
  description: string;
  savings: number;
  category: string;
  level: string;
}

// Budget data for reference
const BUDGET_DATA = {
  nacional: {
    total: 459769,
    categories: ['Administración', 'Contratación', 'Defensa', 'Infraestructuras', 'Otros']
  },
  autonomico: {
    total: 183589,
    categories: ['Sanidad', 'Educación', 'Transportes', 'Servicios Sociales', 'Otros']
  },
  municipal: {
    total: 102453,
    categories: ['Transporte', 'Infraestructura', 'Servicios Municipales', 'Cultura', 'Otros']
  }
};

// Areas for potential savings
const SAVING_AREAS = {
  Administración: [
    'digitalización',
    'simplificación',
    'automatización',
    'reorganización',
    'centralización'
  ],
  Contratación: [
    'transparencia',
    'competencia',
    'eficiencia',
    'centralización',
    'digitalización'
  ],
  // Add more areas...
};

async function checkDuplicateProposal(title: string): Promise<boolean> {
  const { data } = await supabase
    .from('proposals')
    .select('title')
    .ilike('title', `%${title}%`);
  
  return data && data.length > 0;
}

function generateSavingsEstimate(level: string, category: string): number {
  const totalBudget = BUDGET_DATA[level].total;
  const maxSavings = Math.min(totalBudget * 0.01, 10000); // Max 1% of budget or 10B€
  return Math.round(Math.random() * maxSavings);
}

function generateProposalStructure(description: string, savings: number): string {
  return `1. Situación actual:
${description}

2. Ahorros detallados:
- Eficiencia operativa: ${Math.round(savings * 0.4)}M€/año
- Reducción costes: ${Math.round(savings * 0.3)}M€/año
- Optimización recursos: ${Math.round(savings * 0.3)}M€/año

3. Plan de implementación:
- Fase 1 (6 meses): Análisis y planificación
- Fase 2 (12 meses): Implementación gradual
- Fase 3 (6 meses): Evaluación y ajustes

4. Referencias internacionales:
- Reino Unido: Reforma similar en 2015
- Alemania: Optimización 2018
- Países Bajos: Modelo eficiente desde 2020`;
}

export async function generateDailyProposal(): Promise<void> {
  try {
    // Check if we already generated a proposal today
    const today = new Date().toISOString().split('T')[0];
    const { data: existingProposals } = await supabase
      .from('proposals')
      .select('created_at')
      .gte('created_at', today)
      .eq('nickname', 'AI_Auditor');

    if (existingProposals && existingProposals.length > 0) {
      console.log('Already generated a proposal today');
      return;
    }

    // Select random level and category
    const levels = Object.keys(BUDGET_DATA);
    const level = levels[Math.floor(Math.random() * levels.length)];
    const category = BUDGET_DATA[level].categories[
      Math.floor(Math.random() * BUDGET_DATA[level].categories.length)
    ];

    // Generate proposal
    const savings = generateSavingsEstimate(level, category);
    const title = `Optimización mediante ${SAVING_AREAS[category]?.[
      Math.floor(Math.random() * SAVING_AREAS[category]?.length)
    ] || 'mejora'} en ${category}`;

    // Check for duplicates
    if (await checkDuplicateProposal(title)) {
      console.log('Similar proposal already exists');
      return;
    }

    const description = generateProposalStructure(
      `El sistema actual de ${category.toLowerCase()} presenta ineficiencias y oportunidades de mejora. 
      Se propone un programa integral de optimización basado en mejores prácticas internacionales.`,
      savings
    );

    // Insert new proposal
    const { error } = await supabase
      .from('proposals')
      .insert({
        title,
        description,
        details: description,
        savings,
        category,
        level,
        nickname: 'AI_Auditor',
        created_at: new Date().toISOString()
      });

    if (error) throw error;
    console.log('Generated new proposal:', title);

  } catch (error) {
    console.error('Error generating proposal:', error);
  }
}

// Function to start the daily generator
export function startDailyGenerator(): void {
  // Generate first proposal immediately if needed
  generateDailyProposal();

  // Set up daily schedule (run at 00:01 each day)
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 1);
  const timeUntilTomorrow = tomorrow.getTime() - now.getTime();

  // Initial timer
  setTimeout(() => {
    generateDailyProposal();
    // Then set up daily interval
    setInterval(generateDailyProposal, 24 * 60 * 60 * 1000);
  }, timeUntilTomorrow);
}