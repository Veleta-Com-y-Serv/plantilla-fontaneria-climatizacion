// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';
import { conPaginas } from '../lib/multipagina';

export interface Enlace { texto: string; url: string }
/** Elemento genérico (`items`): instalaciones, pasos, garantías, cifras de la portada. Las instalaciones con `detalle` tienen página. */
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; precio?: string; [campo: string]: unknown }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
/** Opinión. `nota` es opcional (qué trabajo y dónde). */
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
/** Avería que atienden (averias.averias): `plazo` en letra de máquina («Hoy», «24 h»). Con `detalle`, página en /averias/<slug>/. */
export interface Averia { titulo: string; texto: string; plazo: string; icono: string; [campo: string]: unknown }
/** Plan de mantenimiento (mantenimiento.planes). `precio` siempre como cadena; `incluye` con «; ». */
export interface Plan { nombre: string; precio: string; periodo: string; incluye: string; destacado: boolean }
/** Trabajo hecho (trabajos.trabajos): foto, qué y dónde. */
export interface Trabajo { titulo: string; texto?: string; lugar?: string; imagen?: string }
/** Bloque destacado de la portada («Urgencias todos los días»). */
export interface Destacado { titulo?: string; texto?: string }

export interface Seccion {
  activa: boolean;
  titulo: string;
  antetitulo: string;
  texto: string;
  imagen: string;
  cta: Enlace | null;
  cta_secundario: Enlace | null;
  nota: string;
  destacado?: Destacado;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  /** averias */
  averias: Averia[];
  /** mantenimiento */
  planes: Plan[];
  /** trabajos */
  trabajos: Trabajo[];
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = conPaginas((datos ?? {}) as Crudo);
export function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter((x) => x != null && x !== '') as T[]) : [];
}
export const texto = (v: unknown) => (v == null ? '' : String(v).trim());
const enlaceDe = (v: unknown): Enlace | null => {
  const e = (v ?? {}) as Crudo;
  return texto(e.url) ? { texto: texto(e.texto) || texto(e.url), url: texto(e.url) } : null;
};

function normalizar(s: Crudo = {}): Seccion {
  const dest = s.destacado && typeof s.destacado === 'object' ? (s.destacado as Destacado) : undefined;
  return {
    ...s,
    activa: s.activa === true,
    titulo: texto(s.titulo),
    antetitulo: texto(s.antetitulo),
    texto: texto(s.texto),
    imagen: texto(s.imagen),
    nota: texto(s.nota),
    destacado: dest && (texto(dest.titulo) || texto(dest.texto)) ? { titulo: texto(dest.titulo), texto: texto(dest.texto) } : undefined,
    cta: enlaceDe(s.cta),
    cta_secundario: enlaceDe(s.cta_secundario),
    // Los elementos de `items` y `averias` conservan el objeto original: src/lib/paginas.ts los reconoce por identidad (enlaceDe).
    items: lista<Item>(s.items).filter((i) => i && typeof i === 'object' && (texto(i.titulo) || texto(i.texto))),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Crudo>(s.testimonios).filter((t) => texto(t.texto)).map((t) => ({ texto: texto(t.texto), autor: texto(t.autor), nota: texto(t.nota) })),
    galeria: lista<unknown>(s.galeria).map(texto).filter(Boolean),
    horario: lista<Crudo>(s.horario).filter((h) => texto(h.dia) || texto(h.horas)).map((h) => ({ dia: texto(h.dia), horas: texto(h.horas) })),
    preguntas: lista<Crudo>(s.preguntas).filter((p) => texto(p.pregunta)).map((p) => ({ pregunta: texto(p.pregunta), respuesta: texto(p.respuesta) })),
    averias: lista<Crudo>(s.averias).filter((a) => a && typeof a === 'object' && texto(a.titulo)) as Averia[],
    planes: lista<Crudo>(s.planes)
      .filter((p) => texto(p.nombre))
      .map((p) => ({ nombre: texto(p.nombre), precio: texto(p.precio), periodo: texto(p.periodo), incluye: texto(p.incluye), destacado: p.destacado === true })),
    trabajos: lista<Crudo>(s.trabajos)
      .filter((t) => texto(t.titulo) || texto(t.imagen))
      .map((t) => ({ ...t, titulo: texto(t.titulo), texto: texto(t.texto), lugar: texto(t.lugar), imagen: texto(t.imagen) })),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi negocio',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#141b2a', acento: '#1d5fd6', fondo: '#f8fbfe', texto: '#111825', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu).filter((e) => texto(e?.url)),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'Plumber',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: enlaceDe(d.boton_cabecera),
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

/** Opciones del desplegable «Tipo de trabajo» del formulario de presupuesto: las instalaciones y, detrás, las averías. */
export function tiposDeTrabajo(): string[] {
  const out: string[] = [];
  const inst = seccion('instalaciones');
  const av = seccion('averias');
  if (inst) out.push(...inst.items.map((it) => texto(it.titulo)));
  if (av) out.push(...av.averias.map((a) => texto(a.titulo)));
  return [...new Set(out.filter(Boolean))];
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
/** «a; b; c» → ['a', 'b', 'c'] (listas en una cadena: `incluye`). */
export const partes = (t?: string) => (t ? t.split(/\s*[;\n]\s*/).map((x) => x.trim()).filter(Boolean) : []);
/** ¿El enlace sale de la web? (abre en otra pestaña). */
export const externo = (u?: string) => !!u && /^https?:/.test(u);
/** ¿La sección tiene algo que enseñar? (título, texto, foto, botón o alguna de las listas dadas). Si no, no se pinta la banda. */
export const conContenido = (s: Seccion | null, ...listas: unknown[][]): s is Seccion =>
  !!s && Boolean(s.titulo || s.texto || s.antetitulo || s.imagen || s.cta || listas.some((l) => l.length > 0));
