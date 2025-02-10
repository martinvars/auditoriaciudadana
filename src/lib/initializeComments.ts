import { supabase } from './supabase';
import { sampleComments } from './sampleComments';

export async function initializeComments() {
  try {
    // Verificar si ya hay comentarios
    const { data: existingComments, error: countError } = await supabase
      .from('comments')
      .select('id')
      .limit(1);

    if (countError) {
      console.error('Error verificando comentarios:', countError);
      return;
    }

    // Solo proceder si no hay comentarios
    if (!existingComments || existingComments.length === 0) {
      // Obtener todas las propuestas
      const { data: proposals, error: proposalsError } = await supabase
        .from('proposals')
        .select('id, level, category')
        .order('created_at', { ascending: false });

      if (proposalsError) {
        console.error('Error obteniendo propuestas:', proposalsError);
        return;
      }

      if (!proposals || proposals.length === 0) {
        console.log('No hay propuestas para comentar');
        return;
      }

      // Preparar comentarios para cada propuesta
      const comments = [];
      const usedComments = new Set(); // Para evitar duplicados

      for (const proposal of proposals) {
        // Seleccionar comentarios relevantes según el nivel y categoría
        let relevantComments = [];
        
        if (proposal.level === 'nacional') {
          switch (proposal.category) {
            case 'Administración':
              relevantComments = [sampleComments[0]]; // ExDirectivoPublico
              break;
            case 'Empresas Públicas':
              relevantComments = [sampleComments[1]]; // EconomistaPublico
              break;
            case 'Pensiones':
              relevantComments = [sampleComments[2]]; // ActuarioPensiones
              break;
            case 'Contratación':
              relevantComments = [sampleComments[4]]; // ExpertoContratacion
              break;
            default:
              relevantComments = [sampleComments[0], sampleComments[1]];
          }
        } else if (proposal.level === 'autonomico') {
          switch (proposal.category) {
            case 'Administración':
              relevantComments = [sampleComments[3]]; // ExConsejero
              break;
            case 'Sanidad':
              relevantComments = [sampleComments[6]]; // GestorSanitario
              break;
            case 'Empleo':
              relevantComments = [sampleComments[7]]; // TecnicoEmpleo
              break;
            default:
              relevantComments = [sampleComments[3], sampleComments[6]];
          }
        } else {
          switch (proposal.category) {
            case 'Administración':
              relevantComments = [sampleComments[8]]; // InterventorMunicipal
              break;
            case 'Tecnología':
              relevantComments = [sampleComments[9]]; // ModernizacionLocal
              break;
            default:
              relevantComments = [sampleComments[8], sampleComments[9]];
          }
        }

        // Añadir 1-2 comentarios relevantes no duplicados
        const numComments = Math.min(2, relevantComments.length);
        for (let i = 0; i < numComments; i++) {
          const commentTemplate = relevantComments[i];
          const commentKey = `${commentTemplate.nickname}-${proposal.id}`;
          
          if (!usedComments.has(commentKey)) {
            comments.push({
              proposal_id: proposal.id,
              content: commentTemplate.content,
              nickname: commentTemplate.nickname,
              created_at: new Date(Date.now() - (Math.random() * 7 * 24 * 3600 * 1000)).toISOString() // Últimos 7 días
            });
            usedComments.add(commentKey);
          }
        }
      }

      // Insertar comentarios en lotes de 5 para reducir la carga
      for (let i = 0; i < comments.length; i += 5) {
        const batch = comments.slice(i, i + 5);
        const { error: insertError } = await supabase
          .from('comments')
          .insert(batch);

        if (insertError) {
          console.error(`Error insertando lote ${i/5 + 1}:`, insertError);
          continue;
        }
      }

      console.log(`${comments.length} comentarios de muestra inicializados correctamente`);
    } else {
      console.log('Los comentarios ya están inicializados');
    }
  } catch (error) {
    console.error('Error general inicializando comentarios:', error);
  }
}