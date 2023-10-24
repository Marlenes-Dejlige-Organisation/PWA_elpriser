
const staticCacheNames = "site-static-v1.02"

const assets = [
    '/', 
    '/index.html',
    'assets/css/style.css'

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
        caches.open(staticCacheNames).then(cache=>{
            console.log('skriver til statisk cache')
            cache.addAll(assets); 
        })
    )
})
// aktiver Service Worker
self.addEventListener('activate', event => {
	console.log('Service Worker has been activated');
    event.waitUntil(
        //det der sker i det der kommer her: den sletter tidligere caches, sådan at browsewren kun gemmer 1
        caches.keys().then(keys=>{
                const filteredkeys = keys.filter(key=>key!==staticCacheNames)
                filteredkeys.map(key=>caches.delete(key));
        })
    )
})

//NB der er ingen fetch
