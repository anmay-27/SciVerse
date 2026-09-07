(() => {
'use strict';const $=id=>document.getElementById(id),c=$('projectileCanvas'),L=Lab;
let running=false,t=0,target=100,impact=0;const enhanced=L.toggle('enhanced','Enhanced visual mode');
L.note('Blue: horizontal velocity · Green: vertical velocity. Dashed arc predicts the flight. Air resistance uses linear drag (k = 0.08 s⁻¹).');
function point(time){const v=+$('velocity').value,a=+$('angle').value*Math.PI/180,g=+$('gravity').value,u=v*Math.cos(a),b=v*Math.sin(a),k=$('drag').checked?.08:0;if(!k)return{x:u*time,y:b*time-.5*g*time*time,vx:u,vy:b-g*time};const e=Math.exp(-k*time);return{x:u*(1-e)/k,y:(b+g/k)*(1-e)/k-g*time/k,vx:u*e,vy:(b+g/k)*e-g/k};}
function totals(){let lo=.001,hi=150;for(let i=0;i<45;i++){const mid=(lo+hi)/2;if(point(mid).y>0)lo=mid;else hi=mid;}const flight=(lo+hi)/2;let peak=0;for(let i=0;i<=100;i++)peak=Math.max(peak,point(flight*i/100).y);return{flight,range:point(flight).x,max:peak};}
function draw(){const x=L.fit(c);if(!x)return;const w=c.clientWidth,h=c.clientHeight,T=totals(),scale=Math.min((w-65)/Math.max(T.range,target+12),(h-110)/Math.max(1,T.max)),ground=h-45,px=p=>35+p.x*scale,py=p=>ground-p.y*scale;
L.scene(x,w,h,'BALLISTICS / LIVE TRAJECTORY');
if(enhanced.checked){x.fillStyle='#123d3c';x.fillRect(0,ground,w,45);for(let i=-w;i<w*2;i+=70)L.line(x,w/2+(i-w/2)*.7,ground,i,h,'#6ee7b72b');
x.save();x.setLineDash([4,6]);x.strokeStyle='#60a5fa66';x.beginPath();for(let i=0;i<=100;i++){const p=point(T.flight*i/100);i?x.lineTo(px(p),py(p)):x.moveTo(px(p),py(p));}x.stroke();x.restore();}
L.line(x,15,ground,w-10,ground,'#6ee7b7');const tx=35+target*scale;L.line(x,tx,ground,tx,ground-32,'#fbbf24',2);x.fillStyle='#fbbf24';x.fillRect(tx,ground-32,12,9);L.label(x,target.toFixed(0)+' m',Math.min(tx,w-50),ground+25,'#fbbf24');
for(let i=1;i<=80;i++){const a=point(t*(i-1)/80),b=point(t*i/80);L.line(x,px(a),py(a),px(b),py(b),'rgba(96,165,250,'+(.15+i/100)+')',3,enhanced.checked);}
const p=point(t),bx=px(p),by=py(p);L.ball(x,bx,by,9,'#60a5fa',enhanced.checked);
if(enhanced.checked){L.arrow(x,bx,by,bx+p.vx*1.4,by,'#60a5fa');L.arrow(x,bx,by,bx,by-p.vy*1.4,'#34d399');if(impact>0){x.save();x.globalAlpha=impact;x.strokeStyle=Math.abs(p.x-target)<8?'#34d399':'#fbbf24';x.lineWidth=3;x.beginPath();x.ellipse(bx,ground,8+(1-impact)*55,4+(1-impact)*14,0,0,7);x.stroke();x.restore();}}
L.label(x,'vx '+p.vx.toFixed(1)+' m/s · vy '+p.vy.toFixed(1)+' m/s',18,49);
const outputs={time:t.toFixed(2)+' s',distance:p.x.toFixed(1)+' m',height:Math.max(0,p.y).toFixed(1)+' m',maxHeight:T.max.toFixed(1)+' m',range:T.range.toFixed(1)+' m',flight:T.flight.toFixed(2)+' s'};Object.entries(outputs).forEach(([k,v])=>$(k+'Out').textContent=v);
}
function reset(){running=false;t=0;impact=0;$('pause').textContent='Pause';$('challengeFeedback').textContent='';draw();}
document.querySelectorAll('input[type=range]').forEach(e=>e.oninput=()=>{$(e.id+'Value').value=e.value+(e.dataset.unit||'');reset();});$('drag').onchange=reset;enhanced.onchange=draw;
$('launch').onclick=()=>{t=0;impact=0;running=true;$('pause').textContent='Pause';};$('pause').onclick=()=>{if(t>=totals().flight)return;running=!running;$('pause').textContent=running?'Pause':'Resume';};$('reset').onclick=reset;
$('newTarget').onclick=()=>{target=60+Math.random()*160;reset();$('challengeFeedback').textContent='Target set at '+target.toFixed(0)+' m';};
L.animate(dt=>{if(running){const T=totals();t=Math.min(t+dt,T.flight);if(t>=T.flight){running=false;impact=1;const miss=Math.abs(point(t).x-target),f=$('challengeFeedback');f.textContent=miss<8?'Target hit!':'Missed by '+miss.toFixed(1)+' m.';f.className='challenge__feedback '+(miss<8?'is-success':'is-error');}draw();}else if(impact>0){impact=Math.max(0,impact-dt);draw();}});new ResizeObserver(draw).observe(c);draw();
})();
