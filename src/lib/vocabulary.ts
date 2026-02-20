import type { SignWord } from '@/types'

export const KSL_VOCABULARY: SignWord[] = [
  // Greetings & Basics (10)
  { id: '1', word: 'hello', videoUrl: '/videos/hello.mp4', category: 'greeting' },
  { id: '2', word: 'thank you', videoUrl: '/videos/thank-you.mp4', category: 'greeting' },
  { id: '3', word: 'please', videoUrl: '/videos/please.mp4', category: 'greeting' },
  { id: '4', word: 'sorry', videoUrl: '/videos/sorry.mp4', category: 'greeting' },
  { id: '5', word: 'yes', videoUrl: '/videos/yes.mp4', category: 'greeting' },
  { id: '6', word: 'no', videoUrl: '/videos/no.mp4', category: 'greeting' },
  { id: '7', word: 'good morning', videoUrl: '/videos/good-morning.mp4', category: 'greeting' },
  { id: '8', word: 'good afternoon', videoUrl: '/videos/good-afternoon.mp4', category: 'greeting' },
  { id: '9', word: 'good evening', videoUrl: '/videos/good-evening.mp4', category: 'greeting' },
  { id: '10', word: 'goodbye', videoUrl: '/videos/goodbye.mp4', category: 'greeting' },

  // Questions (8)
  { id: '11', word: 'what', videoUrl: '/videos/what.mp4', category: 'question' },
  { id: '12', word: 'where', videoUrl: '/videos/where.mp4', category: 'question' },
  { id: '13', word: 'when', videoUrl: '/videos/when.mp4', category: 'question' },
  { id: '14', word: 'why', videoUrl: '/videos/why.mp4', category: 'question' },
  { id: '15', word: 'who', videoUrl: '/videos/who.mp4', category: 'question' },
  { id: '16', word: 'how', videoUrl: '/videos/how.mp4', category: 'question' },
  { id: '17', word: 'how much', videoUrl: '/videos/how-much.mp4', category: 'question' },
  { id: '18', word: 'how many', videoUrl: '/videos/how-many.mp4', category: 'question' },

  // Common Verbs (12)
  { id: '19', word: 'want', videoUrl: '/videos/want.mp4', category: 'verb' },
  { id: '20', word: 'need', videoUrl: '/videos/need.mp4', category: 'verb' },
  { id: '21', word: 'have', videoUrl: '/videos/have.mp4', category: 'verb' },
  { id: '22', word: 'go', videoUrl: '/videos/go.mp4', category: 'verb' },
  { id: '23', word: 'come', videoUrl: '/videos/come.mp4', category: 'verb' },
  { id: '24', word: 'eat', videoUrl: '/videos/eat.mp4', category: 'verb' },
  { id: '25', word: 'drink', videoUrl: '/videos/drink.mp4', category: 'verb' },
  { id: '26', word: 'sleep', videoUrl: '/videos/sleep.mp4', category: 'verb' },
  { id: '27', word: 'help', videoUrl: '/videos/help.mp4', category: 'verb' },
  { id: '28', word: 'understand', videoUrl: '/videos/understand.mp4', category: 'verb' },
  { id: '29', word: 'learn', videoUrl: '/videos/learn.mp4', category: 'verb' },
  { id: '30', word: 'work', videoUrl: '/videos/work.mp4', category: 'verb' },

  // People (6)
  { id: '31', word: 'I', videoUrl: '/videos/i.mp4', category: 'person' },
  { id: '32', word: 'you', videoUrl: '/videos/you.mp4', category: 'person' },
  { id: '33', word: 'he', videoUrl: '/videos/he.mp4', category: 'person' },
  { id: '34', word: 'she', videoUrl: '/videos/she.mp4', category: 'person' },
  { id: '35', word: 'we', videoUrl: '/videos/we.mp4', category: 'person' },
  { id: '36', word: 'they', videoUrl: '/videos/they.mp4', category: 'person' },

  // Time (6)
  { id: '37', word: 'now', videoUrl: '/videos/now.mp4', category: 'time' },
  { id: '38', word: 'later', videoUrl: '/videos/later.mp4', category: 'time' },
  { id: '39', word: 'today', videoUrl: '/videos/today.mp4', category: 'time' },
  { id: '40', word: 'tomorrow', videoUrl: '/videos/tomorrow.mp4', category: 'time' },
  { id: '41', word: 'yesterday', videoUrl: '/videos/yesterday.mp4', category: 'time' },
  { id: '42', word: 'always', videoUrl: '/videos/always.mp4', category: 'time' },

  // Common Objects (8)
  { id: '43', word: 'water', videoUrl: '/videos/water.mp4', category: 'object' },
  { id: '44', word: 'food', videoUrl: '/videos/food.mp4', category: 'object' },
  { id: '45', word: 'house', videoUrl: '/videos/house.mp4', category: 'object' },
  { id: '46', word: 'car', videoUrl: '/videos/car.mp4', category: 'object' },
  { id: '47', word: 'phone', videoUrl: '/videos/phone.mp4', category: 'object' },
  { id: '48', word: 'book', videoUrl: '/videos/book.mp4', category: 'object' },
  { id: '49', word: 'money', videoUrl: '/videos/money.mp4', category: 'object' },
  { id: '50', word: 'clothes', videoUrl: '/videos/clothes.mp4', category: 'object' },
]

/**
 * Search for sign words in the vocabulary
 * Performs case-insensitive word-by-word lookup
 */
export function translateText(text: string): { found: SignWord[]; notFound: string[] } {
  const words = text.toLowerCase().trim().split(/\s+/)

  const foundWords: SignWord[] = []
  const notFoundWords: string[] = []

  words.forEach((word) => {
    const match = KSL_VOCABULARY.find((v) => v.word === word)
    if (match) {
      foundWords.push(match)
    } else {
      notFoundWords.push(word)
    }
  })

  return { found: foundWords, notFound: notFoundWords }
}
