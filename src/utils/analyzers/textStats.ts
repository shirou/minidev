/**
 * Text analysis and statistics utility functions
 */

export interface TextStats {
  characters: number
  charactersNoSpaces: number
  charactersNoSpacesNoPunctuation: number
  words: number
  sentences: number
  paragraphs: number
  lines: number
  bytes: number
  readingTime: number // in minutes
  speakingTime: number // in minutes
  mostFrequentWords: Array<{ word: string; count: number }>
  averageWordsPerSentence: number
  averageSentencesPerParagraph: number
  longestWord: string
  shortestWord: string
}

/**
 * Analyze text and return comprehensive statistics
 */
export function analyzeText(text: string): TextStats {
  if (!text || text.trim() === '') {
    return getEmptyStats()
  }

  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const charactersNoSpacesNoPunctuation = text.replace(/\s/g, '').replace(/[^\w]/g, '').length
  
  // Count lines
  const lines = text.split('\n').length
  
  // Count paragraphs (separated by blank lines)
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter(paragraph => paragraph.trim().length > 0).length || 1
  
  // Count words
  const wordMatches = text.match(/\b\w+\b/g)
  const words = wordMatches ? wordMatches.length : 0
  const wordList = wordMatches ? wordMatches.map(word => word.toLowerCase()) : []
  
  // Count sentences
  const sentenceMatches = text.match(/[.!?]+/g)
  const sentences = sentenceMatches ? sentenceMatches.length : (words > 0 ? 1 : 0)
  
  // Calculate bytes
  const bytes = new Blob([text]).size
  
  // Calculate reading time (average 200 words per minute)
  const readingTime = words / 200
  
  // Calculate speaking time (average 150 words per minute)
  const speakingTime = words / 150
  
  // Find most frequent words
  const mostFrequentWords = getMostFrequentWords(wordList)
  
  // Calculate averages
  const averageWordsPerSentence = sentences > 0 ? words / sentences : 0
  const averageSentencesPerParagraph = paragraphs > 0 ? sentences / paragraphs : 0
  
  // Find longest and shortest words
  const { longestWord, shortestWord } = getLongestAndShortestWords(wordList)
  
  return {
    characters,
    charactersNoSpaces,
    charactersNoSpacesNoPunctuation,
    words,
    sentences,
    paragraphs,
    lines,
    bytes,
    readingTime,
    speakingTime,
    mostFrequentWords,
    averageWordsPerSentence,
    averageSentencesPerParagraph,
    longestWord,
    shortestWord
  }
}

/**
 * Get empty statistics object
 */
function getEmptyStats(): TextStats {
  return {
    characters: 0,
    charactersNoSpaces: 0,
    charactersNoSpacesNoPunctuation: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    bytes: 0,
    readingTime: 0,
    speakingTime: 0,
    mostFrequentWords: [],
    averageWordsPerSentence: 0,
    averageSentencesPerParagraph: 0,
    longestWord: '',
    shortestWord: ''
  }
}

/**
 * Get most frequent words from word list
 */
function getMostFrequentWords(wordList: string[]): Array<{ word: string; count: number }> {
  // Common words to exclude from frequency analysis
  const commonWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for',
    'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his',
    'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my',
    'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if',
    'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like',
    'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year',
    'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then',
    'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back',
    'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
    'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
  ])
  
  const wordCount: Record<string, number> = {}
  
  wordList.forEach(word => {
    if (word.length > 2 && !commonWords.has(word)) {
      wordCount[word] = (wordCount[word] || 0) + 1
    }
  })
  
  return Object.entries(wordCount)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 most frequent words
}

/**
 * Find longest and shortest words
 */
function getLongestAndShortestWords(wordList: string[]): { longestWord: string; shortestWord: string } {
  if (wordList.length === 0) {
    return { longestWord: '', shortestWord: '' }
  }
  
  let longestWord = wordList[0]
  let shortestWord = wordList[0]
  
  wordList.forEach(word => {
    if (word.length > longestWord.length) {
      longestWord = word
    }
    if (word.length < shortestWord.length) {
      shortestWord = word
    }
  })
  
  return { longestWord, shortestWord }
}

/**
 * Get readability score (Flesch Reading Ease)
 */
export function getReadabilityScore(stats: TextStats): {
  score: number
  level: string
  description: string
} {
  if (stats.sentences === 0 || stats.words === 0) {
    return {
      score: 0,
      level: 'N/A',
      description: 'Insufficient text to calculate readability'
    }
  }
  
  // Simplified syllable count (approximate)
  const syllables = estimateSyllables(stats.words)
  
  // Flesch Reading Ease formula
  const score = 206.835 - (1.015 * stats.averageWordsPerSentence) - (84.6 * (syllables / stats.words))
  
  let level: string
  let description: string
  
  if (score >= 90) {
    level = 'Very Easy'
    description = '5th grade reading level'
  } else if (score >= 80) {
    level = 'Easy'
    description = '6th grade reading level'
  } else if (score >= 70) {
    level = 'Fairly Easy'
    description = '7th grade reading level'
  } else if (score >= 60) {
    level = 'Standard'
    description = '8th-9th grade reading level'
  } else if (score >= 50) {
    level = 'Fairly Difficult'
    description = '10th-12th grade reading level'
  } else if (score >= 30) {
    level = 'Difficult'
    description = 'College reading level'
  } else {
    level = 'Very Difficult'
    description = 'Graduate reading level'
  }
  
  return {
    score: Math.max(0, Math.min(100, score)),
    level,
    description
  }
}

/**
 * Estimate syllable count (rough approximation)
 */
function estimateSyllables(wordCount: number): number {
  // Average English word has about 1.4 syllables
  return Math.round(wordCount * 1.4)
}

/**
 * Format time duration in human-readable format
 */
export function formatTime(minutes: number): string {
  if (minutes < 1) {
    const seconds = Math.round(minutes * 60)
    return `${seconds} second${seconds !== 1 ? 's' : ''}`
  } else if (minutes < 60) {
    const mins = Math.round(minutes)
    return `${mins} minute${mins !== 1 ? 's' : ''}`
  } else {
    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)
    let result = `${hours} hour${hours !== 1 ? 's' : ''}`
    if (mins > 0) {
      result += ` ${mins} minute${mins !== 1 ? 's' : ''}`
    }
    return result
  }
}