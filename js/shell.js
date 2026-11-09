const Tasks={
box:null,btns:new Map(),
add(w){
const b=el('button','tk',`${ICONS[w.app.icon]}<b>${w.app.title}</b>`);
b.onclick=()=>{if(w.min)WM.restore(w);else if(WM.active===w)WM.minimize(w);else WM.focus(w)};
this.box.append(b);this.btns.set(w.id,b);
},
remove(w){const b=this.btns.get(w.id);if(b)b.remove();this.btns.delete(w.id)},
refresh(){this.btns.forEach((b,id)=>b.classList.toggle('on',WM.active===WM.wins.get(id)&&!WM.wins.get(id).min))}
};
const Sys={
open(id){WM.open(id)},
run(){
UI.dialog({title:'Executar',app:'run',icon:'info',msg:'Digite o nome de um programa para abri-lo (velha, calculadora, snake, adivinhe, pc, lixeira).',input:true,buttons:[['OK',v=>{
const t=v.trim().toLowerCase();
const m={velha:'ttt',ttt:'ttt',calc:'calc',calculadora:'calc',snake:'snake',cobra:'snake',adivinhe:'guess',guess:'guess',pc:'pc',computador:'pc',lixeira:'bin',documentos:'docs',painel:'cp',ajuda:'help',pesquisar:'search'};
if(m[t])WM.open(m[t]);
else UI.dialog({title:'Executar',app:'run',icon:'err',msg:`Não foi possível encontrar '${v.replace(/</g,'&lt;')}'. Verifique se o nome está correto e tente novamente.`});
}],['Cancelar']]});
},
shutdown(){
UI.dialog({title:'Desligar o computador',app:'run',icon:'q',msg:'O que você deseja que o computador faça?',buttons:[['Desligar',()=>Sys.off()],['Reiniciar',()=>location.reload()],['Cancelar']]});
},
off(){
Snd.play('stop');
const s=el('div','shut','<img src="assets/logo.png" alt=""><p>Desligando...</p><small>Criado por Georgederick</small>');
$('#app').append(s);
setTimeout(()=>{
s.classList.add('black');
s.innerHTML='<p>Agora é seguro desligar o computador.</p><button>Ligar</button>';
$('button',s).onclick=()=>location.reload();
},3500);
}
};
const Start={
hide(){$('#start').classList.remove('open');$('#startbtn').classList.remove('on')},
init(){
const m=$('#start'),btn=$('#startbtn');
const L=[['ttt','Jogo da Velha','ttt'],['calc','Calculadora','calc'],['snake','Snake','snake'],['guess','Adivinhe o Número','guess'],['search','Pesquisar','search']];
const R=[['docs','Meus Documentos','folder'],['pc','Meu Computador','pc'],['cp','Painel de Controle','cp'],['help','Ajuda e Suporte','help'],['run','Executar...','run']];
const it=a=>`<div class="si" data-id="${a[0]}">${ICONS[a[2]]}<span>${a[1]}</span></div>`;
m.innerHTML=`<div class="sh"><div class="av">${AVATAR}</div><b>Usuário</b></div><div class="sb"><div class="sl">${L.map(it).join('')}</div><div class="sr">${R.map(it).join('')}</div></div><div class="sf"><div class="si off">${ICONS.off}<span>Desligar o computador</span></div></div>`;
m.onclick=e=>{
const i=e.target.closest('.si');if(!i)return;
this.hide();
if(i.classList.contains('off'))Sys.shutdown();
else if(i.dataset.id==='run')Sys.run();
else WM.open(i.dataset.id);
};
btn.onclick=()=>{const o=m.classList.toggle('open');btn.classList.toggle('on',o)};
document.addEventListener('pointerdown',e=>{
if(!e.target.closest('#start,#startbtn'))this.hide();
if(!e.target.closest('.ctx'))Desktop.closeMenu();
},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){this.hide();Desktop.closeMenu()}});
}
};
const Shell={init(){Tasks.box=$('#tasks');Start.init()}};
