import {controls,defaults,settings,saveSettings} from './portrait-settings.mjs';
export function mountPortraitPanel({rebuild,pause,change}){
  const panel=document.createElement('aside');panel.id='portrait-panel';panel.setAttribute('aria-label','Réglages du portrait');
  panel.innerHTML=`<div class="tuner-heading"><strong>Portrait / réglages</strong><button type="button" id="tuner-toggle" aria-expanded="true" aria-controls="tuner-body">Réduire</button></div><div id="tuner-body"><p class="tuner-hint">Ajuste, puis rejoue l’apparition. Les autres réglages agissent en direct.</p><div class="tuner-actions"><button type="button" id="tuner-rebuild">↻ Rebuild portrait</button><button type="button" id="tuner-pause">Pause</button></div><div id="tuner-fields"></div><div class="tuner-actions"><button type="button" id="tuner-reset">Réinitialiser</button><button type="button" id="tuner-export">Exporter JSON</button></div><p id="tuner-status" role="status">Réglages conservés dans ce navigateur.</p></div>`;
  document.body.append(panel);const fields=panel.querySelector('#tuner-fields');
  let group,fieldset;
  for(const [section,key,label,min,max,step,,unit] of controls){
    if(group!==section){group=section;fieldset=document.createElement('fieldset');fieldset.innerHTML=`<legend>${section}</legend>`;fields.append(fieldset);}
    const row=document.createElement('div');row.className='tuner-control';row.innerHTML=`<label for="tune-${key}">${label}</label><output for="tune-${key}"></output><input id="tune-${key}" type="range" min="${min}" max="${max}" step="${step}" value="${settings[key]}">`;
    const input=row.querySelector('input'),output=row.querySelector('output');const render=()=>{input.value=settings[key];output.value=`${Number(settings[key].toFixed(2))} ${unit}`;};render();
    input.addEventListener('input',()=>{settings[key]=Number(input.value);render();change(key);panel.querySelector('#tuner-status').textContent=saveSettings()?'Réglages enregistrés.':'Réglages actifs pour cette session.';});row.render=render;fieldset.append(row);
  }
  panel.querySelector('#tuner-toggle').onclick=e=>{const body=panel.querySelector('#tuner-body');body.hidden=!body.hidden;e.currentTarget.setAttribute('aria-expanded',String(!body.hidden));e.currentTarget.textContent=body.hidden?'Ouvrir':'Réduire';};
  panel.querySelector('#tuner-rebuild').onclick=()=>{rebuild();};
  panel.querySelector('#tuner-pause').onclick=()=>pause();
  panel.querySelector('#tuner-reset').onclick=()=>{Object.assign(settings,defaults);saveSettings();for(const row of panel.querySelectorAll('.tuner-control'))row.render();change();rebuild();panel.querySelector('#tuner-status').textContent='Réglages initiaux restaurés.';};
  panel.querySelector('#tuner-export').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(settings,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='portrait-settings.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);panel.querySelector('#tuner-status').textContent='Fichier exporté pour partager tes réglages.';};
  return panel;
}
