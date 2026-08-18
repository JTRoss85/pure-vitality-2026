/* Pure Vitality — site.js
   Three jobs: the mobile nav toggle, a GA event on tel: clicks, the copyright year.
   The Services dropdown opens on hover and keyboard focus in CSS; this only adds
   click-to-expand, which is what the mobile panel needs. */
(function () {
  'use strict';

  // --- mobile nav panel ---
  var navToggle = document.querySelector('[data-pv-navtoggle]');
  var nav = document.getElementById('pv-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // --- Services group, expandable inside the panel ---
  var services = document.querySelector('[data-pv-services]');

  if (services) {
    services.addEventListener('click', function () {
      var open = services.getAttribute('aria-expanded') === 'true';
      services.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }

  // --- GA4 event on every tel: link ---
  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'phone_call_click', {
          link_url: link.getAttribute('href'),
          page_path: window.location.pathname
        });
      }
    });
  });

  // --- copyright year ---
  document.querySelectorAll('[data-pv-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
