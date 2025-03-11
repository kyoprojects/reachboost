(function () {
  function injectScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    document.head.appendChild(script);
    console.log('Appended:', src);
  }

  const pages = ['pricing', 'about', 'contact'];
  const locales = ['nl'];

  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const hasLocale = locales.includes(pathSegments[0]);
  const page = hasLocale ? (pathSegments.length > 1 ? pathSegments[1] : 'home') : pathSegments.length ? pathSegments[0] : 'home';

  console.log('page =', page);

  let baseUrl;
  if (window.location.hostname === 'www.reachboost.io') {
    baseUrl = 'https://kyoprojects.github.io/reachboost';
  } else {
    baseUrl = 'http://localhost:3000/reachboost';
  }

  injectScript(`${baseUrl}/global.js`);

  if (page === 'home') {
    injectScript(`${baseUrl}/home.js`);
  } else if (pages.includes(page)) {
    injectScript(`${baseUrl}/${page}.js`);
  }
})();
