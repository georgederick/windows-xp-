const Desktop={
list:[['ttt','Jogo da Velha'],['calc','Calculadora'],['snake','Snake'],['guess','Adivinhe o Número'],['pc','Meu Computador'],['bin','Lixeira']],
els:[],cm:null,
grid(i){
const rows=Math.max(1,Math.floor((innerHeight-40)/90));
return{x:8+Math.floor(i/rows)*86,y:8+(i%rows)*90};
},
init(){
const box=$('#icons'),saved=store.get('icons',{});
this.list.forEach(([id,name],i)=>{
const e=el('div','ic',`${ICONS[id]}<span>${name}</span>`);
const p=saved[id]||this.grid(i);
e.dataset.id=id;e.dataset.name=name;
e.style.left=p.x+'px';e.style.top=p.y+'px';
e.onpointerdown=ev=>{
if(ev.button)return;
ev.stopPropagation();this.select(e);WM.blur();
const sx=ev.clientX,sy=ev.clientY,ox=e.offsetLeft,oy=e.offsetTop;
let mv=false;
e.setPointerCapture(ev.pointerId);
e.onpointermove=m=>{
const dx=m.clientX-sx,dy=m.clientY-sy;
if(!mv&&Math.hypot(dx,dy)<5)return;
mv=true;
e.style.left=Math.max(0,Math.min(innerWidth-78,ox+dx))+'px';
e.style.top=Math.max(0,Math.min(innerHeight-30-84,oy+dy))+'px';
};
e.onpointerup=u=>{
e.onpointermove=e.onpointerup=null;
if(mv)this.save();
else if(u.pointerType==='touch')WM.open(id);
};
};
e.ondblclick=()=>WM.open(id);
box.append(e);this.els.push(e);
});
$('#app').addEventListener('pointerdown',e=>{if(!e.target.closest('.win,#taskbar,#start,.ic,.ctx')){this.select(null);WM.blur()}});
$('#app').addEventListener('contextmenu',e=>{
e.preventDefault();
if(e.target.closest('.win,#taskbar,#start'))return;
const ic=e.target.closest('.ic');
if(ic){this.select(ic);this.menu(e.clientX,e.clientY,[['Abrir',()=>WM.open(ic.dataset.id)]])}
else this.menu(e.clientX,e.clientY,[['Atualizar',()=>this.refresh()],['Organizar ícones',()=>this.arrange()],'-',['Propriedades',()=>this.props()]]);
});
const clk=()=>{const d=new Date();$('#clk').textContent=d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});$('#clk').title=d.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})};
clk();setInterval(clk,1000);
$('#spk').onclick=()=>Snd.set(!Snd.on);
Snd.set(Snd.on);
window.addEventListener('resize',()=>this.els.forEach(e=>{
e.style.left=Math.max(0,Math.min(innerWidth-78,e.offsetLeft))+'px';
e.style.top=Math.max(0,Math.min(innerHeight-114,e.offsetTop))+'px';
}));
},
select(e){this.els.forEach(x=>x.classList.toggle('sel',x===e))},
save(){const o={};this.els.forEach(e=>o[e.dataset.id]={x:e.offsetLeft,y:e.offsetTop});store.set('icons',o)},
arrange(){
[...this.els].sort((a,b)=>a.dataset.name.localeCompare(b.dataset.name)).forEach((e,i)=>{const p=this.grid(i);e.style.left=p.x+'px';e.style.top=p.y+'px'});
this.save();
},
refresh(){
this.els.forEach(e=>e.style.opacity=0);
setTimeout(()=>this.els.forEach(e=>e.style.opacity=''),150);
},
props(){
UI.dialog({title:'Propriedades de Vídeo',app:'cp',icon:'info',msg:`<img src="assets/logo.png" alt=""><b>Windows XP Web Desktop</b><br>Resolução: ${innerWidth} x ${innerHeight}<br>Criado por Georgederick`});
},
menu(x,y,items){
this.closeMenu();
const m=el('div','ctx');
items.forEach(i=>{
if(i==='-'){m.append(el('hr'));return}
const d=el('div','ci',i[0]);
d.onclick=()=>{this.closeMenu();i[1]()};
m.append(d);
});
document.body.append(m);
m.style.left=Math.max(0,Math.min(x,innerWidth-m.offsetWidth))+'px';
m.style.top=Math.max(0,Math.min(y,innerHeight-m.offsetHeight-30))+'px';
this.cm=m;
},
closeMenu(){if(this.cm)this.cm.remove();this.cm=null},
notify(t,msg){
const n=el('div','balloon',`<b>${t}</b><p>${msg}</p>`);
n.onclick=()=>n.remove();
$('#app').append(n);Snd.play('ding');
setTimeout(()=>n.remove(),7000);
},
reveal(){
this.els.forEach((e,i)=>e.style.transitionDelay=(i*.15)+'s');
$('#app').classList.remove('pre');
setTimeout(()=>this.els.forEach(e=>e.style.transitionDelay=''),1500);
setTimeout(()=>this.notify('Windows XP','Bem-vindo! Criado por Georgederick. Dê um duplo clique em um ícone para começar.'),1800);
}
};
