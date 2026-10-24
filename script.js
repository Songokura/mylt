const t=document.getElementById('tickerIn');t.innerHTML+=t.innerHTML;

const burger=document.getElementById('burger'),menu=document.getElementById('menu');
function setMenu(open){
  burger.classList.toggle('open',open);menu.classList.toggle('open',open);
  burger.setAttribute('aria-expanded',open);burger.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');
  document.body.style.overflow=open?'hidden':'';
}
burger.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){setMenu(false);burger.focus()}});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.18,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.rv,.wp,.acard,#checks,.contact-card,.why-photo,.geo-card').forEach(el=>io.observe(el));

const cio=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;cio.unobserve(e.target);
  const el=e.target,end=+el.dataset.cnt,t0=performance.now();
  (function f(now){const p=Math.min((now-t0)/1100,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0);
}),{threshold:.6});
document.querySelectorAll('[data-cnt]').forEach(el=>cio.observe(el));

const route=document.getElementById('route'),fill=document.getElementById('routeFill'),dot=document.getElementById('routeDot');
function upd(){
  const r=route.getBoundingClientRect(),vh=innerHeight;
  const p=Math.min(Math.max((vh*0.55-r.top)/r.height,0),1);
  const h=p*r.height;
  fill.style.height=h+'px';dot.style.top=h+'px';
}
addEventListener('resize',upd);upd();

const stage=document.getElementById('stage'),ghost=document.getElementById('ghost');
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
function hero(){
  if(rm)return;
  const y=Math.min(scrollY,700);
  if(innerWidth>=900)stage.style.transform=`translateY(${y*0.1}px)`;else stage.style.transform='';
  ghost.style.opacity=Math.max(1-y/420,0);
}

const mbar=document.getElementById('mbar');
let ticking=false;
addEventListener('scroll',()=>{
  if(ticking)return;ticking=true;
  requestAnimationFrame(()=>{ticking=false;upd();hero();mbar.classList.toggle('show',scrollY>500)});
},{passive:true});

function conv(key){
  const id=(window.MYLT_CONV||{})[key];
  if(!id||typeof window.gtag!=='function')return;
  window.gtag('event','conversion',{send_to:id,value:1.0,currency:'USD',transport_type:'beacon'});
}
addEventListener('click',e=>{
  const a=e.target.closest&&e.target.closest('a[href]');
  if(!a)return;
  const h=a.getAttribute('href');
  if(h.startsWith('tel:'))conv('phone');
  else if(h.includes('wa.me/')||h.startsWith('mailto:'))conv('contact');
},true);
