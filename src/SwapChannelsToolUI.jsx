import { FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup } from '@mui/material'
import * as Constants from './Constants'
import React from 'react'

// ================================================================================
// Swap Channels Tool UI
// ================================================================================
// TODO: cleanup code, make comments consistent

// Channel Swap Radio Component
const ChannelRadio = ({ channelOffset }) => {
  return (
    <FormControlLabel
      value={ channelOffset }
      label={ Constants.CHANNEL_DISPLAY_NAMES[channelOffset] }
      control={ <Radio color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }/> }
      sx={ { color: `${ Constants.CHANNEL_MUI_COLORS[channelOffset] }.main` } }
    />
  )
}

// RGB Channel Radios Component
const ChannelRadioGroup = ({
                             labelText, labelId, radioGroupName,
                             selectedChannelOffsetState, stateSetterFunction
                           }) => {
  // Radio elements
  const channelRadios = Constants.CHANNEL_OFFSETS.map((channelOffset) =>
    <ChannelRadio
      key={ channelOffset.toString() }
      channelOffset={ channelOffset }
    />
  )

  // Radio group on change listener
  const channelRadioOnChange = (event) => {
    stateSetterFunction(event.target.value)
  }

  return (
    <FormControl>
      <FormLabel
        id={ labelId }
        color={ Constants.CHANNEL_MUI_COLORS[selectedChannelOffsetState] }
      >
        { labelText }:
      </FormLabel>
      <RadioGroup
        value={ selectedChannelOffsetState }
        onChange={ channelRadioOnChange }
        aria-labelledby={ labelId }
        name={ radioGroupName }
      >
        { channelRadios }
      </RadioGroup>
    </FormControl>
  )
}

// Swap Channels Tool UI Component
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