/* Pure Vitality — site.js
   Jobs: the mobile nav toggle, phone-tap tracking for GTM, the contact form send, the copyright year.
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

  // --- phone taps: push a dataLayer event for GTM ---
  // GA4 loads through GTM's Google tag, which ignores gtag('event') calls made from
  // page code. A plain dataLayer event is what GTM's "phone_call_click" Custom Event
  // trigger listens for; the GA4 Event tag in GTM sends it on to Analytics.
  window.dataLayer = window.dataLayer || [];
  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      window.dataLayer.push({
        event: 'phone_call_click',
        link_url: link.getAttribute('href'),
        page_path: window.location.pathname
      });
    });
  });

  // --- contact form: send to Formspree in the background, then land on ?sent=1 ---
  // Formspree's free plan ignores the _next redirect, so visitors were ending up on
  // Formspree's own thank-you page and the GA4 generate_lead event (which fires on
  // /contact?sent=1) never ran. Sending in the background keeps them on our site.
  var form = document.querySelector('form.pv-form[action*="formspree.io"]');
  if (form && window.fetch && window.FormData) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending\u2026'; }
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (!res.ok) { throw new Error('send failed'); }
        window.location.href = '/contact?sent=1#pv-sent';
      }).catch(function () {
        // Fall back to a normal post so the message still goes through.
        form.submit();
      });
    });
  }

  // --- thank-you note after a message is sent ---
  var sentNote = document.getElementById('pv-sent');
  if (sentNote && /[?&]sent=1/.test(window.location.search)) {
    sentNote.hidden = false;
    if (form) { form.hidden = true; }
  }

  // --- copyright year ---
  document.querySelectorAll('[data-pv-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
