// Indexes into RGB arrays + values of radio buttons
export const R_OFFSET = 0
export const G_OFFSET = 1
export const B_OFFSET = 2
// TODO: same thing for x/y coords?

// Array of above export constants, for mapping components
// TODO: use this for mapping components to reduce code reuse
export const CHANNEL_OFFSETS = [R_OFFSET, G_OFFSET, B_OFFSET]

// Display names for color channels indexed by above offsets
export const CHANNEL_DISPLAY_NAMES = []
CHANNEL_DISPLAY_NAMES[R_OFFSET] = 'Red'
CHANNEL_DISPLAY_NAMES[G_OFFSET] = 'Green'
CHANNEL_DISPLAY_NAMES[B_OFFSET] = 'Blue'

// MUI theme color names to use for color channels indexed by above offsets
export const CHANNEL_MUI_COLORS = []
CHANNEL_MUI_COLORS[R_OFFSET] = 'error'
CHANNEL_MUI_COLORS[G_OFFSET] = 'success'
CHANNEL_MUI_COLORS[B_OFFSET] = 'primary'
