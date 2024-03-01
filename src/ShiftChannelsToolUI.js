import { Box, Chip, FormLabel, Paper, Slider, Stack, Typography } from '@mui/material'
import * as Constants from './Constants'
import React from 'react'

/**
 * Component for channel shift select chips
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

// TODO: doc consistently w/ others
// TODO: extract sliders n stuff
export const ShiftChannelsToolUI = ({
                                      channelShiftValues, setChannelShiftValue,
                                      selectedShiftChannel, setSelectedShiftChannel,
                                      imageWidth, imageHeight,
                                    }) => {

  /**
   * Returns onChange method for x/y shift sliders
   *
   * @param coordinateIndex 0 for x, 1 for y
   *
   * @return onChange handler function for x/y shift slider
   */
  const shiftSliderOnChangeHandler = coordinateIndex => {
    return (event, newValue) => {
      setChannelShiftValue(coordinateIndex, newValue)
    }
  }

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
        <ShiftChannelSelectChip
          channelOffset={ Constants.R_OFFSET }
          channelShiftValues={ channelShiftValues }
          selectedShiftChannel={ selectedShiftChannel }
          setSelectedShiftChannel={ setSelectedShiftChannel }
        />
        <ShiftChannelSelectChip
          channelOffset={ Constants.G_OFFSET }
          channelShiftValues={ channelShiftValues }
          selectedShiftChannel={ selectedShiftChannel }
          setSelectedShiftChannel={ setSelectedShiftChannel }
        />
        <ShiftChannelSelectChip
          channelOffset={ Constants.B_OFFSET }
          channelShiftValues={ channelShiftValues }
          selectedShiftChannel={ selectedShiftChannel }
          setSelectedShiftChannel={ setSelectedShiftChannel }
        />
      </Stack>
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
          <FormLabel id="x-shift-slider-label">X Shift:</FormLabel>
          <Slider
            value={ channelShiftValues[selectedShiftChannel][0] }
            onChange={ shiftSliderOnChangeHandler(0) }
            min={ 0 }
            max={ imageWidth }
            valueLabelDisplay="auto"
            marks={ [
              { value: 0, label: '0px' },
              { value: imageWidth, label: `${ imageWidth }px` }
            ] }
            aria-labelledby="x-shift-slider-label"
            color={ Constants.CHANNEL_MUI_COLORS[selectedShiftChannel] }
          />
        </Box>
      </Paper>
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
          <FormLabel id="y-shift-slider-label">Y Shift:</FormLabel>
          <Slider
            value={ channelShiftValues[selectedShiftChannel][1] }
            onChange={ shiftSliderOnChangeHandler(1) }
            min={ 0 }
            max={ imageHeight }
            valueLabelDisplay="auto"
            marks={ [
              { value: 0, label: '0px' },
              { value: imageHeight, label: `${ imageHeight }px` }
            ] }
            color={ Constants.CHANNEL_MUI_COLORS[selectedShiftChannel] }
            aria-labelledby="y-shift-slider-label"
          />
        </Box>
      </Paper>
    </Paper>
  )
}