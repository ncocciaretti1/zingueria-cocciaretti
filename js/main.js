/* Zinguería Cocciaretti — movimiento "taller, no circo".
   Todo con IntersectionObserver y transiciones CSS. Sin librerías.
   La clase .js se pone acá y no en un script inline: si este archivo
   no llega a cargar, la página queda en estado no-js, completa y visible. */
(function () {
  'use strict';

  document.documentElement.className =
    document.documentElement.className.replace('no-js', 'js');

  var doc = document;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tieneIO = 'IntersectionObserver' in window;

  /* Sombra de la cabecera al hacer scroll */
  var cabecera = doc.querySelector('.cabecera');
  if (cabecera) {
    var alRodar = function () {
      cabecera.classList.toggle('rodando', window.scrollY > 8);
    };
    window.addEventListener('scroll', alRodar, { passive: true });
    alRodar();
  }

  /* FAB de WhatsApp: aparece recién cuando el héroe sale de pantalla */
  var fab = doc.getElementById('fab');
  var heroe = doc.getElementById('inicio');
  if (fab && heroe && tieneIO && !reduce) {
    new IntersectionObserver(function (entradas) {
      var ultima = entradas[entradas.length - 1];
      fab.classList.toggle('visible', !ultima.isIntersecting);
    }, { threshold: 0.12 }).observe(heroe);
  } else if (fab) {
    fab.classList.add('visible');
  }

  /* Botón de pausa de la cinta (WCAG 2.2.2). Solo aparece si la cinta
     efectivamente se mueve (hay JS y no hay reduced-motion). */
  var pausaCinta = doc.getElementById('pausaCinta');
  var cinta = doc.getElementById('cinta');
  if (pausaCinta && cinta && !reduce) {
    pausaCinta.hidden = false;
    pausaCinta.addEventListener('click', function () {
      var quieta = cinta.classList.toggle('cinta--quieta');
      pausaCinta.setAttribute('aria-pressed', quieta ? 'true' : 'false');
      pausaCinta.setAttribute('aria-label',
        quieta ? 'Reanudar el movimiento de la cinta' : 'Pausar el movimiento de la cinta');
    });
  }

  /* Revelado de bloques al entrar al viewport */
  var revelables = doc.querySelectorAll('.revelar');
  if (tieneIO && !reduce) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visto');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    revelables.forEach(function (el) { io.observe(el); });
  } else {
    revelables.forEach(function (el) { el.classList.add('visto'); });
  }

  /* Contador 0 → 50, a trinquete (pasos visibles, cuenta de taller) */
  var cifra = doc.getElementById('cifra50');
  if (cifra && tieneIO && !reduce) {
    var contado = false;
    new IntersectionObserver(function (entradas) {
      if (!entradas[0].isIntersecting || contado) { return; }
      contado = true;
      var inicio = null;
      var duracion = 1400;
      var paso = function (ts) {
        if (!inicio) { inicio = ts; }
        var p = Math.min((ts - inicio) / duracion, 1);
        var suave = 1 - Math.pow(1 - p, 3);
        cifra.textContent = String(Math.round(suave * 50));
        if (p < 1) { requestAnimationFrame(paso); } else { cifra.textContent = '50'; }
      };
      requestAnimationFrame(paso);
    }, { threshold: 0.5 }).observe(cifra);
  }

  /* El sello se estampa una sola vez sobre la boleta */
  var boleta = doc.getElementById('selloGarantia');
  if (boleta && tieneIO) {
    new IntersectionObserver(function (entradas) {
      if (entradas[0].isIntersecting) {
        boleta.classList.add('estampado');
      }
    }, { threshold: 0.6 }).observe(boleta);
  } else if (boleta) {
    boleta.classList.add('estampado');
  }

  /* Copiar dirección del taller. El botón nace oculto en el HTML y solo
     se muestra si la Clipboard API existe (requiere https): nunca un
     botón muerto. La dirección ya está visible en texto al lado. */
  var botonCopiar = doc.getElementById('copiarDireccion');
  if (botonCopiar && navigator.clipboard && navigator.clipboard.writeText) {
    botonCopiar.hidden = false;
    var etiqueta = botonCopiar.querySelector('span');
    botonCopiar.addEventListener('click', function () {
      if (botonCopiar.dataset.ocupado) { return; }
      var direccion = 'Del Arroyo 395, B° San Bernardo, Sierra de la Ventana, Buenos Aires';
      var avisar = function (texto) {
        botonCopiar.dataset.ocupado = '1';
        var original = etiqueta.textContent;
        etiqueta.textContent = texto;
        setTimeout(function () {
          etiqueta.textContent = original;
          delete botonCopiar.dataset.ocupado;
        }, 2200);
      };
      navigator.clipboard.writeText(direccion).then(
        function () { avisar('¡Dirección copiada!'); },
        function () { avisar('Anotala: Del Arroyo 395'); }
      );
    });
  }
})();
