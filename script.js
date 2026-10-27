const WA = '917065247585';

const $ = s => {
  const el = document.querySelector(s);
  if (!el) console.warn('Missing element:', s);
  return el || document.createElement('div');
};
const today = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

/* ---------- DATA ---------- */
const stories = [
 {t:'Royal Heritage Pheras', c:'Rhea & Kabir', loc:'Jaipur, Rajasthan', k:'Palace Wedding, 2025', d:'A golden morning ceremony amidst heritage arches, crimson silks, and handwritten vows.', cats:['palace'], img:'images/story1.jpg', more:['images/m1.jpg','images/m2.jpg','images/m3.jpg']},
 {t:'Lakeside Evening Romance', c:'Meera & Siddharth', loc:'Udaipur, Rajasthan', k:'Lake Pichola Celebration, 2025', d:'Floating oil lamps, quiet glances across mirrored waters, and royal decor.', cats:['palace','destinations'], img:'images/story2.jpg', more:['images/m4.jpg','images/m5.jpg']},
 {t:'Sufi Nights & Banyan Shadows', c:'Tanya & Arjun', loc:'New Delhi', k:'Farm Estate Wedding, 2024', d:'Soulful Sufi melodies, midnight fairy lights under banyan trees, and non-stop celebration.', cats:['delhi'], img:'images/story3.jpg', more:['images/m6.jpg','images/m7.jpg']},
 {t:'Intimate Pine Glade Vows', c:'Ananya & Dev', loc:'Mashobra, Himachal', k:'Mountain Destination, 2024', d:'Forty loved ones in a pine forest, cozy wool shawls, and bonfire celebrations under starry skies.', cats:['destinations'], img:'images/story4.jpg', more:['images/m8.jpg']}
];

const filters = [['all','All'],['palace','Palaces & forts'],['destinations','Destinations'],['delhi','Delhi estates']];

const moments = [
 ['The Quiet Gaze','A fleeting pause right before stepping onto the mandap.','images/mom1.jpg'],
 ['Heirloom Gold','Hands adorned with ancestral rings passed through generations.','images/mom2.jpg'],
 ['Unscripted Laughter','An unexpected funny whisper that broke all wedding jitters.','images/mom3.jpg'],
 ['Royal Swirls','Hand-woven zardozi swirling gracefully on the dance floor.','images/mom4.jpg']
];

const chapters = [
 ['Palace arrival by boat','Lake Pichola, Udaipur','images/chap1.jpg'],
 ['The dawn vows','Jaipur','images/chap2.jpg'],
 ['Varmala under jasmine','Rajasthan','images/chap3.jpg'],
 ['Midnight lanterns & sufi','Delhi NCR','images/chap4.jpg']
];

const services = [
 ['Fine-Art Wedding Photography','Candid, editorial, and documentary coverage'],
 ['Cinematic Wedding Films','4K films with personalized ambient audio soundscapes'],
 ['Pre-Wedding Concept Stories','Intimate editorial sessions tailored to your journey'],
 ['Aerial & Drone Cinema','Breathtaking bird’s-eye perspective of your grand venue'],
 ['Handcrafted Fine-Art Albums','Archival-grade leather & linen keepsake coffee table books']
];

const pkgs = [
 {n:'The Intimate Heritage', s:'1–2 Days Coverage', d:'Designed for intimate vows, temple pheras, and family home celebrations.', l:['2 Senior Photographers','2 Cinematographers','4K Highlight Film','Full Online Digital Gallery']},
 {n:'The Royal Celebration', s:'2–3 Days Coverage', d:'Complete coverage for Mehendi, Sangeet, Haldi, Pheras & Reception.', l:['Lead Direction by Aakash','4 Cinema + 3 Photo + Drone Crew','30-Minute Feature Film + Teaser Reel','12x18 Handmade Linen Album'], hot:1},
 {n:'The Global Destination', s:'Worldwide Travel', d:'A dedicated traveling crew for palace, coastal, and luxury international weddings.', l:['Full Specialized Travel Team','Pre-Wedding Concept Session','Next-Day Express Teaser Reel','2 Luxury Leather Family Albums']}
];

/* ---------- Mobile menu ---------- */
const menu = $('#menu');
function setMenu(open) {
  menu.classList.toggle('hidden', !open);
  menu.classList.toggle('flex', open);
  $('#menuBtn').setAttribute('aria-expanded', open);
    if (open) $('#menuClose').focus();
}
$('#menuBtn').onclick = () => setMenu(true);
$('#menuClose').onclick = () => setMenu(false);
menu.querySelectorAll('a').forEach(a => a.onclick = () => setMenu(false));

/* ---------- Stories + filter ---------- */
$('#grid').innerHTML = stories.map((s, i) => `
<article class="story bg-bg rounded-3xl p-4 sm:p-6 border border-bd" data-cats="${s.cats.join(' ')}">
  <div class="relative rounded-2xl overflow-hidden mb-5 aspect-[4/3]">
    <span class="absolute top-4 left-4 bg-bg/90 text-xs px-3 py-1 rounded-full">${s.loc}</span>
    <img src="${s.img}" alt="${s.t}, ${s.loc}" class="w-full h-full object-cover" loading="lazy">
  </div>
  <p class="text-xs text-mu mb-1">${s.k}</p>
  <h3 class="font-serif text-3xl font-light">${s.t}</h3>
  <p class="font-serif italic text-mu text-lg mb-3">${s.c}</p>
  <p class="text-sm text-dk/70 mb-5">${s.d}</p>
  <div class="flex items-center gap-3 pt-4 border-t border-bd">
    ${s.more.slice(0, 3).map(m => `<img src="${m}" alt="" class="w-12 h-12 rounded-lg object-cover" loading="lazy">`).join('')}
    <button data-open="${i}" class="h-12 px-4 rounded-lg bg-dk text-bg hover:opacity-90 text-xs transition">View ${s.more.length + 1} frames</button>
  </div>
</article>`).join('');

$('#filters').innerHTML = filters.map(([k, l], i) => `<button data-f="${k}" class="fbtn px-5 py-2 rounded-full text-sm border border-bd ${i ? 'bg-bg' : 'btn'}">${l}</button>`).join('');

$('#filters').addEventListener('click', e => {
  const b = e.target.closest('[data-f]');
  if (!b) return;
  document.querySelectorAll('.fbtn').forEach(x => { x.classList.remove('btn'); x.classList.add('bg-bg'); });
  b.classList.remove('bg-bg');
  b.classList.add('btn');
  document.querySelectorAll('.story').forEach(c => c.style.display = (b.dataset.f === 'all' || c.dataset.cats.split(' ').includes(b.dataset.f)) ? '' : 'none');
});

/* ---------- Gallery modal ---------- */
const modal = $('#modal');

let lastFocus;
function openModal(i) {
  lastFocus = document.activeElement;
  const s = stories[i];
  $('#mTitle').textContent = s.t;
  $('#mGrid').innerHTML = [s.img, ...s.more].map(m => `<img src="${m}" alt="${s.t}" class="rounded-xl object-cover w-full h-40">`).join('');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  $('#mClose').focus();
}
function closeModal() {
  if (modal.classList.contains('hidden')) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  lastFocus?.focus();
}

$('#grid').addEventListener('click', e => {
  const b = e.target.closest('[data-open]');
  if (b) openModal(+b.dataset.open);
});
$('#mClose').onclick = closeModal;
$('#mCta').onclick = closeModal;
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
function trapTab(e, box) {
  const items = [...box.querySelectorAll('a[href], button, input, select, textarea')];
  if (!items.length) return;
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); setMenu(false); }
  if (e.key === 'Tab') {
    if (!modal.classList.contains('hidden')) trapTab(e, modal);
    else if (!menu.classList.contains('hidden')) trapTab(e, menu);
  }
});

/* ---------- Moments ---------- */
$('#moments').innerHTML = moments.map(m => `
<figure class="bg-bg p-3 rounded-2xl border border-bd">
  <img src="${m[2]}" alt="${m[0]}" class="rounded-xl aspect-[4/5] object-cover w-full mb-3" loading="lazy">
  <figcaption><h4 class="font-serif text-xl">${m[0]}</h4><p class="text-xs text-mu mt-1">${m[1]}</p></figcaption>
</figure>`).join('');

/* ---------- Films ---------- */
const VIDEO_ID = '';
function setChapter(i) {
  const c = chapters[i];
  $('#poster').src = c[2];
  $('#chTitle').textContent = c[0];
  $('#chSub').textContent = c[1] + ' · Directed by Aakash';
  document.querySelectorAll('.chap').forEach((b, j) => {
    b.classList.toggle('bg-bg/15', j === i);
    b.classList.toggle('border-bg/40', j === i);
    b.classList.toggle('bg-bg/5', j !== i);
    b.classList.toggle('border-bg/10', j !== i);
    b.setAttribute('aria-pressed', j === i);
  });
  $('#videoNote').textContent = '';
}
$('#chapters').innerHTML = chapters.map((c, i) => `<button class="chap p-3 rounded-xl border text-left transition" data-ch="${i}"><span class="block text-xs text-bg/60">Chapter ${i + 1}</span><span class="block font-serif text-base mt-1">${c[0]}</span></button>`).join('');

$('#chapters').addEventListener('click', e => {
  const b = e.target.closest('[data-ch]');
  if (b) setChapter(+b.dataset.ch);
});

$('#play').onclick = () => {
  if (VIDEO_ID) {
    $('#play').parentElement.innerHTML = `<iframe class="w-full h-full" src="https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1" title="LX Studio wedding film" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
  } else {
    $('#videoNote').innerHTML = `Full films are shared on request. <a class="underline" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent('Hi Aakash, I would like to see your wedding films.')}">Ask Aakash on WhatsApp</a>.`;
  }
};
setChapter(0);

/* ---------- Albums ---------- */
const albums = [
  ['Heirloom Leather', 'Handcrafted Italian leather cover with lay-flat pages. Made to be passed down.', 'images/alb1.jpg'],
  ['Linen Signature', '12x18 linen-bound album with a debossed cover, soft and understated.', 'images/alb2.jpg'],
  ['Parent Albums', 'Smaller matching copies for both families, so everyone has their own.', 'images/alb3.jpg']
];
const albumSteps = [['You choose', 'Pick your favourite frames from the gallery.'], ['We design', 'Aakash lays out every spread by hand.'], ['You approve', 'Review the design and request changes.'], ['We bind', 'Archival print, handbound and delivered to you.']];

$('#albumCards').innerHTML = albums.map(a => `
<article>
  <img src="${a[2]}" alt="${a[0]} wedding album" class="rounded-2xl aspect-[4/5] object-cover w-full mb-5" loading="lazy">
  <h3 class="font-serif text-2xl mb-2">${a[0]}</h3>
  <p class="text-sm text-bg/75 leading-relaxed">${a[1]}</p>
</article>`).join('');

$('#albumSteps').innerHTML = albumSteps.map((a, i) => `<li><p class="font-serif text-4xl mb-2">${i + 1}</p><h4 class="font-medium mb-1">${a[0]}</h4><p class="text-sm text-bg/75">${a[1]}</p></li>`).join('');

/* ---------- Services + packages ---------- */
$('#serviceList').innerHTML = services.map(s => `
<div class="py-6 flex items-center justify-between gap-4">
  <div><h3 class="font-serif text-2xl sm:text-3xl font-light">${s[0]}</h3><p class="text-sm text-mu mt-1">${s[1]}</p></div>
  <a href="#contact" data-svc="${s[0]}" class="text-sm text-mu hover:text-dk whitespace-nowrap underline">Inquire</a>
</div>`).join('');

$('#pkgs').innerHTML = pkgs.map(p => `
<div class="bg-bg rounded-3xl p-8 flex flex-col justify-between ${p.hot ? 'border-2 border-dk' : 'border border-bd'}">
  <div>
    ${p.hot ? '<p class="text-xs font-semibold text-bg bg-dk inline-block px-3 py-1 rounded-full mb-3">Most booked</p>' : ''}
    <h3 class="font-serif text-2xl">${p.n}</h3>
    <p class="text-sm text-mu mb-4">${p.s}</p>
    <p class="text-sm text-dk/70 mb-6">${p.d}</p>
    <ul class="text-sm space-y-2 border-t border-bd pt-5 mb-8">${p.l.map(x => `<li>${x}</li>`).join('')}</ul>
  </div>
  <a href="#contact" data-svc="Package: ${p.n}" class="${p.hot ? 'btn' : 'border border-dk/20 hover:bg-dk hover:text-bg'} text-center w-full py-3 rounded-xl text-sm font-medium transition">Request a proposal</a>
</div>`).join('');

document.addEventListener('click', e => {
  const a = e.target.closest('[data-svc]');
  if (!a) return;
  const note = $('#fNotes');
  const line = 'Inquiring about: ' + a.dataset.svc;
  if (!note.value.includes(line)) note.value = note.value ? note.value + '\n' + line : line;
});

/* ---------- Inquiry form ---------- */
let step = 1;
function show(n) {
  step = n;
  document.querySelectorAll('[data-step]').forEach(el => el.classList.toggle('hidden-step', +el.dataset.step !== n));
  $('#stepNum').textContent = n;
  $('#back').classList.toggle('invisible', n === 1);
  $('#next').textContent = n === 3 ? 'Send on WhatsApp' : 'Next';
  $('#formErr').textContent = '';
}

function valid() {
  const err = m => ($('#formErr').textContent = m, false);
  if (step === 1) {
    if (!$('#fDate').value) return err('Please choose your wedding date.');
  }
  if (step === 2) {
    if (!$('#fNames').value.trim()) return err('Please enter the couple’s names.');
    if ($('#fPhone').value.replace(/\D/g, '').length < 10) return err('Please enter a valid phone number with at least 10 digits.');
  }
  return true;
}

$('#next').onclick = () => {
  if (!valid()) return;
  if (step < 3) return show(step + 1);
  const msg = `Hi Aakash, I would like to check your availability.\nCouple: ${$('#fNames').value.trim()}\nDate: ${$('#fDate').value}\nCity: ${$('#fCity').value}\nVenue: ${$('#fVenue').value.trim() || '-'}\nPhone: ${$('#fPhone').value.trim()}\nNotes: ${$('#fNotes').value.trim() || '-'}`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  $('#formErr').className = 'text-sm text-dk font-semibold min-h-[1.25rem]';
  $('#formErr').textContent = 'WhatsApp opened with your details. Press send there to finish.';
};

$('#back').onclick = () => show(step - 1);
$('#form').addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); $('#next').click(); } });
$('#fDate').min = today();