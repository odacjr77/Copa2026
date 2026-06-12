const SHEET_ID = '15doR2R2qaBXsiH-xrekydCPEsldxUKvg99EYAOiblyU';

// ── Bandeiras ─────────────────────────────────────────────────────
const TIMES = {
  // Américas
  "Estados Unidos":       "🇺🇸", "México":             "🇲🇽", "Canadá":          "🇨🇦",
  "Brasil":               "🇧🇷", "Argentina":          "🇦🇷", "Uruguai":         "🇺🇾",
  "Colômbia":             "🇨🇴", "Equador":            "🇪🇨", "Chile":           "🇨🇱",
  "Paraguai":             "🇵🇾", "Peru":               "🇵🇪", "Bolívia":         "🇧🇴",
  "Venezuela":            "🇻🇪", "Haiti":              "🇭🇹", "Panamá":          "🇵🇦",
  "Costa Rica":           "🇨🇷", "Honduras":           "🇭🇳", "Jamaica":         "🇯🇲",
  "El Salvador":          "🇸🇻", "Curaçao":            "🇨🇼",
  // Europa
  "França":               "🇫🇷", "Alemanha":           "🇩🇪", "Espanha":         "🇪🇸",
  "Portugal":             "🇵🇹", "Inglaterra":         "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Países Baixos":   "🇳🇱",
  "Itália":               "🇮🇹", "Bélgica":            "🇧🇪", "Croácia":         "🇭🇷",
  "Sérvia":               "🇷🇸", "Polônia":            "🇵🇱", "Suíça":           "🇨🇭",
  "Dinamarca":            "🇩🇰", "Áustria":            "🇦🇹", "Ucrânia":         "🇺🇦",
  "Escócia":              "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Romênia":           "🇷🇴", "Turquia":         "🇹🇷",
  "Grécia":               "🇬🇷", "Eslováquia":         "🇸🇰", "Albânia":         "🇦🇱",
  "Tchéquia":             "🇨🇿", "Bósnia e Herzegovina":"🇧🇦", "Noruega":        "🇳🇴",
  "Suécia":               "🇸🇪",
  // Ásia / Oceania
  "Japão":                "🇯🇵", "Coreia do Sul":      "🇰🇷", "Austrália":       "🇦🇺",
  "Irã":                  "🇮🇷", "Arábia Saudita":     "🇸🇦", "Catar":           "🇶🇦",
  "Iraque":               "🇮🇶", "Jordânia":           "🇯🇴", "Nova Zelândia":   "🇳🇿",
  "Uzbequistão":          "🇺🇿",
  // África
  "Marrocos":             "🇲🇦", "Senegal":            "🇸🇳", "Nigéria":         "🇳🇬",
  "Gana":                 "🇬🇭", "Camarões":           "🇨🇲", "Costa do Marfim": "🇨🇮",
  "Egito":                "🇪🇬", "Argélia":            "🇩🇿", "Tunísia":         "🇹🇳",
  "Mali":                 "🇲🇱", "África do Sul":      "🇿🇦", "Cabo Verde":      "🇨🇻",
  "RD Congo":             "🇨🇩",
};

function bandeira(time) {
  if (!time) return "🏳";
  if (time.startsWith("Vencedor") || time.startsWith("Perdedor") ||
      time.startsWith("2º") || time.startsWith("3º") || time === "TBD") return "🏳";
  return TIMES[time] || "🏳";
}

// ── Grupos ────────────────────────────────────────────────────────
const GRUPOS = {
  A: ["México",        "Coreia do Sul",         "Tchéquia",      "África do Sul"],
  B: ["Canadá",        "Bósnia e Herzegovina",   "Catar",         "Suíça"],
  C: ["Brasil",        "Escócia",                "Haiti",         "Marrocos"],
  D: ["Estados Unidos","Paraguai",               "Austrália",     "Turquia"],
  E: ["Alemanha",      "Curaçao",                "Costa do Marfim","Equador"],
  F: ["Países Baixos", "Japão",                  "Suécia",        "Tunísia"],
  G: ["Bélgica",       "Egito",                  "Irã",           "Nova Zelândia"],
  H: ["Espanha",       "Uruguai",                "Arábia Saudita","Cabo Verde"],
  I: ["França",        "Senegal",                "Noruega",       "Iraque"],
  J: ["Argentina",     "Áustria",                "Argélia",       "Jordânia"],
  K: ["Portugal",      "Colômbia",               "RD Congo",      "Uzbequistão"],
  L: ["Inglaterra",    "Croácia",                "Gana",          "Panamá"],
};

// ── Parsers gviz ──────────────────────────────────────────────────
// Data: "Date(2026,5,11)" → "2026-06-11"  (mês é 0-indexado no gviz)
function parseData(val) {
  if (!val) return 'TBD';
  if (typeof val === 'string' && val.startsWith('Date(')) {
    const [y, m, d] = val.slice(5, -1).split(',').map(Number);
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }
  return String(val);
}

// ── Jogos estáticos (fallback se a planilha estiver indisponível) ──
// var (não const) para que window.JOGOS = carregarJogos() possa substituir
// horaBRT: horário de Brasília (UTC-3)
// placar: null = não realizado, { casa: N, fora: N } = encerrado
var JOGOS = [
  // ── 11/jun ──
  { id: 1,  fase: "Fase de Grupos", grupo: "A", data: "2026-06-11", horaBRT: "22:00", casa: "Estados Unidos", fora: "Panamá",      local: "SoFi Stadium, Los Angeles",          placar: null },
  { id: 2,  fase: "Fase de Grupos", grupo: "E", data: "2026-06-11", horaBRT: "19:00", casa: "Argentina",      fora: "Costa Rica",  local: "Estadio Azteca, Cidade do México",   placar: null },
  { id: 3,  fase: "Fase de Grupos", grupo: "D", data: "2026-06-11", horaBRT: "23:00", casa: "Brasil",         fora: "Camarões",    local: "MetLife Stadium, Nova York",          placar: null },

// Hora: "Date(1899,11,30,16,0,0)" → "16:00"
function parseHora(val) {
  if (!val) return '--:--';
  if (typeof val === 'string' && val.startsWith('Date(')) {
    const parts = val.slice(5, -1).split(',').map(Number);
    const h = parts[3] ?? 0;
    const m = parts[4] ?? 0;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }
  if (typeof val === 'number') {
    const mins = Math.round(val * 1440);
    return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
  }
  return String(val);
}

// Fase: "Fase de grupos - Grupo A" → { fase, grupo }
function parseFase(faseStr) {
  if (!faseStr) return { fase: '', grupo: null };
  const m = faseStr.match(/Fase de grupos - Grupo ([A-L])/i);
  if (m) return { fase: 'Fase de Grupos', grupo: m[1].toUpperCase() };
  return { fase: faseStr, grupo: null };
}

// ── Carga via Google Sheets gviz/tq ───────────────────────────────
async function carregarJogos() {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Jogos&headers=1`;
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

  return rows.map((r, idx) => {
    const { fase, grupo } = parseFase(r['Fase']);
    const encerrado = r['Status'] === 'Encerrado';
    const gc = r['Resultado Time 1'];
    const gf = r['Resultado Time 2'];
    return {
      id:      idx + 1,
      fase,
      grupo,
      data:    parseData(r['Data']),
      horaBRT: parseHora(r['Hora (Brasil)']),
      casa:    String(r['Time 1'] || 'A definir'),
      fora:    String(r['Time 2'] || 'A definir'),
      local:   String(r['Local']  || ''),
      placar:  (encerrado && gc != null && gf != null)
               ? { casa: Number(gc), fora: Number(gf) }
               : null,
    };
  });
}
