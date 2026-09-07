(() => {
'use strict';const $=id=>document.getElementById(id),c=$('reactionCanvas'),L=Lab;let ps=[],running=true,hits=0,elapsed=0,flashes=[],initialPairs=1;
const rate=()=>(+$('temperature').value/30)*(+$('concentration').value/5)*(+$('surface').value/5)*($('catalyst').checked?1.8:1);
L.note('Blue A + green B → gold product. Temperature controls particle speed; concentration controls particle count; surface area increases exposed reaction sites; a catalyst increases successful collision probability. Qualitative collision model, not measured kinetics.');
function reset(){hits=elapsed=0;flashes=[];ps=Array.from({length:10+ +$('concentration').value*3},(_,i)=>{const a=Math.random()*Math.PI*2;return{x:22+Math.random()*Math.max(1,c.clientWidth-44),y:65+Math.random()*Math.max(1,c.clientHeight-130),vx:Math.cos(a),vy:Math.sin(a),b:i%2,product:false};});initialPairs=Math.floor(ps.length/2);draw();}
function draw(){const x=L.fit(c);if(!x)return;const w=c.clientWidth,h=c.clientHeight;L.scene(x,w,h,'COLLISION CHAMBER / A + B → PRODUCT');x.strokeStyle='#7dd3fc66';x.lineWidth=2;x.strokeRect(12,45,w-24,h-95);
const sites=+$('surface').value;for(let i=0;i<sites;i++)L.ball(x,22+(w-44)*(i+.5)/sites,h-56,3,'#fbbf24');
ps.forEach(p=>L.ball(x,p.x,p.y,p.product?9:6,p.product?'#fbbf24':p.b?'#34d399':'#60a5fa',p.product));
flashes.forEach(f=>{x.save();x.globalAlpha=f.life;x.strokeStyle='#fbbf24';x.lineWidth=2;x.beginPath();x.arc(f.x,f.y,8+(1-f.life)*25,0,7);x.stroke();x.restore();});
L.meter(x,$('catalyst').checked?'Catalyst active · lower activation barrier':'No catalyst · higher activation barrier',hits/initialPairs,18,h-23,w-36,$('catalyst').checked?'#c084fc':'#60a5fa');
$('collisionsOut').textContent=hits;$('progressOut').textContent=(hits/initialPairs*100).toFixed(0)+'%';$('rateOut').textContent=rate().toFixed(2);$('timeOut').textContent=elapsed.toFixed(1)+' s';}
L.animate(dt=>{if(!running)return;elapsed+=dt;const speed=32*Math.sqrt((+$('temperature').value+273)/303)*Math.max(.4,+$('temperature').value/30);
ps.forEach(p=>{p.x+=p.vx*speed*dt;p.y+=p.vy*speed*dt;if(p.x<20||p.x>c.clientWidth-20){p.vx*=-1;p.x=Math.max(20,Math.min(c.clientWidth-20,p.x));}if(p.y<54||p.y>c.clientHeight-58){p.vy*=-1;p.y=Math.max(54,Math.min(c.clientHeight-58,p.y));}});
for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const p=ps[i],q=ps[j];if(!p.product&&!q.product&&p.b!==q.b&&Math.hypot(p.x-q.x,p.y-q.y)<18&&Math.random()<1-Math.exp(-rate()*dt*4)){p.product=true;p.x=(p.x+q.x)/2;p.y=(p.y+q.y)/2;ps.splice(j,1);hits++;flashes.push({x:p.x,y:p.y,life:1});break;}}
flashes.forEach(f=>f.life-=dt*2);flashes=flashes.filter(f=>f.life>0);draw();});
document.querySelectorAll('.control-panel input').forEach(e=>e.oninput=()=>{const o=$(e.id+'Value');if(o)o.value=e.value+(e.dataset.unit||'');reset();});
$('start').onclick=()=>running=true;$('pause').onclick=()=>running=false;$('reset').onclick=reset;
$('checkChallenge').onclick=()=>{const ok=rate()>5,f=$('challengeFeedback');f.textContent=ok?'High reaction rate achieved.':'Increase at least two rate factors.';f.className='challenge__feedback '+(ok?'is-success':'is-error');};
ChemistryExamples.mount('rates',example=>{
 const settings=example?example.settings:[30,5,5,false];
 ['temperature','concentration','surface'].forEach((id,i)=>{const e=$(id);e.value=settings[i];$(id+'Value').value=e.value+(e.dataset.unit||'');});
 $('catalyst').checked=settings[3];$('challengeFeedback').textContent='';reset();
});
new ResizeObserver(()=>{ps.forEach(p=>{p.x=Math.max(20,Math.min(c.clientWidth-20,p.x));p.y=Math.max(54,Math.min(c.clientHeight-58,p.y));});draw();}).observe(c);reset();
})();
