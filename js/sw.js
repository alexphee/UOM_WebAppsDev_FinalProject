self.addEventListener("install", e=> {
    e.waitUntil(
        chaces.open("static").then(cache=>
            {
                return cache.addAll([
                    './index.html',
                    './index2.html',
                    './cycling.html',
                    './exercise.html',
                    './main.html',
                    './running.html',
                    './swimming.html',
                    './js/cycling.js',
                    './js/exercise.js',
                    './js/index.js',
                    './js/index2.js',
                    './js/main.js',
                    './js/running.js',
                    './js/swimming.js',
                    './js/sw.js',
                    './manifest.json',
                    './style.css',
                    './styleIndex.css',
                    './styleIndex2.css',
                    './images/bikerPurple.png',
                    './images/exerciserPurple.png',
                    './images/runnerPurple.png',
                    './images/swimmerPurple.png',
                    './images/logo.png',
                    './images/logo225.png',
                    './images/logo512.png',
                    './images/favi.ico'
                ])
            })
    );
        });

       
        self.addEventListener("fetch",e =>
{
    e.respondWith(
        caches.match(e.request).then( response =>
            {
                return response || fetch(e.request);
            })
        
    );
    
});