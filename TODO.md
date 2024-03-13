# Do before beta

## URGENT: Test on weaker hardware!!

If it can't be run in-browser on a mid-range laptop then what's even the point??

Maybe performance is better when running locally?

Maybe see about packaging it as an Electron app and see if performance is better?


## UI

### Sliders

- Make labels near slider non-selectable to avoid accidental highlighting
- Add text input
- Icons for horizontal/vertical

### Tabs

- Figure out how to make it more obvious that these are tabs


## Quality of life

### README

How to install and what it does and all that

### Mobile warning message

If you can't get it to play nice on mobile, show a fullscreen warning modal when being accessed from a mobile browser

### Help message

- Thoughtful concise writing
- Screenshots and gifs


--------------------------------------------------------------------------------

# Nice to haves

## Preview card size

Some ideas for allowing resizing:

- Probably easy: Add a "Theater Mode" toggle:
    * When off, determine canvas height by 50% the window height
    * When on, determine canvas height by 100% the window width
    * Bonus: Add easing into that size, use frame count to animate
- Probably harder: drag bottom of card to resize


--------------------------------------------------------------------------------

# Future big features

## Experimental/Advanced filters (or however you wanna phrase it)

Try to port over some of the cooler advanced shift types from your Processing version

