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


/* spine fly */
const speech=document.getElementById('speech');
const flyWrap=document.getElementById('spineFlyWrap');
const flyPlayerEl=document.getElementById('spineFlyPlayer');

const flyLines=[
  'Bzz! Vahram draws really cool characters 😎',
  'This fly is now your real Spine animation 🎬',
  'Idle… run… fire! 🎯',
  'Check Vahram\'s Behance — lots of creative art 🎨',
  'Cursor too close? I run. Cursor touches? I fire! 🔥',
  'Spine 4.3 animation connected successfully ✅'
];

let flyPlayer=null;
let flyReady=false;
let currentFlyAnim='';
let fireCooldownUntil=0;
let forcedRunUntil=0;
let mx=-999,my=-999;
let fx=innerWidth*.62, fy=innerHeight*.67;
let tx=fx, ty=fy;
let nextMove=0, restUntil=0;

function sayFly(message){
  if(!flyWrap || !speech) return;
  const r=flyWrap.getBoundingClientRect();
  speech.textContent=message || flyLines[Math.floor(Math.random()*flyLines.length)];
  speech.style.left=Math.max(8,Math.min(innerWidth-310,r.left+r.width*.6))+'px';
  speech.style.top=Math.max(8,r.top-46)+'px';
  speech.classList.add('show');
  clearTimeout(window.__flySpeech);
  window.__flySpeech=setTimeout(()=>speech.classList.remove('show'),1800);
}

function setFlyAnim(name, loop=true, force=false){
  if(!flyReady || !flyPlayer) return;
  if(!force && currentFlyAnim===name) return;
  currentFlyAnim=name;
  flyWrap.classList.toggle('is-running', name==='run');
  flyWrap.classList.toggle('is-firing', name==='fire');
  try{
    if(name==='fire'){
      flyPlayer.animationState.setAnimation(0, 'fire', false);
      flyPlayer.animationState.addAnimation(0, 'run', true, 0);
    }else{
      flyPlayer.setAnimation(name, loop);
    }
  }catch(err){
    console.warn('Spine animation change failed', err);
  }
}

function faceTarget(x){
  if(!flyWrap) return;
  if(x < fx) {
    flyWrap.classList.add('face-left');
    flyWrap.classList.remove('face-right');
  } else {
    flyWrap.classList.add('face-right');
    flyWrap.classList.remove('face-left');
  }
}

function newFlyTarget(){
  tx=55 + Math.random()*Math.max(120, innerWidth-130);
  ty=innerHeight*(.44 + Math.random()*.40);
}
newFlyTarget();

function initSpineFly(){
  if(!window.spine || !flyPlayerEl) return;
  try{
    flyPlayer = new spine.SpinePlayer('spineFlyPlayer', {
      skeleton: 'assets/spine/jeko_spine_final.json',
      atlas: 'assets/spine/jeko_spine_final.atlas',
      animation: 'idle',
      scale: 0.5,
      premultipliedAlpha: true,
      alpha: true,
      showControls: false,
      interactive: false,
      backgroundColor: '#00000000',
      defaultMix: 0.12,
      success: function(player){
        flyReady=true;
        currentFlyAnim='idle';
        faceTarget(tx);
        try{ player.setAnimation('idle', true); }catch(e){}
        setTimeout(()=>sayFly('Your Spine fly is connected 😎'), 700);
      },
      error: function(player, reason){
        console.error('Spine fly error:', reason);
        sayFly('Spine loading error 😥');
      }
    });
  }catch(err){
    console.error('Failed to initialize Spine fly', err);
  }
}

addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
});

if(flyWrap){
  flyWrap.addEventListener('mouseenter',()=>{
    if(Math.random()>.2) sayFly();
  });
  flyWrap.addEventListener('click',()=>{
    sayFly('Bzz! Fire animation! 🎯');
    faceTarget(mx);
    setFlyAnim('fire', false, true);
    fireCooldownUntil = performance.now() + 950;
    forcedRunUntil = performance.now() + 1250;
    tx = Math.max(60, Math.min(innerWidth-120, fx - (mx-fx)*2.2 + (Math.random()-.5)*140));
    ty = Math.max(innerHeight*.38, Math.min(innerHeight*.88, fy - (my-fy)*1.8));
  });
}

function animateFly(t){
  if(!flyWrap){ requestAnimationFrame(animateFly); return; }

  if(t > nextMove){
    if(Math.random() < .18){
      restUntil = t + 450 + Math.random()*900;
      nextMove = restUntil + 400;
      if(Math.random() < .30) sayFly();
    } else {
      newFlyTarget();
      nextMove = t + 1000 + Math.random()*2200;
    }
  }

  const dxMouse = mx - fx;
  const dyMouse = my - fy;
  const dist = Math.hypot(dxMouse, dyMouse);

  // State logic requested by the user:
  // idle = normal, run = when cursor is near, fire = when cursor touches / very close.
  if(dist < 65 && t > fireCooldownUntil){
    faceTarget(mx);
    setFlyAnim('fire', false, true);
    fireCooldownUntil = t + 1000;
    forcedRunUntil = t + 1350;
    tx = Math.max(60, Math.min(innerWidth-120, fx - dxMouse*2.8 + (Math.random()-.5)*120));
    ty = Math.max(innerHeight*.38, Math.min(innerHeight*.90, fy - dyMouse*2.0));
    nextMove = t + 900;
  } else if(dist < 190 || t < forcedRunUntil){
    faceTarget(tx);
    setFlyAnim('run', true);
    tx = Math.max(60, Math.min(innerWidth-120, fx - dxMouse*2.3 + (Math.random()-.5)*120));
    ty = Math.max(innerHeight*.38, Math.min(innerHeight*.90, fy - dyMouse*1.6));
    nextMove = t + 650;
  } else {
    faceTarget(tx);
    setFlyAnim('idle', true);
  }

  let speed = 0.018;
  if(currentFlyAnim==='run') speed = 0.045;
  if(currentFlyAnim==='fire') speed = 0.035;

  if(t > restUntil || currentFlyAnim!=='idle'){
    fx += (tx - fx) * speed;
    fy += (ty - fy) * speed;
  }

  fx = Math.max(20, Math.min(innerWidth-110, fx));
  fy = Math.max(innerHeight*.34, Math.min(innerHeight-90, fy));

  flyWrap.style.left = fx + 'px';
  flyWrap.style.top = fy + 'px';

  requestAnimationFrame(animateFly);
}

window.addEventListener('resize',()=>{
  fx=Math.min(fx,innerWidth-110);
  fy=Math.min(fy,innerHeight-90);
  newFlyTarget();
});

initSpineFly();
requestAnimationFrame(animateFly);

