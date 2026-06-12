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
  "Japão": "🇯🇵", "Catar": "🇶🇦", "Iraque": "🇮🇶",
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

// ── Jogos ─────────────────────────────────────────────────────────
// horaBRT: horário de Brasília (UTC-3)
// placar: null = não realizado, { casa: N, fora: N } = encerrado
const JOGOS = [
  // ── 11/jun (ontem) ──
  { id: 1,  fase: "Fase de Grupos", grupo: "A", data: "2026-06-11", horaBRT: "22:00", casa: "Estados Unidos", fora: "Panamá",      local: "SoFi Stadium, Los Angeles",          placar: { casa: 2, fora: 0 } },
  { id: 2,  fase: "Fase de Grupos", grupo: "E", data: "2026-06-11", horaBRT: "19:00", casa: "Argentina",      fora: "Costa Rica",  local: "Estadio Azteca, Cidade do México",   placar: { casa: 3, fora: 0 } },
  { id: 3,  fase: "Fase de Grupos", grupo: "D", data: "2026-06-11", horaBRT: "23:00", casa: "Brasil",         fora: "Camarões",    local: "MetLife Stadium, Nova York",          placar: { casa: 4, fora: 1 } },

  // ── 12/jun (hoje) ──
  { id: 4,  fase: "Fase de Grupos", grupo: "B", data: "2026-06-12", horaBRT: "13:00", casa: "México",         fora: "Senegal",     local: "Estadio Azteca, Cidade do México",   placar: null },
  { id: 5,  fase: "Fase de Grupos", grupo: "F", data: "2026-06-12", horaBRT: "16:00", casa: "França",         fora: "Nigéria",     local: "AT&T Stadium, Dallas",               placar: null },
  { id: 6,  fase: "Fase de Grupos", grupo: "C", data: "2026-06-12", horaBRT: "19:00", casa: "Canadá",         fora: "Argélia",     local: "BMO Field, Toronto",                 placar: null },
  { id: 7,  fase: "Fase de Grupos", grupo: "G", data: "2026-06-12", horaBRT: "22:00", casa: "Inglaterra",     fora: "Coreia do Sul",local: "Hard Rock Stadium, Miami",           placar: null },

  // ── 13/jun ──
  { id: 8,  fase: "Fase de Grupos", grupo: "H", data: "2026-06-13", horaBRT: "13:00", casa: "Itália",         fora: "Egito",       local: "Gillette Stadium, Boston",           placar: null },
  { id: 9,  fase: "Fase de Grupos", grupo: "I", data: "2026-06-13", horaBRT: "16:00", casa: "Chile",          fora: "Honduras",    local: "Arrowhead Stadium, Kansas City",     placar: null },
  { id: 10, fase: "Fase de Grupos", grupo: "L", data: "2026-06-13", horaBRT: "19:00", casa: "Holanda",        fora: "El Salvador", local: "Levi's Stadium, São Francisco",      placar: null },
  { id: 11, fase: "Fase de Grupos", grupo: "J", data: "2026-06-13", horaBRT: "22:00", casa: "Catar",          fora: "Jamaica",     local: "Rose Bowl, Los Angeles",             placar: null },

  // ── 14/jun ──
  { id: 12, fase: "Fase de Grupos", grupo: "K", data: "2026-06-14", horaBRT: "13:00", casa: "Turquia",        fora: "Nova Zelândia",local: "BC Place, Vancouver",              placar: null },
  { id: 13, fase: "Fase de Grupos", grupo: "A", data: "2026-06-14", horaBRT: "16:00", casa: "Colômbia",       fora: "Marrocos",    local: "NRG Stadium, Houston",              placar: null },
  { id: 14, fase: "Fase de Grupos", grupo: "E", data: "2026-06-14", horaBRT: "19:00", casa: "Alemanha",       fora: "Japão",       local: "AT&T Stadium, Dallas",               placar: null },
  { id: 15, fase: "Fase de Grupos", grupo: "D", data: "2026-06-14", horaBRT: "22:00", casa: "Sérvia",         fora: "Suíça",       local: "MetLife Stadium, Nova York",          placar: null },

  // ── 15/jun ──
  { id: 16, fase: "Fase de Grupos", grupo: "B", data: "2026-06-15", horaBRT: "13:00", casa: "Uruguai",        fora: "Polônia",     local: "Hard Rock Stadium, Miami",           placar: null },
  { id: 17, fase: "Fase de Grupos", grupo: "F", data: "2026-06-15", horaBRT: "16:00", casa: "Portugal",       fora: "Austrália",   local: "Levi's Stadium, São Francisco",      placar: null },
  { id: 18, fase: "Fase de Grupos", grupo: "C", data: "2026-06-15", horaBRT: "19:00", casa: "Bélgica",        fora: "Croácia",     local: "Gillette Stadium, Boston",           placar: null },
  { id: 19, fase: "Fase de Grupos", grupo: "G", data: "2026-06-15", horaBRT: "22:00", casa: "Espanha",        fora: "Panamá",      local: "SoFi Stadium, Los Angeles",          placar: null },

  // ── 16/jun ──
  { id: 20, fase: "Fase de Grupos", grupo: "H", data: "2026-06-16", horaBRT: "13:00", casa: "Dinamarca",      fora: "Arábia Saudita",local: "Rose Bowl, Los Angeles",          placar: null },
  { id: 21, fase: "Fase de Grupos", grupo: "I", data: "2026-06-16", horaBRT: "16:00", casa: "Irã",            fora: "Costa do Marfim",local: "Arrowhead Stadium, Kansas City",  placar: null },
  { id: 22, fase: "Fase de Grupos", grupo: "L", data: "2026-06-16", horaBRT: "19:00", casa: "Equador",        fora: "Tunísia",     local: "NRG Stadium, Houston",              placar: null },
  { id: 23, fase: "Fase de Grupos", grupo: "J", data: "2026-06-16", horaBRT: "22:00", casa: "Gana",           fora: "Escócia",     local: "BMO Field, Toronto",                placar: null },

  // ── 17/jun ──
  { id: 24, fase: "Fase de Grupos", grupo: "K", data: "2026-06-17", horaBRT: "13:00", casa: "Ucrânia",        fora: "Romênia",     local: "BC Place, Vancouver",               placar: null },
  { id: 25, fase: "Fase de Grupos", grupo: "A", data: "2026-06-17", horaBRT: "16:00", casa: "Estados Unidos", fora: "Colômbia",    local: "SoFi Stadium, Los Angeles",          placar: null },
  { id: 26, fase: "Fase de Grupos", grupo: "E", data: "2026-06-17", horaBRT: "19:00", casa: "Argentina",      fora: "Alemanha",    local: "AT&T Stadium, Dallas",               placar: null },
  { id: 27, fase: "Fase de Grupos", grupo: "D", data: "2026-06-17", horaBRT: "22:00", casa: "Brasil",         fora: "Sérvia",      local: "Gillette Stadium, Boston",           placar: null },

  // ── 18/jun ──
  { id: 28, fase: "Fase de Grupos", grupo: "B", data: "2026-06-18", horaBRT: "13:00", casa: "México",         fora: "Polônia",     local: "Estadio Azteca, Cidade do México",   placar: null },
  { id: 29, fase: "Fase de Grupos", grupo: "F", data: "2026-06-18", horaBRT: "16:00", casa: "França",         fora: "Austrália",   local: "Hard Rock Stadium, Miami",           placar: null },
  { id: 30, fase: "Fase de Grupos", grupo: "C", data: "2026-06-18", horaBRT: "19:00", casa: "Canadá",         fora: "Bélgica",     local: "BMO Field, Toronto",                placar: null },
  { id: 31, fase: "Fase de Grupos", grupo: "G", data: "2026-06-18", horaBRT: "22:00", casa: "Inglaterra",     fora: "Espanha",     local: "MetLife Stadium, Nova York",          placar: null },

  // ── 19/jun ──
  { id: 32, fase: "Fase de Grupos", grupo: "H", data: "2026-06-19", horaBRT: "13:00", casa: "Itália",         fora: "Dinamarca",   local: "Levi's Stadium, São Francisco",      placar: null },
  { id: 33, fase: "Fase de Grupos", grupo: "I", data: "2026-06-19", horaBRT: "16:00", casa: "Irã",            fora: "Chile",       local: "NRG Stadium, Houston",              placar: null },
  { id: 34, fase: "Fase de Grupos", grupo: "L", data: "2026-06-19", horaBRT: "19:00", casa: "Holanda",        fora: "Tunísia",     local: "Rose Bowl, Los Angeles",             placar: null },
  { id: 35, fase: "Fase de Grupos", grupo: "J", data: "2026-06-19", horaBRT: "22:00", casa: "Catar",          fora: "Escócia",     local: "Arrowhead Stadium, Kansas City",     placar: null },

  // ── 20/jun ──
  { id: 36, fase: "Fase de Grupos", grupo: "K", data: "2026-06-20", horaBRT: "13:00", casa: "Turquia",        fora: "Romênia",     local: "BC Place, Vancouver",               placar: null },
  { id: 37, fase: "Fase de Grupos", grupo: "A", data: "2026-06-20", horaBRT: "16:00", casa: "Panamá",         fora: "Marrocos",    local: "AT&T Stadium, Dallas",               placar: null },
  { id: 38, fase: "Fase de Grupos", grupo: "E", data: "2026-06-20", horaBRT: "19:00", casa: "Japão",          fora: "Costa Rica",  local: "SoFi Stadium, Los Angeles",          placar: null },
  { id: 39, fase: "Fase de Grupos", grupo: "D", data: "2026-06-20", horaBRT: "22:00", casa: "Suíça",          fora: "Camarões",    local: "Gillette Stadium, Boston",           placar: null },

  // ── 21/jun ──
  { id: 40, fase: "Fase de Grupos", grupo: "B", data: "2026-06-21", horaBRT: "16:00", casa: "Uruguai",        fora: "Senegal",     local: "Hard Rock Stadium, Miami",           placar: null },
  { id: 41, fase: "Fase de Grupos", grupo: "F", data: "2026-06-21", horaBRT: "19:00", casa: "Portugal",       fora: "Nigéria",     local: "Levi's Stadium, São Francisco",      placar: null },
  { id: 42, fase: "Fase de Grupos", grupo: "C", data: "2026-06-21", horaBRT: "22:00", casa: "Croácia",        fora: "Argélia",     local: "MetLife Stadium, Nova York",          placar: null },

  // ── 22/jun ──
  { id: 43, fase: "Fase de Grupos", grupo: "G", data: "2026-06-22", horaBRT: "16:00", casa: "Coreia do Sul",  fora: "Panamá",      local: "Rose Bowl, Los Angeles",             placar: null },
  { id: 44, fase: "Fase de Grupos", grupo: "H", data: "2026-06-22", horaBRT: "19:00", casa: "Arábia Saudita", fora: "Egito",       local: "NRG Stadium, Houston",              placar: null },
  { id: 45, fase: "Fase de Grupos", grupo: "I", data: "2026-06-22", horaBRT: "22:00", casa: "Costa do Marfim",fora: "Honduras",    local: "Arrowhead Stadium, Kansas City",     placar: null },

  // ── 23/jun ──
  { id: 46, fase: "Fase de Grupos", grupo: "L", data: "2026-06-23", horaBRT: "16:00", casa: "Equador",        fora: "El Salvador", local: "BMO Field, Toronto",                placar: null },
  { id: 47, fase: "Fase de Grupos", grupo: "J", data: "2026-06-23", horaBRT: "19:00", casa: "Gana",           fora: "Jamaica",     local: "BC Place, Vancouver",               placar: null },
  { id: 48, fase: "Fase de Grupos", grupo: "K", data: "2026-06-23", horaBRT: "22:00", casa: "Ucrânia",        fora: "Nova Zelândia",local: "AT&T Stadium, Dallas",             placar: null },

  // ── 24/jun ──
  { id: 49, fase: "Fase de Grupos", grupo: "A", data: "2026-06-24", horaBRT: "17:00", casa: "Estados Unidos", fora: "Marrocos",    local: "SoFi Stadium, Los Angeles",          placar: null },
  { id: 50, fase: "Fase de Grupos", grupo: "A", data: "2026-06-24", horaBRT: "17:00", casa: "Panamá",         fora: "Colômbia",    local: "Estadio Azteca, Cidade do México",   placar: null },
  { id: 51, fase: "Fase de Grupos", grupo: "E", data: "2026-06-24", horaBRT: "21:00", casa: "Japão",          fora: "Alemanha",    local: "MetLife Stadium, Nova York",          placar: null },
  { id: 52, fase: "Fase de Grupos", grupo: "E", data: "2026-06-24", horaBRT: "21:00", casa: "Argentina",      fora: "Costa Rica",  local: "Hard Rock Stadium, Miami",           placar: null },

  // ── 25/jun ──
  { id: 53, fase: "Fase de Grupos", grupo: "B", data: "2026-06-25", horaBRT: "17:00", casa: "México",         fora: "Uruguai",     local: "Estadio Azteca, Cidade do México",   placar: null },
  { id: 54, fase: "Fase de Grupos", grupo: "B", data: "2026-06-25", horaBRT: "17:00", casa: "Polônia",        fora: "Senegal",     local: "Arrowhead Stadium, Kansas City",     placar: null },
  { id: 55, fase: "Fase de Grupos", grupo: "D", data: "2026-06-25", horaBRT: "21:00", casa: "Brasil",         fora: "Suíça",       local: "AT&T Stadium, Dallas",               placar: null },
  { id: 56, fase: "Fase de Grupos", grupo: "D", data: "2026-06-25", horaBRT: "21:00", casa: "Sérvia",         fora: "Camarões",    local: "NRG Stadium, Houston",              placar: null },

  // ── 26/jun ──
  { id: 57, fase: "Fase de Grupos", grupo: "C", data: "2026-06-26", horaBRT: "17:00", casa: "Canadá",         fora: "Croácia",     local: "BMO Field, Toronto",                placar: null },
  { id: 58, fase: "Fase de Grupos", grupo: "C", data: "2026-06-26", horaBRT: "17:00", casa: "Bélgica",        fora: "Argélia",     local: "Levi's Stadium, São Francisco",      placar: null },
  { id: 59, fase: "Fase de Grupos", grupo: "F", data: "2026-06-26", horaBRT: "21:00", casa: "França",         fora: "Portugal",    local: "Rose Bowl, Los Angeles",             placar: null },
  { id: 60, fase: "Fase de Grupos", grupo: "F", data: "2026-06-26", horaBRT: "21:00", casa: "Austrália",      fora: "Nigéria",     local: "Gillette Stadium, Boston",           placar: null },

  // ── 27/jun ──
  { id: 61, fase: "Fase de Grupos", grupo: "G", data: "2026-06-27", horaBRT: "17:00", casa: "Inglaterra",     fora: "Coreia do Sul",local: "SoFi Stadium, Los Angeles",         placar: null },
  { id: 62, fase: "Fase de Grupos", grupo: "G", data: "2026-06-27", horaBRT: "17:00", casa: "Espanha",        fora: "Panamá",      local: "Hard Rock Stadium, Miami",           placar: null },
  { id: 63, fase: "Fase de Grupos", grupo: "H", data: "2026-06-27", horaBRT: "21:00", casa: "Itália",         fora: "Arábia Saudita",local: "MetLife Stadium, Nova York",        placar: null },
  { id: 64, fase: "Fase de Grupos", grupo: "H", data: "2026-06-27", horaBRT: "21:00", casa: "Dinamarca",      fora: "Egito",       local: "AT&T Stadium, Dallas",               placar: null },

  // ── 28/jun ──
  { id: 65, fase: "Fase de Grupos", grupo: "I", data: "2026-06-28", horaBRT: "17:00", casa: "Irã",            fora: "Honduras",    local: "NRG Stadium, Houston",              placar: null },
  { id: 66, fase: "Fase de Grupos", grupo: "I", data: "2026-06-28", horaBRT: "17:00", casa: "Chile",          fora: "Costa do Marfim",local: "Arrowhead Stadium, Kansas City",  placar: null },
  { id: 67, fase: "Fase de Grupos", grupo: "J", data: "2026-06-28", horaBRT: "21:00", casa: "Catar",          fora: "Gana",        local: "BC Place, Vancouver",               placar: null },
  { id: 68, fase: "Fase de Grupos", grupo: "J", data: "2026-06-28", horaBRT: "21:00", casa: "Jamaica",        fora: "Escócia",     local: "BMO Field, Toronto",                placar: null },

  // ── 29/jun ──
  { id: 69, fase: "Fase de Grupos", grupo: "K", data: "2026-06-29", horaBRT: "17:00", casa: "Turquia",        fora: "Ucrânia",     local: "Rose Bowl, Los Angeles",             placar: null },
  { id: 70, fase: "Fase de Grupos", grupo: "K", data: "2026-06-29", horaBRT: "17:00", casa: "Romênia",        fora: "Nova Zelândia",local: "Gillette Stadium, Boston",          placar: null },
  { id: 71, fase: "Fase de Grupos", grupo: "L", data: "2026-06-29", horaBRT: "21:00", casa: "Holanda",        fora: "Equador",     local: "SoFi Stadium, Los Angeles",          placar: null },
  { id: 72, fase: "Fase de Grupos", grupo: "L", data: "2026-06-29", horaBRT: "21:00", casa: "Tunísia",        fora: "El Salvador", local: "Levi's Stadium, São Francisco",      placar: null },

  // ── Oitavas de Final (1-4 jul) ──
  { id: 80, fase: "Oitavas de Final", grupo: null, data: "2026-07-01", horaBRT: "16:00", casa: "1º Grupo A", fora: "2º Grupo B", local: "MetLife Stadium, Nova York",     placar: null },
  { id: 81, fase: "Oitavas de Final", grupo: null, data: "2026-07-01", horaBRT: "20:00", casa: "1º Grupo C", fora: "2º Grupo D", local: "SoFi Stadium, Los Angeles",      placar: null },
  { id: 82, fase: "Oitavas de Final", grupo: null, data: "2026-07-02", horaBRT: "16:00", casa: "1º Grupo E", fora: "2º Grupo F", local: "AT&T Stadium, Dallas",           placar: null },
  { id: 83, fase: "Oitavas de Final", grupo: null, data: "2026-07-02", horaBRT: "20:00", casa: "1º Grupo G", fora: "2º Grupo H", local: "Hard Rock Stadium, Miami",       placar: null },
  { id: 84, fase: "Oitavas de Final", grupo: null, data: "2026-07-03", horaBRT: "16:00", casa: "1º Grupo I", fora: "2º Grupo J", local: "Rose Bowl, Los Angeles",         placar: null },
  { id: 85, fase: "Oitavas de Final", grupo: null, data: "2026-07-03", horaBRT: "20:00", casa: "1º Grupo K", fora: "2º Grupo L", local: "Levi's Stadium, São Francisco",  placar: null },
  { id: 86, fase: "Oitavas de Final", grupo: null, data: "2026-07-04", horaBRT: "16:00", casa: "A definir",  fora: "A definir",  local: "BMO Field, Toronto",             placar: null },
  { id: 87, fase: "Oitavas de Final", grupo: null, data: "2026-07-04", horaBRT: "20:00", casa: "A definir",  fora: "A definir",  local: "Estadio Azteca, Cidade do México", placar: null },

  // ── Quartas de Final (8-10 jul) ──
  { id: 90, fase: "Quartas de Final", grupo: null, data: "2026-07-08", horaBRT: "16:00", casa: "A definir", fora: "A definir", local: "MetLife Stadium, Nova York",     placar: null },
  { id: 91, fase: "Quartas de Final", grupo: null, data: "2026-07-08", horaBRT: "20:00", casa: "A definir", fora: "A definir", local: "SoFi Stadium, Los Angeles",      placar: null },
  { id: 92, fase: "Quartas de Final", grupo: null, data: "2026-07-09", horaBRT: "16:00", casa: "A definir", fora: "A definir", local: "AT&T Stadium, Dallas",           placar: null },
  { id: 93, fase: "Quartas de Final", grupo: null, data: "2026-07-09", horaBRT: "20:00", casa: "A definir", fora: "A definir", local: "Hard Rock Stadium, Miami",       placar: null },

  // ── Semifinais (14-15 jul) ──
  { id: 96, fase: "Semifinal", grupo: null, data: "2026-07-14", horaBRT: "20:00", casa: "A definir", fora: "A definir", local: "Rose Bowl, Los Angeles",    placar: null },
  { id: 97, fase: "Semifinal", grupo: null, data: "2026-07-15", horaBRT: "20:00", casa: "A definir", fora: "A definir", local: "MetLife Stadium, Nova York", placar: null },

  // ── Disputa 3º lugar (18 jul) ──
  { id: 98, fase: "Disputa 3º Lugar", grupo: null, data: "2026-07-18", horaBRT: "17:00", casa: "A definir", fora: "A definir", local: "AT&T Stadium, Dallas", placar: null },

  // ── Final (19 jul) ──
  { id: 99, fase: "Final", grupo: null, data: "2026-07-19", horaBRT: "17:00", casa: "A definir", fora: "A definir", local: "MetLife Stadium, Nova York", placar: null },
];
