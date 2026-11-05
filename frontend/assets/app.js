(() => {
  'use strict';
  const BASE = window.CAMPUS_API_BASE || 'https://zero5nov-workshop.onrender.com';
  const root = new URL('../', document.currentScript.src);
  const pages = {
    browse: 'stitch_college_event_registration_portal/browse_events_campuspulse/code.html',
    details: 'stitch_college_event_registration_portal/event_details_registration_campuspulse/code.html',
    registrations: 'stitch_college_event_registration_portal/my_registrations_campuspulse/code.html',
    organizer: 'stitch_college_event_registration_portal/organizer_portal_attendee_roster_campuspulse/code.html'
  };
  const page = document.body.dataset.page;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const url = (name, id) => { const u = new URL(pages[name], root); if (id) u.searchParams.set('id', id); return u.href; };
  const uuid = value => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
  let student = '';
  try { student = localStorage.getItem('campuspulse.student_id') || ''; } catch (_) {}
  document.body.innerHTML = `
    <header class="site-header"><a class="brand" href="${url('browse')}">◈ CampusPulse</a><nav aria-label="Main navigation">
    ${[['browse','Browse Events'],['registrations','My Registrations'],['organizer','Organizer Portal']].map(([p,t]) => `<a ${p === page ? 'aria-current="page"' : ''} href="${url(p)}">${t}</a>`).join('')}
    </nav></header><main class="app-main"><section class="identity"><label for="student-uuid">Student UUID</label><div class="input-row"><input id="student-uuid" placeholder="Enter an existing student's UUID" value="${esc(student)}"><button id="save-student" type="button">Save student</button></div><small>Used for registrations. Enter the UUID from your student record.</small></section><div id="notice" role="status" aria-live="polite"></div><section id="content" aria-busy="true"><p>Loading…</p></section></main><footer class="site-footer">CampusPulse · Campus events & connections</footer>`;
  const content = document.getElementById('content');
  const notice = document.getElementById('notice');
  const message = (text, error = false) => { notice.textContent = text; notice.className = text ? `notice ${error ? 'error' : ''}` : ''; };
  async function api(path, options = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 60000);
    try {
      const response = await fetch(BASE + path, {...options, signal: controller.signal});
      let data;
      try { data = await response.json(); } catch (_) { throw new Error(`The server returned an unreadable response (${response.status}).`); }
      if (!response.ok) { const error = new Error(data.error || `Request failed (${response.status}).`); error.status = response.status; throw error; }
      return data;
    } catch (error) {
      if (error.name === 'AbortError') throw new Error('The server took too long to respond. Please try again.');
      if (error instanceof TypeError) throw new Error('Unable to reach the server. Check your connection and try again.');
      throw error;
    } finally { clearTimeout(timer); }
  }
  function studentId() {
    const value = document.getElementById('student-uuid').value.trim();
    if (!uuid(value)) throw new Error('Enter a valid student UUID before continuing.');
    student = value;
    try { localStorage.setItem('campuspulse.student_id', value); } catch (_) {}
    return value;
  }
  document.getElementById('save-student').onclick = () => {
    try { studentId(); message('Student saved.'); if (page === 'registrations') load(); }
    catch (error) { message(error.message, true); }
  };
  function card(event, registration) {
    return `<article class="event-card"><div class="card-art">◈</div><div class="card-body"><span class="eyebrow">Campus event</span><h2>${esc(event.title || 'Untitled event')}</h2><p>Capacity: ${esc(event.capacity ?? 'Not specified')}</p>${registration ? `<p class="muted">Registration: ${esc(registration.id)}<br>Registered: ${esc(registration.created_at ? new Date(registration.created_at).toLocaleString() : 'Not supplied')}</p>` : ''}<div class="actions"><a class="button secondary" href="${url('details',event.event_id)}">View details</a>${!registration ? `<button data-register="${esc(event.event_id)}">Register now</button>` : ''}</div></div></article>`;
  }
  async function register(id, button) {
    const original = button.textContent;
    try {
      const student_id = studentId();
      button.disabled = true; button.textContent = 'Registering…'; message('');
      await api('/api/registrations', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({event_id:id, student_id})});
      button.textContent = 'Registered ✓'; message('Registration confirmed. View it in My Registrations.');
    } catch (error) {
      button.disabled = false; button.textContent = original;
      message(error.status === 409 ? 'You are already registered for this event.' : error.message, true);
    }
  }
  content.addEventListener('click', e => { const button = e.target.closest('[data-register]'); if (button) register(button.dataset.register, button); });
  async function browse() {
    const events = await api('/api/events');
    content.innerHTML = `<span class="eyebrow">Discover & experience</span><h1>Campus life starts here.</h1><p class="intro">Explore events and find your next campus connection.</p><label class="sr-only" for="event-search">Search events</label><input id="event-search" class="search" type="search" placeholder="Search event titles…"><p id="results" class="muted"></p><div id="events" class="cards"></div>`;
    const render = () => {
      const query = document.getElementById('event-search').value.toLowerCase();
      const filtered = events.filter(e => (e.title || '').toLowerCase().includes(query));
      document.getElementById('results').textContent = `${filtered.length} event${filtered.length === 1 ? '' : 's'}`;
      document.getElementById('events').innerHTML = filtered.length ? filtered.map(e => card(e)).join('') : '<p>No events found.</p>';
    };
    document.getElementById('event-search').oninput = render; render();
  }
  async function details() {
    const id = new URLSearchParams(location.search).get('id');
    if (!uuid(id || '')) { content.innerHTML = `<h1>Choose an event</h1><a class="button" href="${url('browse')}">Browse events</a>`; return; }
    const event = await api(`/api/events/${encodeURIComponent(id)}`);
    content.innerHTML = `<a href="${url('browse')}">← All events</a><div class="detail-hero"><span class="eyebrow">Event details</span><h1>${esc(event.title)}</h1><p>Capacity: ${esc(event.capacity ?? 'Not specified')}</p></div><section class="panel"><h2>Join this event</h2><p>Save your student UUID above, then confirm your registration.</p><button data-register="${esc(event.event_id)}">Confirm registration</button><a class="text-link" href="${url('organizer',id)}">View attendees →</a></section>`;
  }
  async function registrations() {
    if (!uuid(student)) { content.innerHTML = '<h1>My Registrations</h1><p>Enter and save your student UUID above to load your registrations.</p>'; return; }
    const registrations = await api(`/api/me/registrations?student_id=${encodeURIComponent(student)}`);
    const events = registrations.length ? await api('/api/events') : [];
    const byId = new Map(events.map(e => [e.event_id,e]));
    content.innerHTML = `<span class="eyebrow">Your campus calendar</span><h1>My Registrations</h1><p class="intro">${registrations.length} registration${registrations.length === 1 ? '' : 's'}</p><div class="cards">${registrations.length ? registrations.map(r => card(byId.get(r.event_id) || {event_id:r.event_id,title:'Event unavailable'},r)).join('') : `<p>No registrations yet. <a href="${url('browse')}">Explore events</a></p>`}</div>`;
  }
  let rosterVersion = 0;
  async function organizer() {
    const events = await api('/api/events');
    content.innerHTML = `<span class="eyebrow">Organizer portal</span><h1>Attendee roster</h1><label for="event-selector">Select event</label><select id="event-selector">${events.map(e => `<option value="${esc(e.event_id)}">${esc(e.title)}</option>`).join('')}</select><div id="roster"></div>`;
    if (!events.length) { document.getElementById('roster').textContent = 'No events available.'; return; }
    const select = document.getElementById('event-selector');
    const id = new URLSearchParams(location.search).get('id');
    if (events.some(e => e.event_id === id)) select.value = id;
    async function refresh() {
      const version = ++rosterVersion;
      const target = document.getElementById('roster'); target.textContent = 'Loading attendees…';
      try {
        const rows = await api(`/api/events/${encodeURIComponent(select.value)}/registrations`);
        if (version !== rosterVersion) return;
        target.innerHTML = `<p>${rows.length} registered attendee${rows.length === 1 ? '' : 's'}</p><div class="input-row"><input id="roster-search" type="search" placeholder="Search student or registration UUID" aria-label="Search attendees"><button id="export-csv">Export CSV</button></div><div class="table-wrap"><table><thead><tr><th>Student UUID</th><th>Registration ID</th><th>Registered at</th></tr></thead><tbody id="roster-body"></tbody></table></div>`;
        const render = () => {
          const q = document.getElementById('roster-search').value.toLowerCase();
          const filtered = rows.filter(r => `${r.student_id} ${r.id}`.toLowerCase().includes(q));
          document.getElementById('roster-body').innerHTML = filtered.length ? filtered.map(r => `<tr><td>${esc(r.student_id)}</td><td>${esc(r.id)}</td><td>${esc(r.created_at ? new Date(r.created_at).toLocaleString() : 'Not supplied')}</td></tr>`).join('') : '<tr><td colspan="3">No attendees found.</td></tr>';
        };
        document.getElementById('roster-search').oninput = render; render();
        document.getElementById('export-csv').onclick = () => {
          const cell = v => `"${String(v ?? '').replace(/"/g,'""')}"`;
          const csv = [['student_id','id','created_at'],...rows.map(r => [r.student_id,r.id,r.created_at])].map(r => r.map(cell).join(',')).join('\r\n');
          const link = document.createElement('a'); const blobUrl = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
          link.href = blobUrl; link.download = `attendees-${select.value}.csv`; link.click(); setTimeout(() => URL.revokeObjectURL(blobUrl),1000);
        };
      } catch (error) { if (version === rosterVersion) { target.textContent = 'Unable to load attendees.'; message(error.message,true); } }
    }
    select.onchange = refresh; await refresh();
  }
  async function load() {
    content.setAttribute('aria-busy','true');
    try { await ({browse, details, registrations, organizer}[page] || browse)(); }
    catch (error) { message(error.message,true); content.innerHTML = '<p>Unable to load this page.</p><button id="retry">Try again</button>'; document.getElementById('retry').onclick = () => { message(''); load(); }; }
    finally { content.setAttribute('aria-busy','false'); }
  }
  load();
})();
