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

## The full list of photo names

There are 44 photo spots. You do not need to fill them all at once. Add the ones
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
One per event:
- `event-st-clements.jpg`
- `event-new-sanctuary.jpg`
- `event-jasa.jpg`
- `event-st-peters.jpg`
- `event-moca.jpg`
- `event-mintbox.jpg`
- `event-kidsknowrights.jpg`

### Get Involved (`get-involved.html`)
- `get-involved-banner.jpg` .. full-width banner at the top
- `get-involved.jpg` ......... photo next to the three steps

### Our People (`our-people.html`)
- `people-banner.jpg` ........ full-width banner at the top

Leadership:
- `person-nicolas-gutierrez.jpg`
- `person-shane-davidoff.jpg`
- `person-noah-memmi.jpg`
- `person-raunak-sondhi.jpg`
- `person-grey-egeth.jpg`
- `person-eva-alavez.jpg`

Members:
- `person-luca-grimeh.jpg`
- `person-ian-massaro.jpg`
- `person-dylan-boester.jpg`
- `person-shaw-mcgrath.jpg`
- `person-oliver-carbery.jpg`
- `person-khoren-andrews.jpg`
- `person-maxfield-pillimer.jpg`
- `person-john-stavropolous.jpg`
- `person-alec-stavropolous.jpg`
- `person-perk-tracy.jpg`
- `person-miles-devine.jpg`
- `person-grey-zittman.jpg`
- `person-alexandra-dell.jpg`
- `person-james-yang.jpg`
- `person-stefan-goldberg.jpg`
- `person-henry-amberg.jpg`
- `person-sam-weinstein.jpg`
- `person-joao-pedro-de-brito.jpg`
- `person-lucas-goldberg.jpg`
- `person-lukas-grimminger.jpg`

## Adding a new event or person later

If you add a brand new event or member that is not in the list above, that one
needs a small edit to the HTML to create its box. Tell me the name and I will
add the slot, or copy an existing block in the HTML file and change the name and
file name to match.
