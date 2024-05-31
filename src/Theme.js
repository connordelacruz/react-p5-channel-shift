import { createTheme } from '@mui/material'
import { blue, blueGrey, grey, pink, teal } from '@mui/material/colors'

export const theme = createTheme({
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
  }
})