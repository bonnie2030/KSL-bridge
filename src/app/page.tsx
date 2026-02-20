'use client'

import { useState } from 'react'
import VideoPlayer from '@/components/VideoPlayer'
import { translateText } from '@/lib/vocabulary'
import type { SignWord } from '@/types'

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [translatedVideos, setTranslatedVideos] = useState<SignWord[]>([])
  const [notFoundWords, setNotFoundWords] = useState<string[]>([])
  const [hasTranslated, setHasTranslated] = useState(false)

  const handleTranslate = () => {
    if (!inputText.trim()) {
      setTranslatedVideos([])
      setNotFoundWords([])
      setHasTranslated(false)
      return
    }

    const { found, notFound } = translateText(inputText)
    setTranslatedVideos(found)
    setNotFoundWords(notFound)
    setHasTranslated(true)
  }

  const handleClear = () => {
    setInputText('')
    setTranslatedVideos([])
    setNotFoundWords([])
    setHasTranslated(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleTranslate()
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-responsive">
        {/* Header */}
        <header className="text-center pt-12 md:pt-16 pb-8 md:pb-12">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white text-xs font-bold uppercase tracking-widest">
              ✨ Kenyan Sign Language
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-purple-100 to-cyan-200 mb-4 leading-tight">
            KSL Translator
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto font-light">
            Transform written words into beautiful sign language videos, bringing accessibility to Kenya
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 py-8 md:py-12">
          {/* Left Column - Input Section */}
          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-300">
              <label
                htmlFor="input-text"
                className="block text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cyan-200 mb-4 uppercase tracking-wider"
              >
                📝 Your Message
              </label>
              <textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... (e.g., 'hello thank you')"
                className="w-full h-40 p-5 bg-slate-800/50 border-2 border-purple-400/30 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 resize-none text-white placeholder-gray-400 text-base font-medium transition-all duration-300 hover:border-purple-400/50"
              />
              <p className="text-xs text-gray-400 mt-3 font-medium">
                💡 Tip: Press <kbd className="bg-purple-500/30 px-2 py-1 rounded border border-purple-400 text-purple-200">Ctrl+Enter</kbd> to translate
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 flex-col sm:flex-row">
              <button
                onClick={handleTranslate}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl active:scale-95 uppercase tracking-wider text-sm"
              >
                🎬 Translate
              </button>
              <button
                onClick={handleClear}
                className="flex-1 px-6 py-4 bg-slate-700/50 text-gray-200 font-bold rounded-xl hover:bg-slate-700 border border-slate-600 transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-wider text-sm"
              >
                🔄 Clear
              </button>
            </div>
          </div>

          {/* Right Column - Video Player Section */}
          <div className="space-y-6">
            {hasTranslated ? (
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cyan-200 mb-6 flex items-center gap-2">
                  🎥 Sign Language Video
                </h2>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <VideoPlayer videos={translatedVideos} />
                </div>

                {/* Messages for not found words */}
                {notFoundWords.length > 0 && (
                  <div className="mt-6 p-4 bg-amber-500/20 border border-amber-400/50 rounded-xl backdrop-blur-sm">
                    <p className="text-sm font-bold text-amber-200 mb-2">
                      ⚠️ Words not in vocabulary:
                    </p>
                    <p className="text-sm text-amber-100">
                      <span className="font-mono bg-slate-800/50 px-2 py-1 rounded">
                        {notFoundWords.join(', ')}
                      </span>
                    </p>
                  </div>
                )}

                {/* Empty state message */}
                {translatedVideos.length === 0 && notFoundWords.length > 0 && (
                  <div className="mt-6 p-6 bg-orange-500/20 border border-orange-400/50 rounded-xl backdrop-blur-sm text-center">
                    <p className="text-sm text-orange-100 font-medium">
                      😊 None of those words are in our vocabulary yet. Try other words!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-12 shadow-2xl flex items-center justify-center min-h-96">
                <div className="text-center">
                  <div className="text-6xl mb-4">👋</div>
                  <p className="text-gray-300 text-lg font-medium">
                    Enter text and click <span className="text-cyan-200 font-bold">"Translate"</span>
                  </p>
                  <p className="text-gray-400 text-sm mt-2">to see sign language videos</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vocabulary Info */}
        <section className="py-12 md:py-16">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 md:p-10 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-cyan-200 mb-8">
              📚 Supported Vocabulary (50 Words)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Greetings */}
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-400/30 rounded-xl p-6 hover:border-purple-400/60 transition-all duration-300">
                <h3 className="font-bold text-purple-200 text-lg mb-3 flex items-center gap-2">
                  👋 Greetings & Basics
                </h3>
                <ul className="text-sm text-gray-300 space-y-2 font-medium">
                  <li>• hello, thank you, please, sorry</li>
                  <li>• yes, no, good morning, good afternoon</li>
                  <li>• good evening, goodbye</li>
                </ul>
              </div>

              {/* Questions */}
              <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-400/30 rounded-xl p-6 hover:border-cyan-400/60 transition-all duration-300">
                <h3 className="font-bold text-cyan-200 text-lg mb-3 flex items-center gap-2">
                  ❓ Questions
                </h3>
                <ul className="text-sm text-gray-300 space-y-2 font-medium">
                  <li>• what, where, when, why</li>
                  <li>• who, how, how much</li>
                  <li>• how many</li>
                </ul>
              </div>

              {/* Verbs */}
              <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 border border-indigo-400/30 rounded-xl p-6 hover:border-indigo-400/60 transition-all duration-300">
                <h3 className="font-bold text-indigo-200 text-lg mb-3 flex items-center gap-2">
                  💪 Common Verbs
                </h3>
                <ul className="text-sm text-gray-300 space-y-2 font-medium">
                  <li>• want, need, have, go, come</li>
                  <li>• eat, drink, sleep, help</li>
                  <li>• understand, learn, work</li>
                </ul>
              </div>

              {/* People */}
              <div className="bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-400/30 rounded-xl p-6 hover:border-rose-400/60 transition-all duration-300">
                <h3 className="font-bold text-rose-200 text-lg mb-3 flex items-center gap-2">
                  👥 People & Pronouns
                </h3>
                <ul className="text-sm text-gray-300 space-y-2 font-medium">
                  <li>• I, you, he, she</li>
                  <li>• we, they</li>
                </ul>
              </div>

              {/* Time */}
              <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-400/30 rounded-xl p-6 hover:border-amber-400/60 transition-all duration-300">
                <h3 className="font-bold text-amber-200 text-lg mb-3 flex items-center gap-2">
                  ⏰ Time
                </h3>
                <ul className="text-sm text-gray-300 space-y-2 font-medium">
                  <li>• now, later, today</li>
                  <li>• tomorrow, yesterday</li>
                  <li>• always</li>
                </ul>
              </div>

              {/* Objects */}
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-400/30 rounded-xl p-6 hover:border-emerald-400/60 transition-all duration-300">
                <h3 className="font-bold text-emerald-200 text-lg mb-3 flex items-center gap-2">
                  🏠 Common Objects
                </h3>
                <ul className="text-sm text-gray-300 space-y-2 font-medium">
                  <li>• water, food, house, car</li>
                  <li>• phone, book, money</li>
                  <li>• clothes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-400 text-sm font-medium">
          <p>✨ Making sign language accessible to all • Proudly built for Kenya 🇰🇪</p>
        </footer>
      </div>
    </main>
  )
}
