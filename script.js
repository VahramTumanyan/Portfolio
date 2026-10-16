const allToggle = document.getElementById('allToggle');
const cards = [...document.querySelectorAll('.character-card')];
const fly = document.getElementById('flyDemo');
const croc = document.getElementById('crocDemo');
const frog = document.getElementById('frogDemo');
const demos = { fly, croc, frog };
let flyMode = 'auto';
let flyTimer;

function updateCharacter(card){
  const key = card.dataset.character;
  const checkbox = card.querySelector('.char-switch input');
  const demo = demos[key];
  if(!demo) return;
  if(key === 'fly') demo.style.display = checkbox.checked ? 'block' : 'none';
  else demo.style.display = checkbox.checked ? 'block' : 'none';
}
function syncAll(){
  cards.forEach(card=>{
    card.querySelector('.char-switch input').checked = allToggle.checked;
    updateCharacter(card);
  });
}
allToggle.addEventListener('change', syncAll);

cards.forEach(card=>{
  const rowSwitch = card.querySelector('.char-switch input');
  rowSwitch.addEventListener('change',()=>{
    updateCharacter(card);
    const allOn = cards.every(c=>c.querySelector('.char-switch input').checked);
    const allOff = cards.every(c=>!c.querySelector('.char-switch input').checked);
    if(allOn) allToggle.checked = true;
    if(allOff) allToggle.checked = false;
  });
  card.querySelector('.chev').addEventListener('click',()=>card.classList.toggle('open'));
  card.querySelectorAll('.anim').forEach(btn=>btn.addEventListener('click',()=>{
    card.querySelectorAll('.anim').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    if(card.dataset.character==='fly') setFlyMode(btn.dataset.anim || btn.textContent.trim());
  }));
});

function setFlyMode(mode){
  flyMode = mode;
  clearInterval(flyTimer);
  fly.classList.remove('fast','fire','rig');
  fly.textContent = '🪰';
  if(mode==='Rig_View'){ fly.classList.add('rig'); fly.textContent='✣'; }
  else if(mode==='fire'){ fly.classList.add('fire'); fly.textContent='🪰💥'; }
  else if(mode==='flies_Run'){ fly.classList.add('fast'); }
  else if(mode==='auto') startAutoFly();
}

function moveFly(fast=false){
  const x = 48 + Math.random()*36;
  const y = 30 + Math.random()*38;
  fly.style.transition = `left ${fast?.55:1.8}s cubic-bezier(.2,.8,.2,1), top ${fast?.55:1.8}s cubic-bezier(.2,.8,.2,1), transform .25s`;
  fly.style.left = x+'%';
  fly.style.top = y+'%';
  fly.style.transform = `rotate(${Math.random()*28-14}deg) scale(${fast?1.12:1})`;
}
function startAutoFly(){
  moveFly(false);
  flyTimer = setInterval(()=>moveFly(Math.random()>.68),2200);
}
startAutoFly();

// Пока нет Spine runtime, курсор только демонстрирует будущую логику “fire”.
document.addEventListener('pointermove',e=>{
  if(flyMode!=='auto' || fly.style.display==='none') return;
  const r=fly.getBoundingClientRect();
  const dx=e.clientX-(r.left+r.width/2), dy=e.clientY-(r.top+r.height/2);
  if(Math.hypot(dx,dy)<90){
    fly.textContent='🪰💥';
    setTimeout(()=>{ if(flyMode==='auto') fly.textContent='🪰'; },260);
  }
});
