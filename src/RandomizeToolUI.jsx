import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import * as Constants from './Constants'
import React from 'react'
import { ChannelLabel } from './common/ChannelLabel'
import { NumericTextInput } from './common/NumericTextInput'
import { ToolUIContainer } from './common/ToolUIContainer'
import { Close } from '@mui/icons-material'

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
    <FormControlLabel
      control={
        <Checkbox
          checked={ randomizeShiftChannels[channelOffset][dimensionIndex] }
          onChange={ randomizeShiftChannelCheckboxOnChange }
          color={ Constants.CHANNEL_MUI_COLORS[channelOffset] }
        />
      }
      label={ `Randomize ${ dimensionIndex === 0 ? 'X' : 'Y' } Shift` }
      sx={ {
        // Prevent accidental selection when dragging slider
        userSelect: 'none'
      } }
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
    <Box>
      <Typography
        variant="overline"
        gutterBottom
        sx={ {
          display: 'block',
          color: randomizeShiftChannels[channelOffset][dimensionIndex] ?
            Constants.CHANNEL_MUI_COLORS[channelOffset] + '.main' :
            'text.secondary',
        } }
      >
        Max { dimensionIndex === 0 ? 'X' : 'Y' } Shift Percent:
      </Typography>
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
    </Box>
  )
}


/**
 * Randomize shift channel settings component.
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
const RandomizeShiftChannelSettings = ({
                                         channelOffset,
                                         // State props
                                         randomizeShiftChannels,
                                         randomizeShiftMaxPercents,
                                         // State setter functions
                                         setRandomizeShiftChannel,
                                         setRandomizeShiftMaxPercents
                                       }) => {
  return (
    <Paper
      variant="outlined"
      sx={ {
        borderColor: Constants.CHANNEL_MUI_COLORS[channelOffset] + '.main',
        borderWidth: 1.5,
        p: 2,
        mb: 1,
      } }
    >
      <Grid
        container
        spacing={ 1 }
        justifyContent="center"
      >
        {/*Label*/ }
        <Grid item xs={ 12 }>
          <ChannelLabel channelOffset={ channelOffset }/>
        </Grid>
        {/*X Shift*/ }
        <Grid item xs={ 12 } sm={ 6 }>
          <RandomizeShiftDimensionCheckbox
            channelOffset={ channelOffset }
            dimensionIndex={ 0 }
            randomizeShiftChannels={ randomizeShiftChannels }
            setRandomizeShiftChannel={ setRandomizeShiftChannel }
          />
          <RandomizeShiftMaxPercentInput
            channelOffset={ channelOffset }
            dimensionIndex={ 0 }
            randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
            setRandomizeShiftMaxPercent={ setRandomizeShiftMaxPercents }
            randomizeShiftChannels={ randomizeShiftChannels }
          />
        </Grid>
        {/*Y Shift*/ }
        <Grid item xs={ 12 } sm={ 6 }>
          <RandomizeShiftDimensionCheckbox
            channelOffset={ channelOffset }
            dimensionIndex={ 1 }
            randomizeShiftChannels={ randomizeShiftChannels }
            setRandomizeShiftChannel={ setRandomizeShiftChannel }
          />
          <RandomizeShiftMaxPercentInput
            channelOffset={ channelOffset }
            dimensionIndex={ 1 }
            randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
            setRandomizeShiftMaxPercent={ setRandomizeShiftMaxPercents }
            randomizeShiftChannels={ randomizeShiftChannels }
          />
        </Grid>
      </Grid>
    </Paper>
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
    <FormControlLabel
      control={
        <Checkbox
          checked={ randomizeShiftChannels.every(channelArr => channelArr[dimensionIndex] === true) }
          indeterminate={ !randomizeShiftChannels.every(channelArr => channelArr[dimensionIndex] === randomizeShiftChannels[0][dimensionIndex]) }
          onChange={ selectAllOnChange }
          color="neutral"
        />
      }
      label={ `Randomize ${ dimensionIndex === 0 ? 'X' : 'Y' } Shift` }
      sx={ {
        // Prevent accidental selection when dragging slider
        userSelect: 'none'
      } }
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
    <Box>
      <Typography
        variant="overline"
        gutterBottom
        sx={ {
          display: 'block',
        } }
      >
        Max { dimensionIndex === 0 ? 'X' : 'Y' } Shift Percent:
      </Typography>
      <NumericTextInput
        valueState={ editAllMaxPercent }
        min={ 0 }
        max={ 100 }
        onChangeHandleValue={ editAllOnChangeHandleValue }
        onBlurHandleValidatedValue={ editAllOnBlurHandleValidatedValue }
        InputProps={ {
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        } }
        placeholder={ `Max ${ dimensionIndex === 0 ? 'X' : 'Y' } Shift` }
        color="neutral"
      />
    </Box>
  )
}


/**
 * Randomize shift "all channels" settings component.
 *
 * @param randomizeShiftChannels
 * @param randomizeShiftMaxPercents
 * @param setRandomizeShiftChannels
 * @param setRandomizeShiftMaxPercents
 * @return {Element}
 * @constructor
 */
const RandomizeShiftAllChannelsSettings = ({
                                             // State props
                                             randomizeShiftChannels,
                                             randomizeShiftMaxPercents,
                                             // State setter props
                                             setRandomizeShiftChannels,
                                             setRandomizeShiftMaxPercents
                                           }) => {
  return (
    <Paper
      variant="outlined"
      sx={ {
        borderWidth: 1.5,
        p: 2,
        mb: 1,
        borderColor: 'neutral.main',
      } }
    >
      <Grid
        container
        spacing={ 1 }
        justifyContent="center"
      >
        {/*Label*/ }
        <Grid item xs={ 12 }>
          <Typography variant="button">
            All Channels
          </Typography>
        </Grid>
        {/*X Shift*/ }
        <Grid item xs={ 12 } sm={ 6 }>
          <RandomizeShiftDimensionSelectAllCheckbox
            dimensionIndex={ 0 }
            randomizeShiftChannels={ randomizeShiftChannels }
            setRandomizeShiftChannels={ setRandomizeShiftChannels }
          />
          <RandomizeShiftMaxPercentEditAllInput
            dimensionIndex={ 0 }
            randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
            setRandomizeShiftMaxPercents={ setRandomizeShiftMaxPercents }
          />
        </Grid>
        {/*Y Shift*/ }
        <Grid item xs={ 12 } sm={ 6 }>
          <RandomizeShiftDimensionSelectAllCheckbox
            dimensionIndex={ 1 }
            randomizeShiftChannels={ randomizeShiftChannels }
            setRandomizeShiftChannels={ setRandomizeShiftChannels }
          />
          <RandomizeShiftMaxPercentEditAllInput
            dimensionIndex={ 1 }
            randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
            setRandomizeShiftMaxPercents={ setRandomizeShiftMaxPercents }
          />
        </Grid>
      </Grid>
    </Paper>
  )
}


/**
 * Randomize shift settings component.
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
const RandomizeShiftSettingsUI = ({
                                    // State props
                                    randomizeShiftChannels,
                                    randomizeShiftMaxPercents,
                                    // State setter functions
                                    setRandomizeShiftChannel,
                                    setRandomizeShiftChannels,
                                    setRandomizeShiftMaxPercent,
                                    setRandomizeShiftMaxPercents
                                  }) => {

  // Generate settings for each channel
  const channelSettings = Constants.CHANNEL_OFFSETS.map((channelOffset) =>
    <RandomizeShiftChannelSettings
      key={ channelOffset.toString() }
      channelOffset={ channelOffset }
      randomizeShiftChannels={ randomizeShiftChannels }
      randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
      setRandomizeShiftMaxPercents={ setRandomizeShiftMaxPercent }
      setRandomizeShiftChannel={ setRandomizeShiftChannel }
    />
  )

  return (
    <Box>
      { channelSettings }
      <RandomizeShiftAllChannelsSettings
        randomizeShiftChannels={ randomizeShiftChannels }
        randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
        setRandomizeShiftChannels={ setRandomizeShiftChannels }
        setRandomizeShiftMaxPercents={ setRandomizeShiftMaxPercents }
      />
    </Box>
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
      <Table
        size="small"
      >
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
          <TableRow hover>
            <TableCell
              align="center"
              colSpan={ 3 }
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ randomizeSwapPreferDifferentChannels }
                    onChange={ randomizeSwapPreferDifferentChannelsSwitchOnChange }
                    color="info"
                  />
                }
                label="Attempt to pick different source and target channels when possible"
              />
            </TableCell>
          </TableRow>
        </TableBody>
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
    <ToolUIContainer>
      { /*Randomize Shift*/ }
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
            color={ shouldRandomizeShift ? 'secondary' : null }
          >
            Randomize Shift
          </Typography>
        }
      />
      <Collapse in={ shouldRandomizeShift }>
        <Box
          sx={ {
            mt: 2,
          } }
        >
          <RandomizeShiftSettingsUI
            randomizeShiftChannels={ randomizeShiftChannels }
            setRandomizeShiftChannel={ setRandomizeShiftChannel }
            setRandomizeShiftChannels={ setRandomizeShiftChannels }
            randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
            setRandomizeShiftMaxPercent={ setRandomizeShiftMaxPercent }
            setRandomizeShiftMaxPercents={ setRandomizeShiftMaxPercents }
          />
        </Box>
      </Collapse>

      <Divider
        sx={ { my: 3 } }
      />

      { /*Randomize Swap*/ }
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
            color={ shouldRandomizeSwap ? 'secondary' : null }
          >
            Randomize Swap
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

    </ToolUIContainer>
  )
}

// TODO: doc, merge this with above, rename file
export const RandomizationSettingsDialog = ({
                                              open,
                                              onClose,
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
  return (
    <Dialog
      open={ open }
      scroll="paper"
      maxWidth="md"
      fullWidth={ true }
    >
      <DialogTitle>
        Randomization Settings
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={ onClose }
        sx={ {
          position: 'absolute', right: 8, top: 8,
        } }
      >
        <Close/>
      </IconButton>
      <DialogContent dividers>
        <RandomizeToolUI
          // Randomize Shift State Props
          shouldRandomizeShift={ shouldRandomizeShift }
          randomizeShiftChannels={ randomizeShiftChannels }
          randomizeShiftMaxPercents={ randomizeShiftMaxPercents }
          // Randomize Shift State Setter Props
          setShouldRandomizeShift={ setShouldRandomizeShift }
          setRandomizeShiftChannel={ setRandomizeShiftChannel }
          setRandomizeShiftChannels={ setRandomizeShiftChannels }
          setRandomizeShiftMaxPercent={ setRandomizeShiftMaxPercent }
          setRandomizeShiftMaxPercents={ setRandomizeShiftMaxPercents }
          // Randomize Swap State Props
          shouldRandomizeSwap={ shouldRandomizeSwap }
          randomizeSwapSourceChannels={ randomizeSwapSourceChannels }
          randomizeSwapTargetChannels={ randomizeSwapTargetChannels }
          randomizeSwapPreferDifferentChannels={ randomizeSwapPreferDifferentChannels }
          // Randomize Swap State Setter Props
          setShouldRandomizeSwap={ setShouldRandomizeSwap }
          setRandomizeSwapSourceChannel={ setRandomizeSwapSourceChannel }
          setRandomizeSwapSourceChannels={ setRandomizeSwapSourceChannels }
          setRandomizeSwapTargetChannel={ setRandomizeSwapTargetChannel }
          setRandomizeSwapTargetChannels={ setRandomizeSwapTargetChannels }
          setRandomizeSwapPreferDifferentChannels={ setRandomizeSwapPreferDifferentChannels }
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={ onClose }
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )

}
