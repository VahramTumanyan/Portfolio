const fly = document.getElementById('fly');
const bubble = document.getElementById('flyBubble');
let x = innerWidth * .64, y = innerHeight * .22;
let tx = x, ty = y, angle = 0, scaredUntil = 0;
const lines = ['BZZZ! ✦','HEY, ART!','CATCH ME!','NICE COLORS!','BEHANCE? ↗','I LIVE HERE.'];

function newTarget(){
  const margin = 80;
  tx = margin + Math.random() * Math.max(100, innerWidth - margin*2);
  ty = margin + Math.random() * Math.max(100, innerHeight - margin*2);
}
function say(text){
  bubble.textContent = text || lines[Math.floor(Math.random()*lines.length)];
  bubble.classList.add('show');
  setTimeout(()=>bubble.classList.remove('show'), 1300);
}
function tick(){
  const speed = Date.now() < scaredUntil ? .075 : .018;
  x += (tx-x)*speed; y += (ty-y)*speed;
  const dx = tx-x; angle = Math.max(-18,Math.min(18,dx*.08));
  fly.style.left = `${x}px`; fly.style.top = `${y}px`;
  fly.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`;
  bubble.style.left = `${x+40}px`; bubble.style.top = `${y-48}px`;
  if(Math.hypot(tx-x,ty-y)<24) setTimeout(newTarget, 450 + Math.random()*900);
  requestAnimationFrame(tick);
}

fly.addEventListener('click',()=>{
  scaredUntil = Date.now()+1700;
  say('HEY! 😂');
  newTarget(); newTarget();
});
window.addEventListener('pointermove',(e)=>{
  const d = Math.hypot(e.clientX-x,e.clientY-y);
  if(d<110){
    scaredUntil = Date.now()+1100;
    tx = Math.max(50,Math.min(innerWidth-50, x + (x-e.clientX)*4 + (Math.random()-.5)*150));
    ty = Math.max(50,Math.min(innerHeight-50, y + (y-e.clientY)*4 + (Math.random()-.5)*150));
  }
});
window.addEventListener('resize',()=>{x=Math.min(x,innerWidth-40);y=Math.min(y,innerHeight-40);newTarget()});
setInterval(()=>{ if(Math.random()>.55) say(); },7000);
newTarget(); tick();

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
