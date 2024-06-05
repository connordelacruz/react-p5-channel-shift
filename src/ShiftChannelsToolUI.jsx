import {
  Box, Button, ButtonGroup,
  Grid,
  InputAdornment,
  Paper,
  Slider,
  SliderThumb,
  Typography
} from '@mui/material'
import * as Constants from './Constants'
import React from 'react'
import {
  SwapHoriz,
  SwapVert
} from '@mui/icons-material'
import { NumericTextInput } from './common/NumericTextInput'
import { ToolUIContainer } from './common/ToolUIContainer'

// ================================================================================
// Shift Channels Tool UI
// ================================================================================

/**
 * Component for channel shift select buttons.
 *
 * @param channelOffset
 * @param channelShiftValues
 * @param selectedShiftChannel
 * @param setSelectedShiftChannel
 * @return {Element}
 * @constructor
 */
const ShiftChannelSelectButton = ({
                                    channelOffset,
                                    // State props
                                    channelShiftValues,
                                    selectedShiftChannel,
                                    // State setter props
                                    setSelectedShiftChannel
                                  }) => {
  return (
    <Button
      variant={
        parseInt(selectedShiftChannel) === channelOffset ? 'contained' : 'outlined'
      }
      onClick={ () => {
        setSelectedShiftChannel(channelOffset)
      } }
      color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }
      size="large"
      disableElevation
      >
      {Constants.CHANNEL_DISPLAY_NAMES[channelOffset]}{channelShiftValues[channelOffset][0] === 0 && channelShiftValues[channelOffset][1] === 0 ? '' : ' *'}
    </Button>
  )
}

/**
 * Custom slider thumb component that displays an icon corresponding to whether this is horizontal or vertical shift.
 *
 * @param dimensionIndex
 * @param selectedShiftChannel
 * @param children
 * @param props
 * @return {Element}
 * @constructor
 */
const ShiftChannelSliderThumb = ({
                                   dimensionIndex,
                                   selectedShiftChannel,
                                   children,
                                   ...props
                                 }) => {

  return (
    <SliderThumb
      sx={ {
        bgColor: Constants.CHANNEL_MUI_COLORS[selectedShiftChannel],
        outline: 2,
        outlineColor: 'background.default',
        width: 24,
        height: 24,
        '&::before': {
          boxShadow: 'none',
        },
      } }
      { ...props }
    >
      { children }
      {
        dimensionIndex === 0 ?
          <SwapHoriz sx={ { color: 'background.default' } }/> :
          <SwapVert sx={ { color: 'background.default' } }/>
      }
    </SliderThumb>
  )
}

/**
 * Channel shift slider component.
 *
 * @param dimensionIndex
 * @param imageDimensionSize
 * @param selectedShiftChannel
 * @param channelShiftValues
 * @param channelShiftTextInputValues
 * @param setSelectedChannelShiftValue
 * @param setChannelShiftTextInputValue
 * @return {Element}
 * @constructor
 */
const ShiftChannelSlider = ({
                              dimensionIndex,
                              imageDimensionSize,
                              // State props
                              selectedShiftChannel,
                              channelShiftValues,
                              channelShiftTextInputValues,
                              // State setter props
                              setSelectedChannelShiftValue,
                              setChannelShiftTextInputValue
                            }) => {
  // For labels and ids
  const dimension = dimensionIndex === 0 ? 'x' : 'y'

  /**
   * On change handler for slider. Sets channel shift value to match slider value.
   *
   * @param event
   * @param newValue
   */
  const shiftSliderOnChange = (event, newValue) => {
    setSelectedChannelShiftValue(dimensionIndex, newValue)
  }

  /**
   * Update state to parsed input value on change.
   *
   * @param parsedInputValue
   */
  const shiftTextInputOnChangeHandleValue = (parsedInputValue) => {
    setChannelShiftTextInputValue(dimensionIndex, parsedInputValue)
  }

  /**
   * Update state to validated input value on blur.
   *
   * @param validatedShiftTextInputValue
   */
  const shiftTextInputOnBlurHandleValidatedValue = (validatedShiftTextInputValue) => {
    // Update shift value state
    // (useEffect() handles updating text input state if value was changed during validation)
    setSelectedChannelShiftValue(dimensionIndex, validatedShiftTextInputValue)
  }

  return (
    <Paper
      sx={ {
        p: 2,
        my: 2,
      } }
      variant="outlined"
    >
      <Typography
        id={ `${ dimension }-shift-slider-label` }
        variant="button"
        gutterBottom
        sx={ {
          // Prevent accidental selection when dragging slider
          userSelect: 'none'
        } }
      >
        { dimension.toUpperCase() } Shift
      </Typography>
      <Box
        sx={ { px: 2 } }
      >
        <Grid
          container
          alignItems="stretch"
          justifyContent="space-around"
          spacing={ 2 }
        >
          {/* Slider */ }
          <Grid item sm={ 9 } xs={ 12 }>
            <Slider
              value={ channelShiftValues[selectedShiftChannel][dimensionIndex] }
              onChange={ shiftSliderOnChange }
              min={ 0 }
              max={ imageDimensionSize }
              valueLabelDisplay="auto"
              marks={ [
                { value: 0, label: '' },
                { value: imageDimensionSize, label: '' }
              ] }
              slots={ { thumb: ShiftChannelSliderThumb } }
              slotProps={ {
                thumb: {
                  dimensionIndex: dimensionIndex,
                  selectedShiftChannel: selectedShiftChannel,
                }
              } }
              color={ Constants.CHANNEL_MUI_COLORS[selectedShiftChannel] }
              sx={{
                '& .MuiSlider-rail': {
                  height: 12,
                },
                '& .MuiSlider-track': {
                  height: 12,
                },
                '& .MuiSlider-mark': {
                  display: 'none',
                },
              }}
              aria-labelledby={ `${ dimension }-shift-slider-label` }
            />
            {/* Fix for min/max marks going out of bounds */ }
            <Box
              sx={ {
                display: 'flex',
                justifyContent: 'space-between',
                // Prevent accidental selection when dragging slider
                userSelect: 'none'
              } }
            >
              <Typography
                variant="body2"
              >
                0px
              </Typography>
              <Typography
                variant="body2"
              >
                { imageDimensionSize }px
              </Typography>
            </Box>
          </Grid>

          {/* Text input */ }
          <Grid item sm={ 3 } xs={ 12 }>
            <NumericTextInput
              valueState={ channelShiftTextInputValues[dimensionIndex] }
              min={ 0 }
              max={ imageDimensionSize }
              onChangeHandleValue={ shiftTextInputOnChangeHandleValue }
              onBlurHandleValidatedValue={ shiftTextInputOnBlurHandleValidatedValue }
              InputProps={ {
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
              } }
              color={ Constants.CHANNEL_MUI_COLORS[selectedShiftChannel] }
              sx={ { width: '100%' } }
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}


/**
 * Shift channels tool UI component.
 *
 * @param channelShiftValues
 * @param selectedShiftChannel
 * @param imageWidth
 * @param imageHeight
 * @param channelShiftTextInputValues
 * @param setSelectedChannelShiftValue
 * @param setSelectedShiftChannel
 * @param setChannelShiftTextInputValue
 * @return {Element}
 * @constructor
 */
export const ShiftChannelsToolUI = ({
                                      // State props
                                      channelShiftValues,
                                      selectedShiftChannel,
                                      imageWidth,
                                      imageHeight,
                                      channelShiftTextInputValues,
                                      // State setter props
                                      setSelectedChannelShiftValue,
                                      setSelectedShiftChannel,
                                      setChannelShiftTextInputValue
                                    }) => {

  // Channel selection chips
  const channelButtons = Constants.CHANNEL_OFFSETS.map((channelOffset) =>
    <ShiftChannelSelectButton
      key={ channelOffset.toString() }
      channelOffset={ channelOffset }
      channelShiftValues={ channelShiftValues }
      selectedShiftChannel={ selectedShiftChannel }
      setSelectedShiftChannel={ setSelectedShiftChannel }
    />
  )

  return (
    <ToolUIContainer>
      {/*Shift Channel Select Buttons*/ }
      <ButtonGroup
        orientation="horizontal"
        fullWidth
        sx={{
          py: 1,
        }}
        >
        {channelButtons}
      </ButtonGroup>

      { /*Shift Channel Sliders*/ }
      <ShiftChannelSlider
        dimensionIndex={ 0 }
        imageDimensionSize={ imageWidth }
        selectedShiftChannel={ selectedShiftChannel }
        channelShiftValues={ channelShiftValues }
        channelShiftTextInputValues={ channelShiftTextInputValues }
        setSelectedChannelShiftValue={ setSelectedChannelShiftValue }
        setChannelShiftTextInputValue={ setChannelShiftTextInputValue }
      />
      <ShiftChannelSlider
        dimensionIndex={ 1 }
        imageDimensionSize={ imageHeight }
        selectedShiftChannel={ selectedShiftChannel }
        channelShiftValues={ channelShiftValues }
        channelShiftTextInputValues={ channelShiftTextInputValues }
        setSelectedChannelShiftValue={ setSelectedChannelShiftValue }
        setChannelShiftTextInputValue={ setChannelShiftTextInputValue }
      />
    </ToolUIContainer>
  )
}