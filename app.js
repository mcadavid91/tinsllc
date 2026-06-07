// TINS Studio — vanilla JS, hash-routed single-page site.
// Three pages: About (landing), Apps, Contact.

(function () {
  'use strict';

  const { APPS } = window.TINS_DATA;

  /* ----------------------------------------------------------
     Helpers
  ---------------------------------------------------------- */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

  /* ----------------------------------------------------------
     Icons (stroke, minimal, monoline)
  ---------------------------------------------------------- */
  const ICON_PATHS = {
    'arrow-right': '<path d="M5 12h14M13 5l7 7-7 7"/>',
    'check':       '<path d="M5 12l4 4 10-10"/>',
    'mail':        '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    'apple':       '<path d="M16 4c0 2-1.6 3.5-3.5 3.5C12.5 5.5 14 4 16 4z"/><path d="M19 16c-.7 1.6-1 2.3-1.9 3.6-1.3 1.8-3.1 4-5.3 4-2 0-2.5-1.3-5.2-1.3s-3.2 1.3-5.2 1.3"/>',
    'clock':       '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'globe':       '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    'lock':        '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/>',
  };
  function icon(name, size = 18, stroke = 1.6, style = '') {
    const p = ICON_PATHS[name];
    if (!p) return '';
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round"
      stroke-linejoin="round"${style ? ` style="${style}"` : ''}>${p}</svg>`;
  }

  /* ----------------------------------------------------------
     Shared primitives
  ---------------------------------------------------------- */
  function appTile(app, size = 56) {
    return `<div class="app-tile" style="width:${size}px;height:${size}px;background:${app.color};font-size:${size * 0.55}px">${app.initial}</div>`;
  }

  function eyebrow(text) {
    return `<span class="eyebrow-line">${esc(text)}</span>`;
  }

  // Toast
  let toastTimer = null;
  function showToast(text) {
    document.querySelectorAll('.toast').forEach((n) => n.remove());
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = text;
    document.body.appendChild(el);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.remove(), 2400);
  }

  /* ----------------------------------------------------------
     Nav + Footer
  ---------------------------------------------------------- */
  const ROUTES = [
    { id: 'about',   label: 'About',      path: '#/' },
    { id: 'apps',    label: 'Apps',       path: '#/apps' },
    { id: 'contact', label: 'Contact Us', path: '#/contact' },
  ];

  function navHTML(route) {
    return `<header class="nav"><div class="container nav-inner">
      <a class="nav-brand" href="#/"><span class="logo">T</span><span>TINS Studio</span></a>
      <nav class="nav-links">
        ${ROUTES.map((r) => `<a href="${r.path}" class="nav-link ${route === r.id ? 'active' : ''}">${r.label}</a>`).join('')}
      </nav>
    </div></header>`;
  }

  function footerHTML() {
    return `<footer class="footer"><div class="container">
      <div class="footer-inner">
        <div>
          <div class="nav-brand" style="margin-bottom:14px"><span class="logo">T</span><span>TINS Studio</span></div>
          <p style="max-width:320px;font-size:14px">Software you pay for once and own forever. Built in small batches by a small team.</p>
          <p class="mono dim" style="font-size:12px;margin-top:18px;letter-spacing:0.06em">TINS = There Is No Subscription</p>
        </div>
        <div>
          <h5>TINS Studio</h5>
          <a href="#/">About</a>
          <a href="#/apps">Apps</a>
          <a href="#/contact">Contact Us</a>
        </div>
        <div>
          <h5>Apps</h5>
          <a href="#/apps">ClearFit</a>
        </div>
        <div>
          <h5>Connect</h5>
          <a href="mailto:hello@tinsllc.com">${icon('mail', 14, 1.6, 'vertical-align:-2px;margin-right:6px')}hello@tinsllc.com</a>
        </div>
      </div>
      <div class="footer-bot">
        <span>&copy; 2026 TINS Studio LLC · tinsllc.com</span>
        <span class="mono">There Is No Subscription</span>
      </div>
    </div></div></footer>`;
  }

  /* ----------------------------------------------------------
     About page (landing)
  ---------------------------------------------------------- */
  function aboutHTML() {
    const work = [
      { n: '01', t: 'Small batches', d: 'A short list of apps, each maintained by people who actually use them.' },
      { n: '02', t: 'No accounts', d: 'Our apps don’t need a login. Your data stays on your device.' },
      { n: '03', t: 'No ads', d: 'We are not selling your attention. We don’t even sell our mailing list.' },
      { n: '04', t: 'Free updates', d: 'Forever. If we make a major leap, it’s a new product — never a forced upgrade.' },
      { n: '05', t: 'One-time price', d: 'You pay once and the app is yours. There is no subscription.' },
      { n: '06', t: 'Boring tech', d: 'We use proven, native tools so the apps stay fast on your hardware for years.' },
    ];
    return `
      <section style="padding:64px 0 32px">
        <div class="container">
          ${eyebrow('TINS Studio · An independent software company')}
          <h1 style="margin-top:28px;font-size:clamp(48px,9vw,128px);line-height:0.95;letter-spacing:-0.04em;font-weight:500">
            There&nbsp;Is&nbsp;<span style="color:var(--fg-4)">No</span><br>Subscription.
          </h1>
          <div class="row" style="margin-top:36px;gap:48px;flex-wrap:wrap">
            <p style="font-size:18px;max-width:560px">TINS Studio LLC is an independent software company. We build apps you pay for one time and never again. We don’t sell your data, we don’t run experiments on you — we just ship good software and stand behind it.</p>
            <div class="row" style="gap:10px">
              <a href="#/apps" class="btn btn-primary">See our apps</a>
              <a href="#/contact" class="btn btn-ghost">Contact us</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" style="border-top:1px solid var(--line)">
        <div class="container">
          <div class="grid" style="grid-template-columns:1fr 1.2fr;gap:64px">
            <div>
              ${eyebrow('Mission')}
              <h2 style="margin-top:16px">Make good things. Sell them honestly.</h2>
              <p style="margin-top:20px;font-size:16px">We’d rather make a few things you love than fifty things you tolerate. We update because the app gets better — not because a renewal is coming up.</p>
              <p style="margin-top:14px;font-size:16px">A real person reads every email. No call centers, no chatbots, no dark patterns. Just software and the people who made it.</p>
            </div>
            <div class="card" style="padding:28px">
              ${eyebrow('Manifesto')}
              <h3 style="margin-top:14px;font-size:26px">There Is No Subscription.</h3>
              <p style="margin-top:16px">We sell our apps the old-fashioned way: a price tag, a purchase, and a thing that is now yours. You shouldn’t have to rent the tools you rely on.</p>
              <div class="glow-line" style="margin:20px 0"></div>
              <p class="muted" style="font-size:13px">TINS = There Is No Subscription.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${eyebrow('How we work')}
          <div class="grid grid-3" style="gap:24px;margin-top:24px">
            ${work.map((m) => `<div class="card">
              <div class="mono muted" style="font-size:11px;letter-spacing:0.16em">${m.n}</div>
              <h3 style="margin-top:10px;font-size:18px">${m.t}</h3>
              <p style="margin-top:8px;font-size:14px">${m.d}</p>
            </div>`).join('')}
          </div>
        </div>
      </section>

      <section style="padding:0 0 80px">
        <div class="container">
          <div class="card" style="padding:40px;text-align:center">
            <h3 style="font-size:22px">Pay once. Own it forever.</h3>
            <p style="margin-top:10px;max-width:460px;margin-inline:auto">That’s the whole idea. Take a look at what we make.</p>
            <div class="row" style="justify-content:center;margin-top:22px;gap:10px">
              <a href="#/apps" class="btn btn-primary">See our apps</a>
              <a href="#/contact" class="btn btn-ghost">Say hello</a>
            </div>
          </div>
        </div>
      </section>`;
  }

  /* ----------------------------------------------------------
     Apps page
  ---------------------------------------------------------- */
  function appsHTML() {
    return `<div class="page"><div class="container">
      <div style="max-width:720px;margin-bottom:56px">
        ${eyebrow('Our apps')}
        <h1 style="margin-top:18px">Every app we make. Every one a one-time purchase.</h1>
        <p style="font-size:17px;margin-top:18px">Free updates for life. No accounts. No ads. No subscriptions.</p>
      </div>

      <div class="col gap-md">
        ${APPS.map((app, i) => `
          <div class="card" style="padding:0;overflow:hidden">
            <div class="grid app-card-grid" style="grid-template-columns:320px 1fr auto;align-items:stretch">
              <div style="background:linear-gradient(160deg, ${app.color}, ${app.color}88);display:grid;place-items:center;padding:40px;position:relative;overflow:hidden">
                ${appTile(app, 110)}
                <div style="position:absolute;inset:0;background-image:repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 11px);pointer-events:none"></div>
              </div>
              <div style="padding:32px">
                <div class="row" style="gap:10px;margin-bottom:8px">
                  <span class="mono muted" style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase">№${String(i + 1).padStart(2, '0')}</span>
                  <span class="mono muted" style="font-size:11px;letter-spacing:0.06em">v${esc(app.version)}</span>
                </div>
                <h2 style="font-size:30px;margin-bottom:8px">${esc(app.name)}</h2>
                <p style="font-size:16px;margin-bottom:14px;color:var(--fg)">${esc(app.tagline)}</p>
                <p style="font-size:14px">${esc(app.description)}</p>
                <div class="row" style="gap:16px;margin-top:18px;flex-wrap:wrap">
                  <span class="mono muted" style="font-size:12px">${icon('apple', 13, 1.6, 'vertical-align:-2px;margin-right:6px')}${esc(app.platform)}</span>
                </div>
              </div>
              <div style="padding:32px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end;border-left:1px solid var(--line);min-width:200px">
                <div style="text-align:right">
                  <div class="mono muted" style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase">One-time</div>
                  <div style="font-family:var(--font-display);font-size:36px;font-weight:500;letter-spacing:-0.03em;margin-top:6px">${esc(app.price)}</div>
                </div>
                <div class="col gap-sm" style="width:100%">
                  <a href="#" class="btn btn-primary" style="justify-content:center">Get ${esc(app.name)}</a>
                  <a href="#/contact" class="btn btn-soft btn-sm" style="justify-content:center">Contact us</a>
                </div>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </div></div>`;
  }

  /* ----------------------------------------------------------
     Contact page
  ---------------------------------------------------------- */
  let contactReason = 'support';

  function contactHTML() {
    const details = [
      { ic: 'mail',  label: 'Email',  value: 'hello@tinsllc.com' },
      { ic: 'globe', label: 'Domain', value: 'tinsllc.com' },
      { ic: 'clock', label: 'Hours',  value: 'Mon–Fri · 9a–6p ET' },
    ];
    const reasons = [
      { id: 'support', label: 'App support' },
      { id: 'press',   label: 'Press' },
      { id: 'biz',     label: 'Business' },
      { id: 'other',   label: 'Something else' },
    ];
    return `<div class="page"><div class="container">
      <div class="grid contact-split" style="grid-template-columns:1fr 1.1fr;gap:64px;align-items:flex-start">
        <div>
          ${eyebrow('Get in touch')}
          <h1 style="margin-top:18px">Hello.</h1>
          <p style="font-size:17px;margin-top:16px;max-width:440px">A real person reads every message. We usually reply within one or two business days.</p>

          <div class="col gap-md" style="margin-top:36px">
            ${details.map((c) => `<div class="row" style="gap:14px">
              <div style="width:36px;height:36px;border-radius:10px;background:var(--bg-2);border:1px solid var(--line);display:grid;place-items:center">${icon(c.ic, 16)}</div>
              <div>
                <div class="mono muted" style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase">${c.label}</div>
                <div style="font-size:15px;margin-top:2px">${c.value}</div>
              </div>
            </div>`).join('')}
          </div>
        </div>

        <div class="card" id="contact-card" style="padding:32px">
          <form id="contact-form">
            <h3>Send us a message</h3>
            <p class="muted" style="font-size:13px;margin-top:4px">All fields required, except the things we don't ask for.</p>
            <div class="grid grid-2" style="margin-top:22px;gap:14px">
              <div class="field" style="margin:0"><label>Your name</label><input name="name" placeholder="Mira K."></div>
              <div class="field" style="margin:0"><label>Email</label><input name="email" type="email" placeholder="you@example.com"></div>
            </div>
            <div class="field" style="display:flex;flex-direction:column;gap:6px;margin-top:14px">
              <label>I'm writing about</label>
              <div class="row" style="gap:6px;flex-wrap:wrap">
                ${reasons.map((r) => `<button type="button" class="btn btn-sm reason-chip" data-reason="${r.id}"
                  style="background:${contactReason === r.id ? 'var(--accent)' : 'var(--bg-2)'};color:${contactReason === r.id ? 'var(--accent-ink)' : 'var(--fg-2)'};border:1px solid ${contactReason === r.id ? 'var(--accent)' : 'var(--line)'}">${r.label}</button>`).join('')}
              </div>
            </div>
            <div class="field" style="display:flex;flex-direction:column;gap:6px;margin-top:14px">
              <label>Your message</label>
              <textarea name="message" placeholder="Tell us what you're thinking..."></textarea>
            </div>
            <div class="row" style="justify-content:space-between;margin-top:24px">
              <span class="muted mono" style="font-size:11px;letter-spacing:0.06em">${icon('lock', 12, 1.6, 'vertical-align:-1px;margin-right:6px')}We will never share your email. Period.</span>
              <button type="submit" class="btn btn-primary" disabled>Send message ${icon('arrow-right', 13)}</button>
            </div>
          </form>
        </div>
      </div>
    </div></div>`;
  }

  function contactSuccessHTML(name, email) {
    return `<div style="text-align:center;padding:24px 0">
      <div style="width:56px;height:56px;border-radius:50%;background:color-mix(in srgb, var(--status-shipped) 16%, transparent);display:grid;place-items:center;margin:0 auto 18px;color:var(--status-shipped)">${icon('check', 24, 2)}</div>
      <h3>Message sent.</h3>
      <p style="margin-top:10px;max-width:380px;margin-inline:auto">Thanks, ${esc(name || 'friend')}. We've got your note and will be in touch at ${esc(email)}.</p>
      <button class="btn btn-ghost" data-action="send-another" style="margin-top:22px">Send another</button>
    </div>`;
  }

  function attachContact(main) {
    const form = main.querySelector('#contact-form');
    if (!form) return;
    const nameEl = form.name;
    const emailEl = form.email;
    const msgEl = form.message;
    const submitEl = form.querySelector('button[type="submit"]');
    const valid = () => nameEl.value.trim() && /.+@.+\..+/.test(emailEl.value) && msgEl.value.trim().length > 8;
    const check = () => { submitEl.disabled = !valid(); };
    [nameEl, emailEl, msgEl].forEach((el) => el.addEventListener('input', check));

    main.querySelectorAll('.reason-chip').forEach((chip) =>
      chip.addEventListener('click', () => {
        contactReason = chip.dataset.reason;
        main.querySelectorAll('.reason-chip').forEach((c) => {
          const on = c.dataset.reason === contactReason;
          c.style.background = on ? 'var(--accent)' : 'var(--bg-2)';
          c.style.color = on ? 'var(--accent-ink)' : 'var(--fg-2)';
          c.style.border = '1px solid ' + (on ? 'var(--accent)' : 'var(--line)');
        });
      }));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!valid()) return;
      const card = main.querySelector('#contact-card');
      card.innerHTML = contactSuccessHTML(nameEl.value.trim(), emailEl.value.trim());
      showToast('Message sent — we usually reply within 1–2 business days.');
      card.querySelector('[data-action="send-another"]').addEventListener('click', () => {
        contactReason = 'support';
        const m = document.getElementById('main');
        m.innerHTML = contactHTML();
        attachContact(m);
      });
    });
  }

  /* ----------------------------------------------------------
     Router
  ---------------------------------------------------------- */
  function parseRoute() {
    const h = window.location.hash.replace(/^#\/?/, '');
    if (h === 'apps' || h === 'contact') return h;
    return 'about';
  }

  const root = document.getElementById('root');
  root.innerHTML = `<div id="nav-host"></div><main id="main"></main><div id="footer-host"></div>`;
  const navHost = document.getElementById('nav-host');
  const footerHost = document.getElementById('footer-host');
  const main = document.getElementById('main');

  function render() {
    const route = parseRoute();
    navHost.innerHTML = navHTML(route);
    footerHost.innerHTML = footerHTML();
    if (route === 'apps') main.innerHTML = appsHTML();
    else if (route === 'contact') { main.innerHTML = contactHTML(); attachContact(main); }
    else main.innerHTML = aboutHTML();
    window.scrollTo({ top: 0 });
  }

  window.addEventListener('hashchange', render);
  render();
})();
