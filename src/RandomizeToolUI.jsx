import {
  Checkbox, Collapse, Divider, FormControlLabel,
  InputAdornment,
  Paper, Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import * as Constants from './Constants'
import React from 'react'
import { ChannelLabel } from './common/ChannelLabel'
import { NumericTextInput } from './common/NumericTextInput'

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
const RandomizeShiftMaxPercentInput = ({
                                         channelOffset,
                                         dimensionIndex,
                                         // State props
                                         randomizeShiftMaxPercents,
                                         randomizeShiftChannels,
                                         // State setter functions
                                         setRandomizeShiftMaxPercent
                                       }) => {
  /**
   * Update state to parsed input value on change.
   *
   * @param parsedInputValue
   */
  const randomizeShiftMaxPercentInputOnChangeHandleValue = (parsedInputValue) => {
    setRandomizeShiftMaxPercent(channelOffset, dimensionIndex, parsedInputValue)
  }

  /**
   * Update state to validated input value on blur.
   *
   * @param validatedMaxPercent
   */
  const randomizeShiftMaxPercentInputOnBlurHandleValidatedValue = (validatedMaxPercent) => {
    setRandomizeShiftMaxPercent(channelOffset, dimensionIndex, validatedMaxPercent)
  }

  return (
    <NumericTextInput
      valueState={ randomizeShiftMaxPercents[channelOffset][dimensionIndex] }
      min={ 0 }
      max={ 100 }
      onChangeHandleValue={ randomizeShiftMaxPercentInputOnChangeHandleValue }
      onBlurHandleValidatedValue={ randomizeShiftMaxPercentInputOnBlurHandleValidatedValue }
      disabled={ !randomizeShiftChannels[channelOffset][dimensionIndex] }
      InputProps={ {
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      } }
      color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }
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
        <RandomizeShiftMaxPercentInput
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
        <RandomizeShiftMaxPercentInput
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
const RandomizeShiftDimensionSelectAllCheckbox = ({
                                                    dimensionIndex,
                                                    // State props
                                                    randomizeShiftChannels,
                                                    // State setter props
                                                    setRandomizeShiftChannels
                                                  }) => {
  /**
   * Update all checkboxes with the same dimensionIndex to match.
   *
   * @param event
   */
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
 * Edit all text input for randomize shift max percents.
 *
 * @param dimensionIndex
 * @param randomizeShiftMaxPercents
 * @param setRandomizeShiftMaxPercents
 * @return {Element}
 * @constructor
 */
const RandomizeShiftMaxPercentEditAllInput = ({
                                                dimensionIndex,
                                                // State props
                                                randomizeShiftMaxPercents,
                                                // State setter props
                                                setRandomizeShiftMaxPercents
                                              }) => {
  // Keep track of value for this independent of individual input states.
  // Default to empty. 
  const [editAllMaxPercent, setEditAllMaxPercent] = React.useState('')

  // Keep track of whether there was anything typed into this field.
  // Will not update other inputs at the end if no changes were made.
  const [wasModified, setWasModified] = React.useState(false)

  /**
   * Set state for all max percents with the same dimensionIndex to a value.
   *
   * Assumes we've already validated the value.
   *
   * @param validatedNewValue
   */
  const updateAllInputStates = (validatedNewValue) => {
    const newRandomizeShiftMaxPercents = [...randomizeShiftMaxPercents]
    Constants.CHANNEL_OFFSETS.forEach((channelOffset) => {
      newRandomizeShiftMaxPercents[channelOffset][dimensionIndex] = validatedNewValue
    })
    setRandomizeShiftMaxPercents(newRandomizeShiftMaxPercents)
  }

  /**
   * Update states to parsed input value on change.
   *
   * @param parsedInputValue
   */
  const editAllOnChangeHandleValue = (parsedInputValue) => {
    // Update local state
    setEditAllMaxPercent(parsedInputValue)
    // Update all inputs with the same dimensionIndex to match
    updateAllInputStates(parsedInputValue)
    // Keep track of changes
    if (!wasModified) {
      setWasModified(true)
    }
  }

  /**
   * If field was modified, update state to validated input value on blur and clear input value.
   *
   * @param validatedEditAllMaxPercent
   */
  const editAllOnBlurHandleValidatedValue = (validatedEditAllMaxPercent) => {
    if (wasModified) {
      // Update all input states to match
      updateAllInputStates(validatedEditAllMaxPercent)
      // Clear edit all input value
      setEditAllMaxPercent('')
      // Reset wasModified
      setWasModified(false)
    }
  }

  return (
    <NumericTextInput
      valueState={ editAllMaxPercent }
      min={ 0 }
      max={ 100 }
      onChangeHandleValue={ editAllOnChangeHandleValue }
      onBlurHandleValidatedValue={ editAllOnBlurHandleValidatedValue }
      InputProps={ {
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      } }
      helperText={ `Edit All Channels` }
      placeholder={ `${ dimensionIndex === 0 ? 'X' : 'Y' } Shift Max` }
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
        <RandomizeShiftDimensionSelectAllCheckbox
          dimensionIndex={ 0 }
          randomizeShiftChannels={ randomizeShiftChannels }
          setRandomizeShiftChannels={ setRandomizeShiftChannels }
        />
      </TableCell>
      <TableCell align="center">
        <RandomizeShiftMaxPercentEditAllInput
          dimensionIndex={ 0 }
          randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
          setRandomizeShiftMaxPercents={ setRandomizeShiftMaxPercents }
        />
      </TableCell>
      <TableCell align="center">
        <RandomizeShiftDimensionSelectAllCheckbox
          dimensionIndex={ 1 }
          randomizeShiftChannels={ randomizeShiftChannels }
          setRandomizeShiftChannels={ setRandomizeShiftChannels }
        />
      </TableCell>
      <TableCell align="center">
        <RandomizeShiftMaxPercentEditAllInput
          dimensionIndex={ 1 }
          randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
          setRandomizeShiftMaxPercents={ setRandomizeShiftMaxPercents }
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
        </TableBody>
        <TableFooter>
          <RandomizeShiftSelectAllTableRow
            randomizeShiftChannels={ randomizeShiftChannels }
            randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
            setRandomizeShiftChannels={ setRandomizeShiftChannels }
            setRandomizeShiftMaxPercents={ setRandomizeShiftMaxPercents }
          />
        </TableFooter>
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
                              randomizeSwapPreferDifferentChannels,
                              // State setter functions
                              setRandomizeSwapSourceChannel,
                              setRandomizeSwapSourceChannels,
                              setRandomizeSwapTargetChannel,
                              setRandomizeSwapTargetChannels,
                              setRandomizeSwapPreferDifferentChannels
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

  /**
   * "Prefer different channels" switch on change handler.
   *
   * @param event
   */
  const randomizeSwapPreferDifferentChannelsSwitchOnChange = (event) => {
    setRandomizeSwapPreferDifferentChannels(event.target.checked)
  }

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
        </TableBody>
        <TableFooter>
          <RandomizeSwapSelectAllTableRow
            randomizeSwapSourceChannels={ randomizeSwapSourceChannels }
            setRandomizeSwapSourceChannels={ setRandomizeSwapSourceChannels }
            randomizeSwapTargetChannels={ randomizeSwapTargetChannels }
            setRandomizeSwapTargetChannels={ setRandomizeSwapTargetChannels }
          />
          <TableRow>
            <TableCell
              align="center"
              colSpan={ 3 }
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={ randomizeSwapPreferDifferentChannels }
                    onChange={ randomizeSwapPreferDifferentChannelsSwitchOnChange }
                    color="secondary"
                  />
                }
                label="Attempt to pick different source and target channels when possible"
              />
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
 * @param shouldRandomizeShift
 * @param randomizeShiftChannels
 * @param randomizeShiftMaxPercents
 * @param setShouldRandomizeShift
 * @param setRandomizeShiftChannel
 * @param setRandomizeShiftChannels
 * @param setRandomizeShiftMaxPercent
 * @param setRandomizeShiftMaxPercents
 * @param shouldRandomizeSwap
 * @param randomizeSwapSourceChannels
 * @param randomizeSwapTargetChannels
 * @param randomizeSwapPreferDifferentChannels
 * @param setShouldRandomizeSwap
 * @param setRandomizeSwapSourceChannel
 * @param setRandomizeSwapSourceChannels
 * @param setRandomizeSwapTargetChannel
 * @param setRandomizeSwapTargetChannels
 * @param setRandomizeSwapPreferDifferentChannels
 * @return {Element}
 * @constructor
 */
export const RandomizeToolUI = ({
                                  // Shift state props
                                  shouldRandomizeShift,
                                  randomizeShiftChannels,
                                  randomizeShiftMaxPercents,
                                  // Shift state setter functions
                                  setShouldRandomizeShift,
                                  setRandomizeShiftChannel,
                                  setRandomizeShiftChannels,
                                  setRandomizeShiftMaxPercent,
                                  setRandomizeShiftMaxPercents,
                                  // Swap state props
                                  shouldRandomizeSwap,
                                  randomizeSwapSourceChannels,
                                  randomizeSwapTargetChannels,
                                  randomizeSwapPreferDifferentChannels,
                                  // Swap state setter props
                                  setShouldRandomizeSwap,
                                  setRandomizeSwapSourceChannel,
                                  setRandomizeSwapSourceChannels,
                                  setRandomizeSwapTargetChannel,
                                  setRandomizeSwapTargetChannels,
                                  setRandomizeSwapPreferDifferentChannels
                                }) => {
  /**
   * Randomize shift switch change handler.
   *
   * @param event
   */
  const shouldRandomizeShiftSwitchOnChange = (event) => {
    setShouldRandomizeShift(event.target.checked)
  }

  /**
   * Randomize swap switch change handler.
   *
   * @param event
   */
  const shouldRandomizeSwapSwitchOnChange = (event) => {
    setShouldRandomizeSwap(event.target.checked)
  }

  return (
    <Paper
      sx={ { p: 2 } }
      variant="outlined"
    >
      {/*Randomize Shift*/ }
      <FormControlLabel
        control={
          <Switch
            checked={ shouldRandomizeShift }
            onChange={ shouldRandomizeShiftSwitchOnChange }
            color="secondary"
          />
        }
        label={
          <Typography
            variant="h5"
          >
            Randomize Channel Shift
          </Typography>
        }
      />
      <Collapse in={ shouldRandomizeShift }>
        <Paper
          sx={ {
            p: 2,
            mt: 2,
          } }
          variant="outlined"
        >
          <Typography
            variant="h6"
            component="div"
            gutterBottom
          >
            Channel Shift Randomization Options:
          </Typography>
          <RandomizeShiftTable
            randomizeShiftChannels={ randomizeShiftChannels }
            setRandomizeShiftChannel={ setRandomizeShiftChannel }
            setRandomizeShiftChannels={ setRandomizeShiftChannels }
            randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
            setRandomizeShiftMaxPercent={ setRandomizeShiftMaxPercent }
            setRandomizeShiftMaxPercents={ setRandomizeShiftMaxPercents }
          />
        </Paper>
      </Collapse>

      <Divider
        sx={ { my: 3 } }
      />

      {/*Randomize Swap*/ }
      <FormControlLabel
        control={
          <Switch
            checked={ shouldRandomizeSwap }
            onChange={ shouldRandomizeSwapSwitchOnChange }
            color="secondary"
          />
        }
        label={
          <Typography
            variant="h5"
          >
            Randomize Channel Swap
          </Typography>
        }
      />
      <Collapse in={ shouldRandomizeSwap }>
        <Paper
          sx={ {
            p: 2,
            mt: 2,
          } }
          variant="outlined"
        >
          <Typography
            variant="h6"
            component="div"
            gutterBottom
          >
            Channel Swap Randomization Options:
          </Typography>
          <RandomizeSwapTable
            randomizeSwapSourceChannels={ randomizeSwapSourceChannels }
            randomizeSwapTargetChannels={ randomizeSwapTargetChannels }
            randomizeSwapPreferDifferentChannels={ randomizeSwapPreferDifferentChannels }
            setRandomizeSwapSourceChannel={ setRandomizeSwapSourceChannel }
            setRandomizeSwapSourceChannels={ setRandomizeSwapSourceChannels }
            setRandomizeSwapTargetChannel={ setRandomizeSwapTargetChannel }
            setRandomizeSwapTargetChannels={ setRandomizeSwapTargetChannels }
            setRandomizeSwapPreferDifferentChannels={ setRandomizeSwapPreferDifferentChannels }
          />
        </Paper>
      </Collapse>

    </Paper>
  )
}