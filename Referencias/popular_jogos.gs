/**
 * Google Apps Script — Popular aba "jogos" com todos os jogos da Copa 2026
 *
 * Como usar:
 *   1. Abra a planilha no Google Sheets
 *   2. Clique em Extensões > Apps Script
 *   3. Cole este código e salve
 *   4. Clique em "Executar" (função popularJogos)
 *   5. Autorize quando solicitado
 *
 * Colunas criadas:
 *   id | fase | grupo | data | horaBRT | casa | fora | local | placar_casa | placar_fora
 *
 * placar_casa / placar_fora: vazio = jogo não realizado; número = resultado final
 */
function popularJogos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let aba = ss.getSheetByName('jogos');
  if (!aba) aba = ss.insertSheet('jogos');

  aba.clearContents();

  const cabecalho = ['id', 'fase', 'grupo', 'data', 'horaBRT', 'casa', 'fora', 'local', 'placar_casa', 'placar_fora'];

  // [id, fase, grupo, data, horaBRT, casa, fora, local, placar_casa, placar_fora]
  // grupo vazio = fase eliminatória
  // placar_casa/fora vazio = não realizado
  const jogos = [
    // ── Fase de Grupos ──────────────────────────────────────────────
    [1,  'Fase de Grupos', 'A', '2026-06-11', '22:00', 'Estados Unidos', 'Panamá',         'SoFi Stadium, Los Angeles',          2, 0],
    [2,  'Fase de Grupos', 'E', '2026-06-11', '19:00', 'Argentina',      'Costa Rica',     'Estadio Azteca, Cidade do México',   3, 0],
    [3,  'Fase de Grupos', 'D', '2026-06-11', '23:00', 'Brasil',         'Camarões',       'MetLife Stadium, Nova York',         4, 1],
    [4,  'Fase de Grupos', 'B', '2026-06-12', '13:00', 'México',         'Senegal',        'Estadio Azteca, Cidade do México',  '', ''],
    [5,  'Fase de Grupos', 'F', '2026-06-12', '16:00', 'França',         'Nigéria',        'AT&T Stadium, Dallas',              '', ''],
    [6,  'Fase de Grupos', 'C', '2026-06-12', '19:00', 'Canadá',         'Argélia',        'BMO Field, Toronto',                '', ''],
    [7,  'Fase de Grupos', 'G', '2026-06-12', '22:00', 'Inglaterra',     'Coreia do Sul',  'Hard Rock Stadium, Miami',          '', ''],
    [8,  'Fase de Grupos', 'H', '2026-06-13', '13:00', 'Itália',         'Egito',          'Gillette Stadium, Boston',          '', ''],
    [9,  'Fase de Grupos', 'I', '2026-06-13', '16:00', 'Chile',          'Honduras',       'Arrowhead Stadium, Kansas City',    '', ''],
    [10, 'Fase de Grupos', 'L', '2026-06-13', '19:00', 'Holanda',        'El Salvador',    "Levi's Stadium, São Francisco",     '', ''],
    [11, 'Fase de Grupos', 'J', '2026-06-13', '22:00', 'Catar',          'Jamaica',        'Rose Bowl, Los Angeles',            '', ''],
    [12, 'Fase de Grupos', 'K', '2026-06-14', '13:00', 'Turquia',        'Nova Zelândia',  'BC Place, Vancouver',               '', ''],
    [13, 'Fase de Grupos', 'A', '2026-06-14', '16:00', 'Colômbia',       'Marrocos',       'NRG Stadium, Houston',              '', ''],
    [14, 'Fase de Grupos', 'E', '2026-06-14', '19:00', 'Alemanha',       'Japão',          'AT&T Stadium, Dallas',              '', ''],
    [15, 'Fase de Grupos', 'D', '2026-06-14', '22:00', 'Sérvia',         'Suíça',          'MetLife Stadium, Nova York',        '', ''],
    [16, 'Fase de Grupos', 'B', '2026-06-15', '13:00', 'Uruguai',        'Polônia',        'Hard Rock Stadium, Miami',          '', ''],
    [17, 'Fase de Grupos', 'F', '2026-06-15', '16:00', 'Portugal',       'Austrália',      "Levi's Stadium, São Francisco",     '', ''],
    [18, 'Fase de Grupos', 'C', '2026-06-15', '19:00', 'Bélgica',        'Croácia',        'Gillette Stadium, Boston',          '', ''],
    [19, 'Fase de Grupos', 'G', '2026-06-15', '22:00', 'Espanha',        'Panamá',         'SoFi Stadium, Los Angeles',         '', ''],
    [20, 'Fase de Grupos', 'H', '2026-06-16', '13:00', 'Dinamarca',      'Arábia Saudita', 'Rose Bowl, Los Angeles',            '', ''],
    [21, 'Fase de Grupos', 'I', '2026-06-16', '16:00', 'Irã',            'Costa do Marfim','Arrowhead Stadium, Kansas City',    '', ''],
    [22, 'Fase de Grupos', 'L', '2026-06-16', '19:00', 'Equador',        'Tunísia',        'NRG Stadium, Houston',              '', ''],
    [23, 'Fase de Grupos', 'J', '2026-06-16', '22:00', 'Gana',           'Escócia',        'BMO Field, Toronto',                '', ''],
    [24, 'Fase de Grupos', 'K', '2026-06-17', '13:00', 'Ucrânia',        'Romênia',        'BC Place, Vancouver',               '', ''],
    [25, 'Fase de Grupos', 'A', '2026-06-17', '16:00', 'Estados Unidos', 'Colômbia',       'SoFi Stadium, Los Angeles',         '', ''],
    [26, 'Fase de Grupos', 'E', '2026-06-17', '19:00', 'Argentina',      'Alemanha',       'AT&T Stadium, Dallas',              '', ''],
    [27, 'Fase de Grupos', 'D', '2026-06-17', '22:00', 'Brasil',         'Sérvia',         'Gillette Stadium, Boston',          '', ''],
    [28, 'Fase de Grupos', 'B', '2026-06-18', '13:00', 'México',         'Polônia',        'Estadio Azteca, Cidade do México',  '', ''],
    [29, 'Fase de Grupos', 'F', '2026-06-18', '16:00', 'França',         'Austrália',      'Hard Rock Stadium, Miami',          '', ''],
    [30, 'Fase de Grupos', 'C', '2026-06-18', '19:00', 'Canadá',         'Bélgica',        'BMO Field, Toronto',                '', ''],
    [31, 'Fase de Grupos', 'G', '2026-06-18', '22:00', 'Inglaterra',     'Espanha',        'MetLife Stadium, Nova York',        '', ''],
    [32, 'Fase de Grupos', 'H', '2026-06-19', '13:00', 'Itália',         'Dinamarca',      "Levi's Stadium, São Francisco",     '', ''],
    [33, 'Fase de Grupos', 'I', '2026-06-19', '16:00', 'Irã',            'Chile',          'NRG Stadium, Houston',              '', ''],
    [34, 'Fase de Grupos', 'L', '2026-06-19', '19:00', 'Holanda',        'Tunísia',        'Rose Bowl, Los Angeles',            '', ''],
    [35, 'Fase de Grupos', 'J', '2026-06-19', '22:00', 'Catar',          'Escócia',        'Arrowhead Stadium, Kansas City',    '', ''],
    [36, 'Fase de Grupos', 'K', '2026-06-20', '13:00', 'Turquia',        'Romênia',        'BC Place, Vancouver',               '', ''],
    [37, 'Fase de Grupos', 'A', '2026-06-20', '16:00', 'Panamá',         'Marrocos',       'AT&T Stadium, Dallas',              '', ''],
    [38, 'Fase de Grupos', 'E', '2026-06-20', '19:00', 'Japão',          'Costa Rica',     'SoFi Stadium, Los Angeles',         '', ''],
    [39, 'Fase de Grupos', 'D', '2026-06-20', '22:00', 'Suíça',          'Camarões',       'Gillette Stadium, Boston',          '', ''],
    [40, 'Fase de Grupos', 'B', '2026-06-21', '16:00', 'Uruguai',        'Senegal',        'Hard Rock Stadium, Miami',          '', ''],
    [41, 'Fase de Grupos', 'F', '2026-06-21', '19:00', 'Portugal',       'Nigéria',        "Levi's Stadium, São Francisco",     '', ''],
    [42, 'Fase de Grupos', 'C', '2026-06-21', '22:00', 'Croácia',        'Argélia',        'MetLife Stadium, Nova York',        '', ''],
    [43, 'Fase de Grupos', 'G', '2026-06-22', '16:00', 'Coreia do Sul',  'Panamá',         'Rose Bowl, Los Angeles',            '', ''],
    [44, 'Fase de Grupos', 'H', '2026-06-22', '19:00', 'Arábia Saudita', 'Egito',          'NRG Stadium, Houston',              '', ''],
    [45, 'Fase de Grupos', 'I', '2026-06-22', '22:00', 'Costa do Marfim','Honduras',       'Arrowhead Stadium, Kansas City',    '', ''],
    [46, 'Fase de Grupos', 'L', '2026-06-23', '16:00', 'Equador',        'El Salvador',    'BMO Field, Toronto',                '', ''],
    [47, 'Fase de Grupos', 'J', '2026-06-23', '19:00', 'Gana',           'Jamaica',        'BC Place, Vancouver',               '', ''],
    [48, 'Fase de Grupos', 'K', '2026-06-23', '22:00', 'Ucrânia',        'Nova Zelândia',  'AT&T Stadium, Dallas',              '', ''],
    [49, 'Fase de Grupos', 'A', '2026-06-24', '17:00', 'Estados Unidos', 'Marrocos',       'SoFi Stadium, Los Angeles',         '', ''],
    [50, 'Fase de Grupos', 'A', '2026-06-24', '17:00', 'Panamá',         'Colômbia',       'Estadio Azteca, Cidade do México',  '', ''],
    [51, 'Fase de Grupos', 'E', '2026-06-24', '21:00', 'Japão',          'Alemanha',       'MetLife Stadium, Nova York',        '', ''],
    [52, 'Fase de Grupos', 'E', '2026-06-24', '21:00', 'Argentina',      'Costa Rica',     'Hard Rock Stadium, Miami',          '', ''],
    [53, 'Fase de Grupos', 'B', '2026-06-25', '17:00', 'México',         'Uruguai',        'Estadio Azteca, Cidade do México',  '', ''],
    [54, 'Fase de Grupos', 'B', '2026-06-25', '17:00', 'Polônia',        'Senegal',        'Arrowhead Stadium, Kansas City',    '', ''],
    [55, 'Fase de Grupos', 'D', '2026-06-25', '21:00', 'Brasil',         'Suíça',          'AT&T Stadium, Dallas',              '', ''],
    [56, 'Fase de Grupos', 'D', '2026-06-25', '21:00', 'Sérvia',         'Camarões',       'NRG Stadium, Houston',              '', ''],
    [57, 'Fase de Grupos', 'C', '2026-06-26', '17:00', 'Canadá',         'Croácia',        'BMO Field, Toronto',                '', ''],
    [58, 'Fase de Grupos', 'C', '2026-06-26', '17:00', 'Bélgica',        'Argélia',        "Levi's Stadium, São Francisco",     '', ''],
    [59, 'Fase de Grupos', 'F', '2026-06-26', '21:00', 'França',         'Portugal',       'Rose Bowl, Los Angeles',            '', ''],
    [60, 'Fase de Grupos', 'F', '2026-06-26', '21:00', 'Austrália',      'Nigéria',        'Gillette Stadium, Boston',          '', ''],
    [61, 'Fase de Grupos', 'G', '2026-06-27', '17:00', 'Inglaterra',     'Coreia do Sul',  'SoFi Stadium, Los Angeles',         '', ''],
    [62, 'Fase de Grupos', 'G', '2026-06-27', '17:00', 'Espanha',        'Panamá',         'Hard Rock Stadium, Miami',          '', ''],
    [63, 'Fase de Grupos', 'H', '2026-06-27', '21:00', 'Itália',         'Arábia Saudita', 'MetLife Stadium, Nova York',        '', ''],
    [64, 'Fase de Grupos', 'H', '2026-06-27', '21:00', 'Dinamarca',      'Egito',          'AT&T Stadium, Dallas',              '', ''],
    [65, 'Fase de Grupos', 'I', '2026-06-28', '17:00', 'Irã',            'Honduras',       'NRG Stadium, Houston',              '', ''],
    [66, 'Fase de Grupos', 'I', '2026-06-28', '17:00', 'Chile',          'Costa do Marfim','Arrowhead Stadium, Kansas City',    '', ''],
    [67, 'Fase de Grupos', 'J', '2026-06-28', '21:00', 'Catar',          'Gana',           'BC Place, Vancouver',               '', ''],
    [68, 'Fase de Grupos', 'J', '2026-06-28', '21:00', 'Jamaica',        'Escócia',        'BMO Field, Toronto',                '', ''],
    [69, 'Fase de Grupos', 'K', '2026-06-29', '17:00', 'Turquia',        'Ucrânia',        'Rose Bowl, Los Angeles',            '', ''],
    [70, 'Fase de Grupos', 'K', '2026-06-29', '17:00', 'Romênia',        'Nova Zelândia',  'Gillette Stadium, Boston',          '', ''],
    [71, 'Fase de Grupos', 'L', '2026-06-29', '21:00', 'Holanda',        'Equador',        'SoFi Stadium, Los Angeles',         '', ''],
    [72, 'Fase de Grupos', 'L', '2026-06-29', '21:00', 'Tunísia',        'El Salvador',    "Levi's Stadium, São Francisco",     '', ''],
    // ── Oitavas de Final ────────────────────────────────────────────
    [80, 'Oitavas de Final', '', '2026-07-01', '16:00', '1º Grupo A', '2º Grupo B', 'MetLife Stadium, Nova York',        '', ''],
    [81, 'Oitavas de Final', '', '2026-07-01', '20:00', '1º Grupo C', '2º Grupo D', 'SoFi Stadium, Los Angeles',         '', ''],
    [82, 'Oitavas de Final', '', '2026-07-02', '16:00', '1º Grupo E', '2º Grupo F', 'AT&T Stadium, Dallas',              '', ''],
    [83, 'Oitavas de Final', '', '2026-07-02', '20:00', '1º Grupo G', '2º Grupo H', 'Hard Rock Stadium, Miami',          '', ''],
    [84, 'Oitavas de Final', '', '2026-07-03', '16:00', '1º Grupo I', '2º Grupo J', 'Rose Bowl, Los Angeles',            '', ''],
    [85, 'Oitavas de Final', '', '2026-07-03', '20:00', '1º Grupo K', '2º Grupo L', "Levi's Stadium, São Francisco",     '', ''],
    [86, 'Oitavas de Final', '', '2026-07-04', '16:00', 'A definir',  'A definir',  'BMO Field, Toronto',                '', ''],
    [87, 'Oitavas de Final', '', '2026-07-04', '20:00', 'A definir',  'A definir',  'Estadio Azteca, Cidade do México',  '', ''],
    // ── Quartas de Final ────────────────────────────────────────────
    [90, 'Quartas de Final', '', '2026-07-08', '16:00', 'A definir', 'A definir', 'MetLife Stadium, Nova York',  '', ''],
    [91, 'Quartas de Final', '', '2026-07-08', '20:00', 'A definir', 'A definir', 'SoFi Stadium, Los Angeles',   '', ''],
    [92, 'Quartas de Final', '', '2026-07-09', '16:00', 'A definir', 'A definir', 'AT&T Stadium, Dallas',        '', ''],
    [93, 'Quartas de Final', '', '2026-07-09', '20:00', 'A definir', 'A definir', 'Hard Rock Stadium, Miami',    '', ''],
    // ── Semifinal ───────────────────────────────────────────────────
    [96, 'Semifinal', '', '2026-07-14', '20:00', 'A definir', 'A definir', 'Rose Bowl, Los Angeles',    '', ''],
    [97, 'Semifinal', '', '2026-07-15', '20:00', 'A definir', 'A definir', 'MetLife Stadium, Nova York', '', ''],
    // ── Disputa 3º Lugar ────────────────────────────────────────────
    [98, 'Disputa 3º Lugar', '', '2026-07-18', '17:00', 'A definir', 'A definir', 'AT&T Stadium, Dallas',        '', ''],
    // ── Final ───────────────────────────────────────────────────────
    [99, 'Final',            '', '2026-07-19', '17:00', 'A definir', 'A definir', 'MetLife Stadium, Nova York',  '', ''],
  ];

  aba.getRange(1, 1, 1, cabecalho.length).setValues([cabecalho]);
  aba.getRange(2, 1, jogos.length, cabecalho.length).setValues(jogos);

  // Formata cabeçalho
  const cabRange = aba.getRange(1, 1, 1, cabecalho.length);
  cabRange.setFontWeight('bold');
  cabRange.setBackground('#0d1b2e');
  cabRange.setFontColor('#ffffff');

  // Congela a primeira linha
  aba.setFrozenRows(1);

  // Formata as colunas data e horaBRT como texto simples (evita conversão automática)
  aba.getRange(2, 4, jogos.length, 1).setNumberFormat('@STRING@'); // data
  aba.getRange(2, 5, jogos.length, 1).setNumberFormat('@STRING@'); // horaBRT

  SpreadsheetApp.getUi().alert(`✅ Pronto! ${jogos.length} jogos populados na aba "jogos".`);
}
