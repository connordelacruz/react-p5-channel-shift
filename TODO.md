# Do before (real) beta

## Help Text?

Maybe use a landing page? not a lot of space in the app bar..

- Thoughtful concise writing (see text sent to friends as a base)
- Screenshots and gifs
  - Can these be lazy loaded?
  - Use RGB venn diagram from wikipedia as a sample image

## Optimization

- Smarter handling of props with things like useEffect():
    * https://github.com/P5-wrapper/react?tab=readme-ov-file#reacting-to-props
- Maybe material UI is the problem:
    * https://dev.to/gaelferrand/why-you-should-not-use-material-ui-21nn
    * Might get free performance bumps by replacing `<Box>` with `<div>` and any unnecessary `<Typography>` elements

## Sample Gallery!

(Maybe on another page or something so images don't bog down load time of app)

https://mui.com/material-ui/react-image-list/

## Widescreen UI

- Maybe figure out how to put controls on the left and preview on the right in wide views?
- Scale down snackbar and app bar (also helps with mobile)

## Mobile UI

- Scale preview image better, it takes up too much space on mobile
- Slider accessibility?

## Quality of Life

- Drag n drop file upload
  - https://www.npmjs.com/package/react-drag-drop-files
- Keyboard shortcuts?
  - 'R' to randomize
  - 'S' to save
- Loading screen?

--------------------------------------------------------------------------------

# Nice to haves

## Favicon

Figure out some design software you can use

--------------------------------------------------------------------------------

# Future big features

## Experimental/Advanced filters (or however you wanna phrase it)

Try to port over some of the cooler advanced shift types from your Processing version

## State history / undo

Figure out a way to roll back, maybe exclude recursion and just do for changes to the current step

## Preview card size

Some ideas for allowing resizing:

- Probably easy: Add a "Theater Mode" toggle:
  * When off, determine canvas height by 50% the window height
  * When on, determine canvas height by 100% the window width
  * Bonus: Add easing into that size, use frame count to animate
- Probably harder: drag bottom of card to resize

## Settings?

Ideas:

- Maybe add an option to increase pixel density of preview at cost of performance

Also, maybe implement local storage for state of these settings so they aren't lost on reload
