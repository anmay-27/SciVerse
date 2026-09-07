/* Complete 118-element table with an offline, source-backed data collection. */
(() => {
  'use strict';
  const $=id=>document.getElementById(id),data=PeriodicElements;
  const colors={'nonmetal':'#60a5fa','noble gas':'#c084fc','alkali metal':'#fb7185','alkaline earth metal':'#fbbf24','metalloid':'#22d3ee','halogen':'#34d399','transition metal':'#fda4af','post-transition metal':'#fdba74','lanthanide':'#a5b4fc','actinide':'#f0abfc'};
  const aliases={Al:'aluminium aluminum',Cs:'caesium cesium',S:'sulfur sulphur',W:'tungsten wolfram'};
  let selected=null,previewObserver;
  const table=$('periodicTable'),tiles=[];
  const status=document.createElement('p');status.id='filterStatus';status.className='lab-note';status.setAttribute('aria-live','polite');table.parentElement.after(status);
  const filterControl=$('filter');filterControl.replaceChildren(new Option('All elements','all'),new Option('All metals','metal'));
  Object.keys(colors).forEach(category=>filterControl.add(new Option(category==='noble gas'?'Noble gases':category[0].toUpperCase()+category.slice(1)+'s',category)));
  // Standard 18-column layout with detached lanthanide/actinide series.
  for(let group=1;group<=18;group++){const h=document.createElement('span');h.className='periodic-group-label';h.style.gridColumn=group;h.style.gridRow=1;h.textContent=group;table.append(h);}
  for(const [row,text] of [[10,'Lanthanides'],[11,'Actinides']]){const h=document.createElement('span');h.className='periodic-series-label';h.style.gridColumn='1 / span 2';h.style.gridRow=row;h.textContent=text;table.append(h);}
  for(const [row,text] of [[7,'57–71'],[8,'89–103']]){const h=document.createElement('span');h.className='periodic-series-link';h.style.gridColumn=3;h.style.gridRow=row;h.textContent=text;h.title='Series displayed in the detached rows below';table.append(h);}
  data.forEach(e=>{
    const b=document.createElement('button');b.type='button';b.className='element-tile';b.style.gridColumn=e.column;b.style.gridRow=e.row;b.style.setProperty('--element-color',colors[e.category]);
    b.dataset.number=e.number;b.dataset.symbol=e.symbol;b.dataset.category=e.category;
    b.setAttribute('aria-label',e.name+', '+e.symbol+', atomic number '+e.number);b.setAttribute('aria-pressed','false');
    const n=document.createElement('span'),symbol=document.createElement('strong');n.textContent=e.number;symbol.textContent=e.symbol;b.append(n,symbol);b.onclick=()=>select(e,b);
    table.append(b);tiles.push(b);
  });
  table.parentElement.tabIndex=0;table.parentElement.setAttribute('aria-label','Periodic table. Scroll horizontally on smaller screens. Select an element for details.');
  function drawAtom(c,e){
    const x=Lab.fit(c);if(!x)return;const w=c.clientWidth,h=c.clientHeight,cx=w/2,cy=h*.47,r=Math.min(w*.40,h*.34);
    Lab.scene(x,w,h,e.symbol+' / '+e.number+' ELECTRONS');
    e.shells.forEach((count,i)=>{
      const radius=e.shells.length===1?r*.8:26+(r-26)*i/(e.shells.length-1);
      x.strokeStyle='#5eead466';x.beginPath();x.arc(cx,cy,radius,0,Math.PI*2);x.stroke();
      for(let j=0;j<count;j++){const a=j*Math.PI*2/count+i*.4;Lab.ball(x,cx+Math.cos(a)*radius,cy+Math.sin(a)*radius,2,'#34d399');}
    });
    Lab.ball(x,cx,cy,17,colors[e.category]);x.save();x.fillStyle='#07111e';x.font='bold 13px system-ui';x.textAlign='center';x.fillText(e.symbol,cx,cy+4);x.restore();
    Lab.label(x,'Shells: '+e.shells.join(' · '),10,h-14);
  }
  function text(tag,content,className){const n=document.createElement(tag);n.textContent=content;if(className)n.className=className;return n;}
  function select(e,b){
    selected=e;tiles.forEach(t=>{t.classList.toggle('is-active',t===b);t.setAttribute('aria-pressed',String(t===b));});
    previewObserver?.disconnect();
    const detail=$('elementDetail');detail.replaceChildren();
    const preview=document.createElement('canvas');preview.className='element-atom-preview';preview.setAttribute('aria-label',e.name+' neutral atom: '+e.number+' electrons; shell populations '+e.shells.join(', '));
    detail.append(preview,text('div',e.symbol,'element-badge'),text('h3',e.name+' ('+e.symbol+')'));
    detail.append(text('p','Atomic number: '+e.number+' · Atomic mass: '+e.mass+' u'));
    detail.append(text('p','Category: '+e.category+' · Period '+e.period+' · '+(e.group?'Group '+e.group:'Detached '+e.category+' series')));
    const config=text('p','Electron configuration: '),sup='⁰¹²³⁴⁵⁶⁷⁸⁹';
    const display=e.config.replace(/(\d[spdfg])(\d+)/g,(_,orbital,count)=>orbital+[...count].map(d=>sup[+d]).join('')).replace(/\](?=\d)/,'] ');
    config.append(text('code',display));detail.append(config,text('p','Shell populations: '+e.shells.join(' · ')));
    detail.append(text('p','Electronegativity (Pauling): '+(e.electronegativity||'Not available')));
    const source=text('p','Data: '),a=document.createElement('a');a.href='https://pubchem.ncbi.nlm.nih.gov/periodic-table/';a.textContent='PubChem';source.append(a);
    if(e.configSource==='NIST'){source.append(document.createTextNode(' · Configuration: '));const nist=document.createElement('a');nist.href='https://physics.nist.gov/cgi-bin/Elements/elInfo.pl?element=103';nist.textContent='NIST';source.append(nist);}
    detail.append(source);
    if(e.number>=104)detail.append(text('p','Superheavy-element configurations may be calculated or predicted; source qualifiers are retained.','element-data-note'));
    previewObserver=new ResizeObserver(()=>drawAtom(preview,e));previewObserver.observe(preview);drawAtom(preview,e);
    $('selectedOut').textContent=e.symbol;$('categoryOut').textContent=e.category;
  }
  function filter(){
    const q=$('search').value.trim().toLowerCase(),f=filterControl.value;
    const exact=q?data.filter(e=>[e.symbol.toLowerCase(),e.name.toLowerCase(),String(e.number)].includes(q)):[];
    let n=0;
    data.forEach((e,i)=>{
      const metal=!['nonmetal','metalloid','halogen','noble gas'].includes(e.category);
      const matches=exact.length?exact.includes(e):(e.name+' '+e.symbol+' '+e.number+' '+(aliases[e.symbol]||'')).toLowerCase().includes(q);
      const show=matches&&(f==='all'||(f==='metal'?metal:e.category===f));
      tiles[i].hidden=!show;if(show)n++;
    });
    $('visibleOut').textContent=n;
    status.textContent=n?n+' of '+data.length+' elements match. Select an element to inspect its properties.':'No matches. Try a name, symbol or atomic number, or reset the category filter.';
  }
  $('search').oninput=filter;filterControl.onchange=filter;
  $('reset').onclick=()=>{$('search').value='';filterControl.value='all';filter();};
  $('checkChallenge').onclick=()=>{const ok=selected?.symbol==='Ar',f=$('challengeFeedback');f.textContent=ok?'Correct—argon is the period 3 noble gas.':'Find group 18 in period 3.';f.className='challenge__feedback '+(ok?'is-success':'is-error');};
  filter();select(data[5],tiles[5]);
  Lab.note('All 118 elements are included. Detached rows contain elements 57–71 and 89–103. Shell diagrams count every electron in a neutral atom; rings are a teaching model, not literal trajectories. PubChem mass values may represent a particular isotope for radioactive elements, rather than a standard atomic weight.');
})();
