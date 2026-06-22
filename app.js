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
  const inicio  = Math.max(0, idxHoje);

  const container = document.getElementById('lista-jogos');
  container.innerHTML = '';          // limpa só lista-jogos; sentinel está fora

  // Restaurar botão "Ver mais"
  const sentinel = document.getElementById('sentinel');
  const btnVer   = document.getElementById('btn-ver-mais');
  if (sentinel) sentinel.style.display = 'flex';
  if (btnVer)   { btnVer.disabled = false; btnVer.innerHTML = '<span class="seta">⬇</span> Ver mais jogos'; }

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

  // Botão "Ver mais" onclick + IntersectionObserver como fallback
  if (btnVer) btnVer.onclick = () => carregarMaisDias(container, hoje, LOTE);
  if (observerScroll) observerScroll.disconnect();
  if (sentinel) {
    observerScroll = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && btnVer && !btnVer.disabled) btnVer.click();
    }, { rootMargin: '50px' });
    observerScroll.observe(sentinel);
  }
}

function carregarMaisDias(container, hoje, quantidade) {
  const sentinel = document.getElementById('sentinel');
  const btnVer   = document.getElementById('btn-ver-mais');
  let carregados  = 0;

  if (btnVer) {
    btnVer.disabled = true;
    btnVer.innerHTML = '<span class="loading-dots"><span></span><span></span><span></span></span>';
  }

  while (indiceFuturo < datasOrdenadas.length && carregados < quantidade) {
    const data = datasOrdenadas[indiceFuturo];
    const jogosNoDia = JOGOS.filter(j => j.data === data);
    container.appendChild(renderDia(data, jogosNoDia, hoje)); // sentinel está fora
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

// ── Aba Classificação ─────────────────────────────────────────────
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
  document.getElementById('grade-classificacao').innerHTML =
    Object.keys(GRUPOS).map(letra => {
      const linhas = calcularClassificacao(letra);
      return `
        <div class="card-classificacao">
          <div class="grupo-header">Grupo ${letra}</div>
          <table class="classificacao">
            <thead>
              <tr>
                <th>#</th>
                <th class="col-time">Time</th>
                <th title="Jogos">J</th>
                <th title="Pontos">Pts</th>
                <th title="Saldo de Gols">SG</th>
              </tr>
            </thead>
            <tbody>
              ${linhas.map((r, i) => `
                <tr class="${i < 2 ? 'classifica' : ''}">
                  <td>${i + 1}</td>
                  <td class="col-time">${bandeira(r.time)} ${r.time}</td>
                  <td>${r.j}</td>
                  <td class="pts-col">${r.pts}</td>
                  <td class="${r.sg > 0 ? 'sg-pos' : r.sg < 0 ? 'sg-neg' : ''}">${r.sg > 0 ? '+' : ''}${r.sg}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>`;
    }).join('');
}

// ── Aba Mata-Mata ─────────────────────────────────────────────────
function parseCSVSimples(text) {
  const rows = [];
  let col = '', row = [], inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { col += '"'; i++; }
      else if (c === '"') inQ = false;
      else col += c;
    } else if (c === '"') {
      inQ = true;
    } else if (c === ',') {
      row.push(col); col = '';
    } else if (c === '\n') {
      row.push(col); rows.push(row); col = ''; row = [];
    } else if (c !== '\r') {
      col += c;
    }
  }
  if (col || row.length) { row.push(col); rows.push(row); }
  return rows;
}

function cardMataMata(j) {
  function candidato(time, pct, isLider) {
    return `
      <div class="mm-candidato${isLider ? ' lider' : ''}">
        <div class="mm-cand-topo">
          <span class="mm-bandeira">${bandeira(time)}</span>
          <span class="mm-nome">${time}</span>
          <span class="mm-pct">${pct}%</span>
        </div>
        <div class="mm-barra-wrap">
          <div class="mm-barra" style="width:${pct}%"></div>
        </div>
      </div>`;
  }
  return `
    <div class="card-mm">
      <div class="mm-meta">
        ${j.data ? `<span>📅 ${j.data}</span>` : ''}
        ${j.hora ? `<span>🕐 ${j.hora} BRT</span>` : ''}
        ${j.local ? `<span>📍 ${j.local}</span>` : ''}
      </div>
      <div class="mm-jogo">
        <div class="mm-vaga">
          ${candidato(j.t1c1, j.p1, j.p1 >= j.p2)}
          ${candidato(j.t1c2, j.p2, j.p2 > j.p1)}
        </div>
        <div class="mm-vs">VS</div>
        <div class="mm-vaga">
          ${candidato(j.t2c1, j.p3, j.p3 >= j.p4)}
          ${candidato(j.t2c2, j.p4, j.p4 > j.p3)}
        </div>
      </div>
    </div>`;
}

async function renderMataMata() {
  const container = document.getElementById('bracket');
  container.innerHTML = '<p class="msg-carregando"><span class="loading-dots"><span></span><span></span><span></span></span> Carregando previsões...</p>';

  let jogos = [];
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=MataMata`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const text = await resp.text();
    const rows = parseCSVSimples(text);
    jogos = rows.slice(1)
      .filter(r => r[12] && r[12].trim())
      .map(r => ({
        data:  r[0]?.trim() || '',
        hora:  r[1]?.trim() || '',
        local: r[2]?.trim() || '',
        t1c1:  r[3]?.trim() || '',
        p1:    parseInt(r[4]) || 0,
        t1c2:  r[5]?.trim() || '',
        p2:    parseInt(r[6]) || 0,
        t2c1:  r[7]?.trim() || '',
        p3:    parseInt(r[8]) || 0,
        t2c2:  r[9]?.trim() || '',
        p4:    parseInt(r[10]) || 0,
        fase:  r[12]?.trim() || '',
      }));
  } catch (e) {
    container.innerHTML = '<p class="msg-carregando" style="color:#ef5350">Erro ao carregar previsões.</p>';
    return;
  }

  const comPrevisao = jogos.filter(j => j.t1c1);
  if (!comPrevisao.length) {
    container.innerHTML = '<p class="msg-carregando">Previsões ainda não disponíveis.</p>';
    return;
  }

  const ordem = ['16 avos de final', 'Oitavas de final', 'Quartas de final', 'Semifinal', 'Disputa de 3º lugar', 'Final'];
  const porFase = {};
  comPrevisao.forEach(j => { (porFase[j.fase] = porFase[j.fase] || []).push(j); });

  container.innerHTML = ordem
    .filter(f => porFase[f]?.length)
    .map(fase => `
      <div class="fase-ko">
        <h3 class="titulo-fase">${fase}</h3>
        <div class="jogos-fase">
          ${porFase[fase].map(j => cardMataMata(j)).join('')}
        </div>
      </div>`)
    .join('');
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
      const chave    = `${j.casa}|${j.fora}`;
      const chaveRev = `${j.fora}|${j.casa}`;
      if (res[chave] !== undefined) {
        j.placar = res[chave];
      } else if (res[chaveRev] !== undefined) {
        // aceita ordem invertida — troca casa/fora nos gols
        j.placar = { casa: res[chaveRev].fora, fora: res[chaveRev].casa };
      }
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
let JOGOS = [];

document.addEventListener('DOMContentLoaded', async () => {
  try {
    JOGOS = await carregarJogos();
  } catch (err) {
    document.getElementById('lista-jogos').innerHTML =
      `<p class="msg-carregando" style="color:#ef5350">Erro ao carregar jogos: ${err.message}</p>`;
    return;
  }
  await carregarResultados();
  iniciarJogos();
  renderClassificacao();
  renderMataMata();
});
