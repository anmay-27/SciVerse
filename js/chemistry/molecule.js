/* Perspective renderer for explicit molecular atom and bond graphs. */
(() => {
  'use strict';
  const $=id=>document.getElementById(id),L=Lab,D=MoleculeLibrary,stage=$('moleculeStage');
  const colors={H:'#e2e8f0',O:'#fb7185',C:'#94a3b8',N:'#60a5fa',B:'#fdba74',F:'#34d399',Cl:'#a3e635',Be:'#86efac',Si:'#c4b5fd',S:'#fbbf24',P:'#fb923c',Xe:'#67e8f9'};
  const picker=$('molecule');picker.replaceChildren();
  Object.entries(D).forEach(([formula,m])=>picker.add(new Option(formula+' · '+m.name,formula)));
  stage.innerHTML='<canvas tabindex="0" aria-label="Rotatable molecule. Drag or use arrow keys to rotate."></canvas>';
  const c=stage.querySelector('canvas'),spin=L.toggle('autoRotate','Auto rotate',!L.reduced.matches);
  L.note('Drag or use arrow keys to rotate. Shapes represent isolated molecules; bond lengths and sphere sizes are illustrative. Dashed gold marks a selected angle between bonds. Angles describe the 3D structure, independent of the viewing angle.');
  const description=document.createElement('article');description.className='reaction-caption';
  const title=document.createElement('h3'),notes=document.createElement('p'),legend=document.createElement('div');legend.className='molecule-legend';description.append(title,notes,legend);document.querySelector('.experiment-stage').append(description);
  let yaw=.3,pitch=-.2,drag=null;
  function render(){
    const m=D[picker.value];['geometry','angle','polarity','hybrid'].forEach(k=>$(k+'Out').textContent=m[k]);
    title.textContent=picker.value+' · '+m.name;notes.textContent=m.notes;
    legend.replaceChildren();[...new Set(m.atoms.map(a=>a[0]))].forEach(symbol=>{const tag=document.createElement('span'),dot=document.createElement('i');dot.style.backgroundColor=colors[symbol];dot.setAttribute('aria-hidden','true');tag.append(dot,document.createTextNode(symbol));legend.append(tag);});
    c.setAttribute('aria-label',m.name+', '+m.geometry+'. Drag or use arrow keys to rotate.');
    $('challengeFeedback').textContent='';draw();
  }
  function draw(){
    const x=L.fit(c);if(!x)return;const w=c.clientWidth,h=c.clientHeight,m=D[picker.value];
    L.scene(x,w,h,'MOLECULAR STRUCTURE / '+picker.value);
    const extent=Math.max(1,...m.atoms.map(a=>Math.hypot(...a.slice(1)))),scale=Math.min(w*.29,h*.27)/extent;
    const pts=m.atoms.map(([symbol,a,b,z],i)=>{
      const u=a*Math.cos(yaw)+z*Math.sin(yaw),v=z*Math.cos(yaw)-a*Math.sin(yaw),y=b*Math.cos(pitch)-v*Math.sin(pitch),depth=b*Math.sin(pitch)+v*Math.cos(pitch),p=4/(4-depth);
      return{symbol,i,z:depth,x:w/2+u*scale*p,y:h*.47+y*scale*p,r:(symbol==='H'?14:21)*p*Math.min(1,w/430)};
    });
    const objects=pts.map(p=>({z:p.z,draw:()=>{L.ball(x,p.x,p.y,p.r,colors[p.symbol]||'#cbd5e1',true);x.save();x.textAlign='center';x.fillStyle='#07111e';x.font='bold 12px system-ui';x.fillText(p.symbol,p.x,p.y+4);x.restore();}}));
    m.bonds.forEach(([from,to,order])=>{
      const u=pts[from],p=pts[to],dx=p.x-u.x,dy=p.y-u.y,dist=Math.hypot(dx,dy);
      if(dist<1)return;
      const start=Math.min(.45,u.r/dist),end=1-Math.min(.45,p.r/dist),mix=(k,t)=>u[k]+(p[k]-u[k])*(start+(end-start)*t);
      objects.push({z:(u.z+p.z)/2,draw:()=>{
        const offsets=order===3?[-6,0,6]:order===2?[-4,4]:[0],width=order>1?4:8;
        offsets.forEach(off=>{const ox=-dy/dist*off,oy=dx/dist*off;L.line(x,mix('x',0)+ox,mix('y',0)+oy,mix('x',1)+ox,mix('y',1)+oy,'#475569',width);L.line(x,mix('x',0)+ox-1,mix('y',0)+oy-1,mix('x',1)+ox-1,mix('y',1)+oy-1,'#c6d8e8',width*.4);});
      }});
    });
    objects.sort((a,b)=>a.z-b.z).forEach(o=>o.draw());
    L.label(x,m.geometry,16,h-61,'#6ee7b7');
    L.label(x,'Angles: '+m.angle,16,h-41,'#fbbf24');
    L.label(x,m.polarity+' · '+m.hybrid,16,h-21);
    if(m.angleAtoms){const [i,j,k]=m.angleAtoms,a=pts[j],b=pts[i],d=pts[k];x.save();x.setLineDash([3,4]);x.strokeStyle='#fbbf24';x.beginPath();x.moveTo(a.x+(b.x-a.x)*.35,a.y+(b.y-a.y)*.35);x.quadraticCurveTo(a.x,a.y,a.x+(d.x-a.x)*.35,a.y+(d.y-a.y)*.35);x.stroke();x.restore();}
  }
  c.onpointerdown=e=>{drag=[e.clientX,e.clientY];c.setPointerCapture(e.pointerId);spin.checked=false;};
  c.onpointermove=e=>{if(!drag)return;yaw+=(e.clientX-drag[0])*.012;pitch+=(e.clientY-drag[1])*.012;drag=[e.clientX,e.clientY];draw();};
  c.onpointerup=c.onpointercancel=()=>drag=null;
  c.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();spin.checked=false;yaw+=(e.key==='ArrowRight'?.15:e.key==='ArrowLeft'?-.15:0);pitch+=(e.key==='ArrowDown'?.15:e.key==='ArrowUp'?-.15:0);draw();};
  picker.onchange=render;
  $('reset').onclick=()=>{picker.value='H2O';yaw=.3;pitch=-.2;spin.checked=!L.reduced.matches;render();};
  $('checkChallenge').onclick=()=>{const m=D[picker.value],ok=m.geometry==='Trigonal planar',f=$('challengeFeedback');f.textContent=ok?'Correct—'+picker.value+' is trigonal planar.':'Inspect the geometry output for each molecule.';f.className='challenge__feedback '+(ok?'is-success':'is-error');};
  L.animate(dt=>{if(spin.checked&&!drag){yaw+=dt*.22;draw();}});
  new ResizeObserver(draw).observe(c);render();
})();
