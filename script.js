// Gentle comic-card tilt
for(const card of document.querySelectorAll('.project')){
  card.addEventListener('pointermove', e=>{
    const r=card.getBoundingClientRect();
    const rx=((e.clientY-r.top)/r.height-.5)*-3;
    const ry=((e.clientX-r.left)/r.width-.5)*4;
    card.style.transform=`translateY(-7px) perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
}


// Behance carousel: arrows + mouse wheel + keyboard.
const workCarousel = document.getElementById('workCarousel');
const workPrev = document.querySelector('.work-arrow-left');
const workNext = document.querySelector('.work-arrow-right');

if(workCarousel && workPrev && workNext){
  const pageStep = () => Math.max(280, workCarousel.clientWidth * .92);

  function updateWorkArrows(){
    const max = workCarousel.scrollWidth - workCarousel.clientWidth - 2;
    workPrev.disabled = workCarousel.scrollLeft <= 2;
    workNext.disabled = workCarousel.scrollLeft >= max;
  }

  workPrev.addEventListener('click',()=>workCarousel.scrollBy({left:-pageStep(),behavior:'smooth'}));
  workNext.addEventListener('click',()=>workCarousel.scrollBy({left:pageStep(),behavior:'smooth'}));

  workCarousel.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowRight'){e.preventDefault();workCarousel.scrollBy({left:pageStep()/2,behavior:'smooth'})}
    if(e.key==='ArrowLeft'){e.preventDefault();workCarousel.scrollBy({left:-pageStep()/2,behavior:'smooth'})}
  });

  workCarousel.addEventListener('scroll',updateWorkArrows,{passive:true});
  window.addEventListener('resize',updateWorkArrows);
  updateWorkArrows();
}


// Top 5 animation carousel
const topCharactersScroll = document.getElementById('topCharactersScroll');
const topCharactersPrev = document.querySelector('.top-characters-arrow-left');
const topCharactersNext = document.querySelector('.top-characters-arrow-right');

if(topCharactersScroll && topCharactersPrev && topCharactersNext){
  const topStep = () => Math.max(280, topCharactersScroll.clientWidth * .92);

  function updateTopCharacterArrows(){
    const max = topCharactersScroll.scrollWidth - topCharactersScroll.clientWidth - 2;
    topCharactersPrev.disabled = topCharactersScroll.scrollLeft <= 2;
    topCharactersNext.disabled = topCharactersScroll.scrollLeft >= max;
  }

  topCharactersPrev.addEventListener('click',()=>topCharactersScroll.scrollBy({left:-topStep(),behavior:'smooth'}));
  topCharactersNext.addEventListener('click',()=>topCharactersScroll.scrollBy({left:topStep(),behavior:'smooth'}));

  topCharactersScroll.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowRight'){e.preventDefault();topCharactersScroll.scrollBy({left:topStep()/2,behavior:'smooth'})}
    if(e.key==='ArrowLeft'){e.preventDefault();topCharactersScroll.scrollBy({left:-topStep()/2,behavior:'smooth'})}
  });

  topCharactersScroll.addEventListener('scroll',updateTopCharacterArrows,{passive:true});
  window.addEventListener('resize',updateTopCharacterArrows);
  updateTopCharacterArrows();
}




async function resolveAvailablePrivateImages(projectKey){
  const data = privateProjects[projectKey];
  const checks = data.images.map(src => new Promise(resolve=>{
    const img = new Image();
    img.onload = ()=>resolve(src);
    img.onerror = ()=>resolve(null);
    img.src = src;
  }));
  const found = (await Promise.all(checks)).filter(Boolean);
  return found;
}

// ===== PRIVATE PORTFOLIO VIEWER (demo data; replace later with user's real files) =====
const privateProjects = {
  'crazy-frog': {
    title: 'Crazy Frog',
    subtitle: 'Slot Game',
    images: [
      'assets/private/crazy-frog/01.jpg',
      'assets/private/crazy-frog/02.jpg',
      'assets/private/crazy-frog/03.jpg',
      'assets/private/crazy-frog/04.jpg',
      'assets/private/crazy-frog/05.jpg',
      'assets/private/crazy-frog/06.jpg',
      'assets/private/crazy-frog/07.jpg'
    ]
  },
  'paris-hilton': {
    title: 'Paris Hilton',
    subtitle: 'Slot Game',
    images: [
      'assets/private/paris-hilton/01.jpg',
      'assets/private/paris-hilton/02.jpg',
      'assets/private/paris-hilton/03.jpg',
      'assets/private/paris-hilton/04.jpg',
      'assets/private/paris-hilton/05.jpg',
      'assets/private/paris-hilton/06.jpg'
    ]
  },
  'hostel': {
    title: 'Hostel',
    subtitle: 'Slot Game',
    images: [
      'assets/private/hostel/01.jpg',
      'assets/private/hostel/02.jpg',
      'assets/private/hostel/03.jpg',
      'assets/private/hostel/04.jpg',
      'assets/private/hostel/05.jpg'
    ]
  },
  'house-of-greed': {
    title: 'House of Greed',
    subtitle: 'Slot Game',
    images: [
      'assets/private/house-of-greed/01.jpg',
      'assets/private/house-of-greed/02.jpg',
      'assets/private/house-of-greed/03.jpg'
    ]
  },
  'deadwater': {
    title: 'Deadwater',
    subtitle: 'Slot Game',
    images: [
      'assets/private/deadwater/01.jpg',
      'assets/private/deadwater/02.jpg',
      'assets/private/deadwater/03.jpg',
      'assets/private/deadwater/04.jpg',
      'assets/private/deadwater/05.jpg',
      'assets/private/deadwater/06.jpg'
    ]
  },
  'ed-games': {
    title: 'ED games',
    subtitle: 'Game Art',
    images: [
      'assets/private/ed-games/01.jpg',
      'assets/private/ed-games/02.jpg',
      'assets/private/ed-games/03.jpg',
      'assets/private/ed-games/04.jpg',
      'assets/private/ed-games/05.jpg',
      'assets/private/ed-games/06.jpg',
      'assets/private/ed-games/07.jpg',
      'assets/private/ed-games/08.jpg'
    ]
  },
  'gta-armenya': {
    title: 'GTA armenya',
    subtitle: 'Game Art',
    images: [
      'assets/private/gta-armenya/01.jpg',
      'assets/private/gta-armenya/02.jpg',
      'assets/private/gta-armenya/03.jpg',
      'assets/private/gta-armenya/04.jpg',
      'assets/private/gta-armenya/05.jpg',
      'assets/private/gta-armenya/06.jpg'
    ]
  }
};

const privateViewer = document.getElementById('privateViewer');
const privateViewerImage = document.getElementById('privateViewerImage');
const privateViewerTitle = document.getElementById('privateViewerTitle');
const privateViewerCount = document.getElementById('privateViewerCount');
const privateViewerThumbs = document.getElementById('privateViewerThumbs');
const privatePrev = document.querySelector('.private-viewer-prev');
const privateNext = document.querySelector('.private-viewer-next');
const privateViewerImageWrap = document.getElementById('privateViewerImageWrap');

let privateCurrentProject = null;
let privateCurrentIndex = 0;

let privateZoom = 1;
let privatePanX = 0;
let privatePanY = 0;
let privateDragging = false;
let privateDragStartX = 0;
let privateDragStartY = 0;
let privatePanStartX = 0;
let privatePanStartY = 0;

const PRIVATE_ZOOM_MIN = 1;
const PRIVATE_ZOOM_MAX = 2.6;
const PRIVATE_ZOOM_STEP = 0.14;

function clampPrivatePan(){
  if(privateZoom <= 1){
    privatePanX = 0;
    privatePanY = 0;
    return;
  }

  const wrap = privateViewerImageWrap?.getBoundingClientRect();
  if(!wrap) return;

  // Keep panning restrained so the artwork cannot be lost completely off-screen.
  const maxX = wrap.width * (privateZoom - 1) * 0.5;
  const maxY = wrap.height * (privateZoom - 1) * 0.5;
  privatePanX = Math.max(-maxX, Math.min(maxX, privatePanX));
  privatePanY = Math.max(-maxY, Math.min(maxY, privatePanY));
}

function applyPrivateZoom(){
  if(!privateViewerImage || !privateViewerImageWrap) return;
  clampPrivatePan();
  privateViewerImage.style.transform =
    `translate(${privatePanX}px, ${privatePanY}px) scale(${privateZoom})`;
  privateViewerImageWrap.classList.toggle('is-zoomed', privateZoom > 1.001);
}

function resetPrivateZoom(){
  privateZoom = 1;
  privatePanX = 0;
  privatePanY = 0;
  privateDragging = false;
  privateViewerImageWrap?.classList.remove('is-dragging','is-zoomed');
  applyPrivateZoom();
}

function setPrivateZoom(nextZoom){
  privateZoom = Math.max(PRIVATE_ZOOM_MIN, Math.min(PRIVATE_ZOOM_MAX, nextZoom));
  if(privateZoom <= 1.001){
    privatePanX = 0;
    privatePanY = 0;
  }
  applyPrivateZoom();
}


function renderPrivateViewer(){
  if(!privateCurrentProject) return;
  const data = privateProjects[privateCurrentProject];
  const src = data.images[privateCurrentIndex];

  privateViewerTitle.textContent = data.title;
  privateViewerImage.src = src;
  privateViewerImage.alt = `${data.title} — image ${privateCurrentIndex + 1}`;
  resetPrivateZoom();
  if(privateViewerCount) privateViewerCount.textContent = `${privateCurrentIndex + 1} / ${data.images.length}`;

  privateViewerThumbs.innerHTML = '';
  data.images.forEach((img, i)=>{
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = i === privateCurrentIndex ? 'active' : '';
    btn.innerHTML = `<img src="${img}" alt="">`;
    btn.addEventListener('click',()=>{
      privateCurrentIndex = i;
      renderPrivateViewer();
    });
    privateViewerThumbs.appendChild(btn);
  });
}

async function openPrivateViewer(projectKey){
  const data = privateProjects[projectKey];
  const available = await resolveAvailablePrivateImages(projectKey);

  if(!available.length){
    alert('Images for this project have not been uploaded yet.');
    return;
  }

  data._originalImages = data._originalImages || data.images;
  data.images = available;

  privateCurrentProject = projectKey;
  privateCurrentIndex = 0;
  renderPrivateViewer();
  privateViewer.classList.add('open');
  privateViewer.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

function closePrivateViewer(){
  resetPrivateZoom();
  privateViewer.classList.remove('open');
  privateViewer.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-private-project]').forEach(card=>{
  card.addEventListener('click',()=>openPrivateViewer(card.dataset.privateProject));
});

document.querySelectorAll('[data-close-private]').forEach(el=>{
  el.addEventListener('click',closePrivateViewer);
});

privatePrev?.addEventListener('click',()=>{
  const data = privateProjects[privateCurrentProject];
  privateCurrentIndex = (privateCurrentIndex - 1 + data.images.length) % data.images.length;
  renderPrivateViewer();
});

privateNext?.addEventListener('click',()=>{
  const data = privateProjects[privateCurrentProject];
  privateCurrentIndex = (privateCurrentIndex + 1) % data.images.length;
  renderPrivateViewer();
});


// Mouse wheel: zoom in/out while the pointer is over the artwork.
privateViewerImageWrap?.addEventListener('wheel', e=>{
  if(!privateViewer?.classList.contains('open')) return;
  e.preventDefault();

  const direction = e.deltaY < 0 ? 1 : -1;
  setPrivateZoom(privateZoom + direction * PRIVATE_ZOOM_STEP);
}, { passive:false });

// Mouse drag: pan the image after zooming in.
privateViewerImageWrap?.addEventListener('mousedown', e=>{
  if(privateZoom <= 1.001 || e.button !== 0) return;
  e.preventDefault();
  privateDragging = true;
  privateDragStartX = e.clientX;
  privateDragStartY = e.clientY;
  privatePanStartX = privatePanX;
  privatePanStartY = privatePanY;
  privateViewerImageWrap.classList.add('is-dragging');
});

window.addEventListener('mousemove', e=>{
  if(!privateDragging) return;
  privatePanX = privatePanStartX + (e.clientX - privateDragStartX);
  privatePanY = privatePanStartY + (e.clientY - privateDragStartY);
  applyPrivateZoom();
});

window.addEventListener('mouseup', ()=>{
  privateDragging = false;
  privateViewerImageWrap?.classList.remove('is-dragging');
});

// Double click: quick comfortable zoom / reset.
privateViewerImageWrap?.addEventListener('dblclick', e=>{
  e.preventDefault();
  if(privateZoom > 1.001) resetPrivateZoom();
  else setPrivateZoom(1.65);
});



// Single click / tap: quick zoom toggle, matching the simple viewer interaction.
privateViewerImageWrap?.addEventListener('click', e=>{
  if(!privateViewer?.classList.contains('open')) return;

  // Ignore click after a drag.
  if(privateDragging) return;

  // Mouse click toggles zoom.
  if(e.pointerType === 'touch') return;
  if(privateZoom > 1.001) resetPrivateZoom();
  else setPrivateZoom(1.65);
});

// Single tap toggles zoom on touch devices.
let privateTapStartX = 0;
let privateTapStartY = 0;
let privateTapMoved = false;

privateViewerImageWrap?.addEventListener('touchstart', e=>{
  if(e.touches.length === 1){
    privateTapStartX = e.touches[0].clientX;
    privateTapStartY = e.touches[0].clientY;
    privateTapMoved = false;
  }
}, { passive:true });

privateViewerImageWrap?.addEventListener('touchmove', e=>{
  if(e.touches.length === 1){
    const dx = e.touches[0].clientX - privateTapStartX;
    const dy = e.touches[0].clientY - privateTapStartY;
    if(Math.hypot(dx,dy) > 10) privateTapMoved = true;
  }
}, { passive:true });

privateViewerImageWrap?.addEventListener('touchend', e=>{
  if(privateTapMoved) return;
  if(privateZoom > 1.001) resetPrivateZoom();
  else setPrivateZoom(1.65);
});

// Touch: pinch to zoom and one-finger pan while zoomed.
let privateTouchStartDistance = 0;
let privateTouchStartZoom = 1;
let privateTouchStartX = 0;
let privateTouchStartY = 0;
let privateTouchPanStartX = 0;
let privateTouchPanStartY = 0;

function privateTouchDistance(touches){
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.hypot(dx, dy);
}

privateViewerImageWrap?.addEventListener('touchstart', e=>{
  if(e.touches.length === 2){
    e.preventDefault();
    privateTouchStartDistance = privateTouchDistance(e.touches);
    privateTouchStartZoom = privateZoom;
  }else if(e.touches.length === 1 && privateZoom > 1.001){
    e.preventDefault();
    privateTouchStartX = e.touches[0].clientX;
    privateTouchStartY = e.touches[0].clientY;
    privateTouchPanStartX = privatePanX;
    privateTouchPanStartY = privatePanY;
    privateViewerImageWrap.classList.add('is-dragging');
  }
}, { passive:false });

privateViewerImageWrap?.addEventListener('touchmove', e=>{
  if(e.touches.length === 2 && privateTouchStartDistance > 0){
    e.preventDefault();
    const currentDistance = privateTouchDistance(e.touches);
    const ratio = currentDistance / privateTouchStartDistance;
    setPrivateZoom(privateTouchStartZoom * ratio);
  }else if(e.touches.length === 1 && privateZoom > 1.001){
    e.preventDefault();
    privatePanX = privateTouchPanStartX + (e.touches[0].clientX - privateTouchStartX);
    privatePanY = privateTouchPanStartY + (e.touches[0].clientY - privateTouchStartY);
    applyPrivateZoom();
  }
}, { passive:false });

privateViewerImageWrap?.addEventListener('touchend', ()=>{
  privateTouchStartDistance = 0;
  privateViewerImageWrap?.classList.remove('is-dragging');
});

window.addEventListener('keydown',e=>{
  if(!privateViewer?.classList.contains('open')) return;
  if(e.key === 'Escape') closePrivateViewer();
  if(e.key === 'ArrowLeft') privatePrev?.click();
  if(e.key === 'ArrowRight') privateNext?.click();
});


// ===== ANIMATED HAND-DRAWN NAV CIRCLE =====
(function(){
  const navLinks = [...document.querySelectorAll('.topbar nav .nav-link')];

  const inkMarkup = `
    <svg class="nav-ink" viewBox="0 0 170 60" preserveAspectRatio="none" aria-hidden="true">
      <path class="nav-ink-stroke-1" d="M14 30 C 16 12, 52 7, 87 8 C 122 8, 156 12, 156 30 C 156 47, 121 52, 86 52 C 52 52, 18 48, 14 30 Z"></path>
      <path class="nav-ink-stroke-2" d="M21 30 C 24 14, 56 11, 87 11 C 118 11, 148 15, 149 30 C 149 44, 119 49, 87 49 C 56 49, 26 46, 21 30 Z"></path>
    </svg>`;

  navLinks.forEach(link => {
    if(!link.querySelector('.nav-ink')){
      link.insertAdjacentHTML('beforeend', inkMarkup);
    }
  });

  function triggerInkAnimation(link){
    if(!link) return;
    navLinks.forEach(item => item.classList.remove('animate-draw'));
    // force restart
    void link.offsetWidth;
    link.classList.add('animate-draw');
    window.clearTimeout(link._inkTimer);
    link._inkTimer = window.setTimeout(()=>{
      link.classList.remove('animate-draw');
    }, 1100);
  }

  const sectionPairs = navLinks
    .map(link => {
      const id = link.getAttribute('href');
      const section = id && id.startsWith('#') ? document.querySelector(id) : null;
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  let currentActiveLink = null;

  function setActiveLink(link, animate=true){
    if(!link) return;
    if(currentActiveLink === link){
      if(animate) triggerInkAnimation(link);
      return;
    }
    navLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
    currentActiveLink = link;
    if(animate) triggerInkAnimation(link);
  }

  function updateActiveNavAnimated(){
    if(!sectionPairs.length) return;
    const marker = window.innerHeight * 0.34;
    let current = sectionPairs[0];
    for(const item of sectionPairs){
      const rect = item.section.getBoundingClientRect();
      if(rect.top <= marker){
        current = item;
      }
    }
    setActiveLink(current.link, currentActiveLink !== current.link);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if(!target) return;
      e.preventDefault();
      setActiveLink(link, true);
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  window.addEventListener('scroll', updateActiveNavAnimated, {passive:true});
  window.addEventListener('resize', updateActiveNavAnimated);
  setTimeout(()=>{
    setActiveLink(navLinks[0], true);
    updateActiveNavAnimated();
  }, 80);
})();


/* =========================================================
   VAHRAM FLY V11 — STRICT MODE SYNC
   slow movement  -> flies
   fast movement  -> flies_Run
   Fast dash happens only occasionally.
   ========================================================= */
(() => {
  const flyStage = document.getElementById('vtFlyStage');
  const flyFrame = document.getElementById('vtFlyFrame');
  const flySpeech = document.getElementById('vtFlySpeech');
  const flyToggle = document.getElementById('vtFlyToggle');
  const crocToggle = document.getElementById('vtCrocToggle');
  const frogToggle = document.getElementById('vtFrogToggle');
  const toast = document.getElementById('vtCharacterToast');

  if (!flyStage || !flyFrame || !flyToggle) return;

  let enabled = true;
  let sectionSuppressed = false;
  let moving = true;

  let x = Math.max(30, window.innerWidth - 300);
  let y = 62;
  let targetX = 100;
  let targetY = Math.min(260, window.innerHeight * 0.34);

  let lastTime = performance.now();
  let waitUntil = 0;
  let nextSpeechTimer = 0;
  let nextMoveTimer = 0;

  const SLOW_SPEED = 62;
  const FAST_SPEED = 470;

  let moveMode = 'slow';
  let lastFacing = 'left';

  const normalPhrases = [
    "VAHRAM TUMANYAN — 2D ARTIST & ANIMATOR",
    "CHARACTER DESIGN · CONCEPT ART · SPINE 2D",
    "I'M VAHRAM'S INTERACTIVE PORTFOLIO FLY.",
    "CLICK ME — I CAN FIRE.",
    "KEEP SCROLLING. I'LL FOLLOW THE SCREEN.",
    "CHECK THE ANIMATION PROJECTS BELOW.",
    "VAHRAM BUILDS CHARACTERS THAT MOVE."
  ];

  function sendToFly(type) {
    try {
      flyFrame.contentWindow.postMessage(
        { source: 'vahram-site-v4', type },
        '*'
      );
    } catch (_) {}
  }

  function syncAnimationToMode() {
    if (!enabled || sectionSuppressed) return;

    // Exact animation mapping:
    // slow movement = flies
    // fast movement = flies_Run
    sendToFly(moveMode === 'fast' ? 'flies_Run' : 'flies');
  }

  function render() {
    flyStage.style.transform =
      `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
  }

  function faceDirection(dx) {
    if (Math.abs(dx) < 1) return;
    const facing = dx > 0 ? 'right' : 'left';
    if (facing === lastFacing) return;
    lastFacing = facing;
    flyFrame.style.transformOrigin = '50% 50%';
    flyFrame.style.transform = facing === 'right' ? 'scaleX(-1)' : 'scaleX(1)';
  }

  function stageSize() {
    return {
      w: flyStage.offsetWidth || 640,
      h: flyStage.offsetHeight || 360
    };
  }

  function bounds() {
    const { w, h } = stageSize();
    return {
      minX: 16,
      maxX: Math.max(16, window.innerWidth - w - 74),
      minY: 52,
      maxY: Math.max(82, window.innerHeight - h - 16)
    };
  }

  function chooseFarTarget(forceMode = null) {
    if (!enabled || sectionSuppressed) return;

    const b = bounds();
    let nx = b.minX;
    let ny = b.minY;
    let d = 0;

    for (let i = 0; i < 30; i++) {
      nx = b.minX + Math.random() * Math.max(1, b.maxX - b.minX);
      ny = b.minY + Math.random() * Math.max(1, b.maxY - b.minY);
      d = Math.hypot(nx - x, ny - y);
      if (d > Math.min(330, window.innerWidth * 0.30)) break;
    }

    targetX = nx;
    targetY = ny;

    if (forceMode) {
      moveMode = forceMode;
    } else {
      // Calm flight is the normal state. Fast dash is only occasional.
      moveMode = Math.random() < 0.22 ? 'fast' : 'slow';
    }

    moving = true;
    faceDirection(targetX - x);

    // IMPORTANT: movement speed and Spine animation are always synchronized.
    syncAnimationToMode();
  }

  function scheduleMove(delay = 700) {
    clearTimeout(nextMoveTimer);
    nextMoveTimer = setTimeout(() => {
      if (enabled) chooseFarTarget();
    }, delay);
  }

  function showSpeech(text, ms = 2400) {
    if (!enabled || sectionSuppressed) return;
    flySpeech.textContent = text;
    flySpeech.classList.add('show');

    clearTimeout(flySpeech._hideTimer);
    flySpeech._hideTimer = setTimeout(() => {
      flySpeech.classList.remove('show');
    }, ms);
  }

  function scheduleSpeech(delay = 4200) {
    clearTimeout(nextSpeechTimer);
    nextSpeechTimer = setTimeout(() => {
      if (!enabled || sectionSuppressed) return;

      if (Math.random() < 0.30) {
        showSpeech('bzbzbzbzbzbbzbz', 1800);
      } else {
        showSpeech(normalPhrases[Math.floor(Math.random() * normalPhrases.length)]);
      }

      scheduleSpeech(5600 + Math.random() * 3200);
    }, delay);
  }

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove('show'), 1600);
  }

  function applySectionSuppression(value) {
    if (sectionSuppressed === value) return;
    sectionSuppressed = value;

    // IMPORTANT:
    // This automatic rule affects ONLY the fly.
    // The animation/character controls remain available for future demos.
    if (sectionSuppressed) {
      moving = false;
      clearTimeout(nextMoveTimer);
      clearTimeout(nextSpeechTimer);
      flySpeech.classList.remove('show');
      flyStage.classList.add('is-disabled');
      sendToFly('flies');
    } else {
      flyStage.classList.toggle('is-disabled', !enabled || sectionSuppressed);
      if (enabled) {
        moving = true;
        waitUntil = 0;
        chooseFarTarget('slow');
        scheduleSpeech(1500);
      }
    }
  }

  function updateFlyForScrollSection() {
    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');

    if (!aboutSection && !contactSection) return;

    // Fly is visible in the upper portfolio/work area.
    // As soon as ABOUT or anything below it reaches the viewport,
    // the fly is automatically hidden.
    const firstRestrictedSection = aboutSection || contactSection;
    const threshold = window.innerHeight * 0.72;
    const shouldSuppress = firstRestrictedSection.getBoundingClientRect().top <= threshold;

    applySectionSuppression(shouldSuppress);
  }

  function setEnabled(value) {
    enabled = value;
    flyStage.classList.toggle('is-disabled', !enabled);
    flyToggle.classList.toggle('is-on', enabled);
    flyToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');

    if (enabled && !sectionSuppressed) {
      moving = true;
      waitUntil = 0;
      showSpeech('FLY ONLINE', 900);
      chooseFarTarget('slow');
      scheduleSpeech(1800);
    } else {
      moving = false;
      clearTimeout(nextMoveTimer);
      clearTimeout(nextSpeechTimer);
      flySpeech.classList.remove('show');
      moveMode = 'slow';
      sendToFly('flies');
    }
  }

  function animate(now) {
    const dt = Math.min(0.04, Math.max(0, (now - lastTime) / 1000));
    lastTime = now;

    if (enabled && !sectionSuppressed && moving && now >= waitUntil) {
      const dx = targetX - x;
      const dy = targetY - y;
      const distance = Math.hypot(dx, dy);

      faceDirection(dx);

      if (distance <= 4) {
        x = targetX;
        y = targetY;
        render();

        moving = false;

        // When stopped, always return to calm flies.
        moveMode = 'slow';
        sendToFly('flies');

        const pause = 700 + Math.random() * 1100;
        waitUntil = now + pause;
        scheduleMove(pause);
      } else {
        const speed = moveMode === 'fast' ? FAST_SPEED : SLOW_SPEED;
        const step = Math.min(distance, speed * dt);
        x += (dx / distance) * step;
        y += (dy / distance) * step;
        render();
      }
    }

    requestAnimationFrame(animate);
  }

  flyToggle.addEventListener('click', () => setEnabled(!enabled));

  // Automatic fly visibility:
  // WORK / upper page = fly can run
  // ABOUT + CONTACT = fly disappears
  // Scrolling back above ABOUT = fly returns if the user left it enabled
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      updateFlyForScrollSection();
      scrollTicking = false;
    });
  }, { passive: true });
// Frog click is handled by the dedicated one-shot FIRE controller below.

  window.addEventListener('message', (event) => {
    const data = event.data || {};
    if (data.source !== 'vahram-fly-v4') return;

    if (data.type === 'ready') {
      showSpeech("HI. I'M VAHRAM'S FLY.", 1800);
      chooseFarTarget('slow');
      scheduleSpeech(3200);
    }

    if (data.type === 'fire') {
      showSpeech('BOOM — SPINE 2D!', 1500);
    }
  });

  updateFlyForScrollSection();

  window.addEventListener('resize', () => {
    updateFlyForScrollSection();
    const b = bounds();
    x = Math.max(b.minX, Math.min(x, b.maxX));
    y = Math.max(b.minY, Math.min(y, b.maxY));
    render();
    chooseFarTarget('slow');
  });

  render();
  chooseFarTarget('slow');
  requestAnimationFrame(animate);
})();



/* =========================================================
   CROC V19 — ONE-SHOT
   Exact sequence:
   start -> running -> Happy_1 -> running -> fade out -> OFF
   ========================================================= */
(() => {
  const stage = document.getElementById('vtCrocStage');
  const frame = document.getElementById('vtCrocFrame');
  const button = document.getElementById('vtCrocToggle');

  if (!stage || !frame || !button) return;

  let playing = false;
  let ready = false;
  let runId = 0;
  const completed = [];

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  function send(type, extra = {}) {
    try {
      frame.contentWindow.postMessage(
        { source:'vahram-site-croc-v18', type, ...extra },
        '*'
      );
    } catch (_) {}
  }

  function play(name, loop = false) {
    send('play', { name, loop });
  }

  function setButton(on) {
    button.classList.toggle('is-on', on);
    button.setAttribute('aria-pressed', on ? 'true' : 'false');
  }

  function showStage() {
    stage.classList.remove('is-disabled', 'is-fading');
    stage.classList.add('is-on');
    stage.setAttribute('aria-hidden', 'false');
    stage.style.opacity = '1';
  }

  function hideStageImmediate() {
    stage.classList.remove('is-on', 'is-fading');
    stage.classList.add('is-disabled');
    stage.setAttribute('aria-hidden', 'true');
    stage.style.opacity = '0';
  }

  async function fadeAndFinish(id) {
    if (id !== runId) return;

    playing = false;
    setButton(false);

    stage.classList.add('is-fading');
    stage.style.transition = 'opacity 1.0s ease, transform 1.0s ease';
    stage.style.opacity = '0';

    await sleep(1050);

    if (id !== runId) return;
    send('stop');
    hideStageImmediate();
  }

  function waitForComplete(name, timeout = 5000) {
    return new Promise(resolve => {
      const watcher = { name, done:false };
      completed.push(watcher);

      const timer = setTimeout(() => {
        if (watcher.done) return;
        watcher.done = true;
        resolve();
      }, timeout);

      watcher.resolve = () => {
        if (watcher.done) return;
        watcher.done = true;
        clearTimeout(timer);
        resolve();
      };
    });
  }

  function resolveComplete(name) {
    const watcher = completed.find(x => !x.done && x.name === name);
    if (watcher && watcher.resolve) watcher.resolve();
  }

  function stageWidth() {
    return Math.max(420, stage.getBoundingClientRect().width || 640);
  }

  async function runSequence(id) {
    const w = stageWidth();
    const leftStart = Math.max(12, Math.round(window.innerWidth * 0.025));
    const middle = Math.max(leftStart + 150, Math.round(window.innerWidth * 0.48 - w * 0.46));
    const right = Math.max(middle + 190, Math.round(window.innerWidth - w * 0.78));

    stage.classList.remove('face-left');
    stage.classList.add('face-right');

    /* Enter from the left */
    stage.style.transition = 'none';
    stage.style.left = (-w * 0.84) + 'px';
    showStage();
    void stage.offsetWidth;

    /* 1. start */
    play('start', false);
    stage.style.transition = 'left 1.0s cubic-bezier(.18,.78,.28,1)';
    stage.style.left = leftStart + 'px';
    await waitForComplete('start', 2600);
    if (!playing || id !== runId) return;

    /* 2. running */
    play('running', true);
    stage.style.transition = 'left 2.8s linear';
    stage.style.left = middle + 'px';
    await sleep(2800);
    if (!playing || id !== runId) return;

    /* 3. Happy_1 */
    play('Happy_1', false);
    await waitForComplete('Happy_1', 5200);
    if (!playing || id !== runId) return;

    /* 4. running — this is now the LAST animation */
    play('running', true);
    stage.style.transition = 'left 2.8s linear';
    stage.style.left = right + 'px';
    await sleep(2800);
    if (!playing || id !== runId) return;

    /* Finished: smoothly disappear and switch button OFF automatically */
    await fadeAndFinish(id);
  }

  function startOneShot() {
    if (!ready || playing) return;

    playing = true;
    runId++;
    setButton(true);
    runSequence(runId);
  }

  function stopNow() {
    if (!playing) return;

    playing = false;
    runId++;
    setButton(false);
    send('stop');
    hideStageImmediate();
  }

  button.addEventListener('click', () => {
    if (playing) {
      stopNow();
    } else {
      startOneShot();
    }
  });

  window.addEventListener('message', (event) => {
    const d = event.data || {};
    if (d.source !== 'vahram-croc-v18') return;

    if (d.type === 'ready') {
      ready = true;
      hideStageImmediate();
    }

    if (d.type === 'complete' && d.name) {
      resolveComplete(d.name);
    }

    if (d.type === 'error') {
      console.error('CROC widget:', d.reason);
    }
  });

  hideStageImmediate();
  setButton(false);
})();


/* =========================================================
   HERO ROTATING ART SETS V1
   Sequential card swap with inertia.
   ========================================================= */
(() => {
  const stack = document.getElementById('heroRotatingStack');
  const cards = stack ? [...stack.querySelectorAll('.hero-rot-card')] : [];
  const imgs = [document.getElementById('heroImg0'),document.getElementById('heroImg1'),document.getElementById('heroImg2')];
  const title = document.getElementById('heroStackTitle');
  const label = document.getElementById('heroStackLabel');
  const note = document.getElementById('heroHandNote');
  if(!stack || cards.length !== 3 || imgs.some(i=>!i)) return;

  const sets = [
    {
      title:'CASINO GAME ART',
      note:'Casino Game Art',
      images:[
        'assets/hero-sets/casino_01.webp',
        'assets/hero-sets/casino_02.webp',
        'assets/hero-sets/casino_03.webp'
      ]
    },
    {
      title:'CARTOON / ANIMATION',
      note:'Cartoon Covers',
      images:[
        'assets/hero-sets/cartoon_01.webp',
        'assets/hero-sets/cartoon_02.webp',
        'assets/hero-sets/cartoon_03.webp'
      ]
    },
    {
      title:'SPINE 2D / ANIMATED GAME CHARACTERS',
      note:'Game Characters · Spine 2D',
      images:[
        'assets/hero-sets/spine_frog.webp',
        'assets/hero-sets/spine_crocodile.webp',
        'assets/hero-sets/spine_fly.webp'
      ]
    },
    {
      title:'CHARACTER CONCEPT ART',
      note:'Concept Art',
      images:[
        'assets/hero-sets/concept_01.webp',
        'assets/hero-sets/concept_02.webp',
        'assets/hero-sets/concept_03.webp'
      ]
    },
    {
      title:'ENVIRONMENTS',
      note:'Game Environment Concept Art',
      images:[
        'assets/hero-sets/environment_01.webp',
        'assets/hero-sets/environment_02.webp',
        'assets/hero-sets/environment_03.webp'
      ]
    },
    {
      title:'CHARACTER DESIGN',
      note:'Character Design',
      images:[
        'assets/hero-sets/character_design_01.webp',
        'assets/hero-sets/character_design_02.webp',
        'assets/hero-sets/character_design_03.webp'
      ]
    }
  ];

  let current = 0;
  let busy = false;
  const HOLD_MS = 3400;

  function wait(ms){return new Promise(r=>setTimeout(r,ms));}

  async function swapSet(){
    if(busy) return;
    busy = true;
    const next = (current + 1) % sets.length;

    // Disappear one card after another: rear -> middle -> front.
    for(const card of cards){
      card.classList.remove('is-entering');
      card.classList.add('is-leaving');
      await wait(115);
    }
    await wait(300);

    const nextSet = sets[next];
    label?.classList.add('is-changing');
    note?.classList.add('is-changing');

    // Preload new sources before revealing.
    await Promise.all(nextSet.images.map(src => new Promise(resolve => {
      const im = new Image();
      im.onload = im.onerror = resolve;
      im.src = src;
    })));

    imgs.forEach((img,i)=>{ img.src = nextSet.images[i]; img.alt = nextSet.title; });
    if(title) title.textContent = nextSet.title;
    if(note) note.textContent = nextSet.note;

    cards.forEach(c=>c.classList.remove('is-leaving'));
    void stack.offsetWidth;
    cards.forEach(c=>c.classList.add('is-entering'));
    await wait(760);
    cards.forEach(c=>c.classList.remove('is-entering'));
    label?.classList.remove('is-changing');
    note?.classList.remove('is-changing');

    current = next;
    busy = false;
  }

  // Keep the first set visible briefly, then rotate automatically.
  setInterval(swapSet,HOLD_MS);

  // Manual full-set advance: one click = one complete next set.
  const showcase = document.getElementById('heroShowcase');
  if(showcase){
    const manualNext = () => swapSet();

    showcase.addEventListener('click', (e) => {
      if(e.target.closest('a,button')) return;
      manualNext();
    });

    showcase.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        manualNext();
      }
    });
  }
})();


// =========================================================
// CONTACT COPY — email + phone only, inline feedback
// =========================================================
(() => {
  const triggers = document.querySelectorAll('#contact .contact-copy-trigger');

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const temp = document.createElement('textarea');
    temp.value = value;
    temp.setAttribute('readonly', '');
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    temp.remove();
  }

  function showInlineState(el, text) {
    const state = el.querySelector('.inline-copy-state');
    if (!state) return;
    state.textContent = text;
    state.classList.add('show');
    clearTimeout(state._hideTimer);
    state._hideTimer = setTimeout(() => state.classList.remove('show'), 1500);
  }

  function selectionInside(el) {
    const sel = window.getSelection?.();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return false;
    const range = sel.getRangeAt(0);
    return el.contains(range.commonAncestorContainer);
  }

  triggers.forEach((el) => {
    const runCopy = async () => {
      // If the visitor is selecting the phone/email text with the mouse,
      // do not interfere with manual Ctrl+C.
      if (selectionInside(el)) return;

      const value = el.dataset.copy || '';
      const label = el.dataset.copyLabel || 'CONTACT';

      try {
        await copyText(value);
        showInlineState(el, `${label} COPIED`);
      } catch (err) {
        showInlineState(el, 'COPY FAILED');
      }
    };

    el.addEventListener('click', runCopy);

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        runCopy();
      }
    });
  });
})();


// =========================================================
// TRUE HERO NAME MORPH — V25 RETURN-TO-HERO FIX
// SAME name element. It docks beside the avatar on scroll down
// and returns exactly to its original HERO slot on scroll up.
// =========================================================
(() => {
  const name = document.getElementById('heroNameMorph');
  const slot = document.getElementById('heroNameSlot');
  const avatar = document.querySelector('.brand-avatar-wrap');
  const hero = document.querySelector('.hero');

  if (!name || !slot || !avatar || !hero) return;

  let home = null;
  let target = null;
  let naturalWidth = 1;
  let ticking = false;

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  // Keep using the SAME element as the fixed overlay.
  document.body.appendChild(name);

  function measure() {
    const slotRect = slot.getBoundingClientRect();
    const avatarRect = avatar.getBoundingClientRect();

    /*
      Critical fix:
      getBoundingClientRect() is viewport-relative.
      If the browser restores the page at a scrolled position, or a resize occurs
      while scrolled, using slotRect.top directly corrupts the "home" position.

      Convert it to the canonical position the slot would have at scrollY = 0.
    */
    home = {
      x: slotRect.left + window.scrollX,
      y: slotRect.top + window.scrollY
    };

    target = {
      x: avatarRect.right + 10,
      y: Math.max(4, avatarRect.top + 1)
    };

    // Measure the unscaled name without leaving stale transforms behind.
    const oldTransform = name.style.transform;
    const oldLeft = name.style.left;
    const oldTop = name.style.top;

    name.style.transform = 'scale(1)';
    name.style.left = `${home.x}px`;
    name.style.top = `${home.y}px`;
    naturalWidth = name.getBoundingClientRect().width || 1;

    name.style.transform = oldTransform;
    name.style.left = oldLeft;
    name.style.top = oldTop;

    render();
  }

  function render() {
    if (!home || !target) return;

    const heroRect = hero.getBoundingClientRect();

    const totalTravel = Math.max(260, hero.offsetHeight * 0.68);
    const scrolledThroughHero = Math.max(0, -heroRect.top + 40);
    const p = clamp(scrolledThroughHero / totalTravel, 0, 1);

    const eased = p < 0.5
      ? 4 * p * p * p
      : 1 - Math.pow(-2 * p + 2, 3) / 2;

    const desiredFinalWidth = clamp(window.innerWidth * 0.125, 155, 205);
    const finalScale = clamp(desiredFinalWidth / naturalWidth, 0.15, 0.30);
    const scale = 1 + (finalScale - 1) * eased;

    // At the very top, return to the exact original hero position.
    const x = home.x + (target.x - home.x) * eased;
    const y = home.y + (target.y - home.y) * eased;

    name.style.left = `${x}px`;
    name.style.top = `${y}px`;
    name.style.transformOrigin = 'top left';
    name.style.transform = `scale(${scale})`;
    name.style.opacity = '1';
    name.style.visibility = 'visible';
    name.style.zIndex = '2147483646';
  }

  function queueRender() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      render();
      ticking = false;
    });
  }

  window.addEventListener('scroll', queueRender, { passive: true });

  // Re-measure safely on resize at any scroll position.
  window.addEventListener('resize', () => {
    requestAnimationFrame(measure);
  });

  window.addEventListener('load', () => {
    requestAnimationFrame(() => requestAnimationFrame(measure));
  });

  // Initial measure.
  requestAnimationFrame(() => requestAnimationFrame(measure));
})();


// =========================================================
// V13 STAGED HINTS
// ON  -> explain that the fly can be turned off.
// OFF -> invite visitor to view demo animations.
// =========================================================
(() => {
  const hint = document.getElementById('flyDisableHint');
  const hintText = document.getElementById('flyHintText');
  const flyButton = document.getElementById('vtFlyToggle');
  const crocButton = document.getElementById('vtCrocToggle');
  const frogButton = document.getElementById('vtFrogToggle');

  if (!hint || !hintText || !flyButton) return;

  let hideTimer = null;

  function flyIsOn() {
    return flyButton.getAttribute('aria-pressed') === 'true';
  }

  function setHintForState() {
    const on = flyIsOn();

    if (on) {
      hintText.textContent = 'YOU CAN TURN OFF THE FLY';
      hint.classList.remove('is-demo-hint');
    } else {
      hintText.textContent = 'CLICK TO VIEW MY DEMO ANIMATIONS';
      hint.classList.add('is-demo-hint');
    }
  }

  function showHint(ms = 3600) {
    setHintForState();
    hint.classList.add('show');

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      hint.classList.remove('show');
    }, ms);
  }

  function hideHint() {
    hint.classList.remove('show');
  }

  // First onboarding hint.
  window.addEventListener('load', () => {
    setTimeout(() => showHint(4300), 900);
  });

  // After toggling the fly, show the NEXT useful instruction.
  flyButton.addEventListener('click', () => {
    setTimeout(() => showHint(3200), 40);
  });

  flyButton.addEventListener('mouseenter', () => showHint(1800));
  flyButton.addEventListener('mouseleave', hideHint);

  // Hovering the other demo controls can also remind visitors that demos are available.
  [crocButton, frogButton].filter(Boolean).forEach((button) => {
    button.addEventListener('mouseenter', () => {
      if (!flyIsOn()) showHint(1800);
    });
    button.addEventListener('mouseleave', hideHint);
  });
})();


/* =========================================================
   FROG ONE-SHOT FIRE CONTROLLER V20
   Reliability fix:
   - cancels old fade timer before replay
   - removes is-fading before replay
   - queues a click if iframe is not ready yet
   - allows replay immediately after the previous shot finishes
   ========================================================= */
(() => {
  const button = document.getElementById('vtFrogToggle');
  const stage = document.getElementById('vtFrogStage');
  const frame = document.getElementById('vtFrogFrame');
  if(!button || !stage || !frame) return;

  let ready = false;
  let playing = false;
  let pendingPlay = false;
  let hideTimer = null;
  let runId = 0;

  function setButton(on){
    button.classList.toggle('is-on', on);
    button.classList.toggle('is-playing', on);
    button.setAttribute('aria-pressed', on ? 'true' : 'false');
  }

  function hide(immediate = false, id = runId){
    if(id !== runId) return;

    playing = false;
    setButton(false);

    clearTimeout(hideTimer);
    hideTimer = null;

    if(immediate){
      stage.classList.remove('is-fading');
      stage.classList.add('is-disabled');
      stage.setAttribute('aria-hidden','true');
      return;
    }

    stage.classList.add('is-fading');
    stage.setAttribute('aria-hidden','true');

    hideTimer = setTimeout(()=>{
      if(id !== runId) return;
      stage.classList.remove('is-fading');
      stage.classList.add('is-disabled');
      hideTimer = null;
    }, 1100);
  }

  function play(){
    if(playing) return;

    if(!ready){
      pendingPlay = true;
      return;
    }

    runId++;
    const id = runId;

    clearTimeout(hideTimer);
    hideTimer = null;

    playing = true;
    pendingPlay = false;
    setButton(true);

    /* Critical fix: remove BOTH classes before starting again. */
    stage.classList.remove('is-disabled', 'is-fading');
    stage.setAttribute('aria-hidden','false');

    /* Force browser to apply visible state before the Spine play message. */
    void stage.offsetWidth;

    try{
      frame.contentWindow.postMessage({
        source:'vahram-site-frog-v1',
        type:'play',
        runId:id
      },'*');
    }catch(_){
      hide(true, id);
    }
  }

  button.addEventListener('click', play);

  window.addEventListener('message',(event)=>{
    const d = event.data || {};
    if(d.source !== 'vahram-frog-v1') return;

    if(d.type === 'ready'){
      ready = true;
      hide(true);

      if(pendingPlay){
        requestAnimationFrame(play);
      }
    }

    if(d.type === 'done'){
      hide(false, runId);
    }
  });

  setButton(false);
  stage.classList.add('is-disabled');
})();


/* =========================================================
   PRIVATE ARCHIVE V18 — browser zoom compensation
   Cards stay visually almost the same size under Ctrl +/-.
   ========================================================= */
(() => {
  const BASE_WIDTH = 420;
  const RATIO = 450 / 794;
  const initialDpr = window.devicePixelRatio || 1;
  let raf = 0;

  function applyArchiveCardSize() {
    const currentDpr = window.devicePixelRatio || initialDpr;

    /* Counter-scale browser zoom relative to the zoom level at page load. */
    let factor = initialDpr / currentDpr;

    /* Prevent absurd sizes on extreme zoom / monitor transitions. */
    factor = Math.max(0.55, Math.min(1.55, factor));

    const width = Math.round(BASE_WIDTH * factor);
    const height = Math.round(width * RATIO);

    document.documentElement.style.setProperty('--private-card-w', width + 'px');
    document.documentElement.style.setProperty('--private-card-h', height + 'px');
  }

  function schedule() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(applyArchiveCardSize);
  }

  applyArchiveCardSize();
  window.addEventListener('resize', schedule, { passive:true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', schedule, { passive:true });
  }

  /* devicePixelRatio can change on Ctrl +/- without a dedicated event. */
  setInterval(() => {
    const dpr = window.devicePixelRatio || initialDpr;
    if (Math.abs(dpr - (applyArchiveCardSize._lastDpr || initialDpr)) > 0.001) {
      applyArchiveCardSize._lastDpr = dpr;
      schedule();
    }
  }, 250);
})();



/* =========================================================
   V23 — BACK TO TOP (robust DOM-ready binding)
   ========================================================= */
(() => {
  function initScrollTop() {
    const button = document.getElementById('vtScrollTop');
    if (!button || button.dataset.bound === '1') return;

    button.dataset.bound = '1';

    button.addEventListener('click', () => {
      const root = document.scrollingElement || document.documentElement;

      try {
        root.scrollTo({ top:0, left:0, behavior:'smooth' });
      } catch (_) {
        root.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollTop, { once:true });
  } else {
    initScrollTop();
  }
})();


/* =========================================================
   V28 — HEADER NAME BACK TO TOP
   Avatar already links to #top; this adds the same action to
   the moving VAHRAM TUMANYAN name.
   ========================================================= */
(() => {
  function goTop() {
    const root = document.scrollingElement || document.documentElement;
    try {
      root.scrollTo({ top:0, left:0, behavior:'smooth' });
    } catch (_) {
      root.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }

  function init() {
    const name = document.getElementById('heroNameMorph');
    if (!name || name.dataset.topBound === '1') return;

    name.dataset.topBound = '1';
    name.addEventListener('click', goTop);

    name.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goTop();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else {
    init();
  }
})();


/* =========================================================
   V30 — RELIABLE CLICK ON MOVING NAME -> TOP
   ========================================================= */
(() => {
  function goTop(){
    const root = document.scrollingElement || document.documentElement;
    try{
      root.scrollTo({top:0,left:0,behavior:'smooth'});
    }catch(_){
      root.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }

  function bind(){
    const name = document.getElementById('heroNameMorph');
    if(!name || name.dataset.v30TopBound === '1') return;

    name.dataset.v30TopBound = '1';
    name.style.pointerEvents = 'auto';
    name.style.cursor = 'pointer';

    name.addEventListener('click', goTop);
    name.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        goTop();
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind, {once:true});
  }else{
    bind();
  }
})();


/* =========================================================
   V37 — ABOUT BADGE INERTIAL SWING ON SCROLL
   The badge reacts briefly to scroll momentum and settles.
   ========================================================= */
(() => {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const badge = document.querySelector('#about .about-v34-badge');
  const about = document.getElementById('about');
  if (!badge || !about) return;

  let lastY = window.scrollY || 0;
  let angle = 0;
  let angleV = 0;
  let lift = 0;
  let liftV = 0;
  let raf = 0;
  let lastT = performance.now();

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function visibleEnough(){
    const r = about.getBoundingClientRect();
    return r.bottom > -120 && r.top < window.innerHeight + 120;
  }

  function render(){
    const now = performance.now();
    const dt = clamp((now - lastT) / 16.67, 0.5, 2.0);
    lastT = now;

    // Small spring + damping, so the badge naturally returns to rest.
    angleV += (-angle * 0.075) * dt;
    angleV *= Math.pow(0.84, dt);
    angle += angleV * dt;

    liftV += (-lift * 0.11) * dt;
    liftV *= Math.pow(0.78, dt);
    lift += liftV * dt;

    angle = clamp(angle, -2.35, 2.35);
    lift = clamp(lift, -3.0, 3.0);

    badge.style.setProperty('--badge-swing', `${angle.toFixed(3)}deg`);
    badge.style.setProperty('--badge-lift', `${lift.toFixed(3)}px`);

    const stillMoving =
      Math.abs(angle) > 0.015 ||
      Math.abs(angleV) > 0.015 ||
      Math.abs(lift) > 0.03 ||
      Math.abs(liftV) > 0.03;

    if (stillMoving) {
      raf = requestAnimationFrame(render);
    } else {
      angle = angleV = lift = liftV = 0;
      badge.style.setProperty('--badge-swing', '0deg');
      badge.style.setProperty('--badge-lift', '0px');
      raf = 0;
    }
  }

  function wake(){
    if (!raf) {
      lastT = performance.now();
      raf = requestAnimationFrame(render);
    }
  }

  window.addEventListener('scroll', () => {
    const y = window.scrollY || 0;
    const delta = clamp(y - lastY, -90, 90);
    lastY = y;

    if (!visibleEnough()) return;

    // Very small impulse: enough to feel suspended, never distracting.
    angleV += delta * 0.0042;
    liftV += delta * 0.012;

    angleV = clamp(angleV, -0.62, 0.62);
    liftV = clamp(liftV, -1.25, 1.25);

    wake();
  }, { passive:true });

  // Settle cleanly after resize / browser restoration.
  window.addEventListener('resize', () => {
    angle = angleV = lift = liftV = 0;
    badge.style.setProperty('--badge-swing', '0deg');
    badge.style.setProperty('--badge-lift', '0px');
  });
})();


