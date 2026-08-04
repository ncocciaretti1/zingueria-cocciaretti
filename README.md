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
| `robots.txt` / `sitemap.xml` | SEO técnico: indexación y mapa del sitio |
| `404.html` | Página de error propia ("OT-404") con botones de contacto |
| `site.webmanifest` + `icon-192/512.png` | "Agregar a pantalla de inicio" con ícono y colores de marca |

Sin dependencias ni build: es HTML/CSS/JS estático. Las tipografías se cargan de
Google Fonts (Anton, Archivo, Archivo Narrow, Caveat, IBM Plex Mono — todas de licencia libre).

## Publicación (ya en producción)

- **URL**: https://www.cocciaretti.com (con HTTPS; el dominio sin `www` y `http://`
  redirigen ahí con 308)
- **Hosting**: **Vercel**, proyecto `zingueria-cocciaretti`, conectado al repo
  [`ncocciaretti1/zingueria-cocciaretti`](https://github.com/ncocciaretti1/zingueria-cocciaretti).
- **Dominio**: comprado en GoDaddy; DNS apuntado a Vercel
  (A `@` → 76.76.21.21 · CNAME `www` → cname.vercel-dns.com).
- **Para actualizar el sitio**: editar los archivos y `git add -A && git commit && git push`.
  Vercel despliega solo en ~1 minuto. (Deploy manual, si hiciera falta: `npx vercel deploy --prod`.)

> **Por qué Vercel y no GitHub Pages**: el certificado HTTPS de GitHub Pages quedó
> atascado en estado "new" durante 3 días pese a tener el DNS perfecto (verificado con
> su propio health check y con los registros públicos de Certificate Transparency);
> su soporte no cubre planes gratuitos. Vercel emitió el certificado en 2 minutos y
> además permite headers de seguridad (HSTS, X-Frame-Options, etc.), imposibles en Pages.

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

## Endurecimiento aplicado (auditoría 01/08/2026)

- **Tipografías autoalojadas** en `/fonts/` (subset latin, 211 KB): el sitio no depende
  de ningún servidor externo. CSP activo por meta-tag en ambas páginas.
- **CI en cada push**: número de contacto canónico verificado en todos los enlaces +
  validación de HTML. Chequeo de enlaces externos semanal. **Monitoreo de
  disponibilidad cada 30 min** que abre un issue si el sitio no responde.
- Rama `main` protegida (sin force-push ni borrado). `.nojekyll`. Hoja de impresión
  (el teléfono ya no se imprime invisible). Teléfonos con espacios irrompibles.

## Seguridad de cuentas y DNS — COMPLETADO (01/08/2026)

- ✅ Validación telefónica de GoDaddy completada (panel DNS operativo).
- ✅ Anti-suplantación de correo: SPF `v=spf1 -all` + MX nulo (RFC 7505) +
  DMARC `p=reject` estricto — verificados en ambos nameservers.
- ✅ **Dominio verificado en GitHub** (TXT challenge cargado y "Successfully
  verified"): nadie puede reclamar cocciaretti.com en Pages aunque el repo se borre.
- ✅ CNAME `www` → `ncocciaretti1.github.io` (forma recomendada por GitHub).
- ✅ **Renovación automática del dominio activada** (vence 31/07/2027, 21,99 €/año);
  bloqueo de transferencia y privacidad WHOIS ya estaban activos.

**Único pendiente de seguridad**: activar 2FA con app de autenticación en GitHub
(Settings → Password and authentication) y en GoDaddy (Configuración → Seguridad),
guardando los códigos de recuperación impresos.

## Próximos pasos recomendados (requieren cuentas del dueño)

1. **Google Business Profile** (el más importante para un negocio local): crear la
   ficha en https://business.google.com con la dirección, el teléfono y el sitio.
   Es lo que hace aparecer al taller en Google Maps y en las búsquedas "zinguería
   cerca mío". Gratis.
2. **Google Search Console**: dar de alta https://www.cocciaretti.com en
   https://search.google.com/search-console (verificación por registro DNS TXT en
   GoDaddy) y enviar el sitemap. Permite ver con qué búsquedas llega la gente.
3. **Validación pendiente en GoDaddy**: la cuenta tiene un formulario obligatorio de
   verificación de teléfono sin completar; hasta que no se haga, el panel de DNS
   carga con problemas. Al completarlo, cambiar el CNAME `www` para que apunte a
   `ncocciaretti1.github.io` (forma recomendada por GitHub Pages).

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
