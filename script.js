/* ChambaLink – prototipo visual. Datos ficticios, sin backend. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const cats = ['Gastronomía', 'Comercio', 'Servicios', 'Tecnología'];
const catColor = { 'Gastronomía': ['#ffe3b0', '🍽️'], 'Comercio': ['#d8f1e5', '🛍️'], 'Servicios': ['#dde8ff', '🛠️'], 'Tecnología': ['#f3dcff', '💻'] };

const jobs = [
  { t: 'Mozo/a medio tiempo', n: 'Restaurante Sabor Wanka', d: 'Huancayo', c: 'Gastronomía', s: 700, h: '4 pm - 10 pm', tipo: 'Medio tiempo', hot: 1 },
  { t: 'Vendedor/a de tienda', n: 'Bazar El Tambo', d: 'El Tambo', c: 'Comercio', s: 950, h: '9 am - 5 pm', tipo: 'Tiempo completo' },
  { t: 'Soporte técnico junior', n: 'TecnoAndes', d: 'Chilca', c: 'Tecnología', s: 1200, h: 'Lun a Vie', tipo: 'Tiempo completo' },
  { t: 'Ayudante de cocina', n: 'Pollería Los Andes', d: 'Huancayo', c: 'Gastronomía', s: 800, h: '10 am - 4 pm', tipo: 'Medio tiempo', hot: 1 },
  { t: 'Community manager', n: 'Café Mantaro', d: 'El Tambo', c: 'Servicios', s: 900, h: 'Remoto parcial', tipo: 'Por horas' },
  { t: 'Repartidor/a en moto', n: 'Minimarket Chilca', d: 'Chilca', c: 'Comercio', s: 1000, h: '2 pm - 9 pm', tipo: 'Medio tiempo' },
  { t: 'Diseñador/a gráfico', n: 'Imprenta Wanka', d: 'Huancayo', c: 'Tecnología', s: 1100, h: 'Flexible', tipo: 'Por horas' },
  { t: 'Asistente de limpieza', n: 'Lavandería Express', d: 'El Tambo', c: 'Servicios', s: 750, h: '8 am - 2 pm', tipo: 'Medio tiempo' }
];

const bizs = [
  { n: 'Restaurante Sabor Wanka', c: 'Gastronomía', d: 'Huancayo', r: 4.8, p: [['Menú del día', 12], ['Trucha frita', 22], ['Papa a la huancaína', 10]] },
  { n: 'Bazar El Tambo', c: 'Comercio', d: 'El Tambo', r: 4.5, p: [['Mochila escolar', 45], ['Útiles (pack)', 18], ['Zapatillas', 79]] },
  { n: 'TecnoAndes', c: 'Tecnología', d: 'Chilca', r: 4.7, p: [['Mantenimiento PC', 50], ['Instalación Wi-Fi', 80], ['Página web básica', 350]] },
  { n: 'Café Mantaro', c: 'Servicios', d: 'El Tambo', r: 4.6, p: [['Café + pan', 8], ['Torta del día', 9], ['Desayuno completo', 14]] },
  { n: 'Imprenta Wanka', c: 'Tecnología', d: 'Huancayo', r: 4.4, p: [['Tarjetas x100', 25], ['Banner 1x2 m', 40], ['Impresión A4', 0.5]] },
  { n: 'Minimarket Chilca', c: 'Comercio', d: 'Chilca', r: 4.3, p: [['Canasta básica', 60], ['Agua 2.5 L', 4], ['Combo desayuno', 15]] }
];

const applies = [
  ['Mozo/a medio tiempo', 'Sabor Wanka', 'En revisión', 'wait'],
  ['Soporte técnico junior', 'TecnoAndes', 'Aceptada', 'ok'],
  ['Vendedor/a de tienda', 'Bazar El Tambo', 'Enviada', 'info'],
  ['Repartidor/a en moto', 'Minimarket Chilca', 'Rechazada', 'no'],
  ['Community manager', 'Café Mantaro', 'En revisión', 'wait']
];

let bizOffers = [
  ['Mozo/a medio tiempo', 'S/ 700 · 4 pm - 10 pm', 7],
  ['Cocinero/a', 'S/ 1,100 · 8 am - 4 pm', 6],
  ['Ayudante de salón', 'S/ 650 · Fines de semana', 5]
];

let verifs = [['Carlos Huamán', 'DNI · Persona'], ['Pastelería Dulce Valle', 'RUC · Negocio'], ['Ana Salas', 'DNI · Persona']];

/* ---------- navegación ---------- */
function go(view, tab) {
  $$('.view').forEach(v => v.classList.toggle('active', v.id === view));
  $$('nav>a').forEach(a => a.classList.toggle('on', a.dataset.go === view));
  $('#menu').classList.remove('open');
  if (view === 'auth') setTab(tab || 'login');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]');
  if (g) { e.preventDefault(); go(g.dataset.go, g.dataset.tab); }
  const t = e.target.closest('[data-toast]');
  if (t) toast(t.dataset.toast);
});
$('#burger').onclick = () => $('#menu').classList.toggle('open');

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast.id);
  toast.id = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- ofertas ---------- */
function jobCard(j, i) {
  const [bg, ico] = catColor[j.c];
  return `<article class="card job">
    <div class="job-top"><div class="logo-b" style="background:${bg}">${ico}</div>
      <div><h3>${j.t}</h3><small>${j.n}</small></div></div>
    <div class="meta"><span class="pill">📍 ${j.d}</span><span class="pill">${j.tipo}</span>${j.hot ? '<span class="pill hot">Urgente</span>' : ''}</div>
    <small>🕒 ${j.h}</small>
    <div class="job-foot"><span class="sueldo">S/ ${j.s.toLocaleString('es-PE')}</span>
      <button class="btn sm" data-toast="Postulación enviada a ${j.n} (demo)">Postular</button></div>
  </article>`;
}

function renderJobs() {
  const q = $('#jq').value.toLowerCase(), c = $('#jc').value, d = $('#jd').value;
  const list = jobs.filter(j => (!q || (j.t + j.n).toLowerCase().includes(q)) && (!c || j.c === c) && (!d || j.d === d));
  $('#jobGrid').innerHTML = list.length ? list.map(jobCard).join('') : '<div class="card">No hay ofertas con esos filtros. Prueba con otro distrito o categoría.</div>';
  $('#jCount').textContent = `${list.length} oferta(s) encontrada(s)`;
}
cats.forEach(c => $('#jc').insertAdjacentHTML('beforeend', `<option>${c}</option>`));
['#jq', '#jc', '#jd'].forEach(s => $(s).addEventListener('input', renderJobs));

$('#homeJobs').innerHTML = jobs.slice(0, 3).map(jobCard).join('');
$('#homeChips').innerHTML = cats.map(c => `<button class="chip" data-cat="${c}">${catColor[c][1]} ${c}</button>`).join('');

function searchJobs(text, cat, dist) {
  $('#jq').value = text || ''; $('#jc').value = cat || ''; $('#jd').value = dist || '';
  renderJobs(); go('jobs');
}
$('#heroSearch').onsubmit = e => { e.preventDefault(); searchJobs($('#q').value, '', $('#qd').value); };
$('#homeChips').onclick = e => { const b = e.target.closest('[data-cat]'); if (b) searchJobs('', b.dataset.cat); };
renderJobs();

/* ---------- negocios ---------- */
let bizCat = '';
function renderBiz() {
  $('#bizChips').innerHTML = ['Todos', ...cats].map(c =>
    `<button class="chip ${(c === 'Todos' ? '' : c) === bizCat ? 'on' : ''}" data-bc="${c}">${c}</button>`).join('');
  $('#bizGrid').innerHTML = bizs.filter(b => !bizCat || b.c === bizCat).map(b => {
    const [bg, ico] = catColor[b.c];
    return `<article class="card biz">
      <div class="cover" style="background:${bg}">${ico}</div>
      <div class="biz-body"><h3>${b.n}</h3>
        <small class="muted">📍 ${b.d} · ${b.c} · ⭐ ${b.r}</small>
        <ul class="prods">${b.p.map(p => `<li>${p[0]}<b>S/ ${p[1].toFixed(2)}</b></li>`).join('')}</ul>
        <div class="biz-act"><button class="btn sm" data-toast="Abriendo WhatsApp de ${b.n} (demo)">WhatsApp</button>
        <button class="btn sm ghost" data-toast="Calificación guardada (demo)">Calificar</button></div></div>
    </article>`;
  }).join('');
}
$('#bizChips').onclick = e => { const b = e.target.closest('[data-bc]'); if (b) { bizCat = b.dataset.bc === 'Todos' ? '' : b.dataset.bc; renderBiz(); } };
renderBiz();

/* ---------- login / registro ---------- */
function setTab(t) {
  $$('.tab').forEach(b => b.classList.toggle('on', b.dataset.tab === t));
  $('#formLogin').hidden = t !== 'login';
  $('#formReg').hidden = t !== 'reg';
}
$$('.tab').forEach(b => b.onclick = () => setTab(b.dataset.tab));
$('#formLogin').onsubmit = e => { e.preventDefault(); toast('Sesión iniciada (demo)'); go($('#loginRole').value); };
$('#formReg').onsubmit = e => { e.preventDefault(); toast('Cuenta creada (demo)'); go($('#regRole').value); };

/* ---------- paneles ---------- */
$('#applyList').innerHTML = applies.map(a =>
  `<div class="row"><div><b>${a[0]}</b><small>${a[1]}</small></div><span class="badge ${a[3]}">${a[2]}</span></div>`).join('');

function renderOffers() {
  $('#bizOffers').innerHTML = bizOffers.map(o =>
    `<div class="row"><div><b>${o[0]}</b><small>${o[1]}</small></div><span class="badge ok">${o[2]} postulantes</span></div>`).join('');
  $('#nOffers').textContent = bizOffers.length;
}
renderOffers();
$('#newOffer').onsubmit = e => {
  e.preventDefault();
  const s = $('#noS').value;
  bizOffers.unshift([$('#noT').value, `${s ? 'S/ ' + s : 'A convenir'} · ${$('#noH').value || 'Horario flexible'}`, 0]);
  e.target.reset(); renderOffers(); toast('Oferta publicada (demo)');
};

$('#bars').innerHTML = [['Lun', 40], ['Mar', 65], ['Mié', 50], ['Jue', 85], ['Vie', 100], ['Sáb', 55], ['Dom', 30]]
  .map(d => `<div><i style="height:${d[1]}%"></i>${d[0]}</div>`).join('');

function renderVerifs() {
  $('#verifList').innerHTML = verifs.length ? verifs.map((v, i) =>
    `<div class="row"><div><b>${v[0]}</b><small>${v[1]}</small></div>
      <div><button class="btn sm" data-v="${i}" data-ok="1">Aprobar</button> <button class="btn sm ghost" data-v="${i}">Rechazar</button></div></div>`).join('')
    : '<div class="row">No hay verificaciones pendientes.</div>';
  $('#pend').textContent = verifs.length;
}
$('#verifList').onclick = e => {
  const b = e.target.closest('[data-v]'); if (!b) return;
  verifs.splice(+b.dataset.v, 1); renderVerifs();
  toast(b.dataset.ok ? 'Cuenta verificada (demo)' : 'Solicitud rechazada (demo)');
};
renderVerifs();
