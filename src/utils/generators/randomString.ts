export type CharacterSet = 'alphanumeric' | 'lowercase' | 'uppercase' | 'numbers' | 'symbols'

export interface RandomStringOptions {
  length: number
  quantity: number
  characterSets: CharacterSet[]
  excludeAmbiguous: boolean
}

export interface Preset {
  name: string
  options: Partial<RandomStringOptions>
}

const CHARACTER_SETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const

const AMBIGUOUS_CHARACTERS = '0O1lI'

export function getCharacterPool(options: RandomStringOptions): string {
  let pool = ''

  // Add characters based on selected sets
  if (options.characterSets.includes('alphanumeric')) {
    pool += CHARACTER_SETS.lowercase + CHARACTER_SETS.uppercase + CHARACTER_SETS.numbers
  } else {
    if (options.characterSets.includes('lowercase')) {
      pool += CHARACTER_SETS.lowercase
    }
    if (options.characterSets.includes('uppercase')) {
      pool += CHARACTER_SETS.uppercase
    }
    if (options.characterSets.includes('numbers')) {
      pool += CHARACTER_SETS.numbers
    }
  }

  if (options.characterSets.includes('symbols')) {
    pool += CHARACTER_SETS.symbols
  }

  // Remove duplicates
  pool = [...new Set(pool)].join('')

  // Remove ambiguous characters if requested
  if (options.excludeAmbiguous) {
    pool = pool.split('').filter(char => !AMBIGUOUS_CHARACTERS.includes(char)).join('')
  }

  return pool
}

export function generateRandomString(length: number, characterPool: string): string {
  if (!characterPool) {
    throw new Error('Character pool cannot be empty')
  }

  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length)
    result += characterPool[randomIndex]
  }
  return result
}

export function generateRandomStrings(options: RandomStringOptions): string[] {
  const characterPool = getCharacterPool(options)
  
  if (!characterPool) {
    throw new Error('No character sets selected or custom characters provided')
  }

  const results: string[] = []
  for (let i = 0; i < options.quantity; i++) {
    results.push(generateRandomString(options.length, characterPool))
  }
  
  return results
}

export const PRESETS: Preset[] = [
  {
    name: 'password',
    options: {
      length: 16,
      quantity: 1,
      characterSets: ['alphanumeric', 'symbols'],
      excludeAmbiguous: true,
    },
  },
  {
    name: 'identifier',
    options: {
      length: 8,
      quantity: 1,
      characterSets: ['alphanumeric'],
      excludeAmbiguous: true,
    },
  },
  {
    name: 'token',
    options: {
      length: 32,
      quantity: 1,
      characterSets: ['alphanumeric'],
      excludeAmbiguous: false,
    },
  },
]