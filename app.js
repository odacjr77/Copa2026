// ── Utilitários de data/hora ──────────────────────────────────────
function hojeEmBRT() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
}

function formatarData(iso) {
  const [a, m, d] = iso.split('-');
  const dt = new Date(Number(a), Number(m) - 1, Number(d));
  const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${dias[dt.getDay()]}, ${Number(d)} de ${meses[Number(m) - 1]}`;
}

function statusJogo(jogo, hoje) {
  if (jogo.data < hoje) return 'passado';
  if (jogo.data === hoje) return 'hoje';
  return 'futuro';
}

// ── Renderização de cards ─────────────────────────────────────────
function cardJogo(j, hoje) {
  const status = statusJogo(j, hoje);
  const temPlacar = j.placar !== null;

  let badgeStatus = '';
  if (status === 'hoje' && !temPlacar) badgeStatus = '<span class="badge badge-hoje">HOJE</span>';
  else if (temPlacar) badgeStatus = '<span class="badge badge-encerrado">ENCERRADO</span>';

  const grupoLabel = j.grupo ? ` · Grupo ${j.grupo}` : '';

  let placarHTML;
  if (temPlacar) {
    placarHTML = `
      <div class="placar encerrado">
        <span class="gol">${j.placar.casa}</span>
        <span class="sep">–</span>
        <span class="gol">${j.placar.fora}</span>
      </div>`;
  } else {
    placarHTML = `<div class="placar futuro"><span class="hora-jogo">${j.horaBRT}</span><span class="brt">BRT</span></div>`;
  }

  return `
    <div class="card-jogo ${status}">
      <div class="card-topo">
        <span class="fase-label">${j.fase}${grupoLabel}</span>
        ${badgeStatus}
      </div>
      <div class="times-row">
        <div class="time mandante">
          <span class="bandeira">${bandeira(j.casa)}</span>
          <span class="nome-time">${j.casa}</span>
        </div>
        ${placarHTML}
        <div class="time visitante">
          <span class="bandeira">${bandeira(j.fora)}</span>
          <span class="nome-time">${j.fora}</span>
        </div>
      </div>
      <div class="card-rodape">
        <span class="info-local">📍 ${j.local}</span>
        <span class="info-data">📅 ${j.data.split('-').reverse().join('/')} · ⏰ ${j.horaBRT} BRT</span>
      </div>
    </div>`;
}

// ── Scroll Infinito (aba Jogos) ───────────────────────────────────
const LOTE = 3; // dias por carregamento

let datasOrdenadas = [];
let indiceFuturo = 0;
let observerScroll = null;

function iniciarJogos() {
  const hoje = hojeEmBRT();
  const todasDatas = [...new Set(JOGOS.map(j => j.data))].sort();
  datasOrdenadas = todasDatas;

  const idxHoje = todasDatas.findIndex(d => d >= hoje);
  const inicio = Math.max(0, idxHoje);

  const container = document.getElementById('lista-jogos');
  container.innerHTML = '';

  // Carregar: hoje + próximos LOTE dias
  indiceFuturo = inicio;
  carregarMaisDias(container, hoje, LOTE + 1);

  // Botão "jogos anteriores"
  const btnAntes = document.getElementById('btn-anteriores');
  const datasPassadas = todasDatas.filter(d => d < hoje);
  if (datasPassadas.length === 0) {
    btnAntes.style.display = 'none';
  } else {
    btnAntes.style.display = 'flex';
    btnAntes.onclick = () => mostrarPassados(datasPassadas, hoje);
  }

  // Botão "Ver mais" + observer como fallback
  const sentinel = document.getElementById('sentinel');
  const btnVer   = document.getElementById('btn-ver-mais');
  if (btnVer) {
    btnVer.onclick = () => carregarMaisDias(container, hoje, LOTE);
  }
  if (observerScroll) observerScroll.disconnect();
  if (sentinel) {
    observerScroll = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && btnVer && !btnVer.disabled) btnVer.click();
    }, { rootMargin: '100px' });
    observerScroll.observe(sentinel);
  }
}

function carregarMaisDias(container, hoje, quantidade) {
  const sentinel = document.getElementById('sentinel');
  const btnVer   = document.getElementById('btn-ver-mais');
  let carregados = 0;

  if (btnVer) {
    btnVer.disabled = true;
    btnVer.innerHTML = '<span class="loading-dots"><span></span><span></span><span></span></span>';
  }

  while (indiceFuturo < datasOrdenadas.length && carregados < quantidade) {
    const data = datasOrdenadas[indiceFuturo];
    const jogosNoDia = JOGOS.filter(j => j.data === data);
    container.insertBefore(renderDia(data, jogosNoDia, hoje), sentinel);
    indiceFuturo++;
    carregados++;
  }

  if (indiceFuturo >= datasOrdenadas.length) {
    if (sentinel) sentinel.style.display = 'none';
    if (observerScroll) observerScroll.disconnect();
    const fim = document.createElement('p');
    fim.className = 'fim-lista';
    fim.textContent = '🏆 Fim da programação da Copa 2026';
    container.appendChild(fim);
  } else if (btnVer) {
    btnVer.disabled = false;
    btnVer.innerHTML = '<span class="seta">⬇</span> Ver mais jogos';
  }
}

function mostrarPassados(datasPassadas, hoje) {
  const container = document.getElementById('lista-jogos');
  const btnAntes = document.getElementById('btn-anteriores');
  const wrapper = document.createElement('div');
  wrapper.id = 'bloco-passados';

  datasPassadas.forEach(data => {
    const jogosNoDia = JOGOS.filter(j => j.data === data);
    wrapper.appendChild(renderDia(data, jogosNoDia, hoje));
  });

  container.insertBefore(wrapper, container.firstChild);
  btnAntes.style.display = 'none';
}

function renderDia(data, jogos, hoje) {
  const isHoje = data === hoje;
  const bloco = document.createElement('div');
  bloco.className = 'bloco-dia' + (isHoje ? ' dia-hoje' : '');
  if (isHoje) bloco.id = 'dia-hoje';

  bloco.innerHTML = `
    <div class="cabecalho-dia">
      <span class="data-label">${isHoje ? '📅 HOJE — ' : ''}${formatarData(data)}</span>
      <span class="qtd-jogos">${jogos.length} jogo${jogos.length > 1 ? 's' : ''}</span>
    </div>
    ${jogos.map(j => cardJogo(j, hoje)).join('')}
  `;
  return bloco;
}

// ── Aba Grupos ────────────────────────────────────────────────────
function renderGrupos() {
  const grid = document.getElementById('grade-grupos');
  grid.innerHTML = Object.entries(GRUPOS).map(([letra, times]) => `
    <div class="card-grupo">
      <div class="grupo-header">Grupo ${letra}</div>
      <ul>
        ${times.map(t => `<li>${bandeira(t)} ${t}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// ── Aba Classificação ─────────────────────────────────────────────
function popularFiltroGrupo() {
  const sel = document.getElementById('sel-grupo');
  sel.innerHTML = Object.keys(GRUPOS).map(g =>
    `<option value="${g}">Grupo ${g}</option>`
  ).join('');
}

function calcularClassificacao(letra) {
  const times = GRUPOS[letra];
  const stats = {};
  times.forEach(t => { stats[t] = { j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, pts: 0 }; });

  JOGOS.filter(j => j.grupo === letra && j.placar).forEach(j => {
    const c = stats[j.casa], f = stats[j.fora];
    c.j++; f.j++;
    c.gp += j.placar.casa; c.gc += j.placar.fora;
    f.gp += j.placar.fora; f.gc += j.placar.casa;
    if (j.placar.casa > j.placar.fora)      { c.v++; c.pts += 3; f.d++; }
    else if (j.placar.casa < j.placar.fora) { f.v++; f.pts += 3; c.d++; }
    else                                     { c.e++; f.e++; c.pts++; f.pts++; }
  });

  return times
    .map(t => ({ time: t, ...stats[t], sg: stats[t].gp - stats[t].gc }))
    .sort((a, b) => b.pts - a.pts || b.sg - a.sg || b.gp - a.gp);
}

function renderClassificacao() {
  const letra = document.getElementById('sel-grupo').value;
  const linhas = calcularClassificacao(letra);
  document.getElementById('tabela-classificacao').innerHTML = `
    <div class="tabela-scroll">
      <table class="classificacao">
        <thead>
          <tr>
            <th>#</th><th class="col-time">Time</th>
            <th title="Jogos">J</th><th title="Vitórias">V</th>
            <th title="Empates">E</th><th title="Derrotas">D</th>
            <th title="Gols Pró">GP</th><th title="Gols Contra">GC</th>
            <th title="Saldo de Gols">SG</th><th title="Pontos">Pts</th>
          </tr>
        </thead>
        <tbody>
          ${linhas.map((r, i) => `
            <tr class="${i < 2 ? 'classifica' : ''}">
              <td>${i + 1}</td>
              <td class="col-time">${bandeira(r.time)} ${r.time}</td>
              <td>${r.j}</td><td>${r.v}</td><td>${r.e}</td><td>${r.d}</td>
              <td>${r.gp}</td><td>${r.gc}</td>
              <td>${r.sg > 0 ? '+' : ''}${r.sg}</td>
              <td class="pts-col">${r.pts}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <p class="legenda">🟩 Os 2 primeiros se classificam para as oitavas</p>
  `;
}

// ── Aba Mata-Mata ─────────────────────────────────────────────────
function renderMataMata() {
  const fases = ['16 avos de final', 'Oitavas de final', 'Quartas de final', 'Semifinal', 'Disputa de 3º lugar', 'Final'];
  const hoje = hojeEmBRT();
  document.getElementById('bracket').innerHTML = fases.map(fase => {
    const jogos = JOGOS.filter(j => j.fase === fase);
    return `
      <div class="fase-ko">
        <h3 class="titulo-fase">${fase}</h3>
        <div class="jogos-fase">
          ${jogos.map(j => cardJogo(j, hoje)).join('')}
        </div>
      </div>`;
  }).join('');
}

// ── Navegação por abas ────────────────────────────────────────────
function mostrarAba(nome, btn) {
  document.querySelectorAll('.conteudo-aba').forEach(el => el.classList.remove('ativa'));
  document.querySelectorAll('.btn-aba').forEach(el => el.classList.remove('ativa'));
  document.getElementById('aba-' + nome).classList.add('ativa');
  btn.classList.add('ativa');
}

// ── Carrega resultados do resultados.json (atualizado pela Action) ─
async function carregarResultados() {
  try {
    // Cache-bust a cada 5 minutos para garantir dados frescos
    const v = Math.floor(Date.now() / (5 * 60 * 1000));
    const resp = await fetch(`resultados.json?v=${v}`);
    if (!resp.ok) return;
    const res = await resp.json();

    // Aplica placares sobre JOGOS (sobrescreve dados de data.js)
    JOGOS.forEach(j => {
      const chave = `${j.casa}|${j.fora}`;
      if (res[chave] !== undefined) j.placar = res[chave];
    });

    // Exibe timestamp da última atualização
    if (res._atualizado) {
      const dt = new Date(res._atualizado);
      const label = dt.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit', month: '2-digit',
        hour: '2-digit', minute: '2-digit',
      });
      const el = document.getElementById('ultima-atualizacao');
      if (el) el.textContent = `Atualizado: ${label} BRT`;
    }
  } catch (_) {
    // Sem rede ou arquivo ausente: usa dados de data.js
  }
}

// ── Init ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await carregarResultados();
  iniciarJogos();
  renderGrupos();
  popularFiltroGrupo();
  renderClassificacao();
  renderMataMata();
  document.getElementById('sel-grupo').addEventListener('change', renderClassificacao);
});
