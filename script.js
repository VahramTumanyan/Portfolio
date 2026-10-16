const allToggle = document.getElementById('allToggle');
const panelStatus = document.querySelector('.panel-status');
const runtimeStatus = document.getElementById('runtimeStatus');
const cards = [...document.querySelectorAll('.char-card')];

const actors = {
  fly: document.getElementById('flyActor'),
  frog: document.getElementById('frogActor'),
  croc: document.getElementById('crocActor')
};

const playerRefs = { fly:null, frog:null, croc:null };
const ready = { fly:false, frog:false, croc:false };
let flyMode = 'auto';
let flyMoveTimer = null;
let flyReturnTimer = null;
let crocRunToken = 0;
let frogRunToken = 0;

function setStatus(text, state=''){
  runtimeStatus.textContent = text;
  panelStatus.classList.remove('ready','error');
  if(state) panelStatus.classList.add(state);
}

function makePlayer(key, containerId, skeleton, atlas, animation){
  return new spine.SpinePlayer(containerId, {
    skeleton,
    atlas,
    animation,
    showControls:false,
    alpha:true,
    premultipliedAlpha:true,
    backgroundColor:'#00000000',
    defaultMix:0.12,
    success(player){
      playerRefs[key] = player;
      ready[key] = true;
      if(key === 'fly') player.animationState.setAnimation(0,'flies',true);
      if(Object.values(ready).every(Boolean)) setStatus('Spine 4.3 · ready','ready');
    },
    error(player, reason){
      console.error('Spine load error:', key, reason);
      setStatus('Ошибка загрузки Spine — проверь GitHub Pages','error');
    }
  });
}

if(window.spine?.SpinePlayer){
  setStatus('Spine 4.3 · loading…');
  makePlayer('fly','flyPlayer','assets/spine/fly/jeko_spine_final.json','assets/spine/fly/jeko_spine_final.atlas','flies');
  makePlayer('frog','frogPlayer','assets/spine/frog/Amb+gort spine.json','assets/spine/frog/Amb+gort spine.atlas','fire');
  makePlayer('croc','crocPlayer','assets/spine/croc/kroks spine fayl.json','assets/spine/croc/kroks spine fayl.atlas','start');
}else{
  setStatus('Spine runtime не загрузился','error');
}

function getCard(key){return document.querySelector(`.char-card[data-character="${key}"]`)}
function isEnabled(key){return getCard(key).querySelector('.char-toggle').checked}
function setActorVisible(key, visible){actors[key].classList.toggle('active', !!visible)}
function selectButton(card, btn){card.querySelectorAll('.anim-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active')}

cards.forEach(card=>{
  const key = card.dataset.character;
  const toggle = card.querySelector('.char-toggle');
  card.querySelector('.fold').addEventListener('click',()=>card.classList.toggle('open'));
  toggle.addEventListener('change',()=>{
    onToggleCharacter(key, toggle.checked);
    syncGlobalVisual();
  });
  card.querySelectorAll('.anim-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      selectButton(card,btn);
      const mode = btn.dataset.mode;
      if(!toggle.checked){ toggle.checked = true; onToggleCharacter(key,true); }
      playManual(key,mode);
      syncGlobalVisual();
    });
  });
});

allToggle.addEventListener('change',()=>{
  cards.forEach(card=>{
    const key=card.dataset.character;
    const t=card.querySelector('.char-toggle');
    t.checked=allToggle.checked;
    onToggleCharacter(key,t.checked);
  });
});

function syncGlobalVisual(){
  const states=cards.map(c=>c.querySelector('.char-toggle').checked);
  allToggle.checked=states.every(Boolean);
  allToggle.indeterminate=!states.every(Boolean)&&states.some(Boolean);
}

function onToggleCharacter(key,on){
  if(key==='fly'){
    if(on){ setActorVisible('fly',true); setFlyMode('auto'); }
    else{ setActorVisible('fly',false); stopFlyMotion(); }
  }
  if(key==='frog'){
    if(on) triggerFrogOnce('fire'); else { frogRunToken++; setActorVisible('frog',false); }
  }
  if(key==='croc'){
    if(on) startCrocAuto(); else { crocRunToken++; setActorVisible('croc',false); }
  }
}

function playManual(key,mode){
  if(key==='fly') setFlyMode(mode);
  if(key==='frog') triggerFrogOnce(mode);
  if(key==='croc'){
    crocRunToken++;
    setActorVisible('croc',true);
    const p=playerRefs.croc;
    if(p && ready.croc) p.setAnimation(mode==='auto'?'start':mode, mode==='running');
    if(mode==='auto') startCrocAuto();
  }
}

// -------- Fly --------
function stopFlyMotion(){ clearTimeout(flyMoveTimer); clearTimeout(flyReturnTimer); }
function setFlyMode(mode){
  flyMode=mode;
  stopFlyMotion();
  const p=playerRefs.fly;
  if(!p||!ready.fly) return;
  setActorVisible('fly',true);
  if(mode==='auto'){
    p.setAnimation('flies',true);
    moveFly(false);
    scheduleFlyMove();
  }else{
    p.setAnimation(mode, mode==='flies'||mode==='flies_Run');
  }
}
function scheduleFlyMove(){
  if(flyMode!=='auto'||!isEnabled('fly')) return;
  flyMoveTimer=setTimeout(()=>{
    const fast=Math.random()>.58;
    const p=playerRefs.fly;
    if(p&&ready.fly) p.setAnimation(fast?'flies_Run':'flies',true);
    moveFly(fast);
    flyReturnTimer=setTimeout(()=>{ if(flyMode==='auto'&&p&&ready.fly) p.setAnimation('flies',true); }, fast?900:1500);
    scheduleFlyMove();
  },1700+Math.random()*1700);
}
function moveFly(fast){
  const a=actors.fly;
  const mobile=innerWidth<760;
  const x=mobile ? 20+Math.random()*58 : 43+Math.random()*32;
  const y=mobile ? 26+Math.random()*24 : 27+Math.random()*38;
  const dur=fast?.55:1.6;
  a.style.transition=`left ${dur}s cubic-bezier(.2,.8,.2,1), top ${dur}s cubic-bezier(.2,.8,.2,1), transform .22s, opacity .25s`;
  a.style.left=x+'%';a.style.top=y+'%';
  a.style.transform=`translate(-50%,-50%) scale(${fast?1.09:1}) rotate(${Math.random()*10-5}deg)`;
}
function fireFly(){
  if(!isEnabled('fly')||!ready.fly) return;
  const p=playerRefs.fly;
  const previous=flyMode;
  stopFlyMotion();
  p.setAnimation('fire',false);
  setTimeout(()=>{
    if(!isEnabled('fly')) return;
    if(previous==='auto'){flyMode='auto';p.setAnimation('flies',true);scheduleFlyMove();}
    else if(previous==='fire'){p.setAnimation('flies',true);}
    else p.setAnimation(previous,previous==='flies'||previous==='flies_Run');
  },900);
}
actors.fly.addEventListener('pointerdown',e=>{e.preventDefault();fireFly();});

// -------- Frog --------
function triggerFrogOnce(mode='fire'){
  const p=playerRefs.frog;
  if(!p||!ready.frog) return;
  const token=++frogRunToken;
  setActorVisible('frog',true);
  actors.frog.style.opacity='1';
  p.setAnimation(mode,false);
  if(mode==='Rig_View') return;
  setTimeout(()=>{
    if(token!==frogRunToken) return;
    actors.frog.style.opacity='0';
    setTimeout(()=>{ if(token===frogRunToken) setActorVisible('frog',false); },320);
  },2100);
}

// -------- Crocodile --------
function playOnce(player,name){
  return new Promise(resolve=>{
    if(!player){resolve();return;}
    const entry=player.animationState.setAnimation(0,name,false);
    entry.listener={complete(){resolve();}};
  });
}
function sleep(ms){return new Promise(r=>setTimeout(r,ms))}
async function startCrocAuto(){
  if(!ready.croc) return;
  const token=++crocRunToken;
  const p=playerRefs.croc;
  setActorVisible('croc',true);
  actors.croc.style.transition='left .25s ease, opacity .25s';
  actors.croc.style.left=innerWidth<760?'-58%':'-24%';
  await playOnce(p,'start');
  if(token!==crocRunToken||!isEnabled('croc')) return;
  p.setAnimation('running',true);
  actors.croc.style.transition='left 3.2s linear, opacity .25s';
  actors.croc.style.left=innerWidth<760?'8%':'28%';
  await sleep(3200);
  if(token!==crocRunToken||!isEnabled('croc')) return;
  const happy=Math.random()>.5?'Happy_1':'Happy_2';
  await playOnce(p,happy);
  if(token!==crocRunToken||!isEnabled('croc')) return;
  await sleep(1100);
  if(token!==crocRunToken||!isEnabled('croc')) return;
  // repeat from start, so the cycle always resets cleanly
  startCrocAuto();
}

// Start fly as soon as it is ready.
const waitFly=setInterval(()=>{
  if(ready.fly){clearInterval(waitFly);setFlyMode('auto');}
},100);

// Helpful local-file warning: Spine asset loading needs HTTP(S).
if(location.protocol==='file:'){
  setTimeout(()=>setStatus('Для Spine открой через GitHub Pages / локальный сервер','error'),500);
}
