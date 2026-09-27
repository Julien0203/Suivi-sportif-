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

- **Barre d'onglets** : pilule noire en verre (noir 82 % + flou 22 px + saturation, liseré clair), 58 px, 4 icônes blanches sans libellé ; une bulle « liquid glass » (dégradé clair + reflet) sous l'onglet actif. Au doigt, elle grossit, suit le doigt image par image (requestAnimationFrame) et s'étire selon la vitesse ; au relâché, elle se pose sur l'onglet avec un léger rebond (transition CSS sur le compositeur) et la vue se rend à l'image suivante. Toujours visible, séance comprise.
- **Voiles** : le contenu qui défile s'efface en dégradé blanc sous la barre du bas, et un aplat couvre la barre d'état — pas de texte « coupé » derrière les éléments flottants. Onglets : Accueil, Séance, Corps, Progrès. Le profil s'ouvre par la pastille ronde en haut de l'accueil.
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
- **Accueil · Séries cette semaine** : mini-onglets Push / Pull / Legs (contrôle segmenté gris, onglet actif noir ; point orange si un muscle de la famille est sous 10 ; abdos rangés dans Legs ; ouvert par défaut sur la famille de la prochaine séance), puis une ligne par muscle (nom, barre, « faites/prévues », état). Barre : faites en noir, prévues hachurées gris, zone 10-20 en vert pâle avec deux repères blancs. État : « Dans la zone » (vert), « Trop peu » (orange), « Beaucoup » (gris). Toucher une ligne ouvre Progrès · Évolution sur ce muscle.
- **Séance (muscu)** : la **barre de séance** (même verre noir, 56 px) flotte juste au-dessus de la barre d'onglets, comme un mini-lecteur : chrono + progression + Terminer, ou repos (anneau, Passer, +30 s). Changer d'onglet pendant la séance garde les saisies (brouillon) et le chrono. En haut, la **progression de la séance** en % (séries validées / prévues), collée en haut pendant le défilement, verte à 100 % ; le % est repris dans la barre du bas. Une carte par exercice (illustration, nom, séries, barre de progression) ; seul l'exercice en cours est déplié avec ses cartes de séries. Le ✓ valide la série (reprend la valeur grise proposée si le champ est vide) et lance le repos de l'exercice ; l'exercice terminé se replie et le suivant s'ouvre. Sur l'exercice ouvert, « Changer » ouvre une feuille : « Faire plus tard » (passe en fin de séance, séries saisies conservées) ou un remplaçant du même muscle (illustration + dernière perf) ; valable pour la séance en cours, gardé dans le brouillon, pastille « Remplaçant ». Au ✓, une série qui bat le meilleur 1RM estimé enregistré prend le badge « 🏆 Record » (pas la toute première fois sur un exercice). Exercice terminé : une ligne « Ressenti » avec trois pastilles Échec / Modéré / Facile (contour fin ; choisie = teinte rouge / orange / vert des séries, 2e appui pour retirer), visible même carte repliée ; le ressenti s'affiche ensuite dans « Dernière fois » et ajuste la pastille de charge (« +2,5 kg conseillé · facile » ou « Même charge · échec la dernière fois »). « Terminer » ouvre le bilan : volume vs dernière fois, durée, séries validées, barre vert/orange/rouge, records, semaine et prochaine séance. En bas de la liste, « Annuler la séance » (rouge, visible une fois la séance commencée) ouvre une confirmation : Annuler la séance / Continuer la séance.

- **Bilan hebdomadaire** : le dimanche, carte blanche sous le bandeau des jours (période, verdict en une phrase, tuiles Séances / Volume / Records, bouton noir « Voir le bilan complet »). Le bilan complet est une feuille : flèches ‹ › pour changer de semaine, tuiles, séances faites (pastilles noires, manquées en blanc), barre de progression vert/orange/rouge, records, séries par muscle (pastilles avec point vert/orange/gris), ressenti, poids, « Pour la semaine prochaine » (3 conseils). Accès permanent par « Bilans de la semaine » en haut de Progrès · Bilan.
- **Progrès · Bilan** (ex-Stats, le Kiviat est supprimé) : sélecteur 1 mois / 3 mois / 6 mois ; bloc noir avec une phrase de verdict (force en hausse/stable/en baisse + régularité) et trois tuiles (séances faites / possibles, force = médiane de l'évolution du 1RM estimé par exercice, records) ; Régularité (une barre par semaine, noire à 6/6, semaine en cours cerclée) ; Ce qui progresse (top 5 exercices, mini-courbe + pastille en kg) ; À surveiller (en baisse ≥ 3 % ou 3 séances sans record) ; Derniers records ; Volume soulevé (barres + moyenne en pointillés) ; En chiffres. Toucher un exercice ouvre l'Évolution de son muscle.
- **Progrès · Évolution** (onglet par défaut) : sélecteur de muscle en deux niveaux — famille Push / Pull / Legs (contrôle segmenté, comme sur l'accueil) puis les muscles de la famille en onglets soulignés —, carte avec sélecteur de période (8 sem. / 12 sem. / 6 mois), deux indicateurs (volume des 4 dernières semaines vs les 4 précédentes, force), graphique Chart.js barres + courbe (barres grises, semaine en cours en noir ; courbe noire à points blancs), puis 1RM estimé par exercice et liste « Tous les muscles » avec mini-courbes. Pastilles d'écart `.dpill` : vert (hausse), rouge (baisse), gris (stable).
  - Volume = tonnage hebdo (poids × reps). Tractions et dips : poids de corps (dernière pesée) + lest. Abdos : en répétitions.
  - Force = indice : 1RM estimé (Epley) de chaque exercice vs ta 1re fois sur cet exercice, moyenné par semaine — comparable malgré l'alternance A/B.

## Mouvement

Transitions de 140 à 200 ms, courbe `cubic-bezier(0.16, 1, 0.3, 1)`, sans rebond. Pas d'animation d'entrée en cascade. `prefers-reduced-motion` coupe les animations.

## Mise en page

Mobile d'abord, partout (audité sans débordement de 320 à 1280 px, portrait et paysage) : contenu centré, largeur max 560 px (`--content-w`), marges latérales 16 px minimum. Le bas du contenu garde la place de la barre d'onglets flottante (`--nav-h`).
