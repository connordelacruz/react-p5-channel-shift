import { Box, Typography } from '@mui/material'
import { SwapHoriz } from '@mui/icons-material'
import React from 'react'

/**
 * App bar logo component.
 *
 * @param textFontSize (Default: 'medium') fontSize prop value for logo text.
 * @param iconFontSize (Default: 'medium') fontSize prop value for logo icon.
 * @param center (Default: false) If true, center logo within the container.
 * @return {Element}
 * @constructor
 */
export const ChannelShiftLogo = ({
                                   textFontSize = 'medium',
                                   iconFontSize = 'medium',
                                   center = false,
                                 }) => {
  return (
    <Box
      component="div"
      sx={ {
        display: 'flex',
        alignItems: 'center',
        justifyContent: center ? 'center' : 'initial',
        flexGrow: 1,
        fontWeight: 'bold',
      } }
    >
      <Typography
        variant="button"
        fontSize={ textFontSize }
        sx={ { fontWeight: 'bold' } }
        color="info.main"
      >
        Channel
      </Typography>
      <SwapHoriz
        fontSize={ iconFontSize }
        sx={ { mx: 0.5 } }
        color="warning"
      />
      <Typography
        variant="button"
        fontSize={ textFontSize }
        sx={ { fontWeight: 'bold' } }
        color="secondary"
      >
        Shift
      </Typography>
    </Box>
  )
}