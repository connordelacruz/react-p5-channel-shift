import {
  Checkbox,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material'
import * as Constants from './Constants'
import React from 'react'

// ================================================================================
// Randomization Options Tool UI
// ================================================================================

// --------------------------------------------------------------------------------
// Randomize Shift
// --------------------------------------------------------------------------------

// TODO: Think about how to support the "all channels" version
/**
 * Randomize shift dimension checkbox component.
 *
 * @param channelOffset
 * @param dimensionIndex
 * @param randomizeShiftChannels
 * @param setRandomizeShiftChannel
 * @return {Element}
 * @constructor
 */
const RandomizeShiftDimensionCheckbox = ({
                                           channelOffset,
                                           dimensionIndex,
                                           // State props
                                           randomizeShiftChannels,
                                           // State setter functions
                                           setRandomizeShiftChannel
                                         }) => {
  /**
   * Set state to match checkbox checked property.
   *
   * @param event
   */
  const randomizeShiftChannelCheckboxOnChangeHandler = (event) => {
    setRandomizeShiftChannel(channelOffset, dimensionIndex, event.target.checked)
  }

  return (
    <Checkbox
      checked={ randomizeShiftChannels[channelOffset][dimensionIndex] }
      onChange={ randomizeShiftChannelCheckboxOnChangeHandler }
      color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }
    />
  )
}


// TODO: Think about how to support the "all channels" version
/**
 * Randomize shift max percent text input component.
 *
 * @param channelOffset
 * @param dimensionIndex
 * @param randomizeShiftMaxPercents
 * @param randomizeShiftChannels
 * @param setRandomizeShiftMaxPercent
 * @return {Element}
 * @constructor
 */
const RandomizeShiftPercentInput = ({
                                      channelOffset,
                                      dimensionIndex,
                                      // State props
                                      randomizeShiftMaxPercents,
                                      randomizeShiftChannels,
                                      // State setter functions
                                      setRandomizeShiftMaxPercent
                                    }) => {
  /**
   * Parse the value as an integer, set state to that integer value or '' if it could not be parsed.
   *
   * @param event
   */
  const randomizeShiftMaxPercentInputOnChangeHandler = (event) => {
    let parsedInputValue = parseInt(event.target.value)
    if (isNaN(parsedInputValue)) {
      parsedInputValue = ''
    }
    setRandomizeShiftMaxPercent(channelOffset, dimensionIndex, parsedInputValue)
  }

  /**
   * Validates the corresponding state value, ensuring it's an integer between 0 and 100.
   *
   * @param event
   */
  const randomizeShiftMaxPercentInputOnBlurHandler = (event) => {
    const currentValue = randomizeShiftMaxPercents[channelOffset][dimensionIndex]
    // If value is not an integer or less than 0, set to 0
    if (!Number.isInteger(currentValue) || currentValue < 0) {
      setRandomizeShiftMaxPercent(channelOffset, dimensionIndex, 0)
    }
    // If value exceeds 100, set to 100
    else if (currentValue > 100) {
      setRandomizeShiftMaxPercent(channelOffset, dimensionIndex, 100)
    }
  }

  /**
   * Select all on focus.
   *
   * @param event
   */
  const randomizeShiftMaxPercentInputOnFocusHandler = (event) => {
    event.target.select()
  }

  return (
    <TextField
      value={ randomizeShiftMaxPercents[channelOffset][dimensionIndex] }
      InputProps={ {
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      } }
      color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }
      disabled={ !randomizeShiftChannels[channelOffset][dimensionIndex] }
      onChange={ randomizeShiftMaxPercentInputOnChangeHandler }
      onBlur={ randomizeShiftMaxPercentInputOnBlurHandler }
      onFocus={ randomizeShiftMaxPercentInputOnFocusHandler }
      size="small"
    />
  )
}


// TODO: re-work to reuse this for the "All Channels" row
/**
 * Randomize shift table row component.
 *
 * @param channelOffset
 * @param randomizeShiftChannels
 * @param randomizeShiftMaxPercents
 * @param setRandomizeShiftChannel
 * @param setRandomizeShiftMaxPercents
 * @param randomizeShiftChannelCheckboxOnChangeHandler
 * @return {Element}
 * @constructor
 */
const RandomizeShiftTableRow = ({
                                  channelOffset,
                                  // State props
                                  randomizeShiftChannels,
                                  randomizeShiftMaxPercents,
                                  // State setter functions
                                  setRandomizeShiftChannel,
                                  setRandomizeShiftMaxPercents
                                }) => {
  // TODO: Make channel labels prettier and use respective colors
  return (
    <TableRow>
      <TableCell>{ Constants.CHANNEL_DISPLAY_NAMES[channelOffset] }</TableCell>
      <TableCell align="center">
        <RandomizeShiftDimensionCheckbox
          channelOffset={ channelOffset }
          dimensionIndex={ 0 }
          randomizeShiftChannels={ randomizeShiftChannels }
          setRandomizeShiftChannel={ setRandomizeShiftChannel }
        />
      </TableCell>
      <TableCell>
        <RandomizeShiftPercentInput
          channelOffset={ channelOffset }
          dimensionIndex={ 0 }
          randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
          setRandomizeShiftMaxPercent={ setRandomizeShiftMaxPercents }
          randomizeShiftChannels={ randomizeShiftChannels }
        />
      </TableCell>
      <TableCell align="center">
        <RandomizeShiftDimensionCheckbox
          channelOffset={ channelOffset }
          dimensionIndex={ 1 }
          randomizeShiftChannels={ randomizeShiftChannels }
          setRandomizeShiftChannel={ setRandomizeShiftChannel }
        />
      </TableCell>
      <TableCell>
        <RandomizeShiftPercentInput
          channelOffset={ channelOffset }
          dimensionIndex={ 1 }
          randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
          setRandomizeShiftMaxPercent={ setRandomizeShiftMaxPercents }
          randomizeShiftChannels={ randomizeShiftChannels }
        />
      </TableCell>
    </TableRow>
  )
}


/**
 * Randomize shift table component.
 *
 * @param randomizeShiftChannels
 * @param randomizeShiftMaxPercents
 * @param setRandomizeShiftChannel
 * @param setRandomizeShiftMaxPercent
 * @return {Element}
 * @constructor
 */
const RandomizeShiftTable = ({
                               // State props
                               randomizeShiftChannels,
                               randomizeShiftMaxPercents,
                               // State setter functions
                               setRandomizeShiftChannel,
                               setRandomizeShiftMaxPercent
                             }) => {

  // Table rows
  const tableRows = Constants.CHANNEL_OFFSETS.map((channelOffset) =>
    <RandomizeShiftTableRow
      key={ channelOffset.toString() }
      channelOffset={ channelOffset }
      randomizeShiftChannels={ randomizeShiftChannels }
      randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
      setRandomizeShiftMaxPercents={ setRandomizeShiftMaxPercent }
      setRandomizeShiftChannel={ setRandomizeShiftChannel }
    />
  )

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Channel</TableCell>
            <TableCell>Randomize X Shift?</TableCell>
            <TableCell>X Shift Max %</TableCell>
            <TableCell>Randomize Y Shift?</TableCell>
            <TableCell>Y Shift Max %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { tableRows }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// --------------------------------------------------------------------------------
// Randomize Swap
// --------------------------------------------------------------------------------
// TODO

// --------------------------------------------------------------------------------
// Randomize Tool UI Component
// --------------------------------------------------------------------------------

/**
 * Randomization Options tool UI component.
 *
 * @param randomizeShiftChannels
 * @param randomizeShiftMaxPercents
 * @param setRandomizeShiftChannel
 * @param setRandomizeShiftMaxPercent
 * @return {Element}
 * @constructor
 */
export const RandomizeToolUI = ({
                                  // State props
                                  randomizeShiftChannels,
                                  randomizeShiftMaxPercents,
                                  // State setter functions
                                  setRandomizeShiftChannel,
                                  setRandomizeShiftMaxPercent
                                }) => {
  return (
    <Paper
      sx={ { p: 2 } }
      variant="outlined"
    >
      {/*Randomize Shift*/ }
      <Paper
        sx={ { p: 2 } }
        variant="outlined"
      >
        <RandomizeShiftTable
          randomizeShiftChannels={ randomizeShiftChannels }
          setRandomizeShiftChannel={ setRandomizeShiftChannel }
          randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
          setRandomizeShiftMaxPercent={ setRandomizeShiftMaxPercent }
        />
      </Paper>

      {/*Randomize Swap*/ }
      {/*TODO*/ }
    </Paper>
  )
}