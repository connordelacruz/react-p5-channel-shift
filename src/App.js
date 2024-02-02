import React from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react'

import { ChannelShiftSketch } from './ChannelShiftSketch'
import {
  Box, Button,
  Container, Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup, Slider, Stack,
  Typography
} from '@mui/material'

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
  // Can't define array literals with indexes, so initializing default as a constant
  const CHANNEL_SHIFT_VALUES_DEFAULT = []
  CHANNEL_SHIFT_VALUES_DEFAULT[R_OFFSET] = [0, 0]
  CHANNEL_SHIFT_VALUES_DEFAULT[G_OFFSET] = [0, 0]
  CHANNEL_SHIFT_VALUES_DEFAULT[B_OFFSET] = [0, 0]
  const [channelShiftValues, setChannelShiftValues] = React.useState(CHANNEL_SHIFT_VALUES_DEFAULT)
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


  // TODO: show shift values for unselected channels
  // TODO: reset, confirm, save buttons
  return (
    <React.Fragment>
      <Paper
        sx={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          background: 'black',
          zIndex: 999,
        }}
        elevation={3}
      >
        <ReactP5Wrapper
        sketch={ ChannelShiftSketch }
        setImageWidth={ setImageWidth } setImageHeight={ setImageHeight }
        sourceChannel={ sourceChannel } targetChannel={ targetChannel }
        channelShiftValues={ channelShiftValues }
      />
      </Paper>
      <Container maxWidth="md">
        <Grid container justifyContent="center" spacing={ 4 } my={ 1 }>

          <Grid item xs={ 12 }>
            <Paper
              variant="outlined"
              sx={ { p: 2 } }
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
                variant="outlined"
                sx={ {
                  p: 2,
                  my: 2,
                } }
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
                variant="outlined"
                sx={ {
                  p: 2,
                  my: 2,
                } }
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
              variant="outlined"
              sx={ { p: 2 } }
            >
              <Typography variant="h5" gutterBottom>Swap Channels</Typography>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={ 6 }>
                  <Paper
                    variant="outlined"
                    sx={{ p: 2 }}
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
                    variant="outlined"
                    sx={{ p: 2 }}
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
        sx={ {
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
      } }
        elevation={ 3 }
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem/> }
          spacing={2}
        >
          <Button variant="contained">Reset Step</Button>
          <Button variant="contained">Confirm Step</Button>
        </Stack>
      </Paper>
    </React.Fragment>
  )
}

export default App
