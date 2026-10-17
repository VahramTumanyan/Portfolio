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
      'assets/private/hostel/05.jpg',
      'assets/private/hostel/06.jpg',
      'assets/private/hostel/07.jpg',
      'assets/private/hostel/08.jpg',
      'assets/private/hostel/09.jpg',
      'assets/private/hostel/10.jpg',
      'assets/private/hostel/11.jpg',
      'assets/private/hostel/12.jpg',
      'assets/private/hostel/13.jpg',
      'assets/private/hostel/14.jpg',
      'assets/private/hostel/15.jpg',
      'assets/private/hostel/16.jpg',
      'assets/private/hostel/17.jpg',
      'assets/private/hostel/18.jpg',
      'assets/private/hostel/19.jpg',
      'assets/private/hostel/20.jpg'
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
      'assets/private/deadwater/06.jpg',
      'assets/private/deadwater/07.jpg',
      'assets/private/deadwater/08.jpg',
      'assets/private/deadwater/09.jpg',
      'assets/private/deadwater/10.jpg',
      'assets/private/deadwater/11.jpg',
      'assets/private/deadwater/12.jpg',
      'assets/private/deadwater/13.jpg',
      'assets/private/deadwater/14.jpg',
      'assets/private/deadwater/15.jpg',
      'assets/private/deadwater/16.jpg',
      'assets/private/deadwater/17.jpg',
      'assets/private/deadwater/18.jpg',
      'assets/private/deadwater/19.jpg',
      'assets/private/deadwater/20.jpg'
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

let privateCurrentProject = null;
let privateCurrentIndex = 0;

function renderPrivateViewer(){
  if(!privateCurrentProject) return;
  const data = privateProjects[privateCurrentProject];
  const src = data.images[privateCurrentIndex];

  privateViewerTitle.textContent = data.title;
  privateViewerImage.src = src;
  privateViewerImage.alt = `${data.title} — image ${privateCurrentIndex + 1}`;
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

window.addEventListener('keydown',e=>{
  if(!privateViewer?.classList.contains('open')) return;
  if(e.key === 'Escape') closePrivateViewer();
  if(e.key === 'ArrowLeft') privatePrev?.click();
  if(e.key === 'ArrowRight') privateNext?.click();
});


// ===== ACTIVE NAVIGATION ON SCROLL =====
const navLinks = [...document.querySelectorAll('.topbar nav .nav-link')];
const navSections = navLinks
  .map(link => {
    const id = link.getAttribute('href');
    const section = id && id.startsWith('#') ? document.querySelector(id) : null;
    return section ? { link, section } : null;
  })
  .filter(Boolean);

function updateActiveNav(){
  if(!navSections.length) return;

  const marker = window.innerHeight * 0.34;
  let current = navSections[0];

  for(const item of navSections){
    const rect = item.section.getBoundingClientRect();
    if(rect.top <= marker){
      current = item;
    }
  }

  navLinks.forEach(link => link.classList.remove('active'));
  current.link.classList.add('active');
}

window.addEventListener('scroll', updateActiveNav, {passive:true});
window.addEventListener('resize', updateActiveNav);
updateActiveNav();

// Smooth section navigation
navLinks.forEach(link=>{
  link.addEventListener('click', e=>{
    const target = document.querySelector(link.getAttribute('href'));
    if(!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});
