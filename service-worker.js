
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);


workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1'},
    { url: '/manifest.json', revision: '1' },
    { url: '/offline_page.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/match.heml', revision: '1' },
    { url: '/club_information.html', revision: '1' },
    { url: '/standing.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/about.html', revision: '1' },
    { url: '/pages/my_favorite_clubs.html', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/images/logo.png', revision: '1' },
    { url: '/images/premiere_league_emblem.jpg', revision: '1' },
    { url: '/images/bundesliga.svg', revision: '1' },
    { url: '/images/la_liga.png', revision: '1' },
    { url: '/images/ligue_1.png', revision: '1' },
    { url: '/images/eredivisie.jpg', revision: '1' },
    { url: '/images/serie_a.jpg', revision: '1' }, 
    { url: 'icons/iphone/apple-launch-1125x2436.png', revision:'1' },
    { url: 'icons/icon-128x128.png', revision: '1' },
    { url: 'icons/icon-144x144.png', revision: '1' },
    { url: 'icons/icon-192x192.png', revision: '1' },
    { url: 'icons/icon-256x256.png', revision: '1' },
    { url: 'icons/icon-384x384.png', revision: '1' },
    { url: 'icons/icon-512x512.png', revision: '1' },
]);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
);


const offlinePage = '/offline/';
/**
 * Pages to cache
 */
workbox.routing.registerRoute(
  new RegExp('/pages/'),
  async ({event}) => {
    try {
      return await workbox.strategies.staleWhileRevalidate({
          cacheName: 'cache-pages'
      }).handle({event});
    } catch (error) {
      return caches.match(offlinePage);
    }
  }
);

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'images/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Top Euro League', options)
  );
});

