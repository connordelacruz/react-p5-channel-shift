import { Typography } from '@mui/material'
import * as Constants from '../Constants'

/**
 * Stylized label for RGB channel.
 *
 * @param channelOffset
 * @return {JSX.Element}
 * @constructor
 */
export const ChannelLabel = ({channelOffset}) => {
  return (
    <Typography
      variant="button"
      sx={ { color: `${ Constants.CHANNEL_MUI_COLORS[channelOffset] }.main` } }
    >
      { Constants.CHANNEL_DISPLAY_NAMES[channelOffset] }
    </Typography>
  )
}