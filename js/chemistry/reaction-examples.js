/* Named learning examples for the existing qualitative particle models. */
(() => {
  'use strict';
  const rates = [
    {name:'Calcium carbonate + acid',equation:'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂',focus:'Surface area',text:'Compare a lump with the same amount of finely divided carbonate. More exposed surface allows more acid–solid contact.',settings:[30,5,8,false]},
    {name:'Magnesium + acid',equation:'Mg + 2HCl → MgCl₂ + H₂',focus:'Concentration',text:'Increasing acid concentration generally increases the frequency of effective encounters at the magnesium surface. Hydrogen is the gas product.',settings:[30,8,5,false]},
    {name:'Zinc + acid',equation:'Zn + 2HCl → ZnCl₂ + H₂',focus:'Temperature',text:'Warming generally speeds the reaction as more encounters have sufficient energy. Compare warm and cool model settings.',settings:[55,5,5,false]},
    {name:'Hydrogen peroxide decomposition',equation:'2H₂O₂ → 2H₂O + O₂',focus:'Catalyst',text:'Manganese dioxide can catalyze peroxide decomposition. Compare catalyst on and off; a catalyst changes the pathway, not the overall equation.',settings:[30,5,5,true]},
    {name:'Iron displaces copper',equation:'Fe + CuSO₄ → FeSO₄ + Cu',focus:'Surface contact',text:'Copper deposits on iron. Exposed iron surface and solution concentration affect the reaction; a coating can alter later behavior.',settings:[30,6,7,false]},
    {name:'Zinc displaces copper',equation:'Zn + CuSO₄ → ZnSO₄ + Cu',focus:'Concentration',text:'Zinc transfers electrons to copper(II) ions. Compare the availability of dissolved reactant at the metal surface.',settings:[30,8,6,false]},
    {name:'Thiosulfate + acid',equation:'Na₂S₂O₃ + 2HCl → 2NaCl + SO₂ + S + H₂O',focus:'Temperature and clouding',text:'Sulfur formation makes the solution cloudy. Temperature and concentration affect how quickly this visible endpoint appears. This reaction also releases irritating sulfur dioxide.',settings:[45,6,5,false]},
    {name:'Acid–base neutralization',equation:'HCl + NaOH → NaCl + H₂O',focus:'Mixing and encounters',text:'Hydrogen and hydroxide ions form water rapidly. The slowed particle model makes encounters visible; it does not represent the real timescale.',settings:[30,7,5,false]},
    {name:'Ethyl ethanoate hydrolysis in base',equation:'CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH',focus:'Reactant concentration',text:'Both ester and hydroxide availability matter. Compare dilute and concentrated model conditions while keeping the other factors fixed.',settings:[40,7,5,false]},
    {name:'Sucrose hydrolysis',equation:'C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ (glucose) + C₆H₁₂O₆ (fructose)',focus:'Acid catalysis',text:'Acid catalyzes hydrolysis of sucrose into glucose and fructose. Compare catalyst settings; water is a reactant even though its concentration is usually effectively constant.',settings:[45,5,5,true]}
  ];
  const equilibrium = [
    {name:'Nitrogen dioxide equilibrium',equation:'N₂O₄(g) ⇌ 2NO₂(g)',heat:'endothermic',text:'Dissociation produces brown NO₂ from much paler N₂O₄. Heating favors the forward direction; cooling favors dimer formation.',settings:[12,6,40],colors:['#cbd5e1','#c47a43']},
    {name:'Ammonia synthesis',equation:'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)',heat:'exothermic',text:'Cooling favors ammonia at equilibrium, although it can slow the approach to equilibrium. Pressure also matters in the real system but is not modeled here.',settings:[16,4,40]},
    {name:'Sulfur trioxide formation',equation:'2SO₂(g) + O₂(g) ⇌ 2SO₃(g)',heat:'exothermic',text:'Cooling favors sulfur trioxide. A catalyst speeds the approach to equilibrium without changing the equilibrium position.',settings:[14,6,40]},
    {name:'Hydrogen iodide formation',equation:'H₂(g) + I₂(g) ⇌ 2HI(g)',heat:'exothermic',text:'With gaseous iodine as written, the forward reaction is mildly exothermic. Adding a reactant favors HI formation.',settings:[10,10,40],colors:['#c084fc','#a5f3fc']},
    {name:'Phosphorus pentachloride dissociation',equation:'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)',heat:'endothermic',text:'Heating favors dissociation. The extra gas particles make pressure relevant in the actual system; this model focuses on temperature and composition.',settings:[15,5,40]},
    {name:'Calcium carbonate decomposition',equation:'CaCO₃(s) ⇌ CaO(s) + CO₂(g)',heat:'endothermic',text:'Heating favors decomposition. In the real heterogeneous equilibrium, CO₂ pressure matters; adding more pure solid does not shift equilibrium while both solid phases are present. The generic Add buttons below are not a model of adding solid.',settings:[16,4,40],colors:['#e2e8f0','#fbbf24']},
    {name:'Nitrogen monoxide formation',equation:'N₂(g) + O₂(g) ⇌ 2NO(g)',heat:'endothermic',text:'High temperatures favor nitrogen monoxide formation. The classroom temperature slider represents relative thermal change, not the actual high-temperature conditions.',settings:[18,2,40]},
    {name:'Steam reforming of methane',equation:'CH₄(g) + H₂O(g) ⇌ CO(g) + 3H₂(g)',heat:'endothermic',text:'Heating favors the hydrogen-producing direction. Industrial pressure, catalysts and side reactions are outside this simplified view.',settings:[14,6,40]},
    {name:'Water–gas shift',equation:'CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)',heat:'exothermic',text:'Cooling favors carbon dioxide and hydrogen. Adding steam drives the real reaction toward products; removing product also favors further formation.',settings:[10,10,40]},
    {name:'Cobalt chloride complex equilibrium',equation:'[Co(H₂O)₆]²⁺ + 4Cl⁻ ⇌ [CoCl₄]²⁻ + 6H₂O',heat:'endothermic',text:'The hydrated complex is pink and the chloride complex is blue. Heating or increasing chloride availability favors the blue complex. Cobalt compounds are hazardous; this is a virtual example.',settings:[12,8,40],colors:['#f9a8d4','#60a5fa']}
  ];

  function mount(kind, onSelect) {
    const examples=kind==='rates'?rates:equilibrium;
    const group=document.createElement('div');group.className='control-group';
    const label=document.createElement('label');label.className='control-label';label.htmlFor='reactionExample';label.textContent='Reaction examples · '+examples.length;
    const select=document.createElement('select');select.id='reactionExample';select.add(new Option('Free exploration (original model)',''));
    examples.forEach((e,i)=>select.add(new Option(String(i+1).padStart(2,'0')+' · '+e.name,String(i))));group.append(label,select);
    document.querySelector('.control-panel h3').after(group);
    const card=document.createElement('article');card.className='reaction-caption';
    const title=document.createElement('h3'),equation=document.createElement('p'),explanation=document.createElement('p'),model=document.createElement('p'),narration=document.createElement('button');
    equation.className='reaction-equation';model.className='lab-note';narration.className='button button--secondary';narration.type='button';narration.textContent='Explain this example';
    card.append(title,equation,explanation,model,narration);document.querySelector('.experiment-stage').append(card);
    function update(){const sample=select.value===''?null:examples[Number(select.value)];
      title.textContent=sample?sample.name:'Free exploration';equation.textContent=sample?sample.equation:kind==='rates'?'A + B → product':'A ⇌ B';
      explanation.textContent=sample?(kind==='rates'?sample.focus+'. ':sample.heat[0].toUpperCase()+sample.heat.slice(1)+' forward direction. ')+sample.text:'Use the original controls to investigate the qualitative particle model.';
      model.textContent=kind==='rates'?'Teaching model: particles show generic collisions, not the selected reaction’s atoms or stoichiometry. Presets are illustrative, not measured rates or experimental conditions. Surface area and catalyst controls do not apply equally to every real reaction.':'Teaching model: A and B represent reactant and product pools, not individual molecules or stoichiometric counts. Thermal direction follows the example; rates, ratios and temperature settings are illustrative, not measured equilibrium data.';
      narration.onclick=()=>speakText(title.textContent+'. '+equation.textContent+'. '+explanation.textContent+' '+model.textContent);
      onSelect(sample);
    }
    select.addEventListener('change',update);
    // Preserve the original initial model and its defaults until an example is chosen.
    title.textContent='Choose a reaction example';explanation.textContent='Select one of '+examples.length+' examples, or keep exploring the original model.';model.textContent='Named examples use simplified teaching models. Equations and observations describe the real chemistry; particle counts and rates are illustrative.';
    narration.onclick=()=>speakText(explanation.textContent+' '+model.textContent);
    return {select,examples};
  }
  window.ChemistryExamples={mount};
})();
