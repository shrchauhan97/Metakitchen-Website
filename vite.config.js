import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Capture prerendered HTML in-memory so we can guarantee the root index.html
// gets written — the rolldown plugin's behavior on Windows + ESM is to skip
// the `/` route output because of a bundle-key collision with index.html.
let capturedRoot = null

// On Vercel's Amazon Linux 2 build image, puppeteer's bundled Chromium fails
// to launch because libnspr4.so/libnss3.so aren't installed system-wide. We
// fall back to @sparticuz/chromium (which bundles every shared lib it needs)
// when the env signals serverless/CI, and let local dev use whatever puppeteer
// supplies. Toggle with VERCEL=1 (set automatically in Vercel build envs).
async function resolveChromium() {
  if (!process.env.VERCEL && !process.env.CI && !process.env.USE_SPARTICUZ) return null
  const { default: chromium } = await import('@sparticuz/chromium')
  return {
    executablePath: await chromium.executablePath(),
    args: chromium.args,
    headless: chromium.headless,
  }
}

const chromiumOverride = await resolveChromium()

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: [
        '/',
        '/our-bread',
        '/dr-aara',
        '/science',
        '/story',
        '/privacy',
        '/terms',
      ],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterTime: 3000,
        maxConcurrentRoutes: 2,
        headless: true,
        viewport: { width: 1280, height: 800 },
        ...(chromiumOverride
          ? {
              executablePath: chromiumOverride.executablePath,
              args: chromiumOverride.args,
            }
          : {}),
      },
      postProcess(renderedRoute) {
        renderedRoute.route = renderedRoute.originalRoute
        const r = renderedRoute.route === '/' ? '' : renderedRoute.route.replace(/^\//, '')
        renderedRoute.outputPath = r ? `${r}/index.html` : 'index.html'
        if (renderedRoute.route === '/') {
          capturedRoot = renderedRoute.html
        }
        return renderedRoute
      },
    }),
    {
      name: 'write-root-index',
      apply: 'build',
      closeBundle: {
        order: 'post',
        sequential: true,
        handler() {
          const out = path.join(__dirname, 'dist', 'index.html')
          if (capturedRoot && !fs.existsSync(out)) {
            fs.writeFileSync(out, capturedRoot.trim())
          }
        },
      },
    },
  ],
})
