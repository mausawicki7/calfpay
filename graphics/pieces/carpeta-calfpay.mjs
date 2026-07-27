// Rediseño de "DISPLAY CARPITA CALFPAY.pdf" (pieza original: 410.88 × 1757.25pt,
// portada + contraportada apiladas en una sola página angosta y muy alta).
//
// Se mantiene el mismo tamaño y la misma estructura de contenido (portada
// oscura con titular + logo, contratapa clara con CTA + logo + stores), pero
// el tratamiento visual pasa a usar el sistema real del sitio en vez del
// gradiente mesh genérico: el glow de "la tarjeta que no sabías que
// necesitabas", el ticker diagonal del footer y tarjetas glassmorphism.

import {
  tokens,
  logoImg,
  appleIcon,
  googlePlayIcon,
  storeBadge,
  cardGlowBackdrop,
  cardGlowGradient,
  glassCard,
  tickerMarquee,
  diamondWatermark,
  nohemiFontFace,
  baseStyles,
} from '../lib/brand.mjs';

const checkIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${tokens.green}" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`;
const boltIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${tokens.green}" stroke-width="2.5" stroke-linecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
const userIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${tokens.green}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="4"/></svg>`;
const cardIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${tokens.green}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/></svg>`;

// Puntos en pt (72pt = 1in). Igual tamaño que el PDF original.
export const width = 410.88;
export const height = 1757.25;

// El layout HTML se mide en CSS px (96dpi), no en pt (72dpi) — si no se
// convierte, el contenido queda de facto ~33% más ancho que el viewport
// de impresión y todo se corta por la derecha.
const pxWidth = width * (96 / 72);
const pxHeight = height * (96 / 72);

export function render() {
  return `<!doctype html>
<html lang="es-AR">
<head>
<meta charset="utf-8" />
<style>
  /* @page en pt nativo: evita el redondeo que se arrastra al convertir a
     pulgadas (1757.25pt/72 no es un decimal exacto en algunos casos) y
     mantiene el PDF con las mismas medidas que el original punto por punto. */
  @page { size: ${width}pt ${height}pt; margin: 0; }
  ${nohemiFontFace([500, 600, 700, 800, 900])}
  ${baseStyles}
  html, body { width: ${pxWidth}px; height: ${pxHeight}px; }
  .cover, .cta { width: 100%; position: relative; overflow: hidden; }
  .cover { height: 50%; background: ${cardGlowGradient}; display:flex; flex-direction:column; }
  .cta   { height: 50%; background: ${cardGlowGradient}; display:flex; flex-direction:column; }
</style>
</head>
<body>

  <!-- PORTADA -->
  <section class="cover">
    ${cardGlowBackdrop()}
    <div style="position:relative; z-index:1; padding: 34px 30px 0;">
      ${logoImg({ height: 22, variant: 'green' })}
    </div>

    <div style="position:relative; z-index:1; padding: 26px 30px 0; flex:1; overflow:hidden;">
      <h1 style="
        font-family: ${tokens.fontHeading};
        font-size: 46px; font-weight: 700; line-height: 1.08; letter-spacing:-.02em;
        color: ${tokens.green};
        max-width: 330px;
      ">La billetera digital de los neuquinos.</h1>

      <div style="
        display:inline-flex; align-items:center; gap:8px; margin-top:22px;
        background: rgba(174,255,34,.12); border:1px solid rgba(174,255,34,.28);
        border-radius: 50px; padding: 7px 16px;
        font-size: 11.5px; font-weight: 600; color: ${tokens.green};
      ">100% hecha en Neuquén</div>

      <div style="position:absolute; right:-40px; bottom:20px;">
        ${diamondWatermark({ size: 220 })}
      </div>
    </div>

    <div style="position:relative; z-index:1;">
      ${tickerMarquee({
        items: [
          'La billetera de Neuquén',
          'Tarjeta Mastercard prepaga',
          'Pagos al instante',
          'Tu plata rinde',
        ],
      })}
    </div>
    <div style="height: 30px;"></div>
  </section>

  <!-- CONTRATAPA -->
  <section class="cta">
    ${cardGlowBackdrop()}
    <div style="position:relative; z-index:1; flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding: 30px 30px 0;">
      <h2 style="font-family: ${tokens.fontHeading}; font-size: 30px; font-weight: 700; letter-spacing:-.02em; color:${tokens.white};">Escaneá y pagá</h2>
      <p style="margin-top:12px; font-size: 14px; line-height:1.55; color:rgba(255,255,255,.6); max-width: 280px;">
        Descargá CalfPay y descubrí una experiencia de pago moderna y local.
      </p>
    </div>

    <div style="position:relative; z-index:1; padding: 0 26px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
      ${glassCard({
        icon: checkIcon,
        title: 'Al instante',
        desc: 'Pagos y transferencias sin esperas.',
      })}
      ${glassCard({
        icon: boltIcon,
        title: 'Tu plata rinde',
        desc: 'Rendimiento diario sobre tu saldo.',
      })}
      ${glassCard({
        icon: userIcon,
        title: 'Abrí tu cuenta en minutos',
        desc: 'Sin papeleo, activá tu cuenta desde la app.',
      })}
      ${glassCard({
        icon: cardIcon,
        title: 'Tarjeta prepaga Mastercard',
        desc: 'Pedila desde la app y usala donde quieras.',
      })}
    </div>

    <div style="position:relative; z-index:1; padding: 26px 26px 0; display:flex; flex-direction:column; gap:10px;">
      ${storeBadge({ icon: appleIcon, sub: 'Descargalo en el', label: 'App Store', dark: true })}
      ${storeBadge({ icon: googlePlayIcon, sub: 'Disponible en', label: 'Google Play', dark: true })}
    </div>

    <div style="position:relative; z-index:1; flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; gap:14px; padding-bottom: 30px;">
      ${logoImg({ height: 24, variant: 'green' })}
      <div style="font-size:10px; color:rgba(255,255,255,.4);">© 2026 CalfPay · Neuquén, Argentina</div>
    </div>
  </section>

</body>
</html>`;
}
