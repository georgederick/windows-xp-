APPS.ttt={title:'Jogo da Velha',icon:'ttt',w:340,h:450,mw:270,mh:380,build(b){
b.innerHTML='<div class="ttt"><div class="row"><select class="m"><option value="cpu">Jogador x Computador</option><option value="pvp">Jogador x Jogador</option></select><select class="d"><option value="0">Fácil</option><option value="1">Médio</option><option value="2">Difícil</option></select></div><div class="st"></div><div class="board"></div><div class="sco"></div><div class="row"><button class="rs">Reiniciar partida</button><button class="zs">Zerar placar</button></div></div>';
const L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const board=$('.board',b),st=$('.st',b),m=$('.m',b),d=$('.d',b),sco=$('.sco',b);
let bd,turn,over,tm,sc=store.get('ttt_sc',{w:0,l:0,d:0});
const cells=[];
m.value=store.get('ttt_m','cpu');d.value=store.get('ttt_d','2');
const cpu=()=>m.value==='cpu';
const score=()=>{sco.textContent=`Vitórias (X): ${sc.w}\nDerrotas (O): ${sc.l}\nEmpates: ${sc.d}`};
const win=x=>{
for(const[a,c,e]of L)if(x[a]&&x[a]===x[c]&&x[a]===x[e])return[x[a],[a,c,e]];
return x.includes('')?null:['D',[]];
};
const mm=(x,p)=>{
const r=win(x);
if(r)return r[0]==='O'?1:r[0]==='X'?-1:0;
let best=p==='O'?-2:2;
for(let i=0;i<9;i++)if(!x[i]){
x[i]=p;const s=mm(x,p==='O'?'X':'O');x[i]='';
best=p==='O'?Math.max(best,s):Math.min(best,s);
}
return best;
};
const reset=()=>{
clearTimeout(tm);bd=Array(9).fill('');turn='X';over=false;
cells.forEach(c=>{c.textContent='';c.className='cell'});
st.textContent=cpu()?'Sua vez (X)':'Vez de X';
};
const end=r=>{
over=true;
if(r[0]==='X'){sc.w++;st.textContent=cpu()?'Você venceu!':'X venceu!'}
else if(r[0]==='O'){sc.l++;st.textContent=cpu()?'O computador venceu!':'O venceu!'}
else{sc.d++;st.textContent='Empate!'}
r[1].forEach(i=>cells[i].classList.add('w'));
store.set('ttt_sc',sc);score();
};
const play=i=>{
bd[i]=turn;cells[i].textContent=turn;cells[i].classList.add(turn);
const r=win(bd);
if(r)return end(r);
turn=turn==='X'?'O':'X';
st.textContent=cpu()?(turn==='X'?'Sua vez (X)':'Computador pensando...'):'Vez de '+turn;
};
const ai=()=>{
if(!b.isConnected||over)return;
const e=bd.map((v,i)=>v?-1:i).filter(i=>i>=0),lv=+d.value;
let pick;
if(lv===0||(lv===1&&Math.random()<.5))pick=e[Math.floor(Math.random()*e.length)];
else{let bs=-2;e.forEach(i=>{bd[i]='O';const s=mm(bd,'X');bd[i]='';if(s>bs){bs=s;pick=i}})}
play(pick);
};
for(let i=0;i<9;i++){
const c=el('div','cell');
c.onclick=()=>{
if(over||bd[i]||(cpu()&&turn==='O'))return;
play(i);
if(!over&&cpu())tm=setTimeout(ai,350);
};
cells.push(c);board.append(c);
}
m.onchange=()=>{store.set('ttt_m',m.value);m.blur();reset()};
d.onchange=()=>{store.set('ttt_d',d.value);d.blur();reset()};
$('.rs',b).onclick=reset;
$('.zs',b).onclick=()=>{sc={w:0,l:0,d:0};store.set('ttt_sc',sc);score();reset()};
score();reset();
return{destroy(){clearTimeout(tm)}};
}};
