# Zinguería Cocciaretti — Sitio web

Sitio de una sola página para **Zinguería Cocciaretti** (Sierra de la Ventana).
Objetivo: que los seis servicios queden claros y generar contactos por WhatsApp y teléfono.

Concepto de diseño: **"La página está hecha de chapa"** — tipografía monumental con
gradiente galvanizado, secciones que se solapan con bordes corrugados como chapas de un
techo, los servicios presentados como órdenes de trabajo del taller (OT-01 a OT-06) y la
garantía como un sello de goma estampado sobre la boleta.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Toda la página (incluye logo, sello, iconos y mapa en SVG) |
| `css/styles.css` | Estilos (paleta, tipografías, animaciones) |
| `js/main.js` | Interacciones (contador, sello, revelados). El sitio funciona completo sin JavaScript |
| `favicon.svg` | Ícono de pestaña (la marca: casa de chapa plegada con la C-canaleta) |
| `favicon-32.png` / `apple-touch-icon.png` | Íconos raster para Safari/iPhone |
| `og.png` | Imagen de vista previa (1200×630) para compartir el link por WhatsApp/redes |

Sin dependencias ni build: es HTML/CSS/JS estático. Las tipografías se cargan de
Google Fonts (Anton, Archivo, Archivo Narrow, Caveat, IBM Plex Mono — todas de licencia libre).

## Cómo publicarlo

Cualquiera de estas opciones, en menos de 5 minutos:

1. **Netlify Drop** (gratis): entrar a https://app.netlify.com/drop y arrastrar la carpeta completa.
2. **Vercel**: `npx vercel` dentro de la carpeta.
3. **Hosting tradicional (cPanel/FTP)**: subir los archivos tal cual a `public_html`.

Para verlo localmente:

```bash
npx serve .
```

## ⚠️ Verificar antes de publicar

- **Número de contacto**: confirmado por el cliente: **+54 9 2916 44-2231**
  (el flyer impreso decía "291 442231", con el código de área incompleto).
  Los enlaces usan `wa.me/5492916442231` y `tel:+5492916442231`. Antes de
  publicar, dar un toque a ambos botones desde un celular como prueba final.
- **Enlace "Cómo llegar"**: apunta a una búsqueda de Google Maps de "Del Arroyo 395,
  Sierra de la Ventana". Verificar que caiga en el taller y, si el negocio tiene ficha
  de Google Business, reemplazarlo por el enlace directo de la ficha.
- **Dominio**: cuando haya dominio propio, agregar en el `<head>`:
  `"url": "https://..."` en el bloque JSON-LD, `<link rel="canonical" ...>`, y
  `<meta property="og:image" content="https://SUDOMINIO/og.png">` (la imagen `og.png`
  ya está lista en la carpeta; WhatsApp exige URL absoluta, por eso no viene cargada).
- **Especificaciones de servicios**: confirmar con el dueño los specs de las tarjetas
  (tipos de claraboyas, si venden salamandras o solo instalan conductos, etc.) y
  ajustar el texto si hace falta.

## Nota de marca

**Eslogan**: el flyer original decía "Soluciones que protegen tu hogar, por siempre";
se reemplazó por decisión del cliente por **"Del taller a tu techo, hace 50 años."**
(tono profesional argentino, y sin limitar el negocio a viviendas: también hacen
oficinas, galpones, etc.).

El sello de garantía conserva el monograma **HC** dentro de la casita porque así
aparece en el flyer original del taller: es la marca heredada con 50 años de
reconocimiento local. El logo principal nuevo evoluciona esa casa: está dibujada como
una cinta de chapa plegada, el alero derecho remata en un gancho de canaleta y la
letra interior es una **C que es, a la vez, el perfil de una canaleta** — el oficio
metido en la letra.

## Dónde editar los textos

Todos los textos visibles están en `index.html`, en orden de lectura: héroe → cinta →
servicios (las seis tarjetas `article.ot`) → 50 años → garantía → zona → contacto → pie.
Cada tarjeta de servicio tiene su propio mensaje precargado de WhatsApp en el enlace
`wa.me` (parámetro `text=`), así el taller sabe qué le van a pedir antes de contestar.
