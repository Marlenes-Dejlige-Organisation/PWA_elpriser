
const staticCacheNames = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";

const assets = [
    '/', 
    '/index.html',
    '/assets/css/style.css'
  ]

if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(reg => console.log('service worker registered', reg))
	.catch(err => console.error('service worker not registered', err)) 
}

// Install Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker has been installed');
    event.waitUntil(
        caches.open(staticCacheNames)
            .then(cache => {
                console.log('skriver til statisk cache');
                return cache.addAll(assets);
            })
            .catch(error => {
                console.error('Error adding assets to cache:', error);
            })
    );
});

// aktiver Service Worker. her rydder vi op i tidligere versioner af cache
self.addEventListener('activate', event => {
    console.log('Service Worker has been activated');
    event.waitUntil(
        caches.keys().then(keys => {
            const filteredKeys = keys.filter(key => key !== staticCacheNames)
            filteredKeys.map(key => caches.delete(key));
        })
    );
});

//Dette er det kodeeksempel heinz skrev på siden:

self.addEventListener('fetch', event =>{
    if(!(event.request.url.indexOf('http')=== 0))return
    event.respondWith(
        caches.match(event.request).then(cacheResult =>{
            return(
                cacheResult ||
                fetch(event.request).then(async fetchRes=>{
                    return caches.open(dynamicCacheName).then(cache=>{
                        cache.put(event.request.url,fetchRes.clone())
                        return fetchRes
                    })
                })
            )
        })
    )
})

//Dette er koden fra opgaven:
// self.addEventListener('fetch', event => {
    
//     // Kontroller svar på request
//     event.respondWith(
//         // Kig efter file match i cache 
//         caches.match(event.request).then(cacheRes => {
//             // Returner match fra cache - ellers hent fil på server
//             return cacheRes || fetch(event.request).then(fetchRes => {
//                 // Tilføjer nye sider til cachen
//                 return caches.open(dynamicCacheName).then(cache => {
//                     // Bruger put til at tilføje sider til vores cache
//                     // Læg mærke til metoden clone
//                     cache.put(event.request.url, fetchRes.clone());
//                     // Returnerer fetch request
//                     return fetchRes;
//                 });
//             }).catch(err => {
//                 console.error('Fetch error:', err);
//             });
//         })
//     );
// });
