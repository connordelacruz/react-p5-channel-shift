import { Box, Chip, Grid, Paper, Slider, Stack, Typography } from '@mui/material'
import * as Constants from './Constants'
import React from 'react'
import { SwapHorizontalCircle, SwapVerticalCircle } from '@mui/icons-material'

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
                                  // State props
                                  channelShiftValues,
                                  selectedShiftChannel,
                                  // State setter props
                                  setSelectedShiftChannel
                                }) => {
  return (
    <Chip
      icon={
        <Typography variant="button"
                    sx={ { fontWeight: 'bold' } }
        >
          { Constants.CHANNEL_DISPLAY_NAMES[channelOffset] }
        </Typography>
      }
      label={
        `(${ channelShiftValues[channelOffset][0] }px, ${ channelShiftValues[channelOffset][1] }px)`
      }
      variant={
        parseInt(selectedShiftChannel) === channelOffset ? 'filled' : 'outlined'
      }
      onClick={ () => {
        setSelectedShiftChannel(channelOffset)
      } }
      color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }
    />
  )
}

/**
 * Channel shift slider component.
 *
 * @param coordinateIndex
 * @param imageDimensionSize
 * @param selectedShiftChannel
 * @param channelShiftValues
 * @param setChannelShiftValue
 * @return {Element}
 * @constructor
 */
const ShiftChannelSlider = ({
                              // TODO: rename dimensionIndex for consistency
                              coordinateIndex,
                              imageDimensionSize,
                              // State props
                              selectedShiftChannel,
                              channelShiftValues,
                              // State setter props
                              setChannelShiftValue,
                            }) => {
  // For labels and ids
  const dimension = coordinateIndex === 0 ? 'x' : 'y'

  /**
   * On change handler for slider. Sets channel shift value to match slider value.
   *
   * @param event
   * @param newValue
   */
  const shiftSliderOnChange = (event, newValue) => {
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={ 1 }
        mb={ 1 }
      >
        {
          coordinateIndex === 0 ?
            <SwapHorizontalCircle color={ Constants.CHANNEL_MUI_COLORS[selectedShiftChannel] }/> :
            <SwapVerticalCircle color={ Constants.CHANNEL_MUI_COLORS[selectedShiftChannel] }/>
        }
        <Typography
          id={ `${ dimension }-shift-slider-label` }
          variant="button"
          gutterBottom
        >
          { dimension.toUpperCase() } Shift
        </Typography>
      </Stack>
      {/*TODO https://mui.com/material-ui/react-slider/#slider-with-input-field*/ }
      <Box
        sx={ { px: 2 } }
      >
        <Grid
          container
          alignItems="center"
          spacing={ 2 }
        >
          <Grid item xs>
            <Slider
              value={ channelShiftValues[selectedShiftChannel][coordinateIndex] }
              onChange={ shiftSliderOnChange }
              min={ 0 }
              max={ imageDimensionSize }
              valueLabelDisplay="auto"
              marks={ [
                { value: 0, label: '0px' },
                { value: imageDimensionSize, label: `${ imageDimensionSize }px` }
              ] }
              aria-labelledby={ `${ dimension }-shift-slider-label` }
              color={ Constants.CHANNEL_MUI_COLORS[selectedShiftChannel] }
            />
          </Grid>
        </Grid>
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
        { channelChips }
      </Stack>

      { /*Shift Channel Sliders*/ }
      {/* TODO: make min/max text + label non-selectable for these: */ }
      <ShiftChannelSlider
        coordinateIndex={ 0 }
        imageDimensionSize={ imageWidth }
        selectedShiftChannel={ selectedShiftChannel }
        channelShiftValues={ channelShiftValues }
        setChannelShiftValue={ setChannelShiftValue }
      />
      <ShiftChannelSlider
        coordinateIndex={ 1 }
        imageDimensionSize={ imageHeight }
        selectedShiftChannel={ selectedShiftChannel }
        channelShiftValues={ channelShiftValues }
        setChannelShiftValue={ setChannelShiftValue }
      />
    </Paper>
  )
}