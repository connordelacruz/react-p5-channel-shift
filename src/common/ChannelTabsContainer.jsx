import { Box, Button, ButtonGroup, Paper } from '@mui/material'
import * as Constants from '../Constants'
import { ToolUIContainer } from './ToolUIContainer'

/**
 * Component for channel select buttons.
 *
 * @param channelOffset
 * @param selectedChannelState
 * @param setSelectedChannelState
 * @param channelWasModifiedFunction
 * @return {JSX.Element}
 * @constructor
 */
const ChannelTabButton = ({
                            channelOffset,
                            // State/setter props
                            selectedChannelState,
                            setSelectedChannelState,
                            // Function props
                            channelWasModifiedFunction = (channelOffset) => false,
                          }) => {
  return (
    <Button
      variant={
        parseInt(selectedChannelState) === channelOffset ? 'contained' : 'outlined'
      }
      onClick={ () => {
        setSelectedChannelState(channelOffset)
      } }
      color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }
      size="large"
    >
      { Constants.CHANNEL_DISPLAY_NAMES[channelOffset] }{ channelWasModifiedFunction(channelOffset) ? ' *' : '' }
    </Button>
  )
}

/**
 * Container with Red/Green/Blue tab buttons.
 *
 * @param selectedChannelState
 * @param setSelectedChannelState
 * @param channelWasModifiedFunction
 * @param children
 * @return {JSX.Element}
 * @constructor
 */
export const ChannelTabsContainer = ({
                                       selectedChannelState,
                                       setSelectedChannelState,
                                       channelWasModifiedFunction = (channelOffset) => false,
                                       children
                                     }) => {
  // Tab button components
  const channelButtons = Constants.CHANNEL_OFFSETS.map((channelOffset) =>
    <ChannelTabButton
      key={ channelOffset.toString() }
      channelOffset={ channelOffset }
      selectedChannelState={ selectedChannelState }
      setSelectedChannelState={ setSelectedChannelState }
      channelWasModifiedFunction={ channelWasModifiedFunction }
    />
  )

  return (
    <ToolUIContainer>
      {/*Channel tab select buttons*/ }
      <Box>
        <ButtonGroup
          orientation="horizontal"
          fullWidth
          sx={ {
            // Remove curve from bottom corners so it lines up flush with container
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            '& .MuiButtonGroup-firstButton': {
              borderBottomLeftRadius: 0,
            },
            '& .MuiButtonGroup-lastButton': {
              borderBottomRightRadius: 0,
            },
            // Remove bottom border of unselected tabs so container is outlined exclusively by the selected color
            '& .MuiButton-outlined': {
              borderBottomWidth: 0,
              '&:hover': {
                borderBottomWidth: 0,
              }
            }
          } }
        >
          { channelButtons }
        </ButtonGroup>
      </Box>
      {/*Tab content container*/ }
      <Paper
        variant="outlined"
        sx={ {
          borderWidth: 1.5,
          p: 2,
          // Match border color with selected channel
          borderColor: Constants.CHANNEL_MUI_COLORS[selectedChannelState] + '.main',
          // Remove curve from top corners so it lines up flush with tabs
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
        } }
      >
        { children }
      </Paper>
    </ToolUIContainer>
  )
}