import { createTheme } from '@mui/material'
import { blue, blueGrey, grey, pink, teal } from '@mui/material/colors'

export const theme = createTheme({
  // Color Palette
  palette: {
    // Non-color channel UI colors
    secondary: {
      main: blue['A700']
    },
    info: {
      main: pink[500]
    },
    warning: {
      main: teal[500]
    },
    // "All channels" UI colors
    neutral: {
      main: grey[900]
    },
    // Preview image bg color
    preview: {
      bg: blueGrey[900]
    },
  },

  // Component Props
  components: {
    // Base Button Component
    MuiButtonBase: {
      defaultProps: {
        // Disable ripple effect everywhere
        disableRipple: true,
      }
    },
    // Button Groups
    MuiButtonGroup: {
      defaultProps: {
        // Disable ripple effect everywhere
        // (For some reason button groups aren't covered by MuiButtonBase)
        disableRipple: true,
      }
    }
  }
})