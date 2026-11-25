(function(){
var $=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* Langue FR / EN */
$$('[data-en]').forEach(function(e){e.dataset.fr=e.innerHTML});
var lang='fr';
function setLang(l){lang=l;document.documentElement.lang=l;
$$('[data-en]').forEach(function(e){e.innerHTML=l==='en'?e.dataset.en:e.dataset.fr});
$$('.lg button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.l===l)});
try{localStorage.setItem('lg',l)}catch(e){}
}
$$('.lg button').forEach(function(b){b.onclick=function(){setLang(b.dataset.l)}});
/* Apparition au scroll */
var rv=$$('.rv');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){en.forEach(function(t){if(t.isIntersecting){t.target.classList.add('on');io.unobserve(t.target)}})},{threshold:.15});rv.forEach(function(e){io.observe(e)})}
else rv.forEach(function(e){e.classList.add('on')});
/* Curseur personnalisé + halo */
var root=document.documentElement;
addEventListener('pointermove',function(e){root.style.setProperty('--mx',e.clientX+'px');root.style.setProperty('--my',e.clientY+'px')});
if(matchMedia('(pointer:fine)').matches){
var c1=$('.c1'),c2=$('.c2'),x=-100,y=-100,rx=-100,ry=-100;document.body.classList.add('cur');
addEventListener('pointermove',function(e){x=e.clientX;y=e.clientY;c1.style.transform='translate('+x+'px,'+y+'px)'});
(function f(){rx+=(x-rx)*(reduce?1:.18);ry+=(y-ry)*(reduce?1:.18);c2.style.transform='translate('+rx+'px,'+ry+'px)';requestAnimationFrame(f)})();
document.addEventListener('pointerover',function(e){c2.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,button,.project-card')))})}
/* Init */
var s=null;try{s=localStorage.getItem('lg')}catch(e){}
setLang(s||((navigator.language||'fr').slice(0,2)==='en'?'en':'fr'));
})();
