const SHEET_ID = '15doR2R2qaBXsiH-xrekydCPEsldxUKvg99EYAOiblyU';

// ── Times (nome PT + bandeira) ────────────────────────────────────
const TIMES = {
  "Estados Unidos": "🇺🇸", "México": "🇲🇽", "Canadá": "🇨🇦",
  "Brasil": "🇧🇷", "Argentina": "🇦🇷", "Uruguai": "🇺🇾",
  "Colômbia": "🇨🇴", "Equador": "🇪🇨", "Chile": "🇨🇱",
  "Paraguai": "🇵🇾", "Peru": "🇵🇪", "Bolívia": "🇧🇴",
  "Venezuela": "🇻🇪", "França": "🇫🇷", "Alemanha": "🇩🇪",
  "Espanha": "🇪🇸", "Portugal": "🇵🇹", "Inglaterra": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "Holanda": "🇳🇱", "Itália": "🇮🇹", "Bélgica": "🇧🇪",
  "Croácia": "🇭🇷", "Sérvia": "🇷🇸", "Polônia": "🇵🇱",
  "Suíça": "🇨🇭", "Dinamarca": "🇩🇰", "Áustria": "🇦🇹",
  "Ucrânia": "🇺🇦", "Escócia": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Romênia": "🇷🇴",
  "Turquia": "🇹🇷", "Grécia": "🇬🇷", "Eslováquia": "🇸🇰",
  "Albânia": "🇦🇱", "Japão": "🇯🇵", "Coreia do Sul": "🇰🇷",
  "Austrália": "🇦🇺", "Irã": "🇮🇷", "Arábia Saudita": "🇸🇦",
  "Catar": "🇶🇦", "Iraque": "🇮🇶",
  "Jordânia": "🇯🇴", "Nova Zelândia": "🇳🇿", "Marrocos": "🇲🇦",
  "Senegal": "🇸🇳", "Nigéria": "🇳🇬", "Gana": "🇬🇭",
  "Camarões": "🇨🇲", "Costa do Marfim": "🇨🇮", "Egito": "🇪🇬",
  "Argélia": "🇩🇿", "Tunísia": "🇹🇳", "Mali": "🇲🇱",
  "África do Sul": "🇿🇦", "Panamá": "🇵🇦", "Costa Rica": "🇨🇷",
  "Honduras": "🇭🇳", "Jamaica": "🇯🇲", "El Salvador": "🇸🇻",
  "Pais de Gales": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
};

function bandeira(time) { return TIMES[time] || "🏳"; }

// ── Grupos ────────────────────────────────────────────────────────
const GRUPOS = {
  A: ["Estados Unidos", "Panamá", "Colômbia", "Marrocos"],
  B: ["México", "Uruguai", "Polônia", "Senegal"],
  C: ["Canadá", "Bélgica", "Croácia", "Argélia"],
  D: ["Brasil", "Sérvia", "Suíça", "Camarões"],
  E: ["Argentina", "Alemanha", "Japão", "Costa Rica"],
  F: ["França", "Portugal", "Austrália", "Nigéria"],
  G: ["Inglaterra", "Espanha", "Coreia do Sul", "Panamá"],
  H: ["Itália", "Dinamarca", "Arábia Saudita", "Egito"],
  I: ["Irã", "Chile", "Costa do Marfim", "Honduras"],
  J: ["Catar", "Gana", "Escócia", "Jamaica"],
  K: ["Turquia", "Ucrânia", "Romênia", "Nova Zelândia"],
  L: ["Holanda", "Equador", "Tunísia", "El Salvador"],
};

// ── Leitura de jogos via Google Sheets ───────────────────────────
// Converte célula de data do gviz ("Date(2026,5,11)" → "2026-06-11")
function parseData(val) {
  if (val == null) return 'TBD';
  if (typeof val === 'string' && val.startsWith('Date(')) {
    const [y, m, d] = val.slice(5, -1).split(',').map(Number);
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }
  return String(val);
}

// Converte célula de hora do gviz (fração decimal → "HH:MM")
function parseHora(val) {
  if (val == null) return 'TBD';
  if (typeof val === 'number') {
    const totalMins = Math.round(val * 24 * 60);
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }
  return String(val);
}

async function carregarJogos() {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=jogos&headers=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  const json = JSON.parse(text.slice(text.indexOf('(') + 1, text.lastIndexOf(')')));
  if (json.status !== 'ok') throw new Error(json.errors?.[0]?.message || 'Erro na planilha');

  const cols = json.table.cols.map(c => c.label);
  const rows = json.table.rows
    .filter(row => row.c?.some(c => c?.v != null))
    .map(row => {
      const obj = {};
      cols.forEach((col, i) => { obj[col] = row.c?.[i]?.v ?? null; });
      return obj;
    });

  return rows.map(r => ({
    id:      Number(r.id),
    fase:    String(r.fase || ''),
    grupo:   r.grupo ? String(r.grupo) : null,
    data:    parseData(r.data),
    horaBRT: parseHora(r.horaBRT),
    casa:    String(r.casa  || 'A definir'),
    fora:    String(r.fora  || 'A definir'),
    local:   String(r.local || ''),
    placar:  (r.placar_casa != null && r.placar_fora != null)
      ? { casa: Number(r.placar_casa), fora: Number(r.placar_fora) }
      : null,
  }));
}
