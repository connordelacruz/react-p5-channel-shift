import React from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react'

import { ChannelShiftSketch } from './ChannelShiftSketch'
import {
  Box, Button,
  Container, CssBaseline, Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup, Slider, Stack, Tooltip,
  Typography
} from '@mui/material'
import { CheckCircleOutline, RestartAlt, Save } from '@mui/icons-material'

function App() {
  // Indexes into RGB arrays + values of radio buttons
  const R_OFFSET = 0
  const G_OFFSET = 1
  const B_OFFSET = 2

  // Image dimensions (sketch sets these after image is loaded)
  const [imageWidth, setImageWidth] = React.useState(0)
  const [imageHeight, setImageHeight] = React.useState(0)

  // Source and target channels
  const [sourceChannel, setSourceChannel] = React.useState(R_OFFSET)
  const [targetChannel, setTargetChannel] = React.useState(R_OFFSET)
  // Since RGB radio elements are identical in source and target, use this method to generate common markup
  const ChannelRadioElements = () => {
    return (
      <React.Fragment>
        <FormControlLabel
          value={R_OFFSET}
          label="Red"
          control={ <Radio color="error"/> }
          sx={{ color: 'error.main' }}
        />
        <FormControlLabel
          value={G_OFFSET}
          label="Green"
          control={ <Radio color="success"/> }
          sx={{ color: 'success.main' }}
        />
        <FormControlLabel
          value={B_OFFSET}
          label="Blue"
          control={ <Radio color="primary"/> }
          sx={{ color: 'primary.main' }}
        />
      </React.Fragment>
    )
  }
  // onChange method for source/target channel radio groups
  const channelRadioOnChangeHandler = setterFunction => {
    return (event) => {
      setterFunction(event.target.value)
    }
  }

  // x/y shift channel selection
  const [selectedShiftChannel, setSelectedShiftChannel] = React.useState(R_OFFSET)
  // onChange method for selecting x/y shift channel
  const shiftChannelSelectionOnChangeHandler = (event) => {
    setSelectedShiftChannel(event.target.value)
  }
  // x/y shift states
  // JS struggles with copying multi-dimensional arrays, so using a function to give us the default for channelShiftValues
  const getChannelShiftValuesDefault = () => {
    const channelShiftValuesDefault = []
    channelShiftValuesDefault[R_OFFSET] = [0, 0]
    channelShiftValuesDefault[G_OFFSET] = [0, 0]
    channelShiftValuesDefault[B_OFFSET] = [0, 0]
    return channelShiftValuesDefault
  }
  // Can't define array literals with indexes, so initializing default as a constant
  const [channelShiftValues, setChannelShiftValues] = React.useState(getChannelShiftValuesDefault())
  // Helper function for updating shift values
  const setChannelShiftValue = (coordinateIndex, newValue) => {
    const newChannelShiftValues = [...channelShiftValues]
    // Update selected targetChannel
    newChannelShiftValues[selectedShiftChannel][coordinateIndex] = newValue
    setChannelShiftValues(newChannelShiftValues)
  }
  // onChange method for x/y shift sliders
  const shiftSliderOnChangeHandler = coordinateIndex => {
    return (event, newValue) => {
      setChannelShiftValue(coordinateIndex, newValue)
    }
  }

  // Reset all values
  const resetShiftAndSwap = () => {
    setSourceChannel(R_OFFSET)
    setTargetChannel(R_OFFSET)
    setChannelShiftValues(getChannelShiftValuesDefault())
  }

  // Set to true when save button is clicked, sketch will save image and set back to false when complete
  const [shouldSaveResult, setShouldSaveResult] = React.useState(false)
  // Save button click handler
  const saveButtonOnClick = () => {
    setShouldSaveResult(true)
  }

  // Set to true when confirm button is clicked, sketch will handle confirm and set back to false when complete
  const [shouldConfirmResult, setShouldConfirmResult] = React.useState(false)
  // Confirm button click handler
  const confirmButtonOnClick = () => {
    setShouldConfirmResult(true)
  }
  // Post-confirm method, called from sketch after handling the confirmation
  const postConfirmResult = () => {
    resetShiftAndSwap()
    setShouldConfirmResult(false)
  }

  // Returns true if any changes were made during this step. Used to enable/disable reset and confirm buttons
  const imageModifiedDuringStep = () => {
    let sourceAndTargetChannelsDiffer = parseInt(sourceChannel) !== parseInt(targetChannel)
    let channelShiftValuesDefault = getChannelShiftValuesDefault()
    let channelsHaveBeenShifted = JSON.stringify(channelShiftValuesDefault) !== JSON.stringify(channelShiftValues)
    return sourceAndTargetChannelsDiffer || channelsHaveBeenShifted
  }


  // TODO: show shift values for unselected channels; use Chip element instead of radios for shift?
  return (
    <React.Fragment>
      <CssBaseline/>
      <Paper
        sx={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          bgcolor: 'text.primary',
          zIndex: 999,
        }}
        elevation={3}
      >
        <ReactP5Wrapper
        sketch={ ChannelShiftSketch }
        setImageWidth={ setImageWidth } setImageHeight={ setImageHeight }
        sourceChannel={ sourceChannel } targetChannel={ targetChannel }
        channelShiftValues={ channelShiftValues }
        shouldSaveResult={ shouldSaveResult } setShouldSaveResult={ setShouldSaveResult }
        shouldConfirmResult={ shouldConfirmResult } postConfirmResult={ postConfirmResult }
      />
      </Paper>
      <Container maxWidth="md">
        <Grid container justifyContent="center" spacing={ 4 } my={ 1 }>

          <Grid item xs={ 12 }>
            <Paper
              sx={ { p: 2 } }
              elevation={1}
            >
              <Typography variant="h5" gutterBottom>Shift Channels</Typography>
              <RadioGroup
                value={ selectedShiftChannel }
                onChange={ shiftChannelSelectionOnChangeHandler }
                aria-label="selected-shift-channel"
                row
              >
                <ChannelRadioElements/>
              </RadioGroup>
              <Paper
                sx={ {
                  p: 2,
                  my: 2,
                } }
                elevation={0}
              >
                {/*TODO https://mui.com/material-ui/react-slider/#slider-with-input-field*/ }
                <Box
                  sx={ { p: 2 } }
                >
                  <FormLabel id="x-shift-slider-label">X Shift</FormLabel>
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
                    color="error"
                    aria-labelledby="x-shift-slider-label"
                  />
                </Box>
              </Paper>
              <Paper
                sx={ {
                  p: 2,
                  my: 2,
                } }
                elevation={0}
              >
                {/*TODO https://mui.com/material-ui/react-slider/#slider-with-input-field*/ }
                <Box
                  sx={ { p: 2 } }
                >
                  <FormLabel id="y-shift-slider-label">Y Shift</FormLabel>
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
                    color="success"
                    aria-labelledby="y-shift-slider-label"
                  />
                </Box>
              </Paper>
            </Paper>
          </Grid>

          <Grid item xs={ 12 }>
            <Paper
              sx={ { p: 2 } }
              elevation={1}
            >
              <Typography variant="h5" gutterBottom>Swap Channels</Typography>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={ 6 }>
                  <Paper
                    sx={{ p: 2 }}
                    elevation={0}
                  >
                    <FormControl>
                      <FormLabel id="source-channel-label">Source Channel:</FormLabel>
                      <RadioGroup
                        value={ sourceChannel }
                        onChange={ channelRadioOnChangeHandler(setSourceChannel) }
                        aria-labelledby="source-channel-label"
                        name="source-channel-radio-group"
                      >
                        <ChannelRadioElements/>
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item xs={ 6 }>
                  <Paper
                    sx={{ p: 2 }}
                    elevation={0}
                  >
                    <FormControl>
                      <FormLabel id="target-channel-label">Target Channel:</FormLabel>
                      <RadioGroup
                        value={ targetChannel }
                        onChange={ channelRadioOnChangeHandler(setTargetChannel) }
                        aria-labelledby="target-channel-label"
                        name="target-channel-radio-group"
                      >
                        <ChannelRadioElements/>
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

        </Grid>
      </Container>

      <Paper
        elevation={ 3 }
        sx={ {
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
        } }
      >
        <Stack
          direction="row"
          divider={ <Divider orientation="vertical" flexItem/> }
          justifyContent="space-evenly"
          spacing={ 2 }
        >
          <Tooltip title="Reset all shift and swap values" placement="top">
            <span><Button
              onClick={ resetShiftAndSwap }
              disabled={ !imageModifiedDuringStep() }
              startIcon={ <RestartAlt/> }
              variant="contained"
            >
              Reset Step
            </Button></span>
          </Tooltip>
          <Tooltip title="Use current result as base image" placement="top">
            <span><Button
              onClick={ confirmButtonOnClick }
              disabled={ !imageModifiedDuringStep() }
              startIcon={ <CheckCircleOutline/> }
              variant="contained"
            >
              Confirm Step
            </Button></span>
          </Tooltip>
          <Tooltip title="Download current result as full-res PNG" placement="top">
            <span><Button
              onClick={ saveButtonOnClick }
              startIcon={ <Save/> }
              variant="contained"
            >
              Save Image
            </Button></span>
          </Tooltip>
        </Stack>
      </Paper>
    </React.Fragment>
  )
}

export default App
