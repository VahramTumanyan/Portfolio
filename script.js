const fly = document.getElementById('fly');
const spider = document.getElementById('spider');
const toast = document.getElementById('toast');

let fx = innerWidth * .72, fy = innerHeight * .18;
let tx = fx, ty = fy;
let nextMove = 0;

function randomFlyTarget() {
  const margin = 60;
  tx = margin + Math.random() * (innerWidth - margin * 2);
  ty = margin + Math.random() * (innerHeight * .72);
}

function animateFly(t) {
  if (t > nextMove) {
    randomFlyTarget();
    nextMove = t + 900 + Math.random() * 1700;
  }
  fx += (tx - fx) * .025;
  fy += (ty - fy) * .025;
  fly.style.left = fx + 'px';
  fly.style.top = fy + 'px';
  const angle = Math.atan2(ty - fy, tx - fx) * 180 / Math.PI;
  fly.style.transform = `rotate(${angle}deg)`;
  requestAnimationFrame(animateFly);
}
requestAnimationFrame(animateFly);

document.addEventListener('mousemove', e => {
  const dx = e.clientX - fx, dy = e.clientY - fy;
  const d = Math.hypot(dx, dy);
  if (d < 120) {
    tx = fx - dx * 3 + (Math.random() - .5) * 100;
    ty = fy - dy * 3 + (Math.random() - .5) * 100;
    nextMove = performance.now() + 800;
  }

  // Spider reacts a little when cursor is near bottom
  if (e.clientY > innerHeight - 140) {
    spider.style.animationDuration = '6s';
  } else {
    spider.style.animationDuration = '14s';
  }
});

document.querySelectorAll('.hotspot').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.target;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({behavior:'smooth', block:'center'});
      el.animate([
        {transform:'scale(1)', boxShadow:'0 0 0 rgba(255,196,61,0)'},
        {transform:'scale(1.04)', boxShadow:'0 0 0 10px rgba(255,196,61,.28)'},
        {transform:'scale(1)', boxShadow:'0 0 0 rgba(255,196,61,0)'}
      ], {duration:700});
      showToast('Opened: ' + el.querySelector('h4').textContent);
    }
  });
});

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 1400);
}
