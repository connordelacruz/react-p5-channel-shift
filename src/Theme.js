import { createTheme } from '@mui/material'
import { blueGrey, grey, pink, teal } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    // Non-color channel UI colors
    secondary: {
      main: teal[500]
    },
    info: {
      main: pink[500]
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