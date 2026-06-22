"""
Atualiza resultados.json com placares finais da Copa do Mundo 2026.

Fontes (em ordem de prioridade):
  1. football-data.org  — se FOOTBALL_DATA_TOKEN estiver definido (recomendado)
  2. ESPN API pública   — fallback sem necessidade de cadastro
"""

import json
import os
import sys
import requests
from datetime import datetime, timedelta, timezone

# ── Mapeamento inglês → português ────────────────────────────────
EN_TO_PT = {
    "United States":    "Estados Unidos",
    "USA":              "Estados Unidos",
    "Mexico":           "México",
    "Canada":           "Canadá",
    "Brazil":           "Brasil",
    "Argentina":        "Argentina",
    "Uruguay":          "Uruguai",
    "Colombia":         "Colômbia",
    "Ecuador":          "Equador",
    "Chile":            "Chile",
    "Paraguay":         "Paraguai",
    "Peru":             "Peru",
    "Bolivia":          "Bolívia",
    "Venezuela":        "Venezuela",
    "France":           "França",
    "Germany":          "Alemanha",
    "Spain":            "Espanha",
    "Portugal":         "Portugal",
    "England":          "Inglaterra",
    "Netherlands":      "Países Baixos",
    "Italy":            "Itália",
    "Belgium":          "Bélgica",
    "Croatia":          "Croácia",
    "Serbia":           "Sérvia",
    "Poland":           "Polônia",
    "Switzerland":      "Suíça",
    "Denmark":          "Dinamarca",
    "Austria":          "Áustria",
    "Ukraine":          "Ucrânia",
    "Scotland":         "Escócia",
    "Romania":          "Romênia",
    "Turkey":           "Turquia",
    "Türkiye":          "Turquia",
    "Greece":           "Grécia",
    "Slovakia":         "Eslováquia",
    "Albania":          "Albânia",
    "Japan":            "Japão",
    "South Korea":      "Coreia do Sul",
    "Korea Republic":   "Coreia do Sul",
    "Australia":        "Austrália",
    "Iran":             "Irã",
    "Saudi Arabia":     "Arábia Saudita",
    "Qatar":            "Catar",
    "Iraq":             "Iraque",
    "Jordan":           "Jordânia",
    "New Zealand":      "Nova Zelândia",
    "Morocco":          "Marrocos",
    "Senegal":          "Senegal",
    "Nigeria":          "Nigéria",
    "Ghana":            "Gana",
    "Cameroon":         "Camarões",
    "Ivory Coast":      "Costa do Marfim",
    "Côte d'Ivoire":    "Costa do Marfim",
    "Egypt":            "Egito",
    "Algeria":          "Argélia",
    "Tunisia":          "Tunísia",
    "Mali":             "Mali",
    "South Africa":     "África do Sul",
    "Panama":           "Panamá",
    "Costa Rica":       "Costa Rica",
    "Honduras":         "Honduras",
    "Jamaica":          "Jamaica",
    "El Salvador":      "El Salvador",
    "Curaçao":          "Curaçao",
    "Haiti":            "Haiti",
    "Norway":           "Noruega",
    "Sweden":           "Suécia",
    "Czechia":          "Tchéquia",
    "Czech Republic":   "Tchéquia",
    "Bosnia and Herzegovina": "Bósnia e Herzegovina",
    "Bosnia-Herzegovina":     "Bósnia e Herzegovina",
    "Cape Verde":       "Cabo Verde",
    "Cabo Verde":       "Cabo Verde",
    "Uzbekistan":       "Uzbequistão",
    "DR Congo":         "RD Congo",
    "Congo DR":         "RD Congo",
    "Democratic Republic of Congo": "RD Congo",
    "Iraq":             "Iraque",
    "Wales":            "Pais de Gales",
    "Palestine":        "Palestina",
    "Indonesia":        "Indonésia",
    "China PR":         "China",
    "China":            "China",
}

def pt(nome_en: str) -> str:
    return EN_TO_PT.get(nome_en, nome_en)


# ── Fonte 1: football-data.org ────────────────────────────────────
def buscar_football_data(api_key: str) -> dict:
    """Busca todos os jogos encerrados da Copa 2026."""
    headers = {"X-Auth-Token": api_key}
    url = "https://api.football-data.org/v4/competitions/WC/matches"
    resp = requests.get(url, headers=headers, timeout=20)
    resp.raise_for_status()

    resultados = {}
    for match in resp.json().get("matches", []):
        if match.get("status") != "FINISHED":
            continue
        score = match.get("score", {}).get("fullTime", {})
        if score.get("home") is None:
            continue
        home = pt(match["homeTeam"]["name"])
        away = pt(match["awayTeam"]["name"])
        resultados[f"{home}|{away}"] = {
            "casa": int(score["home"]),
            "fora": int(score["away"]),
        }
    return resultados


# ── Fonte 2: ESPN (sem chave de API) ─────────────────────────────
def buscar_espn() -> dict:
    """Busca jogos dos últimos 4 dias via ESPN."""
    resultados = {}
    hoje = datetime.now(timezone.utc)

    for delta in range(5):  # hoje + 4 dias anteriores
        d = hoje - timedelta(days=delta)
        date_str = d.strftime("%Y%m%d")
        url = (
            "https://site.api.espn.com/apis/site/v2/sports/soccer"
            f"/fifa.world/scoreboard?dates={date_str}&limit=50"
        )
        try:
            resp = requests.get(url, timeout=10)
            resp.raise_for_status()
            data = resp.json()
        except Exception as exc:
            print(f"  ESPN {date_str}: {exc}")
            continue

        for event in data.get("events", []):
            comp = event.get("competitions", [{}])[0]
            status = comp.get("status", {}).get("type", {})
            if not status.get("completed"):
                continue

            competitors = comp.get("competitors", [])
            if len(competitors) < 2:
                continue

            home_c = next((c for c in competitors if c.get("homeAway") == "home"), competitors[0])
            away_c = next((c for c in competitors if c.get("homeAway") == "away"), competitors[1])

            home = pt(home_c.get("team", {}).get("displayName", ""))
            away = pt(away_c.get("team", {}).get("displayName", ""))
            try:
                placar_casa = int(home_c.get("score", 0))
                placar_fora = int(away_c.get("score", 0))
            except (ValueError, TypeError):
                continue

            if home and away:
                resultados[f"{home}|{away}"] = {"casa": placar_casa, "fora": placar_fora}

    return resultados


# ── Main ──────────────────────────────────────────────────────────
def main():
    # Verifica período da Copa
    agora = datetime.now(timezone.utc)
    inicio_copa = datetime(2026, 6, 11, tzinfo=timezone.utc)
    fim_copa    = datetime(2026, 7, 20, tzinfo=timezone.utc)
    if not (inicio_copa <= agora <= fim_copa):
        print("ℹ️  Copa 2026 não está em andamento. Nada a atualizar.")
        return

    api_key = os.environ.get("FOOTBALL_DATA_TOKEN", "").strip()

    print(f"🔍 Buscando resultados em {agora.strftime('%d/%m/%Y %H:%M UTC')} ...")
    try:
        if api_key:
            print("  Fonte: football-data.org")
            novos = buscar_football_data(api_key)
        else:
            print("  Fonte: ESPN (sem chave API — adicione FOOTBALL_DATA_TOKEN para maior precisão)")
            novos = buscar_espn()
    except Exception as exc:
        print(f"❌ Erro ao buscar resultados: {exc}")
        sys.exit(1)

    # Carrega arquivo existente
    try:
        with open("resultados.json", encoding="utf-8") as f:
            existentes = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existentes = {}

    # Remove chave de metadados antes de comparar
    existentes.pop("_atualizado", None)

    # Detecta e aplica mudanças
    mudancas = 0
    for chave, placar in novos.items():
        if existentes.get(chave) != placar:
            existentes[chave] = placar
            mudancas += 1
            casa, fora = chave.split("|")
            print(f"  ✅ {casa} {placar['casa']} × {placar['fora']} {fora}")

    # Salva com timestamp de atualização
    existentes["_atualizado"] = agora.strftime("%Y-%m-%dT%H:%M:%SZ")
    with open("resultados.json", "w", encoding="utf-8") as f:
        json.dump(existentes, f, ensure_ascii=False, indent=2)

    if mudancas:
        print(f"\n✨ {mudancas} resultado(s) atualizado(s).")
    else:
        print("\n✅ Nenhuma mudança nos resultados.")


if __name__ == "__main__":
    main()
