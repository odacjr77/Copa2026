// ── Tab navigation ──────────────────────────────────────────────
function showTab(name) {
  document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  event.target.classList.add('active');
}

// ── Helpers ──────────────────────────────────────────────────────
function flag(team) { return FLAGS[team] || '🏳'; }
function fmt(score) { return score ? `${score.home} – ${score.away}` : 'vs'; }
function fmtDate(d) {
  if (!d || d === 'TBD') return 'TBD';
  const [y, m, day] = d.split('-');
  return new Date(y, m - 1, day).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Groups tab ───────────────────────────────────────────────────
function renderGroups() {
  const grid = document.getElementById('groups-grid');
  grid.innerHTML = Object.entries(GROUPS).map(([letter, g]) => `
    <div class="group-card">
      <div class="group-header">Group ${letter}</div>
      <ul>
        ${g.teams.map(t => `<li>${flag(t)} ${t}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// ── Matches tab ──────────────────────────────────────────────────
function populateGroupFilter() {
  const sel = document.getElementById('filter-group');
  Object.keys(GROUPS).forEach(g => {
    const opt = document.createElement('option');
    opt.value = g; opt.textContent = 'Group ' + g;
    sel.appendChild(opt);
  });
}

function renderMatches() {
  const gFilter = document.getElementById('filter-group').value;
  const sFilter = document.getElementById('filter-stage').value;
  const list = document.getElementById('matches-list');

  const filtered = MATCHES.filter(m => {
    const gOk = gFilter === 'all' || m.group === gFilter;
    const sOk = sFilter === 'all' || m.stage === sFilter;
    return gOk && sOk;
  });

  if (!filtered.length) { list.innerHTML = '<p class="empty">No matches found.</p>'; return; }

  // Group by date
  const byDate = {};
  filtered.forEach(m => { (byDate[m.date] = byDate[m.date] || []).push(m); });

  list.innerHTML = Object.entries(byDate).sort(([a],[b]) => a.localeCompare(b)).map(([date, ms]) => `
    <div class="date-group">
      <div class="date-label">${fmtDate(date)}</div>
      ${ms.map(m => `
        <div class="match-card ${m.score ? 'played' : ''}">
          <span class="stage-badge">${m.stage}${m.group ? ' · Group ' + m.group : ''}</span>
          <div class="match-row">
            <span class="team home">${flag(m.home)} ${m.home}</span>
            <span class="score ${m.score ? 'final' : 'upcoming'}">${fmt(m.score)}</span>
            <span class="team away">${flag(m.away)} ${m.away}</span>
          </div>
          <span class="venue">📍 ${m.venue} &nbsp;·&nbsp; ⏰ ${m.time}</span>
        </div>
      `).join('')}
    </div>
  `).join('');
}

// ── Standings tab ────────────────────────────────────────────────
function populateStandingsFilter() {
  const sel = document.getElementById('standings-group');
  Object.keys(GROUPS).forEach(g => {
    const opt = document.createElement('option');
    opt.value = g; opt.textContent = 'Group ' + g;
    sel.appendChild(opt);
  });
}

function computeStandings(groupLetter) {
  const teams = GROUPS[groupLetter].teams;
  const stats = {};
  teams.forEach(t => { stats[t] = { p:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 }; });

  MATCHES.filter(m => m.group === groupLetter && m.score).forEach(m => {
    const h = stats[m.home], a = stats[m.away];
    h.p++; a.p++;
    h.gf += m.score.home; h.ga += m.score.away;
    a.gf += m.score.away; a.ga += m.score.home;
    if (m.score.home > m.score.away) { h.w++; h.pts += 3; a.l++; }
    else if (m.score.home < m.score.away) { a.w++; a.pts += 3; h.l++; }
    else { h.d++; a.d++; h.pts++; a.pts++; }
  });

  return teams
    .map(t => ({ team: t, ...stats[t], gd: stats[t].gf - stats[t].ga }))
    .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
}

function renderStandings() {
  const g = document.getElementById('standings-group').value;
  const rows = computeStandings(g);
  document.getElementById('standings-table').innerHTML = `
    <table class="standings">
      <thead>
        <tr><th>#</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th></tr>
      </thead>
      <tbody>
        ${rows.map((r, i) => `
          <tr class="${i < 2 ? 'qualify' : ''}">
            <td>${i + 1}</td>
            <td class="team-cell">${flag(r.team)} ${r.team}</td>
            <td>${r.p}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td>
            <td>${r.gf}</td><td>${r.ga}</td><td>${r.gd > 0 ? '+' : ''}${r.gd}</td>
            <td class="pts">${r.pts}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <p class="note">🟩 Top 2 teams advance to knockout stage</p>
  `;
}

// ── Knockout tab ─────────────────────────────────────────────────
function renderKnockout() {
  const stages = ['Round of 32', 'Round of 16', 'Quarter-final', 'Semi-final', 'Final'];
  const bracket = document.getElementById('knockout-bracket');
  bracket.innerHTML = stages.map(stage => {
    const ms = MATCHES.filter(m => m.stage === stage);
    return `
      <div class="ko-stage">
        <h3>${stage}</h3>
        <div class="ko-matches">
          ${ms.length ? ms.map(m => `
            <div class="match-card ${m.score ? 'played' : ''}">
              <div class="match-row">
                <span class="team home">${flag(m.home)} ${m.home}</span>
                <span class="score ${m.score ? 'final' : 'upcoming'}">${fmt(m.score)}</span>
                <span class="team away">${flag(m.away)} ${m.away}</span>
              </div>
              <span class="venue">📍 ${m.venue} &nbsp;·&nbsp; 📅 ${fmtDate(m.date)}</span>
            </div>
          `).join('') : '<p class="empty">Matches TBD</p>'}
        </div>
      </div>
    `;
  }).join('');
}

// ── Init ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderGroups();
  populateGroupFilter();
  renderMatches();
  populateStandingsFilter();
  renderStandings();
  renderKnockout();
});
