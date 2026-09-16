export const panelEnabled=new URLSearchParams(globalThis.location?.search??'').get('settings')==='1';
export const controls=[
  ['Apparition','introSpeed','Élan à l’arrivée',.1,1,.05,.35,'×'],
  ['Apparition','fadeDuration','Durée du fondu',.1,3,.05,.7,'s'],
  ['Apparition','stagger','Décalage aléatoire',0,3,.05,.55,'s'],
  ['Apparition','spread','Dispersion au départ',0,5,.1,1,'×'],
  ['Apparition','entryCurve','Variété des courbes',0,1.5,.1,.7,'×'],
  ['Mouvement','dispersion','Dispersion à gauche',0,2,.05,1,'×'],
  ['Mouvement','rotationSmooth','Douceur des rotations',.3,3,.1,1,'×'],
  ['Souris','pointerForce','Intensité de la réaction',0,2,.1,1,'×'],
  ['Souris','pointerSwirl','Mouvement tournant',0,2,.1,1,'×'],
  ['Souris','pointerNoise','Irrégularité',0,1.5,.1,1,'×'],
];
export const defaults=Object.fromEntries(controls.map(([,key,,,,,value])=>[key,value]));
export const settings={...defaults};
try{const saved=panelEnabled?JSON.parse(localStorage.getItem('portrait-settings-v1')):null;for(const [,key,,min,max] of controls)if(Number.isFinite(saved?.[key]))settings[key]=Math.max(min,Math.min(max,saved[key]));}catch{}
export function saveSettings(){try{localStorage.setItem('portrait-settings-v1',JSON.stringify(settings));return true;}catch{return false;}}
