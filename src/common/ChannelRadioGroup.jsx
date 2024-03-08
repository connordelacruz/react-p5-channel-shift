import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import * as Constants from '../Constants'
import React from 'react'
import { ChannelLabel } from './ChannelLabel'

// TODO: I guess this can be moved back to the swap component file

/**
 * RGB channel radio component.
 *
 * @param channelOffset
 * @return {Element}
 * @constructor
 */
const ChannelRadio = ({ channelOffset }) => {
  return (
    <FormControlLabel
      value={ channelOffset }
      label={ <ChannelLabel channelOffset={channelOffset} /> }
      control={ <Radio color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }/> }
      sx={ { color: `${ Constants.CHANNEL_MUI_COLORS[channelOffset] }.main` } }
    />
  )
}

/**
 * RGB channel radio group component.
 *
 * @param labelText
 * @param labelId
 * @param radioGroupName
 * @param selectedChannelOffsetState
 * @param stateSetterFunction
 * @return {Element}
 * @constructor
 */
export const ChannelRadioGroup = ({
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