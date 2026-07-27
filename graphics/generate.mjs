// Genera piezas gráficas (PDF) a partir de la estética de calfpay.ar.
//
// Cada archivo en pieces/*.mjs exporta { width, height, render() } — width y
// height en pt, render() devuelve el HTML completo de la pieza (ya con los
// tokens de marca inyectados desde lib/brand.mjs). Este script abre cada
// pieza en Chromium (Playwright) y la exporta a PDF a tamaño exacto.
//
// Uso:
//   node generate.mjs            → genera todas las piezas de pieces/
//   node generate.mjs <nombre>   → genera solo pieces/<nombre>.mjs

import { chromium } from 'playwright';
import { readdirSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const piecesDir = path.join(__dirname, 'pieces');
const outputDir = path.join(__dirname, 'output');

mkdirSync(outputDir, { recursive: true });

const filter = process.argv[2];
const files = readdirSync(piecesDir)
  .filter((f) => f.endsWith('.mjs'))
  .filter((f) => !filter || f === `${filter}.mjs`);

if (files.length === 0) {
  console.error(filter ? `No existe pieces/${filter}.mjs` : 'No hay piezas en pieces/');
  process.exit(1);
}

const browser = await chromium.launch();
try {
  for (const file of files) {
    const modUrl = pathToFileURL(path.join(piecesDir, file)).href;
    const piece = await import(modUrl);
    const name = file.replace(/\.mjs$/, '');

    const page = await browser.newPage();
    await page.setContent(piece.render(), { waitUntil: 'networkidle' });

    const outPath = path.join(outputDir, `${name}.pdf`);
    // preferCSSPageSize respeta el @page{size:...} definido en el <style> de
    // la pieza (en pt nativo) en vez de convertir width/height a pulgadas acá,
    // lo que evitaba errores de redondeo y garantiza el tamaño exacto en pt.
    await page.pdf({
      path: outPath,
      preferCSSPageSize: true,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    await page.close();

    console.log(`✔ ${name}.pdf  (${piece.width}×${piece.height}pt)`);
  }
} finally {
  await browser.close();
}
