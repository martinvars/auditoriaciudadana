// Simple profanity filter implementation
class ProfanityFilter {
  private badWords: Set<string>;
  private substitutions: { [key: string]: string[] };

  constructor() {
    // Lista básica de palabras inapropiadas en español
    this.badWords = new Set([
      'puta', 'puto', 'mierda', 'joder', 'coño', 'cojones',
      'cabron', 'cabrón', 'gilipollas', 'subnormal', 'maricon',
      'maricón', 'hijoputa', 'hijodeputa', 'polla', 'cagar',
      'follar', 'idiota', 'imbecil', 'imbécil', 'retrasado',
      'mongolo', 'mongólico', 'nazi', 'facha', 'perra', 'zorra'
    ]);

    // Common character substitutions
    this.substitutions = {
      'a': ['a', '@', '4', 'á', 'à', 'ä'],
      'e': ['e', '3', 'é', 'è', 'ë'],
      'i': ['i', '1', '!', 'í', 'ì', 'ï'],
      'o': ['o', '0', 'ó', 'ò', 'ö'],
      'u': ['u', 'ú', 'ù', 'ü'],
      's': ['s', '$', '5', 'z'],
      'l': ['l', '1', '|'],
      't': ['t', '7', '+']
    };
  }

  public hasProfanity(text: string): boolean {
    if (!text) return false;

    const normalized = this.normalizeText(text);
    const words = normalized.split(/\s+/);

    // Check each word
    for (const word of words) {
      // Direct match
      if (this.badWords.has(word)) {
        return true;
      }

      // Check for l33t speak and substitutions
      const variations = this.generateVariations(word);
      for (const variation of variations) {
        if (this.badWords.has(variation)) {
          return true;
        }
      }

      // Check for words split by special characters
      const withoutSpecialChars = word.replace(/[^a-z0-9]/g, '');
      if (this.badWords.has(withoutSpecialChars)) {
        return true;
      }
    }

    // Check for words split across spaces
    const withoutSpaces = normalized.replace(/\s+/g, '');
    for (const badWord of this.badWords) {
      if (withoutSpaces.includes(badWord)) {
        return true;
      }
    }

    return false;
  }

  private normalizeText(text: string): string {
    return text.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, '');
  }

  private generateVariations(word: string): string[] {
    const variations = new Set<string>();
    variations.add(word);

    // Generate variations with common substitutions
    for (const [char, subs] of Object.entries(this.substitutions)) {
      const currentVariations = [...variations];
      for (const variation of currentVariations) {
        if (variation.includes(char)) {
          for (const sub of subs) {
            variations.add(variation.replace(new RegExp(char, 'g'), sub));
          }
        }
      }
    }

    return Array.from(variations);
  }
}

export const profanityFilter = new ProfanityFilter();