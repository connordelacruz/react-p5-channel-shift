# Do before beta

## Misc

- Use Chicago skyline photo as default image
- Color/branding pass
  - Figure out how to get custom colors working nicely

## Better laptop layout

- Maybe figure out how to put controls on the left and preview on the right in wide views?
- Scale down snackbar and app bar (also helps with mobile)

## It works on mobile now! Make UI more responsive

- Scale preview image better, it takes up too much space on mobile
- Slider accessibility?
- scrollable tabs?
- Re-work randomization options tables to fit better??
- Better app bar scaling
    * hide text on save/load?

## Help message

- Thoughtful concise writing
- Screenshots and gifs

## Quality of Life

- Drag n drop file upload
  - https://www.npmjs.com/package/react-drag-drop-files
- Keyboard shortcuts?
  - 'R' to randomize
  - 'S' to save


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

## State history / undo

Figure out a way to roll back, maybe exclude recursion and just do for changes to the current step