(() => {
'use strict';const $=id=>document.getElementById(id),c=$('opticsCanvas'),L=Lab;let time=0;
const v=id=>+$(id).value;L.note('Gold: incident light · Blue: reflected light · Green: transmitted light. Dashed extensions locate virtual images. Optical bench distances are scaled to fit the viewport; f = ±90 model units.');
function draw(){const x=L.fit(c);if(!x)return;const w=c.clientWidth,h=c.clientHeight,cx=w/2,cy=h*.52,m=$('mode').value,a=v('incidentAngle')*Math.PI/180,paths=[];
L.scene(x,w,h,'OPTICAL BENCH / RAY TRACING');
function ray(ax,ay,bx,by,color){L.line(x,ax,ay,bx,by,color,2,true);paths.push([ax,ay,bx,by,color]);}
if(m==='reflection'||m==='refraction'){
x.fillStyle='#1e50734d';x.fillRect(0,cy,w,h-cy);L.line(x,0,cy,w,cy,'#b6d7e7',2);x.save();x.setLineDash([5,5]);L.line(x,cx,48,cx,h-28,'#ffffff55');x.restore();
L.label(x,'n₁ = '+v('n1').toFixed(2),18,72);L.label(x,m==='reflection'?'Reflective surface':'n₂ = '+v('n2').toFixed(2),18,h-25);
const len=Math.min(w*.43,h*.38),sx=cx-Math.sin(a)*len,sy=cy-Math.cos(a)*len;
ray(sx,sy,cx,cy,'#fbbf24');const sine=v('n1')/v('n2')*Math.sin(a),tir=m==='refraction'&&sine>1;
if(m==='reflection'||tir){ray(cx,cy,cx+Math.sin(a)*len,cy-Math.cos(a)*len,'#60a5fa');$('refractionOut').textContent=tir?'TIR':'—';if(tir)L.label(x,'Total internal reflection',18,95,'#fbbf24');}
else {const r=Math.asin(sine);ray(cx,cy,cx+Math.sin(r)*len,cy+Math.cos(r)*len,'#34d399');$('refractionOut').textContent=(r*180/Math.PI).toFixed(1)+'°';}
L.label(x,'Normal',cx+8,65);$('imageDistanceOut').textContent='—';
}else {
const convex=m==='convex',f=convex?90:-90,obj=v('objectDistance'),di=Math.abs(obj-f)<.001?Infinity:1/(1/f-1/obj),scale=Math.min((w*.43)/Math.max(obj,Math.min(Math.abs(di),500),100),1.3),ox=cx-obj*scale,oh=48;
L.line(x,10,cy,w-10,cy,'#ffffff44');const g=x.createLinearGradient(cx-20,0,cx+20,0);g.addColorStop(0,'#38bdf822');g.addColorStop(.5,'#bae6fd88');g.addColorStop(1,'#38bdf822');x.fillStyle=g;x.strokeStyle='#7dd3fc';x.beginPath();x.moveTo(cx-10,cy-110);x.quadraticCurveTo(cx+(convex?-32:6),cy,cx-10,cy+110);x.lineTo(cx+10,cy+110);x.quadraticCurveTo(cx+(convex?32:-6),cy,cx+10,cy-110);x.closePath();x.fill();x.stroke();
for(const s of [-1,1]){L.ball(x,cx+s*90*scale,cy,3,'#fbbf24');L.label(x,s<0?'F₁':'F₂',cx+s*90*scale-6,cy+24,'#fbbf24');}
L.arrow(x,ox,cy,ox,cy-oh,'#fbbf24');L.label(x,'Object',Math.max(8,ox-20),cy-oh-14,'#fbbf24');
ray(ox,cy-oh,cx,cy-oh,'#fbbf24');
const endX=w-12,endY=cy-oh+(endX-cx)*oh/(f*scale);
ray(cx,cy-oh,endX,endY,'#34d399');ray(ox,cy-oh,cx,cy,'#60a5fa');ray(cx,cy,endX,cy+(endX-cx)*oh/(obj*scale),'#60a5fa');
if(Number.isFinite(di)){const ix=cx+di*scale,iy=cy+oh*di/obj;
if(ix>8&&ix<w-8&&iy>55&&iy<h-35){L.arrow(x,ix,cy,ix,iy,'#c084fc');L.label(x,di>0?'Real image':'Virtual image',Math.max(8,Math.min(w-90,ix-20)),iy+(di>0?20:-15),'#c084fc');}
else L.label(x,'Image beyond viewport',18,h-24,'#c084fc');
if(di<0){x.save();x.setLineDash([5,6]);L.line(x,cx,cy-oh,ix,iy,'#34d39988');L.line(x,cx,cy,ix,iy,'#60a5fa88');x.restore();}}
else L.label(x,'Object at focus → parallel emerging rays',18,h-24,'#fbbf24');
$('imageDistanceOut').textContent=Number.isFinite(di)?di.toFixed(1)+' units':'∞';$('refractionOut').textContent='—';
}
if(!L.reduced.matches)paths.forEach(([a,b,d,e,color],i)=>{const p=(time*.45+i*.2)%1;L.ball(x,a+(d-a)*p,b+(e-b)*p,3,color,true);});
$('incidenceOut').textContent=v('incidentAngle')+'°';$('reflectionOut').textContent=v('incidentAngle')+'°';
}
document.querySelectorAll('.control-panel input,.control-panel select').forEach(e=>e.oninput=()=>{const o=$(e.id+'Value');if(o)o.value=e.value+(e.dataset.unit||'');draw();});
$('reset').onclick=()=>{document.querySelectorAll('.control-panel input').forEach(e=>{e.value=e.defaultValue;const o=$(e.id+'Value');if(o)o.value=e.value+(e.dataset.unit||'');});$('mode').selectedIndex=0;draw();};
$('checkChallenge').onclick=()=>{const ok=$('mode').value==='reflection'&&v('incidentAngle')===50,f=$('challengeFeedback');f.textContent=ok?'Correct ray setup.':'Use Reflection mode and set 50°.';f.className='challenge__feedback '+(ok?'is-success':'is-error');};
L.animate(dt=>{if(!L.reduced.matches){time+=dt;draw();}});new ResizeObserver(draw).observe(c);draw();
})();
