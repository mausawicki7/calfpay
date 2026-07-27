// Design tokens y fragmentos reutilizables, extraídos 1:1 de /index.html
// (mismos valores hex, mismo font stack, mismo logo) para que cualquier
// pieza gráfica generada acá se sienta parte del mismo sistema visual.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const tokens = {
  green: '#AEFF22',
  teal: '#00A5BB',
  bg: '#F5F5F5',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#878787',
  dark: '#0D0D0D',
  footerDark: '#080A0D',
  font: "'Space Grotesk', system-ui, sans-serif",
  fontHeading: "'Nohemi', 'Space Grotesk', system-ui, sans-serif",
  ease: 'cubic-bezier(.22,1,.36,1)',
};

// Nohemi — tipografía oficial de CalfPay para títulos. Cada pieza embebe
// sólo los pesos que efectivamente usa (como @font-face con data URI, ya
// que las piezas se renderizan como HTML standalone sin servidor detrás).
const nohemiDir = path.join(__dirname, '..', '..', 'fonts', 'nohemi');
const nohemiWeights = { 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold', 900: 'Black' };

export function nohemiFontFace(weights = [700, 800, 900]) {
  return weights
    .map((w) => {
      const file = nohemiWeights[w];
      const base64 = readFileSync(path.join(nohemiDir, `Nohemi-${file}.ttf`)).toString('base64');
      return `@font-face { font-family:'Nohemi'; font-weight:${w}; font-style:normal; src:url(data:font/ttf;base64,${base64}) format('truetype'); }`;
    })
    .join('\n');
}

// Logo oficial (mismo PNG que usa el sitio). El color version es 100% verde
// sobre transparente: sirve tal cual sobre fondos oscuros, y con
// filter:brightness(0) se vuelve negro puro para fondos claros.
const logoPath = path.join(__dirname, '..', '..', 'assets', 'calfpay-logo-color.png');
const logoBase64 = readFileSync(logoPath).toString('base64');
export const logoDataUri = `data:image/png;base64,${logoBase64}`;

export function logoImg({ height = 40, variant = 'green', className = '' } = {}) {
  const filter = variant === 'black' ? 'filter: brightness(0);' : '';
  return `<img src="${logoDataUri}" alt="CalfPay" class="${className}" style="height:${height}px;width:auto;display:block;${filter}" />`;
}

// Foto real de la tarjeta Mastercard prepaga (misma imagen que usa el sitio
// en "La tarjeta que no sabías que necesitabas") — para reforzar producto
// en el espacio muerto de las piezas, tal como hace .real-card-img.
const cardPath = path.join(__dirname, '..', '..', 'calf pay card.png');
const cardBase64 = readFileSync(cardPath).toString('base64');
export const cardDataUri = `data:image/png;base64,${cardBase64}`;

export function cardImg({ width = 260, rotate = -6 } = {}) {
  return `<img src="${cardDataUri}" alt="Tarjeta CalfPay Mastercard prepaga" style="
    width:${width}px; max-width:100%; border-radius:20px; display:block; margin:0 auto;
    transform:rotate(${rotate}deg);
    filter: drop-shadow(0 30px 50px rgba(0,0,0,.5));
  " />`;
}

// Placeholder de código QR — un marco glassmorphism (igual receta que
// .bento-card/.bc-dark: vidrio esmerilado + borde + glow orb) alrededor del
// recuadro blanco donde va el QR real, con las marcas de encuadre típicas
// de un lector para que se note que es un espacio reservado.
export function qrPlaceholder({ size = 260, label = 'QR acá', inline = false } = {}) {
  const pad = 22;
  const bracket = (top, left, borderStyle) => `
    <div aria-hidden="true" style="position:absolute; ${top} ${left} width:26px; height:26px; ${borderStyle}"></div>`;
  return `
    <div style="
      display:${inline ? 'inline-block' : 'block'}; position:relative; overflow:hidden;
      padding:${pad}px; border-radius:28px;
      background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.14);
    ">
      <div aria-hidden="true" style="
        position:absolute; top:-90px; left:-90px; width:220px; height:220px;
        border-radius:50%; pointer-events:none;
        background: radial-gradient(circle, rgba(174,255,34,.14) 0%, transparent 70%);
      "></div>
      <div style="
        position:relative; z-index:1;
        width:${size}px; height:${size}px;
        background:${tokens.white}; border-radius:16px;
        display:flex; align-items:center; justify-content:center;
      ">
        ${bracket('top:14px;', 'left:14px;', `border-top:4px solid ${tokens.dark}; border-left:4px solid ${tokens.dark}; border-radius:6px 0 0 0;`)}
        ${bracket('top:14px;', 'right:14px;', `border-top:4px solid ${tokens.dark}; border-right:4px solid ${tokens.dark}; border-radius:0 6px 0 0;`)}
        ${bracket('bottom:14px;', 'left:14px;', `border-bottom:4px solid ${tokens.dark}; border-left:4px solid ${tokens.dark}; border-radius:0 0 0 6px;`)}
        ${bracket('bottom:14px;', 'right:14px;', `border-bottom:4px solid ${tokens.dark}; border-right:4px solid ${tokens.dark}; border-radius:0 0 6px 0;`)}
        <span style="font-size:15px; font-weight:600; color:${tokens.gray}; letter-spacing:.02em;">${label}</span>
      </div>
    </div>`;
}

// Marca de agua decorativa — el mismo rombo del isotipo, hueco y muy sutil,
// para llenar de textura de marca los espacios en blanco sin competir con
// el contenido principal.
export function diamondWatermark({ size = 260, color = 'rgba(174,255,34,.10)' } = {}) {
  return `<div aria-hidden="true" style="
    position:absolute; width:${size}px; height:${size}px;
    border:2px solid ${color}; transform:rotate(45deg);
    pointer-events:none;
  "></div>`;
}

// Íconos App Store / Google Play, calcados del footer del sitio.
export const appleIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>`;

export const googlePlayIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.18 23.76c.3.17.64.24.99.19l12.48-7.34-2.79-2.79-10.68 9.94zM.58 1.1C.22 1.47 0 2.05 0 2.8v18.4c0 .75.22 1.33.58 1.7l.09.08 10.31-10.31v-.24L.67 1.02.58 1.1zM20.35 10.68l-2.92-1.72-3.1 3.1 3.1 3.1 2.95-1.73c.84-.49.84-1.3-.03-1.75zM3.18.24L15.66 7.58l-2.79 2.79L2.19.43c.29-.19.66-.25.99-.19z"/></svg>`;

// Botón "pill" de tienda, vidrio esmerilado — igual que .store-btn del sitio.
export function storeBadge({ icon, label, sub, dark = true }) {
  const fg = dark ? '#fff' : tokens.black;
  const border = dark ? 'rgba(255,255,255,.22)' : 'rgba(0,0,0,.16)';
  const bg = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.04)';
  return `
    <div class="store-badge" style="
      display:inline-flex; align-items:center; gap:12px;
      background:${bg}; border:1px solid ${border}; border-radius:50px;
      padding:12px 22px; color:${fg};
    ">
      <span style="flex-shrink:0; display:flex;">${icon}</span>
      <span style="text-align:left; line-height:1.15;">
        <span style="display:block; font-size:9.5px; opacity:.7; font-weight:500;">${sub}</span>
        <span style="display:block; font-size:14.5px; font-weight:700; letter-spacing:-.01em;">${label}</span>
      </span>
    </div>`;
}

// Grid técnico + aurora + texto fantasma gigante — el mismo lenguaje del
// footer "cinemático" del sitio (cf-grid / cf-aurora / cf-giant-text).
export function darkBackdrop({ giantText = 'CALFPAY' } = {}) {
  return `
    <div aria-hidden="true" style="
      position:absolute; inset:0; pointer-events:none; z-index:0;
      background-size:40px 40px;
      background-image:
        linear-gradient(to right,  rgba(255,255,255,.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px);
      mask-image: linear-gradient(to bottom, transparent, black 15%, black 90%, transparent);
      -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 90%, transparent);
    "></div>
    <div aria-hidden="true" style="
      position:absolute; left:50%; top:38%;
      width:120%; height:46%;
      transform:translate(-50%,-50%);
      border-radius:50%;
      background: radial-gradient(circle, rgba(174,255,34,.22) 0%, rgba(0,165,187,.16) 45%, transparent 72%);
      filter: blur(60px);
      pointer-events:none; z-index:0;
    "></div>
    <div aria-hidden="true" style="
      position:absolute; bottom:-4%; left:50%; transform:translateX(-50%);
      font-size:19vw; font-weight:900; letter-spacing:-.05em; line-height:.75;
      white-space:nowrap; color:transparent;
      -webkit-text-stroke:1px rgba(255,255,255,.07);
      background:linear-gradient(180deg, rgba(255,255,255,.09) 0%, transparent 65%);
      -webkit-background-clip:text; background-clip:text;
      pointer-events:none; z-index:0; user-select:none;
    ">${giantText}</div>`;
}

// "La tarjeta que no sabías que necesitabas" backdrop — el fondo con más
// personalidad del sitio: gradiente verde→teal casi negro + dos glows
// radiales opuestos (uno verde arriba-izq, uno teal abajo-der).
export function cardGlowBackdrop() {
  // Cuadrados perfectos (no %, que hereda el aspect-ratio angosto del
  // contenedor y deforma el círculo en una elipse) + blur + un stop
  // intermedio, para que el degradado se disuelva en el fondo en vez de
  // cortarse en un borde visible — igual receta que .cf-aurora del sitio.
  return `
    <div aria-hidden="true" style="
      position:absolute; top:-140px; left:-140px; width:420px; height:420px;
      pointer-events:none; filter: blur(50px);
      background: radial-gradient(circle, rgba(174,255,34,.24) 0%, rgba(174,255,34,.09) 45%, transparent 75%);
    "></div>
    <div aria-hidden="true" style="
      position:absolute; bottom:-120px; right:-120px; width:380px; height:380px;
      pointer-events:none; filter: blur(50px);
      background: radial-gradient(circle, rgba(0,165,187,.28) 0%, rgba(0,165,187,.10) 45%, transparent 75%);
    "></div>`;
}
export const cardGlowGradient = 'linear-gradient(135deg, #050f05 0%, #021218 100%)';

// Glassmorphism "bento card" — igual receta que .bento-card/.bc-dark del
// sitio: vidrio esmerilado translúcido + borde sutil + glow orb + ícono chip.
export function glassCard({ icon, title, desc, accent = 'rgba(255,255,255,.04)', border = 'rgba(255,255,255,.09)', fg = '#fff', fgMuted = 'rgba(255,255,255,.45)' } = {}) {
  return `
    <div style="
      position:relative; overflow:hidden; border-radius:20px; padding:20px;
      background:${accent}; border:1px solid ${border};
    ">
      <div aria-hidden="true" style="
        position:absolute; top:-70px; right:-70px; width:180px; height:180px;
        border-radius:50%; pointer-events:none;
        background: radial-gradient(circle, rgba(174,255,34,.10) 0%, transparent 70%);
      "></div>
      <div style="position:relative; z-index:1;">
        <div style="
          width:38px; height:38px; border-radius:12px; margin-bottom:14px;
          display:flex; align-items:center; justify-content:center;
          background:rgba(174,255,34,.14); border:1px solid rgba(174,255,34,.22);
        ">${icon}</div>
        <div style="font-family:${tokens.fontHeading}; font-size:15px; font-weight:500; color:${fg}; letter-spacing:-.01em; margin-bottom:4px;">${title}</div>
        <div style="font-size:12px; line-height:1.5; color:${fgMuted};">${desc}</div>
      </div>
    </div>`;
}

// Ticker / marquee diagonal — la tira de texto rotada del footer, con los
// puntos verdes ✦ separando cada frase en mayúsculas.
export function tickerMarquee({ items, rotate = -1.2 } = {}) {
  const row = items.map((t) => `${t} <span style="color:${tokens.green}; font-size:7px;">&#10022;</span>`).join(' &nbsp; ');
  return `
    <div style="
      position:relative; overflow:hidden;
      border-top:1px solid rgba(255,255,255,.08); border-bottom:1px solid rgba(255,255,255,.08);
      background: rgba(255,255,255,.03);
      padding:12px 0;
      transform: rotate(${rotate}deg) scaleX(1.06);
    ">
      <div style="
        display:flex; white-space:nowrap;
        font-size:11px; font-weight:700; letter-spacing:.2em; text-transform:uppercase;
        color:rgba(255,255,255,.4);
      ">
        <span style="padding:0 24px;">${row} &nbsp; ${row}</span>
      </div>
    </div>`;
}

export const baseStyles = `
  @font-face-fallback { }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; height: 100%; }
  body {
    font-family: ${tokens.font};
    -webkit-font-smoothing: antialiased;
    color: ${tokens.black};
  }
  img { max-width: 100%; display: block; }
`;
