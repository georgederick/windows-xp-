APPS.snake={title:'Snake',icon:'snake',w:440,h:520,mw:290,mh:340,build(b){
b.innerHTML='<div class="snk"><div class="bar"><button class="s">Iniciar</button><button class="p">Pausar</button><button class="r">Reiniciar</button><select class="v"><option value="160">Lenta</option><option value="105">Normal</option><option value="60">Rápida</option></select></div><div class="info"><span class="sc">Pontos: 0</span><span class="hs"></span></div><div class="cv"><canvas></canvas></div></div>';
const N=20,cv=$('canvas',b),cx=cv.getContext('2d'),box=$('.cv',b),v=$('.v',b),sc=$('.sc',b),hs=$('.hs',b);
let sn,dir,nd,food,score,st='idle',tm=null,hi=store.get('snake_hi',0);
v.value=store.get('snake_v','105');
const cell=()=>Math.max(8,Math.floor(Math.min(box.clientWidth,box.clientHeight)/N));
const rnd=()=>{let p;do{p=[Math.floor(Math.random()*N),Math.floor(Math.random()*N)]}while(sn.some(s=>s[0]===p[0]&&s[1]===p[1]));return p};
const showHi=()=>{hs.textContent='Recorde: '+hi};
const reset=()=>{sn=[[10,10],[9,10],[8,10]];dir=nd=[1,0];food=rnd();score=0;sc.textContent='Pontos: 0'};
const draw=()=>{
const c=cell(),W=c*N;
cv.width=cv.height=W;
for(let y=0;y<N;y++)for(let x=0;x<N;x++){cx.fillStyle=(x+y)%2?'#b5d98a':'#c3e49a';cx.fillRect(x*c,y*c,c,c)}
cx.fillStyle='#d11';cx.beginPath();cx.arc(food[0]*c+c/2,food[1]*c+c/2,c*.38,0,7);cx.fill();
sn.forEach((s,i)=>{cx.fillStyle=i?'#2e7d1b':'#1b5210';cx.fillRect(s[0]*c+1,s[1]*c+1,c-2,c-2)});
const msg={idle:'Pressione Iniciar',pause:'Pausado',over:'Game Over'}[st];
if(msg){
cx.fillStyle='rgba(0,0,0,.6)';cx.fillRect(0,W/2-c*1.6,W,c*3.2);
cx.fillStyle='#fff';cx.font=`bold ${Math.round(c*1.1)}px Tahoma,Verdana,sans-serif`;cx.textAlign='center';cx.textBaseline='middle';
cx.fillText(msg,W/2,W/2);
}
};
const stop=()=>{clearInterval(tm);tm=null};
const over=()=>{
st='over';stop();
if(score>hi){hi=score;store.set('snake_hi',hi);showHi()}
Snd.play('beep');draw();
};
const step=()=>{
dir=nd;
const h=[sn[0][0]+dir[0],sn[0][1]+dir[1]];
if(h[0]<0||h[1]<0||h[0]>=N||h[1]>=N||sn.some(s=>s[0]===h[0]&&s[1]===h[1]))return over();
sn.unshift(h);
if(h[0]===food[0]&&h[1]===food[1]){score+=10;sc.textContent='Pontos: '+score;food=rnd()}
else sn.pop();
draw();
};
const run=()=>{stop();tm=setInterval(step,+v.value)};
const start=()=>{
if(st==='run')return;
if(st==='over')reset();
st='run';run();draw();
};
const pause=()=>{
if(st==='run'){st='pause';stop();draw()}
else if(st==='pause'){st='run';run();draw()}
};
const restart=()=>{reset();st='run';run();draw()};
$('.s',b).onclick=start;
$('.p',b).onclick=pause;
$('.r',b).onclick=restart;
v.onchange=()=>{store.set('snake_v',v.value);v.blur();if(st==='run')run()};
const ro=new ResizeObserver(draw);
ro.observe(box);
reset();showHi();draw();
return{
key(e){
const M={arrowup:[0,-1],w:[0,-1],arrowdown:[0,1],s:[0,1],arrowleft:[-1,0],a:[-1,0],arrowright:[1,0],d:[1,0]}[e.key.toLowerCase()];
if(M){
e.preventDefault();
if(M[0]+dir[0]||M[1]+dir[1])nd=M;
if(st==='idle')start();
}else if(e.key===' '){e.preventDefault();pause()}
else if(e.key==='Enter')start();
},
destroy(){stop();ro.disconnect()}
};
}};
