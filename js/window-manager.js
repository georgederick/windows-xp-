const WM={
wins:new Map(),z:10,active:null,
area(){return{w:innerWidth,h:innerHeight-30}},
top(){return[...this.wins.values()].filter(x=>!x.min).sort((a,b)=>b.el.style.zIndex-a.el.style.zIndex)[0]},
open(id){
const a=APPS[id];if(!a)return null;
let w=this.wins.get(id);
if(w){if(w.min)this.restore(w);this.focus(w);return w}
const A=this.area(),W=Math.min(a.w,A.w-8),H=Math.min(a.h,A.h-8),n=this.wins.size%6;
const e=el('div','win');
e.style.cssText=`width:${W}px;height:${H}px;left:${Math.max(0,Math.min(A.w-W,50+n*30))}px;top:${Math.max(0,Math.min(A.h-H,30+n*30))}px`;
e.innerHTML=`<div class="tb"><span class="ti">${ICONS[a.icon]}</span><span class="tt">${a.title}</span><button class="b mn">${BTN.mn}</button><button class="b mx">${BTN.mx}</button><button class="b cl">${BTN.cl}</button></div><div class="wb"></div><i class="rz r"></i><i class="rz b"></i><i class="rz c"></i>`;
w={id,el:e,app:a,min:false,max:false,inst:{}};
this.wins.set(id,w);
$('#windows').append(e);
Tasks.add(w);
const tb=$('.tb',e);
e.addEventListener('pointerdown',()=>this.focus(w),true);
$('.mn',e).onclick=()=>this.minimize(w);
$('.mx',e).onclick=()=>this.toggleMax(w);
$('.cl',e).onclick=()=>this.close(w);
tb.ondblclick=ev=>{if(!ev.target.closest('.b'))this.toggleMax(w)};
tb.onpointerdown=ev=>{
if(ev.target.closest('.b')||w.max||ev.button)return;
const sx=ev.clientX,sy=ev.clientY,ox=e.offsetLeft,oy=e.offsetTop;
tb.setPointerCapture(ev.pointerId);
tb.onpointermove=m=>{
let x=ox+m.clientX-sx,y=oy+m.clientY-sy;
x=Math.max(80-e.offsetWidth,Math.min(innerWidth-80,x));
y=Math.max(0,Math.min(innerHeight-30-30,y));
e.style.left=x+'px';e.style.top=y+'px';
};
tb.onpointerup=()=>{tb.onpointermove=null};
};
e.querySelectorAll('.rz').forEach(h=>{
h.onpointerdown=ev=>{
if(w.max)return;
ev.preventDefault();h.setPointerCapture(ev.pointerId);
const sx=ev.clientX,sy=ev.clientY,ow=e.offsetWidth,oh=e.offsetHeight;
h.onpointermove=m=>{
if(!h.classList.contains('b'))e.style.width=Math.max(a.mw||200,Math.min(innerWidth-e.offsetLeft,ow+m.clientX-sx))+'px';
if(!h.classList.contains('r'))e.style.height=Math.max(a.mh||150,Math.min(innerHeight-30-e.offsetTop,oh+m.clientY-sy))+'px';
};
h.onpointerup=()=>{h.onpointermove=null};
};
});
w.inst=a.build($('.wb',e),w)||{};
if(A.w<600)this.toggleMax(w);
this.focus(w);
return w;
},
focus(w){
this.z++;w.el.style.zIndex=this.z;
this.wins.forEach(x=>x.el.classList.toggle('act',x===w));
this.active=w;Tasks.refresh();
},
blur(){this.wins.forEach(x=>x.el.classList.remove('act'));this.active=null;Tasks.refresh()},
minimize(w){
w.min=true;w.el.classList.add('minimizing');
setTimeout(()=>{if(w.min)w.el.style.display='none';w.el.classList.remove('minimizing')},180);
if(this.active===w){const t=this.top();if(t)this.focus(t);else this.blur()}
Tasks.refresh();
},
restore(w){
w.min=false;w.el.style.display='';w.el.classList.add('restoring');
setTimeout(()=>w.el.classList.remove('restoring'),200);
this.focus(w);
},
toggleMax(w){
w.max=!w.max;
w.el.classList.toggle('max',w.max);
$('.mx',w.el).innerHTML=w.max?BTN.rs:BTN.mx;
},
close(w){
if(w.inst.destroy)w.inst.destroy();
w.el.remove();this.wins.delete(w.id);Tasks.remove(w);
if(this.active===w){this.active=null;const t=this.top();if(t)this.focus(t)}
Tasks.refresh();
}
};
document.addEventListener('keydown',e=>{
const w=WM.active;
if(!w||w.min)return;
if(e.altKey&&e.key.toLowerCase()==='q'){e.preventDefault();WM.close(w);return}
if(e.altKey&&e.key.toLowerCase()==='m'){e.preventDefault();WM.minimize(w);return}
if(e.ctrlKey||e.altKey||e.metaKey)return;
if(/INPUT|TEXTAREA/.test(document.activeElement.tagName))return;
if(w.inst.key)w.inst.key(e);
});
window.addEventListener('resize',()=>{
WM.wins.forEach(w=>{
if(w.max)return;
const e=w.el;
e.style.left=Math.max(80-e.offsetWidth,Math.min(innerWidth-80,e.offsetLeft))+'px';
e.style.top=Math.max(0,Math.min(innerHeight-60,e.offsetTop))+'px';
});
});
