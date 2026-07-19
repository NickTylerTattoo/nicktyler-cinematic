/* ===== Nick Tyler Tattoo — Cinematic scroll site ===== */
(() => {
'use strict';
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const params = new URLSearchParams(location.search);
const STILL = params.has('still');
if (STILL) document.body.classList.add('still');
const money = n => '$' + n.toLocaleString();

/* ---------- Catalog (The Drop · 35 one-of-one designs, real names/prices/status) ---------- */
const CAT = [
  ['01','Serpent & Sigil Triptych','versatile','Any Placement','5–7 in',500,'live'],
  ['02','Ornamental Crest','versatile','Any Placement','4–5 in',500,'claimed'],
  ['03','Lotus Filigree','versatile','Any Placement','4–6 in',500,'live'],
  ['04','Dotwork Diadem','versatile','Any Placement','4–5 in',500,'live'],
  ['05','Veiled Mandala','versatile','Any Placement','5–6 in',500,'live'],
  ['06b','Cathedral Sleeve','sleeve','Outer Sleeve','Single sleeve',1400,'live'],
  ['06a','Crescent Sleeve','sleeve','Outer Sleeve','Single sleeve',1400,'live'],
  ['07a','Vespers Sleeve','sleeve','Outer Sleeve','Single sleeve',1400,'live'],
  ['07b','Sanctuary Sleeve','sleeve','Outer Sleeve','Single sleeve',1400,'live'],
  ['08a','Lacework Sleeve','sleeve','Outer Sleeve','Single sleeve',1400,'claimed'],
  ['08b','Litany Sleeve','sleeve','Outer Sleeve','Single sleeve',1400,'claimed'],
  ['09','Cathedral Mandala','upper-back','Upper Back','Upper back',1200,'live'],
  ['10','Reliquary Mandala','upper-back','Upper Back','Upper back',1200,'live'],
  ['11','Sanctuary Spine','upper-back','Upper Back','Upper back',1200,'live'],
  ['12','Aria Spine Ornament','upper-back','Upper Back','Upper back',1200,'live'],
  ['13','Vesica Mandala','upper-back','Upper Back','Upper back',1200,'claimed'],
  ['14','Chapel Crown','upper-back','Upper Back','Upper back',1200,'live'],
  ['15','Vespers Mandala','full-back','Full Back','Full back',2400,'live'],
  ['16','Compass Rose Ornament','full-back','Full Back','Full back',2400,'live'],
  ['17','Lacework Halo','full-back','Full Back','Full back',2400,'live'],
  ['18','Veiled Reliquary','full-back','Full Back','Full back',2400,'claimed'],
  ['19','Liturgy Mandala','full-back','Full Back','Full back',2400,'live'],
  ['20','Pendulum Drape','sternum','Sternum','5–7 in',625,'live'],
  ['21','Aura Drape','sternum','Sternum','5–7 in',625,'claimed'],
  ['22','Delicate Drape','sternum','Sternum','6–8 in',750,'live'],
  ['23','Lacework Drape','sternum','Sternum','6–8 in',750,'live'],
  ['24','Sanctuary Drape','sternum','Sternum','5–7 in',625,'feat'],
  ['25','Chandelier Cascade','sternum','Sternum','7–9 in',750,'live'],
  ['26','Diadem Cascade','sternum','Sternum','5–7 in',625,'live'],
  ['27','Ornamental Cascade','sternum','Sternum','6–8 in',750,'live'],
  ['28','Aria Sternum','sternum','Sternum','5–7 in',625,'live'],
  ['29','Blackwork Choker','sternum','Sternum','7–9 in',750,'live'],
  ['30','Sunburst Sternum','sternum','Sternum','5–7 in',625,'claimed'],
  ['31','Lacework Ornament','sternum','Sternum','6–8 in',750,'live'],
  ['32','Reliquary Sternum','sternum','Sternum','5–7 in',625,'live'],
  ['33','Filigree Ornament','sternum','Sternum','6–8 in',750,'live'],
  ['34','Pendant Sternum','sternum','Sternum','5–7 in',625,'live'],
  ['35','Veiled Drape','sternum','Sternum','6–8 in',750,'live'],
].map((d, i) => ({
  n: i + 1, title: d[1], cat: d[2], place: d[3], size: d[4], price: d[5], status: d[6],
  thumb: `assets/flash/thumbs/flash-${d[0]}.jpg`,
  available: d[6] === 'live' || d[6] === 'feat'
}));

/* ---------- Reviews (verbatim from Google — Nick Tyler Tattoo, Selden NY · ★5.0) ---------- */
const REVIEWS = [
  ['Jamie B.', "10/10 experience with Nick today. Loved how smooth and easy the process was. He made me feel really comfortable and the place was super clean. Line work is amazing!"],
  ['Cristian S.', "It's clear that Nick takes pride in his work and genuinely cares about giving his clients a great experience. Already booking for the next piece!"],
  ['Gabrielle N.', "Nick did my first tattoo and it came out exactly how I imagined it. The whole process felt seamless and easy… I'm beyond happy with it and will definitely be going back."],
  ['Edward A.', "Nicholas made me feel welcomed and comfortable. Did not rush the tattoo, and very attentive to details. I highly recommend Nick Tyler Tattoo."],
  ['Remmy B.', "Super responsive with all questions and very helpful. Works quickly while still having amazing end results! Genuinely such a great experience!"],
];

/* ---------- FAQ (facts from live nicktylertattoo.com sites + The Drop) ---------- */
const FAQ = [
  ['Where are you located?', "A private studio in Selden — Suffolk County, Long Island, NY. By appointment only; the exact address is shared 24 hours before your appointment."],
  ['How do I book a pre-drawn design?', "Pick any design from The Drop and hit Claim — the booking calendar opens right there. Choose your date and a $50 deposit holds your slot. It applies directly to your total."],
  ['Are the designs really one-of-one?', "Yes. Each design is tattooed once, then retired for good. Once it's claimed, it's gone."],
  ['How do I request a custom tattoo?', "Fill out the custom form with your idea, placement, and reference photos. Every request is reviewed personally — approvals go out by text within 1–3 business days with a private booking link."],
  ['Is there a charge for the design or drawing?', "No. There's no charge for design or prep — a deposit is only placed once your request is approved and you book, and the full deposit goes toward your final cost."],
  ['What are your rates?', "$250 per hour, with most pieces between $250 and $1,200. Custom pieces start at $250."],
  ['What styles do you take on?', "Fine line, ornamental, floral, blackwork, geometric and detailed illustrative work. Larger-scale projects — sleeves, full back — are given priority. No color or realism (rare exceptions)."],
  ["It's my first tattoo — anything I should know?", "You're in good hands. Ask anything, take breaks whenever you need, and never apologize — just communicate. Your comfort comes first, always."],
  ['Do you travel or do guest spots?', "Yes — travel sessions are available. Mention where you are in your request."],
  ["What's your cancellation policy?", "Life happens — give me as much notice as you can. Deposits hold your spot and I'll work with you to reschedule."],
];

/* ================================================================
   Smooth scroll — Lenis + GSAP ScrollTrigger
   ================================================================ */
let lenis = null;
gsap.registerPlugin(ScrollTrigger);
if (!STILL) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.0 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ================================================================
   Hero — orbit frame sequence, scroll-scrubbed on canvas
   ================================================================ */
const orbit = (() => {
  const canvas = $('#orbitCanvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const state = { frames: [], count: 0, loaded: 0, cur: -1, want: 0, poster: null, ready: false };

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width  = Math.round(canvas.clientWidth  * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    draw(state.cur < 0 ? 0 : state.cur, true);
  }

  /* cover-fit draw of frame i (or nearest loaded one walking backwards) */
  function draw(i, force) {
    let img = null, pick = -1;
    if (state.count) {
      for (let k = i; k >= 0; k--) {
        const f = state.frames[k];
        if (f && f.complete && f.naturalWidth) { img = f; pick = k; break; }
      }
    }
    if (!img && state.poster && state.poster.complete && state.poster.naturalWidth) { img = state.poster; pick = -2; }
    if (!img || (pick === state.cur && !force)) return;
    state.cur = pick === -2 ? -1 : pick;
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const s = Math.max(cw / iw, ch / ih);
    const dw = iw * s, dh = ih * s;
    ctx.fillStyle = '#0A0A0B';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }

  function progress(p) {
    if (!state.count) { draw(0); return; }
    const i = Math.max(0, Math.min(state.count - 1, Math.round(p * (state.count - 1))));
    state.want = i;
    draw(i);
  }

  /* poster fallback immediately */
  state.poster = new Image();
  state.poster.onload = () => draw(0, true);
  state.poster.src = 'assets/hero-poster.jpg';

  /* frame sequence via manifest (written by the frame-extraction step) */
  fetch('assets/seq/orbit/manifest.json')
    .then(r => r.ok ? r.json() : null)
    .then(m => {
      if (!m || !m.count) return;
      state.count = m.count;
      const pad = n => String(n).padStart(3, '0');
      const order = [];
      const stride = 6;                       // sparse first pass, then fill
      for (let i = 0; i < m.count; i += stride) order.push(i);
      for (let i = 0; i < m.count; i++) if (i % stride) order.push(i);
      let inflight = 0, qi = 0;
      const pump = () => {
        while (inflight < 8 && qi < order.length) {
          const idx = order[qi++]; inflight++;
          const img = new Image();
          /* decode ahead of drawImage so scrubbing never hits a synchronous JPEG
             decode; repaint the parked canvas as better frames arrive */
          const done = () => {
            inflight--; state.loaded++;
            draw(state.want, idx === 0);
            loaderTick();
            pump();
          };
          img.src = `assets/seq/orbit/f-${pad(idx + 1)}.jpg`;
          if (img.decode) img.decode().then(done, done);
          else img.onload = img.onerror = done;
          state.frames[idx] = img;
        }
        if (state.loaded >= Math.min(m.count, 24) && !state.ready) { state.ready = true; }
      };
      pump();
    })
    .catch(() => {});

  addEventListener('resize', resize);
  resize();
  return { progress, state, resize };
})();

/* ---------- preloader — waits for poster + first frames, then reveals ---------- */
function loaderTick() {
  const bar = $('#loaderBar');
  if (!bar) return;
  const target = Math.min(1, orbit.state.count ? orbit.state.loaded / Math.min(orbit.state.count, 40) : 1);
  bar.style.width = Math.round(target * 100) + '%';
  if (target >= 1) hideLoader();
}
let loaderHidden = false;
function hideLoader() {
  if (loaderHidden) return;
  loaderHidden = true;
  $('#loader').classList.add('done');
}
/* never hold the page hostage */
setTimeout(hideLoader, STILL ? 400 : 3500);
addEventListener('load', () => setTimeout(hideLoader, 1200));

/* ---------- hero scroll timeline ---------- */
(() => {
  const hero = $('#hero');

  if (STILL) {
    /* frozen state for screenshots: title in, frame 0 */
    $$('#heroT1 .hero__line').forEach(el => { el.style.letterSpacing = '-0.035em'; el.style.opacity = 1; });
    $('#heroT1').style.opacity = 1;
    orbit.progress(0);
    return;
  }

  /* canvas scrub across the whole 460vh track */
  ScrollTrigger.create({
    trigger: hero, start: 'top top', end: 'bottom bottom', scrub: true,
    onUpdate: st => orbit.progress(st.progress)
  });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: true },
    defaults: { ease: 'none' }
  });

  /* Stage 1 — NICK TYLER TATTOO tracks in over the orbit, then drifts away */
  const lines = $$('#heroT1 .hero__line');
  gsap.set(lines, { letterSpacing: '0.55em', opacity: 0 });
  gsap.set($('#heroT1 .kicker'), { opacity: 0, y: 10 });
  tl.to(lines, { letterSpacing: '-0.035em', opacity: 1, duration: .14, stagger: .02 }, 0.015)
    .to('#heroT1 .kicker', { opacity: 1, y: 0, duration: .06 }, 0.05)
    .to('#heroT1', { opacity: 0, y: -60, duration: .08 }, 0.30)
  /* Stage 2 — discipline lines */
    .fromTo('#heroT2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .08 }, 0.42)
    .to('#heroT2', { opacity: 0, y: -50, duration: .07 }, 0.60)
  /* Stage 3 — the tagline rides out the rotation */
    .fromTo('#heroT3', { opacity: 0, scale: .96 }, { opacity: 1, scale: 1, duration: .09 }, 0.72)
    .to('#heroT3', { opacity: 0, duration: .05 }, 0.95)
  /* scroll cue dies immediately */
    .to('#heroCue', { opacity: 0, duration: .03 }, 0.02);
})();

/* ================================================================
   Marquee — duplicate content for a seamless -50% loop
   ================================================================ */
(() => {
  const inner = $('#marqueeInner');
  inner.appendChild(inner.firstElementChild.cloneNode(true));
})();

/* ================================================================
   Nav — background after leaving hero top
   ================================================================ */
(() => {
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > innerHeight * .6);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ================================================================
   Reviews
   ================================================================ */
(() => {
  $('#proofBadge').innerHTML = `★★★★★&ensp;5.0 on Google · 100+ reviews · Selden, NY`;
  $('#proofList').innerHTML = REVIEWS.map(([by, text]) => `
    <figure class="quote" data-reveal>
      <blockquote class="quote__text">${text}</blockquote>
      <figcaption class="quote__by"><b>${by}</b> — Google review</figcaption>
    </figure>`).join('');
})();

/* ================================================================
   Film sections — sticky video + scroll-timed text
   ================================================================ */
(() => {
  $$('.film').forEach(sec => {
    const video = $('.film__video', sec);
    const a = $('.film__text--a', sec), b = $('.film__text--b', sec);

    if (!STILL) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: true },
        defaults: { ease: 'none' }
      });
      tl.fromTo(a, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .12 }, 0.10)
        .to(a, { opacity: 0, y: -30, duration: .10 }, 0.38)
        .fromTo(b, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .12 }, 0.55)
        .to(b, { opacity: 0, y: -30, duration: .10 }, 0.86);
    } else {
      a.style.opacity = 1;
    }

    /* play only while on screen; assembly plays once and holds its final frame */
    if (STILL) { video.preload = 'none'; return; }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        /* non-looping films (assembly) hold their final frame instead of replaying */
        if (!video.loop && video.ended) return;
        video.play().catch(() => {});
      }
      else video.pause();
    }), { threshold: 0.1 });
    io.observe(video);
  });

  /* finale ambient video */
  const fv = $('#finaleVideo');
  if (!STILL) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) fv.play().catch(() => {}); else fv.pause();
    }), { threshold: 0.1 });
    io.observe(fv);
  }
})();

/* ================================================================
   The Drop — grid, filters, claim
   ================================================================ */
const drop = (() => {
  const grid = $('#dropGrid');
  const pillsBox = $('#dropPills');
  const avail = $('#availOnly');
  const FILTERS = [
    ['all', 'All'], ['versatile', 'Any placement'], ['sleeve', 'Sleeve'],
    ['upper-back', 'Upper back'], ['full-back', 'Full back'], ['sternum', 'Sternum'],
  ];
  let cat = 'all';

  const liveCount = CAT.filter(d => d.available).length;
  $('#dropCount').textContent = `${CAT.length} designs · ${liveCount} still available`;

  pillsBox.innerHTML = FILTERS.map(([k, label]) =>
    `<button class="pill${k === 'all' ? ' on' : ''}" data-cat="${k}" aria-pressed="${k === 'all'}" data-cursor="link">${label}</button>`).join('');

  function stamp(s) {
    if (s === 'feat') return `<span class="stamp stamp--feat">Featured</span>`;
    if (s === 'claimed') return `<span class="stamp stamp--claimed">Claimed</span>`;
    return `<span class="stamp stamp--live">Live</span>`;
  }

  function render() {
    const list = CAT.filter(d =>
      (cat === 'all' || d.cat === cat) && (!avail.checked || d.available));
    const html = list.map(d => `
      <article class="plate${d.available ? '' : ' plate--claimed'}">
        <div class="plate__imgwrap">
          <img src="${d.thumb}" alt="${d.title} — pre-drawn tattoo design" loading="lazy">
          <span class="plate__no">No. ${String(d.n).padStart(2, '0')}</span>
          ${stamp(d.status)}
        </div>
        <div class="plate__meta">
          <p class="plate__title">${d.title}</p>
          <p class="plate__spec">${d.place} · ${d.size}</p>
          <div class="plate__row">
            <span class="plate__price">from ${money(d.price)}</span>
            ${d.available
              ? `<button class="plate__claim" data-claim="${d.n}" data-cursor="link">Claim</button>`
              : `<span class="plate__gone">Gone</span>`}
          </div>
        </div>
      </article>`).join('');
    grid.innerHTML = html;
    /* grid height changed — re-measure every trigger below The Drop, or
       reveals/scrubs further down keep stale pixel positions and never fire */
    if (!STILL && window.ScrollTrigger) ScrollTrigger.refresh();
  }

  pillsBox.addEventListener('click', e => {
    const b = e.target.closest('.pill'); if (!b) return;
    cat = b.dataset.cat;
    $$('.pill', pillsBox).forEach(p => {
      p.classList.toggle('on', p === b);
      p.setAttribute('aria-pressed', p === b);
    });
    render();
  });
  avail.addEventListener('change', render);
  grid.addEventListener('click', e => {
    const b = e.target.closest('[data-claim]'); if (!b) return;
    const d = CAT.find(x => x.n === +b.dataset.claim);
    openBooking(d);
  });

  render();
  return { render };
})();

/* ================================================================
   Booking modal — InkedIn calendar with design prefill
   ================================================================ */
let lastFocus = null;
function openBooking(design) {
  const modal = $('#bookModal');
  const frame = $('#bookFrame');
  lastFocus = document.activeElement;
  const base = window.NT_CONFIG.flashBooking;
  const label = design ? `${design.title} No. ${String(design.n).padStart(2, '0')}` : '';
  frame.src = design
    ? `${base}?${window.NT_CONFIG.designParam}=${encodeURIComponent(label)}`
    : base;
  $('#modalDesign').textContent = design ? label + ' · $50 deposit holds it' : 'Pick your date · $50 deposit holds your slot';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.documentElement.style.overflow = 'hidden';
  if (lenis) lenis.stop();
  $('.modal__close').focus();
}
function closeBooking() {
  const modal = $('#bookModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  $('#bookFrame').src = 'about:blank';
  document.documentElement.style.overflow = '';
  if (lenis) lenis.start();
  if (lastFocus && lastFocus.focus) { lastFocus.focus(); lastFocus = null; }
}
$('#bookModal').addEventListener('click', e => { if (e.target.closest('[data-close]')) closeBooking(); });
addEventListener('keydown', e => { if (e.key === 'Escape') closeBooking(); });
$('#navBook').addEventListener('click', e => { e.preventDefault(); openBooking(null); });
$('#finaleBook').addEventListener('click', e => { e.preventDefault(); openBooking(null); });

/* ================================================================
   FAQ accordion
   ================================================================ */
(() => {
  $('#faqList').innerHTML = FAQ.map(([q, a]) => `
    <div class="faq-item">
      <button class="faq-q" data-cursor="link"><span>${q}</span><span class="faq-ic" aria-hidden="true">+</span></button>
      <div class="faq-a"><p>${a}</p></div>
    </div>`).join('');
  $('#faqList').addEventListener('click', e => {
    const q = e.target.closest('.faq-q'); if (!q) return;
    const item = q.parentElement, a = $('.faq-a', item);
    const open = item.classList.toggle('open');
    if (open) {
      a.style.maxHeight = a.scrollHeight + 'px';
    } else {
      /* if the open item settled at 'none', restore a pixel value so the
         close transition has something to animate from */
      if (a.style.maxHeight === 'none') { a.style.maxHeight = a.scrollHeight + 'px'; void a.offsetHeight; }
      a.style.maxHeight = '0px';
    }
  });
  /* after the transition: release the height clamp so open answers reflow on
     resize, and re-measure scroll positions since the page height changed */
  $('#faqList').addEventListener('transitionend', e => {
    const a = e.target;
    if (!a.classList || !a.classList.contains('faq-a')) return;
    if (a.parentElement.classList.contains('open')) a.style.maxHeight = 'none';
    if (!STILL && window.ScrollTrigger) ScrollTrigger.refresh();
  });
})();

/* ================================================================
   Generic reveals
   ================================================================ */
(() => {
  if (STILL) return;
  $$('[data-reveal]').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%' }
    });
  });
})();

/* ================================================================
   Cursor dot
   ================================================================ */
(() => {
  if (STILL || matchMedia('(hover: none)').matches) return;
  const c = $('#cursor');
  let shown = false;
  addEventListener('mousemove', e => {
    if (!shown) { c.classList.add('on'); shown = true; }
    c.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
    c.classList.toggle('big', !!e.target.closest('[data-cursor="link"],a,button'));
  }, { passive: true });
})();

/* ---------- smooth anchor jumps through Lenis ---------- */
/* debug hook for automated verification */
window.__NT = { orbit, STILL, lenis: () => lenis };

$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const t = $(id); if (!t) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(t, { offset: 0, duration: 1.6 });
    else t.scrollIntoView();
  });
});

})();
