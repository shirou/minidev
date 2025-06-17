/**
 * Lorem Ipsum text generation utility functions
 */

export interface LoremIpsumResult {
  success: boolean
  result?: string
  error?: string
}

// Standard Lorem Ipsum words
const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
  'accusamus', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem',
  'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis',
  'et', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'sunt', 'explicabo',
  'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit', 'fugit',
  'sed', 'quia', 'consequuntur', 'magni', 'dolores', 'ratione', 'sequi',
  'nesciunt', 'neque', 'porro', 'quisquam', 'dolorem', 'adipisci', 'numquam',
  'eius', 'modi', 'tempora', 'incidunt', 'magnam', 'quaerat', 'voluptatem',
  'fuga', 'harum', 'quidem', 'rerum', 'facilis', 'expedita', 'distinctio',
  'nam', 'libero', 'tempore', 'cum', 'soluta', 'nobis', 'eligendi', 'optio',
  'cumque', 'nihil', 'impedit', 'quo', 'minus', 'maxime', 'placeat', 'facere',
  'possimus', 'omnis', 'assumenda', 'repellendus', 'temporibus', 'autem',
  'quibusdam', 'officiis', 'debitis', 'necessitatibus', 'saepe', 'eveniet',
  'voluptates', 'repudiandae', 'recusandae', 'itaque', 'earum', 'hic',
  'tenetur', 'sapiente', 'delectus', 'reiciendis', 'maiores', 'alias',
  'perferendis', 'doloribus', 'asperiores', 'repellat'
]

/**
 * Generate Lorem Ipsum words
 */
export function generateWords(count: number, startWithLorem: boolean = true): LoremIpsumResult {
  try {
    if (count <= 0) {
      return {
        success: false,
        error: 'Word count must be greater than 0'
      }
    }

    if (count > 10000) {
      return {
        success: false,
        error: 'Word count cannot exceed 10,000'
      }
    }

    const words: string[] = []
    
    // Start with "Lorem ipsum" if requested and count >= 2
    if (startWithLorem && count >= 2) {
      words.push('Lorem', 'ipsum')
      count -= 2
    } else if (startWithLorem && count === 1) {
      words.push('Lorem')
      count = 0
    }

    // Generate remaining words
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * LOREM_WORDS.length)
      words.push(LOREM_WORDS[randomIndex])
    }

    return {
      success: true,
      result: words.join(' ')
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Generation failed'
    }
  }
}

/**
 * Generate Lorem Ipsum sentences
 */
export function generateSentences(count: number, startWithLorem: boolean = true): LoremIpsumResult {
  try {
    if (count <= 0) {
      return {
        success: false,
        error: 'Sentence count must be greater than 0'
      }
    }

    if (count > 1000) {
      return {
        success: false,
        error: 'Sentence count cannot exceed 1,000'
      }
    }

    const sentences: string[] = []

    for (let i = 0; i < count; i++) {
      // Generate 8-20 words per sentence
      const wordCount = Math.floor(Math.random() * 13) + 8
      const wordsResult = generateWords(wordCount, startWithLorem && i === 0)
      
      if (!wordsResult.success || !wordsResult.result) {
        return {
          success: false,
          error: 'Failed to generate sentence words'
        }
      }

      // Capitalize first letter and add period
      const sentence = wordsResult.result.charAt(0).toUpperCase() + 
                     wordsResult.result.slice(1) + '.'
      
      sentences.push(sentence)
    }

    return {
      success: true,
      result: sentences.join(' ')
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Generation failed'
    }
  }
}

/**
 * Generate Lorem Ipsum paragraphs
 */
export function generateParagraphs(count: number, startWithLorem: boolean = true): LoremIpsumResult {
  try {
    if (count <= 0) {
      return {
        success: false,
        error: 'Paragraph count must be greater than 0'
      }
    }

    if (count > 100) {
      return {
        success: false,
        error: 'Paragraph count cannot exceed 100'
      }
    }

    const paragraphs: string[] = []

    for (let i = 0; i < count; i++) {
      // Generate 3-8 sentences per paragraph
      const sentenceCount = Math.floor(Math.random() * 6) + 3
      const sentencesResult = generateSentences(sentenceCount, startWithLorem && i === 0)
      
      if (!sentencesResult.success || !sentencesResult.result) {
        return {
          success: false,
          error: 'Failed to generate paragraph sentences'
        }
      }

      paragraphs.push(sentencesResult.result)
    }

    return {
      success: true,
      result: paragraphs.join('\n\n')
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Generation failed'
    }
  }
}

/**
 * Generate Lorem Ipsum bytes (approximately)
 */
export function generateBytes(byteCount: number, startWithLorem: boolean = true): LoremIpsumResult {
  try {
    if (byteCount <= 0) {
      return {
        success: false,
        error: 'Byte count must be greater than 0'
      }
    }

    if (byteCount > 1000000) { // 1MB limit
      return {
        success: false,
        error: 'Byte count cannot exceed 1,000,000'
      }
    }

    // Start with some text
    let text = ''
    let currentLength = 0

    // Generate words until we reach the desired byte count
    while (currentLength < byteCount) {
      const remainingBytes = byteCount - currentLength
      const estimatedWords = Math.max(1, Math.floor(remainingBytes / 6)) // Average word length ~6 chars
      
      const wordsResult = generateWords(
        Math.min(estimatedWords, 100), 
        startWithLorem && text === ''
      )
      
      if (!wordsResult.success || !wordsResult.result) {
        break
      }

      if (text) {
        text += ' ' + wordsResult.result
      } else {
        text = wordsResult.result
      }
      
      currentLength = new Blob([text]).size
    }

    // Trim to exact byte count if needed
    while (new Blob([text]).size > byteCount && text.length > 0) {
      text = text.slice(0, -1)
    }

    return {
      success: true,
      result: text
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Generation failed'
    }
  }
}

/**
 * Get statistics about generated text
 */
export function getTextStats(text: string): {
  characters: number
  charactersNoSpaces: number
  words: number
  sentences: number
  paragraphs: number
  bytes: number
} {
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
  const bytes = new Blob([text]).size

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    bytes
  }
}