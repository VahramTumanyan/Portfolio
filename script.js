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

  workCarousel.addEventListener('wheel',(e)=>{
    if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
      e.preventDefault();
      workCarousel.scrollBy({left:e.deltaY * 1.2,behavior:'auto'});
    }
  },{passive:false});

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

  topCharactersScroll.addEventListener('wheel',(e)=>{
    if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
      e.preventDefault();
      topCharactersScroll.scrollBy({left:e.deltaY * 1.15,behavior:'auto'});
    }
  },{passive:false});

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
  privateViewerCount.textContent = `${privateCurrentIndex + 1} / ${data.images.length}`;

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
   VAHRAM FLY V8 — TURN + TWO SPEED MODES
   flies     = slow cruise
   flies_Run = fast dash
   Character flips horizontally to face movement direction.
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
  let moving = true;

  let x = Math.max(30, window.innerWidth - 270);
  let y = 62;
  let targetX = 90;
  let targetY = Math.min(260, window.innerHeight * 0.34);

  let lastTime = performance.now();
  let waitUntil = 0;
  let nextSpeechTimer = 0;
  let nextMoveTimer = 0;

  // Two deliberately different speeds.
  const SLOW_SPEED = 72;   // flies
  const FAST_SPEED = 430;  // flies_Run

  let moveMode = 'slow';   // 'slow' | 'fast'
  let lastFacing = 'left';

  const phrases = [
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

  function render() {
    flyStage.style.transform =
      `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
  }

  function faceDirection(dx) {
    if (Math.abs(dx) < 1) return;

    const facing = dx > 0 ? 'right' : 'left';
    if (facing === lastFacing) return;
    lastFacing = facing;

    // Mirror only the Spine iframe, never the speech bubble.
    // Default art faces LEFT. Moving right => mirror.
    flyFrame.style.transformOrigin = '50% 50%';
    flyFrame.style.transform = facing === 'right' ? 'scaleX(-1)' : 'scaleX(1)';
  }

  function stageSize() {
    return {
      w: flyStage.offsetWidth || 480,
      h: flyStage.offsetHeight || 270
    };
  }

  function bounds() {
    const { w, h } = stageSize();
    return {
      minX: 18,
      maxX: Math.max(18, window.innerWidth - w - 78),
      minY: 58,
      maxY: Math.max(90, window.innerHeight - h - 18)
    };
  }

  function chooseFarTarget(forceMode = null) {
    if (!enabled) return;

    const b = bounds();
    let nx = b.minX;
    let ny = b.minY;
    let d = 0;

    for (let i = 0; i < 30; i++) {
      nx = b.minX + Math.random() * Math.max(1, b.maxX - b.minX);
      ny = b.minY + Math.random() * Math.max(1, b.maxY - b.minY);
      d = Math.hypot(nx - x, ny - y);
      if (d > Math.min(320, window.innerWidth * 0.28)) break;
    }

    targetX = nx;
    targetY = ny;

    // Alternate slow flight and fast dash so the difference is very visible.
    if (forceMode) {
      moveMode = forceMode;
    } else {
      moveMode = moveMode === 'slow' ? 'fast' : 'slow';
    }

    moving = true;
    faceDirection(targetX - x);

    if (moveMode === 'fast') {
      sendToFly('run');   // flies_Run
    } else {
      sendToFly('idle');  // flies
    }
  }

  function scheduleMove(delay = 800) {
    clearTimeout(nextMoveTimer);
    nextMoveTimer = setTimeout(() => {
      if (enabled) chooseFarTarget();
    }, delay);
  }

  function showSpeech(text, ms = 2500) {
    if (!enabled) return;
    flySpeech.textContent = text;
    flySpeech.classList.add('show');

    clearTimeout(flySpeech._hideTimer);
    flySpeech._hideTimer = setTimeout(() => {
      flySpeech.classList.remove('show');
    }, ms);
  }

  function scheduleSpeech(delay = 3800) {
    clearTimeout(nextSpeechTimer);
    nextSpeechTimer = setTimeout(() => {
      if (!enabled) return;
      showSpeech(phrases[Math.floor(Math.random() * phrases.length)]);
      scheduleSpeech(6200 + Math.random() * 3000);
    }, delay);
  }

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove('show'), 1600);
  }

  function setEnabled(value) {
    enabled = value;
    flyStage.classList.toggle('is-disabled', !enabled);
    flyToggle.classList.toggle('is-on', enabled);
    flyToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');

    if (enabled) {
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
      sendToFly('idle');
    }
  }

  function animate(now) {
    const dt = Math.min(0.04, Math.max(0, (now - lastTime) / 1000));
    lastTime = now;

    if (enabled && moving && now >= waitUntil) {
      const dx = targetX - x;
      const dy = targetY - y;
      const distance = Math.hypot(dx, dy);

      faceDirection(dx);

      if (distance <= 4) {
        x = targetX;
        y = targetY;
        render();

        moving = false;
        sendToFly('idle');

        // Fast runs pause less, slow flights pause a little longer.
        const pause = moveMode === 'fast'
          ? 250 + Math.random() * 350
          : 800 + Math.random() * 900;

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

  crocToggle?.addEventListener('click', () => {
    showToast('CROCODILE — NEXT CHARACTER');
  });

  frogToggle?.addEventListener('click', () => {
    showToast('FROG — NEXT CHARACTER');
  });

  window.addEventListener('message', (event) => {
    const data = event.data || {};
    if (data.source !== 'vahram-fly-v4') return;

    if (data.type === 'ready') {
      showSpeech("HI. I'M VAHRAM'S FLY.", 1800);
      chooseFarTarget('slow');
      scheduleSpeech(3200);
    }

    if (data.type === 'fire') {
      showSpeech('BOOM — SPINE 2D!', 1600);
    }
  });

  window.addEventListener('resize', () => {
    const b = bounds();
    x = Math.max(b.minX, Math.min(x, b.maxX));
    y = Math.max(b.minY, Math.min(y, b.maxY));
    render();
    chooseFarTarget();
  });

  render();
  chooseFarTarget('slow');
  requestAnimationFrame(animate);
})();
