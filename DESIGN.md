# Design — Tempo v5 · Monochrome

Référence : l'univers SCAPE (Dribbble), noir et blanc strict. Les tokens vivent dans `style.css` (section 2) ; ce document en résume l'usage.

## Thème

Clair uniquement pour l'instant (un thème sombre dérivé est prévu en étape 5). Fond blanc, cartes blanches qui « flottent » grâce à une ombre douce, encre quasi noire.

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--bg`, `--surface` | `#FFFFFF` | fond de page, cartes |
| `--surface2` | `#F4F4F4` | champs de saisie, vignettes, tuiles |
| `--track` | `#EBEBEB` | pistes des barres de progression |
| `--border` | `#ECECEC` | contour des pastilles inactives, séparateurs |
| `--ink` / `--t1` | `#0A0A0A` | texte, boutons principaux, état actif, barre d'onglets |
| `--t2` | `#5C5C5C` | texte secondaire |
| `--t3` | `#737373` | libellés discrets (plus clair autorisé pour du texte) |
| `--t4` | `#C2C2C2` | décoratif uniquement, jamais du texte |
| `--red` | `#C8102E` | actions destructives uniquement |
| `--set-up` | `#00E676` | série validée plus lourde que la dernière fois (ou sans référence) : vert néon |
| `--set-same` | `#FF9F0A` | série au même poids que la dernière fois : orange |
| `--set-down` | `#FF3B30` | série moins lourde que la dernière fois : rouge |

Seule exception au noir et blanc, voulue par Julien : le retour de progression sur les séries. Pendant la saisie, le contour du champ poids prend la couleur ; à la validation, la carte de série se teinte et le ✓ se remplit.

Pas de couleur par groupe musculaire dans l'interface. Pour les graphiques à plusieurs séries, les groupes utilisent des gris : Push `#0A0A0A`, Pull `#6E6E6E`, Legs `#ABABAB`.

## Typographie

Police système d'Apple (SF Pro) via `-apple-system`, repli Helvetica Neue / system-ui. Une seule famille.

- Titre de vue : 28 px, 700, -0.03em
- Titre de section (`.sect-lbl`) : 15 px, 600, casse normale
- Corps : 15 px, 400 ; libellés de champ : 12 px, 500, `--t2`
- Chiffres : 600, chiffres tabulaires
- Jamais de capitales espacées en intertitre.

## Composants

- **Barre d'onglets** : pilule noire flottante (58 px, rayon plein), 4 icônes blanches sans libellé ; une capsule translucide sous l'onglet actif, qui grossit et suit le doigt quand on glisse sur la barre (comme Apple Music) — on change d'onglet en relâchant. Onglets : Accueil, Séance, Corps, Progrès. Le profil s'ouvre par la pastille ronde en haut de l'accueil.
- **En-tête de vue** (`viewHead`) : grand titre à gauche, sur-titre facultatif (date), actions à droite. Plus de barre du haut.
- **Pastilles** (`.chip`, `.tab-btn`, `.period-btn`) : rayon plein, 36 px ; inactive blanche avec contour fin, active noire texte blanc.
- **Cartes** (`.card`) : blanches, rayon 18 px, ombre `--sh-2`, sans bordure. `.card-dark` pour le bloc principal d'un écran (fond noir, bouton blanc).
- **Boutons** : 50 px, rayon 14 px, 15 px 600. Principal noir, secondaire gris clair, blanc sur fond noir.
- **Champs** : fond `--surface2`, rayon 12 px, contour noir au focus.
- **Feuilles modales** : blanches, montent du bas, coins 28 px en haut.
- **Toast** : pilule noire, texte blanc.

## Illustrations d'exercices

- **Source** : illustrations 3D animées fournies par Julien (dossier « GIF EXO »), muscle travaillé en rouge sur fond blanc.
- **Fichiers** : `img/exos/<slug>.mp4` (animation en boucle, 440 px, H.264 ~40 Ko) et `img/exos/<slug>.jpg` (première image, nette, 300 px) pour les vignettes. Les GIF d'origine (75 Mo) ne sont pas embarqués.
- Chaque exercice de `WORKOUT_PLAN` porte son `img` ; `EXO_MEDIA` fait le lien nom → fichier (anciens noms compris, pour l'historique).
- **Vignettes** blanches avec liseré (`.th`) ; l'animation ne tourne que sur l'exercice ouvert (une seule vidéo à la fois). `mix-blend-mode: multiply` efface l'écart entre le blanc vidéo et le blanc de la carte.
- **Bandeau de l'accueil** : `img/hero/<slug>.jpg`, illustration du 1er exercice de la séance détourée sur `#0A0A0A` (Vision macOS, `tools/cutout.swift`).
- **Ajouter un exercice** : convertir le GIF (`ffmpeg`, fond blanc, 440 px, première image pour la vignette — les images intermédiaires des GIF sont des fondus), ajouter l'entrée dans `WORKOUT_PLAN` avec son `img`.

## Écrans clés

- **Accueil** : salutation + pastille profil, titre en deux tons (« Ta séance du jour, / Push 1. »), bandeau des 7 jours (jour actif noir, point sous les jours avec activité), bloc noir de la séance proposée (photo à droite, bouton blanc Démarrer/Reprendre), carte Corps (poids), Cette semaine (les 6 séances), Récent, Note du jour.
- **Accueil · Récupération** : carte sous le bloc de séance, carrousel glissable d'un muscle à l'autre (muscles de la prochaine séance d'abord, puis du plus fatigué au plus frais) : nom, jauge en arc de 240°, %, état « Rétabli » (≥ 90 %, vert) / « En récupération » (60-89 %, orange) / « Fatigué » (rouge), « Prêt dans ~x h » ; points de pagination, phrase de synthèse pour la prochaine séance. Mêmes trois couleurs que les séries.
- **Séance (muscu)** : la barre d'onglets est remplacée par la **barre de séance** (même pilule noire) : chrono + progression + Terminer, ou repos (anneau, Passer, +30 s). En haut, la **progression de la séance** en % (séries validées / prévues), collée en haut pendant le défilement, verte à 100 % ; le % est repris dans la barre du bas. Une carte par exercice (illustration, nom, séries, barre de progression) ; seul l'exercice en cours est déplié avec ses cartes de séries. Le ✓ valide la série (reprend la valeur grise proposée si le champ est vide) et lance le repos de l'exercice ; l'exercice terminé se replie et le suivant s'ouvre. Sur l'exercice ouvert, « Changer » ouvre une feuille : « Faire plus tard » (passe en fin de séance, séries saisies conservées) ou un remplaçant du même muscle (illustration + dernière perf) ; valable pour la séance en cours, gardé dans le brouillon, pastille « Remplaçant ». Au ✓, une série qui bat le meilleur 1RM estimé enregistré prend le badge « 🏆 Record » (pas la toute première fois sur un exercice). « Terminer » ouvre le bilan : volume vs dernière fois, durée, séries validées, barre vert/orange/rouge, records, semaine et prochaine séance. En bas de la liste, « Annuler la séance » (rouge, visible une fois la séance commencée) ouvre une confirmation : Annuler la séance / Continuer la séance.

- **Progrès · Évolution** (onglet par défaut) : sélecteur de muscle (10 pastilles qui passent à la ligne), carte avec sélecteur de période (8 sem. / 12 sem. / 6 mois), deux indicateurs (volume des 4 dernières semaines vs les 4 précédentes, force), graphique Chart.js barres + courbe (barres grises, semaine en cours en noir ; courbe noire à points blancs), puis 1RM estimé par exercice et liste « Tous les muscles » avec mini-courbes. Pastilles d'écart `.dpill` : vert (hausse), rouge (baisse), gris (stable).
  - Volume = tonnage hebdo (poids × reps). Tractions et dips : poids de corps (dernière pesée) + lest. Abdos : en répétitions.
  - Force = indice : 1RM estimé (Epley) de chaque exercice vs ta 1re fois sur cet exercice, moyenné par semaine — comparable malgré l'alternance A/B.

## Mouvement

Transitions de 140 à 200 ms, courbe `cubic-bezier(0.16, 1, 0.3, 1)`, sans rebond. Pas d'animation d'entrée en cascade. `prefers-reduced-motion` coupe les animations.

## Mise en page

Mobile d'abord, partout (audité sans débordement de 320 à 1280 px, portrait et paysage) : contenu centré, largeur max 560 px (`--content-w`), marges latérales 16 px minimum. Le bas du contenu garde la place de la barre d'onglets flottante (`--nav-h`).
