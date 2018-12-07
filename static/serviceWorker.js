function install(event) {
    console.log('install')
    event.waitUntil(
        caches.open('static-content')
        .then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/vendor.js',
                '/app.js',
            ])
        })
    )
}

function activate(event) {
    console.log('activate')
}

function handleFetch(event) {
    console.log('fetch')
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if(response) {
                return response
            }

            return fetch(event.request)
        })
        .catch(function () {
            return caches.match('/index.html')
        })
    )
}

self.addEventListener('install', install)

self.addEventListener('fetch', handleFetch)

self.addEventListener('activate', activate)