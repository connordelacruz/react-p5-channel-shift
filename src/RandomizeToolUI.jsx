// Table Row Component
// TODO: re-work to reuse this for the "All Channels" row
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
// Randomize Options Component
// ================================================================================

// --------------------------------------------------------------------------------
// Randomize Shift
// --------------------------------------------------------------------------------

// TODO: doc n implement, do the same for checkboxes; also think about how to support the "all channels" version
//  const RandomizeShiftPercentInput = ({channelOffset, dimensionIndex}) => {
//    return (
//    )
//  }

// Randomize Shift Table Row Component
const RandomizeShiftTableRow = ({
                                  channelOffset,
                                  // State props
                                  randomizeShiftChannels,
                                  randomizeShiftMaxPercents,
                                  // Handlers
                                  randomizeShiftChannelCheckboxOnChangeHandler,
                                  randomizeShiftMaxPercentInputOnChangeHandler,
                                  randomizeShiftMaxPercentInputOnBlurHandler
                                }) => {
  // TODO: add handlers and sanitization n stuff
  // TODO: Make channel labels prettier and use respective colors
  return (
    <TableRow>
      <TableCell>{ Constants.CHANNEL_DISPLAY_NAMES[channelOffset] }</TableCell>
      <TableCell align="center">
        <Checkbox
          checked={ randomizeShiftChannels[channelOffset][0] }
          onChange={ randomizeShiftChannelCheckboxOnChangeHandler(channelOffset, 0) }
          color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }
        />
      </TableCell>
      <TableCell>
        <TextField
          value={ randomizeShiftMaxPercents[channelOffset][0] }
          InputProps={ {
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          } }
          color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }
          disabled={ !randomizeShiftChannels[channelOffset][0] }
          onChange={ randomizeShiftMaxPercentInputOnChangeHandler(channelOffset, 0) }
          onBlur={ randomizeShiftMaxPercentInputOnBlurHandler(channelOffset, 0) }
          size="small"
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={ randomizeShiftChannels[channelOffset][1] }
          onChange={ randomizeShiftChannelCheckboxOnChangeHandler(channelOffset, 1) }
          color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }
        />
      </TableCell>
      <TableCell>
        <TextField
          value={ randomizeShiftMaxPercents[channelOffset][1] }
          InputProps={ {
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          } }
          color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }
          disabled={ !randomizeShiftChannels[channelOffset][1] }
          onChange={ randomizeShiftMaxPercentInputOnChangeHandler(channelOffset, 1) }
          onBlur={ randomizeShiftMaxPercentInputOnBlurHandler(channelOffset, 1) }
          size="small"
        />
      </TableCell>
    </TableRow>
  )
}

// Randomize Shift Table Component
const RandomizeShiftTable = ({
                               // State props
                               randomizeShiftChannels, randomizeShiftMaxPercents,
                               // State setter functions
                               setRandomizeShiftChannel, setRandomizeShiftMaxPercent,
                             }) => {
  /**
   * Returns an onChange handler for a randomize channel/dimension checkbox.
   *
   * @param channelOffset
   * @param dimensionIndex
   * @return {(function(*): void)|*}
   */
  const randomizeShiftChannelCheckboxOnChangeHandler = (channelOffset, dimensionIndex) => {
    return (event) => {
      setRandomizeShiftChannel(channelOffset, dimensionIndex, event.target.checked)
    }
  }

  /**
   * Returns an onChange handler for a randomize channel/dimension max % input.
   *
   * Parse the value as an integer, set state to that integer value or '' if it could not be parsed.
   *
   * @param channelOffset
   * @param dimensionIndex
   * @return {(function(*): void)|*}
   */
  const randomizeShiftMaxPercentInputOnChangeHandler = (channelOffset, dimensionIndex) => {
    return (event) => {
      let parsedInputValue = parseInt(event.target.value)
      if (isNaN(parsedInputValue)) {
        parsedInputValue = ''
      }
      setRandomizeShiftMaxPercent(channelOffset, dimensionIndex, parsedInputValue)
    }
  }

  /**
   * Returns an onBlur handler for a randomize channel/dimension max % input.
   *
   * Validates the corresponding state value, ensuring it's an integer between 0 and 100.
   *
   * @param channelOffset
   * @param dimensionIndex
   * @return {(function(*): void)|*}
   */
  const randomizeShiftMaxPercentInputOnBlurHandler = (channelOffset, dimensionIndex) => {
    return (event) => {
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
  }

  // Table rows
  const tableRows = Constants.CHANNEL_OFFSETS.map((channelOffset) =>
    <RandomizeShiftTableRow
      key={ channelOffset.toString() }
      channelOffset={ channelOffset }
      randomizeShiftChannels={ randomizeShiftChannels }
      randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
      randomizeShiftChannelCheckboxOnChangeHandler={ randomizeShiftChannelCheckboxOnChangeHandler }
      randomizeShiftMaxPercentInputOnChangeHandler={ randomizeShiftMaxPercentInputOnChangeHandler }
      randomizeShiftMaxPercentInputOnBlurHandler={ randomizeShiftMaxPercentInputOnBlurHandler }
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
export const RandomizeToolUI = ({
                                  // State props
                                  randomizeShiftChannels, randomizeShiftMaxPercents,
                                  // State setter functions
                                  setRandomizeShiftChannel, setRandomizeShiftMaxPercent,
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