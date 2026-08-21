document.documentElement.classList.add('js');

const nav=document.querySelector('nav');
const menu=document.querySelector('#menu');
if(menu&&nav){
  menu.setAttribute('aria-expanded','false');
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(open));
    menu.textContent=open?'×':'☰';
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
    menu.textContent='☰';
  }));
}

const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('nav a')];
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting) entry.target.classList.add('show');
}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const activeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting) links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id));
}),{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(section=>activeObserver.observe(section));

// Keep the email CTA useful even when the device has no configured mail client.
document.querySelectorAll('.email-link').forEach(link=>link.addEventListener('click',async()=>{
  try{await navigator.clipboard?.writeText('r.vasanthkumar027@gmail.com')}catch{}
}));

requestAnimationFrame(()=>document.querySelector('.hero')?.classList.add('show'));
