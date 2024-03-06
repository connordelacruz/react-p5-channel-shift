import {
  Checkbox,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableFooter,
  TableHead,
  TableRow,
  TextField, Typography
} from '@mui/material'
import * as Constants from './Constants'
import React from 'react'
import { ChannelLabel } from './common/ChannelLabel'

// ================================================================================
// Randomization Options Tool UI
// ================================================================================

// --------------------------------------------------------------------------------
// Randomize Shift
// --------------------------------------------------------------------------------

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
  const randomizeShiftChannelCheckboxOnChange = (event) => {
    setRandomizeShiftChannel(channelOffset, dimensionIndex, event.target.checked)
  }

  return (
    <Checkbox
      checked={ randomizeShiftChannels[channelOffset][dimensionIndex] }
      onChange={ randomizeShiftChannelCheckboxOnChange }
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
  const randomizeShiftMaxPercentInputOnChange = (event) => {
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
  const randomizeShiftMaxPercentInputOnBlur = (event) => {
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
  const randomizeShiftMaxPercentInputOnFocus = (event) => {
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
      onChange={ randomizeShiftMaxPercentInputOnChange }
      onBlur={ randomizeShiftMaxPercentInputOnBlur }
      onFocus={ randomizeShiftMaxPercentInputOnFocus }
      size="small"
    />
  )
}


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
  return (
    <TableRow hover>
      <TableCell>
        <ChannelLabel channelOffset={ channelOffset }/>
      </TableCell>
      <TableCell align="center">
        <RandomizeShiftDimensionCheckbox
          channelOffset={ channelOffset }
          dimensionIndex={ 0 }
          randomizeShiftChannels={ randomizeShiftChannels }
          setRandomizeShiftChannel={ setRandomizeShiftChannel }
        />
      </TableCell>
      <TableCell align="center">
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
      <TableCell align="center">
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
 * Select all checkbox component for randomize shift x/y.
 *
 * @param dimensionIndex
 * @param randomizeShiftChannels
 * @param setRandomizeShiftChannels
 * @return {Element}
 * @constructor
 */
const RandomizeShiftSelectAllCheckbox = ({
                                           dimensionIndex,
                                           // State props
                                           randomizeShiftChannels,
                                           // State setter props
                                           setRandomizeShiftChannels
                                         }) => {
  const selectAllOnChange = (event) => {
    const newRandomizeShiftChannels = [...randomizeShiftChannels]
    Constants.CHANNEL_OFFSETS.forEach(channelOffset => {
      newRandomizeShiftChannels[channelOffset][dimensionIndex] = event.target.checked
    })
    setRandomizeShiftChannels(newRandomizeShiftChannels)
  }

  return (
    <Checkbox
      checked={ randomizeShiftChannels.every(channelArr => channelArr[dimensionIndex] === true) }
      indeterminate={ !randomizeShiftChannels.every(channelArr => channelArr[dimensionIndex] === randomizeShiftChannels[0][dimensionIndex]) }
      onChange={ selectAllOnChange }
      color="neutral"
    />
  )
}


/**
 * Randomize shift "all channels" table row component.
 *
 * @param randomizeShiftChannels
 * @param randomizeShiftMaxPercents
 * @param setRandomizeShiftChannels
 * @param setRandomizeShiftMaxPercents
 * @return {Element}
 * @constructor
 */
const RandomizeShiftSelectAllTableRow = ({
                                           // State props
                                           randomizeShiftChannels,
                                           randomizeShiftMaxPercents,
                                           // State setter props
                                           setRandomizeShiftChannels,
                                           setRandomizeShiftMaxPercents
                                         }) => {
  return (
    <TableRow hover>
      <TableCell>
        <Typography variant="button">
          All Channels
        </Typography>
      </TableCell>
      <TableCell align="center">
        <RandomizeShiftSelectAllCheckbox
          dimensionIndex={ 0 }
          randomizeShiftChannels={ randomizeShiftChannels }
          setRandomizeShiftChannels={ setRandomizeShiftChannels }
        />
      </TableCell>
      <TableCell align="center">
        TODO: X Max %
      </TableCell>
      <TableCell align="center">
        <RandomizeShiftSelectAllCheckbox
          dimensionIndex={ 1 }
          randomizeShiftChannels={ randomizeShiftChannels }
          setRandomizeShiftChannels={ setRandomizeShiftChannels }
        />
      </TableCell>
      <TableCell align="center">
        TODO: Y Max %
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
 * @param setRandomizeShiftChannels
 * @param setRandomizeShiftMaxPercent
 * @param setRandomizeShiftMaxPercents
 * @return {Element}
 * @constructor
 */
const RandomizeShiftTable = ({
                               // State props
                               randomizeShiftChannels,
                               randomizeShiftMaxPercents,
                               // State setter functions
                               setRandomizeShiftChannel,
                               setRandomizeShiftChannels,
                               setRandomizeShiftMaxPercent,
                               setRandomizeShiftMaxPercents
                             }) => {

  // Generate table rows
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
            <TableCell align="center">Randomize X?</TableCell>
            <TableCell align="center">X Shift Max %</TableCell>
            <TableCell align="center">Randomize Y?</TableCell>
            <TableCell align="center">Y Shift Max %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { tableRows }
          <RandomizeShiftSelectAllTableRow
            randomizeShiftChannels={ randomizeShiftChannels }
            randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
            setRandomizeShiftChannels={ setRandomizeShiftChannels }
            setRandomizeShiftMaxPercents={ setRandomizeShiftMaxPercents }
          />
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// --------------------------------------------------------------------------------
// Randomize Swap
// --------------------------------------------------------------------------------

/**
 * Randomize swap source/target checkbox component.
 *
 * @param channelOffset
 * @param randomizeSwapChannels State array for source/target swap channels.
 * @param setRandomizeSwapChannel Corresponding state setter helper function for source/target.
 * @return {Element}
 * @constructor
 */
const RandomizeSwapChannelCheckbox = ({
                                        channelOffset,
                                        // State props
                                        randomizeSwapChannels,
                                        // State setter props
                                        setRandomizeSwapChannel
                                      }) => {
  /**
   * Set state to match checkbox checked property.
   *
   * @param event
   */
  const randomizeSwapChannelCheckboxOnChange = (event) => {
    setRandomizeSwapChannel(channelOffset, event.target.checked)
  }

  return (
    <Checkbox
      checked={ randomizeSwapChannels[channelOffset] }
      onChange={ randomizeSwapChannelCheckboxOnChange }
      color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }
    />
  )
}

/**
 * Randomize swap table row component.
 *
 * @param channelOffset
 * @param randomizeSwapSourceChannels
 * @param randomizeSwapTargetChannels
 * @param setRandomizeSwapSourceChannel
 * @param setRandomizeSwapTargetChannel
 * @return {Element}
 * @constructor
 */
const RandomizeSwapTableRow = ({
                                 channelOffset,
                                 // State props
                                 randomizeSwapSourceChannels,
                                 randomizeSwapTargetChannels,
                                 // State setter functions
                                 setRandomizeSwapSourceChannel,
                                 setRandomizeSwapTargetChannel
                               }) => {
  return (
    <TableRow hover>
      <TableCell>
        <ChannelLabel channelOffset={ channelOffset }/>
      </TableCell>
      <TableCell align="center">
        <RandomizeSwapChannelCheckbox
          channelOffset={ channelOffset }
          randomizeSwapChannels={ randomizeSwapSourceChannels }
          setRandomizeSwapChannel={ setRandomizeSwapSourceChannel }
        />
      </TableCell>
      <TableCell align="center">
        <RandomizeSwapChannelCheckbox
          channelOffset={ channelOffset }
          randomizeSwapChannels={ randomizeSwapTargetChannels }
          setRandomizeSwapChannel={ setRandomizeSwapTargetChannel }
        />
      </TableCell>
    </TableRow>
  )
}

/**
 * Select all checkbox component for randomize swap source/target.
 *
 * @param randomizeSwapChannels
 * @param setRandomizeSwapChannels
 * @return {Element}
 * @constructor
 */
const RandomizeSwapSelectAllCheckbox = ({
                                          randomizeSwapChannels,
                                          setRandomizeSwapChannels
                                        }) => {
  const selectAllOnChange = (event) => {
    const newRandomizeSwapChannels = []
    Constants.CHANNEL_OFFSETS.forEach(channelOffset => {
      newRandomizeSwapChannels[channelOffset] = event.target.checked
    })
    setRandomizeSwapChannels(newRandomizeSwapChannels)
  }

  return (
    <Checkbox
      checked={ randomizeSwapChannels.every(val => val === true) }
      indeterminate={ !randomizeSwapChannels.every((val, i, arr) => val === arr[0]) }
      onChange={ selectAllOnChange }
      color="neutral"
    />
  )
}

/**
 * Randomize swap "all channels" table row component.
 *
 * @param randomizeSwapSourceChannels
 * @param randomizeSwapTargetChannels
 * @param setRandomizeSwapSourceChannels
 * @param setRandomizeSwapTargetChannels
 * @return {Element}
 * @constructor
 */
const RandomizeSwapSelectAllTableRow = ({
                                          // State props
                                          randomizeSwapSourceChannels,
                                          randomizeSwapTargetChannels,
                                          // State setter functions
                                          setRandomizeSwapSourceChannels,
                                          setRandomizeSwapTargetChannels,

                                        }) => {
  return (
    <TableRow hover>
      <TableCell>
        <Typography variant="button">
          All Channels
        </Typography>
      </TableCell>
      <TableCell align="center">
        <RandomizeSwapSelectAllCheckbox
          randomizeSwapChannels={ randomizeSwapSourceChannels }
          setRandomizeSwapChannels={ setRandomizeSwapSourceChannels }
        />
      </TableCell>
      <TableCell align="center">
        <RandomizeSwapSelectAllCheckbox
          randomizeSwapChannels={ randomizeSwapTargetChannels }
          setRandomizeSwapChannels={ setRandomizeSwapTargetChannels }
        />
      </TableCell>
    </TableRow>
  )
}

/**
 * Randomize swap table component.
 *
 * @param randomizeSwapSourceChannels
 * @param randomizeSwapTargetChannels
 * @param setRandomizeSwapSourceChannel
 * @param setAllRandomizeSwapSourceChannels
 * @param setRandomizeSwapTargetChannel
 * @return {Element}
 * @constructor
 */
const RandomizeSwapTable = ({
                              // State props
                              randomizeSwapSourceChannels,
                              randomizeSwapTargetChannels,
                              // State setter functions
                              setRandomizeSwapSourceChannel,
                              setRandomizeSwapSourceChannels,
                              setRandomizeSwapTargetChannel,
                              setRandomizeSwapTargetChannels
                            }) => {
  // Generate table rows
  const tableRows = Constants.CHANNEL_OFFSETS.map((channelOffset) =>
    <RandomizeSwapTableRow
      key={ channelOffset.toString() }
      channelOffset={ channelOffset }
      randomizeSwapSourceChannels={ randomizeSwapSourceChannels }
      randomizeSwapTargetChannels={ randomizeSwapTargetChannels }
      setRandomizeSwapSourceChannel={ setRandomizeSwapSourceChannel }
      setRandomizeSwapTargetChannel={ setRandomizeSwapTargetChannel }
    />
  )

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Channel</TableCell>
            <TableCell align="center">Random Source Option?</TableCell>
            <TableCell align="center">Random Target Option?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { tableRows }
          <RandomizeSwapSelectAllTableRow
            randomizeSwapSourceChannels={ randomizeSwapSourceChannels }
            setRandomizeSwapSourceChannels={ setRandomizeSwapSourceChannels }
            randomizeSwapTargetChannels={ randomizeSwapTargetChannels }
            setRandomizeSwapTargetChannels={ setRandomizeSwapTargetChannels }
          />
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              align="center"
              colSpan={ 3 }
            >
              TODO: Pick different source and target channels when possible
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}


// --------------------------------------------------------------------------------
// Randomize Tool UI Component
// --------------------------------------------------------------------------------

/**
 * Randomization Options tool UI component.
 *
 * @param randomizeShiftChannels
 * @param randomizeShiftMaxPercents
 * @param setRandomizeShiftChannel
 * @param setRandomizeShiftChannels
 * @param setRandomizeShiftMaxPercent
 * @param setRandomizeShiftMaxPercents
 * @param randomizeSwapSourceChannels
 * @param randomizeSwapTargetChannels
 * @param setRandomizeSwapSourceChannel
 * @param setRandomizeSwapSourceChannels
 * @param setRandomizeSwapTargetChannel
 * @param setRandomizeSwapTargetChannels
 * @return {Element}
 * @constructor
 */
export const RandomizeToolUI = ({
                                  // Shift state props
                                  randomizeShiftChannels,
                                  randomizeShiftMaxPercents,
                                  // Shift state setter functions
                                  setRandomizeShiftChannel,
                                  setRandomizeShiftChannels,
                                  setRandomizeShiftMaxPercent,
                                  setRandomizeShiftMaxPercents,
                                  // Swap state props
                                  randomizeSwapSourceChannels,
                                  randomizeSwapTargetChannels,
                                  // Swap state setter props
                                  setRandomizeSwapSourceChannel,
                                  setRandomizeSwapSourceChannels,
                                  setRandomizeSwapTargetChannel,
                                  setRandomizeSwapTargetChannels
                                }) => {
  return (
    <Paper
      sx={ { p: 2 } }
      variant="outlined"
    >
      {/*Randomize Shift*/ }
      <Typography
        variant="h6"
        component="div"
        gutterBottom
      >
        Channel Shift Randomization:
      </Typography>
      <Paper
        sx={ { p: 2, mb: 2 } }
        variant="outlined"
      >
        <RandomizeShiftTable
          randomizeShiftChannels={ randomizeShiftChannels }
          setRandomizeShiftChannel={ setRandomizeShiftChannel }
          setRandomizeShiftChannels={ setRandomizeShiftChannels }
          randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
          setRandomizeShiftMaxPercent={ setRandomizeShiftMaxPercent }
          setRandomizeShiftMaxPercents={ setRandomizeShiftMaxPercents }
        />
      </Paper>

      {/*Randomize Swap*/ }
      <Typography
        variant="h6"
        component="div"
        gutterBottom
      >
        Channel Swap Randomization:
      </Typography>
      <Paper
        sx={ { p: 2 } }
        variant="outlined"
      >
        <RandomizeSwapTable
          randomizeSwapSourceChannels={ randomizeSwapSourceChannels }
          randomizeSwapTargetChannels={ randomizeSwapTargetChannels }
          setRandomizeSwapSourceChannel={ setRandomizeSwapSourceChannel }
          setRandomizeSwapSourceChannels={ setRandomizeSwapSourceChannels }
          setRandomizeSwapTargetChannel={ setRandomizeSwapTargetChannel }
          setRandomizeSwapTargetChannels={ setRandomizeSwapTargetChannels }
        />
      </Paper>

    </Paper>
  )
}