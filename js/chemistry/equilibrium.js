(() => {
'use strict';const $=id=>document.getElementById(id),c=$('equilibriumCanvas'),L=Lab;let particles=[],paused=false,amount=0,total=0,forward=0,reverse=0,history=[],sample=0,disturb=0,example=null;
L.note('Free exploration uses an endothermic A ⇌ B model. Selected examples set their thermal direction and particle colors. Reactant → product is forward; product → reactant is reverse. Curves show both rates. Particle counts visualize continuous model concentrations; equilibrium means equal rates, not equal amounts.');
function build(){total=+$('reactants').value+ +$('products').value;amount=+$('products').value;particles=Array.from({length:total},(_,i)=>({type:i<amount?'P':'R',x:25+Math.random()*Math.max(1,c.clientWidth-50),y:65+Math.random()*Math.max(1,c.clientHeight-205),a:Math.random()*7,flash:0}));history=[];sample=0;disturb=0;draw();}
function rates(){if(!example)return{f:(total-amount)*.025*(+$('temperature').value/40),b:amount*.04};const thermal=Math.exp((+$('temperature').value-40)/80),sign=example.heat==='exothermic'?-1:1;return{f:(total-amount)*.025*thermal**(1+sign*.5),b:amount*.04*thermal**(1-sign*.5)};}
function draw(){const x=L.fit(c);if(!x)return;const w=c.clientWidth,h=c.clientHeight,r=rates();forward=r.f;reverse=r.b;L.scene(x,w,h,'DYNAMIC EQUILIBRIUM / A ⇌ B');
if(disturb>0){x.fillStyle='rgba(251,191,36,'+disturb*.1+')';x.fillRect(0,40,w,h-150);}
particles.forEach(p=>{L.ball(x,p.x,p.y,8,p.type==='R'?(example?.colors?.[0]||'#60a5fa'):(example?.colors?.[1]||'#34d399'),p.flash>0);if(p.flash>0){x.save();x.globalAlpha=p.flash;x.strokeStyle=p.type==='P'?'#34d399':'#60a5fa';x.beginPath();x.arc(p.x,p.y,12+(1-p.flash)*20,0,7);x.stroke();x.restore();}});
L.label(x,'Forward → '+forward.toFixed(2),18,49,'#60a5fa');L.label(x,'← Reverse '+reverse.toFixed(2),w/2,49,'#34d399');
const top=h-100;L.line(x,18,top,w-18,top,'#ffffff33');L.label(x,'REACTION RATES / RECENT HISTORY',18,top+19);
const max=Math.max(1,...history.flat());for(let k=0;k<2;k++){x.beginPath();history.forEach((v,i)=>{const px=18+i/179*(w-36),py=h-15-v[k]/max*55;i?x.lineTo(px,py):x.moveTo(px,py);});x.strokeStyle=k?'#34d399':'#60a5fa';x.lineWidth=2;x.stroke();}
$('forwardOut').textContent=forward.toFixed(2);$('reverseOut').textContent=reverse.toFixed(2);$('statusOut').textContent=Math.abs(forward-reverse)<.02?'At equilibrium':'Shifting';$('ratioOut').textContent=(amount/Math.max(total-amount,.001)).toFixed(2);
}
L.animate(dt=>{if(paused)return;const r=rates();amount=Math.max(0,Math.min(total,amount+(r.f-r.b)*dt));let desired=Math.round(amount),current=particles.filter(p=>p.type==='P').length;
// Paired exchanges continue even when the macroscopic amounts stop changing.
if(Math.random()<Math.min(r.f,r.b)*dt){const a=particles.find(p=>p.type==='P'),b=particles.find(p=>p.type==='R');if(a&&b){a.type='R';b.type='P';a.flash=b.flash=1;}}
if(current!==desired){const p=particles.find(p=>p.type===(current<desired?'R':'P'));if(p){p.type=current<desired?'P':'R';p.flash=1;}}
particles.forEach(p=>{p.x+=Math.cos(p.a)*dt*16;p.y+=Math.sin(p.a)*dt*16;if(p.x<20||p.x>c.clientWidth-20){p.a=Math.PI-p.a;p.x=Math.max(20,Math.min(c.clientWidth-20,p.x));}if(p.y<65||p.y>c.clientHeight-115){p.a=-p.a;p.y=Math.max(65,Math.min(c.clientHeight-115,p.y));}p.flash=Math.max(0,p.flash-dt);});
disturb=Math.max(0,disturb-dt);sample+=dt;if(sample>.3){sample=0;history.push([r.f,r.b]);if(history.length>180)history.shift();}draw();});
document.querySelectorAll('.control-panel input').forEach(e=>e.oninput=()=>{const o=$(e.id+'Value');if(o)o.value=e.value+(e.dataset.unit||'');if(e.id==='temperature'){disturb=1;draw();}else build();});
document.querySelectorAll('.disturbance').forEach(b=>b.onclick=()=>{if(total>=120)return;const product=b.dataset.disturb==='product';total+=5;if(product)amount+=5;for(let i=0;i<5;i++)particles.push({type:product?'P':'R',x:c.clientWidth/2+(i-2)*22,y:95,a:Math.random()*7,flash:1});disturb=1;draw();});
$('pause').onclick=()=>{paused=!paused;$('pause').textContent=paused?'Resume':'Pause';};$('reset').onclick=()=>{paused=false;$('pause').textContent='Pause';build();};
$('checkChallenge').onclick=()=>{const ok=Math.abs(forward-reverse)<.02,f=$('challengeFeedback');f.textContent=ok?'Dynamic equilibrium reached.':'The rates are still different—observe the shift.';f.className='challenge__feedback '+(ok?'is-success':'is-error');};
ChemistryExamples.mount('equilibrium',sample=>{
 example=sample;const settings=sample?sample.settings:[12,6,40];
 ['reactants','products','temperature'].forEach((id,i)=>{const e=$(id);e.value=settings[i];$(id+'Value').value=e.value+(e.dataset.unit||'');});
 $('challengeFeedback').textContent='';build();
});
new ResizeObserver(()=>{particles.forEach(p=>{p.x=Math.min(c.clientWidth-20,p.x);p.y=Math.min(c.clientHeight-115,p.y);});draw();}).observe(c);build();
})();
