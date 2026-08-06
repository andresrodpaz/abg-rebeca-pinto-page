/**
 * Datos reales del despacho.
 * Punto único de verdad: cualquier cambio de teléfono, dirección o redes
 * se hace aquí y se propaga a toda la web.
 */

const WHATSAPP_MESSAGE =
  'Hola Rebeca, me gustaría información sobre mi trámite de extranjería.'

export const site = {
  name: 'Rebeca Pinto Camacho',
  shortName: 'Rebeca Pinto',
  role: 'Abogada',

  /** Tagline / especialidades — se usa como destacado en toda la web */
  specialties: ['Extranjería', 'Residencia', 'Nacionalidad'] as const,
  tagline: 'Extranjería · Residencia · Nacionalidad',

  phone: {
    /** Formato legible para mostrar en pantalla */
    display: '687 20 24 99',
    /** Formato E.164 para enlaces tel: */
    tel: '+34687202499',
    /** Sin símbolos, para wa.me */
    whatsapp: '34687202499',
  },

  email: 'info@rebecapintocamacho.es',

  address: {
    street: 'C/ Parque de San Fernando, 3',
    postalCode: '28807',
    city: 'Alcalá de Henares',
    region: 'Madrid',
    country: 'España',
    full: 'C/ Parque de San Fernando, 3, 28807 Alcalá de Henares (Madrid)',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('C/ Parque de San Fernando 3, 28807 Alcalá de Henares, Madrid'),
  },

  /** Modalidad de atención */
  coverage: 'Atención presencial y online en toda España',
  coverageShort: 'Presencial y online en toda España',

  /** Colegiación actual */
  bar: 'Ilustre Colegio de Abogados de Alcalá de Henares',

  social: {
    handle: '@abogadarebecapintocamacho',
    username: 'abogadarebecapintocamacho',
    tiktokUsername: 'rebecaandreinapintocamac',
    instagram: 'https://www.instagram.com/abogadarebecapintocamacho',
    tiktok: 'https://www.tiktok.com/@rebecaandreinapintocamac',
    instagramPosts: [] as string[],
  },

  whatsapp: {
    message: WHATSAPP_MESSAGE,
    url: `https://wa.me/34687202499?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  },

  /** Horario de atención */
  schedule: 'Lunes a viernes, de 9:00 a 19:00 h',
} as const

export type Site = typeof site
