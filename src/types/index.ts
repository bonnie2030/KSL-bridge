export interface SignWord {
  id: string
  word: string
  videoUrl: string
  category: 'greeting' | 'question' | 'verb' | 'person' | 'time' | 'object'
}

export interface TranslationResult {
  words: SignWord[]
  notFound: string[]
}
