const projects=window.PORTFOLIO_PROJECTS||[];
const tabs=document.getElementById('docTabs');
const layerList=document.getElementById('layersList');
let currentProject=-1,currentImage=0;
let scale=1, panX=0, panY=0, dragging=false, dragStartX=0,dragStartY=0,startPanX=0,startPanY=0;
const stage=document.getElementById('projectStage'), stageImg=document.getElementById('stageImage');

function switchPage(name){
 document.querySelectorAll('.page').forEach(p=>p.classList.remove('active-page'));
 document.querySelectorAll('.doc-tab[data-page]').forEach(t=>t.classList.remove('active'));
 const page=document.getElementById('page-'+name); if(page) page.classList.add('active-page');
 const tab=document.querySelector(`.doc-tab[data-page="${name}"]`); if(tab) tab.classList.add('active');
}
document.querySelectorAll('.doc-tab[data-page]').forEach(t=>t.addEventListener('click',()=>switchPage(t.dataset.page)));
document.querySelector('.goto-portfolio').onclick=()=>switchPage('portfolio');

function addDynamicTab(project){
 let old=document.querySelector('.doc-tab.dynamic');
 if(old) old.remove();
 const t=document.createElement('button');
 t.className='doc-tab dynamic active';
 t.innerHTML=`${project.title.replace(/\s+/g,'_').toUpperCase()}.psd <span>×</span>`;
 t.addEventListener('click',()=>switchPage('portfolio'));
 t.querySelector('span').addEventListener('click',e=>{e.stopPropagation();t.remove();});
 tabs.appendChild(t);
 document.querySelectorAll('.doc-tab[data-page]').forEach(x=>x.classList.remove('active'));
}

projects.forEach((p,i)=>{
 const card=document.createElement('div');card.className='layer-card';
 card.innerHTML=`<div class="layer-thumb"><img src="${p.cover}" alt="${p.title}"></div>
 <div class="layer-copy"><div class="layer-row"><span class="eye-dot">◉</span><h3>${p.title}</h3><span class="ps-icon">PSD</span></div><p>${p.category}</p></div>`;
 card.onclick=()=>openProject(i);
 layerList.appendChild(card);
});

function openProject(index){
 currentProject=index;currentImage=0;
 switchPage('portfolio');
 document.querySelectorAll('.layer-card').forEach((c,i)=>c.classList.toggle('active',i===index));
 const p=projects[index];
 addDynamicTab(p);
 document.getElementById('stageTitle').textContent=p.title;
 document.getElementById('stageCategory').textContent=p.category;
 document.getElementById('behanceLink').href=p.behance;
 document.getElementById('selectedInfo').innerHTML=`<small>SELECTED LAYER</small><h3>${p.title}</h3><p>${p.category}</p><p>${p.images.length} images in this demo project.</p>`;
 document.getElementById('emptyStage').style.display='none';
 stageImg.style.display='block';
 showImage();
}

function showImage(){
 if(currentProject<0)return;
 const p=projects[currentProject];
 stageImg.src=p.images[currentImage];
 document.getElementById('imageCounter').textContent=`${currentImage+1} / ${p.images.length}`;
 resetView(false);
}
document.getElementById('nextImage').onclick=()=>{if(currentProject<0)return;const a=projects[currentProject].images;currentImage=(currentImage+1)%a.length;showImage()};
document.getElementById('prevImage').onclick=()=>{if(currentProject<0)return;const a=projects[currentProject].images;currentImage=(currentImage-1+a.length)%a.length;showImage()};

function fitScale(){
 if(!stageImg.naturalWidth||!stage.clientWidth)return 1;
 return Math.min((stage.clientWidth-40)/stageImg.naturalWidth,(stage.clientHeight-40)/stageImg.naturalHeight);
}
function applyTransform(){
 stageImg.style.width=stageImg.naturalWidth+'px';
 stageImg.style.height=stageImg.naturalHeight+'px';
 stageImg.style.transform=`translate(${panX}px,${panY}px) scale(${scale})`;
 const pct=Math.round(scale*100);
 document.getElementById('zoomReadout').textContent=pct+'%';
 document.getElementById('zoomReadoutTop').textContent=pct+'%';
}
function resetView(use100=false){
 panX=0;panY=0;
 requestAnimationFrame(()=>{scale=use100?1:fitScale();applyTransform()});
}
document.getElementById('fitBtn').onclick=()=>resetView(false);
document.getElementById('hundredBtn').onclick=()=>resetView(true);
document.getElementById('zoomPlus').onclick=()=>{scale=Math.min(4,scale*1.18);applyTransform()};
document.getElementById('zoomMinus').onclick=()=>{scale=Math.max(.08,scale/1.18);applyTransform()};

stage.addEventListener('wheel',e=>{
 if(currentProject<0)return;
 e.preventDefault();
 const rect=stage.getBoundingClientRect();
 const mouseX=e.clientX-rect.left-rect.width/2;
 const mouseY=e.clientY-rect.top-rect.height/2;
 const old=scale;
 const factor=e.deltaY<0?1.12:1/1.12;
 scale=Math.max(.08,Math.min(4,scale*factor));
 const ratio=scale/old;
 panX=mouseX-(mouseX-panX)*ratio;
 panY=mouseY-(mouseY-panY)*ratio;
 applyTransform();
},{passive:false});

stage.addEventListener('pointerdown',e=>{
 if(currentProject<0 || e.pointerType==='touch')return;
 dragging=true;dragStartX=e.clientX;dragStartY=e.clientY;startPanX=panX;startPanY=panY;
 stage.setPointerCapture(e.pointerId);
});
stage.addEventListener('pointermove',e=>{
 if(!dragging)return;
 panX=startPanX+(e.clientX-dragStartX);panY=startPanY+(e.clientY-dragStartY);applyTransform();
});
stage.addEventListener('pointerup',()=>dragging=false);
stage.addEventListener('pointercancel',()=>dragging=false);
stage.addEventListener('dblclick',()=>resetView(false));

let touchStartDist=0,touchStartScale=1,touchStartMid=null,touchPanStart={x:0,y:0};
stage.addEventListener('touchstart',e=>{
 if(currentProject<0)return;
 if(e.touches.length===2){
   const a=e.touches[0],b=e.touches[1];
   touchStartDist=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);
   touchStartScale=scale;
   touchStartMid={x:(a.clientX+b.clientX)/2,y:(a.clientY+b.clientY)/2};
 } else if(e.touches.length===1){
   touchStartMid={x:e.touches[0].clientX,y:e.touches[0].clientY};
   touchPanStart={x:panX,y:panY};
 }
},{passive:false});
stage.addEventListener('touchmove',e=>{
 if(currentProject<0)return;
 e.preventDefault();
 if(e.touches.length===2){
   const a=e.touches[0],b=e.touches[1];
   const d=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);
   scale=Math.max(.08,Math.min(4,touchStartScale*(d/touchStartDist)));
   applyTransform();
 } else if(e.touches.length===1 && touchStartMid){
   panX=touchPanStart.x+(e.touches[0].clientX-touchStartMid.x);
   panY=touchPanStart.y+(e.touches[0].clientY-touchStartMid.y);
   applyTransform();
 }
},{passive:false});

window.addEventListener('resize',()=>{if(currentProject>=0) resetView(false)});

/* creatures — single improved upright fly */
const speech=document.getElementById('speech');
const fly=document.getElementById('portfolioFly');

const flyLines=[
  'Bzz! Vahram draws really cool characters 😎',
  'Big green eyes approved! 👀',
  'Check out his Behance — lots of art 🎨',
  'Character design? He knows his stuff ✨',
  'I am the portfolio inspector. Looks good ✅',
  'He makes concepts, animation and game art 🔥',
  'Bzzzz… this artist has imagination!',
  'I refuse to fly upside-down now 😂'
];

function sayFly(message){
  if(!fly || !speech) return;
  const r=fly.getBoundingClientRect();
  speech.textContent=message || flyLines[Math.floor(Math.random()*flyLines.length)];
  speech.style.left=Math.max(8,Math.min(innerWidth-280,r.left+r.width*.62))+'px';
  speech.style.top=Math.max(8,r.top-46)+'px';
  speech.classList.add('show');
  clearTimeout(window.__flySpeech);
  window.__flySpeech=setTimeout(()=>speech.classList.remove('show'),1800);
}

let mx=-999,my=-999;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});

let fx=innerWidth*.62;
let fy=innerHeight*.67;
let tx=fx,ty=fy;
let nextMove=0;
let restUntil=0;

function newFlyTarget(){
  tx=50+Math.random()*Math.max(100,innerWidth-120);
  // mostly lower/middle part of the page
  ty=innerHeight*(.44+Math.random()*.40);
}

newFlyTarget();

if(fly){
  fly.addEventListener('click',()=>{
    sayFly();
    tx=50+Math.random()*Math.max(100,innerWidth-120);
    ty=innerHeight*(.45+Math.random()*.38);
  });

  fly.addEventListener('mouseenter',()=>{
    if(Math.random()>.22) sayFly();
  });
}

function animateFly(t){
  if(!fly) return;

  if(t>nextMove){
    if(Math.random()<.20){
      restUntil=t+500+Math.random()*1100;
      nextMove=restUntil+350;
      if(Math.random()<.35) sayFly();
    }else{
      newFlyTarget();
      nextMove=t+900+Math.random()*1900;
    }
  }

  const dxMouse=mx-fx;
  const dyMouse=my-fy;
  const dist=Math.hypot(dxMouse,dyMouse);

  if(dist<135){
    tx=fx-dxMouse*2.5+(Math.random()-.5)*100;
    ty=Math.max(innerHeight*.40,Math.min(innerHeight*.88,fy-dyMouse*1.75));
    nextMove=t+700;
  }

  if(t>restUntil){
    fx+=(tx-fx)*.022;
    fy+=(ty-fy)*.022;
  }

  fx=Math.max(8,Math.min(innerWidth-90,fx));
  fy=Math.max(innerHeight*.36,Math.min(innerHeight-80,fy));

  /* IMPORTANT:
     only a tiny left/right tilt based on horizontal travel.
     No atan2 rotation, so the fly can NEVER turn upside-down. */
  const horizontal=tx-fx;
  const tilt=Math.max(-12,Math.min(12,horizontal*.035));

  fly.style.left=fx+'px';
  fly.style.top=fy+'px';
  fly.style.transform=`translate(-50%,-50%) rotate(${tilt}deg)`;

  requestAnimationFrame(animateFly);
}

requestAnimationFrame(animateFly);

window.addEventListener('resize',()=>{
  fx=Math.min(fx,innerWidth-90);
  fy=Math.min(fy,innerHeight-80);
  newFlyTarget();
});

