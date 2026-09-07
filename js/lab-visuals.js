/* Lightweight shared drawing primitives. All coordinates are CSS pixels. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const colors = { blue: '#60a5fa', teal: '#34d399', gold: '#fbbf24', purple: '#c084fc' };
  function fit(c) {
    const w = c.clientWidth, h = c.clientHeight, d = Math.min(devicePixelRatio || 1, 2);
    if (c.width !== Math.round(w*d) || c.height !== Math.round(h*d)) { c.width = Math.round(w*d); c.height = Math.round(h*d); }
    const x = c.getContext('2d');
    if (!x) { c.replaceWith(document.createTextNode('Canvas is unavailable. Use the controls and live observations below.')); return null; }
    x.setTransform(d, 0, 0, d, 0, 0); return x;
  }
  function scene(x, w, h, title = '') {
    x.clearRect(0, 0, w, h); x.save();
    const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#12263d'); g.addColorStop(1, '#060e1c');
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    x.strokeStyle = '#83bfff12'; x.lineWidth = 1;
    for (let i=0;i<w;i+=40) { x.beginPath(); x.moveTo(i,0); x.lineTo(i,h); x.stroke(); }
    for (let i=0;i<h;i+=40) { x.beginPath(); x.moveTo(0,i); x.lineTo(w,i); x.stroke(); }
    if (title) label(x, title, 18, 25, '#a6bed6'); x.restore();
  }
  function label(x, text, a, b, color = '#dbeafe') { x.save(); x.fillStyle=color; x.font='12px system-ui'; x.textAlign='left'; x.fillText(text,a,b); x.restore(); }
  function ball(x, a, b, r, color, glow = false) {
    x.save(); if(glow) { x.shadowColor=color; x.shadowBlur=16; }
    const g=x.createRadialGradient(a-r*.35,b-r*.4,r*.05,a,b,r); g.addColorStop(0,'#ffffff'); g.addColorStop(.3,color); g.addColorStop(1,'#142033');
    x.fillStyle=g; x.beginPath(); x.arc(a,b,Math.max(.1,r),0,Math.PI*2); x.fill(); x.restore();
  }
  function line(x, a,b,c,d,color='#60a5fa',width=2,glow=false) { x.save(); x.strokeStyle=color; x.lineWidth=width; x.lineCap='round'; if(glow){x.shadowColor=color;x.shadowBlur=10;} x.beginPath();x.moveTo(a,b);x.lineTo(c,d);x.stroke();x.restore(); }
  function arrow(x,a,b,c,d,color) { line(x,a,b,c,d,color,2,true); const q=Math.atan2(d-b,c-a); for(const s of [-1,1])line(x,c,d,c-8*Math.cos(q+s*.45),d-8*Math.sin(q+s*.45),color); }
  function meter(x,name,value,a,b,w,color) { label(x,name,a,b-8,color); x.fillStyle='#ffffff16';x.fillRect(a,b,w,5);x.fillStyle=color;x.fillRect(a,b,w*Math.max(0,Math.min(1,value)),5); }
  // One RAF per simulation; hidden documents stop scheduling and resume without catch-up.
  function animate(draw) {
    let id=0,last=0,previous=0;
    function tick(now) { id=0;if(document.hidden)return;
      if(now-previous>=(reduced.matches?100:16)){ const dt=last?Math.min((now-last)/1000,.15):0;last=now;previous=now;draw(dt,now/1000); }
      id=requestAnimationFrame(tick);
    }
    function resume(){cancelAnimationFrame(id);last=0;if(!document.hidden)id=requestAnimationFrame(tick);}
    document.addEventListener('visibilitychange',resume);resume();
    window.addEventListener('pagehide',()=>cancelAnimationFrame(id));window.addEventListener('pageshow',resume);
  }
  function toggle(id,text,checked=true) { const l=document.createElement('label');l.className='switch-row';l.textContent=text;const i=document.createElement('input');i.type='checkbox';i.id=id;i.checked=checked;l.append(i);document.querySelector('.control-panel').append(l);return i; }
  function note(text) { const p=document.createElement('p');p.className='lab-note';p.textContent=text;document.querySelector('.experiment-stage').append(p);return p; }
  function atom(c,protons,neutrons,electrons,time=0) {
    const x=fit(c);if(!x)return;const w=c.clientWidth,h=c.clientHeight,cx=w/2,cy=h/2;
    scene(x,w,h,'ATOMIC STRUCTURE / SHELL MODEL');
    let left=electrons;const objects=[],shellCount=electrons<=2?1:electrons<=10?2:electrons<=18?3:4;
    [2,8,8,2].forEach((cap,s)=>{const n=Math.min(left,cap);left-=n;const r=Math.min(w*.40,h*.35)*(.5+.5*(s+1)/shellCount);
      if(!n)return;const tilt=s*.7-.8;
      x.save();x.translate(cx,cy);x.rotate(tilt);x.strokeStyle='#5eead455';x.lineWidth=1.5;x.beginPath();x.ellipse(0,0,r,r*.44,0,0,Math.PI*2);x.stroke();x.restore();
      for(let j=0;j<n;j++){const a=time*(.6-s*.08)+j*Math.PI*2/n,u=Math.cos(a)*r,v=Math.sin(a)*r*.44,z=Math.sin(a);objects.push({z,draw:()=>ball(x,cx+u*Math.cos(tilt)-v*Math.sin(tilt),cy+u*Math.sin(tilt)+v*Math.cos(tilt),4.5+z,'#34d399',true)});}
    });
    for(let i=0;i<protons+neutrons;i++){const a=i*2.399+time*.12,r=6*Math.sqrt(i),z=Math.sin(i*1.7)*.3;objects.push({z,draw:()=>ball(x,cx+Math.cos(a)*r,cy+Math.sin(a)*r*.8,10,i<protons?'#fb7185':'#94a3b8')});}
    objects.sort((a,b)=>a.z-b.z).forEach(o=>o.draw());
    label(x,protons+' p⁺  /  '+neutrons+' n  /  '+electrons+' e⁻',16,h-40);
    const charge=protons-electrons;label(x,!protons?'Add protons to define an element':charge===0?'Neutral atom':charge>0?'Positive ion · '+charge+'+':'Negative ion · '+Math.abs(charge)+'−',16,h-19,'#5eead4');
  }
  window.Lab={fit,scene,label,ball,line,arrow,meter,animate,toggle,note,atom,colors,reduced};
})();
