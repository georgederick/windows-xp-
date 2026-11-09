APPS.calc={title:'Calculadora',icon:'calc',w:270,h:340,mw:240,mh:300,build(b){
b.innerHTML='<div class="calc"><div class="cd">0</div><div class="r1"></div><div class="g5"></div></div>';
const D=$('.cd',b);
let cur='0',acc=0,op=null,fresh=true,err=false;
const str=n=>String(parseFloat(n.toPrecision(12)));
const show=()=>{D.textContent=err||cur.replace('.',',')};
const reset=()=>{cur='0';acc=0;op=null;fresh=true;err=false};
const calc=(a,o,c)=>o==='+'?a+c:o==='-'?a-c:o==='*'?a*c:c===0?null:a/c;
const zero='Não é possível dividir por zero';
const act=k=>{
if(err&&k!=='C'&&k!=='CE')reset();
if(/^\d$/.test(k)){
if(fresh||cur==='0'){cur=k;fresh=false}
else if(cur.replace(/\D/g,'').length<16)cur+=k;
}else if(k===','){
if(fresh){cur='0.';fresh=false}else if(!cur.includes('.'))cur+='.';
}else if('+-*/'.includes(k)){
if(op&&!fresh){const r=calc(acc,op,+cur);if(r===null){err=zero;op=null;show();return}acc=r;cur=str(r)}
else acc=+cur;
op=k;fresh=true;
}else if(k==='='){
if(op){const r=calc(acc,op,+cur);if(r===null){err=zero;op=null;show();return}cur=str(r);op=null;fresh=true}
}else if(k==='%'){
cur=op?str(acc*+cur/100):'0';fresh=false;
}else if(k==='√'){
if(+cur<0){err='Entrada inválida';op=null}else{cur=str(Math.sqrt(+cur));fresh=true}
}else if(k==='1/x'){
if(+cur===0)err=zero;else{cur=str(1/+cur);fresh=true}
}else if(k==='±'){
if(cur!=='0')cur=cur[0]==='-'?cur.slice(1):'-'+cur;
}else if(k==='←'){
if(!fresh)cur=cur.length>1&&!(cur.length===2&&cur[0]==='-')?cur.slice(0,-1):'0';
}else if(k==='CE'){
cur='0';err=false;fresh=true;
}else if(k==='C')reset();
show();
};
const mk=(p,k,c)=>{
const x=el('button',c,k);
x.onmousedown=e=>e.preventDefault();
x.onclick=()=>act(k);
$(p,b).append(x);
};
['←','CE','C'].forEach(k=>mk('.r1',k,'o'));
[['7','n'],['8','n'],['9','n'],['/','o'],['√','o'],['4','n'],['5','n'],['6','n'],['*','o'],['%','o'],['1','n'],['2','n'],['3','n'],['-','o'],['1/x','o'],['0','n'],['±','n'],[',','n'],['+','o'],['=','o']].forEach(([k,c])=>mk('.g5',k,c));
return{key(e){
const k=e.key;let m=null;
if(/^\d$/.test(k))m=k;
else if(k==='.'||k===',')m=',';
else if('+-*/'.includes(k))m=k;
else if(k==='Enter'||k==='=')m='=';
else if(k==='Backspace')m='←';
else if(k==='Escape')m='C';
else if(k==='Delete')m='CE';
else if(k==='%')m='%';
else if(k==='@')m='√';
else if(k==='r'||k==='R')m='1/x';
else if(k==='F9')m='±';
if(m){e.preventDefault();act(m)}
}};
}};
