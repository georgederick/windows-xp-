(function(){
const boot=$('#boot'),st=['b0','b1','b2','b3'].map(i=>$('#'+i));
const tm=[];
let done=false;
const show=n=>st.forEach((s,i)=>s.classList.toggle('on',i===n));
const at=(f,t)=>tm.push(setTimeout(f,t));
const finish=()=>{
if(done)return;
done=true;tm.forEach(clearTimeout);
boot.classList.add('out');
setTimeout(()=>boot.remove(),800);
Desktop.reveal();
};
const lines=['Georgederick BIOS v1.0','Copyright (C) Georgederick','','Criado por Georgederick','','Testando memória... 640K OK','Detectando unidades IDE... OK','Iniciando Windows XP Web Desktop...'];
const run=()=>{
show(1);
const pre=$('#bios');
lines.forEach((l,i)=>at(()=>{pre.textContent+=l+'\n'},i*380));
at(()=>{show(2);Snd.play('start')},3400);
at(()=>show(3),7200);
at(finish,9200);
};
$('#pwr').onclick=run;
$('#skip').onclick=finish;
Desktop.init();
Shell.init();
})();
