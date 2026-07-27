Instrucciones para corregir el PDF

Necesito que corrijas exclusivamente las dimensiones y la estructura del documento, manteniendo el rediseño visual actual.

La medida final del documento debe ser exactamente:

Ancho: 145 mm
Alto: 620 mm
Orientación vertical
Sin márgenes
Sin padding
Sin escalado automático

La estructura vertical debe dividirse de arriba hacia abajo de esta manera:

100 mm — solapa/base superior
Fondo blanco.
Sin textos ni elementos gráficos.
210 mm — primera cara de la carpita
El diseño debe ocupar los 145 mm completos de ancho.
210 mm — segunda cara de la carpita
El diseño debe ocupar los 145 mm completos de ancho.
100 mm — solapa/base inferior
Fondo blanco.
Sin textos ni elementos gráficos.

Las líneas de plegado deben quedar exactamente en:

100 mm desde el borde superior.
310 mm desde el borde superior.
520 mm desde el borde superior.

No deben existir márgenes blancos laterales. La gráfica debe llegar de borde a borde en las dos caras centrales.

No reducir el diseño a 135 mm de ancho ni dejar espacios sobrantes abajo. No utilizar:

fit-to-page
escalado automático
transform: scale()
max-width
centrado dentro de una página más grande
márgenes de impresión

Exportar el PDF con:

Tamaño personalizado: 145 × 620 mm
Escala: 100 %
Márgenes: 0
Gráficos de fondo activados
Sin encabezados ni pies de página

Las guías de plegado pueden utilizarse durante el armado, pero no deben aparecer visibles en el PDF final.

Si Claude lo está generando desde HTML/CSS, agregale también esto:

@page {
  size: 145mm 620mm;
  margin: 0;
}

html,
body {
  width: 145mm;
  height: 620mm;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

.carpita {
  width: 145mm;
  height: 620mm;
  display: grid;
  grid-template-rows: 100mm 210mm 210mm 100mm;
  overflow: hidden;
}

.solapa {
  width: 145mm;
  height: 100mm;
  background: white;
}

.cara {
  width: 145mm;
  height: 210mm;
  overflow: hidden;
}