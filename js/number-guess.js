APPS.guess={title:'Adivinhe o Número',icon:'guess',w:360,h:450,mw:300,mh:380,build(b){
b.innerHTML='<div class="gs"><div class="row"><label>Dificuldade: <select class="lv"><option value="50">Fácil (1–50)</option><option value="100">Normal (1–100)</option><option value="500">Difícil (1–500)</option><option value="1000">Insano (1–1000)</option></select></label></div><div class="gm"></div><div class="row"><input type="text" class="in" inputmode="numeric" maxlength="4"><button class="ok">Confirmar</button></div><div class="tt2">Tentativas: 0</div><div class="hist"></div><button class="nw">Novo jogo</button></div>';
const lv=$('.lv',b),gm=$('.gm',b),inp=$('.in',b),hist=$('.hist',b),tt=$('.tt2',b),ok=$('.ok',b);
let max,secret,tries,done;
lv.value=store.get('guess_lv','100');
const fresh=()=>{
max=+lv.value;secret=1+Math.floor(Math.random()*max);tries=0;done=false;
hist.innerHTML='';tt.textContent='Tentativas: 0';
gm.textContent=`Estou pensando em um número de 1 a ${max}.`;
inp.value='';inp.disabled=ok.disabled=false;inp.focus();
};
const go=()=>{
if(done)return;
const g=Number(inp.value.trim());
if(!inp.value.trim()||!Number.isInteger(g)||g<1||g>max){
UI.dialog({title:'Adivinhe o Número',app:'guess',icon:'err',msg:`Digite um número inteiro entre 1 e ${max}.`,buttons:[['OK',()=>inp.focus()]]});
return;
}
tries++;tt.textContent='Tentativas: '+tries;
let t;
if(g>secret)t=`${g} é maior que o número secreto.`;
else if(g<secret)t=`${g} é menor que o número secreto.`;
else{t=`Acertou! O número era ${secret}, em ${tries} tentativa(s).`;done=true;inp.disabled=ok.disabled=true;Snd.play('ding')}
gm.textContent=t;
hist.append(el('div','',`#${tries}: ${g} → ${g>secret?'maior':g<secret?'menor':'acertou'}`));
hist.scrollTop=hist.scrollHeight;
inp.value='';if(!done)inp.focus();
};
ok.onclick=go;
inp.onkeydown=e=>{if(e.key==='Enter')go()};
$('.nw',b).onclick=fresh;
lv.onchange=()=>{store.set('guess_lv',lv.value);lv.blur();fresh()};
fresh();
return{};
}};
