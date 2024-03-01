import { Box, Chip, FormLabel, Paper, Slider, Stack, Typography } from '@mui/material'
import * as Constants from './Constants'
import React from 'react'

// ================================================================================
// Shift Channels Tool UI
// ================================================================================

/**
 * Component for channel shift select chips.
 * 
 * @param channelOffset
 * @param channelShiftValues
 * @param selectedShiftChannel
 * @param setSelectedShiftChannel
 * @return {Element}
 * @constructor
 */
const ShiftChannelSelectChip = ({
                                  channelOffset,
                                  channelShiftValues,
                                  selectedShiftChannel, setSelectedShiftChannel
                                }) => {
  return (
    <Chip
      icon={ <Typography variant="button"
                         sx={ { fontWeight: 'bold' } }>{ Constants.CHANNEL_DISPLAY_NAMES[channelOffset] }</Typography> }
      label={ `x: ${ channelShiftValues[channelOffset][0] }px / y: ${ channelShiftValues[channelOffset][1] }px` }
      variant={ parseInt(selectedShiftChannel) === channelOffset ? 'filled' : 'outlined' }
      onClick={ () => {
        setSelectedShiftChannel(channelOffset)
      } }
      color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }
      aria-labelledby="selected-shift-channel-label"
    />
  )
}

// TODO: doc and implement
const ShiftChannelSlider = ({
  coordinateIndex, imageDimensionSize,
  selectedShiftChannel, channelShiftValues, setChannelShiftValue,
                            }) => {
  // For labels and ids
  const dimension = coordinateIndex === 0 ? 'x' : 'y'

  // TODO: doc, remove old
  const shiftSliderOnChangeHandler = (event, newValue) => {
    setChannelShiftValue(coordinateIndex, newValue)
  }

  // TODO: min/max text keeps getting highlighted on drag
  return (
    <Paper
      sx={ {
        p: 2,
        my: 2,
      } }
      variant="outlined"
    >
      {/*TODO https://mui.com/material-ui/react-slider/#slider-with-input-field*/ }
      <Box
        sx={ { px: 2 } }
      >
        <FormLabel id={`${dimension}-shift-slider-label`}>
          {dimension.toUpperCase()} Shift:
        </FormLabel>
        <Slider
          value={ channelShiftValues[selectedShiftChannel][coordinateIndex] }
          onChange={ shiftSliderOnChangeHandler }
          min={ 0 }
          max={ imageDimensionSize }
          valueLabelDisplay="auto"
          marks={ [
            { value: 0, label: '0px' },
            { value: imageDimensionSize, label: `${ imageDimensionSize }px` }
          ] }
          aria-labelledby={`${dimension}-shift-slider-label`}
          color={ Constants.CHANNEL_MUI_COLORS[selectedShiftChannel] }
        />
      </Box>
    </Paper>
  )
}


// TODO: doc consistently w/ others
export const ShiftChannelsToolUI = ({
                                      channelShiftValues, setChannelShiftValue,
                                      selectedShiftChannel, setSelectedShiftChannel,
                                      imageWidth, imageHeight
                                    }) => {

  // Channel selection chips
  const channelChips = Constants.CHANNEL_OFFSETS.map((channelOffset) =>
    <ShiftChannelSelectChip
      key={ channelOffset.toString() }
      channelOffset={ channelOffset }
      channelShiftValues={ channelShiftValues }
      selectedShiftChannel={ selectedShiftChannel }
      setSelectedShiftChannel={ setSelectedShiftChannel }
    />
  )

  return (
    <Paper
      sx={ { p: 2 } }
      variant="outlined"
    >
      {/*Shift Channel Select Buttons*/ }
      <Stack
        direction="row"
        alignItems="center"
        spacing={ 1 }
        sx={ {
          p: 2,
        } }
      >
        <FormLabel
          id="selected-shift-channel-label"
          sx={ { display: 'block' } }
        >
          Selected Channel:
        </FormLabel>
        {channelChips}
      </Stack>

      { /*Shift Channel Sliders*/ }
      <ShiftChannelSlider
        coordinateIndex={0}
        imageDimensionSize={imageWidth}
        selectedShiftChannel={selectedShiftChannel}
        channelShiftValues={channelShiftValues}
        setChannelShiftValue={setChannelShiftValue}
        />
      <ShiftChannelSlider
        coordinateIndex={1}
        imageDimensionSize={imageHeight}
        selectedShiftChannel={selectedShiftChannel}
        channelShiftValues={channelShiftValues}
        setChannelShiftValue={setChannelShiftValue}
      />
    </Paper>
  )
}