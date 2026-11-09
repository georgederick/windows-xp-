const $=(s,r=document)=>r.querySelector(s);
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const store={
get(k,d){try{const v=localStorage.getItem('xp_'+k);return v===null?d:JSON.parse(v)}catch(e){return d}},
set(k,v){try{localStorage.setItem('xp_'+k,JSON.stringify(v))}catch(e){}}
};
const S=b=>`<svg viewBox="0 0 32 32">${b}</svg>`;
const ICONS={
ttt:S('<rect x="2" y="2" width="28" height="28" rx="3" fill="#fff" stroke="#6b7fb5"/><path d="M12 5v22M20 5v22M5 12h22M5 20h22" stroke="#3a4f8f" stroke-width="2"/><path d="M6 6l4 4M10 6l-4 4M22 22l4 4M26 22l-4 4" stroke="#d22" stroke-width="2"/><circle cx="16" cy="16" r="2.5" fill="none" stroke="#14c" stroke-width="2"/>'),
calc:S('<rect x="5" y="2" width="22" height="28" rx="3" fill="#c9cfd8" stroke="#555"/><rect x="8" y="5" width="16" height="7" fill="#b9e08a" stroke="#555"/><g fill="#335"><rect x="8" y="15" width="4" height="3"/><rect x="14" y="15" width="4" height="3"/><rect x="20" y="15" width="4" height="3"/><rect x="8" y="20" width="4" height="3"/><rect x="14" y="20" width="4" height="3"/><rect x="20" y="20" width="4" height="8" fill="#d22"/><rect x="8" y="25" width="10" height="3"/></g>'),
snake:S('<rect x="2" y="2" width="28" height="28" rx="3" fill="#bfe58f" stroke="#4a7a1f"/><path d="M6 24h14V14h-8V8h14" fill="none" stroke="#2f7d17" stroke-width="5" stroke-linejoin="round"/><circle cx="24" cy="23" r="3" fill="#d22"/>'),
guess:S('<circle cx="16" cy="16" r="14" fill="#2a63d8" stroke="#123c9a" stroke-width="2"/><text x="16" y="23" font-size="20" font-weight="bold" text-anchor="middle" fill="#fff" font-family="Arial">?</text>'),
pc:S('<rect x="3" y="3" width="26" height="18" rx="2" fill="#d6d3c8" stroke="#555"/><rect x="6" y="6" width="20" height="12" fill="#3a8be8"/><rect x="10" y="22" width="12" height="3" fill="#aaa"/><rect x="6" y="25" width="20" height="4" rx="1" fill="#d6d3c8" stroke="#555"/>'),
bin:S('<path d="M7 8h18l-2 21H9z" fill="#dde7f3" stroke="#556"/><rect x="5" y="5" width="22" height="3" fill="#99a" stroke="#556"/><path d="M12 11v15M16 11v15M20 11v15" stroke="#889"/>'),
folder:S('<path d="M2 8h10l3 3h15v17H2z" fill="#f5d76e" stroke="#a98a1a"/>'),
help:S('<circle cx="16" cy="16" r="14" fill="#3aa33a" stroke="#1d6b1d" stroke-width="2"/><text x="16" y="23" font-size="20" font-weight="bold" text-anchor="middle" fill="#fff" font-family="Arial">?</text>'),
search:S('<circle cx="13" cy="13" r="8" fill="#cfe6ff" stroke="#556" stroke-width="2"/><path d="M19 19l9 9" stroke="#a66" stroke-width="4"/>'),
run:S('<rect x="2" y="6" width="28" height="20" fill="#fff" stroke="#556"/><rect x="2" y="6" width="28" height="5" fill="#2a63d8"/><path d="M7 16l4 3-4 3" stroke="#000" fill="none"/>'),
cp:S('<rect x="3" y="5" width="26" height="22" fill="#d6d3c8" stroke="#555"/><circle cx="12" cy="16" r="5" fill="#3a8be8"/><path d="M20 10h6M20 16h6M20 22h6" stroke="#555" stroke-width="2"/>'),
off:S('<rect x="2" y="2" width="28" height="28" rx="5" fill="#d9442b" stroke="#fff" stroke-width="2"/><path d="M16 7v9M10 10a9 9 0 1 0 12 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>')
};
const DI={
err:S('<circle cx="16" cy="16" r="14" fill="#d22" stroke="#fff" stroke-width="2"/><path d="M10 10l12 12M22 10L10 22" stroke="#fff" stroke-width="4"/>'),
warn:S('<path d="M16 3L30 28H2z" fill="#f5c400" stroke="#a07800" stroke-width="2"/><path d="M16 12v8M16 23v2" stroke="#000" stroke-width="3"/>'),
info:S('<circle cx="16" cy="16" r="14" fill="#2a63d8" stroke="#fff" stroke-width="2"/><path d="M16 14v9M16 8v3" stroke="#fff" stroke-width="3"/>'),
q:S('<circle cx="16" cy="16" r="14" fill="#2a63d8" stroke="#fff" stroke-width="2"/><text x="16" y="23" font-size="20" font-weight="bold" text-anchor="middle" fill="#fff" font-family="Arial">?</text>')
};
const AVATAR=S('<rect width="32" height="32" fill="#8fc4f5"/><circle cx="16" cy="12" r="6" fill="#f2c38f"/><path d="M4 32q0-12 12-12t12 12z" fill="#e8742a"/>');
const BTN={
mn:'<svg viewBox="0 0 10 10"><rect x="1" y="7" width="6" height="2" fill="#fff"/></svg>',
mx:'<svg viewBox="0 0 10 10"><rect x="1.5" y="1.5" width="7" height="7" fill="none" stroke="#fff" stroke-width="1.5"/><rect x="1" y="1" width="8" height="2.5" fill="#fff"/></svg>',
rs:'<svg viewBox="0 0 10 10"><rect x="3" y="1.5" width="5.5" height="5" fill="none" stroke="#fff" stroke-width="1.3"/><rect x="1.5" y="3.5" width="5.5" height="5" fill="#2a63d8" stroke="#fff" stroke-width="1.3"/></svg>',
cl:'<svg viewBox="0 0 10 10"><path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="#fff" stroke-width="2"/></svg>'
};
const APPS={};
const TUNES={
start:[[392,.4],[523,.4],[659,.4],[784,.4],[1047,1.2]],
stop:[[1047,.4],[784,.4],[659,.4],[523,.4],[392,1]],
beep:[[440,.15]],
ding:[[880,.2],[1175,.3]]
};
const Snd={
ctx:null,
on:store.get('sound',true),
set(v){this.on=v;store.set('sound',v);const s=$('#spk');if(s)s.classList.toggle('mute',!v)},
play(n){
if(!this.on||!TUNES[n])return;
try{
this.ctx=this.ctx||new(window.AudioContext||window.webkitAudioContext)();
let t=this.ctx.currentTime;
TUNES[n].forEach(([f,d])=>{
const o=this.ctx.createOscillator(),g=this.ctx.createGain();
o.type='sine';o.frequency.value=f;
g.gain.setValueAtTime(.15,t);g.gain.exponentialRampToValueAtTime(.001,t+d);
o.connect(g);g.connect(this.ctx.destination);o.start(t);o.stop(t+d);t+=d*.7;
});
}catch(e){}
}
};
const UI={
dialog(o){
const ov=el('div','ov'),d=el('div','win dlg act');
const bt=o.buttons||[['OK']];
d.innerHTML=`<div class="tb"><span class="ti">${ICONS[o.app||'help']}</span><span class="tt">${o.title}</span><button class="b cl">${BTN.cl}</button></div><div class="wb dlgb"><div class="dm">${DI[o.icon||'info']}<div>${o.msg}</div></div>${o.input?'<input class="di" type="text">':''}<div class="dbt"></div></div>`;
const inp=$('.di',d);
const close=()=>{ov.remove()};
bt.forEach(([t,f])=>{
const b=el('button','',t);
b.onclick=()=>{const v=inp?inp.value:'';close();if(f)f(v)};
$('.dbt',d).append(b);
});
$('.b',d).onclick=close;
d.onkeydown=e=>{if(e.key==='Escape')close();if(e.key==='Enter'){const f=$('.dbt button',d);if(f)f.click()}};
ov.append(d);$('#app').append(ov);
if(o.icon==='err')Snd.play('beep');
(inp||$('.dbt button',d)).focus();
return{close};
}
};
