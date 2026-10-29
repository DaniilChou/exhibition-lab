var e=matchMedia(`(hover: hover) and (pointer: fine)`),t=matchMedia(`(prefers-reduced-motion: reduce)`),n=52,r=[9,11],i=32,a=40,o=.8,s=.15,c=120,l=`M 2.6 13.6 C 0.6 12.2 -0.4 9.2 0.2 6.4 C 0.8 2.8 3.6 0.4 7.2 0.2 C 10.6 0 13.4 1.0 15.6 2.4 C 18 3.8 20.6 5.6 22.6 8.0 C 24.4 10 24.2 12.8 22.2 14.0 C 18.6 15.8 13 16.2 9 15.6 C 6.6 15.2 4.4 14.6 2.6 13.6 Z`,u=`M 13.6 3.0 C 20 2.4 28 4.2 33 7.2 C 36 9 37.2 11 36.6 12.4 C 33 13.8 27 13.8 22 12.6 C 17.6 11.4 14.4 9 13.2 6.6 C 12.6 5.4 12.8 4 13.6 3.0 Z`,d=[13.6,3.4],f=[.2,6.6],p=[19,10],m=e=>{let t=t=>`${(e*Math.cos(t*Math.PI/180)).toFixed(2)} ${(e*Math.sin(t*Math.PI/180)).toFixed(2)}`,n=`M ${t(-125)} A ${e} ${e} 0 0 1 ${t(-50)}`;return`<path d="${n}" class="c-line-out"/><path d="${n}" class="c-line-in"/>`},h=e=>`<g transform="translate(${d[0]} ${d[1]})"><g class="${e}"><path d="${u}" class="c-shape" transform="translate(${-d[0]} ${-d[1]})"/></g></g>`,g=`<svg viewBox="0 0 ${n} ${n}" width="${n}" height="${n}">
  <g transform="translate(${r[0]} ${r[1]}) rotate(${i}) translate(${-f[0]} ${-f[1]})">
    ${h(`c-far`)}
    <path d="${l}" class="c-shape"/>
    <circle cx="5.4" cy="6" r="1.9" class="c-eye"/>
    ${h(`c-wing`)}
    <g transform="translate(${p[0]} ${p[1]})"><g class="c-arc c-arc-1">${m(14)}</g><g class="c-arc c-arc-2">${m(18)}</g></g>
  </g>
</svg>`,_=`
@media (hover: hover) and (pointer: fine) {
  html, html * { cursor: none !important; }
}
.fx-cicada {
  position: fixed; left: 0; top: 0; z-index: 1000;
  width: ${n}px; height: ${n}px;
  pointer-events: none; opacity: 0;
  view-transition-name: fx-cicada;
  will-change: transform;
}
.fx-cicada[data-shown] { opacity: 1; }
.fx-cicada svg { display: block; overflow: visible; }
.fx-cicada .c-turn, .fx-cicada .c-squash { width: 100%; height: 100%; transform-origin: ${r[0]}px ${r[1]}px; }
.fx-cicada .c-squash { transition: transform var(--dur-fast) var(--ease-out); }
.fx-cicada[data-press] .c-squash { transform: scale(0.9); }

.fx-cicada .c-shape { fill: var(--color-summer); stroke: var(--color-ink); stroke-width: 2; stroke-linejoin: round; }
.fx-cicada .c-eye { fill: var(--color-ink); }
.fx-cicada .c-line-out { fill: none; stroke: var(--color-ink); stroke-width: 2.8; stroke-linecap: round; }
.fx-cicada .c-line-in { fill: none; stroke: var(--color-summer); stroke-width: 1.1; stroke-linecap: round; }

.fx-cicada .c-wing, .fx-cicada .c-far, .fx-cicada .c-arc { transform-box: view-box; transform-origin: 0 0; }
.fx-cicada .c-wing, .fx-cicada .c-far { transition: transform var(--dur-fast) var(--ease-out); }
.fx-cicada .c-far, .fx-cicada .c-arc { opacity: 0; }

/* в полёте крыло поднято и машет, второе крыло видно за телом */
.fx-cicada[data-pose="fly"] .c-wing { animation: c-flap 90ms var(--ease-in-out) infinite alternate; }
.fx-cicada[data-pose="fly"] .c-far { opacity: 1; animation: c-flap-far 90ms var(--ease-in-out) infinite alternate; }
/* над ссылкой — крыло чуть приподнято, звучит дуга */
.fx-cicada[data-pose="link"] .c-wing { transform: rotate(-8deg); }
.fx-cicada[data-pose="link"] .c-arc-1 { opacity: 1; animation: c-sing 900ms var(--ease-in-out) infinite alternate; }
/* нажатие — взмах */
.fx-cicada[data-press] .c-wing { transform: rotate(-36deg); animation: none; }
.fx-cicada[data-press] .c-far { opacity: 1; transform: rotate(-16deg); animation: none; }

@keyframes c-flap { from { transform: rotate(-16deg); } to { transform: rotate(-34deg); } }
@keyframes c-flap-far { from { transform: rotate(-6deg); } to { transform: rotate(-20deg); } }
@keyframes c-sing { from { transform: scale(0.92); } to { transform: scale(1.06); } }

/* спокойная версия: без взмахов, поворота и пульса — только смена состояний */
@media (prefers-reduced-motion: reduce) {
  .fx-cicada .c-wing, .fx-cicada .c-far, .fx-cicada .c-squash { transition: none; }
  .fx-cicada[data-pose="fly"] .c-wing { animation: none; transform: rotate(-28deg); }
  .fx-cicada[data-pose="fly"] .c-far { animation: none; transform: rotate(-12deg); }
  .fx-cicada[data-pose="link"] .c-arc-1 { animation: none; }
  .fx-cicada[data-press] .c-arc { opacity: 1; }
}

/* переход по шву: свой слой поверх, без проявления — сразу живая цикада */
::view-transition-group(fx-cicada) { z-index: 10; animation: none; }
::view-transition-old(fx-cicada) { display: none; }
::view-transition-new(fx-cicada) { animation: none; }
`,v=`a[href], button, [role="button"], summary, label, select`,y=null;function b(){let e=document.createElement(`div`);e.className=`fx-cicada`,e.setAttribute(`aria-hidden`,`true`),e.innerHTML=`<style>${_}</style><div class="c-turn"><div class="c-squash">${g}</div></div>`,document.documentElement.append(e);let n=e.querySelector(`.c-turn`),l=[...e.querySelectorAll(`.c-arc`)],u=new AbortController,{signal:d}=u,f=0,p=0,m=0,h=0,b=0,x=0,S=0,C=0,w=!1,T=!1,E=!1,D=0,O=0,k=()=>{e.dataset.pose=w?`link`:E?`fly`:`idle`},A=e=>{let t=O?Math.min(e-O,64):16.7;O=e,E&&e-x>c&&(E=!1,C=0,k()),S+=(C-S)*(1-.88**(t/16.7)),!E&&Math.abs(S)<.1&&(S=0),n.style.transform=`rotate(${S.toFixed(2)}deg)`,D=E||S!==0?requestAnimationFrame(A):0,D||(O=0)},j=()=>{D||=requestAnimationFrame(A)};addEventListener(`pointermove`,n=>{if(n.pointerType===`touch`)return;let c=Math.max(n.timeStamp-m,1);e.dataset.shown===void 0||c>200?h=b=0:(h=h*.7+(n.clientX-f)/c*.3,b=b*.7+(n.clientY-p)/c*.3),f=n.clientX,p=n.clientY,m=n.timeStamp,e.style.transform=`translate3d(${f-r[0]}px, ${p-r[1]}px, 0)`,e.dataset.shown=``;let l=Math.hypot(h,b);if(l>s){if(x=performance.now(),E||(E=!0,k()),!t.matches){let e=(Math.atan2(-b,-h)*180/Math.PI-i+540)%360-180;C=Math.max(-40,Math.min(a,e))*Math.min(1,l/o)}j()}},{passive:!0,signal:d}),addEventListener(`pointerover`,e=>{let t=e.target instanceof Element&&e.target.closest(v)!==null;t!==w&&(w=t,k())},{passive:!0,signal:d}),addEventListener(`pointerdown`,n=>{if(n.pointerType===`touch`)delete e.dataset.shown;else if(T=!0,e.dataset.press=``,!t.matches)for(let[e,t]of l.entries())t.animate([{opacity:1,transform:`scale(0.85)`},{opacity:0,transform:`scale(${1.25+e*.1})`}],{duration:420,delay:e*60,easing:`cubic-bezier(0.22, 1, 0.36, 1)`})},{passive:!0,signal:d});let M=()=>{T&&(T=!1,delete e.dataset.press)};addEventListener(`pointerup`,M,{passive:!0,signal:d}),addEventListener(`pointercancel`,M,{passive:!0,signal:d}),document.documentElement.addEventListener(`mouseleave`,()=>delete e.dataset.shown,{signal:d}),addEventListener(`blur`,()=>delete e.dataset.shown,{signal:d}),document.addEventListener(`astro:after-swap`,()=>{w=!1,k()},{signal:d}),k(),y=()=>{u.abort(),cancelAnimationFrame(D),e.remove(),y=null}}var x=!1,S=()=>{let t=x&&e.matches;t&&!y&&b(),!t&&y&&y()};function C(e){x=e,S()}e.addEventListener(`change`,S);export{C as setCicada};