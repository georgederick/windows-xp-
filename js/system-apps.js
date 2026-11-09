const emptyFolder=(t,i,m)=>({title:t,icon:i,w:420,h:300,mw:260,mh:180,build(b){b.innerHTML=`<div class="empty">${m}</div>`}});
APPS.bin=emptyFolder('Lixeira','bin','A Lixeira está vazia.');
APPS.docs=emptyFolder('Meus Documentos','folder','Esta pasta está vazia.');
APPS.pc={title:'Meu Computador',icon:'pc',w:480,h:320,mw:260,mh:180,build(b){
b.innerHTML='<div class="fl"></div>';
const box=$('.fl',b);
[['Disco Local (C:)','pc',()=>UI.dialog({title:'Meu Computador',app:'pc',icon:'err',msg:'C:\\ não está acessível. O acesso foi negado.'})],['Unidade de DVD (D:)','folder',()=>UI.dialog({title:'Meu Computador',app:'pc',icon:'warn',msg:'Insira um disco na unidade D:.'})],['Meus Documentos','folder',()=>WM.open('docs')],['Painel de Controle','cp',()=>WM.open('cp')]].forEach(([n,i,f])=>{
const e=el('div','fi',`${ICONS[i]}<span>${n}</span>`);
e.onclick=()=>{box.querySelectorAll('.fi').forEach(x=>x.classList.toggle('sel',x===e))};
e.ondblclick=f;
box.append(e);
});
}};
APPS.cp={title:'Painel de Controle',icon:'cp',w:380,h:270,mw:280,mh:220,build(b){
b.innerHTML='<div class="pad"><fieldset><legend>Sons</legend><label><input type="checkbox" class="sn"> Ativar sons do sistema</label></fieldset><fieldset><legend>Área de trabalho</legend><button class="ra">Reorganizar ícones</button></fieldset></div>';
const c=$('.sn',b);
c.checked=Snd.on;
c.onchange=()=>Snd.set(c.checked);
$('.ra',b).onclick=()=>Desktop.arrange();
}};
APPS.help={title:'Ajuda e Suporte',icon:'help',w:440,h:380,mw:280,mh:220,build(b){
b.innerHTML='<div class="doc"><b>Windows XP Web Desktop</b><br>Criado por Georgederick<br><br><b>Atalhos</b><br>Alt+Q: fechar a janela ativa<br>Alt+M: minimizar a janela ativa<br>Esc: fechar menus<br>Calculadora: números, + - * /, Enter, Backspace, Delete, Esc, % , @ (raiz), R (1/x), F9 (±)<br>Snake: setas ou W A S D, Espaço pausa, Enter inicia<br><br><b>Dicas</b><br>Duplo clique abre os ícones. Arraste ícones e janelas. Clique com o botão direito na área de trabalho para ver o menu. O ícone de som na barra de tarefas liga e desliga os sons.</div>';
}};
APPS.search={title:'Resultados da Pesquisa',icon:'search',w:380,h:340,mw:260,mh:220,build(b){
b.innerHTML='<div class="pad" style="height:100%"><label>Nome do programa: <input type="text" class="q"></label><div class="sres"></div></div>';
const q=$('.q',b),r=$('.sres',b);
const all=[['Jogo da Velha','ttt'],['Calculadora','calc'],['Snake','snake'],['Adivinhe o Número','guess'],['Meu Computador','pc'],['Meus Documentos','docs'],['Lixeira','bin'],['Painel de Controle','cp'],['Ajuda e Suporte','help']];
const ic={docs:'folder'};
const list=()=>{
r.innerHTML='';
const t=q.value.trim().toLowerCase();
const f=all.filter(a=>a[0].toLowerCase().includes(t));
if(!f.length){r.innerHTML='<div class="empty">Nenhum resultado encontrado.</div>';return}
f.forEach(([n,id])=>{const i=el('div','si',`${ICONS[ic[id]||id]}<span>${n}</span>`);i.ondblclick=()=>WM.open(id);i.onclick=()=>WM.open(id);r.append(i)});
};
q.oninput=list;list();q.focus();
}};
