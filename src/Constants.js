// ================================================================================
// Color Channel Constants
// ================================================================================
// Indexes into RGB arrays + values of radio buttons
export const R_OFFSET = 0
export const G_OFFSET = 1
export const B_OFFSET = 2
export const A_OFFSET = 3
// TODO: same thing for x/y coords?

// Array of above export constants, for mapping components
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

// ================================================================================
// UI Constants
// ================================================================================

// --------------------------------------------------------------------------------
// Tool Tabs
// --------------------------------------------------------------------------------
// Constants for tab values
export const SHIFT_TAB_VALUE = 'shift'
export const SWAP_TAB_VALUE = 'swap'
export const RANDOMIZE_TAB_VALUE = 'randomize'

// TODO: TOOL_UI_PAPER_SX / _PROPS