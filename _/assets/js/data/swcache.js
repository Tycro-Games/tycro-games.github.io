const resource = [
  /* --- CSS --- */
  '/tycro-games/assets/css/jekyll-theme-chirpy.css',

  /* --- PWA --- */
  '/tycro-games/app.js',
  '/tycro-games/sw.js',

  /* --- HTML --- */
  '/tycro-games/index.html',
  '/tycro-games/404.html',

  
    '/tycro-games/categories/',
  
    '/tycro-games/tags/',
  
    '/tycro-games/archives/',
  
    '/tycro-games/about/',
  

  /* --- Favicons & compressed JS --- */
  
  
    '/tycro-games/assets/img/favicons/android-chrome-192x192.png',
    '/tycro-games/assets/img/favicons/android-chrome-512x512.png',
    '/tycro-games/assets/img/favicons/apple-touch-icon.png',
    '/tycro-games/assets/img/favicons/favicon-16x16.png',
    '/tycro-games/assets/img/favicons/favicon-32x32.png',
    '/tycro-games/assets/img/favicons/favicon.ico',
    '/tycro-games/assets/img/favicons/mstile-150x150.png',
    '/tycro-games/assets/js/dist/categories.min.js',
    '/tycro-games/assets/js/dist/commons.min.js',
    '/tycro-games/assets/js/dist/home.min.js',
    '/tycro-games/assets/js/dist/misc.min.js',
    '/tycro-games/assets/js/dist/page.min.js',
    '/tycro-games/assets/js/dist/post.min.js'
];

/* The request url with below domain will be cached */
const allowedDomains = [
  

  'localhost:4000',

  

  'fonts.gstatic.com',
  'fonts.googleapis.com',
  'cdn.jsdelivr.net',
  'polyfill.io'
];

/* Requests that include the following path will be banned */
const denyUrls = [];

