// service-worker.js
self.addEventListener('install', (event) => {
  console.log('Service Worker: Install');
  event.waitUntil(
    caches.open('static-cache-v1')  // Usa un nombre versionado para el caché
      .then((cache) => {
        return cache.addAll([
          "/",
          "/index.html",
          "/Modelos.html",
          "/Animaciones.html",
          "/Proyectos.html",
          "/JS/Script.js",
          "/manifest.json",
          "/CSS/Style.css",
          "/CSS/Style2.css",
          "/CSS/Style3.css",
          "/CSS/Style4.css",
          "/img/IconoAplicacion192.png",
          "/img/IconoAplicacion.png",
          "/img/IconoAplicacion144.png",
          "/img/Screenshot.png",
          "/img/FotoPortada.png",
          "/img/Icono.png",
          "/img/Logo.gif",
          "/img/Aros.jpeg",
          "/img/Cueva.jpg",
          "/img/Escenario.jpg",
          "/img/Globo.jpg",
          "/img/Nave.jpg",
          "/img/Render.jpg",
          "/img/Pasillo.jpg",
          "/img/Vacio.jpg",
          "/img/Araña.mp4",
          "/img/Globo.mp4",
          "/img/Nave.mp4",
          "/img/Taza.mp4",
          "/img/Personaje2D.jpg",
          "/img/Personaje2.jpg",
          "/img/Video1.mp4",
          "/img/Video3.mp4",
          "/img/Video4.mp4",
          "/img/Fondo1.png",
          "/img/Fondo2.png",
          "/img/FondoIntro.png",
          "/img/FondoSeleccion.png",
          "/img/Videojuego 2D.mp4",
          "/img/Videojuego 2D2.mp4",
          "/img/Videojuego 2D3.mp4",
          "/img/Modelos.png",
          "/img/Anim1.jpg",
          "/img/Proyectos.jpg"
        ]);
      })
      .catch((err) => {
        console.error('Error al cargar archivos en caché:', err);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== 'static-cache-v1') {
            console.log('Service Worker: Eliminando caché antiguo:', cache);
            return caches.delete(cache); // Limpia versiones antiguas
          }
        })
      );
    }).then(() => self.clients.claim()) // Asegura que este SW controle las pestañas activas
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Si hay respuesta en caché, úsala
      }

      // Si no está en caché, realiza la petición de red
      return fetch(event.request).catch(() => {
        // Si la petición de red falla, retorna el archivo de respaldo (index.html)
        if (event.request.destination === 'document') {
          return caches.match('/index.html'); // Página de respaldo
        }
      });
    })
  );
});
