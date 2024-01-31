import React from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react'

import { ChannelShiftSketch } from './ChannelShiftSketch'
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup, Slider,
  Typography
} from '@mui/material'

function App() {
  // Image dimensions (sketch sets these after image is loaded)
  const [imageWidth, setImageWidth] = React.useState(0)
  const [imageHeight, setImageHeight] = React.useState(0)

  // Source and target channels
  const [sourceChannel, setSourceChannel] = React.useState('red')
  const [targetChannel, setTargetChannel] = React.useState('red')
  // onChange method for source/target channel radios
  const channelRadioOnChangeHandler = setterFunction => {
    return (event) => {
      setterFunction(event.target.value)
    }
  }

  // x/y shift states
  // TODO: per-channel? make consistent w/ sketch
  const [xShift, setXShift] = React.useState(0)
  const [yShift, setYShift] = React.useState(0)
  // onChange method for x/y shift sliders
  const shiftSliderOnChangeHandler = setterFunction => {
    return (event, newValue) => {
      setterFunction(newValue)
    }
  }
  
  return (
    <React.Fragment>
      <ReactP5Wrapper
        sketch={ ChannelShiftSketch }
        setImageWidth={ setImageWidth } setImageHeight={ setImageHeight }
        sourceChannel={ sourceChannel } targetChannel={ targetChannel }
        xShift={ xShift } yShift={ yShift }
      />
      <Container maxWidth="md">
        <Grid container justifyContent="center" spacing={ 2 } my={ 2 }>
          <Grid item xs={ 6 }>
            <Paper
              variant="outlined"
              sx={{ p: 2 }}
            >
              <FormControl>
                <FormLabel id="source-channel-label">Source Channel</FormLabel>
                <RadioGroup
                  value={ sourceChannel }
                  onChange={ channelRadioOnChangeHandler(setSourceChannel) }
                  aria-labelledby="source-channel-label"
                  name="source-channel-radio-group"
                >
                  <FormControlLabel
                    value="red"
                    label="Red"
                    control={ <Radio color="error"/> }
                    sx={{ color: 'error.main' }}
                  />
                  <FormControlLabel
                    value="green"
                    label="Green"
                    control={ <Radio color="success"/> }
                    sx={{ color: 'success.main' }}
                  />
                  <FormControlLabel
                    value="blue"
                    label="Blue"
                    control={ <Radio color="primary"/> }
                    sx={{ color: 'primary.main' }}
                  />
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
                <FormLabel id="target-channel-label">Target Channel</FormLabel>
                <RadioGroup
                  value={ targetChannel }
                  onChange={ channelRadioOnChangeHandler(setTargetChannel) }
                  aria-labelledby="target-channel-label"
                  name="target-channel-radio-group"
                >
                  <FormControlLabel
                    value="red"
                    label="Red"
                    control={ <Radio color="error"/> }
                    sx={{ color: 'error.main' }}
                  />
                  <FormControlLabel
                    value="green"
                    label="Green"
                    control={ <Radio color="success"/> }
                    sx={{ color: 'success.main' }}
                  />
                  <FormControlLabel
                    value="blue"
                    label="Blue"
                    control={ <Radio color="primary"/> }
                    sx={{ color: 'primary.main' }}
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={ 12 }>
            <Paper
              variant="outlined"
              sx={{ p: 2 }}
            >
              {/*TODO https://mui.com/material-ui/react-slider/#slider-with-input-field*/}
              <Box
                sx={{ p: 2 }}
              >
                <Typography id="x-shift-slider-label">X Shift</Typography>
                <Slider
                  value={xShift}
                  onChange={shiftSliderOnChangeHandler(setXShift)}
                  min={0}
                  max={imageWidth}
                  valueLabelDisplay="auto"
                  marks={[
                    {value: 0, label: '0px'},
                    {value: imageWidth, label: `${imageWidth}px`}
                  ]}
                  color="error"
                  aria-labelledby="x-shift-slider-label"
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={ 12 }>
            <Paper
              variant="outlined"
              sx={{ p: 2 }}
            >
              {/*TODO https://mui.com/material-ui/react-slider/#slider-with-input-field*/}
              <Box
                sx={{ p: 2 }}
              >
                <Typography id="y-shift-slider-label">Y Shift</Typography>
                <Slider
                  value={yShift}
                  onChange={shiftSliderOnChangeHandler(setYShift)}
                  min={0}
                  max={imageHeight}
                  valueLabelDisplay="auto"
                  marks={[
                    {value: 0, label: '0px'},
                    {value: imageHeight, label: `${imageHeight}px`}
                  ]}
                  color="success"
                  aria-labelledby="y-shift-slider-label"
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default App
