# Fontanería y climatización: brief de diseño

Plantilla `fontaneria-climatizacion` creada el 10/11/2026 a partir de `reformas-oficios` con `php artisan plantillas:nueva` y
rediseñada entera con el tema **Cobalt** de la skill Hallmark (género modern-minimal). De la base solo queda la estructura
técnica (carga del `site.yaml`, fichas y zonas, varias páginas, formulario). Este fichero se queda en el repo: es lo que lee
quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: fontaneros e instaladores de calefacción, gas y climatización (sectores `fontaneria`, `climatizacion`,
  `calefaccion`, `instalaciones`): averías y fugas, desatascos, calderas (instalación, cambio y mantenimiento), suelo
  radiante, aerotermia, aire acondicionado, termos, reformas de baño, revisiones de gas y contratos de mantenimiento.
- **Qué busca su cliente**: saber si le atienden la avería hoy, qué instalan, en qué zona trabajan, y llamar o escribir por
  WhatsApp ya; para una instalación, pedir presupuesto.
- **Qué tiene que conseguir la web**: que **llamen** (o escriban por WhatsApp) y que **pidan presupuesto**. El teléfono va en la
  cabecera (número a la vista y tecla), en la portada (tecla cobalto «Llamar ahora»), junto a la tabla de averías, en el
  contacto en grande, en el pie y, en móvil, en una barra fija con «Llamar» y «WhatsApp».
- **Tono**: exacto, técnico y tranquilo, de tú. Sí: un parte de trabajo bien hecho, una caldera recién instalada con las
  tuberías alineadas. No: el fontanero de dibujos animados con gota sonriente ni la plantilla negra y amarilla de obra
  (que ya es `reformas-oficios`).

## Tema Hallmark y cómo se ha traducido

Cobalt (`references/themes/cobalt.md`): papel casi blanco y frío, tinta azul grisácea y filetes de 1 px, Familjen Grotesk
sobre IBM Plex Sans, un campo de caracteres ASCII en celdas de 8 × 16, teclas con canto y paneles cortados en dos esquinas,
JetBrains Mono para valores de máquina, grafito como material oscuro y una sola señal cobalto. El tema es de herramientas
para programadores; aquí se ha llevado al oficio: el «tráfico» que pinta el campo es el agua.

- **Cuatro colores** → `fondo` = papel (`#f8fbfe`), `texto` = tinta (`#111825`), `acento` = cobalto (`#1d5fd6`: tecla
  principal, foco, enlaces al pasar, iconos, la primera fila de averías y el campo), `primario` = grafito (`#141b2a`: la banda de
  «Cómo trabajamos»).
- **Derivados** (`src/styles/global.css`): `--papel-2` y `--papel-3` (pasos de papel con un toque del acento), `--tinta-2`,
  `--apagado` (AA sobre el papel), `--filete` y `--filete-2`, `--acento-legible` (cobalto como texto, nunca más claro que
  L 0,5), `--acento-lavado`, `--acento-borde` (canto de la tecla), `--tecla-cara` y `--tecla-canto`, `--glifo-1…4` (tintes del
  campo) y `--sobre-acento` / `--sobre-grafito` (texto claro u oscuro según el color del cliente con `oklch(from …)`).
  Probado con primario granate y acento amarillo: la tecla pasa a letra oscura y todo sigue legible.
- **Material**: cabezas de sección partidas (filete de 1 px encima, título a la izquierda, entrada a la derecha), teclas con
  canto de 3 px que suben 1 px al pasar y se hunden al pulsar (cobalto la principal, cara de papel la otra), paneles cortados
  (`corner-shape: bevel` donde el navegador lo admite; si no, radio de 8 px), tablas y listas con filetes, estado como texto con
  un icono, fotos con radio de 8 px, algo desaturadas y con un tinte frío del acento por CSS (`photo: duotone` del tema,
  suavizado para que el oficio se vea).
- **Firma**: el campo de caracteres del agua detrás del texto de la portada (`hero.astro`, canvas de 8 × 16 con la rampa
  ` .:-=+*#%@`): dos «tuberías» de caracteres arriba y abajo que entran revueltas por la izquierda y llegan en calma (guiones)
  a la foto; nunca denso bajo el texto; se para fuera de pantalla; con «reducir movimiento», imagen fija; sin script, una
  rejilla de puntos en la celda.
- **Range del tema usado**: «una tabla que es la API» → la tabla de averías con el plazo en mono y la primera fila en el lavado
  cobalto; «una línea de tiempo como una regla» → los pasos en la banda de grafito sobre una regla con marcas y muescas.

## Tipografías y licencias

Familjen Grotesk 500 y 600 (Familjen STHLM AB), IBM Plex Sans 400 y 500 (IBM) y JetBrains Mono 400 (JetBrains), todas
**OFL-1.1**, woff2 `latin` de Fontsource en `public/fuentes/` (92 KB en total), `font-display: swap`, respaldo del sistema de
la misma clase y `preload` solo de Familjen 600. JetBrains Mono es la tercera familia porque el tema la usa para los valores de
máquina (los plazos de la tabla de averías y de las fichas) y para el campo de caracteres; nunca en etiquetas ni titulares.
Detalle en `public/fuentes/LICENCIAS.md`.

Titulares sin palabras partidas: `overflow-wrap: normal`, `hyphens: manual`. En Familjen 600 una palabra de 20 letras mide
unas 10,4 em: el `h1` de la portada se limita con `cqi` a su columna (`min(clamp(…), 100cqi / 10.4)`, 33 px a 375 px y 57 px en
escritorio) y los `h2` bajan a 30 px a 375 px. Comprobado con «Impermeabilizaciones y electrodomésticos» y «Rehabilitaciones».

## Forma y ritmo de bandas

| # | Sección | Papel | Lleva |
|---|---|---|---|
| 1 | `hero` | papel + campo | Stage: texto sobre el campo a la izquierda, foto a sangre a la derecha de toda la altura (en móvil, debajo) |
| 2 | `averias` | papel | tabla con filetes y plazos en mono; foto vertical fija al bajar |
| 3 | `instalaciones` | clara | fotos grandes en anchos alternos 7/5 y 5/7; las que no tienen foto, en filas |
| 4 | `proceso` | grafito | la regla con los pasos numerados |
| 5 | `trabajos` | clara | carril horizontal de fotos que pasa del borde |
| 6 | `mantenimiento` | papel | planes en columnas con filetes verticales, precio grande, tecla cobalto en el destacado |
| 7 | `zonas` | papel | índice de localidades en dos columnas con filetes y la foto de la furgoneta |
| 8 | `opiniones` | clara | la primera como frase grande, las demás en dos columnas |
| 9 | `presupuesto` | papel | garantías en filas y el formulario completo en un panel cortado |
| 10 | `preguntas` | clara | cabeza fija a la izquierda y filas `details` |
| 11 | `contacto` | papel | teléfono a tamaño de cifra, teclas, email, dirección y horario en filas |
| — | pie | papel 3 | nombre como mástil, teléfono en cobalto, cuatro columnas, barra fija de móvil |

Se alternan bandas guiadas por foto (portada, instalaciones, trabajos) con bandas que solo hace el material (tabla con
filetes, regla en grafito, columnas de planes, índice, filas).

## Listas propias y páginas

- `averias.averias` {titulo, texto, plazo, icono, detalle}, `instalaciones.items` {titulo, texto, icono, imagen, precio,
  imagenes, detalle}, `trabajos.trabajos` {titulo, texto, lugar, imagen}, `mantenimiento.planes` {nombre, precio, periodo,
  incluye, destacado}.
- Fichas: cada avería con `detalle` en `/averias/<slug>/` y cada instalación con `detalle` en `/instalaciones/<slug>/`
  (`Service`). Zonas: cada localidad con `texto` en `/zonas/<slug>/` («Fontanero en Ateca»).
- Varias páginas recomendadas: Instalaciones (instalaciones, proceso), Mantenimiento, Dónde trabajamos (zonas), Presupuesto y
  contacto (presupuesto, preguntas, contacto). Inicio se queda con la portada, las averías, los trabajos y las opiniones.
- Asistente: 13 pasos propios (negocio, contacto, averías, instalaciones, proceso, trabajos, mantenimiento, zonas, presupuesto,
  preguntas, fotos, aspecto, repaso); la plataforma añade los dos de las fichas (15).

## Fotos

11 fotos generadas con IA a partir de `fotos.json` (instalador apretando una conexión bajo una caldera, manos cerrando la
llave de paso bajo el fregadero, caldera de condensación, unidad de aerotermia junto a una fachada de piedra, split en un
salón, suelo radiante antes del mortero, baño con plato de ducha, sala de calderas de comunidad, termo en un lavadero,
instalación de agua en una pared abierta y furgoneta de trabajo con las puertas abiertas). Sin texto legible, sin logotipos.
La herramienta devuelve 1024 × 1024: se recortan al aspecto (la portada a 1536 × 864, el resto a 1300 px), así que conviene
que el cliente ponga las suyas. En la portada el recorte se lleva a la derecha (`object-position`) para que no se vea la cara
del instalador, que en el original sale de perfil.

## Lo que no se ha podido o choca con Hallmark

- `antetitulo` es contrato: se pinta como etiqueta discreta en Familjen 500, en caja normal (Hallmark prohíbe el antetítulo).
- Cobalt pide una foto como mucho; el dueño de NoExpertise quiere fotos grandes del oficio: van once, con el tinte frío.
- `opiniones` lleva ejemplos ficticios en el `site.yaml` de muestra; la plataforma deja la sección desmarcada y vacía.
- Los `items` de la portada la plataforma los trata como cifras: por eso no van en el paso «negocio» del guion.
- La segunda tecla de la portada es la tecla de papel del tema (Cobalt la define así); sloplint la cuenta como un segundo botón
  relleno (F4).
- Lo que sloplint da como FAIL y es contrato de NoExpertise: el sello no queda en la primera línea del CSS servido (Tailwind
  antepone su cabecera al ir en línea), el `style` de `<html>` con los cuatro colores del cliente, y en `comun.css` (común a
  todas las plantillas) una sombra con color literal y las etiquetas del pie en mayúsculas, que aquí se anulan.
- Hallmark pide 450 palabras por página; con la tabla de averías, los planes y las preguntas pasa de 1100. Se queda así porque es
  lo que el cliente necesita leer antes de llamar.
