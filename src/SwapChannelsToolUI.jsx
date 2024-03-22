import { Box, Button, ButtonGroup, Paper, Stack } from '@mui/material'
import React from 'react'
import * as Constants from './Constants'
import { SwapHoriz } from '@mui/icons-material'

// ================================================================================
// Swap Channels Tool UI
// ================================================================================

/**
 * Channel select button component.
 *
 * @param channelOffset
 * @param selected
 * @param stateSetterFunction
 * @return {Element}
 * @constructor
 */
const ChannelSelectButton = ({
                               channelOffset,
                               selected,
                               stateSetterFunction
                             }) => {
  return (
    <Button
      onClick={ () => {
        stateSetterFunction(channelOffset)
      } }
      variant={ selected ? 'contained' : 'outlined' }
      color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }
      size="large"
      disableElevation
    >
      { Constants.CHANNEL_DISPLAY_NAMES[channelOffset] }
    </Button>
  )
}

/**
 * RGB channel select button group component.
 *
 * @param selectedChannelOffsetState
 * @param stateSetterFunction
 * @return {Element}
 * @constructor
 */
const ChannelSelectButtonGroup = ({
                                    selectedChannelOffsetState,
                                    stateSetterFunction
                                  }) => {
  // Button elements
  const channelButtons = Constants.CHANNEL_OFFSETS.map((channelOffset) =>
    <ChannelSelectButton
      key={ channelOffset.toString() }
      channelOffset={ channelOffset }
      selected={ selectedChannelOffsetState === channelOffset }
      stateSetterFunction={ stateSetterFunction }
    />
  )

  return (
    <ButtonGroup
      orientation="vertical"
      fullWidth
    >
      { channelButtons }
    </ButtonGroup>
  )
}

/**
 * Channel select buttons with container.
 *
 * @param selectedChannelOffsetState
 * @param stateSetterFunction
 * @return {Element}
 * @constructor
 */
const ChannelSwapSelect = ({ selectedChannelOffsetState, stateSetterFunction }) => {
  return (
    <Box
      sx={ {
        p: 2,
        width: '45%'
      } }
    >
      <ChannelSelectButtonGroup
        selectedChannelOffsetState={ selectedChannelOffsetState }
        stateSetterFunction={ stateSetterFunction }
      />
    </Box>
  )
}

/**
 * Swap channels tool UI component.
 *
 * @param sourceChannel
 * @param setSourceChannel
 * @param targetChannel
 * @param setTargetChannel
 * @return {Element}
 * @constructor
 */
export const SwapChannelsToolUI = ({
                                     // State props
                                     sourceChannel,
                                     targetChannel,
                                     // State setter functions
                                     setSourceChannel,
                                     setTargetChannel
                                   }) => {
  return (
    <Paper
      sx={ { p: 2 } }
      variant="outlined"
    >
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={ 0 }
      >
        <ChannelSwapSelect
          selectedChannelOffsetState={ sourceChannel }
          stateSetterFunction={ setSourceChannel }
        />

        <SwapHoriz/>

        <ChannelSwapSelect
          selectedChannelOffsetState={ targetChannel }
          stateSetterFunction={ setTargetChannel }
        />
      </Stack>
    </Paper>
  )
}