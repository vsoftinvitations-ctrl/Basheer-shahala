import './style.css';
import { initRosePetals } from './components/RosePetals.js';
import { renderCountdown, initCountdown } from './components/Countdown.js';
import { initScrollHint } from './components/ScrollHint.js';
import { W, PHOTOS } from './data.js';

const app = document.getElementById('app');

function coupleCard(person) {
  return `<div class="r couple-card">
    <h3 class="couple-name">${person.name}</h3>
    <div class="couple-rule line-x"></div>
    <p class="couple-sentence">
      <span class="relation-tag">${person.relation}</span> ${person.father} &amp; ${person.mother}
      ${person.place ? `<br><span class="place-tag">${person.place}</span>` : ''}
    </p>
  </div>`;
}


function playAudio() {
  const audio = document.getElementById('wedding-audio');
  if (!audio) return;
  audio.loop = true;
  audio.volume = 0.05;
  const p = audio.play();
  if (p !== undefined) {
    p.then(() => {
      let v = 0.05;
      const fade = setInterval(() => {
        v = Math.min(0.75, v + 0.05);
        if (audio) audio.volume = v;
        if (v >= 0.75) clearInterval(fade);
      }, 100);
    }).catch(() => {});
  }
}

if (app) {
  const orn = '<svg class="orn r" viewBox="0 0 150 18" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M0 9h55M95 9h55"/><circle cx="75" cy="9" r="4"/><circle cx="65" cy="9" r="2.5"/><circle cx="85" cy="9" r="2.5"/></svg>';
  const pin = '<svg class="pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>';
  const D = W.date;

  // Initially lock scrolling on the page — ONLY the Tap to Open cover is shown
  history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  app.innerHTML = `
    <!-- 1. EXCLUSIVE TAP TO OPEN COVER SECTION -->
    <section id="hero" class="flex" aria-label="Tap to Open Invitation">
      <div class="hero-bg">
        <img src="${PHOTOS.hero}" alt="${W.groom} &amp; ${W.bride}" decoding="async">
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-border"></div>
      <div class="hero-border-inner"></div>
      <div class="hero-top">
        <span class="hero-tagline">NIKKAH INVITATION</span>
      </div>
      <div class="hero-bottom">
        <div class="hero-names">
          <span class="hero-name">${W.groom}</span>
          <span class="hero-amp">&amp;</span>
          <span class="hero-name">${W.bride}</span>
        </div>
        <div class="hero-date">${D.num} ${D.month.toUpperCase()} &bull; ${D.day.toUpperCase()}</div>
        <div class="hero-venue">${W.ceremony.fullVenue}</div>
        <button class="hero-btn" id="hero-open-btn" aria-label="Open Nikkah Invitation">OPEN INVITATION</button>
      </div>
    </section>

    <!-- 2. INSIDE INVITATION SECTION (Revealed smoothly on click) -->
    <div id="invitation-content" class="invitation-content">
      <canvas id="rose-petals-canvas" aria-hidden="true"></canvas>

      <section id="intro">
        <div class="cover">
          <img src="/couple.jpg" alt="${W.groom} and ${W.bride}" decoding="async">
        </div>
        <div class="wrap">
          <div class="r" style="margin-bottom:14px;">
            <span class="insha-allah-pill">${W.blessing}</span>
          </div>
          <p class="label r">Together with their families</p>
          <h2 class="intro-names r" aria-label="${W.groom} & ${W.bride}">
            <div class="script-line script-groom">
              <span class="script-text">${W.groom}</span>
              <span class="calligraphy-spark" aria-hidden="true"></span>
            </div>
            <div class="script-line script-amp" aria-hidden="true">
              <span class="amp">&amp;</span>
            </div>
            <div class="script-line script-bride">
              <span class="script-text">${W.bride}</span>
              <span class="calligraphy-spark" aria-hidden="true"></span>
            </div>
            <div class="flourish-wrap" aria-hidden="true">
              <svg class="calligraphy-flourish" viewBox="0 0 280 26" fill="none" preserveAspectRatio="none">
                <path class="flourish-path" d="M14,14 C65,4 105,6 140,16 C175,24 215,10 266,8" stroke="url(#goldFlourishGrad)" stroke-width="2.2" stroke-linecap="round" />
                <defs>
                  <linearGradient id="goldFlourishGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(220, 201, 160, 0.2)" />
                    <stop offset="35%" stop-color="rgba(184, 152, 90, 0.95)" />
                    <stop offset="70%" stop-color="rgba(218, 165, 32, 0.95)" />
                    <stop offset="100%" stop-color="rgba(220, 201, 160, 0.2)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </h2>
          ${orn}
          <p class="quote r">“${W.quotes[0]}”</p>
        </div>
      </section>

      <section class="alt"><div class="wrap">
        <p class="label r">Nikkah &amp; Reception</p>
        <div class="daynum r">${D.num}</div>
        <div class="month r">${D.month.toUpperCase()}</div>
        <div class="day r" style="margin-top:10px">${D.day}</div>
        <div class="rule line-x r"></div>
        <div class="time r" style="font-size:clamp(1.05rem,3.6vw,1.35rem);color:var(--gold);margin-top:12px;line-height:1.6">
          Nikkah: <strong style="color:var(--ink)">4:00 PM</strong> &bull; Reception: <strong style="color:var(--ink)">6:00 PM onwards</strong>
        </div>
        ${renderCountdown()}
      </div></section>

      <!-- Main Nikkah & Reception Section -->
      <section><div class="wrap">
        <p class="label r">Nikkah &amp; Reception</p>
        <div class="r">${pin}</div>
        <h2 class="big r">${W.ceremony.venue}</h2>
        <div class="event-date-badge r">${W.ceremony.day} &bull; ${W.ceremony.date}</div>
        <div class="time r" style="margin-top:14px;font-size:clamp(1.15rem,3.8vw,1.45rem);color:var(--gold);line-height:1.6">
          Nikkah: <strong style="color:var(--ink)">4:00 PM</strong><br>
          Reception: <strong style="color:var(--ink)">6:00 PM onwards</strong>
        </div>
        <p class="small r" style="margin-top:10px;font-size:1.05rem;line-height:1.7;color:var(--mute)">${W.ceremony.address.join('<br>')}</p>
        <div style="margin-top:28px" class="r">
          <a class="btn" href="${W.ceremony.map}" target="_blank" rel="noopener noreferrer">View Location on Google Maps</a>
        </div>
      </div></section>

      <!-- Schedule of Celebrations Section -->
      <section class="alt"><div class="wrap" style="max-width:720px">
        <p class="label r">Schedule of Celebrations</p>
        <h2 class="big r" style="margin-bottom:8px">Celebrations</h2>
        <p class="small r" style="color:var(--mute);margin-bottom:24px">Join us in celebrating this blessed journey</p>
        <div class="functions-grid r">
          <div class="function-card">
            <div>
              <span class="event-date-badge">25 Dec 2026</span>
              <h3 class="function-title">House Warming</h3>
              <div class="function-date">Friday</div>
            </div>
            <p class="function-venue">Groom's Residence<br>Koodali, Kannur</p>
          </div>

          <div class="function-card featured">
            <div>
              <span class="event-date-badge">26 Dec 2026</span>
              <h3 class="function-title">Nikkah &amp; Reception</h3>
              <div class="function-date">Saturday</div>
              <div class="function-time" style="color:var(--gold);font-weight:600;line-height:1.55;margin-top:6px">
                Nikkah: 4:00 PM<br>Reception: 6:00 PM onwards
              </div>
            </div>
            <p class="function-venue">Groom's Residence<br>Koodali, Kannur</p>
          </div>
        </div>
      </div></section>

      <!-- Invitation Message Section -->
      <section><div class="wrap">
        ${orn}
        <p class="label r" style="margin-top:24px">Invitation Message</p>
        <p class="body r" style="font-family:var(--serif);font-size:clamp(1.22rem,4vw,1.55rem);line-height:1.8;color:var(--ink);max-width:38ch;margin:0 auto">
          “${W.invite}”
        </p>
        <div style="margin-top:24px">
          <span class="insha-allah-pill r">${W.blessing}</span>
        </div>
        ${orn}
      </div></section>

      <!-- The Couple and Family Section -->
      <section class="alt"><div class="wrap" style="max-width:900px">
        <p class="label r">The Couple &amp; Families</p>
        <div class="fam">
          ${coupleCard(W.couple.groom)}
          <div class="sep line-x"></div>
          ${coupleCard(W.couple.bride)}
        </div>
      </div></section>

      <!-- Quote Section -->
      <section style="background:linear-gradient(180deg,var(--ivory),var(--blush) 55%,var(--ivory))"><div class="wrap">
        <div class="rule line-x r" style="margin-top:0"></div>
        <p class="quote r">“${W.quotes[1]}”</p>
        <div class="rule line-x r"></div>
      </div></section>

      <!-- Gallery Section with Seamless In-Place Fade Transition -->
      <section class="gallery-section"><div class="wrap" style="max-width:520px">
        <p class="label r">Moments</p>
        <div class="gallery-fade-wrapper r">
          <div class="gallery-fade-frame" id="gallery-crossfade" role="region" aria-label="Photo Slideshow" tabindex="0">
            <div class="gallery-slide active" data-index="0">
              <img src="${PHOTOS.a}" alt="Nadeer and Shahala" loading="lazy" decoding="async">
            </div>
            <div class="gallery-slide" data-index="1">
              <img src="${PHOTOS.b}" alt="Nadeer and Shahala" loading="lazy" decoding="async">
            </div>
            <div class="gallery-frame-border"></div>
            <div class="gallery-frame-border-inner"></div>
            <div class="gallery-dots" aria-label="Slideshow indicators">
              <button class="gallery-dot active" data-slide="0" aria-label="Photo 1"></button>
              <button class="gallery-dot" data-slide="1" aria-label="Photo 2"></button>
            </div>
          </div>
        </div>
      </div></section>

      <!-- Footer Closing Section -->
      <section style="padding-block:clamp(100px,22vw,200px)"><div class="wrap">
        <h2 class="names r" style="font-size:clamp(2.2rem,9vw,3.4rem)">${W.short}</h2>
        <p class="serif r" style="font-size:1.4rem;letter-spacing:.2em;margin-top:24px">${D.dots}</p>
        <div class="rule line-x r"></div>
        <p class="quote r">Together, forever begins here.</p>
        <p class="small r" style="margin-top:28px">With love, prayers and blessings</p>
        ${orn}
      </div></section>

      <footer class="foot">
        <div class="serif">${W.footMono}</div>
        <div class="small" style="margin-top:8px">${D.dotted}</div>
      </footer>
    </div>
  `;

  // Scroll reveal observer
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });

  document.querySelectorAll('.r').forEach(el => io.observe(el));

  let isOpened = false;
  function handleOpenInvitation() {
    if (isOpened) return;
    isOpened = true;

    // 1. Play background song (Thattathin Marayathu BGM)
    playAudio();

    // 2. Simple, clean dissolve of the hero cover
    const heroEl = document.getElementById('hero');
    const contentEl = document.getElementById('invitation-content');
    const coverEl = document.querySelector('.cover');

    if (heroEl) {
      heroEl.classList.add('opened');
    }

    if (contentEl) {
      contentEl.classList.add('visible');
    }

    // 3. Unlock scroll and return to top
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    window.scrollTo(0, 0);

    // 4. Smoothly reveal inside main image with a gentle blooming effect
    setTimeout(() => {
      if (coverEl) {
        coverEl.classList.add('revealed');
      }
    }, 200);

    // 5. Remove hero from layout after clean dissolve finishes (1400ms)
    setTimeout(() => {
      if (heroEl) {
        heroEl.style.display = 'none';
      }
    }, 1400);

    // 6. Activate calligraphy handwriting animation and floating petals
    setTimeout(() => {
      const inames = document.querySelector('.intro-names');
      if (inames) inames.classList.add('in');
      initRosePetals();
    }, 700);

    setTimeout(() => {
      initScrollHint();
    }, 1800);
  }

  const openBtn = document.getElementById('hero-open-btn');
  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleOpenInvitation();
    });
  }

  // Also tapping anywhere on the hero bottom area opens the invitation
  const heroBottom = document.querySelector('.hero-bottom');
  if (heroBottom) {
    heroBottom.addEventListener('click', handleOpenInvitation);
  }

  function initGalleryCrossfade() {
    const container = document.getElementById('gallery-crossfade');
    if (!container) return;
    const slides = container.querySelectorAll('.gallery-slide');
    const dots = container.querySelectorAll('.gallery-dot');
    if (slides.length < 2) return;

    let current = 0;
    let timer = null;

    function goToSlide(index) {
      current = index % slides.length;
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === current);
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function nextSlide() {
      goToSlide(current + 1);
    }

    function startAuto() {
      stopAuto();
      timer = setInterval(nextSlide, 4200);
    }

    function stopAuto() {
      if (timer) clearInterval(timer);
    }

    // Tap on image to smoothly crossfade immediately
    container.addEventListener('click', () => {
      nextSlide();
      startAuto();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(dot.getAttribute('data-slide'), 10);
        goToSlide(idx);
        startAuto();
      });
    });

    startAuto();
  }

  // Initialize countdown timer & gallery crossfade
  initCountdown();
  initGalleryCrossfade();
}
