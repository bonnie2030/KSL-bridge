export type KSLCategory = 'greeting' | 'question' | 'verb' | 'person' | 'time' | 'object'

export interface KSLDictionaryEntry {
  word: string
  videoFile: string
  category: KSLCategory
  alternativeForms: string[]
}

export interface LookupResult {
  matchedEntries: KSLDictionaryEntry[]
  videoFiles: string[]
  missingWords: string[]
}
