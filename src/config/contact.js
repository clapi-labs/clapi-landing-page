// Datos de contacto oficiales de CLAPI. Única fuente: footer, navbar y todos
// los CTA leen de aquí, así que cambiar el número es tocar solo este archivo.
const PHONE_DIGITS = '573001095369';

export const PHONE_DISPLAY = '+57 300 109 5369';
export const PHONE_TEL = `tel:+${PHONE_DIGITS}`;

export const WHATSAPP_MESSAGE = 'Hola, me interesa conocer más sobre los servicios de CLAPI.';
export const WHATSAPP_URL = `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const INSTAGRAM_URL = 'https://www.instagram.com/clapi.solutions/';

// Props para cualquier <a>/<Button as="a"> que abra WhatsApp en otra pestaña.
export const whatsappLinkProps = { href: WHATSAPP_URL, target: '_blank', rel: 'noreferrer' };
