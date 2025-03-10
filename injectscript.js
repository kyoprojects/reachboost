document.addEventListener('DOMContentLoaded', () => {
  (function () {
    function injectScript(src) {
      const script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.async = true;
      document.head.appendChild(script);
      console.log('appended ', src);
    }

    const currentUrl = window.location.href;
    const path = window.location.pathname;

    let baseUrl;
    if (currentUrl.includes('https://www.reachboost.io/')) {
      baseUrl = 'https://kyoprojects.github.io/reachboost';
    } else {
      baseUrl = 'http://localhost:3000/reachboost';
    }

    const scriptUrl = `${baseUrl}${path}.js`;

    injectScript(`${baseUrl}/global.js`);
    injectScript(scriptUrl);
  })();
});
