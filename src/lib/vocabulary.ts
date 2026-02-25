import rawDictionary from '@/data/ksl-dictionary.json'
import type { KSLDictionaryEntry, LookupResult } from '@/types'

export const KSL_DICTIONARY = rawDictionary as KSLDictionaryEntry[]

const normalizeText = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()

type PhraseIndex = {
  phraseMap: Map<string, KSLDictionaryEntry>
  maxWords: number
}

const buildIndexes = (entries: KSLDictionaryEntry[]) => {
  const singleWordMap = new Map<string, KSLDictionaryEntry>()
  const phraseMap = new Map<string, KSLDictionaryEntry>()
  let maxWords = 1

  entries.forEach((entry) => {
    const forms = [entry.word, ...entry.alternativeForms].map(normalizeText).filter(Boolean)

    forms.forEach((form) => {
      const wordCount = form.split(' ').length
      maxWords = Math.max(maxWords, wordCount)

      if (wordCount > 1) {
        phraseMap.set(form, entry)
      } else {
        singleWordMap.set(form, entry)
      }
    })
  })

  return {
    singleWordMap,
    phraseIndex: { phraseMap, maxWords } as PhraseIndex,
  }
}

const { singleWordMap, phraseIndex } = buildIndexes(KSL_DICTIONARY)

export function lookupWords(sentence: string): LookupResult {
  const cleanedSentence = normalizeText(sentence)

  if (!cleanedSentence) {
    return {
      matchedEntries: [],
      videoFiles: [],
      missingWords: [],
    }
  }

  const tokens = cleanedSentence.split(' ')
  const matchedEntries: KSLDictionaryEntry[] = []
  const missingWords: string[] = []

  let index = 0
  while (index < tokens.length) {
    let phraseMatch: KSLDictionaryEntry | null = null
    let matchedLength = 0

    for (let size = Math.min(phraseIndex.maxWords, tokens.length - index); size > 1; size -= 1) {
      const candidatePhrase = tokens.slice(index, index + size).join(' ')
      const candidateMatch = phraseIndex.phraseMap.get(candidatePhrase)

      if (candidateMatch) {
        phraseMatch = candidateMatch
        matchedLength = size
        break
      }
    }

    if (phraseMatch) {
      matchedEntries.push(phraseMatch)
      index += matchedLength
      continue
    }

    const token = tokens[index]
    const singleMatch = singleWordMap.get(token)

    if (singleMatch) {
      matchedEntries.push(singleMatch)
    } else {
      missingWords.push(token)
    }

    index += 1
  }

  return {
    matchedEntries,
    videoFiles: matchedEntries.map((entry) => entry.videoFile),
    missingWords: [...new Set(missingWords)],
  }
}
