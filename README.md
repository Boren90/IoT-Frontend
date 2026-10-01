# IoT Sensor-projekt - Frontend

Detta är frontend-delen av IoT Sensor-projektet.

Frontend är byggd med React och TypeScript och ansvarar för att hämta mätdata och statistik från backend samt presentera informationen för användaren.

## Exempel på användning av applikationen

**Problem:** En husägare har ett garage eller förråd där temperatur och luftfuktighet kan variera mycket. Det kan vara svårt att veta hur klimatet faktiskt har sett ut över tid.

**Lösning:** Frontend ger användaren möjlighet att se aktuella mätningar, diagram och statistik för en vald dag.

## Teknik

- React
- TypeScript
- Vite
- Chart.js
- CSS

## Funktioner

Frontend kan:

- Visa temperatur och luftfuktighet.
- Visa den senaste mätningen.
- Visa antal registrerade mätningar.
- Visa temperatur och luftfuktighet i ett diagram.
- Låta användaren välja ett specifikt datum.
- Visa statistik för den valda dagen.

Statistiken innehåller:

- Medeltemperatur
- Minimumtemperatur
- Maximumtemperatur
- Medelvärde för luftfuktighet
- Minimumvärde för luftfuktighet
- Maximumvärde för luftfuktighet

## Dataflöde:

### Arduino

Arduino läser av:

- Temperatur i °C
- Luftfuktighet i %

### WiFi

- Mätdata skickas som JSON via REST API till backend.

### Spring Boot Backend

- Tar emot och hanterar data.
- Lagrar mätningarna i en lokal MongoDB-databas.

### Frontend

- Hämtar data från backend via REST API.
- Visar mätningarna för användaren.
- Visar statistik och diagram för valda dagar.