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
- Programme PPL : 6 séances différentes par semaine (Push/Pull/Legs 1 puis 2) et semaines A/B aux exercices différents. La semaine A/B est déduite de la date (`weekLetter()`), la séance du jour suit la dernière faite dans la semaine (`nextPPLSession()`). Dimanche = repos (`REST_DAYS`) : l'accueil affiche le repos, la séance de demain et un bouton « Rattraper » si la semaine n'est pas bouclée. Clés de séance `A1 A2 B1 B2` stockées dans `weekType` ; dernière perf retrouvée par nom d'exercice (`lastSetsFor()`)

## Design system
- Voir `DESIGN.md` (système visuel) et `PRODUCT.md` (cible, principes). Design v5 « Monochrome » : noir et blanc strict, univers SCAPE
- Police système Apple (SF Pro via `-apple-system`), plus de Google Fonts
- Thème clair uniquement pour l'instant (`applyTheme()` force `light`)
- Barre d'onglets en pilule noire flottante, 4 onglets : Accueil, Séance (musculation), Corps, Progrès (Évolution/Historique/Bilan — `renderStats()`, verdict + régularité + exercices en progrès/à surveiller + records). Évolution = volume et indice de force par muscle (`renderEvolution()`, correspondance exercice → muscle dans `SLUG_MUSCLE`). Profil via la pastille ronde de l'accueil ; plus de barre du haut. Barre d'onglets glissable et toujours visible, séance comprise (bulle « liquid glass » animée en requestAnimationFrame avec positions en cache, `initNavGesture()` ; la barre de séance `#runbar` flotte au-dessus). Évolution : onglets famille → muscle (`evoTabs()`)
- Nutrition et course/vélo retirés de l'interface à la demande de Julien (il ne s'en sert pas) : le code et les données (`S.nutrition`, `S.runs`, `S.rides`) restent, les vues `nutrition`/`run` redirigent vers Accueil/Séance
- Chaque vue commence par `viewHead()` ; sous-navigation par `chipRow()`
- Pas de couleur par groupe dans l'UI : les couleurs de `WORKOUT_PLAN` sont des gris réservés aux graphiques

## Protection des données
- Sauvegarde locale immédiate (`save()` horodaté) + synchro Firestore qui n'écrase jamais un local plus récent (`pullFromCloud`)
- Connexion Google : popup, repli sur redirection (PWA iPhone) ; état visible sur l'accueil (`syncChip()`, `syncBanner()`)
- Sauvegardes de secours IndexedDB (`tempo-backups`, 10 copies, après chaque séance + 1/jour), restauration auto si le stockage est vidé (`initBackups()`), liste dans Profil
- Ouverture de l'app : toujours sur l'Accueil (`init()`), sauf rechargement iOS en pleine séance (brouillon modifié il y a < 10 min, `wkDraftAgeMin()`) → Séance
- Brouillon de séance : 72 h, séries validées et chrono conservés, date d'origine gardée ; réouverture > 2 h → proposition d'enregistrer (`checkForgottenOnOpen()`)
- Enregistrement : seules les séries validées, sauf confirmation pour les séries remplies non validées
- Séance modifiable en cours (`sessionExos()` : remplacement / « faire plus tard », stocké dans le brouillon `override`) — toujours passer par `sessionExos()` / `curExos()`, jamais `WORKOUT_PLAN[mg][wt]` directement
- Récupération musculaire (accueil, `recoveryCard()` / `muscleRecovery()`) : estimation par muscle à partir des séries validées (secondaires ×0,5 via `REC_SECONDARY`), récup 24 h + 3 h/série (+12 h gros muscles), séances cumulées ; heure exacte via `endTs` enregistré à la séance (sinon 18 h)
- Séries par muscle cette semaine (accueil, `weekSetsCard()` / `weekMuscleSets()`) : séries validées + restant prévu des séances pas encore faites, zone 10-20 (`SETS_ZONE`), indirectes comptées ½, mini-onglets par famille (`SETS_FAMILIES`) ; une ligne ouvre l'Évolution du muscle
- Ressenti par exercice (`FEELS` : échec / modéré / facile, `setFeel()`) : pastilles sous l'exercice terminé, gardé dans le brouillon (`feel`, clé = nom) et enregistré dans `exercise.feel` (jamais `undefined`, Firestore le refuse). `progressionHint()` l'utilise : facile → +charge dès le bas de la plage, échec → même charge ; 2 échecs de suite → « À surveiller » dans le Bilan
- Bilan hebdomadaire (`weekRecap(wk)`, `renderWeekBilan()`, `weekRecapCard()`) : période « Semaine » (par défaut) de Progrès · Bilan, affichée dans la page avec flèches semaine par semaine (`recapWk`, dernière semaine bouclée par défaut, celle-ci le dimanche) ; carte sur l'accueil le dimanche → `openWeekBilan()`. Séances x/6, volume vs semaine d'avant, progression par exercice vs la fois d'avant (±1 %), records, séries par muscle, ressenti, poids, 3 conseils (`recapTips()`)
- Records : comparés au 1RM estimé (Epley), en direct (`markRecords()`) et à l'enregistrement (`S.prs`)
- Notifications via le service worker uniquement (`showLocalNotif()`, iOS 16.4+ app installée), permission demandée sur geste ; séance à 100 % non enregistrée → notif en quittant

## Contraintes
- **Mobile-first** absolu (app utilisée sur téléphone, installée en PWA)
- **Pas de build, pas de dépendances npm** — tout en CDN ou vanilla
- Après modif de `app.js`/`style.css`/`index.html` : penser à bumper la version
  du cache dans `sw.js` (`const CACHE = 'sport-crm-vXX'`) ET `app.js?v=N` dans `index.html`, sinon le SW sert l'ancienne version
- Garder le fichier `app.js` monolithique (choix assumé pour ce projet perso)
