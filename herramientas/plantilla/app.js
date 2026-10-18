/* OpoMetro · motor del juego. Los datos llegan incrustados por herramientas/construir_opometro.py */
const Q=/*__PREGUNTAS__*/[];
const C=/*__CONTENIDO__*/{};
const MARCA=/*__MARCA__*/{};
const IMAGENES=/*__IMAGENES__*/{};
const VIDEOS=C.videos||[];
const FICHAS=C.fichas||{},ESCALAS=C.escalas||[],CONCEPTOS=C.conceptos||{},TRAMPAS=C.trampas||[],CASOS=C.casos||[];

/* ---------- iconos propios (24 × 24, trazo) ---------- */
const P={
 metro:'<rect x="5" y="2.5" width="14" height="14.5" rx="4"/><path d="M5 10h14M9.5 5.8h5"/><circle cx="9" cy="13.4" r=".9"/><circle cx="15" cy="13.4" r=".9"/><path d="M8.5 17l-2.3 4.5M15.5 17l2.3 4.5M7.3 19.5h9.4"/>',
 crono:'<circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.6 2M10 2.5h4M12 2.5v3.5M18.2 6.3l1.5-1.5"/>',
 repaso:'<path d="M19.5 11A7.6 7.6 0 0 0 6.1 6.6L4.5 8.3"/><path d="M4.5 3.8v4.5H9"/><path d="M4.5 13a7.6 7.6 0 0 0 13.4 4.4l1.6-1.7"/><path d="M19.5 20.2v-4.5H15"/>',
 cartas:'<rect x="3.5" y="6.5" width="11" height="14" rx="2.2"/><path d="M8.5 6.5V5.3a2 2 0 0 1 2-2H18.5a2 2 0 0 1 2 2V16a2 2 0 0 1-2 2h-4"/><path d="M6.5 11h5M6.5 14h5M6.5 17h3"/>',
 grafica:'<path d="M3.5 20.5h17"/><rect x="5" y="12" width="3.2" height="6" rx="1"/><rect x="10.4" y="8" width="3.2" height="10" rx="1"/><rect x="15.8" y="4" width="3.2" height="14" rx="1"/>',
 trampa:'<path d="M12 2.8 21.2 12 12 21.2 2.8 12z"/><path d="M12 8v5"/><circle cx="12" cy="16.1" r=".7" fill="currentColor"/>',
 fonendo:'<path d="M5.5 3v5.2a4.5 4.5 0 0 0 9 0V3"/><path d="M4 3h3M13 3h3"/><path d="M10 12.7v1.8a5 5 0 0 0 10 0v-2.2"/><circle cx="20" cy="10.3" r="2"/>',
 matraz:'<path d="M9 3h6M10 3v6.2L4.6 18.3A2 2 0 0 0 6.3 21.3h11.4a2 2 0 0 0 1.7-3L14 9.2V3"/><path d="M7.2 15h9.6"/>',
 informe:'<path d="M7 2.8h7l5 5v13.4H7a2 2 0 0 1-2-2V4.8a2 2 0 0 1 2-2z"/><path d="M14 2.8v5h5"/><path d="M9 17.5v-3M12 17.5v-5.5M15 17.5v-2"/>',
 arena:'<path d="M6.5 3h11M6.5 21h11"/><path d="M8 3v3.2a4 4 0 0 0 1.4 3L12 12l2.6-2.8A4 4 0 0 0 16 6.2V3M8 21v-3.2a4 4 0 0 1 1.4-3L12 12l2.6 2.8a4 4 0 0 1 1.4 3V21"/>',
 lupa:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m20 20-4.4-4.4"/>',
 sonido:'<path d="M4 9.3v5.4h3.6L12.5 19V5L7.6 9.3z"/><path d="M16 8.6a4.8 4.8 0 0 1 0 6.8M18.6 6a8.4 8.4 0 0 1 0 12"/>',
 mudo:'<path d="M4 9.3v5.4h3.6L12.5 19V5L7.6 9.3z"/><path d="m16.5 9.5 5 5M21.5 9.5l-5 5"/>',
 ok:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
 ko:'<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
 estoma:'<path d="M8 3.5h8a3 3 0 0 1 3 3V15a6.5 6.5 0 0 1-6.5 6.5h-1A6.5 6.5 0 0 1 5 15V6.5a3 3 0 0 1 3-3z"/><circle cx="12" cy="10" r="3.4"/><circle cx="12" cy="10" r="1.1"/><path d="M8.5 17.5h7"/>',
 play:'<circle cx="12" cy="12" r="9.2"/><path d="M10 8.4v7.2l6-3.6z" fill="currentColor"/>',
 bombilla:'<path d="M9.3 18h5.4M10.2 21h3.6"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2.2h5.2c0-1 .4-1.7 1-2.2A6 6 0 0 0 12 3z"/>',
 duda:'<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1.1 1-1.1 1.7v.5"/><circle cx="12" cy="16.9" r=".7" fill="currentColor"/>',
 llama:'<path d="M12 2.8c.9 3.6 5.2 5.3 5.2 10.3a5.2 5.2 0 0 1-10.4 0c0-2.1 1-3.6 2.1-4.7.3 1.6 1 2.6 2.1 3.1-.1-3.1-.1-5.6 1-8.7z"/>',
 medalla:'<circle cx="12" cy="14.8" r="5.3"/><path d="M8.6 2.8 10.5 9.8M15.4 2.8l-1.9 7"/><path d="m12 12.4 1 1.9 2 .3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.4 2-.3z"/>',
 flecha:'<path d="M15 18l-6-6 6-6"/>',
 adelante:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 objetivo:'<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
 colon:'<path d="M7.5 20.5V8.2a3.2 3.2 0 0 1 3.2-3.2h3.1a3.2 3.2 0 0 1 3.2 3.2v7.3a3 3 0 0 1-3 3h-1.6"/><path d="M7.5 8.5h9.5"/>',
 heces:'<path d="M5 17.5c-1.2-2.8.8-5 3.3-4.6-.4-2.8 2.4-4.6 4.7-3.4.6-2 3-2.7 4.3-1.2 1.8 2 .3 4.2.3 4.2 2.4.8 2.5 4.6.2 5H5z"/>',
 cuchara:'<ellipse cx="15.5" cy="7.5" rx="4.2" ry="3.4" transform="rotate(-45 15.5 7.5)"/><path d="m12.6 10.4-8.4 8.4a1.4 1.4 0 0 0 2 2l8.4-8.4"/>',
 descarga:'<path d="M12 3.5v11M7.5 10l4.5 4.5 4.5-4.5"/><path d="M4.5 16.5v2.2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2.2"/>',
 imprimir:'<path d="M6.5 9V3.5h11V9"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><path d="M6.5 14.5h11v6h-11z"/>',
 casa:'<path d="M3.5 11 12 4l8.5 7"/><path d="M5.8 9.5v10.2h12.4V9.5"/>',
 nube:'<path d="M7 18.5a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.5 1.8A3.6 3.6 0 0 1 17.5 18.5z"/><path d="m9.5 14 2 2 3.5-3.5"/>',
 billete:'<path d="M3.5 7.5a2 2 0 0 0 2-2h13a2 2 0 0 0 2 2v9a2 2 0 0 0-2 2h-13a2 2 0 0 0-2-2z"/><path d="M9 5.5v13" stroke-dasharray="1.6 2.2"/>'
};
const I=(n,c='')=>`<svg class="i ${c}" viewBox="0 0 24 24" aria-hidden="true">${P[n]||''}</svg>`;
const TRAIN=`<svg viewBox="0 0 34 20" aria-hidden="true"><path d="M3 15V7.5A4.5 4.5 0 0 1 7.5 3H24c4.5 0 7 4 7 8.5V15z" fill="currentColor"/><rect x="7" y="6" width="5" height="4" rx="1" fill="#fff"/><rect x="14" y="6" width="5" height="4" rx="1" fill="#fff"/><path d="M23 6h2.6c1.6 0 2.8 1.6 3.1 4H23z" fill="#fff"/><circle cx="9" cy="16.5" r="2" fill="#0b2a55"/><circle cx="24" cy="16.5" r="2" fill="#0b2a55"/></svg>`;

const LINES={1:{name:'Línea 1 · Tubo digestivo',c:'#0aa8e5'},2:{name:'Línea 2 · Glándulas anejas',c:'#12a37a'},3:{name:'Línea 3 · Cuidados enfermeros',c:'#6a5ae0'},C:{name:'Estación Central',c:'#0b2a55'}};
const ST=[
 {id:'anat',name:'Estación Central',sub:'Anatomía y fisiología',line:'C',x:440,y:260,lx:462,ly:302,la:'start'},
 {id:'boca',name:'Boca y esófago',sub:'Disfagia, ERGE y salud bucodental',line:1,x:90,y:130,lx:90,ly:178,la:'middle'},
 {id:'estom',name:'Estómago',sub:'Úlcera, H. pylori y dumping',line:1,x:290,y:130,lx:290,ly:72,la:'middle'},
 {id:'intestino',name:'Intestinos',sub:'EII, Bristol y cribado del CCR',line:1,x:640,y:260,lx:660,ly:200,la:'middle'},
 {id:'agudo',name:'Abdomen agudo',sub:'Apendicitis, obstrucción y signos',line:1,x:910,y:380,lx:935,ly:428,la:'end'},
 {id:'higado',name:'Hígado',sub:'Cirrosis, ascitis y encefalopatía',line:2,x:660,y:130,lx:660,ly:72,la:'middle'},
 {id:'bilipan',name:'Vía biliar y páncreas',sub:'Charcot, Murphy y pancreatitis',line:2,x:880,y:130,lx:950,ly:72,la:'end'},
 {id:'valor',name:'Valoración',sub:'Síntomas, heces, hemorragia y pruebas',line:3,x:440,y:390,lx:466,ly:396,la:'start'},
 {id:'sondas',name:'Sondas y enemas',sub:'Tipos, inserción y verificación',line:3,x:340,y:490,lx:340,ly:532,la:'middle'},
 {id:'ostom',name:'Ostomías y PEG',sub:'Estomas, heces y cuidados',line:3,x:100,y:490,lx:100,ly:532,la:'middle'}
];
const stById=Object.fromEntries(ST.map(s=>[s.id,s]));
const colorOf=s=>LINES[stById[s].line].c;
const ALL=Q;                                 /* jugables: válidas + obsoletas (las anuladas no se publican) */
const EXAM=Q.filter(q=>!q.st);               /* simulacro: solo preguntas vigentes tal cual salieron */
const OBS=Q.filter(q=>q.st==='O');
const byId=Object.fromEntries(Q.map(q=>[q.id,q]));
const DOCENTE=/[?&]docente=1\b/.test(location.search);
const L='abcde',DAY=864e5,RECENT=2022,GOAL=20;
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const pct=(a,b)=>b?Math.round(a*100/b):0;
const uniq=a=>[...new Set(a)];
const today=()=>new Date().toISOString().slice(0,10);
const why=t=>esc(t).replace(/^ANTES:/,'<span class="tag2 antes">ANTES</span>').replace(/ HOY:/,' <span class="tag2 hoy">HOY</span>');

/* ---------- progreso ---------- */
const KEY='opolab-digestivo-v1';
function load(){try{const v=JSON.parse(localStorage.getItem(KEY));return v&&v.q?v:null}catch(e){return null}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}SC.commit()}
let S=load()||{q:{},sims:[],esc:{best:0}};
S.lab=S.lab||{};S.days=S.days||{};S.badges=S.badges||[];if(S.snd===undefined)S.snd=true;S.best=S.best||0;
const rec=id=>S.q[id]||(S.q[id]={n:0,ok:0,st:0,r:0,lv:0,due:0});
const isMastered=id=>!!(S.q[id]&&S.q[id].st>=2);
const isPending=id=>!!(S.q[id]&&S.q[id].r);
const isDue=id=>isPending(id)&&(S.q[id].due||0)<=Date.now();
const INTERVAL=[0,1,3,7];
/* Repaso espaciado: un fallo vuelve hoy; cada acierto seguro en repaso lo aleja (1, 3 y 7 días) hasta salir de la cola. */
function register(id,ok,sure,silent){
  const r=rec(id);r.n++;S.days[today()]=(S.days[today()]||0)+1;
  if(!ok){r.st=0;r.r=1;r.lv=0;r.due=0}
  else if(!sure){r.ok++;r.r=1;r.due=Date.now()+DAY}
  else{r.ok++;r.st++;if(r.r){r.lv=(r.lv||0)+1;if(r.lv>=INTERVAL.length){r.r=0;r.lv=0;r.due=0}else r.due=Date.now()+INTERVAL[r.lv]*DAY}}
  if(!silent){save();checkBadges()}
}
function statsOf(qs){return {total:qs.length,mastered:qs.filter(q=>isMastered(q.id)).length,pending:qs.filter(q=>isPending(q.id)).length,due:qs.filter(q=>isDue(q.id)).length,seen:qs.filter(q=>S.q[q.id]&&S.q[q.id].n).length,
  n:qs.reduce((a,q)=>a+(S.q[q.id]?S.q[q.id].n:0),0),ok:qs.reduce((a,q)=>a+(S.q[q.id]?S.q[q.id].ok:0),0)}}
const stationStats=sid=>statsOf(ALL.filter(q=>q.s===sid));
function globalStats(){const t=statsOf(ALL);t.acc=pct(t.ok,t.n);
  t.next=ALL.filter(q=>isPending(q.id)&&!isDue(q.id)).map(q=>S.q[q.id].due).sort((a,b)=>a-b)[0];return t}
function dayStreak(){let n=0;const d=new Date();if(!S.days[today()])d.setDate(d.getDate()-1);
  for(;;){const k=d.toISOString().slice(0,10);if(S.days[k]){n++;d.setDate(d.getDate()-1)}else break}return n}

/* ---------- insignias ---------- */
const BADGES=[
 ...ST.map(s=>({id:'st50-'+s.id,t:s.name,d:'50 % dominado',c:LINES[s.line].c,test:()=>{const t=stationStats(s.id);return t.mastered*2>=t.total}})),
 ...ST.map(s=>({id:'st100-'+s.id,t:s.name+' · oro',d:'100 % dominado',c:'#c9971c',test:()=>{const t=stationStats(s.id);return t.mastered===t.total}})),
 {id:'sim1',t:'Primer simulacro',d:'Has completado un simulacro',c:'#3c3fb8',test:()=>S.sims.length>0},
 {id:'sim7',t:'Aprobado OPE',d:'Un simulacro con nota ≥ 7',c:'#3c3fb8',test:()=>S.sims.some(x=>x.nota>=7)},
 {id:'racha10',t:'Tren exprés',d:'10 aciertos seguidos',c:'#d9480f',test:()=>S.best>=10},
 {id:'dias3',t:'Constancia',d:'3 días seguidos estudiando',c:'#d9480f',test:()=>dayStreak()>=3},
 {id:'obs',t:'Al día',d:'Todas las obsoletas acertadas',c:'#b7791f',test:()=>OBS.length&&OBS.every(q=>S.q[q.id]&&S.q[q.id].ok)},
 {id:'osto',t:'Estomaterapeuta',d:'Lámina de las ostomías sin un fallo',c:'#d23f57',test:()=>(S.lab.osto||0)>=OSTO_MAX},
 {id:'lab',t:'Laboratorio',d:'Colon y Bristol completos',c:'#6a5ae0',test:()=>(S.lab.colon||0)>=6&&(S.lab.bristol||0)>=7}
];
function checkBadges(){
  const nuevos=BADGES.filter(b=>!S.badges.includes(b.id)&&b.test());
  if(!nuevos.length)return;
  nuevos.forEach(b=>S.badges.push(b.id));save();
  toast(I('medalla')+`Insignia conseguida: <b>${esc(nuevos[0].t)}</b>`);SND.badge();
}

/* ---------- sonido (sintetizado, sin archivos) ---------- */
const SND={ctx:null,
  ac(){if(!S.snd)return null;try{this.ctx=this.ctx||new (window.AudioContext||window.webkitAudioContext)();if(this.ctx.state==='suspended')this.ctx.resume();return this.ctx}catch(e){return null}},
  tone(f,t,d,type='sine',v=.12){const c=this.ac();if(!c)return;const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=f;
    const s=c.currentTime+t;g.gain.setValueAtTime(0,s);g.gain.linearRampToValueAtTime(v,s+.015);g.gain.exponentialRampToValueAtTime(.0008,s+d);o.connect(g).connect(c.destination);o.start(s);o.stop(s+d+.05)},
  ok(){this.tone(659.3,0,.5);this.tone(987.8,.13,.7)},                          /* «ding-dong» de andén */
  ko(){this.tone(196,0,.22,'triangle',.14);this.tone(155.6,.15,.32,'triangle',.12)},
  combo(){[784,988,1175,1568].forEach((f,i)=>this.tone(f,i*.07,.25,'sine',.09))},
  badge(){[523.3,659.3,784,1046.5].forEach((f,i)=>this.tone(f,i*.11,.55,'sine',.1))},
  arrive(){this.tone(784,0,.6);this.tone(659.3,.22,.6);this.tone(523.3,.44,.9)},  /* llegada a estación */
  tick(){this.tone(1400,0,.04,'square',.03)}
};

/* ---------- SCORM 1.2 (solo si la plataforma lo ofrece) ---------- */
const SC={api:null,
  init(){let w=window;for(let i=0;i<10&&w;i++){try{if(w.API){this.api=w.API;break}}catch(e){break}if(w.parent===w)break;w=w.parent}
    if(!this.api&&window.opener){try{this.api=window.opener.API||null}catch(e){}}
    if(!this.api)return;
    try{this.api.LMSInitialize('')}catch(e){this.api=null;return}
    const d=this.get('cmi.suspend_data');if(d&&!Object.keys(S.q).length)this.unpack(d);
    window.addEventListener('pagehide',()=>{this.commit();try{this.api.LMSFinish('')}catch(e){}});},
  get(k){try{return this.api.LMSGetValue(k)||''}catch(e){return ''}},
  set(k,v){try{this.api.LMSSetValue(k,String(v))}catch(e){}},
  pack(){const m=[],p=[];for(const [id,r] of Object.entries(S.q)){if(!/^\d+$/.test(id))continue;if(r.st>=2)m.push((+id).toString(36));if(r.r)p.push((+id).toString(36))}return 'v1;m='+m.join(',')+';p='+p.join(',')},
  unpack(d){try{const o=Object.fromEntries(d.split(';').slice(1).map(x=>x.split('=')));(o.m||'').split(',').filter(Boolean).forEach(x=>{const r=rec(parseInt(x,36));r.n=Math.max(r.n,2);r.ok=Math.max(r.ok,2);r.st=2});(o.p||'').split(',').filter(Boolean).forEach(x=>{const r=rec(parseInt(x,36));r.n=Math.max(r.n,1);r.r=1})}catch(e){}},
  commit(){if(!this.api)return;const g=statsOf(ALL),sc=pct(g.mastered,g.total);
    this.set('cmi.core.score.min',0);this.set('cmi.core.score.max',100);this.set('cmi.core.score.raw',sc);
    this.set('cmi.core.lesson_status',sc>=80?'completed':'incomplete');this.set('cmi.suspend_data',this.pack().slice(0,4000));
    try{this.api.LMSCommit('')}catch(e){}}
};

/* ---------- utilidades de vista ---------- */
const app=$('#app');
let lastView='home';
function render(html,color){
  app.style.setProperty('--lc',color||'var(--cyan)');
  app.innerHTML=html;
  if(self!==top){app.scrollIntoView({block:'start'})}else{window.scrollTo(0,0)}
}
const backBtn=(to='home',txt='Mapa')=>`<div class="back noPrint"><button class="btn ghost" data-go="${to}">${I('flecha')}${txt}</button></div>`;
const heroBox=(eb,t,p,c)=>`<section class="stHero" style="--lc:${c}"><div class="eyebrow">${eb}</div><h1>${t}</h1><p>${p}</p></section>`;
function toast(html,top){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';t.setAttribute('role','status');document.body.appendChild(t)}
  t.classList.toggle('top',!!top);t.innerHTML=html;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2600)}
function ringSVG(p,size,color,label,sub){const R=size/2-9,Cc=2*Math.PI*R;return `<svg class="ring" viewBox="0 0 ${size} ${size}" style="width:${size}px;height:${size}px"><circle cx="${size/2}" cy="${size/2}" r="${R}" fill="none" stroke="#e7eef6" stroke-width="10"/>${p>0?`<circle cx="${size/2}" cy="${size/2}" r="${R}" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${(Cc*Math.min(p,1)).toFixed(1)} ${Cc.toFixed(1)}" transform="rotate(-90 ${size/2} ${size/2})"/>`:''}<text x="50%" y="${sub?'47%':'55%'}" text-anchor="middle" font-size="${size/4.6}" font-weight="800" fill="#0b2a55">${label}</text>${sub?`<text x="50%" y="66%" text-anchor="middle" font-size="${size/9}" font-weight="700" fill="#5d7089">${sub}</text>`:''}</svg>`}

/* ---------- cabecera ---------- */
function topbar(){
  const logo=MARCA['logo-oposalud']?`<img src="${MARCA['logo-oposalud']}" alt="Oposalud">`:
    `<span class="wm"><span class="mark"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="7.5"/><path d="M12 8.5v7M8.5 12h7"/></svg></span><b>Oposalud</b></span>`;
  $('#top').innerHTML=`<a class="logo" href="../../" title="Volver a OpoLab">${logo}<span class="sep"></span><span class="lab">OpoLab · Digestivo</span></a>
  <div class="tools noPrint"><button class="ibtn" data-go="buscar" title="Buscar preguntas" aria-label="Buscar preguntas">${I('lupa')}</button>
  <button class="ibtn ${S.snd?'':'off'}" data-snd title="${S.snd?'Silenciar':'Activar sonido'}" aria-label="Sonido">${I(S.snd?'sonido':'mudo')}</button>
  <button class="ibtn" data-go="informe" title="Mi informe" aria-label="Mi informe">${I('informe')}</button></div>`;
}

/* ---------- portada ---------- */
function home(){
  lastView='home';
  const g=globalStats(),hoy=S.days[today()]||0,racha=dayStreak();
  const lines=[1,2,3].map(k=>`<span class="lpill"><i style="background:${LINES[k].c}"></i>${LINES[k].name.split(' · ')[1]}</span>`).join('');
  const modes=[
    {k:'dia',ic:'objetivo',c:'#0aa8e5',t:'Viaje del día',d:'10 preguntas a tu medida: primero lo que toca repasar y luego lo que más cae.',m:`${hoy}/${GOAL} hoy`},
    {k:'sim',ic:'crono',c:'#3c3fb8',t:'Simulacro OPE',d:'Como el examen: filtra por comunidad, con cronómetro y −1/3 por error.',m:`${EXAM.length} preguntas`},
    {k:'repaso',ic:'repaso',c:'#d23f57',t:'Repaso inteligente',d:'Tus fallos vuelven hoy, mañana, a los 3 y a los 7 días.',m:g.due?`${g.due} para hoy`:'Al día',badge:g.due},
    {k:'cae',ic:'grafica',c:'#c27a12',t:'Lo que más cae',d:'Los conceptos que más repiten los tribunales, ordenados.',m:`${Object.keys(CONCEPTOS).length} conceptos`},
    {k:'trampas',ic:'trampa',c:'#d23f57',t:'Trampas del tribunal',d:'Los engaños de siempre y por qué falla cada opción.',m:`${TRAMPAS.length} trampas`},
    {k:'casos',ic:'fonendo',c:'#0b7bc0',t:'Supuestos clínicos',d:'Un paciente, varias preguntas encadenadas.',m:`${CASOS.length} casos`},
    {k:'escalas',ic:'cartas',c:'#12a37a',t:'OpoEscalas exprés',d:'Signos, escalas, tríadas, maniobras y sondas.',m:`${ESCALAS.length} tarjetas`},
    {k:'lab',ic:'matraz',c:'#6a5ae0',t:'Laboratorio visual',d:'Nueva: la lámina de las ostomías de clase. Y además colon, Bristol y MECV-V.',m:(IMAGENES.ostomias?4:3)+' actividades'}
  ].map(m=>`<button class="mode" style="--tc:${m.c}" data-go="${m.k}"><span class="tile">${I(m.ic)}</span><h3>${m.t}</h3><p>${m.d}</p><span class="meta">${m.m}</span>${m.badge?`<span class="badge">${m.badge}</span>`:''}</button>`).join('');
  render(`
  <section class="hero">
    <div class="heroTxt">${heroArt()}
      <div class="eyebrow">OpoLab · Tema 15 · Digestivo</div>
      <h1>Opo<span>Metro</span><br>Digestivo</h1>
      <p>Recorre el aparato digestivo como una red de metro: ${ST.length} estaciones, ${EXAM.length} preguntas reales de OPE (2008-2026) explicadas, ${OBS.length} preguntas obsoletas para actualizarte y ${CASOS.length} supuestos clínicos.</p>
      <div class="lines">${lines}</div>
    </div>
    <div class="ticket">
      <div class="tkHead"><b>TU BILLETE</b><span>Trayecto: Digestivo</span></div>
      <div class="goal">${ringSVG(hoy/GOAL,84,hoy>=GOAL?'#12936a':'#0aa8e5',Math.min(hoy,99),'/'+GOAL)}
        <div><h4>${hoy>=GOAL?'Meta de hoy cumplida':'Tu meta de hoy'}</h4><p>${hoy>=GOAL?'Buen trabajo: mañana, más.':`Responde ${GOAL-hoy} preguntas más para cumplirla.`}</p>
        ${racha?`<span class="streak">${I('llama')}${racha} ${racha===1?'día':'días'} seguidos</span>`:''}</div></div>
      <div class="stats">
        <div class="stat"><b>${g.mastered}</b><span>dominadas</span></div>
        <div class="stat"><b>${g.n?g.acc+'%':'—'}</b><span>precisión</span></div>
        <div class="stat"><b>${g.due}</b><span>repasar hoy</span></div>
      </div>
      <div><div class="bar"><i style="width:${pct(g.mastered,ALL.length)}%"></i></div><div class="small" style="margin-top:6px">${pct(g.mastered,ALL.length)} % del tema dominado. Una pregunta se domina al acertarla dos veces con seguridad.</div></div>
      ${SC.api?`<span class="lmsTag">${I('nube')}Progreso sincronizado con la plataforma</span>`:''}
      <div class="tkFoot"><button class="btn primary" data-go="${g.due?'repaso':'dia'}">${g.due?'Repasar lo de hoy':'Empezar el viaje del día'}${I('adelante')}</button></div>
    </div>
  </section>
  <div class="sectionTitle"><div><span class="eyebrow">Cómo quieres estudiar</span><h2>Modos de juego</h2></div></div>
  ${VIDEOS.length?`<button class="vBanner" data-go="capsulas"><span class="vPlay">${I('play')}</span><span><span class="eyebrow">Nuevo · cápsulas de vídeo</span><b>${esc(VIDEOS[0].t)}</b><small>${esc(VIDEOS[0].d)}</small></span><span class="vGo">${VIDEOS.length>1?'Ver las '+VIDEOS.length+' cápsulas':'Ver ahora'}${I('adelante')}</span></button>`:''}
  <section class="modes">${modes}</section>
  <div class="sectionTitle"><div><span class="eyebrow">10 estaciones · 3 líneas</span><h2>Mapa de la red</h2></div><span class="small">Pulsa una estación</span></div>
  <section class="mapCard" aria-label="Mapa de estaciones">${mapSVG()}
    <div class="legend">${[1,2,3].map(k=>`<span><i style="background:${LINES[k].c}"></i>${LINES[k].name}</span>`).join('')}</div>
  </section>
  <section class="stations">${ST.map(stCard).join('')}</section>
  <section class="metroV">${metroV()}</section>
  <div class="sectionTitle"><div><span class="eyebrow">Laboratorio crítico</span><h2>Lo que ya no es verdad</h2></div></div>
  <section class="modes" style="grid-template-columns:1fr">
    <button class="mode wide" style="--tc:#b7791f" data-go="archivo"><span class="tile">${I('arena')}</span><span><h3>Preguntas obsoletas</h3><p>${OBS.length} preguntas que salieron con un criterio que hoy ya no se aplica. Respóndelas según la evidencia actual y descubre qué cambió y por qué: también entran en tu repaso.</p></span></button>
  </section>
  <div style="text-align:center"><button class="reset" data-reset type="button">Reiniciar mi progreso en este navegador</button></div>`);
}
function heroArt(){
  return `<svg class="heroArt" viewBox="0 0 240 380" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
    <path d="M50 400 V260 L130 180 H260" stroke="rgba(10,168,229,.45)" stroke-width="13" stroke-dasharray="520" stroke-dashoffset="520" style="animation:dash 2s ease forwards .2s"/>
    <path d="M130 180 L200 110 H260" stroke="rgba(18,163,122,.45)" stroke-width="13" stroke-dasharray="300" stroke-dashoffset="300" style="animation:dash 1.6s ease forwards .7s"/>
    <path d="M160 400 V340 L215 285 H260" stroke="rgba(106,90,224,.5)" stroke-width="13" stroke-dasharray="300" stroke-dashoffset="300" style="animation:dash 1.6s ease forwards 1s"/>
    <circle cx="130" cy="180" r="11" fill="#0b2a55" stroke="#fff" stroke-width="5"/>
    <circle r="6" fill="#fff"><animateMotion dur="6s" repeatCount="indefinite" path="M50 400 V260 L130 180 H260"/></circle>
  </svg>`;
}
function stCard(s){
  const t=stationStats(s.id),c=LINES[s.line].c,md=S.badges.includes('st100-'+s.id)?'oro':S.badges.includes('st50-'+s.id)?'50 %':'';
  return `<button class="stCard" style="--lc:${c}" data-st="${s.id}"><b>${s.name}</b><span>${s.sub}</span><div class="mini"><i style="width:${pct(t.mastered,t.total)}%"></i></div><small><span>${t.mastered}/${t.total} dominadas</span>${md?`<span class="medal">${I('medalla')}${md}</span>`:t.due?`<span>${t.due} hoy</span>`:''}</small></button>`;
}
function metroV(){
  const groups=[['C',['anat']],[1,['boca','estom','intestino','agudo']],[2,['higado','bilipan']],[3,['valor','sondas','ostom']]];
  return groups.map(([k,ids])=>`<div class="mvLine">${LINES[k].name.toUpperCase()}</div>`+ids.map((id,i)=>{const s=stById[id],t=stationStats(id);
    return `<button class="mv${i===0?' first':''}${i===ids.length-1?' last':''}" style="--lc:${LINES[k].c}" data-st="${id}"><span class="d"></span><span><b>${s.name}</b><span>${s.sub}</span></span><em>${pct(t.mastered,t.total)} %</em></button>`}).join('')).join('');
}
function mapSVG(){
  const paths={1:'M90,130 H310 L440,260 H640 L760,380 H910',2:'M440,260 L570,130 H880',3:'M440,260 V390 L340,490 H100'};
  let h=`<svg viewBox="20 40 960 530" role="img" aria-label="Mapa de metro del aparato digestivo">`;
  for(const k of [3,2,1]) h+=`<path d="${paths[k]}" fill="none" stroke="${LINES[k].c}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`;
  h+=`<text x="60" y="95" font-size="13" font-weight="800" fill="${LINES[1].c}" letter-spacing="1">BOCA ▸</text><text x="942" y="385" font-size="13" font-weight="800" fill="${LINES[1].c}" letter-spacing="1">ANO</text>`;
  for(const s of ST){
    const t=stationStats(s.id),c=LINES[s.line].c,big=s.line==='C';
    const R=big?26:22,Cc=2*Math.PI*R,p=t.total?t.mastered/t.total:0;
    h+=`<g class="st" data-st="${s.id}" tabindex="0" role="button" aria-label="${esc(s.name)}: ${t.mastered} de ${t.total} dominadas">
      <circle cx="${s.x}" cy="${s.y}" r="${R}" fill="#fff" stroke="#e3ebf3" stroke-width="6"/>
      ${p>0?`<circle cx="${s.x}" cy="${s.y}" r="${R}" fill="none" stroke="${c}" stroke-width="6" stroke-dasharray="${(Cc*p).toFixed(1)} ${Cc.toFixed(1)}" transform="rotate(-90 ${s.x} ${s.y})" stroke-linecap="round"/>`:''}
      <circle class="node" cx="${s.x}" cy="${s.y}" r="${big?18:15}" fill="${big?'#0b2a55':'#fff'}" stroke="${big?'#0b2a55':c}" stroke-width="5"/>
      ${big?`<text x="${s.x}" y="${s.y+5}" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">C</text>`:''}
      <text x="${s.lx}" y="${s.ly}" font-size="19" font-weight="800" fill="#0f2440" text-anchor="${s.la}">${esc(s.name)}</text>
      <text x="${s.lx}" y="${s.ly+19}" font-size="13" font-weight="600" fill="#5d7089" text-anchor="${s.la}">${t.mastered}/${t.total} dominadas</text>
    </g>`;
  }
  return h+`</svg>`;
}

/* ---------- estación ---------- */
function station(sid){
  lastView='st:'+sid;
  const s=stById[sid],t=stationStats(sid),c=LINES[s.line].c;
  const fichas=(FICHAS[sid]||[]).map((f,i)=>`<li data-n="${i+1}">${f}</li>`).join('');
  const casos=CASOS.filter(k=>k.s===sid),obs=OBS.filter(q=>q.s===sid).length;
  render(`${backBtn()}
  ${heroBox(LINES[s.line].name,s.name,s.sub,c)}
  <section class="grid2">
    <div class="card"><h3>Antes de subir: claves de la estación</h3><ul class="claves">${fichas}</ul></div>
    <div class="card">
      <h3>Tu progreso aquí</h3>
      <div class="kv"><span>Preguntas</span><b>${t.total}${obs?` <span class="small">(${obs} obsoleta${obs>1?'s':''})</span>`:''}</b></div>
      <div class="kv"><span>Dominadas</span><b>${t.mastered}</b></div>
      <div class="kv"><span>En repaso</span><b>${t.pending}</b></div>
      <div class="kv"><span>Sin ver todavía</span><b>${t.total-t.seen}</b></div>
      <div class="bar" style="margin-top:8px"><i style="width:${pct(t.mastered,t.total)}%;background:${c}"></i></div>
      <div class="actions" style="margin-top:14px">
        <button class="btn line" data-trip="${sid}" data-n="10">Viajar: 10 preguntas${I('adelante')}</button>
        <button class="btn ghost" data-trip="${sid}" data-n="all">Todas las de la estación (${t.total})</button>
        ${t.pending?`<button class="btn ghost" data-trip="${sid}" data-n="pend">Solo las que están en repaso (${t.pending})</button>`:''}
        ${casos.map(k=>`<button class="btn ghost" data-caso="${k.id}">${I('fonendo')}Supuesto: ${esc(k.t)}</button>`).join('')}
      </div>
      <p class="small" style="margin-top:12px">Primero salen las que tienes pendientes y las que no has visto. Al acertar, indica si lo sabías o has dudado: así el repaso es honesto.</p>
    </div>
  </section>`,c);
}
function prioritize(pool,n){
  const rank=q=>isDue(q.id)?0:!S.q[q.id]?1:!isMastered(q.id)?2:3;
  pool=shuffle(pool).sort((a,b)=>rank(a)-rank(b));
  return n==='all'?pool:pool.slice(0,+n);
}
function pickTrip(sid,n){const pool=ALL.filter(q=>q.s===sid);return n==='pend'?shuffle(pool.filter(q=>isPending(q.id))):prioritize(pool,n)}
function dailyTrip(){
  const due=shuffle(ALL.filter(q=>isDue(q.id))).slice(0,5);
  const freq={};ALL.forEach(q=>freq[q.t]=(freq[q.t]||0)+1);
  const rest=ALL.filter(q=>!due.includes(q)&&!isMastered(q.id)).map(q=>({q,w:Math.random()*(1+freq[q.t]/10)*(S.q[q.id]?0.6:1)})).sort((a,b)=>b.w-a.w).map(x=>x.q);
  return shuffle([...due,...rest.slice(0,10-due.length)]);
}

/* ---------- motor de preguntas ---------- */
let G=null;
function startQuiz(items,opt){
  if(!items.length){emptyMsg();return}
  G=Object.assign({items:items.map(q=>({q,order:q.ns?[...q.o.keys()]:shuffle([...q.o.keys()]),pick:null,ok:null})),i:0,color:'var(--cyan)',back:'home',t0:Date.now(),combo:0,prevPct:0},opt);
  drawQ();
  if(G.secs){G.left=G.secs;clearInterval(G.tm);G.tm=setInterval(tickTimer,1000)}
}
function tickTimer(){
  if(!G||!G.secs){return}
  G.left--;const el=$('.timer');
  if(el){el.textContent=fmtT(G.left);el.classList.toggle('low',G.left<=60)}
  if(G.left<=0){clearInterval(G.tm);toast(I('crono')+'Se acabó el tiempo: examen entregado');finish()}
}
const fmtT=s=>`${Math.floor(Math.max(s,0)/60)}:${String(Math.max(s,0)%60).padStart(2,'0')}`;
function emptyMsg(){
  const g=globalStats();
  render(`<div class="card" style="max-width:640px;margin:20px auto;text-align:center"><span class="tile" style="--tc:#12936a;margin:0 auto 8px">${I('ok')}</span><h2 style="margin:6px 0">Nada pendiente para hoy</h2><p class="small">Cuando falles una pregunta o la aciertes dudando, volverá en el momento oportuno.${g.next?`<br>Próximo repaso: <b>${new Date(g.next).toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long'})}</b>.`:''}</p><button class="btn primary" data-go="dia">Hacer el viaje del día</button></div>`);
}
function trackHTML(){
  return G.items.map((it,i)=>{
    let c='dot';if(i===G.i)c+=' cur';if(it.pick!==null){c+=G.mode==='sim'?' ans':(it.ok?' ok':' ko')}
    return (i?`<span class="seg${i<=G.i?' done':''}"></span>`:'')+`<span class="${c}"></span>`;
  }).join('');
}
function drawQ(){
  const it=G.items[G.i],q=it.q,s=stById[q.s];
  const opts=it.order.map((oi,pos)=>`<button class="opt" data-pos="${pos}"><span class="k">${L[pos]}</span><span>${esc(q.o[oi])}${q.st&&oi===4?'<span class="add">añadida para el repaso</span>':''}</span></button>`).join('');
  const many=G.items.length>30,n=G.items.length;
  const pctNow=n>1?G.i/(n-1)*100:0;
  render(`
  <div class="qtop"><button class="btn ghost" data-exit>${I('ko')}Salir</button><div class="qtitle">${esc(G.title)}</div>
    <div class="qright">${G.secs?`<span class="timer">${fmtT(G.left??G.secs)}</span>`:''}${G.mode!=='sim'&&G.combo>=2?`<span class="combo">${I('llama')}×${G.combo}</span>`:''}<span class="qcount">${G.i+1}/${n}</span></div></div>
  ${many?`<div class="bar" style="margin:4px 0 14px"><i style="width:${pct(G.i,n)}%;background:var(--lc)"></i></div>`:`<div class="trackWrap" aria-hidden="true"><div class="train" style="left:calc(7px + (100% - 26px) * ${G.prevPct/100})">${TRAIN}</div><div class="track">${trackHTML()}</div></div>`}
  ${G.rule&&G.i===0?`<div class="rule" style="max-width:900px;margin:0 auto 12px"><div class="lbl">La trampa</div><p>${esc(G.rule.engano)}</p></div>`:''}
  <article class="qcard">
    ${q.intro?`<div class="caseBox">${I('fonendo')}<span><b>Caso:</b> ${esc(q.intro)}</span></div>`:''}
    ${q.st?`<div class="obsNote">${I('arena')}<span><b>Pregunta obsoleta.</b> Salió en ${esc(q.ex)} con un criterio que hoy ya no se aplica. Respóndela según la evidencia actual.</span></div>`:''}
    <div class="qchips"><span class="chip src">${I(q.intro?'matraz':'billete')}${esc(q.ex)}</span><span class="chip stn" style="--lc:${colorOf(q.s)}">${esc(s.name)}</span>${q.st?'<span class="chip obs">Obsoleta</span>':''}</div>
    <h2 class="qtext">${esc(q.q)}</h2>
    <div class="opts" role="group" aria-label="Opciones de respuesta">${opts}</div>
    <div class="fb" aria-live="polite"></div>
  </article>
  ${G.mode==='sim'?`<div class="qfoot"><button class="btn ghost" data-prev ${G.i?'':'disabled'}>${I('flecha')}Anterior</button><button class="btn primary" data-next ${it.pick===null?'disabled':''}>${G.i===n-1?'Entregar examen':'Siguiente'}${I('adelante')}</button></div>`:''}
  <p class="keys">Atajos: <kbd>A</kbd>–<kbd>D</kbd> responder · <kbd>S</kbd> lo sabía · <kbd>D</kbd> he dudado · <kbd>Enter</kbd> siguiente</p>
  `,G.color);
  if(G.mode==='sim'&&it.pick!==null) $$('.opt')[it.pick].classList.add('sel');
  const tr=$('.train');if(tr){requestAnimationFrame(()=>requestAnimationFrame(()=>{tr.style.left=`calc(7px + (100% - 26px) * ${pctNow/100})`}))}
  G.prevPct=pctNow;
}
function othersHTML(it){
  const q=it.q;if(!q.po)return '';
  const rows=it.order.map((oi,pos)=>q.po[oi]&&oi!==q.a&&pos!==it.pick?`<li><b>${L[pos]})</b> ${esc(q.po[oi])}</li>`:'').join('');
  return rows?`<details class="others"><summary>¿Por qué fallan las demás opciones?</summary><ul>${rows}</ul></details>`:'';
}
function answer(pos){
  const it=G.items[G.i],q=it.q;
  if(G.mode==='sim'){
    it.pick=pos;it.ok=it.order[pos]===q.a;SND.tick();
    $$('.opt').forEach((b,i)=>b.classList.toggle('sel',i===pos));
    $('[data-next]').disabled=false;$('.track')&&($('.track').innerHTML=trackHTML());
    return;
  }
  if(it.pick!==null) return;
  it.pick=pos;it.ok=it.order[pos]===q.a;
  const cp=it.order.indexOf(q.a),mine=it.order[pos];
  $$('.opt').forEach((b,i)=>{b.disabled=true;if(i===cp)b.classList.add('ok');else if(i===pos)b.classList.add('ko');else b.classList.add('dim')});
  if(it.ok){G.combo++;S.best=Math.max(S.best||0,G.combo);if([3,5,10,15,20].includes(G.combo)){SND.combo();toast(I('llama')+`¡Racha de ${G.combo}! Vas como un tren exprés`)}else SND.ok()}
  else{G.combo=0;SND.ko()}
  const cmb=$('.combo');if(cmb&&G.combo>=2){cmb.innerHTML=I('llama')+'×'+G.combo;cmb.classList.remove('pop');void cmb.offsetWidth;cmb.classList.add('pop')}
  const fb=$('.fb');
  fb.className='fb show '+(it.ok?'ok':'ko');
  const last=G.i===G.items.length-1;
  const trib=q.st&&q.orig!=null?`<p class="tribunal"><b>Clave que dio el tribunal:</b> ${esc(q.o[q.orig])} <span class="small">(ya no es válida)</span></p>`:'';
  fb.innerHTML=`<div class="fbHead">${it.ok?I('ok')+(q.st?'Correcto según la evidencia actual':'Correcto'):I('ko')+`La correcta es la ${L[cp]})`}</div>
    ${!it.ok&&q.po&&q.po[mine]?`<p class="whyNot"><b>Tu respuesta, la ${L[pos]}):</b> ${esc(q.po[mine])}</p>`:''}
    <p class="why" style="margin-top:8px"><b>${q.st?'Qué ha cambiado:':'Por qué:'}</b> ${why(q.e)}</p>
    ${trib}${othersHTML(it)}
    ${DOCENTE&&q.f?`<div class="flag"><b>Nota de revisión:</b> ${esc(q.f)}</div>`:''}
    <div class="fbAct">${it.ok?
      `<button class="btn primary" data-sure="1">${I('bombilla')}Lo sabía</button><button class="btn ghost" data-sure="0">${I('duda')}He dudado</button>`:
      `<button class="btn primary" data-sure="0">${last?'Ver resultado':'Siguiente'}${I('adelante')}</button>`}</div>`;
  $('.track')&&($('.track').innerHTML=trackHTML());
  fb.querySelector('.fbAct button').focus({preventScroll:true});
  fb.scrollIntoView({block:'nearest',behavior:'smooth'});
}
function next(sure){
  const it=G.items[G.i];
  if(G.mode!=='sim') register(it.q.id,it.ok,!!sure);
  if(G.i<G.items.length-1){G.i++;drawQ()}else finish();
}
function confetti(){const cs=['#0aa8e5','#12a37a','#6a5ae0','#f2a33a','#e5484d'];return `<div class="confetti">${Array.from({length:40},(_,i)=>`<i style="left:${Math.random()*100}%;background:${cs[i%5]};animation-delay:${(Math.random()*.6).toFixed(2)}s;transform:rotate(${Math.random()*180|0}deg)"></i>`).join('')}</div>`}
function finish(){
  clearInterval(G.tm);
  if(G.mode==='sim'){G.items.forEach(it=>register(it.q.id,it.pick!==null&&it.ok,true,true));save()}
  const n=G.items.length,ok=G.items.filter(i=>i.ok).length,ko=G.items.filter(i=>i.pick!==null&&!i.ok).length,blank=n-ok-ko;
  const net=Math.max(0,ok-ko/3),nota=(net*10/n);
  const mins=Math.max(1,Math.round((Date.now()-G.t0)/60000));
  if(G.mode==='sim'){S.sims.unshift({d:Date.now(),n,ok,ko,nota:+nota.toFixed(2),f:G.filtro||''});S.sims=S.sims.slice(0,10);save()}
  checkBadges();
  const p=pct(ok,n);
  const msg=p>=85?'Trayecto de matrícula':p>=65?'Buen viaje: vas por la vía correcta':p>=45?'Vas bien, pero hay estaciones que repasar':'Toca volver a las claves y repasar';
  const byS={};G.items.forEach(it=>{const k=it.q.s;byS[k]=byS[k]||{n:0,ok:0};byS[k].n++;if(it.ok)byS[k].ok++});
  const fails=G.items.filter(i=>!i.ok);
  const review=(G.mode==='sim'?G.items:fails).map(it=>{
    const q=it.q,cp=it.order.indexOf(q.a);
    const st=it.ok?['var(--ok)','ok']:it.pick===null?['#94a3b8','flecha']:['var(--ko)','ko'];
    const mine=it.pick!==null?it.order[it.pick]:null;
    return `<details class="revItem"><summary><span class="st" style="background:${st[0]}">${I(st[1])}</span><span>${esc(q.q.length>140?q.q.slice(0,140)+'…':q.q)}</span></summary><div class="body">
      ${mine!==null&&!it.ok?`<p>Tu respuesta: <b style="color:var(--ko)">${L[it.pick]}) ${esc(q.o[mine])}</b>${q.po&&q.po[mine]?` — ${esc(q.po[mine])}`:''}</p>`:''}
      <p>Correcta: <b style="color:var(--ok)">${L[cp]}) ${esc(q.o[q.a])}</b></p>
      <p class="why"><b>${q.st?'Qué ha cambiado:':'Por qué:'}</b> ${why(q.e)}</p><p class="small">${esc(q.ex)} · ${esc(stById[q.s].name)}</p></div></details>`}).join('');
  SND.arrive();
  render(`
  <section class="res">
    <div class="card resTop">${p>=85?confetti():''}
      ${ringSVG(p/100,150,p>=65?'#12936a':p>=45?'#f2a33a':'#d23f57',p+'%')}
      <div><div class="eyebrow" style="color:var(--muted)">${esc(G.title)}</div><h2>${msg}</h2>
        <p class="small" style="margin:0">${ok} aciertos de ${n}${G.mode==='sim'?` · ${ko} errores · ${blank} en blanco · ${mins} min`:''}</p></div>
      ${p>=65?`<span class="stamp">VALIDADO</span>`:''}
    </div>
    ${G.rule?`<div class="rule good" style="margin-top:12px"><div class="lbl">Regla para no caer</div><p>${esc(G.rule.regla)}</p></div>`:''}
    ${G.mode==='sim'?`<div class="resGrid"><div class="stat"><b>${nota.toFixed(2)}</b><span>nota sobre 10 (−1/3 por error)</span></div><div class="stat"><b>${net.toFixed(2)}</b><span>aciertos netos</span></div><div class="stat"><b>${S.sims.length>1?S.sims[1].nota.toFixed(2):'—'}</b><span>nota del simulacro anterior</span></div></div>`:''}
    ${Object.keys(byS).length>1?`<div class="card" style="margin-top:12px"><h3>Por estaciones</h3>${Object.entries(byS).map(([k,v])=>`<div class="kv"><span><span style="color:${colorOf(k)}">●</span> ${stById[k].name}</span><b>${v.ok}/${v.n}</b></div>`).join('')}</div>`:''}
    <div class="row" style="margin:14px 0">
      ${fails.length?`<button class="btn primary" data-redo>${I('repaso')}Repetir mis fallos (${fails.length})</button>`:''}
      ${G.back!=='home'?`<button class="btn ghost" data-backto>Volver</button>`:''}
      <button class="btn ghost" data-go="home">${I('metro')}Ir al mapa</button>
    </div>
    ${review?`<div class="sectionTitle"><h2>${G.mode==='sim'?'Corrección completa':'Repasa tus fallos'}</h2></div>${review}`:''}
  </section>`,G.color);
  G.fails=fails.map(i=>i.q);
}
function goBack(b){if(stById[b])return station(b);if(b.startsWith('trampa:'))return trampa(b.slice(7));return go(b)}

/* ---------- simulacro ---------- */
const ORGS=uniq(EXAM.map(q=>q.org)).sort((a,b)=>a.localeCompare(b,'es'));
let SIM={n:20,s:'all',org:'all',rec:false,crono:false};
const simPool=()=>EXAM.filter(q=>(SIM.s==='all'||q.s===SIM.s)&&(SIM.org==='all'||q.org===SIM.org)&&(!SIM.rec||q.y>=RECENT));
function simSetup(){
  lastView='sim';
  const pool=simPool();
  render(`${backBtn()}
  ${heroBox('Modo examen','Simulacro OPE','Sin pistas hasta el final. Se corrige como en la mayoría de las OPE: cada error resta 1/3 de acierto.','#3c3fb8')}
  <section class="grid2">
    <div class="card">
      <h3>Número de preguntas</h3>
      <div class="seg3" data-group="n">${[10,20,40,60].map(n=>`<button class="${SIM.n===n?'on':''}" data-v="${n}">${n}</button>`).join('')}</div>
      <h3 style="margin-top:18px">Comunidad o servicio de salud</h3>
      <div class="filters" data-group="org"><button class="${SIM.org==='all'?'on':''}" data-v="all">Todas</button>${ORGS.map(o=>`<button class="${SIM.org===o?'on':''}" data-v="${esc(o)}">${esc(o)} (${EXAM.filter(q=>q.org===o).length})</button>`).join('')}</div>
      <h3 style="margin-top:18px">Temario</h3>
      <div class="filters" data-group="s"><button class="${SIM.s==='all'?'on':''}" data-v="all">Todo el tema</button>${ST.map(s=>`<button class="${SIM.s===s.id?'on':''}" data-v="${s.id}">${s.name}</button>`).join('')}</div>
      <label class="toggle"><input type="checkbox" data-rec ${SIM.rec?'checked':''}> Solo convocatorias desde ${RECENT}</label>
      <label class="toggle"><input type="checkbox" data-crono ${SIM.crono?'checked':''}> Con cronómetro (1 minuto por pregunta)</label>
      <p class="small" style="margin-top:12px">Preguntas disponibles con estos filtros: <b>${pool.length}</b>${pool.length<SIM.n?` (el simulacro tendrá ${pool.length})`:''}</p>
      <div style="margin-top:8px"><button class="btn primary" data-simgo ${pool.length?'':'disabled'}>Empezar simulacro${I('adelante')}</button></div>
    </div>
    <div class="card"><h3>Historial</h3>${S.sims.length?S.sims.map(x=>`<div class="kv"><span>${new Date(x.d).toLocaleDateString('es-ES')} · ${x.n} preg.${x.f?` · ${esc(x.f)}`:''}</span><b>${x.nota.toFixed(2)}</b></div>`).join(''):'<p class="small">Aún no has hecho ningún simulacro.</p>'}</div>
  </section>`,'#3c3fb8');
}

/* ---------- buscador ---------- */
const norm=s=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const IDX=ALL.map(q=>({q,t:norm(q.q+' '+q.o.join(' ')+' '+q.e)}));
let BQ='';
function buscar(){
  lastView='buscar';
  render(`${backBtn()}
  ${heroBox('Buscador','Busca cualquier pregunta',`Escribe una palabra o un concepto (por ejemplo, «Sengstaken», «Bristol» o «encefalopatía») y repasa las ${ALL.length} preguntas que lo contienen.`,'#0b2a55')}
  <div class="searchBox">${I('lupa')}<input type="search" id="bq" placeholder="Buscar en preguntas, opciones y explicaciones…" value="${esc(BQ)}" autocomplete="off" aria-label="Buscar"></div>
  <div id="hits" style="margin-top:14px"></div>`,'#0b2a55');
  const inp=$('#bq');inp.focus();inp.setSelectionRange(BQ.length,BQ.length);
  inp.addEventListener('input',()=>{BQ=inp.value;hits()});hits();
}
function hits(){
  const box=$('#hits'),w=norm(BQ.trim());
  if(w.length<3){box.innerHTML=`<p class="small">Escribe al menos 3 letras.</p>`;return}
  const terms=w.split(/\s+/).filter(Boolean);
  const res=IDX.filter(x=>terms.every(t=>x.t.includes(t))).slice(0,60);
  const hl=s=>{let h=esc(s);terms.forEach(t=>{const re=new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`,'gi');h=h.replace(re,'<mark>$1</mark>')});return h};
  const hlAcc=s=>{const n=norm(s);let out='',i=0;const marks=[];terms.forEach(t=>{let k=n.indexOf(t);while(k>=0){marks.push([k,k+t.length]);k=n.indexOf(t,k+1)}});
    marks.sort((a,b)=>a[0]-b[0]);marks.forEach(([a,b])=>{if(a<i)return;out+=esc(s.slice(i,a))+'<mark>'+esc(s.slice(a,b))+'</mark>';i=b});return out+esc(s.slice(i))};
  box.innerHTML=res.length?`<p class="small">${res.length===60?'Más de 60':res.length} resultado${res.length>1?'s':''}${res.length>1?` · <button class="btn ghost" style="padding:4px 10px;font-size:13px" data-hitsall>Practicar estas ${res.length}</button>`:''}</p>`+res.map(({q})=>`<button class="hit" data-hit="${q.id}"><b>${hlAcc(q.q.length>220?q.q.slice(0,220)+'…':q.q)}</b><small><span style="color:${colorOf(q.s)};font-weight:800">● ${esc(stById[q.s].name)}</span><span>${esc(q.ex)}</span>${q.st?'<span style="color:var(--obs);font-weight:800">Obsoleta</span>':''}${isMastered(q.id)?'<span style="color:var(--ok);font-weight:800">Dominada</span>':''}</small></button>`).join(''):`<p class="small">Sin resultados para «${esc(BQ)}».</p>`;
  box._ids=res.map(x=>x.q.id);
}

/* ---------- Lo que más cae ---------- */
function cae(){
  lastView='cae';
  const rows=Object.entries(CONCEPTOS).map(([k,label])=>{
    const qs=ALL.filter(q=>q.t===k);const t=statsOf(qs);
    return {k,label,n:qs.length,rec:qs.filter(q=>q.y>=RECENT).length,orgs:uniq(qs.map(q=>q.org)).length,t};
  }).filter(r=>r.n).sort((a,b)=>b.n-a.n||b.rec-a.rec);
  const max=rows[0].n;
  render(`${backBtn()}
  ${heroBox(`Análisis de ${EXAM.length} preguntas reales`,'Lo que más cae','Ranking de conceptos según cuántas veces los han preguntado los tribunales entre 2008 y 2026. Empieza por arriba: es donde más puntos hay en juego.','#c27a12')}
  <div class="rank">${rows.map((r,i)=>`<button class="rk" data-concepto="${r.k}">
    <span class="pos${i<5?' top':''}">${i+1}</span>
    <span><b>${esc(r.label)}</b><span class="meta">${r.rec} desde ${RECENT} · en ${r.orgs} comunidades u organismos · dominadas ${r.t.mastered}/${r.n}</span><span class="hbar"><i style="width:${pct(r.n,max)}%"></i></span></span>
    <span class="n">${r.n}<small>preguntas</small></span></button>`).join('')}</div>`,'#c27a12');
}

/* ---------- Trampas ---------- */
const trapQs=id=>ALL.filter(q=>q.tr===id);
function trampas(){
  lastView='trampas';
  render(`${backBtn()}
  ${heroBox('Lo que hace fallar','Trampas del tribunal',`${TRAMPAS.length} engaños que se repiten convocatoria tras convocatoria. En estas preguntas verás también por qué falla cada opción incorrecta.`,'#d23f57')}
  <section class="traps">${TRAMPAS.map(t=>{const qs=trapQs(t.id),s=statsOf(qs);return `<button class="trap" data-trampa="${t.id}"><span class="tile" style="--tc:#d23f57">${I('trampa')}</span><span><h3>${esc(t.t)}</h3><p>${esc(t.engano)}</p><small>${qs.length} preguntas · dominadas ${s.mastered}/${qs.length}</small></span></button>`}).join('')}</section>`,'#d23f57');
}
function trampa(id){
  lastView='trampa:'+id;
  const t=TRAMPAS.find(x=>x.id===id),qs=trapQs(id);
  render(`${backBtn('trampas','Trampas')}
  ${heroBox('Trampa del tribunal',esc(t.t),`${qs.length} preguntas reales caen en esta trampa.`,'#d23f57')}
  <div class="rule"><div class="lbl">El engaño</div><p>${esc(t.engano)}</p></div>
  <div class="rule good"><div class="lbl">La regla</div><p>${esc(t.regla)}</p></div>
  <button class="btn primary" data-trapgo="${id}">Ponerme a prueba (${qs.length})${I('adelante')}</button>`,'#d23f57');
}

/* ---------- Supuestos clínicos ---------- */
function casoItems(c){return c.q.map((x,i)=>({id:`caso:${c.id}:${i}`,s:c.s,q:x.q,o:x.o,a:x.a,e:x.e,po:x.po,intro:c.intro,ex:'Supuesto de anticipación · no oficial'}))}
function casos(){
  lastView='casos';
  render(`${backBtn()}
  ${heroBox('Anticipación · no oficial','Supuestos clínicos','Las OPE recientes (SAS, SERGAS, SES…) encadenan varias preguntas sobre un mismo paciente. Estos casos están construidos a partir del temario para entrenar ese formato.','#0b7bc0')}
  <section class="traps">${CASOS.map(c=>{const ids=casoItems(c).map(x=>x.id),done=ids.filter(i=>S.q[i]&&S.q[i].n).length;return `<button class="trap" style="--tc:${colorOf(c.s)}" data-caso="${c.id}"><span class="tile">${I('fonendo')}</span><span><h3>${esc(c.t)}</h3><p>${esc(c.intro)}</p><small>${c.q.length} preguntas · ${stById[c.s].name}${done?` · ${done} respondidas`:''}</small></span></button>`}).join('')}</section>`,'#0b7bc0');
}

/* ---------- Laboratorio visual ---------- */
function lab(){
  lastView='lab';
  render(`${backBtn()}
  ${heroBox('Aprender mirando','Laboratorio visual','Actividades para fijar los conceptos que mejor se entienden con una imagen.','#6a5ae0')}
  <section class="labGrid">
    ${IMAGENES.ostomias?`<button class="mode" style="--tc:#d23f57" data-go="ostomias"><span class="new">NUEVO</span><span class="tile">${I('estoma')}</span><h3>La lámina de las ostomías</h3><p>Sobre el dibujo de clase: coloca cada estoma, sus heces y cuánto irritan; después, ordena el recorrido.</p><span class="meta">${S.lab.osto?'Récord '+S.lab.osto+'/'+OSTO_MAX:'Sin jugar todavía'}</span></button>`:''}
    <button class="mode" style="--tc:#0aa8e5" data-go="colon"><span class="tile">${I('colon')}</span><h3>Colon interactivo</h3><p>Toca cada tramo y descubre cómo son las heces de su ostomía. Después, ponte a prueba.</p><span class="meta">Récord ${S.lab.colon||0}/6</span></button>
    <button class="mode" style="--tc:#8a5a2b" data-go="bristol"><span class="tile">${I('heces')}</span><h3>Escala de Bristol</h3><p>Reconoce los 7 tipos de heces por su forma y lo que indican.</p><span class="meta">Récord ${S.lab.bristol||0}/7</span></button>
    <button class="mode" style="--tc:#12a37a" data-go="mecv"><span class="tile">${I('cuchara')}</span><h3>Simulador MECV-V</h3><p>Decide el siguiente bolo según la respuesta del paciente, como en la consulta.</p><span class="meta">${S.lab.mecv||0} pacientes atendidos</span></button>
  </section>`,'#6a5ae0');
}
/* ---------- Cápsulas de vídeo (datos en contenido.json → videos) ---------- */
let VQ=null;
function capsulas(){
  if(VIDEOS.length===1) return capsula(VIDEOS[0].id);
  lastView='capsulas';
  render(`${backBtn()}${heroBox('Aprender en un minuto','Cápsulas de vídeo','Vídeos cortos con lo esencial de cada tema y un minitest para comprobar que se ha quedado.','#d23f57')}
  <section class="labGrid">${VIDEOS.map(v=>`<button class="mode" style="--tc:#d23f57" data-vid="${v.id}"><span class="tile">${I('play')}</span><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p><span class="meta">${S.lab['vid-'+v.id]!==undefined?'Minitest: '+S.lab['vid-'+v.id]+'/'+v.quiz.length:'Sin ver todavía'}</span></button>`).join('')}</section>`,'#d23f57');
}
function capsula(id){
  const v=VIDEOS.find(x=>x.id===id);if(!v)return home();
  lastView='capsulas';VQ={v,i:0,ok:0,done:false};
  const reales=ALL.filter(q=>v.buscar&&new RegExp(v.buscar,'i').test(q.q)).length;
  render(`${backBtn(VIDEOS.length>1?'capsulas':'home',VIDEOS.length>1?'Cápsulas':'Mapa')}
  <section class="card">
    <div class="eyebrow" style="color:#d23f57">Cápsula de vídeo</div><h2 style="margin:2px 0 12px">${esc(v.t)}</h2>
    <div class="vBox"><video controls playsinline preload="metadata" src="${esc(v.src)}"></video>
      <div class="vErr" hidden><p>No se ha podido cargar el vídeo aquí.</p>${v.abrir?`<a class="btn primary" href="${esc(v.abrir)}" target="_blank" rel="noopener">Abrir el vídeo en otra pestaña${I('adelante')}</a>`:''}</div></div>
    ${v.claves?`<div class="rule good" style="margin-top:14px"><div class="lbl">Lo que tienes que llevarte</div><ul class="vKeys">${v.claves.map(c=>`<li>${esc(c)}</li>`).join('')}</ul></div>`:''}
  </section>
  <section class="card" id="vquiz" style="margin-top:14px"></section>
  <div class="row noPrint" style="margin-top:14px">${reales?`<button class="btn line" data-vreal="${v.id}">Practicar ${reales} preguntas reales de OPE${I('adelante')}</button>`:''}${v.lab?`<button class="btn ghost" data-go="${v.lab}">Actividad del Laboratorio</button>`:''}</div>`,'#d23f57');
  const vid=$('.vBox video');vid.addEventListener('error',()=>{vid.hidden=true;$('.vErr').hidden=false});
  vid.addEventListener('ended',()=>{SND.arrive();$('#vquiz').scrollIntoView({behavior:'smooth',block:'start'})});
  vqDraw();
}
function vqDraw(){
  const {v,i}=VQ,q=v.quiz[i],box=$('#vquiz');if(!box)return;
  box.innerHTML=`<div class="row" style="justify-content:space-between"><h3 style="margin:0">Minitest</h3><span class="qcount">${i+1}/${v.quiz.length}</span></div>
  <p style="font-weight:700;margin:10px 0">${esc(q.q)}</p><div class="opts">${q.o.map((o,j)=>`<button class="opt" data-vq="${j}"><span class="k">${L[j]}</span><span>${esc(o)}</span></button>`).join('')}</div><div class="fb" aria-live="polite"></div>`;
}
function vqAnswer(j){
  const {v,i}=VQ,q=v.quiz[i];if(VQ.done)return;VQ.done=true;
  const ok=j===q.a;if(ok){VQ.ok++;SND.ok()}else SND.ko();
  $$('#vquiz .opt').forEach((b,k)=>{b.disabled=true;b.classList.add(k===q.a?'ok':k===j?'ko':'dim')});
  const fb=$('#vquiz .fb');fb.className='fb show '+(ok?'ok':'ko');
  const last=i===v.quiz.length-1;
  fb.innerHTML=`<div class="fbHead">${ok?I('ok')+'Correcto':I('ko')+'Es la '+L[q.a]}</div><p class="why">${esc(q.e)}</p><div class="fbAct"><button class="btn primary" data-vqnext>${last?'Ver resultado':'Siguiente'}${I('adelante')}</button></div>`;
}
function vqNext(){
  const {v}=VQ;
  if(VQ.i<v.quiz.length-1){VQ.i++;VQ.done=false;return vqDraw()}
  S.lab['vid-'+v.id]=Math.max(S.lab['vid-'+v.id]||0,VQ.ok);save();SND.arrive();
  const p=pct(VQ.ok,v.quiz.length);
  $('#vquiz').innerHTML=`<div style="text-align:center"><h3 style="margin:0">${VQ.ok}/${v.quiz.length} en el minitest</h3><p class="small" style="margin:6px 0 12px">${p===100?'Perfecto: a por las preguntas reales.':'Vuelve a ver el vídeo y repite el minitest.'}</p><button class="btn ghost" data-vredo>Repetir minitest</button></div>`;
}
/* ---------- La lámina de las ostomías (dibujo de clase, arrastrar y colocar) ---------- */
const OZ=(x0,y0,x1,y1)=>({l:x0/20,t:y0/11.25,w:(x1-x0)/20,h:(y1-y0)/11.25});      /* píxeles del dibujo original (2000 × 1125) → % */
const OZC=(cx,cy,w,h)=>OZ(cx-w/2,cy-h/2,cx+w/2,cy+h/2);
const OSTO=[
 {k:'est',t:'Ubica cada estoma',d:'Lleva cada ostomía a su recuadro. Sigue la flecha: apunta al tramo donde se abre el estoma.',
  pista:'Fíjate en la flecha de cada recuadro y recuerda que el dibujo está de frente: la derecha del paciente queda a tu izquierda.',
  regla:'De proximal a distal: ileostomía → cecostomía → colostomías ascendente, transversa y descendente → sigmoidostomía.',
  z:[{id:'e1',v:'Ileostomía',...OZ(748,886,956,951),i:'Íleon terminal, casi siempre en la FID. Débito continuo: vigila la deshidratación.'},
     {id:'e2',v:'Cecostomía',...OZ(420,755,663,820),i:'Es la ostomía más proximal del colon.'},
     {id:'e3',v:'Colostomía ascendente',...OZ(346,325,589,428),i:'Lado derecho del paciente: a tu izquierda en el dibujo.'},
     {id:'e4',v:'Colostomía transversa',...OZ(757,113,1000,216),i:'Suele hacerse en asa, con varilla de soporte.'},
     {id:'e5',v:'Colostomía descendente',...OZ(1421,307,1664,412),i:'Lado izquierdo del paciente. Admite la irrigación.'},
     {id:'e6',v:'Sigmoidostomía',...OZ(1237,830,1517,895),i:'En la FII. Es la evacuación más parecida a la normal.'}]},
 {k:'hec',t:'¿Cómo salen las heces?',d:'Coloca cada consistencia sobre la deposición que corresponde a cada tramo.',
  pista:'A medida que el contenido avanza por el colon se absorbe agua: cuanto más distal, más formadas.',
  regla:'Cuanto más distal es el estoma, más sólidas son las heces (el colon ha tenido tiempo de absorber agua).',
  z:[{id:'h1',v:'Líquidas',...OZC(633,940,150,52),i:'Ileostomía y cecostomía: débito líquido y continuo; bolsa abierta.'},
     {id:'h2',v:'Semilíquidas',...OZC(470,550,200,52),i:'Colostomía ascendente: bolsa abierta.'},
     {id:'h3',v:'Blandas',...OZC(1113,185,170,52),i:'Colostomía transversa: heces pastosas.'},
     {id:'h4',v:'Semiblandas',...OZC(1542,542,200,52),i:'Colostomía descendente: ya se puede usar bolsa cerrada.'},
     {id:'h5',v:'Sólidas',...OZC(1468,748,140,52),i:'Sigmoidostomía: heces formadas; bolsa cerrada e irrigación posible.'}]},
 {k:'irr',t:'¿Cuánto irritan la piel?',d:'Etiqueta cada tramo según lo agresivas que son sus heces para la piel periestomal.',
  pista:'Lo que irrita la piel son las enzimas digestivas: hay más cuanto más líquidas y proximales son las heces.',
  regla:'Más líquidas = más enzimas = más irritación. Por eso en la ileostomía se ajusta el disco al milímetro y se vigila la piel.',
  z:[{id:'i1',v:'Muy irritantes (+++++)',...OZ(15,920,245,1065),i:'Ileostomía: el débito lleva enzimas activas; la piel se lesiona en horas.'},
     {id:'i2',v:'Irritantes (++)',...OZ(140,25,370,170),i:'Cecostomía y colostomía ascendente.'},
     {id:'i3',v:'Poco irritantes (+/-)',...OZ(1405,18,1640,165),i:'Colostomía transversa.'},
     {id:'i4',v:'No irritantes',...OZ(1765,405,1992,555),i:'Colostomía descendente.'},
     {id:'i5',v:'No irritantes',...OZ(1545,925,1775,1072),i:'Sigmoidostomía.'}]}
];
const RUTA=['Ileostomía','Cecostomía','Colostomía ascendente','Colostomía transversa','Colostomía descendente','Sigmoidostomía'];
const OSTO_MAX=OSTO.reduce((n,f)=>n+f.z.length,0)+RUTA.length;
let OS=null;
function ostomias(){
  lastView='ostomias';
  render(`${backBtn('lab','Laboratorio')}
  ${heroBox('Laboratorio visual · tu lámina de clase','La lámina de las ostomías','El mismo dibujo que veis en clase, con los rótulos tapados. Tres fases para reconstruirlo y una cuarta para ordenar el recorrido.','#d23f57')}
  <section class="card">
    <div class="oSteps">${OSTO.map((f,i)=>`<div><b>${i+1}</b><span>${f.t}</span></div>`).join('')}<div><b>4</b><span>Ordena el recorrido</span></div></div>
    <p class="small" style="margin:12px 0 0">Arrastra cada etiqueta hasta su hueco o, si lo prefieres (en el móvil es más cómodo), tócala y después toca el hueco. Cada etiqueta bien colocada a la primera suma un punto: máximo ${OSTO_MAX}.</p>
    <div class="row" style="margin-top:14px"><button class="btn primary" data-ostogo>Empezar${I('adelante')}</button><button class="btn ghost" data-ostover>Estudiar antes la lámina</button></div>
  </section>`,'#d23f57');
}
function ostoVer(){
  render(`${backBtn('ostomias','La lámina')}
  <section class="card"><h3 style="margin:0 0 10px">La lámina completa</h3><div class="oScroll"><div class="oStage"><img src="${IMAGENES.ostomias}" alt="Lámina de las ostomías: tramos del intestino, consistencia de las heces e irritación de la piel" draggable="false"></div></div>
  <div class="rule good" style="margin-top:14px"><div class="lbl">Regla de oro</div><p>Cuanto más distal es el estoma, más sólidas y menos irritantes son las heces.</p></div>
  <button class="btn primary" data-ostogo>Ya la tengo: empezar${I('adelante')}</button></section>`,'#d23f57');
}
function ostoStart(){OS={f:0,done:{},bad:{},ok:0,sel:null,t0:Date.now(),ruta:[],rbad:{},chips:[]};ostoPhase()}
function ostoPhase(){
  const f=OSTO[OS.f];
  OS.chips=shuffle(f.z.map(z=>z.v)).map(v=>({v,used:false}));OS.sel=null;ostoDraw(true);
}
function ostoDraw(nueva){
  const f=OSTO[OS.f];
  const zones=OSTO.map((ph,pi)=>ph.z.map(z=>{
    const st=OS.done[z.id]?'done':pi===OS.f?'tgt':pi>OS.f?'later':'done';
    return `<button class="oz ${st}" data-oz="${z.id}" style="left:${z.l}%;top:${z.t}%;width:${z.w}%;height:${z.h}%" ${st==='tgt'?`aria-label="Hueco para ${esc(f.t.toLowerCase())}"`:'tabindex="-1" aria-hidden="true"'}></button>`}).join('')).join('');
  const left=OS.chips.filter(c=>!c.used).length;
  const html=`${backBtn('ostomias','La lámina')}
  <section class="card oGame">
    <div class="row" style="justify-content:space-between;align-items:flex-start"><div><div class="eyebrow" style="color:#d23f57">Fase ${OS.f+1} de 4</div><h3 style="margin:2px 0 4px">${f.t}</h3><p class="small" style="margin:0">${f.d}</p></div><span class="qcount">${OS.ok} pts</span></div>
    <p class="oHint">${I('flecha')} Desliza la lámina para verla entera ${I('adelante')}</p>
    <div class="oScroll" style="margin-top:12px"><div class="oStage"><img src="${IMAGENES.ostomias}" alt="" draggable="false">${zones}</div></div>
    <div class="oTray" role="group" aria-label="Etiquetas por colocar">${left?OS.chips.map((c,i)=>c.used?'':`<button class="oChip${OS.sel===i?' sel':''}" data-ochip="${i}">${esc(c.v)}</button>`).join(''):`<div class="oPhaseEnd"><div><b>${I('ok')} Fase completada.</b> ${f.regla}</div><button class="btn primary" data-ostonext>${OS.f<OSTO.length-1?'Siguiente fase':'Última fase: el recorrido'}${I('adelante')}</button></div>`}</div>
  </section>`;
  if(nueva) return render(html,'#d23f57');
  const sc=$('.oScroll'),sl=sc?sc.scrollLeft:0;app.innerHTML=html;const sc2=$('.oScroll');if(sc2)sc2.scrollLeft=sl;   /* sin saltar arriba */
}
function ostoPlace(ci,zid){
  const f=OSTO[OS.f],z=f.z.find(x=>x.id===zid),c=OS.chips[ci];
  if(!z||!c||c.used||OS.done[zid])return;
  const el=$(`[data-oz="${zid}"]`);
  if(c.v===z.v){
    OS.done[zid]=1;c.used=true;OS.sel=null;
    if(!OS.bad[c.v+OS.f])OS.ok++;
    SND.ok();toast(`${I('ok')}<span><b>${esc(c.v)}.</b> ${esc(z.i)}</span>`,1);
    ostoDraw();const n=$(`[data-oz="${zid}"]`);if(n)n.classList.add('pop');
    if(!OS.chips.some(x=>!x.used))SND.arrive();
  }else{
    OS.bad[c.v+OS.f]=1;SND.ko();
    if(el){el.classList.remove('no');void el.offsetWidth;el.classList.add('no')}
    const ch=$(`[data-ochip="${ci}"]`);if(ch){ch.classList.remove('shake');void ch.offsetWidth;ch.classList.add('shake')}
    toast(`${I('bombilla')}<span>${esc(f.pista)}</span>`,1);
  }
}
function ostoRuta(){
  const rest=shuffle(RUTA.filter(r=>!OS.ruta.includes(r)));
  const n=OS.ruta.length;
  render(`${backBtn('ostomias','La lámina')}
  <section class="card">
    <div class="row" style="justify-content:space-between;align-items:flex-start"><div><div class="eyebrow" style="color:#d23f57">Fase 4 de 4</div><h3 style="margin:2px 0 4px">Ordena el recorrido</h3><p class="small" style="margin:0">Toca las ostomías en el orden en que las atraviesa el contenido intestinal: de la más proximal a la más distal.</p></div><span class="qcount">${OS.ok} pts</span></div>
    <ol class="oRuta">${RUTA.map((r,i)=>`<li class="${i<n?'on':''}"><i>${i+1}</i><span>${i<n?esc(r):'?'}</span></li>`).join('')}</ol>
    <div class="oGrad"><span>Líquidas · muy irritantes</span><span>Sólidas · no irritantes</span></div>
    <div class="oTray">${n<RUTA.length?rest.map(r=>`<button class="oChip" data-oruta="${esc(r)}">${esc(r)}</button>`).join(''):''}</div>
  </section>`,'#d23f57');
}
function ostoRutaPick(v,btn){
  const want=RUTA[OS.ruta.length];
  if(v===want){if(!OS.rbad[want])OS.ok++;OS.ruta.push(v);SND.ok();if(OS.ruta.length===RUTA.length)return ostoFin();return ostoRuta()}
  OS.rbad[want]=1;SND.ko();btn.classList.remove('shake');void btn.offsetWidth;btn.classList.add('shake');
  toast(`${I('bombilla')}<span>Aún no: piensa qué tramo viene justo después ${OS.ruta.length?'de la '+esc(OS.ruta[OS.ruta.length-1].toLowerCase()):'del intestino delgado'}.</span>`,1);
}
function ostoFin(){
  const s=Math.round((Date.now()-OS.t0)/1000),p=pct(OS.ok,OSTO_MAX),rec=OS.ok>(S.lab.osto||0);
  S.lab.osto=Math.max(S.lab.osto||0,OS.ok);save();checkBadges();SND.arrive();
  render(`${backBtn('lab','Laboratorio')}
  <section class="card" style="text-align:center;position:relative;overflow:hidden">
    ${p>=85?confetti():''}
    <div class="eyebrow" style="color:#d23f57">Lámina reconstruida</div>
    <h2 style="margin:4px 0">${OS.ok}/${OSTO_MAX} a la primera</h2>
    <p class="small" style="margin:0">${Math.floor(s/60)} min ${s%60} s${rec?' · <b>¡Nuevo récord!</b>':''}</p>
    <p style="max-width:560px;margin:10px auto 0">${p===100?'Perfecta: esta lámina ya es tuya. Llévala al test.':p>=75?'Muy bien. Repásala una vez más y fíjate en los huecos que te costaron.':'Vuelve a estudiar la lámina y repite: en dos intentos se fija.'}</p>
    <div class="oScroll" style="margin:14px 0"><div class="oStage"><img src="${IMAGENES.ostomias}" alt="Lámina de las ostomías completa" draggable="false"></div></div>
    <div class="row" style="justify-content:center"><button class="btn primary" data-trip="ostom" data-n="10">Practicar 10 preguntas de ostomías${I('adelante')}</button><button class="btn ghost" data-ostogo>Jugar otra vez</button><button class="btn ghost" data-go="lab">Laboratorio</button></div>
  </section>`,'#d23f57');
}
/* arrastrar con ratón o dedo; si no hay arrastre, el toque selecciona */
let ODR=null;
document.addEventListener('pointerdown',e=>{
  const c=e.target.closest('.oChip[data-ochip]');if(!c||e.button>0)return;
  if(e.pointerType==='mouse')e.preventDefault();               /* evita seleccionar texto al arrastrar */
  ODR={c,i:+c.dataset.ochip,x:e.clientX,y:e.clientY,g:null,over:null};
});
document.addEventListener('pointermove',e=>{
  if(!ODR)return;
  if(!ODR.g){if(Math.hypot(e.clientX-ODR.x,e.clientY-ODR.y)<7)return;
    const g=ODR.c.cloneNode(true);g.classList.add('ghost');document.body.appendChild(g);ODR.g=g;ODR.c.classList.add('lift');}
  e.preventDefault();ODR.g.style.left=e.clientX+'px';ODR.g.style.top=e.clientY+'px';
  const z=document.elementFromPoint(e.clientX,e.clientY);const t=z&&z.closest('.oz.tgt');
  if(ODR.over&&ODR.over!==t)ODR.over.classList.remove('hov');if(t)t.classList.add('hov');ODR.over=t;
},{passive:false});
document.addEventListener('pointerup',e=>{
  if(!ODR)return;const d=ODR;ODR=null;
  if(!d.g)return;                      /* fue un toque: lo gestiona el click */
  d.g.remove();d.c.classList.remove('lift');if(d.over)d.over.classList.remove('hov');
  d.c._dragged=true;setTimeout(()=>{d.c._dragged=false},50);
  if(d.over)ostoPlace(d.i,d.over.dataset.oz);
});
document.addEventListener('pointercancel',()=>{if(ODR&&ODR.g){ODR.g.remove();ODR.c.classList.remove('lift')}ODR=null});
const SEGS=[
 {k:'ileon',n:'Íleon (ileostomía)',d:'M232,322 C200,312 170,338 132,338',lx:170,ly:366,c:'Líquidas',x:'Muy irritantes (enzimas)',b:'Abierta; vaciar a 1/3-1/2',nota:'Débito continuo: vigilar la deshidratación. Suele ir en la FID.'},
 {k:'ciego',n:'Ciego (cecostomía)',d:'M108,340 L108,378',lx:60,ly:410,c:'Líquidas',x:'Muy irritantes',b:'Abierta',nota:'Es la ostomía más proximal del colon.'},
 {k:'asc',n:'Colon ascendente',d:'M108,318 L108,148',lx:22,ly:240,c:'Semilíquidas',x:'Irritantes',b:'Abierta',nota:'Lado derecho del paciente (a tu izquierda en la imagen).'},
 {k:'trans',n:'Colon transverso',d:'M122,118 C180,150 250,150 302,118',lx:212,ly:104,c:'Blandas',x:'Moderadamente irritantes',b:'Abierta',nota:'Suele hacerse en asa, con varilla de soporte.'},
 {k:'desc',n:'Colon descendente',d:'M312,140 L312,296',lx:298,ly:222,c:'Semiblandas',x:'Poco o nada irritantes',b:'Cerrada o abierta',nota:'Admite la irrigación.'},
 {k:'sigma',n:'Sigma',d:'M312,312 C312,362 252,334 226,372 L218,398',lx:300,ly:380,c:'Sólidas',x:'No irritantes',b:'Cerrada; admite la irrigación',nota:'Va en la FII. Es la de evacuación más parecida a la normal.'}
];
const CONS=['Líquidas','Semilíquidas','Blandas','Semiblandas','Sólidas'];
let COL={mode:'explore',sel:null,round:null};
function colonSVG(hl,state){
  return `<svg viewBox="0 0 420 440" role="img" aria-label="Esquema del colon">
    <rect x="10" y="60" width="400" height="370" rx="60" fill="#f7fafd" stroke="#e1e9f2" stroke-width="2"/>
    <text x="210" y="84" text-anchor="middle" font-size="12" font-weight="700" fill="#8a99ab">Vista de frente · la derecha del paciente queda a tu izquierda</text>
    <path d="M218,398 L212,428" stroke="#c9d3de" stroke-width="22" stroke-linecap="round" fill="none"/>
    ${SEGS.map(s=>{const col=state&&state[s.k]?state[s.k]:(hl===s.k?'#0aa8e5':'#c8dbec');
      return `<path class="seg" data-seg="${s.k}" d="${s.d}" stroke="${col}" stroke-width="${s.k==='ciego'?40:30}" stroke-linecap="round" fill="none" tabindex="0" role="button" aria-label="${esc(s.n)}"/>`}).join('')}
    ${SEGS.map(s=>`<text x="${s.lx}" y="${s.ly}" font-size="13" font-weight="800" fill="#0f2440" text-anchor="${s.k==='desc'?'end':s.k==='trans'||s.k==='ileon'?'middle':'start'}" pointer-events="none">${esc(s.n.split(' (')[0])}</text>`).join('')}
    <text x="218" y="438" font-size="11" fill="#8a99ab" text-anchor="middle">recto</text>
  </svg>`;
}
function colon(){
  lastView='colon';
  const s=SEGS.find(x=>x.k===COL.sel);
  if(COL.mode==='quiz') return colonQuiz();
  render(`${backBtn('lab','Laboratorio')}
  <section class="card"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Colon interactivo · explorar</h3><button class="btn primary" data-colonquiz>Ponerme a prueba${I('adelante')}</button></div>
  <div class="labWrap" style="margin-top:12px"><div class="colon">${colonSVG(COL.sel)}</div>
  <div class="segInfo">${s?`<h3 style="margin:0">${esc(s.n)}</h3><div class="kv"><span>Heces</span><b>${s.c}</b></div><div class="kv"><span>Irritación de la piel</span><b>${s.x}</b></div><div class="kv"><span>Bolsa</span><b>${s.b}</b></div><p class="small" style="margin:6px 0 0">${s.nota}</p>`:'<p class="small">Toca un tramo del intestino para ver cómo son las heces de una ostomía a ese nivel.</p><div class="rule good"><div class="lbl">Regla de oro</div><p>Cuanto más distal (más cerca del ano), más sólidas y menos irritantes son las heces.</p></div>'}</div></div></section>`,'#0aa8e5');
}
function colonQuiz(){
  const R=COL.round,s=SEGS.find(x=>x.k===R.order[R.i]);
  render(`${backBtn('lab','Laboratorio')}
  <section class="card"><div class="row" style="justify-content:space-between"><h3 style="margin:0">¿Cómo son las heces de este estoma?</h3><span class="qcount">${R.i+1}/${R.order.length}</span></div>
  <div class="labWrap" style="margin-top:12px"><div class="colon">${colonSVG(s.k,R.state)}</div>
  <div><p style="font-weight:800;font-size:18px;margin:0 0 10px">Ostomía en: ${esc(s.n)}</p><div class="opts">${CONS.map((c,i)=>`<button class="opt" data-cons="${i}"><span class="k">${L[i]}</span><span>${c}</span></button>`).join('')}</div><div class="fb" aria-live="polite"></div></div></div></section>`,'#0aa8e5');
}
function colonAnswer(i){
  const R=COL.round,s=SEGS.find(x=>x.k===R.order[R.i]);if(R.done)return;R.done=true;
  const ok=CONS[i]===s.c;if(ok){R.ok++;SND.ok()}else SND.ko();R.state[s.k]=ok?'#12936a':'#d23f57';
  $$('.opt').forEach((b,j)=>{b.disabled=true;b.classList.add(CONS[j]===s.c?'ok':j===i?'ko':'dim')});
  const fb=$('.fb');fb.className='fb show '+(ok?'ok':'ko');
  fb.innerHTML=`<div class="fbHead">${ok?I('ok')+'Correcto':I('ko')+'Son '+s.c.toLowerCase()}</div><p class="why">${esc(s.n)}: heces ${s.c.toLowerCase()}, ${s.x.toLowerCase()}. Bolsa: ${s.b.toLowerCase()}. ${s.nota}</p><div class="fbAct"><button class="btn primary" data-colonnext>${R.i===R.order.length-1?'Ver resultado':'Siguiente'}${I('adelante')}</button></div>`;
  fb.querySelector('button').focus({preventScroll:true});
}
function colonNext(){
  const R=COL.round;
  if(R.i<R.order.length-1){R.i++;R.done=false;return colonQuiz()}
  S.lab.colon=Math.max(S.lab.colon||0,R.ok);save();checkBadges();SND.arrive();
  render(`${backBtn('lab','Laboratorio')}<section class="card" style="text-align:center"><h2 style="margin:4px 0">${R.ok}/${R.order.length} tramos</h2><div class="colon" style="max-width:320px;margin:10px auto">${colonSVG(null,R.state)}</div><div class="row" style="justify-content:center"><button class="btn primary" data-colonquiz>Otra vez</button><button class="btn ghost" data-go="colon">Explorar</button></div></section>`,'#0aa8e5');
}
const BRISTOL=[
 {n:1,d:'Trozos duros separados, como nueces (difíciles de expulsar)',m:'Estreñimiento'},
 {n:2,d:'Con forma de salchicha, pero llena de bultos',m:'Estreñimiento'},
 {n:3,d:'Con forma de salchicha, con grietas en la superficie',m:'Normal'},
 {n:4,d:'Como una serpiente: lisa y blanda',m:'Normal (la ideal)'},
 {n:5,d:'Trozos blandos con bordes definidos (se expulsan fácilmente)',m:'Falta de fibra'},
 {n:6,d:'Trozos blandos con bordes deshechos, pastosos',m:'Diarrea'},
 {n:7,d:'Acuosa, sin trozos sólidos: totalmente líquida',m:'Diarrea'}
];
function bristolSVG(n){
  const f='#8a5a2b',s='#5e3b19';let g='';
  if(n===1)g=[[40,42,13],[82,36,12],[122,46,13],[162,38,12],[196,46,11]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="${s}" stroke-width="2"/>`).join('');
  if(n===2)g=[40,62,84,106,128,150,172].map((x,i)=>`<circle cx="${x}" cy="${i%2?38:44}" r="17" fill="${f}" stroke="${s}" stroke-width="2"/>`).join('');
  if(n===3)g=`<rect x="22" y="24" width="180" height="34" rx="17" fill="${f}" stroke="${s}" stroke-width="2"/>`+[60,95,130,165].map(x=>`<path d="M${x},26 l6,10 l-5,8 l7,10" stroke="#e7cfb3" stroke-width="2.5" fill="none"/>`).join('');
  if(n===4)g=`<path d="M24,48 C64,18 100,64 140,40 S192,28 204,42" stroke="${s}" stroke-width="26" stroke-linecap="round" fill="none"/><path d="M24,48 C64,18 100,64 140,40 S192,28 204,42" stroke="${f}" stroke-width="22" stroke-linecap="round" fill="none"/>`;
  if(n===5)g=[[50,42,28,16],[118,38,26,15],[184,44,24,15]].map(([x,y,a,b])=>`<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="${f}" stroke="${s}" stroke-width="2"/>`).join('');
  if(n===6)g=`<path d="M30,48 l8,-14 l10,6 l9,-12 l12,8 l10,-10 l12,9 l11,-8 l9,12 l12,-6 l7,14 l-6,10 l-12,4 l-10,-5 l-12,7 l-11,-6 l-12,6 l-12,-5 l-11,6 z" fill="${f}" stroke="${s}" stroke-width="2"/><path d="M170,40 l8,-8 l9,5 l7,-4 l6,10 l-6,9 l-10,2 l-9,-5 z" fill="${f}" stroke="${s}" stroke-width="2"/>`;
  if(n===7)g=`<path d="M20,52 C40,30 70,44 96,34 C126,22 150,46 178,36 C200,30 214,46 204,58 C180,72 140,62 112,68 C80,74 40,72 20,52 Z" fill="#b98a5c" opacity=".85" stroke="#8a5a2b" stroke-width="2"/>`;
  return `<svg viewBox="0 0 230 84" role="img" aria-label="Heces tipo ${n} de Bristol">${g}</svg>`;
}
let BR=null;
function bristol(){lastView='bristol';BR={order:shuffle(BRISTOL),i:0,ok:0};bristolDraw()}
function bristolDraw(){
  const b=BR.order[BR.i];
  const opts=shuffle([b,...shuffle(BRISTOL.filter(x=>x!==b)).slice(0,3)]);BR.opts=opts;BR.done=false;
  render(`${backBtn('lab','Laboratorio')}
  <article class="qcard flash"><div class="row" style="justify-content:space-between"><span class="chip stn" style="--lc:#8a5a2b">Escala de Bristol</span><span class="qcount">${BR.i+1}/7</span></div>
  <div class="bristolPic" style="margin-top:12px">${bristolSVG(b.n)}</div>
  <div class="small" style="font-weight:700;margin-bottom:8px">¿Qué tipo es?</div>
  <div class="opts">${opts.map((o,i)=>`<button class="opt" data-br="${i}"><span class="k">${L[i]}</span><span><b>Tipo ${o.n}</b> · ${esc(o.d)}</span></button>`).join('')}</div><div class="fb" aria-live="polite"></div></article>`,'#8a5a2b');
}
function bristolAnswer(i){
  if(BR.done)return;BR.done=true;const b=BR.order[BR.i],k=BR.opts.indexOf(b),ok=i===k;if(ok){BR.ok++;SND.ok()}else SND.ko();
  $$('.opt').forEach((x,j)=>{x.disabled=true;x.classList.add(j===k?'ok':j===i?'ko':'dim')});
  const fb=$('.fb');fb.className='fb show '+(ok?'ok':'ko');
  fb.innerHTML=`<div class="fbHead">${ok?I('ok')+'Correcto':I('ko')+'Es el tipo '+b.n}</div><p class="why"><b>Tipo ${b.n} → ${b.m}.</b> Tipos 1-2: estreñimiento · 3-4: normales (la 4 es la ideal) · 5: falta de fibra · 6-7: diarrea.</p><div class="fbAct"><button class="btn primary" data-brnext>${BR.i===6?'Ver resultado':'Siguiente'}${I('adelante')}</button></div>`;
  fb.querySelector('button').focus({preventScroll:true});
}
function bristolNext(){
  if(BR.i<6){BR.i++;return bristolDraw()}
  S.lab.bristol=Math.max(S.lab.bristol||0,BR.ok);save();checkBadges();SND.arrive();
  render(`${backBtn('lab','Laboratorio')}<section class="card" style="text-align:center"><h2 style="margin:4px 0">${BR.ok}/7 tipos</h2>
  <table class="tbl" style="max-width:640px;margin:12px auto;text-align:left"><tr><th>Tipo</th><th></th><th>Indica</th></tr>${BRISTOL.map(b=>`<tr><td><b>${b.n}</b></td><td style="width:150px">${bristolSVG(b.n)}</td><td>${b.m}</td></tr>`).join('')}</table>
  <button class="btn primary" data-go="bristol">Otra ronda</button></section>`,'#8a5a2b');
}
/* MECV-V */
const SEQ=['N5','N10','N20','L5','L10','L20','P5','P10','P20'];
const VNAME={N:'Néctar',L:'Líquido',P:'Pudin'},VCOL={N:'#d9a441',L:'#4aa8e0',P:'#12a37a'};
const bname=b=>b==='FIN'?'Finalizar la exploración':`${VNAME[b[0]]} ${b.slice(1)} ml`;
function mecvNext(b,unsafe){if(unsafe) return b[0]==='P'?'FIN':'P5';const i=SEQ.indexOf(b);return i===SEQ.length-1?'FIN':SEQ[i+1]}
let MV=null;
function mecv(){
  lastView='mecv';
  const scen=shuffle([{f:'N10'},{f:'N20'},{f:'L5'},{f:'L10'},{f:'L20'},{f:'N5',f2:'P10'},{f:null},{f:'L5',eff:'N20'},{f:'P20'}])[0];
  MV={scen,cur:'N5',log:[],ok:0,tot:0};mecvDraw();
}
const SIGNS=['tose tras tragar','su voz se vuelve húmeda («voz de gárgaras»)','la saturación baja del 96 % al 92 %'];
function mecvDraw(){
  const b=MV.cur,unsafe=b===MV.scen.f||b===MV.scen.f2,eff=b===MV.scen.eff;
  const res=unsafe?`Al administrarlo, ${shuffle(SIGNS)[0]}.`:eff?'Deglución segura, pero queda residuo en la boca y traga en dos veces.':'Deglución segura: sin tos, voz normal y saturación estable.';
  const correct=mecvNext(b,unsafe);
  const cands=uniq([correct,mecvNext(b,false),'P5','FIN','L5',b]);
  const opts=shuffle(uniq([correct,...shuffle(cands.filter(x=>x!==correct)).slice(0,3)])).map(x=>x===b?'REP':x);
  MV.step={b,unsafe,eff,correct,opts};
  render(`${backBtn('lab','Laboratorio')}
  <article class="qcard"><div class="row" style="justify-content:space-between"><span class="chip stn" style="--lc:#12a37a">Simulador MECV-V</span><span class="small">Paciente incorporado · saturación basal 96 %</span></div>
  <div class="steps">${SEQ.map(x=>{const l=MV.log.find(y=>y.b===x);return `<span class="${x===b?'cur':l?(l.unsafe?'ko':'ok'):''}">${x}</span>`}).join('')}</div>
  <div class="bolo"><div class="cup" style="background:${VCOL[b[0]]}">${b.slice(1)} ml</div><div><b>Bolo: ${bname(b)}</b><div style="margin-top:4px">${unsafe?'<b style="color:var(--ko)">Alerta.</b> ':''}${res}</div></div></div>
  <div class="small" style="font-weight:700;margin-bottom:8px">¿Cuál es el siguiente paso?</div>
  <div class="opts">${opts.map((o,i)=>`<button class="opt" data-mv="${i}"><span class="k">${L[i]}</span><span>${o==='REP'?'Repetir el mismo bolo':o==='FIN'?'Finalizar la exploración':'Administrar '+bname(o)}</span></button>`).join('')}</div>
  <div class="fb" aria-live="polite"></div></article>`,'#12a37a');
}
function mecvAnswer(i){
  const st=MV.step;if(st.done)return;st.done=true;
  const pick=st.opts[i],ok=pick===st.correct;MV.tot++;if(ok){MV.ok++;SND.ok()}else SND.ko();
  const k=st.opts.indexOf(st.correct);
  $$('.opt').forEach((b,j)=>{b.disabled=true;b.classList.add(j===k?'ok':j===i?'ko':'dim')});
  const w=st.unsafe?(st.b[0]==='P'?'Alteración de la SEGURIDAD también con pudin: se da por concluida la exploración.':'Alteración de la SEGURIDAD (tos, cambio de voz o desaturación ≥ 3 %): no se sigue con esa viscosidad ni se pasa al líquido; se salta directamente a PUDIN, empezando por 5 ml.'):
    st.eff?'Es una alteración de la EFICACIA: la prueba es positiva para ese bolo, pero NO obliga a interrumpirla. Se continúa con el siguiente.':
    st.correct==='FIN'?'Has completado los bolos sin alteraciones de la seguridad: fin de la exploración.':
    st.b.endsWith('20')?`Deglución segura con 20 ml: se pasa a la siguiente viscosidad (${VNAME[st.correct[0]].toLowerCase()}), empezando de nuevo por 5 ml.`:'Deglución segura: se aumenta el volumen dentro de la misma viscosidad (5 → 10 → 20 ml).';
  MV.log.push({b:st.b,unsafe:st.unsafe});
  const fb=$('.fb');fb.className='fb show '+(ok?'ok':'ko');
  fb.innerHTML=`<div class="fbHead">${ok?I('ok')+'Correcto':I('ko')+'Lo correcto era: '+(st.correct==='FIN'?'finalizar':'administrar '+bname(st.correct))}</div><p class="why">${w}</p><div class="fbAct"><button class="btn primary" data-mvnext>${st.correct==='FIN'?'Ver resultado':'Siguiente bolo'}${I('adelante')}</button></div>`;
  fb.querySelector('button').focus({preventScroll:true});
}
function mecvNextStep(){
  const c=MV.step.correct;
  if(c!=='FIN'){MV.cur=c;return mecvDraw()}
  const unsafe=MV.log.filter(l=>l.unsafe).map(l=>bname(l.b)),safe=MV.log.filter(l=>!l.unsafe).map(l=>bname(l.b));
  S.lab.mecv=(S.lab.mecv||0)+1;save();SND.arrive();
  render(`${backBtn('lab','Laboratorio')}<section class="card"><h2 style="margin:0 0 6px">${MV.ok}/${MV.tot} decisiones correctas</h2>
  <div class="steps">${SEQ.map(x=>{const l=MV.log.find(y=>y.b===x);return `<span class="${l?(l.unsafe?'ko':'ok'):''}">${x}${l?(l.unsafe?' ✗':' ✓'):' —'}</span>`}).join('')}</div>
  <div class="kv"><span>Resultado</span><b>${unsafe.length?'Prueba POSITIVA (seguridad alterada)':'Sin alteraciones de la seguridad'}</b></div>
  ${unsafe.length?`<div class="kv"><span>Inseguros</span><b>${unsafe.join(', ')}</b></div>`:''}
  <div class="kv"><span>Seguros</span><b>${safe.join(', ')||'—'}</b></div>
  <p class="small" style="margin-top:10px">Recuerda: se recomendará el <b>mayor volumen</b> y la <b>menor viscosidad</b> que hayan resultado seguros, valorando también la eficacia (hidratación y nutrición suficientes).</p>
  <div class="row"><button class="btn primary" data-go="mecv">Otro paciente</button><button class="btn ghost" data-go="lab">Laboratorio</button></div></section>`,'#12a37a');
}

/* ---------- OpoEscalas ---------- */
let EX={cat:'Todas',round:null};
function escalasHome(){
  lastView='escalas';
  const cats=['Todas',...new Set(ESCALAS.map(e=>e[1]))];
  render(`${backBtn()}
  ${heroBox('OpoEscalas exprés','Signos, escalas y sondas',`Rondas de 10 tarjetas. Unas veces verás el nombre y otras la descripción. Récord: <b>${S.esc.best||0}/10</b>`,'#12a37a')}
  <div class="card">
    <h3>Elige mazo</h3>
    <div class="filters" data-group="cat">${cats.map(c=>`<button class="${EX.cat===c?'on':''}" data-v="${c}">${c} (${c==='Todas'?ESCALAS.length:ESCALAS.filter(e=>e[1]===c).length})</button>`).join('')}</div>
    <div style="margin-top:16px" class="row"><button class="btn primary" data-exgo>Empezar ronda${I('adelante')}</button></div>
    <details style="margin-top:16px"><summary class="small" style="cursor:pointer;font-weight:700">Ver el mazo completo para estudiar</summary>
      <div style="margin-top:10px">${ESCALAS.filter(e=>EX.cat==='Todas'||e[1]===EX.cat).map(e=>`<div class="kv" style="display:block"><b>${esc(e[0])}</b> <span class="small">· ${esc(e[1])}</span><div style="font-size:14px">${esc(e[2])}${e[3]?` <span class="small">${esc(e[3])}</span>`:''}</div></div>`).join('')}</div></details>
  </div>`,'#12a37a');
}
function exStart(){
  const deck=ESCALAS.filter(e=>EX.cat==='Todas'||e[1]===EX.cat);
  const cards=shuffle(deck).slice(0,10).map(e=>{
    const rev=Math.random()<.5;
    let pool=deck.filter(x=>x!==e&&x[2]!==e[2]);
    if(pool.length<3) pool=ESCALAS.filter(x=>x!==e&&x[2]!==e[2]);
    const same=shuffle(pool.filter(x=>x[1]===e[1])),other=shuffle(pool.filter(x=>x[1]!==e[1]));
    return {e,rev,opts:shuffle([e,...[...same,...other].slice(0,3)]),pick:null};
  });
  EX.round={cards,i:0,ok:0};exDraw();
}
const exTrack=R=>R.cards.map((x,i)=>(i?`<span class="seg${i<=R.i?' done':''}"></span>`:'')+`<span class="dot${i===R.i?' cur':''}${x.pick!==null?(x.pick===x.opts.indexOf(x.e)?' ok':' ko'):''}"></span>`).join('');
function exDraw(){
  const R=EX.round,c=R.cards[R.i];
  render(`
  <div class="qtop"><button class="btn ghost" data-go="escalas">${I('ko')}Salir</button><div class="qtitle">OpoEscalas · ${esc(EX.cat)}</div><div class="qright"><span class="qcount">${R.i+1}/${R.cards.length}</span></div></div>
  <div class="trackWrap" style="padding-top:6px" aria-hidden="true"><div class="track">${exTrack(R)}</div></div>
  <article class="qcard flash">
    <div class="qchips"><span class="chip stn" style="--lc:#12a37a">${esc(c.e[1])}</span></div>
    <div class="small" style="font-weight:700">${c.rev?'¿A qué corresponde esta descripción?':'¿Qué es o qué valora…?'}</div>
    <div class="term">${esc(c.rev?c.e[2]:c.e[0])}</div>
    <div class="opts">${c.opts.map((o,i)=>`<button class="opt" data-ex="${i}"><span class="k">${L[i]}</span><span>${esc(c.rev?o[0]:o[2])}</span></button>`).join('')}</div>
    <div class="fb" aria-live="polite"></div>
  </article>`,'#12a37a');
}
function exAnswer(i){
  const R=EX.round,c=R.cards[R.i];if(c.pick!==null)return;
  c.pick=i;const k=c.opts.indexOf(c.e),ok=i===k;if(ok){R.ok++;SND.ok()}else SND.ko();
  $$('.opt').forEach((b,j)=>{b.disabled=true;b.classList.add(j===k?'ok':j===i?'ko':'dim')});
  const fb=$('.fb');fb.className='fb show '+(ok?'ok':'ko');
  fb.innerHTML=`<div class="fbHead">${ok?I('ok')+'Correcto':I('ko')+'Era la '+L[k]+')'}</div><p class="why"><b>${esc(c.e[0])}:</b> ${esc(c.e[2])} ${c.e[3]?esc(c.e[3]):''}</p><div class="fbAct"><button class="btn primary" data-exnext>${R.i===R.cards.length-1?'Ver resultado':'Siguiente'}${I('adelante')}</button></div>`;
  $('.track').innerHTML=exTrack(R);
  fb.querySelector('button').focus({preventScroll:true});
}
function exNext(){
  const R=EX.round;
  if(R.i<R.cards.length-1){R.i++;exDraw();return}
  const r10=Math.round(R.ok*10/R.cards.length),best=r10>(S.esc.best||0);if(best){S.esc.best=r10;save()}
  const fails=R.cards.filter(c=>c.pick!==c.opts.indexOf(c.e));SND.arrive();
  render(`<section class="res"><div class="card" style="text-align:center">${ringSVG(R.ok/R.cards.length,120,R.ok>=8?'#12936a':'#0aa8e5',R.ok+'/'+R.cards.length)}<h2 style="margin:8px 0 2px">${R.ok>=8?'Excelente':R.ok>=5?'Bien':'A seguir practicando'}</h2><p class="small">${best?'Nuevo récord personal':'Récord: '+(S.esc.best||0)+'/10'}</p>
    <div class="row" style="justify-content:center"><button class="btn primary" data-exgo>Otra ronda</button><button class="btn ghost" data-go="escalas">Cambiar mazo</button><button class="btn ghost" data-go="home">Mapa</button></div></div>
    ${fails.length?`<div class="sectionTitle"><h2>Para fijar</h2></div>${fails.map(c=>`<div class="revItem"><b>${esc(c.e[0])}</b> <span class="small">· ${esc(c.e[1])}</span><div style="font-size:14px;margin-top:4px">${esc(c.e[2])} ${c.e[3]?`<span class="small">${esc(c.e[3])}</span>`:''}</div></div>`).join('')}`:''}</section>`,'#12a37a');
}

/* ---------- obsoletas ---------- */
function archivo(){
  lastView='archivo';
  const flagged=DOCENTE?EXAM.filter(q=>q.f):[];
  const card=q=>`<details class="revItem"><summary><span class="st" style="background:${q.st?'#b7791f':'#5d7089'}">${I(q.st?'arena':'trampa')}</span><span>${esc(q.q.length>150?q.q.slice(0,150)+'…':q.q)}</span></summary><div class="body">
    <p class="small">${esc(q.ex)} · ${esc(stById[q.s].name)}</p>
    <div class="opts">${q.o.map((o,i)=>`<div class="opt${q.a===i?' ok':q.orig===i?' ko':''}"><span class="k">${L[i]}</span><span>${esc(o)}${q.st&&q.a===i?' <span class="add" style="color:var(--ok);background:var(--okbg)">hoy correcta</span>':''}${q.orig===i?' <span class="add">clave del tribunal</span>':''}</span></div>`).join('')}</div>
    <p class="why" style="margin-top:10px"><b>${q.st?'Qué ha cambiado:':'Por qué:'}</b> ${why(q.e)}</p>${q.f?`<div class="flag">${esc(q.f)}</div>`:''}</div></details>`;
  render(`${backBtn()}
  ${heroBox('Laboratorio crítico','Preguntas obsoletas','Salieron en examen con un criterio que la evidencia actual ha cambiado. Practicarlas te enseña lo nuevo y te prepara para impugnar con fundamento. También aparecen en sus estaciones y en tu repaso.','#b7791f')}
  <button class="btn primary" data-obsgo style="margin-bottom:14px">Practicarlas (${OBS.length})${I('adelante')}</button>
  ${OBS.map(card).join('')}
  ${DOCENTE?`<div class="sectionTitle"><h2>Claves discutidas (${flagged.length})</h2><span class="small">Visible solo en modo docente</span></div>${flagged.map(card).join('')}`:''}`,'#b7791f');
}

/* ---------- informe ---------- */
function informe(){
  lastView='informe';
  const g=globalStats();
  const cons=Object.entries(CONCEPTOS).map(([k,l])=>{const t=statsOf(ALL.filter(q=>q.t===k));return {l,t,acc:pct(t.ok,t.n)}}).filter(x=>x.t.n>=3).sort((a,b)=>a.acc-b.acc);
  render(`${backBtn()}
  ${heroBox('Informe de progreso','Mi informe · Digestivo',`Generado el ${new Date().toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'})}. Puedes descargarlo o imprimirlo para enviárselo a tu docente.`,'#0b2a55')}
  <div class="row noPrint" style="margin-bottom:12px"><button class="btn primary" data-csv>${I('descarga')}Descargar CSV</button><button class="btn ghost" data-print>${I('imprimir')}Imprimir o guardar en PDF</button></div>
  <section class="grid2">
    <div class="card"><h3>Por estaciones</h3><table class="tbl"><tr><th>Estación</th><th>Dominadas</th><th>Precisión</th><th>En repaso</th></tr>
      ${ST.map(s=>{const t=stationStats(s.id);return `<tr><td><span style="color:${LINES[s.line].c}">●</span> ${s.name}</td><td class="r">${t.mastered}/${t.total}</td><td class="r">${t.n?pct(t.ok,t.n)+' %':'—'}</td><td class="r">${t.pending}</td></tr>`}).join('')}
      <tr><td><b>Total</b></td><td class="r">${g.mastered}/${g.total}</td><td class="r">${g.n?g.acc+' %':'—'}</td><td class="r">${g.pending}</td></tr></table></div>
    <div class="card"><h3>Conceptos más flojos</h3>${cons.length?cons.slice(0,8).map(c=>`<div class="kv"><span>${esc(c.l)}</span><b>${c.acc} % <span class="small">(${c.t.n} resp.)</span></b></div>`).join(''):'<p class="small">Responde al menos 3 preguntas de un concepto para verlo aquí.</p>'}
      <h3 style="margin-top:16px">Otros datos</h3>
      <div class="kv"><span>Respuestas dadas</span><b>${g.n}</b></div>
      <div class="kv"><span>Días seguidos estudiando</span><b>${dayStreak()}</b></div>
      <div class="kv"><span>Mejor racha de aciertos</span><b>${S.best||0}</b></div>
      <div class="kv"><span>Simulacros (última nota)</span><b>${S.sims.length} ${S.sims[0]?'('+S.sims[0].nota.toFixed(2)+')':''}</b></div>
      <div class="kv"><span>Récord OpoEscalas</span><b>${S.esc.best||0}/10</b></div></div>
  </section>
  <div class="sectionTitle"><div><span class="eyebrow">${S.badges.length} de ${BADGES.length}</span><h2>Mis insignias</h2></div></div>
  <section class="badges">${BADGES.map(b=>`<div class="bdg ${S.badges.includes(b.id)?'':'off'}"><div class="md" style="background:${b.c}">${I('medalla')}</div><b>${esc(b.t)}</b><span>${esc(b.d)}</span></div>`).join('')}</section>`,'#0b2a55');
}
function csv(){
  const rows=[['id','estacion','concepto','examen','estado','vistas','aciertos','racha_segura','en_repaso','dominada']];
  ALL.forEach(q=>{const r=S.q[q.id]||{n:0,ok:0,st:0,r:0};rows.push([q.id,stById[q.s].name,CONCEPTOS[q.t]||q.t,q.ex,q.st?'obsoleta':'vigente',r.n,r.ok,r.st,r.r?'sí':'no',r.st>=2?'sí':'no'])});
  const txt='\ufeff'+rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(';')).join('\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'text/csv;charset=utf-8'}));a.download='informe-opometro-digestivo.csv';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);
}

/* ---------- navegación y eventos ---------- */
function go(k){
  if(k==='home'||k==='mapa'){home();if(k==='mapa')setTimeout(()=>{const m=$('.mapCard');(m&&m.offsetParent?m:$('.metroV')).scrollIntoView({behavior:'smooth'})},50);return}
  const V={capsulas,ostomias,sim:simSetup,escalas:escalasHome,archivo,cae,trampas,casos,lab,informe,bristol,mecv,buscar,colon:()=>{COL.mode='explore';colon()}};
  if(V[k]) return V[k]();
  if(k==='repaso'){const items=shuffle(ALL.filter(q=>isDue(q.id))).slice(0,20);return startQuiz(items,{mode:'repaso',title:'Repaso inteligente',color:'#d23f57'})}
  if(k==='dia') return startQuiz(dailyTrip(),{mode:'dia',title:'Viaje del día',color:'#0aa8e5'});
  if(k==='next'){const s=ST.slice().sort((a,b)=>{const A=stationStats(a.id),B=stationStats(b.id);return pct(A.mastered,A.total)-pct(B.mastered,B.total)})[0];return station(s.id)}
}
document.addEventListener('click',e=>{
  const t=e.target.closest('button,[data-st],[data-seg]');if(!t||!t.closest('#app,#top'))return;
  const d=t.dataset;
  if(t.hasAttribute('data-snd')){S.snd=!S.snd;save();topbar();if(S.snd)SND.ok();return}
  if(d.go) return go(d.go);
  if(t.hasAttribute('data-reset')){if(confirm('¿Borrar todo tu progreso en este navegador?')){S={q:{},sims:[],esc:{best:0},lab:{},days:{},badges:[],snd:S.snd,best:0};save();home()}return}
  if(d.seg){COL.sel=d.seg;return colon()}
  if(d.st&&!d.trip) return station(d.st);
  if(d.trip){const s=stById[d.trip];return startQuiz(pickTrip(d.trip,d.n),{mode:'station',title:s.name,color:LINES[s.line].c,back:d.trip})}
  if(d.concepto) return startQuiz(prioritize(ALL.filter(q=>q.t===d.concepto),15),{mode:'concepto',title:CONCEPTOS[d.concepto],color:'#c27a12',back:'cae'});
  if(d.trampa) return trampa(d.trampa);
  if(d.trapgo){const t=TRAMPAS.find(x=>x.id===d.trapgo);return startQuiz(prioritize(trapQs(d.trapgo),'all'),{mode:'trampa',title:'Trampa: '+t.t,color:'#d23f57',back:'trampa:'+d.trapgo,rule:t})}
  if(d.caso){const c=CASOS.find(x=>x.id===d.caso);return startQuiz(casoItems(c),{mode:'caso',title:'Supuesto: '+c.t,color:colorOf(c.s),back:'casos'})}
  if(d.hit) return startQuiz([byId[d.hit]],{mode:'buscar',title:'Pregunta del buscador',color:'#0b2a55',back:'buscar'});
  if(t.hasAttribute('data-hitsall')) return startQuiz(($('#hits')._ids||[]).map(i=>byId[i]),{mode:'buscar',title:'Búsqueda: '+BQ,color:'#0b2a55',back:'buscar'});
  if(t.hasAttribute('data-obsgo')) return startQuiz(shuffle(OBS),{mode:'obs',title:'Preguntas obsoletas',color:'#b7791f',back:'archivo'});
  if(d.pos!==undefined) return answer(+d.pos);
  if(d.sure!==undefined) return next(d.sure==='1');
  if(t.hasAttribute('data-next')){if(G.i<G.items.length-1){G.i++;drawQ()}else{const blank=G.items.filter(i=>i.pick===null).length;if(!blank||confirm(`Tienes ${blank} sin responder (cuentan como en blanco). ¿Entregar?`))finish()}return}
  if(t.hasAttribute('data-prev')){G.i--;drawQ();return}
  if(t.hasAttribute('data-exit')){if(G.mode==='sim'&&G.items.some(i=>i.pick!==null)&&!confirm('¿Salir del simulacro? Se perderán las respuestas.'))return;clearInterval(G.tm);return goBack(G.back)}
  if(t.hasAttribute('data-backto')) return goBack(G.back);
  if(t.hasAttribute('data-redo')) return startQuiz(shuffle(G.fails),{mode:'repaso',title:'Repetir fallos',color:'#d23f57',back:G.back,rule:G.rule});
  const grp=t.parentElement&&t.parentElement.dataset.group;
  if(grp==='n'){SIM.n=+d.v;return simSetup()}
  if(grp==='s'){SIM.s=d.v;return simSetup()}
  if(grp==='org'){SIM.org=d.v;return simSetup()}
  if(grp==='cat'){EX.cat=d.v;return escalasHome()}
  if(t.hasAttribute('data-simgo')){const items=shuffle(simPool()).slice(0,SIM.n);const f=[SIM.org!=='all'?SIM.org:'',SIM.s!=='all'?stById[SIM.s].name:'',SIM.rec?'desde '+RECENT:''].filter(Boolean).join(' · ');return startQuiz(items,{mode:'sim',title:'Simulacro OPE',color:'#3c3fb8',filtro:f,back:'sim',secs:SIM.crono?items.length*60:0})}
  if(t.hasAttribute('data-exgo')) return exStart();
  if(d.ex!==undefined) return exAnswer(+d.ex);
  if(t.hasAttribute('data-exnext')) return exNext();
  if(t.hasAttribute('data-colonquiz')){COL.mode='quiz';COL.round={order:shuffle(SEGS.map(s=>s.k)),i:0,ok:0,state:{},done:false};return colonQuiz()}
  if(d.cons!==undefined) return colonAnswer(+d.cons);
  if(t.hasAttribute('data-colonnext')) return colonNext();
  if(d.vid) return capsula(d.vid);
  if(d.vq!==undefined) return vqAnswer(+d.vq);
  if(t.hasAttribute('data-vqnext')) return vqNext();
  if(t.hasAttribute('data-vredo')){VQ.i=0;VQ.ok=0;VQ.done=false;return vqDraw()}
  if(d.vreal){const v=VIDEOS.find(x=>x.id===d.vreal);return startQuiz(prioritize(ALL.filter(q=>new RegExp(v.buscar,'i').test(q.q)),'all'),{mode:'video',title:'Preguntas reales: '+v.t,color:'#d23f57',back:'capsulas'})}
  if(t.hasAttribute('data-ostogo')) return ostoStart();
  if(t.hasAttribute('data-ostover')) return ostoVer();
  if(t.hasAttribute('data-ostonext')){if(OS.f<OSTO.length-1){OS.f++;return ostoPhase()}return ostoRuta()}
  if(d.ochip!==undefined){if(t._dragged)return;const i=+d.ochip;OS.sel=OS.sel===i?null:i;$$('.oChip').forEach(b=>b.classList.toggle('sel',+b.dataset.ochip===OS.sel));$$('.oz.tgt').forEach(z=>z.classList.toggle('ready',OS.sel!==null));return}
  if(d.oz){if(OS&&OS.sel!==null)ostoPlace(OS.sel,d.oz);else toast(`${I('bombilla')}<span>Primero elige una etiqueta de abajo y después toca su hueco.</span>`,1);return}
  if(d.oruta) return ostoRutaPick(d.oruta,t);
  if(d.br!==undefined) return bristolAnswer(+d.br);
  if(t.hasAttribute('data-brnext')) return bristolNext();
  if(d.mv!==undefined) return mecvAnswer(+d.mv);
  if(t.hasAttribute('data-mvnext')) return mecvNextStep();
  if(t.hasAttribute('data-csv')) return csv();
  if(t.hasAttribute('data-print')) return window.print();
});
app.addEventListener('change',e=>{if(e.target.matches('[data-rec]')){SIM.rec=e.target.checked;simSetup()}if(e.target.matches('[data-crono]')){SIM.crono=e.target.checked}});
app.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('g.st,[data-seg]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}))}});
document.addEventListener('keydown',e=>{
  if(e.altKey||e.ctrlKey||e.metaKey||/input|textarea|select/i.test(e.target.tagName))return;
  const k=e.key.toLowerCase();
  const opts=$$('.opt:not([disabled])',app).filter(b=>b.tagName==='BUTTON');
  const idx='abcde'.indexOf(k)>=0?'abcde'.indexOf(k):'12345'.indexOf(k);
  if(idx>=0&&opts[idx]&&k.length===1){opts[idx].click();e.preventDefault();return}
  if(k==='s'){const b=$('[data-sure="1"]',app);if(b){b.click();e.preventDefault()}}
  if(k==='d'){const b=$('[data-sure="0"]',app);if(b&&$('[data-sure="1"]',app)){b.click();e.preventDefault()}}
  if(k==='enter'&&e.target.tagName!=='BUTTON'){const b=$('.fbAct .btn.primary',app)||$('[data-next]:not([disabled])',app);if(b){b.click();e.preventDefault()}}
});
if(self!==top)document.body.classList.add('embedded');
SC.init();
topbar();
home();
