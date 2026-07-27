// Rediseño de "DISPLAY CARPITA CALFPAY.pdf" — pieza física real: una
// "carpita" (carpeta/folder) troquelada de 145 × 620mm, vertical, que se
// pliega en 4 franjas (ver correccion.md):
//
//   100mm  solapa/base superior  — blanco, sin contenido
//   210mm  primera cara          — diseño a los 145mm de ancho completos
//   210mm  segunda cara          — diseño a los 145mm de ancho completos
//   100mm  solapa/base inferior  — blanco, sin contenido
//
// Sin márgenes, sin padding de página, sin max-width/scale/centrado — el
// documento final debe ser exactamente 145×620mm, borde a borde en las
// dos caras centrales. Las líneas de plegado (100/310/520mm desde arriba)
// las da la propia grilla, no se dibujan.

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
  nohemiFontFace,
  baseStyles,
} from '../lib/brand.mjs';

const checkIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${tokens.green}" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`;
const boltIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${tokens.green}" stroke-width="2.5" stroke-linecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
const userIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${tokens.green}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="4"/></svg>`;
const cardIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${tokens.green}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/></svg>`;

// Medidas reales de la pieza física (mm), no las del PDF de referencia.
export const unit = 'mm';
export const width = 145;
export const height = 620;

export function render() {
  return `<!doctype html>
<html lang="es-AR">
<head>
<meta charset="utf-8" />
<style>
  @page { size: ${width}mm ${height}mm; margin: 0; }
  ${nohemiFontFace([500, 600, 700, 800, 900])}
  ${baseStyles}
  html, body { width: ${width}mm; height: ${height}mm; margin: 0; padding: 0; }
  .carpita {
    width: ${width}mm; height: ${height}mm;
    display: grid;
    grid-template-rows: 100mm 210mm 210mm 100mm;
    overflow: hidden;
  }
  .solapa { width: 100%; background: ${tokens.white}; }
  .cara { width: 100%; position: relative; overflow: hidden; background: ${cardGlowGradient}; display:flex; flex-direction:column; }
</style>
</head>
<body>
  <div class="carpita">

    <!-- SOLAPA SUPERIOR (100mm, en blanco) -->
    <div class="solapa"></div>

    <!-- PRIMERA CARA (210mm) -->
    <section class="cara">
      ${cardGlowBackdrop()}
      <div style="position:relative; z-index:1; padding: 34px 30px 0;">
        ${logoImg({ height: 34, variant: 'green' })}
      </div>

      <div style="position:relative; z-index:1; padding: 26px 30px 0;">
        <h1 style="
          font-family: ${tokens.fontHeading};
          font-size: 54px; font-weight: 700; line-height: 1.05; letter-spacing:-.02em;
          color: ${tokens.green};
        ">La billetera digital de los neuquinos.</h1>

        <div style="
          display:inline-flex; align-items:center; gap:8px; margin-top:22px;
          background: rgba(174,255,34,.12); border:1px solid rgba(174,255,34,.28);
          border-radius: 50px; padding: 7px 16px;
          font-size: 11.5px; font-weight: 600; color: ${tokens.green};
        ">100% hecha en Neuquén</div>
      </div>

      <div style="position:relative; z-index:1; padding: 26px 30px 0;">
        <div style="width:284px; height:284px;"></div>
        <div style="font-family:${tokens.fontHeading}; font-size:26px; font-weight:700; color:${tokens.white}; letter-spacing:-.01em; line-height:1.15; margin-top:14px;">Escaneá y pagá</div>
      </div>

      <div style="position:relative; z-index:1; flex:1;"></div>

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

    <!-- SEGUNDA CARA (210mm) -->
    <section class="cara">
      ${cardGlowBackdrop()}
      <div style="position:relative; z-index:1; flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding: 24px 30px 0;">
        <p style="
          font-family: ${tokens.fontHeading};
          font-size: 27px; font-weight: 600; line-height: 1.25; letter-spacing:-.01em;
          color: ${tokens.white};
        ">Descargá CalfPay y descubrí una<br>experiencia de pago moderna y local.</p>
      </div>

      <div style="position:relative; z-index:1; padding: 0 24px; display:grid; grid-template-columns:1fr 1fr; gap:8px;">
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

      <div style="position:relative; z-index:1; padding: 20px 24px 0; display:flex; flex-direction:column; gap:8px;">
        ${storeBadge({ icon: appleIcon, sub: 'Descargalo en el', label: 'App Store', dark: true })}
        ${storeBadge({ icon: googlePlayIcon, sub: 'Disponible en', label: 'Google Play', dark: true })}
      </div>

      <div style="position:relative; z-index:1; flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; gap:10px; padding-bottom: 22px;">
        ${logoImg({ height: 22, variant: 'green' })}
        <div style="font-size:9px; color:rgba(255,255,255,.4);">© 2026 CalfPay · Neuquén, Argentina</div>
      </div>
    </section>

    <!-- SOLAPA INFERIOR (100mm, en blanco) -->
    <div class="solapa"></div>

  </div>
</body>
</html>`;
}
