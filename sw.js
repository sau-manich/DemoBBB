self.addEventListener('install', (e) => {
  console.log('SW instalado');
  e.waitUntil(
    caches.open('bbb-store').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/index2.html',
        '/index3.html',
        '/index4.html',
        '/index5.html',
        '/css/intro.css',
        '/css/carrito.css',
        '/css/login.css',
        '/css/pay.css',
        '/css/productos.css',
        '/js/carrito.js',
        '/js/pay.js',
        '/js/productos.js',
        '/img/alexa.gif',
        '/img/battery.gif',
        '/img/camera.gif',
        '/img/logo.gif',
        '/img/microfono.gif',
        '/img/monopatin.gif',
        '/img/mouse.gif',
        '/img/pay.gif',
        '/img/tambor.gif',
        '/img/trompeta.gif',
        '/img/tv.gif'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
