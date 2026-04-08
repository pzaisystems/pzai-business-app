// PZAI Business PWA — main page logic
// Pure vanilla JS. No build step.

(function () {
  'use strict';

  // PLACEHOLDER: real slug will be loaded from auth/session in Phase 1
  const CUSTOMER_SLUG = 'demo-restaurant';
  const REVIEW_PASS_ENDPOINT = '/api/review-pass/' + CUSTOMER_SLUG;
  // PLACEHOLDER: real VAPID public key wired in Phase 1
  const VAPID_PUBLIC_KEY_PLACEHOLDER = 'REPLACE_ME_WITH_REAL_VAPID_PUBLIC_KEY';

  // ---------- Service worker registration ----------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(function (reg) {
          console.log('[pzai] service worker registered, scope:', reg.scope);
        })
        .catch(function (err) {
          console.warn('[pzai] service worker registration failed:', err);
        });
    });
  }

  // ---------- PWA install prompt handling ----------
  let deferredInstallPrompt = null;

  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    deferredInstallPrompt = event;
    console.log('[pzai] install prompt available');
    // Phase 1: surface a custom "Install PZAI" button somewhere subtle.
  });

  window.addEventListener('appinstalled', function () {
    console.log('[pzai] app installed to home screen');
    deferredInstallPrompt = null;
    showToast('Installed! Find PZAI on your home screen.');
  });

  // ---------- Toast helper ----------
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message, ms) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('toast--visible');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('toast--visible');
    }, ms || 2800);
  }

  // ---------- "Everything's Good" — the killer button ----------
  const everythingGoodBtn = document.getElementById('everythingGoodBtn');

  function triggerReviewPass(source) {
    console.log('[pzai] review-pass triggered, source=', source || 'tap');
    // Optimistic UI — assume success and update freshness immediately.
    setFreshnessGreen('All items refreshed just now', 'Oldest item: just now');

    // POST to placeholder endpoint
    fetch(REVIEW_PASS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: source || 'tap', client_ts: new Date().toISOString() })
    })
      .then(function (res) {
        console.log('[pzai] review-pass response status:', res.status);
      })
      .catch(function (err) {
        // PLACEHOLDER backend won't exist yet — just log.
        console.log('[pzai] review-pass POST failed (expected during scaffold):', err.message);
      });

    showToast("Refreshed — visitors will see fresh timestamps.");
  }

  if (everythingGoodBtn) {
    everythingGoodBtn.addEventListener('click', function () {
      triggerReviewPass('tap');
    });
  }

  // ---------- Freshness UI helpers ----------
  function setFreshnessGreen(detail, oldest) {
    const dot = document.getElementById('freshnessDot');
    const detailEl = document.getElementById('freshnessDetail');
    const oldestEl = document.getElementById('freshnessOldest');
    if (dot) {
      dot.classList.remove('freshness-dot--yellow', 'freshness-dot--red');
      dot.classList.add('freshness-dot--green');
    }
    if (detailEl && detail) detailEl.textContent = detail;
    if (oldestEl && oldest) oldestEl.textContent = oldest;
  }

  // ---------- 86-a-dish quick action (placeholder) ----------
  const eightySixBtn = document.getElementById('eightySixBtn');
  if (eightySixBtn) {
    eightySixBtn.addEventListener('click', function () {
      // Phase 2: open a sheet listing today's menu items, tap one to 86 it.
      showToast('Coming soon — menu list with one-tap 86.');
    });
  }

  // ---------- Push notification permission flow ----------
  function maybeRequestPushPermission() {
    if (!('Notification' in window)) return;
    if (!('serviceWorker' in navigator)) return;
    if (!('PushManager' in window)) return;

    // Don't nag — only ask after the user has interacted at least once.
    if (Notification.permission === 'default') {
      console.log('[pzai] push permission state: default — will prompt on first action');
    } else {
      console.log('[pzai] push permission state:', Notification.permission);
    }
  }

  function requestPushPermissionNow() {
    if (!('Notification' in window)) return Promise.resolve('unsupported');
    return Notification.requestPermission().then(function (perm) {
      console.log('[pzai] push permission result:', perm);
      if (perm === 'granted') subscribePush();
      return perm;
    });
  }

  function subscribePush() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    navigator.serviceWorker.ready
      .then(function (reg) {
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: VAPID_PUBLIC_KEY_PLACEHOLDER
        });
      })
      .then(function (sub) {
        console.log('[pzai] push subscription:', sub && sub.endpoint);
        // Phase 1: POST sub to backend so the cron nudges can target this device.
      })
      .catch(function (err) {
        console.log('[pzai] push subscribe failed (expected during scaffold):', err.message);
      });
  }

  // Ask for push permission on first "Everything's Good" tap (a meaningful interaction)
  if (everythingGoodBtn) {
    everythingGoodBtn.addEventListener('click', function once() {
      everythingGoodBtn.removeEventListener('click', once);
      requestPushPermissionNow();
    });
  }

  // ---------- URL-driven shortcuts (?action=review-pass from PWA shortcut / push) ----------
  function handleUrlActions() {
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    if (action === 'review-pass') {
      triggerReviewPass(params.get('source') || 'shortcut');
    } else if (action === 'eighty-six' && eightySixBtn) {
      eightySixBtn.click();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    maybeRequestPushPermission();
    handleUrlActions();
  });
})();
