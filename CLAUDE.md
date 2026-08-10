# Projet : Tempo

App de suivi musculation & course à pied (PWA perso, en français).

## Stack
- **Vanilla JS** (pas de framework, pas de build) — un seul fichier `app.js`
- HTML statique : `index.html`
- CSS pur : `style.css` (variables CSS pour le theming light/dark)
- **PWA** : `manifest.json` + `sw.js` (service worker)
- **Chart.js 4.4** (CDN) pour les graphes
- **Firebase 10.12** compat (CDN) : Auth Google + Firestore pour la sync cloud
- Persistance locale : `localStorage` (clé `sport-crm-v2`)

## Structure
- `index.html` — squelette : topbar, bottom-nav (7 vues), modal, includes Firebase/Chart.js
- `app.js` — toute la logique, organisée en sections numérotées :
  - 1. Données (`WORKOUT_PLAN`, constantes)
  - 2. État & persistance (`S`, `DEFAULTS`, `loadState`/`save`)
  - 2b. Firebase cloud sync
  - 3. Utilitaires / streaks / progression & records
  - 4→8. Vues : Dashboard, Séance, Nutrition & poids, Course & vélo, Historique, Stats
  - 8b. Profil & paramètres
  - 9. Modal & toast / 10. Navigation / 11. PWA & init
- `style.css` — styles, organisé par composant

## Conventions
- **Tout en français** : labels UI, noms d'exercices, commentaires, messages
- État global unique dans l'objet `S`, modifié puis `save()` (qui persiste + push Firestore)
- Vues rendues en string HTML injectée dans `<main id="app">` (pas de framework de templating)
- Constantes en SCREAMING_SNAKE_CASE, fonctions en camelCase
- Sections d'`app.js` séparées par des bannières `// ====` numérotées — garder cette structure
- Semaines A/B pour alterner les programmes de muscu (`weekType`)

## Design system
- Police : **Inter** (Google Fonts)
- Theming light/dark via `data-theme` sur `<html>` + variables CSS
- Couleurs par groupe musculaire définies dans `WORKOUT_PLAN` (ex. bras `#FF375F`)
- Style iOS / mobile-first : bottom-nav, modals, haptic feedback, pull-to-refresh

## Contraintes
- **Mobile-first** absolu (app utilisée sur téléphone, installée en PWA)
- **Pas de build, pas de dépendances npm** — tout en CDN ou vanilla
- Après modif de `app.js`/`style.css`/`index.html` : penser à bumper la version
  du cache dans `sw.js` (`const CACHE = 'sport-crm-vXX'`) sinon le SW sert l'ancienne version
- Garder le fichier `app.js` monolithique (choix assumé pour ce projet perso)
