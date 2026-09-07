/* Observable evidence only: deliberately no real-world experimental procedure. */
(() => {
'use strict';const $=id=>document.getElementById(id),c=$('reactionVisualCanvas'),L=Lab;
const reactions=[
{title:'Copper & nitric acid',evidence:'Brown gas',species:'NO₂',equation:'Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂↑ + 2H₂O',explanation:'Copper is oxidized to copper(II) ions, turning the solution blue. Concentrated nitric acid is reduced to nitrogen dioxide, visible as reddish-brown fumes.',safety:'Educational simulation only. NO₂ is toxic; concentrated nitric acid is highly corrosive. This is not an instruction to perform the reaction.'},
{title:'Lead iodide precipitation',evidence:'Yellow solid',species:'PbI₂',equation:'Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃',explanation:'Two initially clear solutions meet. Lead(II) and iodide ions form insoluble yellow lead iodide. Suspended particles make the liquid cloudy, then settle as a solid.',safety:'Educational simulation only. Lead compounds are toxic and require controlled handling and hazardous-waste disposal.'},
{title:'An indicator changes form',evidence:'Pink → colorless',species:'Phenolphthalein',equation:'H⁺ + OH⁻ → H₂O',explanation:'The initially basic solution is pink with phenolphthalein. As acid neutralizes the base, the pH passes below the indicator transition range (about 8.2–10), and the pink color fades. The indicator changes molecular form.',safety:'Virtual indicator demonstration. Colors are illustrative; never mix household chemicals to reproduce this scene.'},
{title:'Carbonate effervescence',evidence:'Rising bubbles',species:'CO₂',equation:'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑',explanation:'Acid reacts with carbonate to release carbon dioxide. Gas bubbles form on the solid surface, grow and rise through the liquid. The carbonate gradually dissolves.',safety:'Educational simulation only. Carbon dioxide is colorless; outlined bubbles show its boundary with the liquid.'}
];
reactions.push(
{title:'Silver chloride precipitation',evidence:'White precipitate',species:'AgCl',equation:'AgNO₃ + NaCl → AgCl↓ + NaNO₃',effect:'precipitate',solid:'#f1f5f9',liquidStart:[100,180,200],liquidEnd:[185,205,215],explanation:'Silver ions and chloride ions form insoluble silver chloride. A white cloud appears, then the solid settles. The remaining sodium and nitrate ions stay in solution.',safety:'Educational simulation only. Silver salts require controlled handling and appropriate waste disposal.'},
{title:'Copper hydroxide precipitation',evidence:'Blue precipitate',species:'Cu(OH)₂',equation:'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄',effect:'precipitate',solid:'#38bdf8',liquidStart:[30,140,220],liquidEnd:[120,190,220],explanation:'Copper(II) ions react with hydroxide ions to form a pale-blue insoluble solid. The blue cloud and sediment represent copper(II) hydroxide, not a gas.',safety:'Educational simulation only. Sodium hydroxide is corrosive; copper compounds require controlled disposal.'},
{title:'Iron hydroxide precipitation',evidence:'Rust-brown solid',species:'Fe(OH)₃',equation:'FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl',effect:'precipitate',solid:'#c47636',liquidStart:[220,177,58],liquidEnd:[168,121,68],explanation:'Iron(III) ions form a reddish-brown hydroxide precipitate with hydroxide ions. The floc-like particles collect at the bottom; they are a solid, unlike the brown NO₂ fumes.',safety:'Educational simulation only. Alkalis are corrosive; do not reproduce this scene with household chemicals.'},
{title:'Limewater turns cloudy',evidence:'Milky suspension',species:'CaCO₃',equation:'CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O',effect:'limewater',solid:'#f8fafc',liquidStart:[95,190,210],liquidEnd:[220,230,235],explanation:'Carbon dioxide entering limewater forms insoluble calcium carbonate, making it milky. This scene shows the initial clouding only; excess CO₂ can subsequently dissolve the precipitate as soluble hydrogen carbonate.',safety:'Educational simulation only. Calcium hydroxide solution is alkaline and can irritate skin and eyes.'},
{title:'Hydrogen peroxide decomposition',evidence:'Oxygen bubbles',species:'O₂',equation:'2H₂O₂ → 2H₂O + O₂↑',effect:'bubbles',liquidStart:[80,180,210],liquidEnd:[110,205,220],explanation:'Hydrogen peroxide decomposes into water and oxygen. A catalyst such as manganese dioxide accelerates this change without being consumed. The dark grains remain while colorless oxygen bubbles rise.',safety:'Educational simulation only. Peroxide can be hazardous, and oxygen supports combustion. No experimental procedure is provided.'},
{title:'Iron displaces copper',evidence:'Copper coating',species:'Cu',equation:'Fe + CuSO₄ → FeSO₄ + Cu',effect:'deposit',liquidStart:[30,140,230],liquidEnd:[140,195,145],explanation:'Iron transfers electrons to copper(II) ions. Reddish metallic copper coats the iron, while the blue solution becomes pale green as iron(II) ions form. The coating is metal, not a hydroxide precipitate.',safety:'Educational simulation only. Metal salt solutions require suitable handling and disposal.'}
);
// Build the picker from the same collection as the renderer and narration.
const picker=document.querySelector('.reaction-picker');picker.replaceChildren();
reactions.forEach((r,i)=>{const b=document.createElement('button');b.type='button';b.dataset.reaction=i;b.setAttribute('aria-pressed',String(i===0));b.textContent=String(i+1).padStart(2,'0')+' · '+r.title;const small=document.createElement('small');small.textContent=r.evidence;b.append(small);picker.append(b);});
let selected=0,progress=0,playing=false,time=0;
function info(){const r=reactions[selected];$('reactionTitle').textContent=r.title;$('reactionEquation').textContent=r.equation;$('reactionExplanation').textContent=r.explanation;$('reactionSafety').textContent=r.safety;$('evidenceOut').textContent=r.evidence;$('speciesOut').textContent=r.species;c.setAttribute('aria-label',r.title+': '+r.evidence);document.querySelectorAll('[data-reaction]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.reaction===selected)));}
function draw(){const x=L.fit(c);if(!x)return;const w=c.clientWidth,h=c.clientHeight,p=progress/100,cx=w*.5,bw=Math.min(w*.55,260),left=cx-bw/2,right=cx+bw/2,top=h*.30,bottom=h*.85,liquid=top+(bottom-top)*.28;
L.scene(x,w,h,'REACTION STUDIO / '+String(selected+1).padStart(2,'0'));
L.label(x,p===0?'BEFORE · reactants ready':p<1?'DURING · visible transformation':'AFTER · observe the products',16,49,'#6ee7b7');
L.line(x,18,bottom+13,w-18,bottom+13,'#45667d',3);
x.save();x.fillStyle='#0006';x.beginPath();x.ellipse(cx,bottom+13,bw*.65,12,0,0,7);x.fill();x.restore();
// Liquid sits behind the glass highlights and graduated scale.
const r=reactions[selected];
let color=selected===0?'rgba(38,151,221,'+(.15+p*.5)+')':selected===1?'rgba(245,199,36,'+(.08+Math.sin(p*Math.PI)*.4)+')':selected===2?'rgba(245,57,151,'+(.04+Math.max(0,1-p*1.5)*.7)+')':'#5ac6d438';
if(r.effect){const rgb=r.liquidStart.map((v,i)=>Math.round(v+(r.liquidEnd[i]-v)*p));color='rgba('+rgb.join(',')+','+(r.effect==='limewater'?.12+p*.6:.38)+')';}
x.fillStyle=color;x.fillRect(left+3,liquid,bw-6,bottom-liquid-8);x.beginPath();x.ellipse(cx,liquid,bw/2-3,8,0,0,7);x.fill();
if(r.effect){
  L.label(x,r.species+' · '+r.evidence,Math.max(12,cx-95),top-18,r.solid||'#a5f3fc');
  if(r.effect==='precipitate'||r.effect==='limewater'){
    if(p>0&&p<.5&&r.effect==='precipitate'){L.line(x,left-10,top-10,cx-25,liquid+10,'#bae6fd99',4);L.line(x,right+10,top-10,cx+25,liquid+10,'#ddd6fe99',4);}
    for(let i=0;i<180*p;i++){const f=Math.abs(Math.sin(i*17.13)),settle=r.effect==='limewater'?p*.35:Math.max(0,(p-.35)/.65);const y=liquid+12+(bottom-liquid-26)*(f+(1-f)*settle),px=left+12+Math.abs(Math.sin(i*23.3))*(bw-24);x.fillStyle=r.solid;x.fillRect(px,y,3+i%3,3);}
    if(r.effect==='precipitate'){x.fillStyle=r.solid;x.fillRect(left+7,bottom-9-p*10,bw-14,p*10);}
  }
  if(r.effect==='bubbles'||r.effect==='limewater'){
    if(r.effect==='bubbles')for(let i=0;i<5;i++)L.ball(x,cx+(i-2)*13,bottom-14,4,'#475569');
    if(p>0&&p<1)for(let i=0;i<30;i++){const a=(time*(.25+i%4*.05)+i*.17)%1,px=cx+Math.sin(i*53)*bw*.3,y=bottom-22-a*(bottom-liquid-20);x.strokeStyle='#e0faffbb';x.beginPath();x.arc(px,y,2+a*5,0,7);x.stroke();}
  }
  if(r.effect==='deposit'){
    L.line(x,cx,liquid+12,cx,bottom-20,'#94a3b8',12);
    for(let i=0;i<100*p;i++){const y=liquid+14+Math.abs(Math.sin(i*11.3))*(bottom-liquid-37),px=cx+Math.sin(i*19)*7;L.ball(x,px,y,2.5,'#d58a50');}
  }
}else if(selected===0){for(let i=0;i<6;i++){x.fillStyle='#d68a53';x.fillRect(cx-30+i*10,bottom-17,8,Math.max(1,9*(1-p)));}
if(p>0){for(let i=0;i<42;i++){const age=((time*.18+i*.137)%1),y=liquid-age*(liquid-65),a=(1-age*.65)*Math.min(1,p*6)*.48,rad=12+age*34,px=cx+Math.sin(i*4+time*.4)*bw*.19+Math.sin(age*5)*20;x.save();const g=x.createRadialGradient(px,y,0,px,y,rad);g.addColorStop(0,'rgba(190,94,36,'+a+')');g.addColorStop(1,'rgba(145,63,18,0)');x.fillStyle=g;x.beginPath();x.arc(px,y,rad,0,7);x.fill();x.restore();}}
L.label(x,'NO₂ · brown fumes',Math.max(12,cx-62),top-18,'#e8a16b');
}else if(selected===1){
// Two transparent incoming streams are deliberately distinct from the yellow product.
if(p>0&&p<.5){L.line(x,left-15,top-20,cx-25,liquid+10,'#bae6fd99',5);L.line(x,right+15,top-20,cx+25,liquid+10,'#ddd6fe99',5);}
L.label(x,'Pb²⁺ solution',Math.max(8,left-30),top-28,'#bae6fd');L.label(x,'I⁻ solution',Math.min(w-80,right-35),top-28,'#ddd6fe');
for(let i=0;i<160*p;i++){const seed=(Math.sin(i*127.1)*43758.5453)%1,frac=Math.abs(seed),settle=Math.max(0,(p-.3)/.7),y=liquid+12+(bottom-liquid-26)*(frac+(1-frac)*settle),px=left+12+Math.abs(Math.sin(i*23.3))*(bw-24);x.fillStyle=i%2?'#fde047':'#eab308';x.fillRect(px,y,3+(i%3),3);}
x.fillStyle='#facc15';x.fillRect(left+7,bottom-9-p*10,bw-14,p*10);
}else if(selected===2){if(p>0&&p<.85){const drop=(time*.6)%1;L.ball(x,cx,top-30+drop*(liquid-top+25),4,'#dbeafe');}L.label(x,'Acid neutralizes the base',Math.max(12,cx-80),top-18,'#f9a8d4');}
else {for(let i=0;i<5;i++)L.ball(x,cx+(i-2)*14,bottom-18,Math.max(1,9*(1-p)), '#e2e8f0');
if(p>0&&p<1){for(let i=0;i<30;i++){const a=(time*(.25+(i%4)*.05)+i*.17)%1,px=cx+Math.sin(i*53)*bw*.33+Math.sin(a*8)*4,y=bottom-22-a*(bottom-liquid-20);x.strokeStyle='#c4f3ffbb';x.lineWidth=1.5;x.beginPath();x.arc(px,y,2+a*5,0,7);x.stroke();L.line(x,px-1,y-2,px+1,y-3,'#fff9');}}L.label(x,'CO₂ · colorless gas',Math.max(12,cx-66),top-18,'#a5f3fc');}
const glass=x.createLinearGradient(left,0,right,0);glass.addColorStop(0,'#e0f2fe44');glass.addColorStop(.12,'#ffffff08');glass.addColorStop(.8,'#ffffff03');glass.addColorStop(1,'#e0f2fe33');x.fillStyle=glass;x.fillRect(left,top,bw,bottom-top);x.strokeStyle='#c3deedbb';x.lineWidth=3;x.beginPath();x.moveTo(left,top);x.lineTo(left,bottom-12);x.quadraticCurveTo(left,bottom,cx,bottom);x.quadraticCurveTo(right,bottom,right,bottom-12);x.lineTo(right,top);x.stroke();x.beginPath();x.ellipse(cx,top,bw/2+4,6,0,0,7);x.stroke();
for(let i=1;i<5;i++)L.line(x,right-24,top+i*(bottom-top)/6,right-6,top+i*(bottom-top)/6,'#dbeafe88');
L.meter(x,'TRANSFORMATION',p,18,h-22,w-36,'#34d399');$('reactionProgress').value=progress;$('reactionProgressValue').value=Math.round(progress)+'%';$('stageOut').textContent=p===0?'Before':p<1?'Reacting':'Complete';
}
document.querySelectorAll('[data-reaction]').forEach(b=>b.onclick=()=>{selected=+b.dataset.reaction;progress=0;playing=false;time=0;$('pause').textContent='Pause';$('challengeFeedback').textContent='';info();draw();});
$('run').onclick=()=>{if(progress>=100)progress=0;playing=true;$('pause').textContent='Pause';};$('pause').onclick=()=>{playing=!playing;$('pause').textContent=playing?'Pause':'Resume';};
$('reset').onclick=()=>{progress=0;playing=false;time=0;$('pause').textContent='Pause';draw();};$('reactionProgress').oninput=()=>{progress=+$('reactionProgress').value;playing=false;time=progress*.12;draw();};
$('explainReaction').onclick=()=>speakText(reactions[selected].title+'. '+reactions[selected].explanation+' '+reactions[selected].safety);
$('checkChallenge').onclick=()=>{const ok=selected===1,f=$('challengeFeedback');f.textContent=ok?'Correct. Lead iodide is the yellow precipitate.':'Look for the reaction that forms yellow lead iodide.';f.className='challenge__feedback '+(ok?'is-success':'is-error');};
L.animate(dt=>{if(playing){time+=dt;progress=Math.min(100,progress+dt*6);if(progress===100)playing=false;draw();}});new ResizeObserver(draw).observe(c);info();draw();
})();
