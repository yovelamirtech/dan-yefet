// Downloads the temporary development images listed in dan-yefet-plan.md (section 5)
// into public/images as WebP. Replace with Dan's high-res originals when they arrive.
import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import sharp from 'sharp'

const OUT = new URL('../public/images/', import.meta.url)

// Spotify covers: try the 640px variant (b273) first, fall back to the 192px one (aa54).
const cover = (id) => [`https://i.scdn.co/image/ab67616d0000b273${id}`, `https://i.scdn.co/image/ab67616d0000aa54${id}`]
const bitly = (id) => [`https://storage.googleapis.com/bitly-image-upload/${id}`]

const images = {
  'artist': ['https://i.scdn.co/image/ab6761610000e5eb2a04de4e1dc6a5f653bf362f'],
  'cover-hayav-laazov': cover('22dac95efdfce17403611726'),
  'cover-kolot': cover('122334b8fc6baea5d76b3dac'),
  'cover-adayin-rotze': cover('3e94b35d8932ef5aacee7f01'),
  'cover-hamedina': cover('c5b85670b935d59ed06b1884'),
  'cover-ep': cover('2203c64c659284c45d77e3a2'),
  'boat-banner': bitly('In66drWllKU'),
  'avatar': bitly('In66dyaN4S1'),
  'thumb-spotify': bitly('In5l7yByx1C'),
  'thumb-apple': bitly('Ip46e1bo4Kt'),
  'thumb-hasuf': bitly('In5l7ydomSm'),
  'thumb-whatsapp': bitly('In5l7QmcP0r'),
  'thumb-newsletter': bitly('In5l7YdhLY3'),
}

await mkdir(OUT, { recursive: true })
const force = process.argv.includes('--force')

for (const [name, urls] of Object.entries(images)) {
  const target = new URL(`${name}.webp`, OUT)
  if (existsSync(target) && !force) {
    console.log(`skip  ${name} (exists)`)
    continue
  }
  let done = false
  for (const url of urls) {
    const res = await fetch(url)
    if (!res.ok) {
      console.log(`miss  ${name} ${res.status} ${url}`)
      continue
    }
    const buf = Buffer.from(await res.arrayBuffer())
    const img = sharp(buf)
    const meta = await img.metadata()
    const webp = await img.resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toBuffer()
    await writeFile(target, webp)
    console.log(`ok    ${name} ${meta.width}x${meta.height} <- ${url}`)
    done = true
    break
  }
  if (!done) console.error(`FAIL  ${name}`)
}

// Derived assets from the paper-boat banner: Open Graph preview (WhatsApp/Facebook prefer
// JPEG at 1200x630) and the favicons. The banner background is navy #0B1C32.
const banner = new URL('boat-banner.webp', OUT).pathname
const NAVY = '#0B1C32'
if (existsSync(banner)) {
  const square = (size) => sharp(banner).resize(size, size, { fit: 'contain', background: NAVY })
  await sharp(banner).resize(1200, 630, { fit: 'contain', background: NAVY }).jpeg({ quality: 85 }).toFile(new URL('og-image.jpg', OUT).pathname)
  await square(64).png().toFile(new URL('../favicon.png', OUT).pathname)
  await square(180).png().toFile(new URL('../apple-touch-icon.png', OUT).pathname)
  await square(160).webp({ quality: 85 }).toFile(new URL('boat-mark.webp', OUT).pathname)
  console.log('ok    og-image.jpg, favicon.png, apple-touch-icon.png, boat-mark.webp')
}
