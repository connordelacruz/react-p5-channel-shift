import { FormLabel, Grid, Paper } from '@mui/material'
import React from 'react'
import { ChannelRadioGroup } from './common/ChannelRadioGroup'

// ================================================================================
// Swap Channels Tool UI
// ================================================================================

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
                                     sourceChannel, setSourceChannel,
                                     targetChannel, setTargetChannel
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
      <Grid container justifyContent="center" spacing={ 2 }>
        <Grid item xs={ 6 }>
          <Paper
            sx={ { p: 2 } }
            variant="outlined"
          >
            <ChannelRadioGroup
              labelText="Source Channel" labelId="source-channel-label"
              radioGroupName="source-channel-radio-group"
              selectedChannelOffsetState={ sourceChannel }
              stateSetterFunction={ setSourceChannel }
            />
          </Paper>
        </Grid>
        <Grid item xs={ 6 }>
          <Paper
            sx={ { p: 2 } }
            variant="outlined"
          >
            <ChannelRadioGroup
              labelText="Target Channel" labelId="target-channel-label"
              radioGroupName="target-channel-radio-group"
              selectedChannelOffsetState={ targetChannel }
              stateSetterFunction={ setTargetChannel }
            />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  )
}