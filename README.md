# Plantilla NoExpertise · Fontanería y climatización

Web técnica y limpia para fontaneros e instaladores: averías hoy, calderas, aerotermia y aire.

- Sectores: fontanería, climatización, calefacción y gas, instalaciones. Estilo: cobalt (tema Cobalt de Hallmark). Plan mínimo: gratis.
- Secciones: hero, averias, instalaciones, proceso, trabajos, mantenimiento, zonas, opiniones, presupuesto, preguntas, contacto (+ `texto` para apartados nuevos).
- Campos propios: `hero.destacado`, `averias.averias[]` (`titulo, texto, plazo, icono`), `instalaciones.items[]` (con `imagen` y `precio`), `trabajos.trabajos[]` (`titulo, texto, lugar, imagen`), `mantenimiento.planes[]` (`nombre, precio, periodo, incluye, destacado`) y `mantenimiento.marca_destacado`, `presupuesto.nota`.
- Páginas propias: cada avería e instalación con `detalle` (`/averias/<slug>/`, `/instalaciones/<slug>/`) y cada zona con `texto` (`/zonas/<slug>/`).
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD del negocio (`Plumber`) y de las preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): Inicio + una página por entrada (`{ ruta, titulo, secciones: "a; b" }`, hasta 6) con el menú hecho solo; reparto recomendado en `template.yaml → paginas`. Sin la clave, una sola página larga.
- Asistente de puesta en marcha: guion propio en `template.yaml → asistente`.
- Contenido editable en `site.yaml`; metadatos en `template.yaml`; reglas para el agente en `CLAUDE.md`; diseño en `DISEÑO.md`; fotos a generar en `fotos.json`.

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Fuentes con licencia OFL-1.1 alojadas en `public/fuentes/` (`LICENCIAS.md`). Fotos de `public/fotos/` generadas con IA para esta plantilla (`fotos.json`), sin licencias de terceros.
