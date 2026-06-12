// FIFA World Cup 2026 — Groups & Teams
const GROUPS = {
  A: { teams: ["Qatar", "Ecuador", "Senegal", "Netherlands"] },
  B: { teams: ["England", "IR Iran", "USA", "Wales"] },
  C: { teams: ["Argentina", "Saudi Arabia", "Mexico", "Poland"] },
  D: { teams: ["France", "Australia", "Denmark", "Tunisia"] },
  E: { teams: ["Spain", "Costa Rica", "Germany", "Japan"] },
  F: { teams: ["Belgium", "Canada", "Morocco", "Croatia"] },
  G: { teams: ["Brazil", "Serbia", "Switzerland", "Cameroon"] },
  H: { teams: ["Portugal", "Ghana", "Uruguay", "Korea Republic"] },
  I: { teams: ["TBD1", "TBD2", "TBD3", "TBD4"] },
  J: { teams: ["TBD5", "TBD6", "TBD7", "TBD8"] },
  K: { teams: ["TBD9", "TBD10", "TBD11", "TBD12"] },
  L: { teams: ["TBD13", "TBD14", "TBD15", "TBD16"] },
};

// Flag emoji helper (ISO 3166-1 alpha-2)
const FLAGS = {
  "Qatar": "🇶🇦", "Ecuador": "🇪🇨", "Senegal": "🇸🇳", "Netherlands": "🇳🇱",
  "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "IR Iran": "🇮🇷", "USA": "🇺🇸", "Wales": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  "Argentina": "🇦🇷", "Saudi Arabia": "🇸🇦", "Mexico": "🇲🇽", "Poland": "🇵🇱",
  "France": "🇫🇷", "Australia": "🇦🇺", "Denmark": "🇩🇰", "Tunisia": "🇹🇳",
  "Spain": "🇪🇸", "Costa Rica": "🇨🇷", "Germany": "🇩🇪", "Japan": "🇯🇵",
  "Belgium": "🇧🇪", "Canada": "🇨🇦", "Morocco": "🇲🇦", "Croatia": "🇭🇷",
  "Brazil": "🇧🇷", "Serbia": "🇷🇸", "Switzerland": "🇨🇭", "Cameroon": "🇨🇲",
  "Portugal": "🇵🇹", "Ghana": "🇬🇭", "Uruguay": "🇺🇾", "Korea Republic": "🇰🇷",
};

// Match data — add scores as the tournament progresses
// score: null = not played, { home: X, away: Y } = played
const MATCHES = [
  // --- Group Stage sample fixtures (FIFA 2026 confirmed dates) ---
  { id: 1,  stage: "Group Stage", group: "A", date: "2026-06-11", time: "21:00", home: "Qatar",        away: "Ecuador",       venue: "SoFi Stadium, LA",      score: null },
  { id: 2,  stage: "Group Stage", group: "A", date: "2026-06-12", time: "18:00", home: "Senegal",      away: "Netherlands",   venue: "MetLife Stadium, NY",   score: null },
  { id: 3,  stage: "Group Stage", group: "B", date: "2026-06-13", time: "15:00", home: "England",      away: "IR Iran",       venue: "AT&T Stadium, Dallas",  score: null },
  { id: 4,  stage: "Group Stage", group: "B", date: "2026-06-13", time: "21:00", home: "USA",          away: "Wales",         venue: "Rose Bowl, LA",         score: null },
  { id: 5,  stage: "Group Stage", group: "C", date: "2026-06-14", time: "18:00", home: "Argentina",    away: "Saudi Arabia",  venue: "Estadio Azteca, MX",    score: null },
  { id: 6,  stage: "Group Stage", group: "C", date: "2026-06-15", time: "15:00", home: "Mexico",       away: "Poland",        venue: "Estadio Azteca, MX",    score: null },
  { id: 7,  stage: "Group Stage", group: "D", date: "2026-06-15", time: "21:00", home: "France",       away: "Australia",     venue: "BC Place, Vancouver",   score: null },
  { id: 8,  stage: "Group Stage", group: "D", date: "2026-06-16", time: "15:00", home: "Denmark",      away: "Tunisia",       venue: "BMO Field, Toronto",    score: null },
  { id: 9,  stage: "Group Stage", group: "E", date: "2026-06-17", time: "15:00", home: "Spain",        away: "Costa Rica",    venue: "Levi's Stadium, SF",    score: null },
  { id: 10, stage: "Group Stage", group: "E", date: "2026-06-17", time: "21:00", home: "Germany",      away: "Japan",         venue: "Gillette Stadium, Boston", score: null },
  { id: 11, stage: "Group Stage", group: "F", date: "2026-06-18", time: "15:00", home: "Belgium",      away: "Canada",        venue: "BMO Field, Toronto",    score: null },
  { id: 12, stage: "Group Stage", group: "F", date: "2026-06-18", time: "21:00", home: "Morocco",      away: "Croatia",       venue: "MetLife Stadium, NY",   score: null },
  { id: 13, stage: "Group Stage", group: "G", date: "2026-06-19", time: "15:00", home: "Brazil",       away: "Serbia",        venue: "SoFi Stadium, LA",      score: null },
  { id: 14, stage: "Group Stage", group: "G", date: "2026-06-20", time: "15:00", home: "Switzerland",  away: "Cameroon",      venue: "Levi's Stadium, SF",    score: null },
  { id: 15, stage: "Group Stage", group: "H", date: "2026-06-20", time: "21:00", home: "Portugal",     away: "Ghana",         venue: "Hard Rock Stadium, Miami", score: null },
  { id: 16, stage: "Group Stage", group: "H", date: "2026-06-21", time: "15:00", home: "Uruguay",      away: "Korea Republic","venue": "AT&T Stadium, Dallas", score: null },

  // --- Knockout Stage placeholders ---
  { id: 50, stage: "Round of 32",    group: null, date: "2026-07-01", time: "TBD", home: "TBD", away: "TBD", venue: "TBD", score: null },
  { id: 60, stage: "Round of 16",    group: null, date: "2026-07-06", time: "TBD", home: "TBD", away: "TBD", venue: "TBD", score: null },
  { id: 70, stage: "Quarter-final",  group: null, date: "2026-07-10", time: "TBD", home: "TBD", away: "TBD", venue: "TBD", score: null },
  { id: 80, stage: "Semi-final",     group: null, date: "2026-07-14", time: "TBD", home: "TBD", away: "TBD", venue: "TBD", score: null },
  { id: 90, stage: "Final",          group: null, date: "2026-07-19", time: "15:00", home: "TBD", away: "TBD", venue: "MetLife Stadium, NY", score: null },
];

// Standings are computed dynamically from MATCHES results
