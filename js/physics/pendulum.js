(() => {
'use strict';const $=id=>document.getElementById(id),c=$('pendulumCanvas'),L=Lab;let running=false,t=0,trail=[],target=1.5+Math.random()*1.8;
const v=id=>+$(id).value,period=()=>2*Math.PI*Math.sqrt(v('length')/v('gravity'));
L.note('Gold: potential energy · Blue: kinetic energy · Faded trail: previous positions. Damping transfers mechanical energy to the surroundings. Small-angle model; energies normalized to the initial displacement.');
function draw(){const x=L.fit(c);if(!x)return;const w=c.clientWidth,h=c.clientHeight,omega=Math.sqrt(v('gravity')/v('length')),a0=v('startAngle')*Math.PI/180,amp=a0*Math.exp(-v('damping')*t),a=amp*Math.cos(omega*t),len=Math.min(h*.62,120+v('length')*70),ox=w/2,oy=62,bx=ox+Math.sin(a)*len,by=oy+Math.cos(a)*len;
L.scene(x,w,h,'OSCILLATION / ENERGY TRANSFER');
x.save();x.fillStyle='#0006';x.beginPath();x.ellipse(bx,h-68,25,6,0,0,7);x.fill();x.restore();
L.line(x,ox-45,oy-15,ox+45,oy-15,'#64748b',12);L.ball(x,ox,oy,8,'#cbd5e1');
x.save();x.setLineDash([4,5]);L.line(x,ox,oy,ox,oy+len,'#ffffff40');x.restore();
for(let i=1;i<trail.length;i++)L.line(x,trail[i-1][0],trail[i-1][1],trail[i][0],trail[i][1],'rgba(96,165,250,'+(i/trail.length*.4)+')',4);
x.save();x.strokeStyle='#fbbf24';x.lineWidth=2;x.beginPath();x.arc(ox,oy,50,Math.PI/2-a,Math.PI/2,a<0);x.stroke();x.restore();
L.line(x,ox,oy,bx,by,'#cbd5e1',3);L.ball(x,bx,by,20,'#60a5fa',true);L.label(x,(a*180/Math.PI).toFixed(1)+'°',ox+15,oy+75,'#fbbf24');
const total=Math.exp(-2*v('damping')*t),pe=total*Math.cos(omega*t)**2,ke=total*Math.sin(omega*t)**2;
L.meter(x,'Potential',pe,18,h-32,(w-60)/2,'#fbbf24');L.meter(x,'Kinetic',ke,w/2+12,h-32,(w-60)/2,'#60a5fa');
$('periodOut').textContent=period().toFixed(2)+' s';$('frequencyOut').textContent=(1/period()).toFixed(2)+' Hz';$('angleOut').textContent=(a*180/Math.PI).toFixed(1)+'°';$('elapsedOut').textContent=t.toFixed(1)+' s';
if(running){trail.push([bx,by]);if(trail.length>70)trail.shift();}}
document.querySelectorAll('input[type=range]').forEach(e=>e.oninput=()=>{$(e.id+'Value').value=e.value+(e.dataset.unit||'');t=0;trail=[];draw();});
$('start').onclick=()=>running=true;$('pause').onclick=()=>running=false;$('reset').onclick=()=>{running=false;t=0;trail=[];draw();};
$('targetPeriod').textContent='Target: '+target.toFixed(2)+' s';$('checkChallenge').onclick=()=>{const ok=Math.abs(period()-target)<=.05,f=$('challengeFeedback');f.textContent=ok?'Excellent—target period achieved.':'Current period is '+period().toFixed(2)+' s. Keep adjusting length.';f.className='challenge__feedback '+(ok?'is-success':'is-error');};
L.animate(dt=>{if(running){t+=dt;draw();}});new ResizeObserver(()=>{trail=[];draw();}).observe(c);draw();
})();
