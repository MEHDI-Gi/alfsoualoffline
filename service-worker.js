var CACHE_NAME = "my-site-cache-v1";
var filesToCache = [
    "/index.html",
    "./style.css",
    "./fonts/Cairo-VariableFont_slnt,wght.ttf",
    "./main.js",
    "./img/i1.webp",
    "./img/i2.jpg",
    "./img/i3.jpg",
    "./img/i4.jpg",
    "./img/i5.jpg",
    "./Quiz.json",
];

self.addEventListener("install", function (event) {
event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
        console.log("Opened cache");
        return cache.addAll(filesToCache);
    })
)
});
self.addEventListener("activate", (event) => {
    console.log("Service worker activate event!")
})
