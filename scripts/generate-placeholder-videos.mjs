import fs from 'node:fs/promises'
import path from 'node:path'
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'

const ROOT_DIR = process.cwd()
const DICTIONARY_PATH = path.join(ROOT_DIR, 'src', 'data', 'ksl-dictionary.json')
const OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'videos')

ffmpeg.setFfmpegPath(ffmpegInstaller.path)

const sanitizeText = (value) => value.replace(/[^a-zA-Z0-9\s\-]/g, ' ').replace(/\s+/g, ' ').trim()

const renderPlaceholder = ({ outputFile, text }) =>
  new Promise((resolve, reject) => {
    ffmpeg()
      .input('color=c=0x0f172a:s=1280x720:d=1.8:r=30')
      .inputFormat('lavfi')
      .videoFilter([
        "drawbox=x=0:y=0:w=iw:h=120:color=0x0ea5e9@0.35:t=fill",
        "drawbox=x=0:y=ih-130:w=iw:h=130:color=0x8b5cf6@0.35:t=fill",
        `drawtext=fontfile='C\\:/Windows/Fonts/arialbd.ttf':text='KSL BRIDGE':fontcolor=white:fontsize=54:x=(w-text_w)/2:y=28`,
        `drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':text='${text}':fontcolor=white:fontsize=68:x=(w-text_w)/2:y=(h-text_h)/2`,
        "drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':text='Placeholder Clip':fontcolor=0xbfe9ff:fontsize=36:x=(w-text_w)/2:y=h-92",
      ])
      .outputOptions(['-pix_fmt yuv420p', '-movflags +faststart', '-c:v libx264', '-preset veryfast'])
      .duration(1.8)
      .save(outputFile)
      .on('end', resolve)
      .on('error', reject)
  })

const run = async () => {
  const dictionaryRaw = await fs.readFile(DICTIONARY_PATH, 'utf8')
  const entries = JSON.parse(dictionaryRaw)

  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index]
    const outputFile = path.join(OUTPUT_DIR, entry.videoFile)
    const wordText = sanitizeText(entry.word.toUpperCase())

    await renderPlaceholder({ outputFile, text: wordText })
    console.log(`[${index + 1}/${entries.length}] Generated ${entry.videoFile}`)
  }

  console.log(`\nCreated ${entries.length} placeholder videos in public/videos`)
}

run().catch((error) => {
  console.error('Failed to generate placeholder videos:', error)
  process.exit(1)
})
