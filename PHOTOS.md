# How to add photos (no coding needed)

Every photo spot on the site is a labeled grey box. Each box shows the exact
file name it is waiting for, for example `assets/img/home-hero.jpg`. When you
add a photo with that exact name to the `assets/img` folder, it appears on the
site automatically. If a photo is missing, the labeled box just shows instead,
so the site never looks broken.

## The simple steps

1. Get your photo ready as a `.jpg` file.
   - Banner photos: wide / landscape (they span the full width).
   - Gallery and event photos: landscape works best.
   - People photos: square works best (they show in a square frame).
2. Rename the file to match the name shown on the box you want to fill. The name
   must match exactly: all lowercase, dashes between words, ending in `.jpg`.
3. On GitHub, open the `assets/img` folder, click **Add file -> Upload files**,
   drag your renamed photo in, and commit. You can upload many at once.
4. Refresh the site. The photo is now there.

Tip: keep photos a reasonable size (around 1600 pixels wide is plenty) so the
site loads fast.

## Sliding photos (several photos in one spot)

Some spots are now **sliders**: a single frame that slides through several
photos with arrows, dots, and a gentle auto-advance. Each photo in a slider has
its own file name following a simple pattern: the base name, then the same name
with `1`, `2`, `3`, and so on added before `.jpg`. For example, St. Clement's
holds nine photos:

```
event-st-clements.jpg    (1st photo)
event-st-clements1.jpg   (2nd photo)
event-st-clements2.jpg   (3rd photo)
   ...up to...
event-st-clements8.jpg   (9th photo)
```

Add as many or as few as you like. Any photo you have not uploaded yet just
shows its labeled grey box inside the slider, so nothing ever looks broken. To
add even more later, keep counting up (`...9.jpg`, `...10.jpg`) and tell me so I
can open up the extra slots.

## The full list of photo names

There are 79 photo spots. You do not need to fill them all at once. Add the ones
you have, and the rest stay as labeled placeholders until you do.

### Home (`index.html`)
- `home-hero.jpg` ............ full-width banner at the top
Scrollable gallery (the "In the community" row):
- `home-gallery-1.jpg`
- `home-gallery-2.jpg`
- `home-gallery-3.jpg`
- `home-gallery-4.jpg`
- `home-gallery-5.jpg`
- `home-gallery-6.jpg`

### Our Work (`our-work.html`)
- `work-banner.jpg` .......... full-width banner at the top

Each event is a slider (see "Sliding photos" above). The numbered names below
are the photos it slides through:

- St. Clement's Food Pantry (9): `event-st-clements.jpg`, `event-st-clements1.jpg`,
  `event-st-clements2.jpg`, `event-st-clements3.jpg`, `event-st-clements4.jpg`,
  `event-st-clements5.jpg`, `event-st-clements6.jpg`, `event-st-clements7.jpg`,
  `event-st-clements8.jpg`
- New Sanctuary Coalition (3): `event-new-sanctuary.jpg`, `event-new-sanctuary1.jpg`,
  `event-new-sanctuary2.jpg`
- JASA (5): `event-jasa.jpg`, `event-jasa1.jpg`, `event-jasa2.jpg`, `event-jasa3.jpg`,
  `event-jasa4.jpg`
- St. Peter's Church (6): `event-st-peters.jpg`, `event-st-peters1.jpg`,
  `event-st-peters2.jpg`, `event-st-peters3.jpg`, `event-st-peters4.jpg`,
  `event-st-peters5.jpg`
- MOCA (6): `event-moca.jpg`, `event-moca1.jpg`, `event-moca2.jpg`, `event-moca3.jpg`,
  `event-moca4.jpg`, `event-moca5.jpg`
- MintBox (3): `event-mintbox.jpg`, `event-mintbox1.jpg`, `event-mintbox2.jpg`
- Hudson Guild (1): `event-hudson-guild.jpg`
- Elliott-Chelsea Houses (1): `event-elliott-chelsea.jpg`
- Holy Apostles Soup Kitchen (1): `event-holy-apostles.jpg`
- KidsKnowRights (1): `kkr.jpg`
- Queens Mutual Aid (1): `qma.jpg`
- Knowledge to Power Catalysts (1): `ktpc.jpg`
- Youth Today (1): `yt.jpg`
- La Opinión (1): `lo.jpg`
- SpaceBridge / Visual Echo (1): `ve.jpg`

### Get Involved (`get-involved.html`)
- `get-involved-banner.jpg` .. full-width banner at the top

The two photos next to the three steps are a slider (2):
- `get-involved.jpg`
- `get-involved1.jpg`

### Our People (`our-people.html`)
- `people-banner.jpg` ........ full-width banner at the top

People photos are named by first name (square photos work best). Where two
people share a first name, the first letter of the last name is added.

Leadership:
- Nicolas Gutierrez ... `nicolas.jpg`
- Shane Davidoff ...... `shane.jpg`
- Noah Memmi .......... `noah.jpg`
- Raunak Sondhi ....... `raunak.jpg`
- Grey Egeth .......... `greye.jpg`
- Eva Alavez .......... `eva.jpg`

Members:
- Luca Grimeh ......... `luca.jpg`
- Ian Massaro ......... `ian.jpg`
- Dylan Boester ....... `dylan.jpg`
- Shaw McGrath ........ `shaw.jpg`
- Oliver Carbery ...... `oliver.jpg`
- Khoren Andrews ...... `khoren.jpg`
- Maxfield Pillimer ... `maxfield.jpg`
- John Stavropolous ... `john.jpg`
- Alec Stavropolous ... `alec.jpg`
- Perk Tracy .......... `perk.jpg`
- Miles Devine ........ `miles.jpg`
- Grey Zittman ........ `greyz.jpg`
- Alexandra Dell ...... `alexandra.jpg`
- James Yang .......... `james.jpg`
- Stefan Goldberg ..... `stefan.jpg`
- Henry Amberg ........ `henry.jpg`
- Sam Weinstein ....... `sam.jpg`
- Joao Pedro de Brito . `pedro.jpg`
- Lucas Goldberg ...... `lucas.jpg`
- Lukas Grimminger .... `lukas.jpg`

## Adding a new event or person later

If you add a brand new event or member that is not in the list above, that one
needs a small edit to the HTML to create its box. Tell me the name and I will
add the slot, or copy an existing block in the HTML file and change the name and
file name to match.
