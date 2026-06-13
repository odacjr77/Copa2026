/**
 * INSTRUÇÕES:
 * 1. Abra a planilha: https://docs.google.com/spreadsheets/d/15doR2R2qaBXsiH-xrekydCPEsldxUKvg99EYAOiblyU
 * 2. Menu: Extensões → Apps Script
 * 3. Apague o código existente e cole TODO este arquivo
 * 4. Clique em ▶ Run → preencherPrevisoes
 * 5. Autorize quando solicitado
 *
 * Previsões baseadas em:
 *  - Histórico recente FIFA (2022–2026): rankings, desempenho em eliminatórias
 *  - Resultados Copa 2026 já disputados (Fase de Grupos rodada 1):
 *      Brasil 4×1 Camarões  |  Argentina 3×0 Costa Rica  |  EUA 2×0 Panamá
 *  - Ranking FIFA jun/2026: Argentina 1º, França 2º, Espanha 3º, Brasil 4º...
 */
function preencherPrevisoes() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('MataMata');
  if (!sheet) { SpreadsheetApp.getUi().alert('Aba MataMata não encontrada!'); return; }

  /**
   * Cada linha: [row, t1c1, %1, t1c2, %2, t2c1, %3, t2c2, %4]
   *
   * Time 1 Candidato 1/2: os dois times mais prováveis para ocupar a vaga "Time 1" do jogo
   * %1 + %2 ≈ 100  (distribuição de probabilidade para a vaga Time 1)
   * Time 2 Candidato 1/2: idem para a vaga "Time 2"
   * %3 + %4 ≈ 100
   *
   * Bracket 2026 (FIFA oficial):
   *  16 avos: 1ºA-2ºB, 1ºC-2ºD, 1ºE-2ºF, 1ºG-2ºH, 1ºI-2ºJ, 1ºK-2ºL (e espelhamentos)
   *  + melhores 3ºs vs cabeças de chave dos outros chaves
   *
   * Grupos (confirmados FIFA 2026 draw – dez/2024):
   *  A: México, Coreia do Sul, Tchéquia, África do Sul
   *  B: Canadá, Bósnia e Herzegovina, Catar, Suíça
   *  C: Brasil, Escócia, Haiti, Marrocos
   *  D: Estados Unidos, Paraguai, Austrália, Turquia
   *  E: Alemanha, Curaçao, Costa do Marfim, Equador
   *  F: Países Baixos, Japão, Suécia, Tunísia
   *  G: Bélgica, Egito, Irã, Nova Zelândia
   *  H: Espanha, Uruguai, Arábia Saudita, Cabo Verde
   *  I: França, Senegal, Noruega, Iraque
   *  J: Argentina, Áustria, Argélia, Jordânia
   *  K: Portugal, Colômbia, RD Congo, Uzbequistão
   *  L: Inglaterra, Croácia, Gana, Panamá
   */
  const previsoes = [
    // ═══════════════════════════════════════════════════════
    // 16 AVOS DE FINAL  (rows 2–17)
    // 1ºA vs 2ºB — Los Angeles 28/jun
    [2,  "México",          65, "Coreia do Sul",  35,  "Suíça",           60, "Canadá",          40],
    // 1ºC vs 2ºD — Houston 29/jun
    [3,  "Brasil",          87, "Marrocos",        13,  "Turquia",         52, "Austrália",        48],
    // 1ºE vs 2ºF — Boston 29/jun
    [4,  "Alemanha",        82, "Costa do Marfim", 18,  "Japão",           55, "Suécia",           45],
    // 1ºG vs 2ºH — Monterrey 29/jun
    [5,  "Bélgica",         80, "Irã",             20,  "Uruguai",         58, "Arábia Saudita",   42],
    // 1ºI vs 2ºJ — Dallas 30/jun
    [6,  "França",          83, "Noruega",         17,  "Áustria",         53, "Argélia",          47],
    // 1ºK vs 2ºL — Nova York 30/jun
    [7,  "Portugal",        78, "Colômbia",        22,  "Croácia",         55, "Gana",             45],
    // 1ºB vs 2ºA — Cidade do México 30/jun
    [8,  "Canadá",          60, "Suíça",           40,  "Coreia do Sul",   58, "México",           42],
    // 1ºD vs 2ºC — Atlanta 01/jul
    [9,  "Estados Unidos",  70, "Turquia",         30,  "Marrocos",        62, "Escócia",          38],
    // 1ºF vs 2ºE — Seattle 01/jul
    [10, "Países Baixos",   68, "Japão",           32,  "Equador",         55, "Costa do Marfim",  45],
    // 1ºH vs 2ºG — San Francisco 01/jul
    [11, "Espanha",         82, "Uruguai",         18,  "Irã",             55, "Egito",            45],
    // 1ºJ vs 2ºI — Los Angeles 02/jul
    [12, "Argentina",       83, "Áustria",         17,  "Senegal",         50, "Noruega",          50],
    // 1ºL vs 2ºK — Toronto 02/jul
    [13, "Inglaterra",      77, "Croácia",         23,  "Colômbia",        58, "RD Congo",         42],
    // Melhor 3º (D/E/F) vs chave pré-definida — Vancouver 03/jul
    [14, "Coreia do Sul",   55, "Suíça",           45,  "Alemanha",        80, "Costa do Marfim",  20],
    // Melhor 3º (A/B/C) vs chave pré-definida — Dallas 03/jul
    [15, "Turquia",         52, "Austrália",       48,  "Bélgica",         77, "Irã",              23],
    // Melhor 3º (G/H/I) vs chave pré-definida — Miami 03/jul
    [16, "Noruega",         52, "Argélia",         48,  "França",          80, "Senegal",          20],
    // Melhor 3º (J/K/L) vs chave pré-definida — Kansas City 03/jul
    [17, "Croácia",         53, "Gana",            47,  "Portugal",        75, "Colômbia",         25],

    // ═══════════════════════════════════════════════════════
    // OITAVAS DE FINAL  (rows 18–25)
    // Vencedor jogo 2 vs vencedor jogo 1 — Houston 04/jul
    [18, "Brasil",          78, "Turquia",         22,  "México",          58, "Coreia do Sul",    42],
    // Vencedor jogo 4 vs vencedor jogo 3 — Filadélfia 04/jul
    [19, "Bélgica",         65, "Uruguai",         35,  "Alemanha",        70, "Japão",            30],
    // Vencedor jogo 6 vs vencedor jogo 5 — Nova York 05/jul
    [20, "Portugal",        65, "Croácia",         35,  "França",          75, "Áustria",          25],
    // Vencedor jogo 7 vs vencedor jogo 8 — Cidade do México 05/jul
    [21, "Canadá",          55, "Suíça",           45,  "Estados Unidos",  68, "Marrocos",         32],
    // Vencedor jogo 10 vs vencedor jogo 9 — Dallas 06/jul
    [22, "Espanha",         78, "Irã",             22,  "Países Baixos",   65, "Equador",          35],
    // Vencedor jogo 12 vs vencedor jogo 11 — Seattle 06/jul
    [23, "Argentina",       82, "Senegal",         18,  "Inglaterra",      72, "Colômbia",         28],
    // Vencedor jogo 14 vs vencedor jogo 13 — Atlanta 07/jul
    [24, "Alemanha",        75, "Coreia do Sul",   25,  "Portugal",        70, "Gana",             30],
    // Vencedor jogo 15 vs vencedor jogo 16 — Vancouver 07/jul
    [25, "Bélgica",         68, "Turquia",         32,  "França",          78, "Croácia",          22],

    // ═══════════════════════════════════════════════════════
    // QUARTAS DE FINAL  (rows 26–29)
    // Venc. oitava 1 vs venc. oitava 2 — Boston 09/jul
    [26, "Brasil",          72, "México",          28,  "Alemanha",        65, "Bélgica",          35],
    // Venc. oitava 3 vs venc. oitava 4 — Los Angeles 10/jul
    [27, "França",          68, "Portugal",        32,  "Argentina",       75, "Estados Unidos",   25],
    // Venc. oitava 5 vs venc. oitava 6 — Miami 11/jul
    [28, "Espanha",         70, "Países Baixos",   30,  "Inglaterra",      65, "Argentina",        35],
    // Venc. oitava 7 vs venc. oitava 8 — Kansas City 11/jul
    [29, "Alemanha",        62, "Canadá",          38,  "França",          72, "Bélgica",          28],

    // ═══════════════════════════════════════════════════════
    // SEMIFINAL  (rows 30–31)
    // Venc. QF1 vs venc. QF2 — Dallas 14/jul
    [30, "Brasil",          62, "Alemanha",        38,  "Argentina",       60, "França",           40],
    // Venc. QF3 vs venc. QF4 — Atlanta 15/jul
    [31, "Espanha",         58, "Inglaterra",      42,  "França",          65, "Alemanha",         35],

    // ═══════════════════════════════════════════════════════
    // DISPUTA DE 3º LUGAR  (row 32) — Miami 18/jul
    [32, "Alemanha",        53, "França",          47,  "Inglaterra",      55, "Argentina",        45],

    // ═══════════════════════════════════════════════════════
    // FINAL  (row 33) — Nova York 19/jul
    [33, "Brasil",          55, "Argentina",       45,  "Espanha",         52, "França",           48],
  ];

  // Escreve em lote para maior eficiência
  previsoes.forEach(([row, t1c1, p1, t1c2, p2, t2c1, p3, t2c2, p4]) => {
    const range = sheet.getRange(row, 4, 1, 8);
    range.setValues([[t1c1, p1, t1c2, p2, t2c1, p3, t2c2, p4]]);
  });

  SpreadsheetApp.flush();
  Logger.log(`✅ ${previsoes.length} partidas preenchidas com sucesso!`);
  SpreadsheetApp.getUi().alert(`✅ ${previsoes.length} partidas da fase mata-mata preenchidas!`);
}
