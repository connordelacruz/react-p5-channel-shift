import { Button, ButtonGroup, FormLabel, Paper, Stack } from '@mui/material'
import React from 'react'
import * as Constants from './Constants'
import { SwapHorizontalCircle } from '@mui/icons-material'

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
      <FormLabel
        sx={ {
          display: 'block',
          mb: 2,
        } }
      >
        Select channels to swap:
      </FormLabel>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={ 0 }
      >
        <Paper
          sx={ {
            p: 2,
            width: '45%'
          } }
          variant="outlined"
        >
          <FormLabel>
            Source Channel:
          </FormLabel>
          <ChannelSelectButtonGroup
            selectedChannelOffsetState={ sourceChannel }
            stateSetterFunction={ setSourceChannel }
          />
        </Paper>

        <SwapHorizontalCircle/>

        <Paper
          sx={ {
            p: 2,
            width: '45%'
          } }
          variant="outlined"
        >
          <FormLabel>
            Target Channel:
          </FormLabel>
          <ChannelSelectButtonGroup
            selectedChannelOffsetState={ targetChannel }
            stateSetterFunction={ setTargetChannel }
          />
        </Paper>
      </Stack>
    </Paper>
  )
}