import { Box } from '@mui/material'

/**
 * Simple Box component with breakpoint-based padding.
 *
 * @param children
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
export const ToolUIContainer = ({ children, ...props }) => {
  return (
    <Box
      py={ 0.5 }
      px={ { xs: 0, sm: 2 } }
      { ...props }
    >
      { children }
    </Box>
  )
}