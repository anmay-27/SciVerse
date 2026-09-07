/* Introductory isolated-molecule models. Coordinates show shape, not bond lengths.
 * VSEPR reference: https://openstax.org/books/chemistry-2e/pages/7-6-molecular-structure-and-polarity
 * Expanded-valence hybrid labels are traditional classroom labels only. */
(() => {
  'use strict';
  const rad=d=>d*Math.PI/180;
  const linear=[[-1,0,0],[1,0,0]];
  const planar=Array.from({length:3},(_,i)=>[Math.sin(i*2*Math.PI/3),-Math.cos(i*2*Math.PI/3),0]);
  const tetra=[[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]].map(p=>p.map(v=>v/Math.sqrt(3)));
  const bent=a=>[[-Math.sin(rad(a/2)),Math.cos(rad(a/2)),0],[Math.sin(rad(a/2)),Math.cos(rad(a/2)),0]];
  const pyramid=a=>{const y=Math.sqrt((Math.cos(rad(a))+.5)/1.5),r=Math.sqrt(1-y*y);return Array.from({length:3},(_,i)=>[r*Math.cos(i*2*Math.PI/3),y,r*Math.sin(i*2*Math.PI/3)]);};
  const equatorial=Array.from({length:3},(_,i)=>[Math.sin(i*2*Math.PI/3),0,Math.cos(i*2*Math.PI/3)]);
  const bipyramid=[...equatorial,[0,-1,0],[0,1,0]];
  const octahedron=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  function star(name,center,outer,positions,geometry,angle,polarity,hybrid,notes='',orders=[]) {
    return {name,geometry,angle,polarity,hybrid,notes,atoms:[[center,0,0,0],...positions.map((p,i)=>[Array.isArray(outer)?outer[i]:outer,...p])],bonds:positions.map((_,i)=>[0,i+1,orders[i]||1]),angleAtoms:[1,0,2]};
  }
  function diatomic(name,a,b,order,polarity) {
    return {name,geometry:'Linear (diatomic)',angle:'N/A — two atoms',polarity,hybrid:'N/A — no central atom',notes:'A bond angle requires three atoms; a diatomic molecule has no bond angle.',atoms:[[a,-.55,0,0],[b,.55,0,0]],bonds:[[0,1,order]]};
  }
  const expanded='The hybridization shown is a traditional VSEPR classroom label. Modern bonding descriptions do not require substantial d-orbital hybridization.';
  window.MoleculeLibrary={
    H2O:star('Water','O','H',bent(104.5),'Bent','104.5°','Polar','sp³','Two oxygen lone pairs bend the molecule.'),
    CO2:star('Carbon dioxide','C','O',linear,'Linear','180°','Nonpolar','sp','The two C=O bond dipoles cancel by symmetry.',[2,2]),
    CH4:star('Methane','C','H',tetra,'Tetrahedral','109.5°','Nonpolar','sp³','Four equivalent C–H bonds point toward a tetrahedron’s vertices.'),
    NH3:star('Ammonia','N','H',pyramid(107),'Trigonal pyramidal','107°','Polar','sp³','One nitrogen lone pair compresses the bond angles.'),
    BF3:star('Boron trifluoride','B','F',planar,'Trigonal planar','120°','Nonpolar','sp²','Three equivalent B–F bonds lie in one plane.'),
    H2:diatomic('Hydrogen','H','H',1,'Nonpolar'),
    O2:diatomic('Oxygen','O','O',2,'Nonpolar'),
    N2:diatomic('Nitrogen','N','N',3,'Nonpolar'),
    HCl:diatomic('Hydrogen chloride','H','Cl',1,'Polar'),
    HF:diatomic('Hydrogen fluoride','H','F',1,'Polar'),
    HCN:star('Hydrogen cyanide','C',['H','N'],linear,'Linear','180°','Polar','sp','H–C≡N is linear but its unequal ends do not cancel the molecular dipole.',[1,3]),
    BeCl2:star('Beryllium chloride','Be','Cl',linear,'Linear','180°','Nonpolar','sp','Shown as an isolated gas-phase monomer. Solid beryllium chloride has a polymeric structure.'),
    BCl3:star('Boron trichloride','B','Cl',planar,'Trigonal planar','120°','Nonpolar','sp²','Symmetry cancels the three B–Cl bond dipoles.'),
    SiH4:star('Silane','Si','H',tetra,'Tetrahedral','109.5°','Nonpolar','sp³','Four equivalent bonds give a tetrahedral molecule.'),
    CCl4:star('Carbon tetrachloride','C','Cl',tetra,'Tetrahedral','109.5°','Nonpolar','sp³','Polar C–Cl bonds cancel in this symmetric tetrahedral arrangement.'),
    CH3Cl:star('Chloromethane','C',['H','H','H','Cl'],tetra,'Tetrahedral at C','≈109.5°','Polar','sp³','The idealized tetrahedral model has unlike substituents, so its bond dipoles do not cancel.'),
    NF3:star('Nitrogen trifluoride','N','F',pyramid(102.5),'Trigonal pyramidal','≈102.5°','Polar','sp³','Three bonds and one nitrogen lone pair give a pyramidal shape.'),
    OF2:star('Oxygen difluoride','O','F',bent(103),'Bent','≈103°','Polar','sp³','Two lone pairs on oxygen produce a bent molecular shape.'),
    SO2:star('Sulfur dioxide','S','O',bent(119.5),'Bent','≈119.5°','Polar','sp²','The two S–O bonds are equivalent through delocalized bonding. Double sticks are a simplified Lewis representation.',[2,2]),
    SO3:star('Sulfur trioxide','S','O',planar,'Trigonal planar','120°','Nonpolar','sp²','Shown as an isolated monomer. The S–O bonds are equivalent; double sticks are a simplified Lewis representation.',[2,2,2]),
    PCl5:star('Phosphorus pentachloride','P','Cl',bipyramid,'Trigonal bipyramidal','90°, 120°, 180°','Nonpolar','sp³d (traditional)','Gas-phase molecular form; solid PCl₅ has an ionic structure. '+expanded),
    SF4:star('Sulfur tetrafluoride','S','F',[[-Math.sin(rad(3.45)),-Math.cos(rad(3.45)),0],[-Math.sin(rad(3.45)),Math.cos(rad(3.45)),0],[-Math.cos(rad(50.8)),0,Math.sin(rad(50.8))],[-Math.cos(rad(50.8)),0,-Math.sin(rad(50.8))]],'Seesaw','≈88°, 102°, 173°','Polar','sp³d (traditional)','An equatorial lone pair distorts the trigonal-bipyramidal electron-domain arrangement. '+expanded),
    SF6:star('Sulfur hexafluoride','S','F',octahedron,'Octahedral','90°, 180°','Nonpolar','sp³d² (traditional)',expanded),
    XeF2:star('Xenon difluoride','Xe','F',linear,'Linear','180°','Nonpolar','sp³d (traditional)','Three equatorial lone pairs leave two opposite Xe–F bonds. '+expanded),
    XeF4:star('Xenon tetrafluoride','Xe','F',[[1,0,0],[0,1,0],[-1,0,0],[0,-1,0]],'Square planar','90°, 180°','Nonpolar','sp³d² (traditional)','Two opposite lone pairs leave four fluorines in a square plane. '+expanded)
  };
})();
