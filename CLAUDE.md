# Plantilla «Fontanería y climatización» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **cobalt** (tema Cobalt
de la skill Hallmark: papel casi blanco y frío, tinta azul grisácea, filetes de 1 px, Familjen Grotesk en titulares, IBM Plex
Sans para leer, JetBrains Mono para los plazos y el campo de caracteres de la portada, botones como teclas, paneles con dos
esquinas cortadas y una sola señal cobalto). Brief y decisiones de diseño en `DISEÑO.md`.
Todo en castellano de España, frases cortas, sin jerga, de tú.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario, acento, fondo, texto). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…).
  - `fondo` = papel; `texto` = tinta; `acento` = cobalto (tecla principal, foco, enlaces, iconos, campo de caracteres); `primario` = grafito (banda de «Cómo trabajamos»).
  - El resto de tonos (papel 2 y 3, filetes, apagado, teclas, tintes del campo) se derivan en `src/styles/global.css` con `color-mix()`/`oklch(from …)`. La letra sobre el acento y sobre el primario se elige sola (clara u oscura).
- **Tipografías**: alojadas en `public/fuentes/` (licencias en `public/fuentes/LICENCIAS.md`), declaradas en `src/styles/global.css`; `Base.astro` precarga la de titulares. No añadas fuentes externas.
- **Aspecto general**: `src/styles/global.css` (bandas `.banda--papel/--clara/--grafito`, cabeza partida `.cabeza`, teclas `.btn`/`.btn-sec`, panel cortado `.corte`, `.estado`, `.foto` con el tinte frío, `.tabla`, formulario, cabecera `.cabecera--cobalto`, pie `.pie--cobalto` y barra fija de móvil).
- **Imágenes**: fotos en `public/fotos/` (lista y prompts en `fotos.json`); relleno en `public/placeholders/`. En `site.yaml`, rutas absolutas (`/fotos/hero.jpg`). Personas: `/placeholders/persona.svg`.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = nombre en texto.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (true en plan gratis).

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`.
- `hero` → `hero.astro`: texto sobre el campo de caracteres (canvas con un script pequeño en línea; sin script, rejilla de puntos) y foto a sangre a la derecha. `antetitulo`, `titulo`, `texto`, `cta` (llamar; sin él, el teléfono), `cta_secundario` (sin él, WhatsApp o presupuesto), `destacado: {titulo, texto}` (urgencias) e `items: [{titulo}]` (datos cortos; la plataforma los trata como cifras).
- `averias` → `averias.astro`: tabla con filetes `averias: [{titulo, texto, plazo, icono}]`; `plazo` en letra de máquina («Hoy», «24 h»); `imagen` vertical; `cta` (llamar).
- `instalaciones` → `instalaciones.astro`: `items: [{titulo, texto, icono, imagen, precio}]`. Con `imagen`, foto grande; sin ella, fila con filete. Sus títulos (y los de las averías) son las opciones de «Tipo de trabajo» del formulario de presupuesto.
- `proceso` → `proceso.astro`: banda de grafito, regla con los pasos `items: [{titulo, texto, icono}]` numerados (lista ordenada).
- `trabajos` → `trabajos.astro`: carril horizontal `trabajos: [{titulo, texto, lugar, imagen}]`.
- `mantenimiento` → `mantenimiento.astro`: `planes: [{nombre, precio, periodo, incluye, destacado}]` (`incluye` con «; »), `marca_destacado` (palabra del plan destacado), `nota`, `cta` (destino de las teclas; por defecto el contacto).
- `zonas` → `zonas.astro`: índice de localidades `items: [{titulo, texto}]` (la primera, la base), `imagen` opcional, `titulo_pagina` y `texto_pagina` para las páginas por zona.
- `opiniones` → `opiniones.astro`: `testimonios: [{texto, autor, nota}]`; la primera, grande. No inventes opiniones.
- `presupuesto` → `presupuesto.astro`: garantías `items: [{titulo, texto, icono}]`, `nota`, `boton_formulario`; formulario completo (nombre, teléfono, localidad, tipo de trabajo, mensaje).
- `preguntas` → `preguntas.astro`: `preguntas: [{pregunta, respuesta}]` en `details/summary`; sin preguntas no se pinta.
- `contacto` → `contacto.astro`: teléfono grande, teclas de llamar y WhatsApp, email, dirección y horario de `contacto`. Si `presupuesto` no está activa, aquí sale el formulario; si lo está y hay `imagen`, la foto.
- `texto` → `texto.astro`: apartado genérico (párrafos, `imagen`, `items`, `cta`). Para apartados nuevos: `tipo: texto`.

## Reglas para órdenes
1. **Activar o quitar una sección**: `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar**: mueve el bloque dentro de `secciones:`. Evita dos secciones con fotos grandes seguidas (`instalaciones`, `trabajos`).
3. **Textos, teléfonos, horarios, fotos**: solo en `site.yaml`. Entre comillas si llevan comas o «: ».
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Precios y plazos siempre como texto entre comillas (`"desde 690 €"`, `"24 h"`, `"Consultar"`). Máximo 24 elementos por lista.
5. **Sección nueva**: mejor un apartado con `tipo:` (`tipo: texto`, `tipo: averias`…) y su propio id. Si hace falta un diseño nuevo, `src/components/secciones/<id>.astro` con `seccion(Astro.props.id)`, `Seccion` y `Titular`. `src/pages/index.astro` la recoge sola: no lo toques.
6. **No tocar** `src/layouts/Base.astro`, `src/pages/index.astro`, `src/pages/[...pagina].astro`, `tailwind.config.mjs`, `src/styles/comun.css`, `src/lib/*.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts` salvo orden explícita de diseño (son comunes a todas las plantillas o el SEO de base). `seo.url` y `seo.indexable` los pone la plataforma. Los ids `hero` y `contacto` son obligatorios.
7. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro`, sin JavaScript nuevo salvo necesidad real, margen lateral de 16 px en móvil, sin scroll horizontal, barra fija de móvil («Llamar» / «WhatsApp»), titulares sin palabras partidas (`hyphens: manual`). `alt` sacado del contenido (`altHero`, `altFicha`, `altSeccion` de `src/lib/seo.ts`); las decorativas, `alt=""`.
8. Los formularios no tienen servidor (`mailto` con el email de `site.yaml`); la plataforma los conecta al publicar. No cambies el marcado de `src/components/ui/FormularioContacto.astro`.
9. Iconos: `src/components/ui/Icono.astro` (de oficio: `gota, grifo, desague, fuego, termometro, copo, radiador, ventilador, sol, ducha, alerta, herramienta, reloj, euro, escudo, plano`…).

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas por elemento y páginas por zona)
- Listas con página propia (espejo de `fichas:` de template.yaml en `src/data/fichas.ts`): `secciones.averias.averias` → `/averias/<slug>/` y `secciones.instalaciones.items` → `/instalaciones/<slug>/`.
  **Solo los elementos con `detalle`** (texto largo, párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) tienen página.
  Campos opcionales: `slug` (si falta, sale del nombre) e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»). El resto de campos (precio, plazo) salen en la ficha.
- Zonas: cada elemento de `secciones.zonas.items` **con `texto`** (60-150 palabras) tiene su página en `/zonas/<slug>/`, con `titulo_pagina` («Fontanero en {zona}») y `texto_pagina` de la sección.
- Una orden «añade una página para X» = escribir su `detalle` (o el `texto` de la zona). Nunca crees a mano páginas en `src/pages/averias/`, `src/pages/instalaciones/` ni `src/pages/zonas/`.

## Varias páginas
- `paginas:` (raíz de site.yaml, opcional): `[{ ruta, titulo, secciones: "instalaciones; proceso" }]`, como mucho 6, cada sección en una sola página y nunca `hero`. Sin ella, una sola página larga. Reparto recomendado en `template.yaml → paginas`. Una orden «haz la web de varias páginas» = escribir `paginas`; nunca crees páginas a mano para eso.
- En un componente, un enlace fijo a una sección va con `enlace('/#contacto')` (de `src/lib/multipagina.ts`).
