import { supabase } from './supabase';

interface CommentTemplate {
  content: string;
  nickname: string;
}

const commentTemplates = {
  nacional: {
    Administración: [
      { content: "Excelente propuesta de optimización. Como ex funcionario, sugiero también revisar la estructura de las subdirecciones generales.", nickname: "ExFuncionario" },
      { content: "Interesante planteamiento. Habría que considerar el impacto en la coordinación entre departamentos.", nickname: "AnalistaPublico" }
    ],
    "Empresas Públicas": [
      { content: "La privatización debe garantizar el mantenimiento de servicios esenciales en zonas rurales.", nickname: "EconomistaRural" },
      { content: "Importante análisis. Sugiero incluir KPIs de servicio en las privatizaciones.", nickname: "ConsultorGestion" }
    ],
    Pensiones: [
      { content: "El periodo de transición es clave. Necesitamos garantías para los actuales cotizantes.", nickname: "ActuarioExperto" },
      { content: "La experiencia sueca demuestra que este modelo es viable a largo plazo.", nickname: "AnalistaPensiones" }
    ]
  },
  autonomico: {
    Administración: [
      { content: "La coordinación entre CCAA será fundamental para el éxito de esta propuesta.", nickname: "GestorAutonomico" },
      { content: "Importante considerar las peculiaridades de cada territorio.", nickname: "ExpertoTerritorial" }
    ],
    Sanidad: [
      { content: "La centralización de compras ha demostrado ser efectiva en otros países.", nickname: "GestorSanitario" },
      { content: "Fundamental mantener la calidad asistencial durante la transición.", nickname: "MedicoGestor" }
    ]
  },
  municipal: {
    Administración: [
      { content: "La fusión de servicios debe respetar la identidad local.", nickname: "SecretarioMunicipal" },
      { content: "Los servicios mancomunados han demostrado ser muy eficientes.", nickname: "GestorLocal" }
    ],
    Tecnología: [
      { content: "La digitalización debe considerar la brecha digital en zonas rurales.", nickname: "TecnicoMunicipal" },
      { content: "Importante incluir formación para empleados y ciudadanos.", nickname: "ExpertoDigital" }
    ]
  }
};

export async function scheduleAutomaticComments(proposalId: string, level: string, category: string) {
  try {
    // Obtener plantillas relevantes
    const templates = commentTemplates[level]?.[category] || commentTemplates[level]?.Administración || [];
    if (templates.length === 0) return;

    // Programar 12 comentarios, uno cada hora
    for (let hour = 1; hour <= 12; hour++) {
      const template = templates[Math.floor(Math.random() * templates.length)];
      const scheduledTime = new Date(Date.now() + hour * 60 * 60 * 1000);

      // Insertar comentario programado
      await supabase
        .from('scheduled_comments')
        .insert({
          proposal_id: proposalId,
          content: template.content,
          nickname: template.nickname,
          scheduled_for: scheduledTime.toISOString()
        });
    }
  } catch (error) {
    console.error('Error scheduling comments:', error);
  }
}

export async function processScheduledComments() {
  try {
    const now = new Date().toISOString();
    
    // Obtener comentarios programados pendientes
    const { data: scheduledComments, error: fetchError } = await supabase
      .from('scheduled_comments')
      .select('*')
      .lte('scheduled_for', now)
      .eq('processed', false);

    if (fetchError) throw fetchError;
    if (!scheduledComments?.length) return;

    // Procesar cada comentario programado
    for (const comment of scheduledComments) {
      // Insertar el comentario
      const { error: insertError } = await supabase
        .from('comments')
        .insert({
          proposal_id: comment.proposal_id,
          content: comment.content,
          nickname: comment.nickname
        });

      if (insertError) {
        console.error('Error inserting comment:', insertError);
        continue;
      }

      // Marcar como procesado
      await supabase
        .from('scheduled_comments')
        .update({ processed: true })
        .eq('id', comment.id);
    }
  } catch (error) {
    console.error('Error processing scheduled comments:', error);
  }
}

// Iniciar el procesamiento periódico de comentarios
setInterval(processScheduledComments, 5 * 60 * 1000); // Cada 5 minutos