# How to add photos (no coding needed)

Every photo spot on the site is a labeled grey box. Each box shows the exact
file name it is waiting for, for example `assets/img/home-hero.jpg`. When you
add a photo with that exact name to the `assets/img` folder, it appears on the
site automatically. If a photo is missing, the labeled box just shows instead,
so the site never looks broken.

## The simple steps

1. Get your photo ready as a `.jpg` file. Landscape (wide) works best for event
   and home photos. Square works best for people photos.
2. Rename the file to match the name shown on the box you want to fill. The name
   must match exactly, all lowercase, with dashes, ending in `.jpg`.
3. On GitHub, open the `assets/img` folder, click **Add file -> Upload files**,
   drag your renamed photo in, and commit. (Or upload several at once.)
4. Refresh the site. The photo is now there.

Tip: keep photos reasonably sized (around 1600 pixels wide is plenty) so the
site loads fast.

## The full list of photo names

### Home (`index.html`)
- `home-hero.jpg` ......... main photo at the top
- `home-1.jpg` ............ "Volunteers in action"
- `home-2.jpg` ............ "A multilingual event"
- `home-3.jpg` ............ "Our team together"

### Our Work (`our-work.html`), one per event
- `event-st-clements.jpg`
- `event-new-sanctuary.jpg`
- `event-jasa.jpg`
- `event-st-peters.jpg`
- `event-moca.jpg`
- `event-mintbox.jpg`
- `event-kidsknowrights.jpg`

### Get Involved (`get-involved.html`)
- `get-involved.jpg` ...... photo next to the three steps

### Our People (`our-people.html`), one per person
Leadership:
- `person-nicolas-gutierrez.jpg`
- `person-shane-davidoff.jpg`
- `person-grey-egeth.jpg`
- `person-eva-alavez.jpg`

Members:
- `person-luca-grimeh.jpg`
- `person-noah-memmi.jpg`
- `person-ian-massaro.jpg`
- `person-dylan-boester.jpg`
- `person-shaw-mcgrath.jpg`
- `person-raunak-sondhi.jpg`
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

## Adding a new event or person later

If you add a brand new event or member that is not in the list above, that one
needs a small edit to the HTML to create its box. Tell me the name and I will
add the slot, or copy an existing block in the HTML file and change the name and
file name to match.
