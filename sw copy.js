const staticCacheName = 'siteStatic-v1'

const assets = [
    "/", 
    "/index.html",
    "/css/style.css"
  ]

if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(reg => console.log('service worker registered', reg))
	.catch(err => console.error('service worker not registered', err)) 
}

// Install Service Worker
self.addEventListener('install', (event) => {
	console.log('Service Worker has been installed')
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('write asset file to cache')
            cache.addAll(assets);
        })
    )
    console.log('Service Worker has been installed2');
})

// Install Service Worker
self.addEventListener('activate', event => {
	console.log('Service Worker has been activated');
})

// Fetch event
self.addEventListener('fetch', event => {
	console.log('Fetch event', event)
})

//activate serviceworker
self.addEventListener('activate', (event) => {
	console.log(' activate event is here!', event);

    event.waitUntil(
        caches.keys().then(keys => {
            const filteredkeys = keys.filter(key => key !== staticCacheName )
            // console.log(filteredkeys);
            filteredkeys.map(key => {
                caches.delete(key)
            })


            keys.filter(key => key !== staticCacheName).map
        })
    )
    console.log(caches.keys)


})
